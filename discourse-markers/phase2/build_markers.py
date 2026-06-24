#!/usr/bin/env python3
"""
Phase A — Build new markers.json from mind map taxonomy
Generates structured entries for all 464 mind map DM phrases.
Migrates assets from old markers.json where alignment exists.
"""
import json, re, hashlib, copy
from collections import defaultdict

# ── Load data ──
with open('/Users/agentii/dev/ielts-with-kee/discourse-markers/markers.json') as f:
    old_markers = json.load(f)

with open('/Users/agentii/.shared/council/mailbox/004-to-002-dm-gap-analysis.json') as f:
    gap = json.load(f)

with open('/Users/agentii/.shared/council/mailbox/004-to-002-dm-phrase-classification.json') as f:
    classification = json.load(f)

# Load mind map for raw phrase extraction (to get exact titles with paths)
mindmap_path = '/Users/agentii/dev/ielts-with-kee/ielts-speaking-mindmap.json'
with open(mindmap_path) as f:
    mm = json.load(f)

# ── Helper: clean XMind titles ──
def clean_title(t):
    """Remove XMind artifacts: curly braces, brackets, parens, leading punctuation."""
    t = t.split('{')[0].split('[')[0].strip()
    t = re.sub(r'^["*\-•·]+', '', t).strip()
    t = t.rstrip(',').strip()
    return t

# ── Extract ALL leaf phrases from mind map (including non-DM branches) ──
def extract_all_leaves(node, depth=0, path=None):
    """Extract all leaf titles with their path for context."""
    if path is None:
        path = []
    results = []
    if not isinstance(node, dict):
        return results
    
    title = node.get('title', '').strip()
    clean = clean_title(title)
    
    children = node.get('children', {})
    has_children = False
    if isinstance(children, dict):
        for key, val in children.items():
            if isinstance(val, list) and val:
                has_children = True
                for child in val:
                    results.extend(extract_all_leaves(child, depth+1, path + [clean if clean else '?']))
    
    if not has_children and clean and '...' in title and len(clean) < 80:
        results.append({
            'phrase': clean,
            'path': ' -> '.join(path + [clean]) if path else clean,
            'depth': depth
        })
    elif not has_children and clean and depth >= 3:
        results.append({
            'phrase': clean,
            'path': ' -> '.join(path + [clean]) if path else clean,
            'depth': depth
        })
    
    return results

all_leaves = []
for sheet in mm:
    root = sheet.get('rootTopic', {})
    all_leaves.extend(extract_all_leaves(root))

# Build phrase → leaf mapping (exact match)
leaf_lookup = {}
for l in all_leaves:
    key = l['phrase'].lower().strip().rstrip(',').rstrip('.').strip()
    if key and len(key) > 2:
        leaf_lookup[key] = l

# ── Category definitions ──
CATEGORIES = classification['categories']
PHRASE_CATS = classification['phrase_categories']

# All phrases from mind map (both new and existing)
all_mm_phrases = [p.lower().strip().rstrip(',').rstrip('.').strip() for p in gap['new_phrases']] + \
                 [p.lower().strip().rstrip(',').rstrip('.').strip() for p in gap['existing_phrases']]
all_mm_phrases_original = gap['new_phrases'] + gap['existing_phrases']

# ── Build migration lookup: old marker expressions → full marker ──
old_lookup_normalized = {}
for m in old_markers:
    e = m['expression'].lower().strip().rstrip(',').rstrip('.').strip()
    old_lookup_normalized[e] = m
    # Also index by ID
    old_lookup_normalized[m['id']] = m

# ── CEFR assignment heuristics ──
CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

