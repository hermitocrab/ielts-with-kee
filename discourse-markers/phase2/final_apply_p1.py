#!/usr/bin/env python3
"""Apply ZH translations - Part 1: CAT-013 through CAT-016 (partial)"""
import json

with open("/Users/agentii/dev/ielts-with-kee/discourse-markers/phase2/zh_batch_3.json") as f:
    data = json.load(f)

m = {d['id']: d for d in data}

# CAT-013
m['dm-1745d32870']['collocation']['zh'] = '置于回答开头：Having said that, there is still a small minority of people who + [观点]'
m['dm-1745d32870']['contexts']['zh'] = '适用于在陈述完主要观点后，引入一个相反或限制性的看法，展示论证的全面性'
m['dm-1745d32870']['connotation']['zh'] = '半正式'
m['dm-1745d32870']['example']['zh'] = 'Having said that, there is still a small minority of people who prefer traditional methods over modern technology.'

m['dm-a7ffa77359']['collocation']['zh'] = '使用模板：However, a significant drawback/downside is... + [具体缺点描述]'
m['dm-a7ffa77359']['contexts']['zh'] = '用于在讨论某事物优点后，转而指出其主要缺点或负面因素'
m['dm-a7ffa77359']['connotation']['zh'] = '半正式'
m['dm-a7ffa77359']['example']['zh'] = 'However, a significant drawback is that it can be quite expensive for the average family.'

m['dm-03b3ac7387']['collocation']['zh'] = '使用模板：I have to acknowledge/admit + [承认的事实] + , however + [转折观点]'
m['dm-03b3ac7387']['contexts']['zh'] = '用于先承认对方或之前的观点有道理，再提出不同看法，体现辩证思维'
m['dm-03b3ac7387']['connotation']['zh'] = '半正式'
m['dm-03b3ac7387']['example']['zh'] = 'I have to admit the system is efficient, however, it lacks the personal touch that many people value.'

m['dm-6217842d6f']['collocation']['zh'] = '用于陈述前表明此为初步判断：I might be wrong but I think + [个人观点]'
m['dm-6217842d6f']['contexts']['zh'] = '当观点不确定或希望表达得谦逊时使用，展现诚实和自我评估能力'
m['dm-6217842d6f']['connotation']['zh'] = '口语'
m['dm-6217842d6f']['example']['zh'] = 'I might be wrong but I think the government should invest more in public transportation.'

m['dm-8ad4f1deb7']['collocation']['zh'] = '置于句首引入补充或反驳：Mind you, + [相反或补充观点]'
m['dm-8ad4f1deb7']['contexts']['zh'] = '用于在发表看法后，补充一个反向或限制性的观点，使论证更丰富'
m['dm-8ad4f1deb7']['connotation']['zh'] = '口语'
m['dm-8ad4f1deb7']['example']['zh'] = 'The restaurant is quite expensive. Mind you, the quality of the food is exceptional.'

m['dm-7366938772']['collocation']['zh'] = '置于句首引出转折：Nevertheless, + [相反观点或结论]'
m['dm-7366938772']['contexts']['zh'] = '用于正式语境中，在承认某事实后引出相反或限制性结论'
m['dm-7366938772']['connotation']['zh'] = '正式'
m['dm-7366938772']['example']['zh'] = 'The task was challenging. Nevertheless, we managed to complete it on time.'

m['dm-98b46e37ca']['collocation']['zh'] = '用于礼貌表达不同意见：Not really / Yes, but... / I would not say so + [你的观点]'
m['dm-98b46e37ca']['contexts']['zh'] = '适用于讨论类题目，礼貌地表达不同观点而不显得对抗'
m['dm-98b46e37ca']['connotation']['zh'] = '口语'
m['dm-98b46e37ca']['example']['zh'] = 'Not really. I think the benefits of technology far outweigh the drawbacks.'

