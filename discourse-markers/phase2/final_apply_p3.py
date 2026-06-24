#!/usr/bin/env python3
"""Apply ZH translations - Part 3: CAT-019, CAT-020, CAT-022"""
import json

with open("/Users/agentii/dev/ielts-with-kee/discourse-markers/phase2/zh_batch_3.json") as f:
    data = json.load(f)

m = {d['id']: d for d in data}

# CAT-019
m['dm-c709672894']['collocation']['zh'] = '置于名词前：especially + [特别强调的部分]'
m['dm-c709672894']['contexts']['zh'] = '用于在一般性陈述中，特别突出某一具体方面或群体'
m['dm-c709672894']['connotation']['zh'] = '中性'
m['dm-c709672894']['example']['zh'] = 'I enjoy outdoor activities, especially hiking in the mountains.'

m['dm-2ef2852ad9']['collocation']['zh'] = '置于句首：Going into details, + [详细说明]'
m['dm-2ef2852ad9']['contexts']['zh'] = '用于在概括性陈述后，进一步展开详细说明'
m['dm-2ef2852ad9']['connotation']['zh'] = '半正式'
m['dm-2ef2852ad9']['example']['zh'] = 'Going into details, the project has three main stages: planning, execution, and evaluation.'

m['dm-8dd2f0530d']['collocation']['zh'] = '置于句首：Precisely speaking, + [精确表述]'
m['dm-8dd2f0530d']['contexts']['zh'] = '用于对前面的内容进行精确修正或详细说明'
m['dm-8dd2f0530d']['connotation']['zh'] = '半正式'
m['dm-8dd2f0530d']['example']['zh'] = 'Precisely speaking, the population grew by 2.3 percent, not 3 percent.'

m['dm-72dc85c7c8']['collocation']['zh'] = '置于句首：Specifically speaking, + [具体的细节]'
m['dm-72dc85c7c8']['contexts']['zh'] = '用于从概括性说明过渡到具体细节'
m['dm-72dc85c7c8']['connotation']['zh'] = '半正式'
m['dm-72dc85c7c8']['example']['zh'] = 'Specifically speaking, we need to focus on three key areas: cost, quality, and service.'

m['dm-5631964b1a']['collocation']['zh'] = '置于句首或句中：Specifically, + [具体细节]'
m['dm-5631964b1a']['contexts']['zh'] = '用于提供更精确的信息或将一般性观点具体化'
m['dm-5631964b1a']['connotation']['zh'] = '半正式'
m['dm-5631964b1a']['example']['zh'] = 'Many students struggle with time management. Specifically, balancing study and social life is hard.'

m['dm-26dbc48d13']['collocation']['zh'] = '置于句首：To be precise, + [精确信息]'
m['dm-26dbc48d13']['contexts']['zh'] = '用于对前面的话进行精确修正或补充具体数据'
m['dm-26dbc48d13']['connotation']['zh'] = '半正式'
m['dm-26dbc48d13']['example']['zh'] = 'To be precise, the company was founded in 1998, not 1999.'

m['dm-9be1acb005']['collocation']['zh'] = '置于句首：To be specific, + [具体细节]'
m['dm-9be1acb005']['contexts']['zh'] = '用于将宽泛的陈述聚焦到具体细节'
m['dm-9be1acb005']['connotation']['zh'] = '半正式'
m['dm-9be1acb005']['example']['zh'] = 'To be specific, the new policy will affect about 2 million households.'

# CAT-020
m['dm-e727b572b6']['collocation']['zh'] = '用于请求对方澄清：Could you please clarify + [需要澄清的内容]'
m['dm-e727b572b6']['contexts']['zh'] = '当没有听清或没有理解问题时，礼貌地请求对方重复或解释'
m['dm-e727b572b6']['connotation']['zh'] = '礼貌'
m['dm-e727b572b6']['example']['zh'] = 'Could you please clarify what you mean by sustainable development?'