def estimate_cefr(phrase, category_id):
    """Estimate CEFR level based on phrase complexity and category."""
    p = phrase.lower()
    
    # Simple fillers = A1-A2
    simple_fillers = ['well', 'i mean', 'you know', 'like', 'so', 'um', 'uh', 'hmm', 
                      'okay', 'right', 'oh', 'ah', 'let me see', "let's see",
                      'give me a second']
    if p.strip().rstrip(',').rstrip('.').strip() in simple_fillers:
        return 'A1'
    
    # Very short/simple
    word_count = len(p.split())
    if word_count <= 3 and not any(c in p for c in ['...', ',']):
        return 'A2'
    
    # Category-based defaults
    cat_cefr_defaults = {
        'stalling-fillers': 'A2',
        'commenting': 'A2',
        'opinion-intro': 'B1',
        'agreement': 'A2',
        'disagreement': 'B1',
        'sequencing': 'A2',
        'adding-info': 'A2',
        'giving-examples': 'A2',
        'cause-effect': 'B1',
        'comparing': 'A2',
        'contrasting': 'B1',
        'topic-intros': 'B1',
        'reformulation': 'B1',
        'emphasis': 'B1',
        'uncertainty': 'B1',
        'generalising': 'B1',
        'specifying': 'B1',
        'recalling': 'B1',
        'shared-knowledge': 'B1',
        'perspective': 'B2',
        'clarification-req': 'A2',
        'summarising': 'B1',
    }
    
    base = cat_cefr_defaults.get(category_id, 'B1')
    
    # Longer/more complex = bump up
    if word_count >= 10:
        level_idx = CEFR_LEVELS.index(base) if base in CEFR_LEVELS else 2
        base = CEFR_LEVELS[min(level_idx + 1, 5)]
    if word_count >= 15:
        level_idx = CEFR_LEVELS.index(base) if base in CEFR_LEVELS else 2
        base = CEFR_LEVELS[min(level_idx + 1, 5)]
    
    # Advanced vocabulary indicators
    advanced_words = ['nevertheless', 'conversely', 'subsequently', 'consequently',
                      'furthermore', 'moreover', 'notwithstanding', 'heretofore',
                      'hypothetically', 'speculation', 'perspective', 'standpoint',
                      'affluent', 'policy-making', 'governance', 'privileged',
                      'multifaceted', 'paradigm', 'methodology', 'underscore',
                      'elaborate', 'elucidate', 'delineate']
    if any(w in p for w in advanced_words):
        level_idx = CEFR_LEVELS.index(base) if base in CEFR_LEVELS else 2
        base = CEFR_LEVELS[min(level_idx + 2, 5)]
    
    return base

# ── Generate FRESH content for a phrase ──
def generate_entry(phrase, category_id, phrase_original=None):
    """Generate complete marker entry for a mind map phrase."""
    p = phrase_original or phrase
    clean_p = p.rstrip(',.?!').strip()
    cat = CATEGORIES.get(category_id, {})
    cat_name_en = cat.get('name', {}).get('en', category_id)
    
    # Estimate CEFR
    cefr = estimate_cefr(phrase, category_id)
    
    # Generate ID
    id_hash = hashlib.md5(phrase.encode('utf-8')).hexdigest()[:10]
    marker_id = f"dm-{id_hash}"
    
    # Determine if this is a template or fixed phrase
    is_template = '...' in clean_p or '___' in clean_p or '__' in clean_p
    
    # ── Collocation ──
    col_en = generate_collocation(clean_p, category_id, is_template)
    
    # ── Contexts ──
    ctx_en = generate_context(clean_p, category_id, cat_name_en)
    
    # ── Connotation ──
    con_en = generate_connotation(category_id, clean_p)
    
    # ── Example ──
    ex_en = generate_example(clean_p, category_id, is_template)
    
    entry = {
        'id': marker_id,
        'expression': clean_p,
        'variants': [],
        'collocation': {
            'en': col_en,
            'zh': ''
        },
        'contexts': {
            'en': ctx_en,
            'zh': ''
        },
        'connotation': {
            'en': con_en,
            'zh': ''
        },
        'example': {
            'en': ex_en,
            'zh': ''
        },
        'cefr': cefr,
        'categoryIds': [],
        'subfunctionIds': [],
        'chainIds': [],
        'tags': cat.get('tags', []),
        'seeAlso': []
    }
    
    return entry


