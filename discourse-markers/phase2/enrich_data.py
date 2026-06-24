#!/usr/bin/env python3
"""
CEFR Distribution + ZH Translations + Scenarios for Discourse Markers Phase 2.2
This is a comprehensive data enrichment script.
"""
import json

with open('markers.json') as f:
    markers = json.load(f)
with open('subfunctions.json') as f:
    subs = json.load(f)
with open('categories.json') as f:
    cats = json.load(f)

sf_map = {}
for s in subs:
    sf_map[s['id']] = (s['categorySlug'], s['name']['en'])

# ============================================================
# CEFR ASSIGNMENT — by (categorySlug, subfunction_name_en)
# ============================================================
CEFR_RULES = {
    ('stalling-fillers', 'Buying Time'): 'A1',
    ('stalling-fillers', 'Thinking Pause'): 'A2',
    ('stalling-fillers', 'Word-Finding'): 'A2',
    ('addition-reinforcement', 'Equal Weight'): 'A2',
    ('addition-reinforcement', 'Stronger Emphasis'): 'B1',
    ('addition-reinforcement', 'Surprising Addition'): 'B2',
    ('contrast-concession', 'Concessive'): 'B1',
    ('contrast-concession', 'Direct Contrast'): 'A2',
    ('contrast-concession', 'Surprising Contrast'): 'B2',
    ('cause-effect', 'Direct Cause'): 'A2',
    ('cause-effect', 'Inferred Cause'): 'B1',
    ('cause-effect', 'Root Cause'): 'B2',
    ('sequence-ordering', 'Chronological'): 'A1',
    ('sequence-ordering', 'Importance Order'): 'B1',
    ('sequence-ordering', 'Logical Sequence'): 'B2',
    ('comparison-similarity', 'Similarity'): 'A2',
    ('comparison-similarity', 'Difference'): 'B1',
    ('comparison-similarity', 'Degree'): 'B2',
    ('exemplification', 'Representative Cases'): 'B1',
    ('exemplification', 'Specific Examples'): 'A2',
    ('generalization-qualification', 'Broad Generalisation'): 'B1',
    ('generalization-qualification', 'Qualified Generalisation'): 'B2',
    ('emphasis-highlighting', 'Highlight Key Point'): 'B1',
    ('emphasis-highlighting', 'Noteworthy Point'): 'B2',
    ('emphasis-highlighting', 'Singular Emphasis'): 'C1',
    ('summarizing-concluding', 'Summarising'): 'B1',
    ('summarizing-concluding', 'Concluding'): 'B2',
    ('topic-introduction', 'Introducing a Topic'): 'B1',
    ('topic-shift', 'Switching Topic'): 'B1',
    ('topic-return', 'Returning to Topic'): 'B1',
    ('turn-taking', 'Taking the Turn'): 'B1',
    ('turn-taking', 'Yielding the Turn'): 'B2',
    ('clarification-rephrasing', 'Explaining'): 'B1',
    ('clarification-rephrasing', 'Redefining'): 'B2',
    ('floor-holding', 'Holding the Floor'): 'B2',
    ('shared-knowledge-referencing', 'Checking Understanding'): 'B1',
    ('shared-knowledge-referencing', 'Common Ground'): 'B1',
    ('certainty-confidence', 'Certain'): 'B1',
    ('certainty-confidence', 'Personal View'): 'A2',
    ('certainty-confidence', 'Strong Conviction'): 'C1',
    ('uncertainty-hedging', 'Cautious Opinion'): 'B1',
    ('uncertainty-hedging', 'Uncertain'): 'A2',
    ('doubt-skepticism', 'Probable'): 'B2',
    ('agreement-confirmation', 'Agreeing'): 'A2',
    ('agreement-confirmation', 'Partial Agreement'): 'B1',
    ('disagreement-opposition', 'Polite Disagreement'): 'B2',
    ('surprise-incredulity', 'Surprise'): 'B1',
    ('emotional-reaction', 'Regret'): 'B1',
    ('emotional-reaction', 'Sincerity'): 'B1',
    ('reformulation', 'Rephrasing'): 'B1',
    ('reformulation', 'Simplifying'): 'A2',
    ('self-correction', 'Self-Correction'): 'B1',
    ('approximation-vagueness', 'Approximation'): 'B1',
    ('softening-downtoners', 'Avoiding Absolutes'): 'B2',
    ('softening-downtoners', 'Softening Force'): 'B1',
}