m['dm-dbbb1e1363']['collocation']['zh'] = '用于询问具体意思：What do you mean by + [需要解释的词语]'
m['dm-dbbb1e1363']['contexts']['zh'] = '用于在讨论中请求对方对某一表述进行具体解释'
m['dm-dbbb1e1363']['connotation']['zh'] = '口语'
m['dm-dbbb1e1363']['example']['zh'] = 'What do you mean by work-life balance? Does it mean flexible hours?'

# CAT-022
m['dm-84ba9d9c4c']['collocation']['zh'] = '置于句首引出社会视角：As for society as a whole, + [观点]'
m['dm-84ba9d9c4c']['contexts']['zh'] = '用于Part 3从全社会整体角度分析问题，展示分析深度'
m['dm-84ba9d9c4c']['connotation']['zh'] = '半正式'
m['dm-84ba9d9c4c']['example']['zh'] = 'As for society as a whole, aging population challenges the healthcare system.'

m['dm-9af1cf4b83']['collocation']['zh'] = '置于句首：At the governmental/national level, + [观点]'
m['dm-9af1cf4b83']['contexts']['zh'] = '用于Part 3从政府或国家层面分析问题'
m['dm-9af1cf4b83']['connotation']['zh'] = '正式'
m['dm-9af1cf4b83']['example']['zh'] = 'At the governmental level, more funding should go to renewable energy.'

m['dm-961c37ebf3']['collocation']['zh'] = '置于句首：But for those struggling financially, + [观点]'
m['dm-961c37ebf3']['contexts']['zh'] = '用于Part 3从经济困难群体角度分析，展现同理心'
m['dm-961c37ebf3']['connotation']['zh'] = '半正式'
m['dm-961c37ebf3']['example']['zh'] = 'But for those struggling financially, rising living costs are a daily concern.'

m['dm-03192e39bc']['collocation']['zh'] = '使用模板：enact more + [政策/法规]'
m['dm-03192e39bc']['contexts']['zh'] = '用于表达对政府或立法机构制定更多政策法规的建议'
m['dm-03192e39bc']['connotation']['zh'] = '正式'
m['dm-03192e39bc']['example']['zh'] = 'The government should enact more strict regulations for environmental protection.'

m['dm-adb5a0a936']['collocation']['zh'] = '置于句首：For affluent individuals/families, + [观点]'
m['dm-adb5a0a936']['contexts']['zh'] = '用于Part 3从富裕群体的视角分析问题'
m['dm-adb5a0a936']['connotation']['zh'] = '正式'
m['dm-adb5a0a936']['example']['zh'] = 'For affluent individuals, quality education is rarely a concern.'

m['dm-9b5c7dcc09']['collocation']['zh'] = '置于句首：For individuals, the impact is + [影响描述]'
m['dm-9b5c7dcc09']['contexts']['zh'] = '用于Part 3从个人角度分析影响，展示多角度思考能力'
m['dm-9b5c7dcc09']['connotation']['zh'] = '半正式'
m['dm-9b5c7dcc09']['example']['zh'] = 'For individuals, the impact is most noticeable in daily spending habits.'

m['dm-5d8d924de2']['collocation']['zh'] = '使用模板：For office workers / For those who are working, + [观点]'
m['dm-5d8d924de2']['contexts']['zh'] = '用于从职场人士的视角分析问题'
m['dm-5d8d924de2']['connotation']['zh'] = '半正式'
m['dm-5d8d924de2']['example']['zh'] = 'For office workers, commuting time is a major frustration.'

m['dm-5357ac75c7']['collocation']['zh'] = '置于句首：For people living in urban areas, + [观点]'
m['dm-5357ac75c7']['contexts']['zh'] = '用于Part 3从城市居民的角度分析问题'
m['dm-5357ac75c7']['connotation']['zh'] = '半正式'
m['dm-5357ac75c7']['example']['zh'] = 'For urban residents, public transport access is a key factor in choosing housing.'

