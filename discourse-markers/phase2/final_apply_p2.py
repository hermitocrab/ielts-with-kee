#!/usr/bin/env python3
"""Apply ZH translations - Part 2: Remaining CAT-016, CAT-017, CAT-018"""
import json

with open("/Users/agentii/dev/ielts-with-kee/discourse-markers/phase2/zh_batch_3.json") as f:
    data = json.load(f)

m = {d['id']: d for d in data}

# Remaining CAT-016
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
m['dm-271fe2cbc9']['example']['zh'] = 'It is common sense that exercise benefits physical and mental health.'

m['dm-58d1d57016']['collocation']['zh'] = '用于引用共识：We all know that + [公认的事实]'
m['dm-58d1d57016']['contexts']['zh'] = '用于引用大家普遍认同的事实或观点，建立共鸣'
m['dm-58d1d57016']['connotation']['zh'] = '口语'
m['dm-58d1d57016']['example']['zh'] = 'We all know that first impressions matter in job interviews.'

with open("/Users/agentii/dev/ielts-with-kee/discourse-markers/phase2/zh_batch_3.json", "w") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Part 2 saved successfully")
