import json
with open("zh_batch_3.json") as f:
    data = json.load(f)
m = {d['id']: d for d in data}

# CAT-018
m['dm-0682797496']['collocation']['zh'] = '使用模板：[陈述] + , as it were（意为"可以说是"）'
m['dm-0682797496']['contexts']['zh'] = '用于在比喻性表达后使用，缓和语气'
m['dm-0682797496']['connotation']['zh'] = '半正式'
m['dm-0682797496']['example']['zh'] = 'He became, as it were, the guiding light of the whole project.'

m['dm-d4f5cde63c']['collocation']['zh'] = '使用模板：[陈述] + , in a manner of speaking（意为"从某种意义上来说"）'
m['dm-d4f5cde63c']['contexts']['zh'] = '用于在某种程度上修正或软化前面的陈述'
m['dm-d4f5cde63c']['connotation']['zh'] = '半正式'
m['dm-d4f5cde63c']['example']['zh'] = 'He is, in a manner of speaking, the father of modern computing.'

m['dm-7f7adb87c9']['collocation']['zh'] = '使用模板：[陈述] + , so to speak（意为"可以说是"）'
m['dm-7f7adb87c9']['contexts']['zh'] = '用于在比喻或非字面表达后使用'
m['dm-7f7adb87c9']['connotation']['zh'] = '半正式'
m['dm-7f7adb87c9']['example']['zh'] = 'She is, so to speak, a walking encyclopedia on history.'

m['dm-6eb065df05']['collocation']['zh'] = '用于引用共识：And bear in mind, + [需要考虑的事实]'
m['dm-6eb065df05']['contexts']['zh'] = '用于提醒对方注意某个重要事实或常识，建立共识'
m['dm-6eb065df05']['connotation']['zh'] = '半正式'
m['dm-6eb065df05']['example']['zh'] = 'And bear in mind, most people work for decades before they can retire.'

m['dm-2cbbb3598a']['collocation']['zh'] = '用于回指之前内容：As I have mentioned, + [重申的要点]'
m['dm-2cbbb3598a']['contexts']['zh'] = '用于重申之前已经提过的内容，建立前后呼应'
m['dm-2cbbb3598a']['connotation']['zh'] = '正式'
m['dm-2cbbb3598a']['example']['zh'] = 'As I have mentioned, the key to success lies in consistent effort.'

m['dm-271fe2cbc9']['collocation']['zh'] = '用于引用常识：It is common sense that + [公认的事实]'
m['dm-271fe2cbc9']['contexts']['zh'] = '用于引用普遍认可的常识，增强说服力'
m['dm-271fe2cbc9']['connotation']['zh'] = '半正式'
m['dm-271fe2cbc9']['example']['zh'] = 'It is common sense that regular exercise benefits both physical and mental health.'

m['dm-58d1d57016']['collocation']['zh'] = '用于引用共识：We all know that + [公认的事实]'
m['dm-58d1d57016']['contexts']['zh'] = '用于引用大家普遍认同的事实或观点，建立共鸣'
m['dm-58d1d57016']['connotation']['zh'] = '口语'
m['dm-58d1d57016']['example']['zh'] = 'We all know that first impressions matter in job interviews.'

print("p5 done: CAT-018")
with open("_p5_done.flag","w") as f:
    json.dump(data,f)