m['dm-862893a1d7']['collocation']['zh'] = '置于句首引出对比：That being said, + [相反或限制性观点]'
m['dm-862893a1d7']['contexts']['zh'] = '用于先肯定某一观点后，礼貌地引入不同的视角或限制条件'
m['dm-862893a1d7']['connotation']['zh'] = '半正式'
m['dm-862893a1d7']['example']['zh'] = 'The restaurant is expensive. That being said, the quality of food is outstanding.'

m['dm-cfc29a46ee']['collocation']['zh'] = '置于回答开头：That being said, a small minority of people might think that + [少数人观点]'
m['dm-cfc29a46ee']['contexts']['zh'] = '用于在阐述主流观点后，引入少数人的不同看法，展示全面思考能力'
m['dm-cfc29a46ee']['connotation']['zh'] = '半正式'
m['dm-cfc29a46ee']['example']['zh'] = 'That being said, a small minority of people might think that online education is less effective than traditional classrooms.'

m['dm-8a50738cbc']['collocation']['zh'] = '使用模板：Though + [承认的事实] + , I have to say that + [你的观点]'
m['dm-8a50738cbc']['contexts']['zh'] = '用于先让步再表达主要观点，体现辩证思维能力'
m['dm-8a50738cbc']['connotation']['zh'] = '半正式'
m['dm-8a50738cbc']['example']['zh'] = 'Though it requires a lot of time, I have to say that learning a new language is incredibly rewarding.'

# CAT-014
m['dm-689f447714']['collocation']['zh'] = '用于引出具体例证：A great example of this is + [具体例子]'
m['dm-689f447714']['contexts']['zh'] = '从概括性观点过渡到具体事例时使用，增强论证说服力'
m['dm-689f447714']['connotation']['zh'] = '半正式'
m['dm-689f447714']['example']['zh'] = 'A great example of this is how many young people prefer to communicate online rather than in person.'

m['dm-0ca8e01db2']['collocation']['zh'] = '用于引出另一个例证：Another good example is that + [具体例子]'
m['dm-0ca8e01db2']['contexts']['zh'] = '在已给出一个例子后，继续补充第二个例证时使用'
m['dm-0ca8e01db2']['connotation']['zh'] = '半正式'
m['dm-0ca8e01db2']['example']['zh'] = 'Another good example is that many companies now offer remote work to attract talent.'

m['dm-4d5d2ede8d']['collocation']['zh'] = '使用模板：Exhibit A + [例1]; Exhibit B + [例2]; Exhibit C + [例3]'
m['dm-4d5d2ede8d']['contexts']['zh'] = '用于以列举形式给出多个例证，条理清晰'
m['dm-4d5d2ede8d']['connotation']['zh'] = '半正式'
m['dm-4d5d2ede8d']['example']['zh'] = 'Exhibit A, social media connects people; Exhibit B, it spreads information instantly.'

m['dm-ce16f719c6']['collocation']['zh'] = '使用模板：ranging from + [最小项] + to + [最大项]'
m['dm-ce16f719c6']['contexts']['zh'] = '用于列举范围内的多种事物，展示词汇丰富度'
m['dm-ce16f719c6']['connotation']['zh'] = '半正式'
m['dm-ce16f719c6']['example']['zh'] = 'The store sells products ranging from groceries to electronics.'

m['dm-6fc4db8789']['collocation']['zh'] = '使用模板：the most + [形容词] + example is that + [具体例证]'
m['dm-6fc4db8789']['contexts']['zh'] = '用于在论证中给出最具代表性的例子'
m['dm-6fc4db8789']['connotation']['zh'] = '半正式'
m['dm-6fc4db8789']['example']['zh'] = 'The most striking example is that some countries have banned single-use plastics.'

m['dm-5f0e7a97c0']['collocation']['zh'] = '用于列举收尾：To name a few, + [列举几个例子]'
m['dm-5f0e7a97c0']['contexts']['zh'] = '在给出多个例证后用于收尾'
m['dm-5f0e7a97c0']['connotation']['zh'] = '半正式'
m['dm-5f0e7a97c0']['example']['zh'] = 'Many cities are becoming eco-friendly. To name a few, Copenhagen and Vancouver.'