def generate_collocation(phrase, cat_id, is_template):
    """Generate collocation description."""
    p_lower = phrase.lower()
    
    # Templates with placeholders
    if is_template:
        # Named template types
        if phrase.startswith('From a') and 'perspective' in p_lower:
            return "From a [adjective] perspective, [topic-related statement]..."
        if phrase.startswith('When it comes to'):
            return "When it comes to [topic], [general statement + elaboration]..."
        if phrase.startswith('In terms of'):
            return "In terms of [category/field], [statement with specific reference]..."
        if phrase.startswith('As far as') and 'goes' in p_lower:
            return "As far as [topic] goes, [personal opinion or observation]..."
        if phrase.startswith('As far as') and 'concerned' in p_lower:
            return "As far as [topic] is concerned, [statement]..."
        if phrase.startswith('If I were to'):
            return "If I were to [hypothetical scenario], I would [result/consequence]..."
        if phrase.startswith('If my memory serves'):
            return "If my memory serves [me right], + [recollected detail or event]"
        if phrase.startswith('I vaguely'):
            return "I vaguely [verb: remember/recall] that [past event or detail]..."
        if phrase.startswith('What I') and ('wanna say' in p_lower or 'want' in p_lower or 'try' in p_lower):
            return "What I [want/was trying] to say is, [clarified point or restated idea]"
        if phrase.startswith('The most'):
            return "The most [adjective: important/prominent/significant] [noun: thing/reason/point] is [specific detail]"
        if phrase.startswith('One of the'):
            return "One of the [most/superlative] [noun: reasons/examples/things] is [specific example]"
        if 'not only' in p_lower and 'but also' in p_lower:
            return "[Action/quality] not only [verb phrase], but also [additional verb phrase]"
        if 'would be my' in p_lower:
            return "[Option choice] would be my [preference/choice] because [reason]"
        if 'make it a point' in p_lower:
            return "Make it a point to [action/habit], especially when [context]"
        if 'i\'m so' in p_lower:
            return "Be so [adjective: overloaded/swamped/busy] with [responsibility] that [consequence]"
        
        # Generic template
        return f"Use {phrase} to [situation-appropriate completion of the template]"
    
    # Fixed phrases
    cat_col_patterns = {
        'stalling-fillers': "Use as a hesitation device at the start or middle of a response when needing thinking time",
        'commenting': "Use at the beginning of a turn to acknowledge and express a reaction to the question",
        'opinion-intro': "Use at the start of a clause to signal personal viewpoint",
        'agreement': "Use as a standalone response or clause-initial to confirm alignment",
        'disagreement': "Use at clause-initial position, often followed by a contrasting statement",
        'sequencing': "Use at the beginning of a clause to order multiple points",
        'adding-info': "Use at the start of a new clause to introduce supplementary information",
        'giving-examples': "Use before citing a specific instance or illustration",
        'cause-effect': "Use within or at the start of a clause expressing causality",
        'comparing': "Use when drawing a comparison between two entities or situations",
        'contrasting': "Use at the beginning of a clause to introduce a counterpoint",
        'topic-intros': "Use at the start of a sentence to focus attention on a specific aspect",
        'reformulation': "Use when rephrasing or clarifying a previous statement",
        'emphasis': "Use within a clause to draw special attention to the following content",
        'uncertainty': "Use before or within a statement to indicate provisional judgment",
        'generalising': "Use at the beginning of a clause to introduce a broad observation",
        'specifying': "Use before a precise detail or clarification",
        'recalling': "Use at the start of a clause to introduce a memory or past experience",
        'shared-knowledge': "Use to reference commonly understood information or prior discussion",
        'perspective': "Use at the start of a sentence to frame a response from a specific viewpoint",
        'clarification-req': "Use when needing the interlocutor to repeat, explain, or elaborate",
        'summarising': "Use at the end of a response to condense the main points",
    }
    
    base = cat_col_patterns.get(cat_id, f"Use {phrase} within a clause to add meaning")
    
    # For longer phrases, be more specific
    if len(phrase.split()) > 8:
        return f"Position at the beginning of your response: {phrase}"
    
    return base