# ============================================================
# ZH TRANSLATIONS — pedagogical translations for Chinese learners
# Format: {expression: {collocation, contexts, connotation, example}}
# ============================================================
zh = {
    # === STALLING & FILLERS (A1-A2) ===
    'you know': {'coll': '[陈述句], you know, + [想不起来的词]', 'ctx': '句子中间想不起词时使用', 'conn': '非正式，友好', 'ex': '我需要拿那个，你知道的，开酒瓶的那个东西。'},
    "what's it called": {'coll': "what's it called, + [想不起来的名称]", 'ctx': '记不起事物名称时使用', 'conn': '非正式，口语化', 'ex': '我们去了那个叫什么来着，车站后面的咖啡馆。'},
    "it's on the tip of my tongue": {'coll': '[主语] is on the tip of my tongue', 'ctx': '接近想起但暂时记不起来时使用', 'conn': '非正式，形象化', 'ex': '她叫……唉，就在我嘴边。给我一秒钟。'},
    'the word for': {'coll': 'the word for + [概念]', 'ctx': '知道概念但找不到准确词语时使用', 'conn': '中性', 'ex': '有一个词形容别人主动帮助你——那个词叫什么？'},
    'what do you call it': {'coll': 'what do you call it, + [描述]', 'ctx': '描述一件事但想不起名称时使用', 'conn': '非正式，口语化', 'ex': '她做了那种事——叫什么来着——她对我进行了煤气灯效应。'},
    'um': {'coll': 'Um, + [句子]', 'ctx': '思考时发出的犹豫声音', 'conn': '非正式，口语中非常常见', 'ex': '那家餐厅，嗯，你知道那个有红色遮阳篷的地方吗？'},
    'well': {'coll': 'Well, + [回答/陈述]', 'ctx': '回答前表示思考或缓和语气', 'conn': '中性，口语中最常见的开场词', 'ex': '嗯，我以前真没有那样想过。'},
    'let me see': {'coll': 'Let me see... + [回答]', 'ctx': '需要片刻回忆或考虑时使用', 'conn': '中性，礼貌', 'ex': '让我想想……上次说话是三月的事了。'},
    'hmm': {'coll': 'Hmm, + [回应]', 'ctx': '表示在认真思考问题', 'conn': '中性，表示深思熟虑', 'ex': '嗯，好问题。我想得看具体情况。'},
    'how shall I put it': {'coll': 'How shall I put this, + [委婉表达]', 'ctx': '需要谨慎措辞时使用', 'conn': '中性偏礼貌', 'ex': '该怎么说呢——不算灾难，但绝对不理想。'},
    'give me a second': {'coll': 'Give me a second, + [后续]', 'ctx': '需要短暂思考时间时使用', 'conn': '非正式，友好', 'ex': '给我一秒钟，我想把这话说准确。'},
    "that's an interesting question": {'coll': "That's an interesting question, + [回答]", 'ctx': '争取思考时间的礼貌表达', 'conn': '礼貌，通用', 'ex': '好问题——我还真没认真想过。'},
    'I mean': {'coll': 'I mean, + [澄清/修正]', 'ctx': '用于澄清、修正或进一步解释', 'conn': '非正式，口语化，高频', 'ex': '我是说，不是我不想去，只是已经有安排了。'},
    'the thing is': {'coll': 'The thing is, + [解释/理由]', 'ctx': '引出解释、理由或反对意见', 'conn': '非正式，常用', 'ex': '问题是，那个周末我已经有其他安排了。'},
    'like I said': {'coll': 'Like I said, + [重复/总结]', 'ctx': '回到之前说过的话', 'conn': '非正式', 'ex': '就像我说的，整个旅程就是一场喜剧灾难。'},
    'actually': {'coll': 'Actually, + [纠正/新信息]', 'ctx': '纠正自己或引入意外信息', 'conn': '中性，多功能', 'ex': '等等，我搞混日期了。是星期四。'},
    'to be honest': {'coll': 'To be honest, + [坦白的话]', 'ctx': '引出诚实的看法', 'conn': '中性，增加可信度', 'ex': '说实话，那份报告还没开始写。'},
    'so yeah': {'coll': 'So yeah, + [总结/结论]', 'ctx': '结束话题或引出总结', 'conn': '非正式', 'ex': '所以，主要收获是我们要更好的文件管理。'},
    
    # === REFORMULATION ===
    'or rather': {'coll': '[内容], or rather, [更准确的内容]', 'ctx': '当场纠正自己，换一个更准确的说法', 'conn': '中性，表示自我修正', 'ex': '我们下午三点见面，不，应该说三点半。'},
    'let me rephrase that': {'coll': 'Let me rephrase that, + [更好的说法]', 'ctx': '意识到之前的表达不清楚时重新表述', 'conn': '中性偏正式', 'ex': '让我重新说——问题不在于预算，而在于时间安排。'},
    'what I meant was': {'coll': 'What I meant was, + [澄清]', 'ctx': '澄清之前可能被误解的话', 'conn': '中性，礼貌', 'ex': '我意思是，不是说你的方案不好，只是需要更多调研。'},
    'scratch that': {'coll': 'Scratch that, + [更正]', 'ctx': '完全否定自己刚说的话并重新开始', 'conn': '非正式，口语化', 'ex': '取消刚才说的——我查了日历，那天我有空。'},
    'in other words': {'coll': '[观点], in other words, [更简洁的版本]', 'ctx': '换一种方式表达同一个意思', 'conn': '中性，学术和日常都可用', 'ex': '公司需要重组，换句话说，我们要裁掉一半的人。'},
    'put another way': {'coll': '[观点], put another way, [另一种说法]', 'ctx': '提供另一种表达方式帮助理解', 'conn': '中性偏正式', 'ex': '这个政策有风险。换个说法，我们可能在拿公司的未来赌博。'},
    'that is to say': {'coll': '[内容], that is to say, [精确解释]', 'ctx': '引出更精确的解释', 'conn': '正式，书面感', 'ex': '公司进入了转型期，也就是说，我们正在从传统模式转向数字化。'},
    "what I'm trying to say is": {'coll': "What I'm trying to say is, + [核心观点]", 'ctx': '当之前的表达不够清楚时点明核心', 'conn': '中性，口语化', 'ex': '我想说的是，我们得在月底前做决定。'},
    'essentially': {'coll': 'Essentially, + [核心要点]', 'ctx': '提取复杂信息中的核心', 'conn': '中性，常用于总结', 'ex': '本质上，这两个方案的目标是一样的，只是手段不同。'},
    'to put it differently': {'coll': '[观点], to put it differently, [换种说法]', 'ctx': '用不同的角度表达相同观点', 'conn': '中性偏正式', 'ex': '他没有被开除。换个说法，公司和他达成了友好分手协议。'},
    'basically': {'coll': 'Basically, + [简化版]', 'ctx': '用最简单的方式解释复杂内容', 'conn': '非正式，口语化', 'ex': '简单说，就是我们的服务器不够用了。'},
    'in a nutshell': {'coll': 'In a nutshell, + [极简总结]', 'ctx': '用一句话概括复杂情况', 'conn': '非正式，形象化', 'ex': '简而言之，我们预算超了，时间不够了，客户也不满意。'},
    'put simply': {'coll': 'Put simply, + [简化版本]', 'ctx': '用最简单的话解释', 'conn': '中性，适合书面和口语', 'ex': '简单来说，收入跟不上支出。'},
    'the long and short of it': {'coll': 'The long and short of it is, + [总结]', 'ctx': '不顾细节只讲核心结论', 'conn': '非正式，口语化', 'ex': '长话短说，我们没拿到那个项目。'},
    'at the end of the day': {'coll': 'At the end of the day, + [最终结论]', 'ctx': '忽略细节后最重要的结论', 'conn': '非正式，常在讨论结束时用', 'ex': '归根结底，重要的是客户是否满意。'},
    'all I\'m saying is': {'coll': "All I'm saying is, + [观点]", 'ctx': '弱化你的观点以避免争论', 'conn': '非正式，缓和语气', 'ex': '我只是说，也许我们该再考虑一下。'},
    
    # === ADDITION ===
    'also': {'coll': 'Also, + [附加信息]', 'ctx': '添加相关信息或观点', 'conn': '中性，最常用的添加词', 'ex': '我们也需要考虑竞争对手的动向。'},
    'in addition': {'coll': 'In addition, + [附加信息]', 'ctx': '正式地添加信息或论点', 'conn': '正式，学术或商务写作', 'ex': '此外，我们需要培训现有员工使用新系统。'},
    'plus': {'coll': 'Plus, + [附加理由]', 'ctx': '非正式地添加理由', 'conn': '非正式，口语化', 'ex': '而且，他们给的报价比别家便宜不少。'},
    'moreover': {'coll': 'Moreover, + [进一步论点]', 'ctx': '添加更有力的论点', 'conn': '非常正式，学术写作', 'ex': '此外，该政策还可能导致中小企业面临更多合规负担。'},
    'as well as': {'coll': '[A] as well as [B]', 'ctx': '同时提及两个事物', 'conn': '中性，书面和口语都可用', 'ex': '这个项目需要技术能力以及沟通技巧。'},
    'and also': {'coll': '[A], and also [B]', 'ctx': '通过重复强调附加信息', 'conn': '非正式', 'ex': '我买了牛奶、面包，还买了鸡蛋。'},
    "what's more": {'coll': "What's more, + [更强的论点]", 'ctx': '添加更重要或令人惊讶的信息', 'conn': '非正式，有强调感', 'ex': '而且，他们还在最后一刻涨价了。'},
    'furthermore': {'coll': 'Furthermore, + [额外论点]', 'ctx': '在已有论点基础上进一步推进', 'conn': '非常正式，学术写作', 'ex': '此外，实验数据也支持了我们的假设。'},
    'not only that': {'coll': 'Not only that, but + [额外信息]', 'ctx': '强调除了已经提到的之外还有更多', 'conn': '非正式，有强调感', 'ex': '不仅如此，他们还承诺提供免费维护。'},
    'on top of that': {'coll': 'On top of that, + [额外负面/正面]', 'ctx': '在已有情况上叠加新的情况', 'conn': '非正式', 'ex': '更糟糕的是，我们的主要投资者也撤资了。'},
    'to make matters worse': {'coll': 'To make matters worse, + [更坏的消息]', 'ctx': '在糟糕情况下雪上加霜', 'conn': '中性，用于负面情境', 'ex': '更糟的是，暴风雪导致所有航班都取消了。'},
    'on top of all that': {'coll': 'On top of all that, + [额外的负担]', 'ctx': '在一系列情况之上再加一条', 'conn': '非正式', 'ex': '除了这些，我的车还在这周坏了。'},
    'incidentally': {'coll': 'Incidentally, + [相关话题]', 'ctx': '顺带提及相关信息', 'conn': '正式，偏书面', 'ex': '顺便提一下，原来的项目负责人已经离职了。'},
    'come to think of it': {'coll': 'Come to think of it, + [突然想到的]', 'ctx': '突然想起或意识到某事', 'conn': '非正式，口语化', 'ex': '说起来，我昨天好像在商场看到他了。'},
    "it's worth mentioning": {'coll': "It's worth mentioning that + [值得注意的点]", 'ctx': '礼貌地引入值得注意的信息', 'conn': '中性，偏正式', 'ex': '值得一提的是，她在短短六个月内就完成了项目。'},
    'by the way': {'coll': 'By the way, + [新话题/附加信息]', 'ctx': '顺带提一下无关但相关的事', 'conn': '非正式，口语化', 'ex': '对了，你上次推荐的那本书我看了，非常棒。'},
    'and another thing': {'coll': 'And another thing, + [额外的抱怨/观点]', 'ctx': '在列举中添加最后一条', 'conn': '非正式，有时带抱怨语气', 'ex': '还有一件事，你的报告格式完全不对。'},
    'while I think of it': {'coll': 'While I think of it, + [临时想起的事]', 'ctx': '在忘记之前赶紧说', 'conn': '非正式，口语化', 'ex': '趁我记得，你妈妈让你周末给她打个电话。'},
    
    # === CAUSE & EFFECT ===
    'because of': {'coll': 'because of + [名词/名词短语]', 'ctx': '指出直接原因', 'conn': '中性，通用', 'ex': '由于天气原因，比赛推迟了。'},
    'as a result': {'coll': '[原因], as a result, [结果]', 'ctx': '引出前因带来的结果', 'conn': '中性，学术和日常都可用', 'ex': '公司亏损严重，结果不得不裁员。'},
    'due to': {'coll': 'due to + [名词短语]', 'ctx': '正式地指出原因', 'conn': '正式，书面语', 'ex': '由于资金不足，项目被暂停了。'},
    'thanks to': {'coll': 'thanks to + [名词/名词短语]', 'ctx': '指出积极的原因（有时也讽刺地用）', 'conn': '非正式，偏正面', 'ex': '多亏了大家的努力，我们提前完成了目标。'},
    'led to': {'coll': '[A] led to [B]', 'ctx': '指出A导致B', 'conn': '中性，客观描述因果关系', 'ex': '管理层的错误决策导致了公司的倒闭。'},
    'brought about': {'coll': '[A] brought about [B]', 'ctx': '指出A引发了B（通常是重大变化）', 'conn': '中性偏正式', 'ex': '互联网彻底改变了我们获取信息的方式。'},
    'must have been': {'coll': '[主语] must have been [原因]', 'ctx': '表达对过去事件的推测性原因', 'conn': '中性，表示逻辑推论', 'ex': '他一定很累了，连会都没开完就睡着了。'},
    'which suggests': {'coll': '[A], which suggests [推论]', 'ctx': '基于证据给出推断', 'conn': '中性，学术推理', 'ex': '销售额下降了20%，说明我们的定价策略可能有问题。'},
    'it stands to reason': {'coll': 'It stands to reason that + [逻辑结论]', 'ctx': '基于常识和逻辑的合理推论', 'conn': '正式，偏学术', 'ex': '按理说，如果你训练得更努力，成绩就会提高。'},
    'judging by': {'coll': 'Judging by + [证据], [结论]', 'ctx': '根据可见证据做出判断', 'conn': '中性，日常推理', 'ex': '从队伍的长度来看，这家餐厅应该很好吃。'},
    'probably because': {'coll': '[现象], probably because + [推测原因]', 'ctx': '给出不太确定的原因', 'conn': '中性，日常对话', 'ex': '他迟到了，可能是因为堵车。'},
    'the likely explanation is': {'coll': 'The likely explanation is that + [最可能的原因]', 'ctx': '给出最合理的解释', 'conn': '中性偏正式', 'ex': '最可能的解释是系统出现了临时故障。'},
    'the reason is': {'coll': 'The reason is that + [原因]', 'ctx': '引出原因的核心', 'conn': '中性，通用', 'ex': '原因是我们的服务器不足以支撑这么大的访问量。'},
    'at the heart of it': {'coll': 'At the heart of it, + [根本原因]', 'ctx': '指出问题的核心原因', 'conn': '中性，有洞察感', 'ex': '核心问题在于我们缺乏明确的目标。'},
    'stems from': {'coll': '[问题] stems from + [根源]', 'ctx': '指出问题的根源所在', 'conn': '正式，书面语', 'ex': '许多社会问题源于贫富差距。'},
    "it all goes back to": {'coll': "It all goes back to + [根本原因]", 'ctx': '追溯问题的根本源头', 'conn': '非正式，口语化', 'ex': '归根结底，是我们一开始就没有规划好。'},
    'the underlying issue is': {'coll': 'The underlying issue is that + [深层问题]', 'ctx': '指出表层问题之下的根本问题', 'conn': '正式，分析性语言', 'ex': '根本问题不是技术，而是团队沟通不畅。'},
    'at the root of': {'coll': 'at the root of + [问题] is + [根本原因]', 'ctx': '指出问题的根源', 'conn': '正式，学术感', 'ex': '这个问题的根源在于缺乏有效的监管。'},
}

