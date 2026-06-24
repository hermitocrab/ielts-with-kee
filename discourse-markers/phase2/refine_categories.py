#!/usr/bin/env python3
"""
Refine opinion-intro category assignments.
Many phrases currently defaulted to opinion-intro belong to other categories.
"""
import json, re, hashlib
from collections import defaultdict

with open('/Users/agentii/dev/ielts-with-kee/discourse-markers/markers.json') as f:
    markers = json.load(f)

# ── Category ID mapping ──
CAT_ALIASES = {
    'adding-info': 'cat-adding-info',
    'agreement': 'cat-agreement', 
    'cause-effect': 'cat-cause-effect',
    'clarification-req': 'cat-clarification-req',
    'commenting': 'cat-commenting',
    'comparing': 'cat-comparing',
    'contrasting': 'cat-contrasting',
    'disagreement': 'cat-disagreement',
    'emphasis': 'cat-emphasis',
    'generalising': 'cat-generalising',
    'giving-examples': 'cat-giving-examples',
    'opinion-intro': 'cat-opinion-intro',
    'perspective': 'cat-perspective',
    'recalling': 'cat-recalling',
    'reformulation': 'cat-reformulation',
    'sequencing': 'cat-sequencing',
    'shared-knowledge': 'cat-shared-knowledge',
    'specifying': 'cat-specifying',
    'stalling-fillers': 'cat-stalling-fillers',
    'topic-intros': 'cat-topic-intros',
    'uncertainty': 'cat-uncertainty',
    'summarising': 'cat-summarising',
}

