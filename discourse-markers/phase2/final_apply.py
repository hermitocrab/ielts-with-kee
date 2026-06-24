import json

with open("zh_batch_3.json") as f:
    data = json.load(f)

m = {d['id']: d for d in data}
count = 0

# Load all the flag files that were saved by the subprocess scripts
import glob
flag_files = sorted(glob.glob("_p*.flag"))
for ff in flag_files:
    with open(ff) as f:
        saved = json.load(f)
    # Merge - just need to track which markers were processed
    print(f"Loaded flag file: {ff} ({len(saved)} markers)")

# Actually simpler: just re-apply all translations directly here
# I'll use the same data as originally read and fill everything

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

# CAT-016
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

m['dm-814b0dc0a8']['collocation']['zh'] = '置于句首：If we are talking about + [话题], + [观点]'
m['dm-814b0dc0a8']['contexts']['zh'] = '用于限定讨论范围，聚焦到某一具体话题'
m['dm-814b0dc0a8']['connotation']['zh'] = '口语'
m['dm-814b0dc0a8']['example']['zh'] = 'If we are talking about environmental issues, plastic waste is urgent.'

m['dm-31b6c07a1f']['collocation']['zh'] = '置于句首：In terms of + [方面], + [陈述]'
m['dm-31b6c07a1f']['contexts']['zh'] = '用于聚焦到某一具体方面进行讨论，雅思必备过渡词'
m['dm-31b6c07a1f']['connotation']['zh'] = '半正式'
m['dm-31b6c07a1f']['example']['zh'] = 'In terms of career development, internships are extremely valuable.'

m['dm-79e2ee074a']['collocation']['zh'] = '使用模板：In terms of + [类别/领域], + [具针对性的陈述]'
m['dm-79e2ee074a']['contexts']['zh'] = '用于聚焦答题范围，展示话题控制能力'
m['dm-79e2ee074a']['connotation']['zh'] = '半正式'
m['dm-79e2ee074a']['example']['zh'] = 'In terms of environmental protection, small changes can make a big difference.'

m['dm-428094e00d']['collocation']['zh'] = '置于句首：In terms of college students, + [相关观点]'
m['dm-428094e00d']['contexts']['zh'] = '用于聚焦到大学生的角度进行讨论'
m['dm-428094e00d']['connotation']['zh'] = '半正式'
m['dm-428094e00d']['example']['zh'] = 'In terms of college students, financial pressure is a big challenge.'

m['dm-c5ba4d4756']['collocation']['zh'] = '置于句首：Regarding + [话题] / About + [话题], + [陈述]'
m['dm-c5ba4d4756']['contexts']['zh'] = '用于直接引入要讨论的话题'
m['dm-c5ba4d4756']['connotation']['zh'] = '半正式'
m['dm-c5ba4d4756']['example']['zh'] = 'Regarding technology in classrooms, it has both pros and cons.'

m['dm-56aac0e3b6']['collocation']['zh'] = '使用模板：Regarding / About + [话题], + [陈述]'
m['dm-56aac0e3b6']['contexts']['zh'] = '用于直接定位到要讨论的话题，切入主题'
m['dm-56aac0e3b6']['connotation']['zh'] = '半正式'
m['dm-56aac0e3b6']['example']['zh'] = 'Regarding social media, it has both positive and negative effects.'

m['dm-c80f7f07d5']['collocation']['zh'] = '置于句首：Talking about + [话题], + [陈述]'
m['dm-c80f7f07d5']['contexts']['zh'] = '用于自然引入或转换话题，口语化程度较高'
m['dm-c80f7f07d5']['connotation']['zh'] = '口语'
m['dm-c80f7f07d5']['example']['zh'] = 'Talking about hobbies, I really enjoy photography.'

m['dm-fad00d12db']['collocation']['zh'] = '置于句首：Technology-wise, + [相关陈述]'
m['dm-fad00d12db']['contexts']['zh'] = '用于将讨论聚焦到科技方面，简洁明了'
m['dm-fad00d12db']['connotation']['zh'] = '口语'
m['dm-fad00d12db']['example']['zh'] = 'Technology-wise, we have made remarkable progress.'