def generate_context(phrase, cat_id, cat_name):
    """Generate usage context description."""
    p_lower = phrase.lower()
    
    # Specific contexts for well-known phrases
    context_map = {
        'well': 'Starting a response when you need a brief moment to organise your thoughts',
        'i mean': 'Correcting or clarifying a previous statement mid-sentence',
        'you know': 'Filling a gap while searching for a specific word',
        'the thing is': 'Introducing a problem, concern, or key point',
        'to be honest': 'Signalling that you are about to share your genuine opinion',
        'frankly': 'Introducing an opinion that might be direct or unexpected',
        'in my opinion': 'Formally marking the following statement as personal viewpoint',
        'as far as i\'m concerned': 'Emphasising that the following is your personal perspective',
        'on the other hand': 'Introducing a contrasting perspective after a previous point',
        'for example': 'Moving from a general statement to a concrete illustration',
        'because': 'Giving a reason for a previously stated action or opinion',
        'therefore': 'Concluding or stating a logical result',
        'however': 'Introducing a limitation, exception, or counter-argument',
        'firstly': 'Beginning a sequence of points in an ordered response',
        'lastly': 'Signalling the final point in a series',
        'despite': 'Acknowledging a countervailing factor while maintaining your position',
        'although': 'Conceding a point before presenting the main argument',
        'so basically': 'Summarising or restating a previous explanation more simply',
    }
    
    if phrase.lower().strip() in context_map:
        return context_map[phrase.lower().strip()]
    
    # Category-based patterns
    cat_ctx = {
        'stalling-fillers': 'Used when you need extra thinking time during the speaking test',
        'commenting': 'Used to react naturally to the question before diving into the answer',
        'opinion-intro': 'Used to mark your answer as personal viewpoint, especially in Part 1 and Part 3',
        'agreement': 'Used to show alignment with the interlocutor or to confirm a shared understanding',
        'disagreement': 'Used to politely signal a different perspective in discussion-style tasks',
        'sequencing': 'Used to structure multi-point answers, especially in Part 2 long turns',
        'adding-info': 'Used to extend a response with related supporting details',
        'giving-examples': 'Used to transition from a general claim to specific evidence',
        'cause-effect': 'Used to explain reasoning, especially in Part 3 analytical responses',
        'comparing': 'Used when directly comparing two entities, experiences, or time periods',
        'contrasting': 'Used to introduce a different perspective or limitation to a previous statement',
        'topic-intros': 'Used to narrow focus to a specific aspect of the question',
        'reformulation': 'Used when you realise your previous wording was unclear or incomplete',
        'emphasis': 'Used to highlight the most important aspect of your argument',
        'uncertainty': 'Used when speculating or when your knowledge is incomplete',
        'generalising': 'Used to make broader observations about trends or patterns',
        'specifying': 'Used when you want to give precise details rather than general statements',
        'recalling': 'Used when drawing on personal memories or past experiences',
        'shared-knowledge': 'Used to reference commonly understood facts or prior conversation',
        'perspective': 'Used in Part 3 to demonstrate ability to discuss from multiple viewpoints',
        'clarification-req': 'Used when you did not hear or understand the question fully',
        'summarising': 'Used to wrap up a response with a concise takeaway',
    }
    
    base = cat_ctx.get(cat_id, f'Used in natural conversation or IELTS speaking responses')
    
    # Templates have special context
    if '...' in phrase:
        return f"Template pattern: fill the placeholder with topic-relevant content. Used to {cat_ctx.get(cat_id, 'add fluency')}"
    
    return base


def generate_connotation(cat_id, phrase):
    """Generate connotation/register description."""
    p_lower = phrase.lower()
    
    # Check for formal indicators
    formal_indicators = ['nevertheless', 'conversely', 'subsequently', 'furthermore',
                         'moreover', 'notwithstanding', 'from a', 'perspective',
                         'governance', 'policy-making', 'elucidate', 'delineate',
                         'methodology', 'affluent', 'privileged']
    
    informal_indicators = ['gotta', 'wanna', 'gonna', 'kinda', 'sorta', 'lemme',
                           'cuz', 'cause', 'yeah', 'nah', 'umm', 'uh', 'hmm',
                           'like', 'so yeah', 'well', 'i mean', 'you know',
                           'tell me about it', 'spot on', 'beats me', 'for real']
    
    if any(w in p_lower for w in formal_indicators):
        register = 'formal, academic, structured'
    elif any(w in p_lower for w in informal_indicators):
        register = 'informal, conversational, natural'
    else:
        register = 'semi-formal, appropriate for IELTS context'
    
    cat_con = {
        'stalling-fillers': f'{register}, shows natural hesitation without losing fluency',
        'commenting': f'{register}, demonstrates engagement with the topic',
        'opinion-intro': f'{register}, clearly marks personal stance',
        'agreement': f'{register}, build rapport with the listener',
        'disagreement': f'{register}, polite disagreement strategies for discussion tasks',
        'sequencing': f'{register}, improves coherence and cohesion scores',
        'adding-info': f'{register}, extends responses naturally',
        'giving-examples': f'{register}, strengthens arguments with concrete evidence',
        'cause-effect': f'{register}, demonstrates logical reasoning ability',
        'comparing': f'{register}, shows analytical thinking',
        'contrasting': f'{register}, adds depth to arguments by acknowledging alternatives',
        'topic-intros': f'{register}, signals topic management skills',
        'reformulation': f'{register}, demonstrates self-correction ability',
        'emphasis': f'{register}, highlights key information effectively',
        'uncertainty': f'{register}, shows honest self-assessment',
        'generalising': f'{register}, shows ability to identify patterns',
        'specifying': f'{register}, adds precision and detail',
        'recalling': f'{register}, natural narrative technique',
        'shared-knowledge': f'{register}, builds common ground with listener',
        'perspective': f'{register}, demonstrates sophisticated analytical framing',
        'clarification-req': f'{register}, shows active listening and communication skills',
        'summarising': f'{register}, effective conclusion strategy',
    }
    
    return cat_con.get(cat_id, f'{register}, appropriate for IELTS Speaking')