# ── Better classification rules ──
def refine_category(expr):
    """Determine the correct category for a phrase."""
    e = expr.lower()
    
    # 1. Perspective / Part 3 Framing
    if any(w in e for w in [
        'perspective', 'standpoint', 'point of view',
        'society', 'government', 'policy-making', 'governance',
        'public perception', 'social norm', 'individual\'s perspective',
        'individual\'s standpoint', 'city dweller', 'urban area',
        'countryside', 'rural communit', 'affluent', 'low-income',
        'wealthy', 'privileged', 'policy-making', 'enact',
        'from a ... perspective', 'from the public',
        'for individuals', 'for the younger generation',
        'for the older generation', 'for those who are working',
        'for office worker', 'for people living', 'in terms of society',
        'when it comes to the society', 'when it comes to the authorities',
        'from a parent\'s perspective', 'if you are an employer',
        'if i were in this situation', 'if i were in their shoes',
        'for those struggling', 'on a personal level',
        'at the government', 'at the national level',
        'as for society', 'in terms of government',
        'in terms of governance', 'in terms of city dweller',
        'those in the countryside', 'in rural communities'
    ]):
        return 'perspective'
    
    # 2. Summarising / Concluding
    if any(w in e for w in [
        'to sum up', 'in conclusion', 'in summary', 'to summarise',
        'in short', 'in a nutshell', 'all things considered',
        'ultimately', 'when all is said', 'the takeaway',
        'to cut a long story', 'so there you have',
        'at the end of the day'
    ]):
        return 'summarising'
    
    # 3. Clarification Requests
    if any(w in e for w in [
        'could you', 'would you mind', 'clarify', 'elaborate',
        'what do you mean', 'repeat', 'pardon', 'explain',
        'i didn\'t catch', "i didn't get", "i don't understand",
        'can you say that', 'could you explain'
    ]):
        return 'clarification-req'
    
    # 4. Stalling & Fillers (longer multi-word stall patterns)
    if any(w in e for w in [
        'let me think', 'gather my thoughts', 'what else can i say',
        'off the top of my head', 'mind went blank', 'drew a blank',
        'drawing a blank', 'mental block', 'give me a second',
        'one moment please', 'how shall i put', 'where was i'
    ]):
        return 'stalling-fillers'
    
    # 5. Commenting on question
    if any(w in e for w in [
        'good question', 'great question', 'interesting question',
        'challenging question', 'tricky one', 'never thought about',
        'never crossed my mind', 'that\'s a tough one',
        'what a question', "i've never been asked",
        'gotta say', 'relatable'
    ]):
        return 'commenting'
    
    # 6. Emphasis patterns
    if any(w in e for w in [
        'what ... is', 'what i\'m trying', 'what i wanna say',
        'what i want to say', 'the most important', 'the main thing',
        'the key point', 'my point here', 'the point i\'m making',
        'i can\'t emphasize', 'i can\'t underscore',
        'boils down to', 'heart of the matter',
        'the ... thing i\'d like', 'what i\'d like to point',
        'it is ... that', 'never have i', 'only when',
        'one of the most', 'one of the main',
        'the ... thing i\'d like to mention',
        'the ... thing i\'d like to bring',
        'the next thing', 'what i really want'
    ]):
        return 'emphasis'
    
    # 7. Reformulation
    if any(w in e for w in [
        'rephrase', 'put it another way', 'let me put it',
        'allow me to put', 'in other words', 'that is to say',
        'i mean', 'what i mean', 'what i was trying',
        'so basically what', 'in another word',
        'let me rephrase', 'let/allow me to'
    ]):
        return 'reformulation'
    
    # 8. Recalling
    if any(w in e for w in [
        'if my memory serves', 'as far as i can remember',
        'as far as i can recollect', 'if i remember correctly',
        'if i recall correctly', 'i vaguely remember',
        'i vividly remember', 'i clearly remember',
        'i still recall', 'i remember it like',
        'i can still remember', 'when i look back',
        'thinking back', 'reminiscing', 'recalling',
        'i have fond memories', 'one memory that'
    ]):
        return 'recalling'
    
    # 9. Shared knowledge
    if any(w in e for w in [
        'we all know', 'common sense', 'it\'s well-known',
        'as everyone knows', 'needless to say',
        'it goes without saying', 'obviously',
        'as i have mentioned', 'like i said',
        'and bear in mind', 'as we all know',
        'so to speak', 'as it were',
        'in a manner of speaking'
    ]):
        return 'shared-knowledge'
    
    # 10. Topic introducers
    if any(w in e for w in [
        'when it comes to', 'in terms of', 'as for',
        'regarding', 'speaking of', 'talking about',
        'with regard to', 'as far as ... goes',
        'as far as ... is concerned', '-wise',
        'if we\'re talking about', 'concerning',
        'society-wise', 'technology-wise'
    ]):
        return 'topic-intros'
    
    # 11. Generalising
    if any(w in e for w in [
        'generally speaking', 'broadly speaking',
        'on the whole', 'for the most part',
        'by and large', 'as a general rule',
        'in general', 'most of the time',
        'plenty of', 'a wide range',
        'a great variety', 'a vast amount',
        'all kinds of', 'tons of',
        'there are lots of', 'a myriad',
        'a plethora', 'loads of',
        'all sorts of'
    ]):
        return 'generalising'
    
    # 12. Sequencing
    if any(w in e for w in [
        'first of all', 'firstly', 'first off',
        'secondly', 'thirdly', 'lastly',
        'finally', 'to begin with', 'to start with',
        'subsequently', 'later on', 'after that',
        'after this', 'next,', 'next ',
        'then,', 'then ',
        'last but not least', 'on top of that',
        'moving on', 'the next point',
        'following that', 'eventually',
        'meanwhile', 'in the meantime'
    ]):
        return 'sequencing'
    
    # 13. Cause & Effect
    if any(w in e for w in [
        'because', 'since', 'as a result',
        'therefore', 'consequently', 'thus',
        'due to', 'owing to', 'the reason',
        'this is why', 'that\'s why',
        'lead to', 'result in', 'ripple effect',
        'root cause', 'contributing factor',
        'the rationale', 'this has led',
        'as a matter of fact',
        'one of the reasons',
        'one contributing factor',
        'this is largely due',
        'the most prominent reason',
        'the reason why'
    ]):
        return 'cause-effect'
    
    # 14. Contrasting
    if any(w in e for w in [
        'however', 'but ', 'although', 'though',
        'despite', 'nevertheless', 'nonetheless',
        'on the other hand', 'in contrast',
        'conversely', 'whereas', 'while ',
        'even though', 'having said that',
        'that being said', 'mind you',
        'all the same', 'admittedly',
        'granted', 'but if',
        'instead of', 'rather than',
        'yet,', 'yet '
    ]):
        return 'contrasting'
    
    # 15. Comparing
    if any(w in e for w in [
        'compared to', 'compared with', 'in comparison',
        'similarly', 'likewise', 'in the same way',
        'by comparison', 'equally',
        'as ... as', 'not as ... as',
        'in a similar vein', 'on a similar note',
        'both ... and', 'as with'
    ]):
        return 'comparing'
    
    # 16. Agreement
    if any(w in e for w in [
        'i agree', 'i concur', 'absolutely',
        'definitely', 'exactly', 'spot on',
        'i couldn\'t agree', "couldn't agree",
        'you\'re right', 'that\'s true',
        'i think so too', 'my thoughts exactly',
        'tell me about it', 'for real',
        'no doubt', 'good point',
        'i\'m with you', 'i\'m of the same',
        'i completely agree', 'without a doubt',
        'i share the same', 'i second that',
        'i totally support', 'you have a point',
        'there\'s a point there',
        'i don\'t mind', 'i\'d say so',
        'i have no doubt'
    ]):
        return 'agreement'
    
    # 17. Disagreement
    if any(w in e for w in [
        'i disagree', 'i beg to differ',
        'not necessarily', 'i see it differently',
        'i\'m afraid i', 'i don\'t think so',
        'that\'s not entirely', 'i fail to see',
        'i\'m not so sure', 'i wouldn\'t say',
        'not really', 'yes, but',
        'that may be true, but',
        'irespectfully', 'with all due respect',
        'i\'d argue the opposite',
        'i\'m not convinced',
        'everyone\'s entitled to their',
        'you\'re entitled to your'
    ]):
        return 'disagreement'
    
    # 18. Uncertainty
    if any(w in e for w in [
        'i might be wrong', 'i\'m not sure',
        'maybe', 'perhaps', 'it could be',
        'it might be', 'i guess',
        'i suppose', 'hypothetically',
        'if i had to guess', 'if i were to',
        'educated guess', 'wild guess',
        'my speculation', 'one possible',
        'it\'s hard to say', 'who knows',
        'beats me', 'on the fence',
        'up in the air', "i can't say for sure",
        'i\'m not certain', 'i\'m not positive',
        'it depends', 'that depends',
        'hard to tell', 'difficult to say',
        'i couldn\'t say'
    ]):
        return 'uncertainty'
    
    # 19. Examples
    if any(w in e for w in [
        'for example', 'for instance',
        'such as', 'to name a few',
        'a good example', 'a great example',
        'example is that', 'case in point',
        'let\'s say', 'like',
        'take ... as an example',
        'take ... for example',
        'ranging from', 'illustrate',
        'to give you an example',
        'one example would be',
        'exhibit a', 'exhibit b',
        'to cite an example'
    ]):
        return 'giving-examples'
    
    # 20. Specifying
    if any(w in e for w in [
        'specifically', 'to be precise',
        'to be specific', 'precisely speaking',
        'specifically speaking', 'going into details',
        'namely', 'particularly',
        'notably', 'in particular',
        'more specifically', 'more precisely',
        'especially'
    ]):
        return 'specifying'
    
    # 21. Adding info
    if any(w in e for w in [
        'apart from', 'in addition', 'additionally',
        'furthermore', 'moreover', 'besides',
        'plus', 'also', 'on top of that',
        'another thing', 'another reason',
        'what\'s more', 'not only that',
        'and another', 'one more thing',
        'along with', 'as well as'
    ]):
        return 'adding-info'
    
    # Default: keep as opinion-intro (genuine opinion markers)
    return 'opinion-intro'


