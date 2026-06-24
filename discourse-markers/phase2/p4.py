import json
with open("zh_batch_3.json") as f:
    data = json.load(f)
m = {d['id']: d for d in data}

# CAT-017
m['dm-3ccf8dfa5e']['collocation']['zh'] = '使用模板：Thinking back to + [过去时间/群体] + , they used to + [过去行为]'
m['dm-3ccf8dfa5e']['contexts']['zh'] = '用于Part 3中通过代际对比展现多角度分析能力'
m['dm-3ccf8dfa5e']['connotation']['zh'] = '半正式'
m['dm-3ccf8dfa5e']['example']['zh'] = 'Thinking back to my parents generation, they used to write letters instead of texting.'

m['dm-b3e07238f1']['collocation']['zh'] = '置于句首：As far as I can recollect, I + [过去动作]'
m['dm-b3e07238f1']['contexts']['zh'] = '用于在回忆往事时使用，比remember更正式'
m['dm-b3e07238f1']['connotation']['zh'] = '半正式'
m['dm-b3e07238f1']['example']['zh'] = 'As far as I can recollect, I first visited the museum when I was about ten.'

m['dm-e7ec4f0d10']['collocation']['zh'] = '置于句首：As far as I can remember, + [过去的事件]'
m['dm-e7ec4f0d10']['contexts']['zh'] = '用于根据记忆描述过去的事件，自然叙事'
m['dm-e7ec4f0d10']['connotation']['zh'] = '半正式'
m['dm-e7ec4f0d10']['example']['zh'] = 'As far as I can remember, the town was much quieter back then.'

m['dm-3156d01524']['collocation']['zh'] = '置于回答开头：As far as I can remember, when I was a little kid, + [童年回忆]'
m['dm-3156d01524']['contexts']['zh'] = '用于引导童年回忆的具体描述，生动自然'
m['dm-3156d01524']['connotation']['zh'] = '半正式'
m['dm-3156d01524']['example']['zh'] = 'As far as I can remember, when I was a little kid, I used to play in the park near my house.'

m['dm-a883ad5168']['collocation']['zh'] = '置于句首：I vaguely remember that + [不太清晰的事件]'
m['dm-a883ad5168']['contexts']['zh'] = '用于描述记忆不太清晰的往事，诚实表达不确定感'
m['dm-a883ad5168']['connotation']['zh'] = '半正式'
m['dm-a883ad5168']['example']['zh'] = 'I vaguely remember that my grandparents had a beautiful garden full of flowers.'

m['dm-3e9c5b4e0f']['collocation']['zh'] = '置于句首：I vaguely remember that, + [不太确定的事件]'
m['dm-3e9c5b4e0f']['contexts']['zh'] = '用于表达对某事的记忆模糊不清，语气自然'
m['dm-3e9c5b4e0f']['connotation']['zh'] = '半正式'
m['dm-3e9c5b4e0f']['example']['zh'] = 'I vaguely remember that, we used to go on family trips every summer.'

m['dm-159598e876']['collocation']['zh'] = '置于句首：If I recall correctly, + [根据记忆的陈述]'
m['dm-159598e876']['contexts']['zh'] = '用于在不确定的情况下表达自己的记忆'
m['dm-159598e876']['connotation']['zh'] = '半正式'
m['dm-159598e876']['example']['zh'] = 'If I recall correctly, the festival falls on the first weekend of October.'

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

print("p4 done: CAT-017")
with open("_p4_done.flag","w") as f:
    json.dump(data,f)