def generate_example(phrase, cat_id, is_template):
    """Generate example sentence."""
    p_clean = phrase.rstrip(',.?!').strip()
    
    # For template phrases, show the template being used
    if is_template:
        if 'perspective' in p_clean.lower():
            return f"{p_clean.replace('...', 'this issue is not black and white')}"
        if 'When it comes to' in p_clean:
            return f"{p_clean.replace('...', 'education, I think it plays a vital role in shaping a person')}"
        if 'In terms of' in p_clean:
            return f"{p_clean.replace('...', 'the environment, I believe we should all do our part')}"
        if 'As far as' in p_clean.lower():
            return f"{p_clean.replace('...', 'I have always believed that practice makes perfect')}"
        if 'If my memory serves' in p_clean.lower():
            return f"If my memory serves me right, I first visited that place when I was about ten years old."
        if 'I vaguely' in p_clean.lower():
            return f"I vaguely remember that the teacher mentioned something about that in class."
        if 'What I' in p_clean.lower() and ('say' in p_clean.lower() or 'try' in p_clean.lower()):
            return f"{p_clean.replace('...', 'what I really want to emphasise here is the importance of preparation')}"
        if 'The most' in p_clean.lower():
            return f"The most important thing is that we learn from our mistakes."
        if 'One of the' in p_clean.lower():
            return f"One of the most prominent examples is the way technology has changed communication."
        if 'would be my' in p_clean.lower():
            return f"Going to the countryside would be my preference, because I really need some peace and quiet."
        # Generic example for template
        return f"{p_clean} For example, this is a great way to introduce your point naturally."
    
    # Generate specific IELTS-style examples for known phrases
    example_map = {
        'well': "Well, I think that's an interesting question. Let me think about it for a moment.",
        'i mean': "I've always been interested in art — I mean, real art, not just modern installations.",
        'you know': "I need to find a, you know, a place where I can just sit and work quietly.",
        'the thing is': "The thing is, I actually don't have much experience with that kind of situation.",
        'to be honest': "To be honest, I never really enjoyed learning history at school.",
        'frankly': "Frankly, I think the government should invest more in public transport.",
        'in my opinion': "In my opinion, social media has both positive and negative effects on young people.",
        'on the other hand': "Living in the city is convenient. On the other hand, it can be quite stressful.",
        'for example': "There are many ways to stay healthy. For example, regular exercise and a balanced diet.",
        'because': "I enjoy reading because it allows me to relax and learn new things at the same time.",
        'therefore': "The cost of living has increased significantly. Therefore, many people are struggling to save money.",
        'however': "The plan seems good. However, we need to consider the potential risks first.",
        'firstly': "Firstly, I'd like to talk about the educational benefits of travelling abroad.",
        'lastly': "Lastly, but not least, I believe that family support plays a crucial role.",
        'despite': "Despite the heavy rain, we decided to go ahead with the outdoor event.",
        'although': "Although it was my first time trying, I actually did quite well.",
        'so basically': "So basically, what I'm trying to say is that we need to find a balance.",
        'in terms of': "In terms of career development, I think internships are extremely valuable.",
        'speaking of': "Speaking of hobbies, I've recently taken up photography as a new pastime.",
        'as for': "As for my future plans, I hope to pursue a master's degree abroad.",
        'when it comes to': "When it comes to cooking, I'm definitely more of a beginner than an expert.",
        'generally speaking': "Generally speaking, people in my country tend to eat three meals a day.",
        'on the whole': "On the whole, I'd say the experience was quite positive.",
        'moreover': "The job offers a good salary. Moreover, it provides excellent training opportunities.",
        'furthermore': "The new policy will reduce pollution. Furthermore, it will create new jobs.",
        'nevertheless': "The task was challenging. Nevertheless, we managed to complete it on time.",
        'consequently': "He neglected his studies. Consequently, his grades suffered.",
        'as a result': "The company invested in new technology. As a result, productivity improved significantly.",
        'due to': "Due to the traffic jam, I arrived almost thirty minutes late for the interview.",
        'compared to': "Compared to traditional classrooms, online learning offers more flexibility.",
        'similarly': "My brother enjoys outdoor sports. Similarly, I prefer activities like hiking and cycling.",
        'whereas': "My sister loves action movies, whereas I prefer romantic comedies.",
        'not only': "Not only did she finish the project on time, but she also exceeded all expectations.",
        'apart from that': "I enjoy playing basketball. Apart from that, I also like swimming and running.",
        'last but not least': "Last but not least, I'd like to thank my family for their constant support.",
        'in short': "In short, the experience taught me more than any textbook ever could.",
        'in a nutshell': "In a nutshell, the whole trip was both educational and enjoyable.",
        'to sum up': "To sum up, I believe that technology will continue to reshape our daily lives.",
        'having said that': "The movie was quite long. Having said that, the storyline was compelling.",
        'that being said': "The restaurant is expensive. That being said, the quality of food is outstanding.",
    }
    
    clean_key = phrase.lower().strip().rstrip(',').rstrip('.').strip()
    if clean_key in example_map:
        return example_map[clean_key]
    
    # Category-based example generation
    if cat_id == 'stalling-fillers':
        return f"{p_clean}, what else can I say... well, I think it's a topic that requires some thought."
    elif cat_id == 'opinion-intro':
        return f"{p_clean} technology has fundamentally changed the way we communicate with each other."
    elif cat_id == 'agreement':
        return f"{p_clean} That's exactly what I was thinking as well."
    elif cat_id == 'disagreement':
        return f"{p_clean} I see your point, but I think there's another side to this argument."
    elif cat_id == 'sequencing':
        return f"{p_clean} I'll explain my reasons step by step."
    elif cat_id == 'cause-effect':
        return f"{p_clean} This explains why the situation has changed so dramatically."
    elif cat_id == 'contrasting':
        return f"{p_clean} This is not to say that the other option doesn't have its merits."
    elif cat_id == 'emphasis':
        return f"{p_clean} This is really the core issue that we need to address."
    elif cat_id == 'giving-examples':
        return f"{p_clean} For instance, many young people today prefer to communicate online rather than in person."
    elif cat_id == 'perspective':
        return f"{p_clean} This viewpoint helps us understand the broader implications of the issue."
    elif cat_id == 'recalling':
        return f"{p_clean} I remember it like it was yesterday — it was such a memorable experience."
    elif cat_id == 'shared-knowledge':
        return f"{p_clean} It's something that most people would agree with."
    else:
        return f"{p_clean} This is a useful expression for expressing yourself naturally in English."


