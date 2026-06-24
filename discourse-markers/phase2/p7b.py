import json
with open("zh_batch_3.json") as f:
    data = json.load(f)
m = {d['id']: d for d in data}

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

print("p7b done: more CAT-022")
with open("_p7b_done.flag","w") as f:
    json.dump(data,f)
