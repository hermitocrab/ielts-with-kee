import json
with open("zh_batch_3.json") as f:
    data = json.load(f)
m = {d['id']: d for d in data}

# CAT-022 part 1
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

print("p7a done: CAT-022 part 1")
with open("_p7a_done.flag","w") as f:
    json.dump(data,f)
