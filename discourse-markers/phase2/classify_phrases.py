#!/usr/bin/env python3
"""
Generate fresh markers.json from mind map DM phrases.
Each entry gets FRESH content (no copying from existing/boilerplate).
"""
import json, re, hashlib
from collections import defaultdict

# ── Load mind map phrases ──
with open('/Users/agentii/.shared/council/mailbox/004-to-002-dm-gap-analysis.json') as f:
    gap = json.load(f)

new_phrases = gap['new_phrases']
existing_phrases = gap['existing_phrases']

# ── Category mapping from mind map taxonomy ──
CATEGORIES = {
    'stalling-fillers': {
        'name': {'en': 'Stalling & Fillers', 'zh': '拖延与填充语'},
        'color': '#9F44D3',
        'macroGroup': 'Stance, Attitude & Evaluation',
        'tags': ['fluency', 'stalling'],
        'cefr_range': 'A1-A2'
    },
    'commenting': {
        'name': {'en': 'Commenting on the Question', 'zh': '评论问题'},
        'color': '#E91E63',
        'macroGroup': 'Stance, Attitude & Evaluation',
        'tags': ['fluency', 'reaction'],
        'cefr_range': 'A2-B1'
    },
    'reformulation': {
        'name': {'en': 'Reformulation & Self-Correction', 'zh': '重述与自我纠正'},
        'color': '#FF5722',
        'macroGroup': 'Stance, Attitude & Evaluation',
        'tags': ['fluency', 'rephrasing'],
        'cefr_range': 'B1-B2'
    },
    'emphasis': {
        'name': {'en': 'Emphasis & Highlighting', 'zh': '强调与突出'},
        'color': '#FF9800',
        'macroGroup': 'Stance, Attitude & Evaluation',
        'tags': ['emphasis'],
        'cefr_range': 'B1-B2'
    },
    'opinion-intro': {
        'name': {'en': 'Introducing Opinions', 'zh': '引入观点'},
        'color': '#4CAF50',
        'macroGroup': 'Opinion & Argumentation',
        'tags': ['opinion'],
        'cefr_range': 'A2-B1'
    },
    'agreement': {
        'name': {'en': 'Agreement & Confirmation', 'zh': '同意与确认'},
        'color': '#8BC34A',
        'macroGroup': 'Opinion & Argumentation',
        'tags': ['agreement'],
        'cefr_range': 'A2-B1'
    },
    'disagreement': {
        'name': {'en': 'Disagreement & Refusal', 'zh': '不同意与拒绝'},
        'color': '#F44336',
        'macroGroup': 'Opinion & Argumentation',
        'tags': ['disagreement'],
        'cefr_range': 'B1-B2'
    },
    'uncertainty': {
        'name': {'en': 'Uncertainty & Hedging', 'zh': '不确定与模糊表达'},
        'color': '#9C27B0',
        'macroGroup': 'Stance, Attitude & Evaluation',
        'tags': ['hedging', 'uncertainty'],
        'cefr_range': 'B1-C1'
    },
    'cause-effect': {
        'name': {'en': 'Cause & Effect', 'zh': '因果关系'},
        'color': '#2196F3',
        'macroGroup': 'Logic & Cohesion',
        'tags': ['reasoning', 'causality'],
        'cefr_range': 'A2-B2'
    },
    'comparing': {
        'name': {'en': 'Comparing', 'zh': '比较'},
        'color': '#00BCD4',
        'macroGroup': 'Logic & Cohesion',
        'tags': ['comparison'],
        'cefr_range': 'A2-B2'
    },
    'contrasting': {
        'name': {'en': 'Contrasting', 'zh': '对比'},
        'color': '#FF5252',
        'macroGroup': 'Logic & Cohesion',
        'tags': ['contrast', 'concession'],
        'cefr_range': 'A2-C1'
    },
    'sequencing': {
        'name': {'en': 'Sequencing & Ordering', 'zh': '顺序与排列'},
        'color': '#3F51B5',
        'macroGroup': 'Conversation & Interaction Management',
        'tags': ['sequencing'],
        'cefr_range': 'A1-B1'
    },
    'adding-info': {
        'name': {'en': 'Adding Information', 'zh': '补充信息'},
        'color': '#009688',
        'macroGroup': 'Conversation & Interaction Management',
        'tags': ['addition'],
        'cefr_range': 'A2-B1'
    },
    'specifying': {
        'name': {'en': 'Specifying & Clarifying', 'zh': '具体说明'},
        'color': '#795548',
        'macroGroup': 'Conversation & Interaction Management',
        'tags': ['specification'],
        'cefr_range': 'B1-B2'
    },
    'giving-examples': {
        'name': {'en': 'Giving Examples', 'zh': '举例说明'},
        'color': '#CDDC39',
        'macroGroup': 'Logic & Cohesion',
        'tags': ['exemplification'],
        'cefr_range': 'A2-B1'
    },
    'generalising': {
        'name': {'en': 'Generalising', 'zh': '概括'},
        'color': '#607D8B',
        'macroGroup': 'Logic & Cohesion',
        'tags': ['generalisation'],
        'cefr_range': 'B1-B2'
    },
    'topic-intros': {
        'name': {'en': 'Topic Introducers', 'zh': '话题引入'},
        'color': '#673AB7',
        'macroGroup': 'Conversation & Interaction Management',
        'tags': ['topic-introduction'],
        'cefr_range': 'B1-B2'
    },
    'recalling': {
        'name': {'en': 'Recalling & Memory', 'zh': '回忆与记忆'},
        'color': '#FFEB3B',
        'macroGroup': 'Narrative & Description',
        'tags': ['narrative', 'memory'],
        'cefr_range': 'A2-B2'
    },
    'shared-knowledge': {
        'name': {'en': 'Shared Knowledge', 'zh': '共享知识'},
        'color': '#E040FB',
        'macroGroup': 'Metacognitive & Commentary',
        'tags': ['shared-knowledge'],
        'cefr_range': 'B1-C1'
    },
    'perspective': {
        'name': {'en': 'Perspective Framing (Part 3)', 'zh': '角度框架（Part 3）'},
        'color': '#00E5FF',
        'macroGroup': 'Stance, Attitude & Evaluation',
        'tags': ['perspective', 'part3'],
        'cefr_range': 'B2-C1'
    },
    'clarification-req': {
        'name': {'en': 'Clarification Requests', 'zh': '请求澄清'},
        'color': '#FF6F00',
        'macroGroup': 'Conversation & Interaction Management',
        'tags': ['clarification'],
        'cefr_range': 'A2-B1'
    },
    'summarising': {
        'name': {'en': 'Summarising & Concluding', 'zh': '总结与结论'},
        'color': '#1565C0',
        'macroGroup': 'Metacognitive & Commentary',
        'tags': ['summary'],
        'cefr_range': 'B1-B2'
    },
}