m['dm-be7a5cdeef']['collocation']['zh'] = '置于句首：When it comes to + [话题], + [观点]'
m['dm-be7a5cdeef']['contexts']['zh'] = '用于引入新话题或转向特定方面，自然流畅'
m['dm-be7a5cdeef']['connotation']['zh'] = '半正式'
m['dm-be7a5cdeef']['example']['zh'] = 'When it comes to cooking, I am more of a beginner than an expert.'

m['dm-bfa5587a0a']['collocation']['zh'] = '使用模板：When it comes to + [话题], + [概括陈述+展开]'
m['dm-bfa5587a0a']['contexts']['zh'] = '用于将讨论范围缩小到某一具体话题并展开论述'
m['dm-bfa5587a0a']['connotation']['zh'] = '半正式'
m['dm-bfa5587a0a']['example']['zh'] = 'When it comes to choosing a career, passion should be the primary factor.'

m['dm-7b191d04fb']['collocation']['zh'] = '置于句首：When it comes to young people, + [相关观点]'
m['dm-7b191d04fb']['contexts']['zh'] = '用于聚焦到年轻人的视角或相关话题'
m['dm-7b191d04fb']['connotation']['zh'] = '半正式'
m['dm-7b191d04fb']['example']['zh'] = 'When it comes to young people, social media plays a significant role.'

# CAT-017
m['dm-3ccf8dfa5e']['collocation']['zh'] = '使用模板：Thinking back to + [过去时间/群体] + , they used to + [过去行为]'
m['dm-3ccf8dfa5e']['contexts']['zh'] = '用于Part 3中通过代际对比展现多角度分析能力'
m['dm-3ccf8dfa5e']['connotation']['zh'] = '半正式'
m['dm-3ccf8dfa5e']['example']['zh'] = 'Thinking back to my parents generation, they used to write letters.'

m['dm-b3e07238f1']['collocation']['zh'] = '置于句首：As far as I can recollect, I + [过去动作]'
m['dm-b3e07238f1']['contexts']['zh'] = '用于在回忆往事时使用，比remember更正式'
m['dm-b3e07238f1']['connotation']['zh'] = '半正式'
m['dm-b3e07238f1']['example']['zh'] = 'As far as I can recollect, I first visited that museum at age ten.'

m['dm-e7ec4f0d10']['collocation']['zh'] = '置于句首：As far as I can remember, + [过去的事件]'
m['dm-e7ec4f0d10']['contexts']['zh'] = '用于根据记忆描述过去的事件'
m['dm-e7ec4f0d10']['connotation']['zh'] = '半正式'
m['dm-e7ec4f0d10']['example']['zh'] = 'As far as I can remember, the town was much quieter back then.'

m['dm-3156d01524']['collocation']['zh'] = '置于回答开头：As far as I can remember, when I was a little kid, + [童年回忆]'
m['dm-3156d01524']['contexts']['zh'] = '用于引导童年回忆的具体描述，生动自然'
m['dm-3156d01524']['connotation']['zh'] = '半正式'
m['dm-3156d01524']['example']['zh'] = 'As far as I can remember, when I was a little kid, I played in the park every day.'

m['dm-a883ad5168']['collocation']['zh'] = '置于句首：I vaguely remember that + [不太清晰的事件]'
m['dm-a883ad5168']['contexts']['zh'] = '用于描述记忆不太清晰的往事，诚实表达不确定感'
m['dm-a883ad5168']['connotation']['zh'] = '半正式'
m['dm-a883ad5168']['example']['zh'] = 'I vaguely remember that my grandparents had a beautiful garden.'

m['dm-3e9c5b4e0f']['collocation']['zh'] = '置于句首：I vaguely remember that, + [不太确定的事件]'
m['dm-3e9c5b4e0f']['contexts']['zh'] = '用于表达对某事的记忆模糊不清'
m['dm-3e9c5b4e0f']['connotation']['zh'] = '半正式'
m['dm-3e9c5b4e0f']['example']['zh'] = 'I vaguely remember that, we went on family trips every summer.'

m['dm-159598e876']['collocation']['zh'] = '置于句首：If I recall correctly, + [根据记忆的陈述]'
m['dm-159598e876']['contexts']['zh'] = '用于在不确定的情况下表达自己的记忆'
m['dm-159598e876']['connotation']['zh'] = '半正式'
m['dm-159598e876']['example']['zh'] = 'If I recall correctly, the festival is on the first weekend of October.'

