import json
with open("zh_batch_3.json") as f:
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
m['dm-2ef2852ad9']['example']['zh'] = 'Going into details, the project involves three main stages: planning, execution, and evaluation.'

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

print("p6 done: CAT-019, CAT-020")
with open("_p6_done.flag","w") as f:
    json.dump(data,f)
