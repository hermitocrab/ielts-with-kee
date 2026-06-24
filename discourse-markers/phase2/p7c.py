import json
with open("zh_batch_3.json") as f:
    data = json.load(f)
m = {d['id']: d for d in data}

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

print("p7c done: more CAT-022")
with open("_p7c_done.flag","w") as f:
    json.dump(data,f)