# ── Apply refinement ──
changes = defaultdict(int)
tag_updates = defaultdict(list)

for m in markers:
    old_cat = m.get('categoryIds', ['cat-opinion-intro'])[0]
    expr = m['expression']
    new_cat_id = refine_category(expr)
    new_cat_full = CAT_ALIASES.get(new_cat_id, 'cat-opinion-intro')
    
    if old_cat != new_cat_full:
        m['categoryIds'] = [new_cat_full]
        changes[new_cat_id] += 1
        
        # Update tags too
        cat_tags = {
            'perspective': ['perspective', 'part3'],
            'summarising': ['summary', 'conclusion'],
            'clarification-req': ['clarification'],
            'stalling-fillers': ['fluency', 'stalling'],
            'commenting': ['fluency', 'reaction'],
            'emphasis': ['emphasis'],
            'reformulation': ['fluency', 'rephrasing'],
            'recalling': ['narrative', 'memory'],
            'shared-knowledge': ['shared-knowledge'],
            'topic-intros': ['topic-introduction'],
            'generalising': ['generalisation'],
            'sequencing': ['sequencing'],
            'cause-effect': ['reasoning', 'causality'],
            'contrasting': ['contrast', 'concession'],
            'comparing': ['comparison'],
            'agreement': ['agreement'],
            'disagreement': ['disagreement'],
            'uncertainty': ['hedging', 'uncertainty'],
            'giving-examples': ['exemplification'],
            'specifying': ['specification'],
            'adding-info': ['addition'],
            'opinion-intro': ['opinion'],
        }
        if new_cat_id in cat_tags:
            m['tags'] = cat_tags[new_cat_id]

print("Category refinements applied:")
for cat, count in sorted(changes.items(), key=lambda x: -x[1]):
    print(f"  → {cat}: {count}")

# ── Final category counts ──
final_counts = defaultdict(int)
for m in markers:
    for cid in m.get('categoryIds', []):
        final_counts[cid.replace('cat-', '')] += 1

print(f"\nFinal category distribution:")
for cat, count in sorted(final_counts.items(), key=lambda x: -x[1]):
    print(f"  {cat:30s}: {count}")

# ── Sanity check: still 460 unique? ──
print(f"\nTotal markers: {len(markers)}")
unique_exprs = set(m['expression'].lower().strip() for m in markers)
print(f"Unique expressions: {len(unique_exprs)}")

# ── Check opinion-intro leftovers ──
remaining_opinion = [m for m in markers if 'cat-opinion-intro' in m.get('categoryIds', [])]
print(f"\nRemaining opinion-intro: {len(remaining_opinion)}")
if remaining_opinion:
    print("First 10:")
    for m in remaining_opinion[:10]:
        print(f"  • {m['expression']}")

# ── Save ──
with open('/Users/agentii/dev/ielts-with-kee/discourse-markers/markers.json', 'w') as f:
    json.dump(markers, f, indent=2, ensure_ascii=False)
print(f"\n✅ Updated markers.json saved")
