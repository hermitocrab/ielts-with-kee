import json
with open("zh_batch_3.json") as f:
    data = json.load(f)
m = {d['id']: d for d in data}

m['dm-f3f8447c47']['collocation']['zh'] = '置于句首：First off, in terms of + [第一个方面]'
m['dm-f3f8447c47']['contexts']['zh'] = '用于在多要点回答中引出第一个方面，特别适用于Part 2长段独白'
m['dm-f3f8447c47']['connotation']['zh'] = '半正式'
m['dm-f3f8447c47']['example']['zh'] = 'First off, in terms of cost, studying online is generally more affordable than attending a physical school.'

m['dm-814b0dc0a8']['collocation']['zh'] = '置于句首：If we are talking about + [话题], + [观点]'
m['dm-814b0dc0a8']['contexts']['zh'] = '用于限定讨论范围，聚焦到某一具体话题'
m['dm-814b0dc0a8']['connotation']['zh'] = '口语'
m['dm-814b0dc0a8']['example']['zh'] = 'If we are talking about environmental issues, I think plastic waste is one of the most urgent problems.'

m['dm-31b6c07a1f']['collocation']['zh'] = '置于句首：In terms of + [方面], + [陈述]'
m['dm-31b6c07a1f']['contexts']['zh'] = '用于聚焦到某一具体方面进行讨论，雅思必备过渡词'
m['dm-31b6c07a1f']['connotation']['zh'] = '半正式'
m['dm-31b6c07a1f']['example']['zh'] = 'In terms of career development, I think internships are extremely valuable.'

m['dm-79e2ee074a']['collocation']['zh'] = '使用模板：In terms of + [类别/领域], + [具针对性的陈述]'
m['dm-79e2ee074a']['contexts']['zh'] = '用于聚焦答题范围，展示话题控制能力'
m['dm-79e2ee074a']['connotation']['zh'] = '半正式'
m['dm-79e2ee074a']['example']['zh'] = 'In terms of environmental protection, I believe small daily changes can make a big difference.'

m['dm-428094e00d']['collocation']['zh'] = '置于句首：In terms of college students, + [相关观点]'
m['dm-428094e00d']['contexts']['zh'] = '用于聚焦到大学生的角度进行讨论'
m['dm-428094e00d']['connotation']['zh'] = '半正式'
m['dm-428094e00d']['example']['zh'] = 'In terms of college students, financial pressure is one of the biggest challenges they face today.'

print("p2 done: remaining CAT-016")
with open("_p2_done.flag","w") as f:
    json.dump(data,f)