# ── Assign each phrase to a category ──
def classify_phrase(phrase):
    p = phrase.lower()
    # Perspective/Part 3 framing
    if any(w in p for w in ['perspective', 'standpoint', 'point of view', 'society', 
                            'government', 'policy', 'individual', 'urban', 'rural',
                            'city dweller', 'countryside', 'affluent', 'low-income',
                            'elderly', 'younger generation', 'older generation',
                            'employer', 'parent', 'shoes', 'in terms of society',
                            'at the government', 'from the public', 'for individuals',
                            'for the wealthy', 'those struggling']):
        return 'perspective'
    # Clarification requests
    if any(w in p for w in ['could you', 'would you mind', 'clarify', 'explain',
                            'repeat', 'sorry', 'i didn', "i didn't get",
                            "i don't get", 'paraphrase', 'elaborate', 'beg for pardon']):
        return 'clarification-req'
    # Stalling & fillers
    if any(w in p for w in ['stall', 'filler', 'let me think', 'gather my thoughts',
                            'what else', 'off the top', 'mental block', 'drew a blank',
                            'drawing blank', 'hit a mental', 'mind went blank',
                            'give me a sec', 'i mean', 'you know', 'well,',
                            'let me see', 'one moment']):
        return 'stalling-fillers'
    # Commenting on question
    if any(w in p for w in ['great question', 'good question', 'interesting question',
                            'challenging question', 'tricky one', 'relatable question',
                            'thought-provoking', 'what a challenging', "gotta say it's a",
                            "gotta say this", "gotta say that's",
                            "never thought about", "never crossed"]):
        return 'commenting'
    # Reformulation
    if any(w in p for w in ['rephrase', 'put it in another', 'put it another',
                            'what i mean', 'what i was trying', 'so basically what',
                            'take back what', 'lemme rephrase', 'allow me to put',
                            'in another word', 'that is to say']):
        return 'reformulation'
    # Emphasis
    if any(w in p for w in ['emphas', 'highlight', 'what ... is', 'what i wanna say',
                            'what i\'m trying', 'the thing i\'d like', 'the next thing',
                            'the most important', 'what i\'d like to point',
                            'one of the most', 'boils down', 'heart of the matter',
                            'can\'t underscore', 'my point here', 'flag your',
                            'only when', 'never have i', 'it is ... that',
                            'it is important', 'is one that', 'the ... thing',
                            'modal verb']):
        return 'emphasis'
    # Opinion
    if any(w in p for w in ['in my opinion', 'in my view', 'from my perspective',
                            'as far as i\'m concerned', 'i think', 'i reckon',
                            'i firmly believe', 'i hold the view', 'i hold the opinion',
                            'it seems to me', 'it appears to me', 'i\'d say',
                            'i guess that', 'i might be wrong', 'personally',
                            'frankly speaking', 'to be honest', 'truth be told',
                            'to tell you the truth', 'if you ask me',
                            'i\'m convinced', 'i have no doubt', 'i am sure',
                            'i find', 'my view', 'i suppose', 'i deem']):
        if any(w in p for w in ['if you twist', 'i might be wrong', 'i guess that',
                                'it could be', 'perhaps', 'maybe', 'uncertain',
                                'hard to say', 'who knows', 'beats me',
                                'on the fence', '50-50', 'hypothetical']):
            return 'uncertainty'
        return 'opinion-intro'
    # Agreement
    if any(w in p for w in ['agree', 'concur', 'same mind', 'same page', 'same opinion',
                            'couldn\'t agree', 'spot on', 'good point', 'tell me about',
                            'for real', 'my thoughts exactly', 'that\'s the spirit',
                            'no doubt', 'absolutely', 'definitely', 'certainly',
                            'of course', 'no problem', 'i\'d say so', "i don't mind",
                            'right.', 'exactly', '100%', 'totally', 'i concur',
                            'i\'m of the same', 'i totally support']):
        return 'agreement'
    # Disagreement
    if any(w in p for w in ['disagree', 'i beg to differ', 'not necessarily',
                            'i\'m afraid i', 'i failed to see', 'not so sure',
                            'in no position', 'you have a point there',
                            'there\'s a point there', 'entitled to your',
                            'everyone\'s entitled', 'i wouldn\'t say',
                            'not really', 'i see it differently',
                            'i\'d argue the opposite']):
        return 'disagreement'
    # Uncertainty/Hedging
    if any(w in p for w in ['hypothetical', 'assuming', 'speculat', 'educated guess',
                            'wild guess', 'it could be', 'my speculation',
                            'one possible', 'upside', 'downside', 'key aspect',
                            'it might be', 'if you twist', 'if i were to',
                            'based on what', 'based on my observation',
                            'could go either', 'on the fence', 'up in the air',
                            'beats me', 'who knows', 'hard to say', '50-50',
                            'i\'m on the fence', 'it\'s still up']):
        return 'uncertainty'
    # Cause & Effect
    if any(w in p for w in ['because', 'since', 'as a result', 'therefore',
                            'consequently', 'thus', 'due to', 'reason',
                            'the reason', 'cause', 'effect', 'lead to',
                            'result in', 'ripple effect', 'this has led',
                            'root cause', 'rationale', 'contributing factor',
                            'as a matter of fact', 'and the reason',
                            'that\'s why', 'so basically', 'in that case']):
        return 'cause-effect'
    # Comparing
    if any(w in p for w in ['compared to', 'compare', 'similarly', 'likewise',
                            'as ... as', 'not as ... as', 'in the same way',
                            'equally', 'much/way/far adj', 'in a similar',
                            'if i compare', 'by comparison']):
        return 'comparing'
    # Contrasting
    if any(w in p for w in ['however', 'but', 'although', 'though', 'despite',
                            'nevertheless', 'on the other hand', 'in contrast',
                            'conversely', 'whereas', 'instead of', 'on one hand',
                            'having said that', 'that being said', 'mind you',
                            'all the same', 'admittedly', 'granted',
                            'even though', 'while']):
        return 'contrasting'
    # Sequencing
    if any(w in p for w in ['first', 'second', 'third', 'next', 'then', 'lastly',
                            'finally', 'to begin', 'to start', 'subsequently',
                            'later on', 'after this', 'after that', 'eventually',
                            'meanwhile', 'following', 'last but not least',
                            'first of all', 'firstly', 'on top of that',
                            'moving on', 'the next']):
        return 'sequencing'
    # Adding info
    if any(w in p for w in ['apart from', 'in addition', 'additionally', 'furthermore',
                            'moreover', 'besides', 'plus', 'also', 'on top of that',
                            'another thing', 'another reason', 'and one more',
                            'not only that', 'what\'s more', 'and another']):
        return 'adding-info'
    # Specifying
    if any(w in p for w in ['specifically', 'to be precise', 'to be specific',
                            'precisely speaking', 'going into details',
                            'namely', 'particularly', 'notably',
                            'in particular', 'more specifically']):
        return 'specifying'
    # Examples
    if any(w in p for w in ['example', 'for instance', 'such as', 'to name a few',
                            'let\'s say', 'like', 'a great example', 'ranging from',
                            'illustrate', 'take ... as', 'case in point',
                            'for example', 'a perfect example']):
        return 'giving-examples'
    # Generalising
    if any(w in p for w in ['generally', 'broadly speaking', 'on the whole',
                            'as a rule', 'for the most part', 'in most cases',
                            'by and large', 'it is often said',
                            'there are lots', 'plenty of', 'a great variety',
                            'a wide range', 'a vast amount', 'a myriad of',
                            'a plethora of', 'tons of', 'heaps of', 'loads of',
                            'all kinds', 'most of the time',
                            'at the end of the day']):
        return 'generalising'
    # Topic introducers
    if any(w in p for w in ['when it comes', 'in terms of', 'as for', 'regarding',
                            'speaking of', 'if we\'re talking', 'as far as ... goes',
                            'as far as ... is', 'talking about', 'with regard',
                            'concerning', 'wise', 'society-wise',
                            'technology-wise']):
        # Check if perspective framing
        if any(w in p for w in ['society', 'government', 'urban', 'rural',
                                'city', 'countryside', 'elderly', 'generation',
                                'affluent', 'income', 'wealthy', 'policy',
                                'perspective']):
            return 'perspective'
        return 'topic-intros'
    # Recalling
    if any(w in p for w in ['remember', 'recall', 'memory', 'memory serves',
                            'recollect', 'vaguely', 'vividly', 'if i can remember',
                            'if i recall', 'if my memory', 'as far as i can',
                            'i remember', 'like it was yesterday',
                            'it happened so long', 'i can\'t really']):
        return 'recalling'
    # Shared knowledge
    if any(w in p for w in ['we all know', 'common sense', 'well-known',
                            'as i have mentioned', 'and again', 'bear in mind',
                            'like i said before', 'so to speak', 'as it were',
                            'in a manner of speaking', 'needless to say',
                            'it goes without saying', 'obviously']):
        return 'shared-knowledge'
    # Summarising
    if any(w in p for w in ['in short', 'to sum up', 'in conclusion', 'ultimately',
                            'all things considered', 'the takeaway',
                            'to cut a long story', 'so there you have',
                            'when all is said', 'in a nutshell',
                            'overall', 'to summarise', 'in summary']):
        return 'summarising'
    
    # Default: more opinion-intro phrases (catch-all)
    return 'opinion-intro'

# ── Test classification on a sample ──
print("Testing classification...")
samples = [
    "From a policy-making perspective, ...",
    "Could you please clarify ...",
    "If my memory serves me right, ...",
    "It all boils down to...",
    "To be honest, ...",
    "When it comes to young people, ...",
    "For affluent individuals/families...",
    "Let me think about that...",
    "I have no doubt that...",
]
for s in samples:
    cat = classify_phrase(s)
    print(f"  [{cat:20s}] {s}")

# ── Build phrase → category mapping for all new phrases ──
print(f"\nClassifying {len(new_phrases)} new phrases...")
phrase_cats = defaultdict(list)
for p in new_phrases:
    cat = classify_phrase(p)
    phrase_cats[cat].append(p)

for cat, items in sorted(phrase_cats.items()):
    print(f"  {cat}: {len(items)} phrases")

# Save mapping
output = {
    'categories': CATEGORIES,
    'phrase_categories': {k: v for k, v in phrase_cats.items()}
}
with open('/Users/agentii/.shared/council/mailbox/004-to-002-dm-phrase-classification.json', 'w') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"\nSaved to mailbox: 004-to-002-dm-phrase-classification.json")
print(f"\nTotal: {sum(len(v) for v in phrase_cats.values())} phrases classified")