m['dm-8a5c9d5140']['collocation']['zh'] = '置于句首：If I remember correctly, + [根据记忆的陈述]'
m['dm-8a5c9d5140']['contexts']['zh'] = '用于在不确定的情况下表达记忆，较recall更口语化'
m['dm-8a5c9d5140']['connotation']['zh'] = '半正式'
m['dm-8a5c9d5140']['example']['zh'] = 'If I remember correctly, the first iPhone was released in 2007.'

m['dm-da9a52abfe']['collocation']['zh'] = '置于句首：If my memory serves me right, + [根据记忆的陈述]'
m['dm-da9a52abfe']['contexts']['zh'] = '用于优雅地表达回忆内容，稍带正式感'
m['dm-da9a52abfe']['connotation']['zh'] = '半正式'
m['dm-da9a52abfe']['example']['zh'] = 'If my memory serves me right, we visited that museum in Grade 6.'

m['dm-05740d7bdf']['collocation']['zh'] = '置于句首：If my memory serves me right, + [回忆内容]'
m['dm-05740d7bdf']['contexts']['zh'] = '用于正式地引导回忆内容，表达得体'
m['dm-05740d7bdf']['connotation']['zh'] = '正式'
m['dm-05740d7bdf']['example']['zh'] = 'If my memory serves me right, the agreement was signed in 2010.'

# CAT-018
m['dm-0682797496']['collocation']['zh'] = '使用模板：[陈述] + , as it were（意为"可以说是"）'
m['dm-0682797496']['contexts']['zh'] = '用于在比喻性表达后使用，缓和语气'
m['dm-0682797496']['connotation']['zh'] = '半正式'
m['dm-0682797496']['example']['zh'] = 'He became, as it were, the guiding light of the project.'

m['dm-d4f5cde63c']['collocation']['zh'] = '使用模板：[陈述] + , in a manner of speaking（意为"从某种意义上来说"）'
m['dm-d4f5cde63c']['contexts']['zh'] = '用于在某种程度上修正或软化前面的陈述'
m['dm-d4f5cde63c']['connotation']['zh'] = '半正式'
m['dm-d4f5cde63c']['example']['zh'] = 'He is, in a manner of speaking, the father of modern computing.'

m['dm-7f7adb87c9']['collocation']['zh'] = '使用模板：[陈述] + , so to speak（意为"可以说是"）'
m['dm-7f7adb87c9']['contexts']['zh'] = '用于在比喻或非字面表达后使用'
m['dm-7f7adb87c9']['connotation']['zh'] = '半正式'
m['dm-7f7adb87c9']['example']['zh'] = 'She is, so to speak, a walking encyclopedia on history.'

m['dm-6eb065df05']['collocation']['zh'] = '用于引用共识：And bear in mind, + [需要考虑的事实]'
m['dm-6eb065df05']['contexts']['zh'] = '用于提醒对方注意某个重要事实或常识'
m['dm-6eb065df05']['connotation']['zh'] = '半正式'
m['dm-6eb065df05']['example']['zh'] = 'And bear in mind, most people work for decades before retiring.'

m['dm-2cbbb3598a']['collocation']['zh'] = '用于回指之前内容：As I have mentioned, + [重申的要点]'
m['dm-2cbbb3598a']['contexts']['zh'] = '用于重申之前已经提过的内容，建立前后呼应'
m['dm-2cbbb3598a']['connotation']['zh'] = '正式'
m['dm-2cbbb3598a']['example']['zh'] = 'As I have mentioned, success requires consistent effort.'

m['dm-271fe2cbc9']['collocation']['zh'] = '用于引用常识：It is common sense that + [公认的事实]'
m['dm-271fe2cbc9']['contexts']['zh'] = '用于引用普遍认可的常识，增强说服力'
m['dm-271fe2cbc9']['connotation']['zh'] = '半正式'
m['dm-271fe2cbc9']['example']['zh'] = 'It is common sense that exercise benefits both physical and mental health.'

m['dm-58d1d57016']['collocation']['zh'] = '用于引用共识：We all know that + [公认的事实]'
m['dm-58d1d57016']['contexts']['zh'] = '用于引用大家普遍认同的事实或观点，建立共鸣'
m['dm-58d1d57016']['connotation']['zh'] = '口语'
m['dm-58d1d57016']['example']['zh'] = 'We all know that first impressions matter in job interviews.'

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
m['dm-72dc85c