# Apply CEFR
cefr_counts = {}
for m in markers:
    sf_ids = m.get('subfunctionIds', [])
    if sf_ids:
        slug, sf_name = sf_map.get(sf_ids[0], ('unknown', 'unknown'))
        cefr = CEFR_RULES.get((slug, sf_name), 'B1')
    else:
        cefr = 'B1'
    m['cefr'] = cefr
    cefr_counts[cefr] = cefr_counts.get(cefr, 0) + 1

print("=== CEFR distribution ===")
for k in sorted(cefr_counts):
    print(f"  {k}: {cefr_counts[k]}")

# Apply ZH translations
zh_applied = 0
for m in markers:
    expr = m['expression']
    if expr in zh:
        t = zh[expr]
        m['collocation']['zh'] = t['coll']
        m['contexts']['zh'] = t['ctx']
        m['connotation']['zh'] = t['conn']
        m['example']['zh'] = t['ex']
        zh_applied += 1

print(f"\n=== ZH translations: {zh_applied}/{len(markers)} ===")

# ============================================================
# SCENARIOS — populate categories.json
# ============================================================
scenarios_map = {
    'cat-001': [
        'You want to add another reason to support your argument',
        'You are listing multiple factors in an essay',
        'You want to emphasize an additional point in a discussion',
    ],
    'cat-002': [
        'You need to present an opposing viewpoint',
        'You want to acknowledge a counterargument before refuting it',
        'You are comparing two different approaches or opinions',
    ],
    'cat-003': [
        'You need to explain why something happened',
        'You are analyzing the consequences of an action',
        'You want to trace a problem back to its root cause',
    ],
    'cat-006': [
        'You are describing a process step by step',
        'You want to organize your points in order of importance',
        'You are narrating a sequence of events',
    ],
    'cat-007': [
        'You want to highlight similarities between two things',
        'You need to point out key differences',
        'You are emphasizing the degree of difference',
    ],
    'cat-008': [
        'You want to give a concrete example to illustrate your point',
        'You are providing evidence to support your argument',
    ],
    'cat-009': [
        'You need to make a broad statement without overcommitting',
        'You want to qualify your generalization with exceptions',
    ],
    'cat-010': [
        'You need to stress the most important point',
        'You want to draw attention to a critical detail',
    ],
    'cat-011': [
        'You are wrapping up your argument',
        'You want to present the final takeaway of your discussion',
    ],
    'cat-013': [
        'You forgot a word mid-sentence and need time to recall it',
        'You need a moment to think before answering a difficult question',
        'You are looking for the right word to express yourself',
    ],
    'cat-014': [
        'You want to introduce a new topic into the conversation',
    ],
    'cat-015': [
        'The discussion has drifted and you want to change direction',
    ],
    'cat-016': [
        'You got sidetracked and want to return to the original topic',
    ],
    'cat-017': [
        'You want to enter the conversation without interrupting rudely',
        'You are finished speaking and want to give the floor to someone else',
    ],
    'cat-020': [
        'Your listener looks confused and you need to explain better',
        'You want to define a term more precisely',
    ],
    'cat-022': [
        'You need to keep speaking while you gather your thoughts',
    ],
    'cat-063': [
        'You want to check if your listener understands your reference',
        'You are appealing to shared knowledge or common experience',
    ],
    'cat-023': [
        'You want to express a strong opinion confidently',
        'You are stating a personal view without hesitation',
        'You want to emphasize your conviction about something',
    ],
    'cat-024': [
        'You are not 100% sure about your statement',
        'You want to express doubt or hesitation politely',
    ],
    'cat-025': [
        'You are skeptical about a claim and want to express doubt',
    ],
    'cat-026': [
        'You completely agree with what someone said',
        'You agree but with some reservations',
    ],
    'cat-027': [
        'You disagree with someone but want to remain polite',
    ],
    'cat-028': [
        'You heard something unexpected and want to react',
    ],
    'cat-032': [
        'You want to express regret about a past decision',
        'You want to emphasize sincerity',
    ],
    'cat-056': [
        'Your previous statement was unclear and needs rephrasing',
        'You want to explain something in simpler terms',
    ],
    'cat-057': [
        'You made an error and need to correct yourself immediately',
    ],
    'cat-058': [
        'You need to be vague because you don\'t know exact details',
    ],
    'cat-049': [
        'You want to avoid sounding too absolute or harsh',
        'You want to soften the impact of a critical statement',
    ],
}

for cat in cats:
    cid = cat['id']
    if cid in scenarios_map:
        cat['scenarios'] = scenarios_map[cid]

scenario_count = sum(len(c.get('scenarios', [])) for c in cats)
print(f"\n=== Scenarios populated: {scenario_count} across {len(cats)} categories ===")

# Save
with open('markers.json', 'w') as f:
    json.dump(markers, f, ensure_ascii=False, indent=2)
with open('categories.json', 'w') as f:
    json.dump(cats, f, ensure_ascii=False, indent=2)

print("\n✅ markers.json and categories.json saved.")
print(f"   ZH: {zh_applied}/{len(markers)} markers translated")
print(f"   CEFR: distributed across {len(cefr_counts)} levels")
print(f"   Scenarios: {scenario_count} scenarios written")