# ── Main generation loop ──
print("Building new markers.json from mind map taxonomy...")
print(f"Total mind map phrases (new + existing): {len(all_mm_phrases)}")

new_markers = []
migration_count = 0
fresh_count = 0

for phrase_original in all_mm_phrases_original:
    phrase = phrase_original.lower().strip().rstrip(',').rstrip('.').strip()
    
    # Determine category
    cat = None
    for cat_id, phrases in PHRASE_CATS.items():
        for p in phrases:
            if p.lower().strip().rstrip(',').rstrip('.').strip() == phrase:
                cat = cat_id
                break
        if cat:
            break
    
    if not cat:
        cat = 'opinion-intro'  # fallback
    
    # Check for migration from old markers
    entry = None
    old_match = old_lookup_normalized.get(phrase)
    if old_match:
        # Found exact match — migrate with ZH/CEFR/examples
        entry = {
            'id': f"dm-{hashlib.md5(phrase.encode('utf-8')).hexdigest()[:10]}",
            'expression': phrase_original.rstrip(',.?!').strip(),
            'variants': old_match.get('variants', []),
            'collocation': {
                'en': generate_collocation(phrase_original, cat, '...' in phrase_original),
                'zh': old_match.get('collocation', {}).get('zh', '')
            },
            'contexts': {
                'en': generate_context(phrase_original, cat, CATEGORIES.get(cat, {}).get('name', {}).get('en', '')),
                'zh': old_match.get('contexts', {}).get('zh', '')
            },
            'connotation': {
                'en': generate_connotation(cat, phrase_original),
                'zh': old_match.get('connotation', {}).get('zh', '')
            },
            'example': {
                'en': generate_example(phrase_original, cat, '...' in phrase_original),
                'zh': old_match.get('example', {}).get('zh', '')
            },
            'cefr': old_match.get('cefr', estimate_cefr(phrase, cat)),
            'categoryIds': [],
            'subfunctionIds': [],
            'chainIds': [],
            'tags': CATEGORIES.get(cat, {}).get('tags', []),
            'seeAlso': old_match.get('seeAlso', [])
        }
        migration_count += 1
    else:
        # Also check partial match (old marker expression is within this phrase)
        for old_expr, old_m in old_lookup_normalized.items():
            if len(old_expr) > 3 and old_expr in phrase and phrase != old_expr:
                # Found partial match — use ZH/CEFR as seed
                entry = {
                    'id': f"dm-{hashlib.md5(phrase.encode('utf-8')).hexdigest()[:10]}",
                    'expression': phrase_original.rstrip(',.?!').strip(),
                    'variants': [],
                    'collocation': {
                        'en': generate_collocation(phrase_original, cat, '...' in phrase_original),
                        'zh': old_m.get('collocation', {}).get('zh', '')
                    },
                    'contexts': {
                        'en': generate_context(phrase_original, cat, CATEGORIES.get(cat, {}).get('name', {}).get('en', '')),
                        'zh': ''
                    },
                    'connotation': {
                        'en': generate_connotation(cat, phrase_original),
                        'zh': ''
                    },
                    'example': {
                        'en': generate_example(phrase_original, cat, '...' in phrase_original),
                        'zh': ''
                    },
                    'cefr': estimate_cefr(phrase, cat),
                    'categoryIds': [],
                    'subfunctionIds': [],
                    'chainIds': [],
                    'tags': CATEGORIES.get(cat, {}).get('tags', []),
                    'seeAlso': []
                }
                migration_count += 0.5  # partial migration
                break
    
    if entry is None:
        # Fresh generation
        entry = generate_entry(phrase, cat, phrase_original)
        fresh_count += 1
    
    # Assign category key
    # We'll map categoryIds later when categories.json is finalized
    entry['categoryIds'].append(f"cat-{cat}")
    
    new_markers.append(entry)

