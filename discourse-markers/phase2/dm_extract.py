#!/usr/bin/env python3
"""
Phase 2.2 — Mind Map DM Extraction & Gap Analysis
Extract ALL discourse marker phrases from SrKeeda's IELTS Speaking mind map
and cross-reference against existing markers.json.
"""
import json, re, sys
from collections import defaultdict

# ── Load data ──
with open('/Users/agentii/dev/ielts-with-kee/ielts-speaking-mindmap.json') as f:
    mm = json.load(f)

with open('/Users/agentii/dev/ielts-with-kee/discourse-markers/markers.json') as f:
    existing_markers = json.load(f)

# ── Smart DM phrase extraction ──

# Known non-DM subtrees to skip
SKIP_PARENTS = {
    'Part 1', 'Part 2', 'Part 3', 'Format', 'Task focus',
    'Grading', 'Lexical resource', 'Grammatical range and accuracy',
    'Fluency & coherence', 'The key indicators',
    'Pronunciation', 'Phonics', 'Connected speech',
    'Skills', 'Test Skills', 'General skills',
    'Vocab', 'Vocabulary', 'Pronunciation',
    'Hometown', 'Study', 'Work', 'Food', 'Music', 'Art',
    'Objects', 'Places', 'People', 'Experiences',
    'Social Media', 'Technology', 'Environment',
    'Trains of thoughts', 'Checklists for Trains of Thoughts',
    'Common topics', 'Question Pool', 'Sampled Pt3 Qs',
    'Pt 2 Material pool', 'Follow-up Pt3 Qs',
    'Answer Archetypes',
}

# DM-specific branches we WANT to extract from
DM_BRANCH_MARKERS = {
    'Stalling', 'Filler words', 'Comment on the question',
    'Difficult question', 'Emphasis', 'Sequencing', 'Sequencing - ordering information',
    'Adding information', 'Adding another point', 'Adding a detail',
    'Indicating opinion & attitude', 'Yes', 'No', 'Agree', 'Disagree',
    'Uncertain', 'Comparing', 'Contrasting', 'Giving examples',
    'Explanation', 'Cause & Effect', 'Generalising', 'Topic introducers',
    'Recalling', 'Shared knowledge', 'Re-organise the way you speak',
    'Discourse Markers', 'Listing', 'Generalisation', 'Specifics',
    'Critical thinking', 'Answer', 'Detail',
}

def is_dm_subtree(path_set):
    """Check if this path contains DM-relevant branch."""
    return bool(path_set & DM_BRANCH_MARKERS)

def extract_dm_phrases(node, path=None, depth=0, output=None):
    """Extract actual discourse marker phrases from the mind map."""
    if output is None:
        output = []
    if path is None:
        path = set()
    
    if not isinstance(node, dict):
        return output
    
    title = node.get('title', '').strip()
    
    # Clean XMind artifacts: curly braces, brackets, parentheses
    clean_title = title.split('{')[0].split('[')[0].strip()
    clean_title = re.sub(r'^["*\-•·]+', '', clean_title).strip()
    clean_title = clean_title.rstrip(',').strip()
    
    # Skip if too long or clearly not a DM
    if clean_title and len(clean_title) > 100:
        pass  # Don't add to output but still check children
    elif clean_title and '...' in title and len(title) < 80:
        # Phrases with ellipsis are often DM templates
        if is_dm_subtree(path) or depth >= 1:
            output.append({
                'phrase': clean_title,
                'path': ' -> '.join(sorted(path)) if path else '',
                'depth': depth
            })
    
    children = node.get('children', {})
    if isinstance(children, dict):
        for key, val in children.items():
            if isinstance(val, list):
                for child in val:
                    child_title = child.get('title', '').strip() if isinstance(child, dict) else ''
                    clean_child = child_title.split('{')[0].split('[')[0].strip()
                    clean_child = re.sub(r'^["*\-•·]+', '', clean_child).strip()
                    clean_child = clean_child.rstrip(',').strip()
                    
                    new_path = path | {clean_child} if clean_child else path
                    
                    extract_dm_phrases(child, new_path, depth+1, output)
    
    return output

# Extract from BOTH sheets
all_dms = []
for sheet in mm:
    root = sheet.get('rootTopic', {})
    sheet_dms = extract_dm_phrases(root)
    all_dms.extend(sheet_dms)

# Deduplicate by phrase (case-insensitive)
seen = set()
unique_dms = []
for dm in all_dms:
    key = dm['phrase'].lower().strip()
    if key and key not in seen:
        seen.add(key)
        unique_dms.append(dm)

print(f"Total DM phrases extracted: {len(all_dms)}")
print(f"Unique DM phrases: {len(unique_dms)}")
print()

# ── Cross-reference with existing markers ──
existing_exprs = set(m['expression'].lower().strip().rstrip('.') for m in existing_markers)
existing_exprs_loose = set()
for m in existing_markers:
    e = m['expression'].lower().strip().rstrip('.')
    existing_exprs_loose.add(e)
    # Also add without trailing commas, etc
    for sep in [',', '.', '?', '!']:
        existing_exprs_loose.add(e.rstrip(sep).strip())

# Classify new vs existing
existing_phrases = []
new_phrases = []
for dm in unique_dms:
    phrase = dm['phrase'].lower().strip().rstrip(',').rstrip('.').strip()
    # Check if this phrase (or close variant) exists in markers
    found = False
    for ex in existing_exprs_loose:
        if phrase == ex or phrase.startswith(ex) or ex.startswith(phrase):
            found = True
            break
    if found:
        existing_phrases.append(dm)
    else:
        new_phrases.append(dm)