m['dm-d095daffa6']['collocation']['zh'] = '置于句首：For the wealthy, it is a matter of + [关注的方面]'
m['dm-d095daffa6']['contexts']['zh'] = '用于Part 3从富人阶层的视角分析问题'
m['dm-d095daffa6']['connotation']['zh'] = '半正式'
m['dm-d095daffa6']['example']['zh'] = 'For the wealthy, it is a matter of choosing the best luxury option.'

m['dm-84238fb6cd']['collocation']['zh'] = '置于句首：For those privileged few, + [观点]'
m['dm-84238fb6cd']['contexts']['zh'] = '用于Part 3从少数特权群体的角度分析'
m['dm-84238fb6cd']['connotation']['zh'] = '正式'
m['dm-84238fb6cd']['example']['zh'] = 'For those privileged few, higher education costs are simply not a concern.'

m['dm-29850e7fe3']['collocation']['zh'] = '使用模板：from + [某人/某群体] + point of view, + [观点]'
m['dm-29850e7fe3']['contexts']['zh'] = '用于Part 3从不同人的角度展开分析'
m['dm-29850e7fe3']['connotation']['zh'] = '半正式'
m['dm-29850e7fe3']['example']['zh'] = 'From a parents point of view, safety is the top priority when choosing a school.'

m['dm-9ddc602ef5']['collocation']['zh'] = '使用模板：from + [某人/某群体] + standpoint, + [观点]'
m['dm-9ddc602ef5']['contexts']['zh'] = '用于Part 3从特定立场分析问题，比point of view更正式'
m['dm-9ddc602ef5']['connotation']['zh'] = '正式'
m['dm-9ddc602ef5']['example']['zh'] = 'From an economic standpoint, education investment yields long-term benefits.'

m['dm-d3260ba27d']['collocation']['zh'] = '置于句首：From a parent perspective, + [观点]'
m['dm-d3260ba27d']['contexts']['zh'] = '用于Part 3从家长视角分析问题'
m['dm-d3260ba27d']['connotation']['zh'] = '正式'
m['dm-d3260ba27d']['example']['zh'] = 'From a parent perspective, school quality determines where a family lives.'

m['dm-0cf119a245']['collocation']['zh'] = '置于句首：From a policy-making perspective, + [观点]'
m['dm-0cf119a245']['contexts']['zh'] = '用于Part 3从政策制定角度分析问题'
m['dm-0cf119a245']['connotation']['zh'] = '正式'
m['dm-0cf119a245']['example']['zh'] = 'From a policy-making perspective, balancing growth and environment is crucial.'

m['dm-82fa66d211']['collocation']['zh'] = '置于句首：From an individual perspective, + [观点]'
m['dm-82fa66d211']['contexts']['zh'] = '用于Part 3从个人角度分析问题'
m['dm-82fa66d211']['connotation']['zh'] = '正式'
m['dm-82fa66d211']['example']['zh'] = 'From an individual perspective, lifelong learning is essential for career growth.'

m['dm-93fe615c80']['collocation']['zh'] = '置于句首：From an individual standpoint, + [观点]'
m['dm-93fe615c80']['contexts']['zh'] = '用于Part 3从个人立场分析问题'
m['dm-93fe615c80']['connotation']['zh'] = '正式'
m['dm-93fe615c80']['example']['zh'] = 'From an individual standpoint, a diverse network benefits personal growth.'

m['dm-e5866b539d']['collocation']['zh'] = '置于句首：From my perspective, + [个人观点]'
m['dm-e5866b539d']['contexts']['zh'] = '用于表达个人观点，带有一定正式感'
m['dm-e5866b539d']['connotation']['zh'] = '正式'
m['dm-e5866b539d']['example']['zh'] = 'From my perspective, adaptability is the most important 21st-century skill.'

