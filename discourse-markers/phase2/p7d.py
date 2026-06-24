import json
with open("zh_batch_3.json") as f:
    data = json.load(f)
m = {d['id']: d for d in data}

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

print("p7d done: final CAT-022")
with open("_p7d_done.flag","w") as f:
    json.dump(data,f)