print(f"\nResults:")
print(f"  Total markers generated: {len(new_markers)}")
print(f"  Full migrations (exact match): {migration_count}")
print(f"  Fresh generation: {fresh_count}")
print(f"  Unique: {len(set(m['expression'].lower() for m in new_markers))}")

# ── Sort by category then expression ──
def sort_key(m):
    cat = m['categoryIds'][0] if m['categoryIds'] else 'zzz'
    return (cat, m['expression'].lower())

new_markers.sort(key=sort_key)

# ── Save ──
output_path = '/Users/agentii/dev/ielts-with-kee/discourse-markers/markers.json'
with open(output_path, 'w') as f:
    json.dump(new_markers, f, indent=2, ensure_ascii=False)

print(f"\nSaved to {output_path}")
print(f"File size: {len(json.dumps(new_markers, indent=2, ensure_ascii=False))} bytes")

# ── Summary by category ──
cat_counts = defaultdict(int)
for m in new_markers:
    for cid in m['categoryIds']:
        cat_counts[cid] += 1

print(f"\nBreakdown by category:")
for cid, count in sorted(cat_counts.items()):
    cat_name = CATEGORIES.get(cid.replace('cat-', ''), {}).get('name', {}).get('en', cid)
    print(f"  {cid.replace('cat-', ''):25s} ({count:3d}) {cat_name}")

# ── Check CEFR distribution ──
cefr_counts = defaultdict(int)
for m in new_markers:
    cefr_counts[m['cefr']] += 1
print(f"\nCEFR Distribution:")
for level in CEFR_LEVELS:
    print(f"  {level}: {cefr_counts.get(level, 0)}")
