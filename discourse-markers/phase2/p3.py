import json
with open("zh_batch_3.json") as f:
    data = json.load(f)
m = {d['id']: d for d in data}

m['dm-c5ba4d4756']['collocation']['zh'] = '置于句首：Regarding + [话题] / About + [话题], + [陈述]'
m['dm-c5ba4d4756']['contexts']['zh'] = '用于直接引入要讨论的话题，较为直接'
m['dm-c5ba4d4756']['connotation']['zh'] = '半正式'
m['dm-c5ba4d4756']['example']['zh'] = 'Regarding the use of technology in classrooms, I think it has both advantages and disadvantages.'

m['dm-56aac0e3b6']['collocation']['zh'] = '使用模板：Regarding / About + [话题], + [陈述]'
m['dm-56aac0e3b6']['contexts']['zh'] = '用于直接定位到要讨论的话题，切入主题'
m['dm-56aac0e3b6']['connotation']['zh'] = '半正式'
m['dm-56aac0e3b6']['example']['zh'] = 'Regarding the impact of social media, I believe it has both positive and negative effects.'

m['dm-c80f7f07d5']['collocation']['zh'] = '置于句首：Talking about + [话题], + [陈述]'
m['dm-c80f7f07d5']['contexts']['zh'] = '用于自然引入或转换话题，口语化程度较高'
m['dm-c80f7f07d5']['connotation']['zh'] = '口语'
m['dm-c80f7f07d5']['example']['zh'] = 'Talking about hobbies, I really enjoy photography in my free time.'

m['dm-fad00d12db']['collocation']['zh'] = '置于句首：Technology-wise, + [相关陈述]'
m['dm-fad00d12db']['contexts']['zh'] = '用于将讨论聚焦到科技方面，使用-wise后缀简洁明了'
m['dm-fad00d12db']['connotation']['zh'] = '口语'
m['dm-fad00d12db']['example']['zh'] = 'Technology-wise, we have made remarkable progress over the past decade.'

m['dm-be7a5cdeef']['collocation']['zh'] = '置于句首：When it comes to + [话题], + [观点]'
m['dm-be7a5cdeef']['contexts']['zh'] = '用于引入新话题或转向特定方面，自然流畅'
m['dm-be7a5cdeef']['connotation']['zh'] = '半正式'
m['dm-be7a5cdeef']['example']['zh'] = 'When it comes to cooking, I am definitely more of a beginner than an expert.'

m['dm-bfa5587a0a']['collocation']['zh'] = '使用模板：When it comes to + [话题], + [概括陈述+展开]'
m['dm-bfa5587a0a']['contexts']['zh'] = '用于将讨论范围缩小到某一具体话题，并展开论述'
m['dm-bfa5587a0a']['connotation']['zh'] = '半正式'
m['dm-bfa5587a0a']['example']['zh'] = 'When it comes to choosing a career, I believe passion should be the primary factor.'

m['dm-7b191d04fb']['collocation']['zh'] = '置于句首：When it comes to young people, + [相关观点]'
m['dm-7b191d04fb']['contexts']['zh'] = '用于聚焦到年轻人的视角或相关话题'
m['dm-7b191d04fb']['connotation']['zh'] = '半正式'
m['dm-7b191d04fb']['example']['zh'] = 'When it comes to young people, social media plays a significant role in their daily lives.'

print("p3 done: more CAT-016")
with open("_p3_done.flag","w") as f:
    json.dump(data,f)