m['dm-87a96f3aa1']['collocation']['zh'] = '置于句首：From the public point of view, + [观点]'
m['dm-87a96f3aa1']['contexts']['zh'] = '用于Part 3从公众视角分析问题'
m['dm-87a96f3aa1']['connotation']['zh'] = '半正式'
m['dm-87a96f3aa1']['example']['zh'] = 'From the public point of view, government transparency is extremely important.'

m['dm-9dc17d3268']['collocation']['zh'] = '置于句首：From the viewpoint of low-income families, + [观点]'
m['dm-9dc17d3268']['contexts']['zh'] = '用于Part 3从低收入家庭视角分析问题'
m['dm-9dc17d3268']['connotation']['zh'] = '半正式'
m['dm-9dc17d3268']['example']['zh'] = 'From the viewpoint of low-income families, affordable housing is most pressing.'

m['dm-46eeb1d371']['collocation']['zh'] = '置于回答开头：If I were in this situation, it would be possible that I + [假设行为]'
m['dm-46eeb1d371']['contexts']['zh'] = '用于设身处地表达个人观点，展现同理心和假设性思考'
m['dm-46eeb1d371']['connotation']['zh'] = '半正式'
m['dm-46eeb1d371']['example']['zh'] = 'If I were in this situation, I would choose to study abroad.'

m['dm-77d77578dc']['collocation']['zh'] = '置于句首：If you are an employer, you would + [假设行为]'
m['dm-77d77578dc']['contexts']['zh'] = '用于Part 3从雇主角度进行假设性分析'
m['dm-77d77578dc']['connotation']['zh'] = '半正式'
m['dm-77d77578dc']['example']['zh'] = 'If you are an employer, you would prioritize candidates with practical experience.'

m['dm-dfb10afde4']['collocation']['zh'] = '置于句首：In rural communities, however, the situation is + [描述]'
m['dm-dfb10afde4']['contexts']['zh'] = '用于Part 3从农村社区视角进行对比分析'
m['dm-dfb10afde4']['connotation']['zh'] = '半正式'
m['dm-dfb10afde4']['example']['zh'] = 'In rural communities, however, the situation is quite different with limited healthcare.'

m['dm-e955fa663d']['collocation']['zh'] = '置于句首：In terms of governance, + [观点]'
m['dm-e955fa663d']['contexts']['zh'] = '用于从治理角度进行分析，常见于Part 3讨论'
m['dm-e955fa663d']['connotation']['zh'] = '正式'
m['dm-e955fa663d']['example']['zh'] = 'In terms of governance, transparency is essential for public trust.'

m['dm-cfa7557479']['collocation']['zh'] = '置于句首：In terms of public perception, + [观点]'
m['dm-cfa7557479']['contexts']['zh'] = '用于从公众认知角度分析问题'
m['dm-cfa7557479']['connotation']['zh'] = '半正式'
m['dm-cfa7557479']['example']['zh'] = 'In terms of public perception, social media influences how people view politics.'

m['dm-dfc60b0613']['collocation']['zh'] = '使用模板：In terms of society, / + [具体社会议题]'
m['dm-dfc60b0613']['contexts']['zh'] = '用于Part 3从社会层面分析问题'
m['dm-dfc60b0613']['connotation']['zh'] = '正式'
m['dm-dfc60b0613']['example']['zh'] = 'In terms of society, the population is aging, pressuring the pension system.'

m['dm-129a057234']['collocation']['zh'] = '置于句首：In terms of the government, + [观点]'
m['dm-129a057234']['contexts']['zh'] = '用于Part 3从政府角度分析问题'
m['dm-129a057234']['connotation']['zh'] = '半正式'
m['dm-129a057234']['example']['zh'] = 'In terms of government, stricter regulations are needed for pollution control.'