print(f"Already in markers.json: {len(existing_phrases)}")
print(f"NEW (not in markers.json): {len(new_phrases)}")
print()

# ── Show new phrases ──
print("=" * 60)
print("NEW DISCOURSE MARKERS TO ADD")
print("=" * 60)
for dm in new_phrases:
    print(f"  {dm['phrase']}")

print()
print("=" * 60)
print("SAMPLE EXISTING (already covered)")
print("=" * 60)
for dm in existing_phrases[:20]:
    print(f"  {dm['phrase']}")
if len(existing_phrases) > 20:
    print(f"  ... and {len(existing_phrases)-20} more")

# ── Group new phrases by theme ──
print()
print("=" * 60)
print("THEMATIC BREAKDOWN OF NEW PHRASES")
print("=" * 60)
themes = defaultdict(list)
for dm in new_phrases:
    # Assign to a theme based on path/content
    phrase = dm['phrase'].lower()
    if any(w in phrase for w in ['i think', 'in my', 'from my', 'as far as', 'personally', 'frankly', 'honestly', 'truth be told', 'to be honest']):
        themes['Opinion & Attitude'].append(dm)
    elif any(w in phrase for w in ['agree', 'disagree', 'i concur', 'absolutely', 'definitely', 'exactly', 'spot on', 'no doubt', 'good point', 'i beg to differ']):
        themes['Agreement & Disagreement'].append(dm)
    elif any(w in phrase for w in ['first', 'second', 'next', 'then', 'lastly', 'finally', 'to begin', 'on top of', 'last but not least']):
        themes['Sequencing'].append(dm)
    elif any(w in phrase for w in ['what i', 'the thing', 'my point', 'the most', 'emphas', 'boils down', 'heart of', 'can\'t underscore']):
        themes['Emphasis'].append(dm)
    elif any(w in phrase for w in ['example', 'for instance', 'such as', 'like', 'to name a few', 'let\'s say']):
        themes['Examples'].append(dm)
    elif any(w in phrase for w in ['because', 'cause', 'reason', 'due to', 'therefore', 'as a result', 'consequently', 'thus', 'so basically', 'ripple effect']):
        themes['Cause & Effect'].append(dm)
    elif any(w in phrase for w in ['compared', 'similar', 'likewise', 'as ... as', 'unlike', 'whereas']):
        themes['Comparison'].append(dm)
    elif any(w in phrase for w in ['however', 'but', 'although', 'though', 'despite', 'nevertheless', 'on the other hand', 'instead of', 'in contrast', 'conversely']):
        themes['Contrast'].append(dm)
    elif any(w in phrase for w in ['generally', 'broadly', 'on the whole', 'as a rule', 'there are lots', 'plenty of', 'a wide range', 'at the end of the day']):
        themes['Generalising'].append(dm)
    elif any(w in phrase for w in ['when it comes', 'in terms of', 'as for', 'regarding', 'speaking of', 'if we\'re talking']):
        themes['Topic Introducers'].append(dm)
    elif any(w in phrase for w in ['remember', 'recall', 'memory', 'recollect', 'vaguely', 'vividly', 'if i']):
        themes['Recalling'].append(dm)
    elif any(w in phrase for w in ['stall', 'filler', 'well', 'i mean', 'you know', 'um', 'uh', 'hmm', 'let me see', 'give me a second', 'off the top', 'mind went blank', 'mental block']):
        themes['Stalling & Fillers'].append(dm)
    elif any(w in phrase for w in ['to put it', 'in other words', 'that is to say', 'meaning', 'i.e.', 'rephrase', 'what i mean']):
        themes['Reformulation'].append(dm)
    elif any(w in phrase for w in ['unknown', 'speculat', 'guess', 'maybe', 'perhaps', 'might be', 'could be', 'hypothetical', 'if i had to', 'if you twist', 'beats me', 'who knows', 'hard to say', 'on the fence']):
        themes['Uncertainty & Hedging'].append(dm)
    elif any(w in phrase for w in ['apart from', 'plus', 'also', 'besides', 'in addition', 'furthermore', 'moreover', 'not only', 'and']):
        themes['Addition'].append(dm)
    elif any(w in phrase for w in ['specifically', 'precisely', 'namely', 'particularly', 'notably', 'going into details']):
        themes['Specification'].append(dm)
    elif any(w in phrase for w in ['shared', 'common sense', 'well-known', 'we all know', 'as i have mentioned', 'like i said', 'bear in mind']):
        themes['Shared Knowledge'].append(dm)
    elif any(w in phrase for w in ['sorry', 'could you', 'would you mind', 'clarify', 'repeat', 'explain']):
        themes['Clarification Requests'].append(dm)
    else:
        themes['Other'].append(dm)

for theme, items in sorted(themes.items()):
    print(f"\n  {theme} ({len(items)}):")
    for dm in items[:5]:
        print(f"    • {dm['phrase']}")
    if len(items) > 5:
        print(f"    ... and {len(items)-5} more")

# ── Save gap report ──
report = {
    'total_extracted': len(all_dms),
    'unique_phrases': len(unique_dms),
    'existing_covered': len(existing_phrases),
    'new_to_add': len(new_phrases),
    'new_phrases': [dm['phrase'] for dm in new_phrases],
    'existing_phrases': [dm['phrase'] for dm in existing_phrases],
    'themes': {k: [dm['phrase'] for dm in v] for k, v in themes.items()}
}

with open('/Users/agentii/.shared/council/mailbox/004-to-002-dm-gap-analysis.json', 'w') as f:
    json.dump(report, f, indent=2, ensure_ascii=False)

print(f"\n\nGap report saved to mailbox: 004-to-002-dm-gap-analysis.json")