# CAT-015
m['dm-433172ed06']['collocation']['zh'] = '置于句首或句中：a great variety of + [名词复数]'
m['dm-433172ed06']['contexts']['zh'] = '用于概括性地描述数量众多、种类丰富的现象或事物'
m['dm-433172ed06']['connotation']['zh'] = '半正式'
m['dm-433172ed06']['example']['zh'] = 'There are a great variety of online courses available for students.'

m['dm-fd22601090']['collocation']['zh'] = '置于句首或句中：a vast amount of + [不可数名词]'
m['dm-fd22601090']['contexts']['zh'] = '用于强调数量极其庞大，通常修饰不可数名词'
m['dm-fd22601090']['connotation']['zh'] = '半正式'
m['dm-fd22601090']['example']['zh'] = 'A vast amount of information is now accessible through the internet.'

m['dm-6cd703393b']['collocation']['zh'] = '置于句首或句中：a wide range of + [名词复数]'
m['dm-6cd703393b']['contexts']['zh'] = '用于描述选择或种类多样，强调覆盖面广'
m['dm-6cd703393b']['connotation']['zh'] = '半正式'
m['dm-6cd703393b']['example']['zh'] = 'Students can choose from a wide range of extracurricular activities.'

m['dm-9f6ba5ad60']['collocation']['zh'] = '用于概括列举：all kinds of + [事物] + , especially + [特别强调]'
m['dm-9f6ba5ad60']['contexts']['zh'] = '用于概括并强调其中某一类特别突出的事物'
m['dm-9f6ba5ad60']['connotation']['zh'] = '口语'
m['dm-9f6ba5ad60']['example']['zh'] = 'I enjoy all kinds of dessert, especially chocolate-based ones.'

m['dm-7b46615955']['collocation']['zh'] = '使用模板：In general, + [概括观点] + I am pretty sure I am not the only one who + [个人感受]'
m['dm-7b46615955']['contexts']['zh'] = '用于先做概括性陈述，再以共情口吻表达个人观点'
m['dm-7b46615955']['connotation']['zh'] = '口语'
m['dm-7b46615955']['example']['zh'] = 'In general, people are becoming more health-conscious. I am pretty sure I am not the only one who tries to eat better.'

m['dm-be9ec5b394']['collocation']['zh'] = '置于句首或句中：plenty of + [名词]'
m['dm-be9ec5b394']['contexts']['zh'] = '用于表示数量充足，比a lot of更口语化'
m['dm-be9ec5b394']['connotation']['zh'] = '口语'
m['dm-be9ec5b394']['example']['zh'] = 'There are plenty of opportunities for young people to gain experience.'

m['dm-7df519c54e']['collocation']['zh'] = '置于句首：There are lots of + [名词复数]'
m['dm-7df519c54e']['contexts']['zh'] = '用于概括性地描述数量很多的事物'
m['dm-7df519c54e']['connotation']['zh'] = '口语'
m['dm-7df519c54e']['example']['zh'] = 'There are lots of reasons why people choose to live in big cities.'

m['dm-bb377df93d']['collocation']['zh'] = '置于句首：There are plenty of + [名词复数]'
m['dm-bb377df93d']['contexts']['zh'] = '用于强调某事物数量充足、不匮乏'
m['dm-bb377df93d']['connotation']['zh'] = '半正式'
m['dm-bb377df93d']['example']['zh'] = 'There are plenty of ways to stay fit without going to the gym.'

# CAT-016 (partial)
m['dm-eb2e70d88b']['collocation']['zh'] = '置于新句开头：Apart from that, when it comes to + [新话题]'
m['dm-eb2e70d88b']['contexts']['zh'] = '用于在一个话题之后引入相关的补充性新话题'
m['dm-eb2e70d88b']['connotation']['zh'] = '半正式'
m['dm-eb2e70d88b']['example']['zh'] = 'Apart from that, when it comes to education, practical skills matter as much as academics.'