m['dm-c9b555e898']['collocation']['zh'] = '置于句首：On a personal level, + [个人观点或感受]'
m['dm-c9b555e898']['contexts']['zh'] = '用于从个人层面表达观点，Part 1和Part 3都可使用'
m['dm-c9b555e898']['connotation']['zh'] = '半正式'
m['dm-c9b555e898']['example']['zh'] = 'On a personal level, happiness comes from relationships, not possessions.'

m['dm-b53161c2f6']['collocation']['zh'] = '置于回答开头：On one hand, in terms of society, I would say + [观点]'
m['dm-b53161c2f6']['contexts']['zh'] = '用于Part 3中从社会角度开启多角度分析'
m['dm-b53161c2f6']['connotation']['zh'] = '正式'
m['dm-b53161c2f6']['example']['zh'] = 'On one hand, in terms of society, technology has created many job opportunities.'

m['dm-cd6cfcc168']['collocation']['zh'] = '使用模板：On the downside / From a negative perspective, + [负面观点]'
m['dm-cd6cfcc168']['contexts']['zh'] = '用于Part 3从负面角度分析，展示全面辩证思维'
m['dm-cd6cfcc168']['connotation']['zh'] = '正式'
m['dm-cd6cfcc168']['example']['zh'] = 'On the downside, these advances have led to unemployment in some sectors.'

m['dm-95c1ad4974']['collocation']['zh'] = '置于句首：Society-wise, + [观点]'
m['dm-95c1ad4974']['contexts']['zh'] = '用于Part 3从社会层面分析问题，简洁高效'
m['dm-95c1ad4974']['connotation']['zh'] = '半正式'
m['dm-95c1ad4974']['example']['zh'] = 'Society-wise, we are increasingly dependent on digital technology.'

m['dm-9c759cbed8']['collocation']['zh'] = '置于回答开头：There are numerous reasons based on the perspectives we are looking at'
m['dm-9c759cbed8']['contexts']['zh'] = '用于Part 3开头，预示将从多个角度分析问题'
m['dm-9c759cbed8']['connotation']['zh'] = '正式'
m['dm-9c759cbed8']['example']['zh'] = 'There are numerous reasons based on the perspectives we are looking at. From an economic standpoint...'

m['dm-ab53fb8d20']['collocation']['zh'] = '置于句首：Those in the countryside might + [可能的行为或感受]'
m['dm-ab53fb8d20']['contexts']['zh'] = '用于Part 3从农村居民视角进行推测性分析'
m['dm-ab53fb8d20']['connotation']['zh'] = '半正式'
m['dm-ab53fb8d20']['example']['zh'] = 'Those in the countryside might have a different perspective on environmental issues.'

m['dm-0eee5cefd6']['collocation']['zh'] = '使用模板：we should let + [事物] + become a new social norm'
m['dm-0eee5cefd6']['contexts']['zh'] = '用于表达倡导某种行为成为社会新常态的建议'
m['dm-0eee5cefd6']['connotation']['zh'] = '半正式'
m['dm-0eee5cefd6']['example']['zh'] = 'We should let recycling become a new social norm.'

m['dm-701cf0864c']['collocation']['zh'] = '置于句首：When it comes to the authorities, they should + [建议]'
m['dm-701cf0864c']['contexts']['zh'] = '用于从当局/管理部门的视角提出建议'
m['dm-701cf0864c']['connotation']['zh'] = '半正式'
m['dm-701cf0864c']['example']['zh'] = 'When it comes to authorities, they should implement stricter anti-pollution measures.'

m['dm-67a05d710f']['collocation']['zh'] = '置于句首：When it comes to the society, + [观点]'
m['dm-67a05d710f']['contexts']['zh'] = '用于Part 3从社会层面分析问题'
m['dm-67a05d710f']['connotation']['zh'] = '半正式'
m['dm-67a05d710f']['example']['zh'] = 'When it comes to society, the rich-poor gap remains a significant challenge.'

with open("/Users/agentii/dev/ielts-with-kee/discourse-markers/phase2/zh_batch_3.json", "w") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Part 3 saved successfully")