m['dm-93770a7dc0']['collocation']['zh'] = '使用模板：As far as + [话题] + goes, + [观点或观察]'
m['dm-93770a7dc0']['contexts']['zh'] = '用于将讨论范围限定在某一特定方面'
m['dm-93770a7dc0']['connotation']['zh'] = '半正式'
m['dm-93770a7dc0']['example']['zh'] = 'As far as job satisfaction goes, work-life balance matters more than salary.'

m['dm-6a9c2ca318']['collocation']['zh'] = '使用模板：As far as + [话题] + is concerned, + [陈述]'
m['dm-6a9c2ca318']['contexts']['zh'] = '用于聚焦到某一具体话题进行讨论，较正式'
m['dm-6a9c2ca318']['connotation']['zh'] = '正式'
m['dm-6a9c2ca318']['example']['zh'] = 'As far as environmental protection is concerned, we all share responsibility.'

m['dm-04c2a32eae']['collocation']['zh'] = '置于句首：As for + [话题], + [陈述]'
m['dm-04c2a32eae']['contexts']['zh'] = '用于转换话题或聚焦到某一特定方面'
m['dm-04c2a32eae']['connotation']['zh'] = '半正式'
m['dm-04c2a32eae']['example']['zh'] = 'As for my future plans, I hope to pursue a master degree abroad.'

m['dm-46ecd5d1ff']['collocation']['zh'] = '置于句首：As for me, + [个人观点或情况]'
m['dm-46ecd5d1ff']['contexts']['zh'] = '用于在讨论普遍情况后回到自身，表达个人观点'
m['dm-46ecd5d1ff']['connotation']['zh'] = '半正式'
m['dm-46ecd5d1ff']['example']['zh'] = 'As for me, I prefer studying in a quiet library rather than at home.'

m['dm-05ae977a7d']['collocation']['zh'] = '置于句首：As for students, we might feel + [感受或观点]'
m['dm-05ae977a7d']['contexts']['zh'] = '用于从学生群体的视角切入，表达共鸣式的观点'
m['dm-05ae977a7d']['connotation']['zh'] = '半正式'
m['dm-05ae977a7d']['example']['zh'] = 'As for students, we might feel pressured by job market competition.'

m['dm-6795992e23']['collocation']['zh'] = '置于句首或句中：As for the reason why, + [原因解释]'
m['dm-6795992e23']['contexts']['zh'] = '用于Part 3分析类问题，引导出因果逻辑分析'
m['dm-6795992e23']['connotation']['zh'] = '半正式'
m['dm-6795992e23']['example']['zh'] = 'As for the reason why, it has to do with changing social values.'

m['dm-2d4705cc1d']['collocation']['zh'] = '置于句首：As for the reason why, it is simply because + [直接原因]'
m['dm-2d4705cc1d']['contexts']['zh'] = '用于给出直接、简洁的原因，略带口语化的强调'
m['dm-2d4705cc1d']['connotation']['zh'] = '口语'
m['dm-2d4705cc1d']['example']['zh'] = 'As for the reason why, it is simply because people prefer convenience over cost.'

m['dm-aef73ed66c']['collocation']['zh'] = '置于句首：As for the reason(s), I would say + [个人观点/原因]'
m['dm-aef73ed66c']['contexts']['zh'] = '用于明确表达个人对原因的分析，突显个人立场'
m['dm-aef73ed66c']['connotation']['zh'] = '半正式'
m['dm-aef73ed66c']['example']['zh'] = 'As for the reasons, I would say technology has changed how we communicate.'

m['dm-f3f8447c47']['collocation']['zh'] = '置于句首：First off, in terms of + [第一个方面]'
m['dm-f3f8447c47']['contexts']['zh'] = '用于在多要点回答中引出第一个方面，适用于Part 2长段独白'
m['dm-f3f8447c47']['connotation']['zh'] = '半正式'
m['dm-f3f8447c47']['example']['zh'] = 'First off, in terms of cost, online study is more affordable.'

with open("/Users/agentii/dev/ielts-with-kee/discourse-markers/phase2/zh_batch_3.json", "w") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Part 1 saved successfully")
