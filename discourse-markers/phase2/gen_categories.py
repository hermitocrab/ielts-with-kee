#!/usr/bin/env python3
"""
Generate fresh categories.json matching the mind map taxonomy.
22 categories aligned with SrKeeda's actual teaching framework.
"""
import json

CATEGORIES = [
    {
        "id": "cat-001",
        "name": {"en": "Stalling & Fillers", "zh": "拖延与填充语"},
        "slug": "stalling-fillers",
        "macroGroup": "Fluency & Conversation Management",
        "cefrMin": "A1",
        "cefrMax": "C2",
        "color": "#9F44D3",
        "description": {
            "en": "Hesitation devices and filler expressions used to buy thinking time while maintaining fluency.",
            "zh": "用于赢得思考时间同时保持流畅的停顿和填充表达。"
        },
        "sortOrder": 1,
        "tags": ["fluency", "stalling"],
        "scenarios": [
            "You need a moment to think before answering a difficult question",
            "You forgot a word mid-sentence and need time to recall it",
            "You want to avoid awkward silence while organising your thoughts"
        ]
    },
    {
        "id": "cat-002",
        "name": {"en": "Commenting on the Question", "zh": "评论问题"},
        "slug": "commenting",
        "macroGroup": "Stance, Attitude & Evaluation",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#E91E63",
        "description": {
            "en": "Expressions that react to the question itself before beginning your answer.",
            "zh": "在开始回答之前对问题本身做出反应的表达。"
        },
        "sortOrder": 2,
        "tags": ["fluency", "reaction"],
        "scenarios": [
            "You want to acknowledge the question as interesting or challenging",
            "You need to show engagement with the topic before answering"
        ]
    },
    {
        "id": "cat-003",
        "name": {"en": "Introducing Opinions", "zh": "引入观点"},
        "slug": "opinion-intro",
        "macroGroup": "Stance, Attitude & Evaluation",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#4CAF50",
        "description": {
            "en": "Markers that signal a personal viewpoint or stance is about to be expressed.",
            "zh": "标明将要表达个人观点或立场的标记词。"
        },
        "sortOrder": 3,
        "tags": ["opinion"],
        "scenarios": [
            "You want to express your personal view on a topic",
            "You need to state your position clearly in a discussion"
        ]
    },
    {
        "id": "cat-004",
        "name": {"en": "Agreement & Confirmation", "zh": "同意与确认"},
        "slug": "agreement",
        "macroGroup": "Stance, Attitude & Evaluation",
        "cefrMin": "A1",
        "cefrMax": "C2",
        "color": "#8BC34A",
        "description": {
            "en": "Expressions used to show alignment, concurrence, or shared understanding.",
            "zh": "用于表示赞同、同意或共同理解的表达。"
        },
        "sortOrder": 4,
        "tags": ["agreement"],
        "scenarios": [
            "You completely agree with what someone said",
            "You want to confirm a shared understanding"
        ]
    },
    {
        "id": "cat-005",
        "name": {"en": "Disagreement & Refusal", "zh": "不同意与拒绝"},
        "slug": "disagreement",
        "macroGroup": "Stance, Attitude & Evaluation",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#F44336",
        "description": {
            "en": "Polite strategies for expressing opposition or differing viewpoints.",
            "zh": "礼貌表达反对或不同观点的策略。"
        },
        "sortOrder": 5,
        "tags": ["disagreement"],
        "scenarios": [
            "You disagree but want to remain polite and diplomatic",
            "You need to present an alternative perspective"
        ]
    },
    {
        "id": "cat-006",
        "name": {"en": "Uncertainty & Hedging", "zh": "不确定与模糊表达"},
        "slug": "uncertainty",
        "macroGroup": "Stance, Attitude & Evaluation",
        "cefrMin": "B1",
        "cefrMax": "C2",
        "color": "#9C27B0",
        "description": {
            "en": "Expressions that convey doubt, speculation, or provisional judgment.",
            "zh": "传达怀疑、推测或暂时判断的表达。"
        },
        "sortOrder": 6,
        "tags": ["hedging", "uncertainty"],
        "scenarios": [
            "You're not 100% sure about your statement and want to hedge",
            "You're speculating or making an educated guess"
        ]
    },
    {
        "id": "cat-007",
        "name": {"en": "Emphasis & Highlighting", "zh": "强调与突出"},
        "slug": "emphasis",
        "macroGroup": "Metacognitive & Information Structuring",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#FF9800",
        "description": {
            "en": "Markers that draw attention to the most important part of your message.",
            "zh": "将注意力吸引到信息最重要部分的标记词。"
        },
        "sortOrder": 7,
        "tags": ["emphasis"],
        "scenarios": [
            "You need to stress the most important point in your argument",
            "You want to highlight a critical detail"
        ]
    },
    {
        "id": "cat-008",
        "name": {"en": "Reformulation & Self-Correction", "zh": "重述与自我纠正"},
        "slug": "reformulation",
        "macroGroup": "Metacognitive & Information Structuring",
        "cefrMin": "B1",
        "cefrMax": "C2",
        "color": "#FF5722",
        "description": {
            "en": "Expressions used to rephrase, clarify, or correct a previous statement.",
            "zh": "用于重新表述、澄清或纠正之前陈述的表达。"
        },
        "sortOrder": 8,
        "tags": ["fluency", "rephrasing"],
        "scenarios": [
            "Your previous statement was unclear and needs rephrasing",
            "You want to explain something in simpler terms"
        ]
    },
    {
        "id": "cat-009",
        "name": {"en": "Sequencing & Ordering", "zh": "顺序与排列"},
        "slug": "sequencing",
        "macroGroup": "Logic & Cohesion",
        "cefrMin": "A1",
        "cefrMax": "C2",
        "color": "#3F51B5",
        "description": {
            "en": "Markers that order points, steps, or events in a logical sequence.",
            "zh": "按逻辑顺序排列要点、步骤或事件的标记词。"
        },
        "sortOrder": 9,
        "tags": ["sequencing"],
        "scenarios": [
            "You are describing a process step by step",
            "You want to organise multiple points in a structured answer"
        ]
    },
    {
        "id": "cat-010",
        "name": {"en": "Adding Information", "zh": "补充信息"},
        "slug": "adding-info",
        "macroGroup": "Logic & Cohesion",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#009688",
        "description": {
            "en": "Connectors used to introduce supplementary details or additional points.",
            "zh": "用于引入补充细节或额外要点的连接词。"
        },
        "sortOrder": 10,
        "tags": ["addition"],
        "scenarios": [
            "You want to add another reason to support your argument",
            "You need to supplement your answer with more details"
        ]
    },
    {
        "id": "cat-011",
        "name": {"en": "Cause & Effect", "zh": "因果关系"},
        "slug": "cause-effect",
        "macroGroup": "Logic & Cohesion",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#2196F3",
        "description": {
            "en": "Markers that express reasons, causes, consequences, and logical results.",
            "zh": "表达原因、结果和逻辑结果的标记词。"
        },
        "sortOrder": 11,
        "tags": ["reasoning", "causality"],
        "scenarios": [
            "You need to explain why something happened",
            "You are analysing the consequences of an action or trend"
        ]
    },
    {
        "id": "cat-012",
        "name": {"en": "Comparing", "zh": "比较"},
        "slug": "comparing",
        "macroGroup": "Logic & Cohesion",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#00BCD4",
        "description": {
            "en": "Markers that draw similarities or differences between entities or concepts.",
            "zh": "比较实体或概念之间相似或差异的标记词。"
        },
        "sortOrder": 12,
        "tags": ["comparison"],
        "scenarios": [
            "You want to highlight similarities between two things",
            "You need to point out key differences"
        ]
    },
    {
        "id": "cat-013",
        "name": {"en": "Contrasting", "zh": "对比"},
        "slug": "contrasting",
        "macroGroup": "Logic & Cohesion",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#FF5252",
        "description": {
            "en": "Markers that introduce opposing viewpoints, limitations, or counter-arguments.",
            "zh": "引入对立观点、限制或反驳论点的标记词。"
        },
        "sortOrder": 13,
        "tags": ["contrast", "concession"],
        "scenarios": [
            "You need to present an opposing viewpoint or limitation",
            "You want to acknowledge a counterargument before refuting it"
        ]
    },
    {
        "id": "cat-014",
        "name": {"en": "Giving Examples", "zh": "举例说明"},
        "slug": "giving-examples",
        "macroGroup": "Logic & Cohesion",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#CDDC39",
        "description": {
            "en": "Markers that introduce specific instances or illustrations to support a point.",
            "zh": "引入具体实例或说明以支持观点的标记词。"
        },
        "sortOrder": 14,
        "tags": ["exemplification"],
        "scenarios": [
            "You want to give a concrete example to illustrate your point",
            "You are providing evidence to support your argument"
        ]
    },
    {
        "id": "cat-015",
        "name": {"en": "Generalising", "zh": "概括"},
        "slug": "generalising",
        "macroGroup": "Logic & Cohesion",
        "cefrMin": "B1",
        "cefrMax": "C2",
        "color": "#607D8B",
        "description": {
            "en": "Markers used to make broad observations or statements about patterns and trends.",
            "zh": "用于对模式或趋势做出广泛观察或陈述的标记词。"
        },
        "sortOrder": 15,
        "tags": ["generalisation"],
        "scenarios": [
            "You need to make a broad statement about a common trend",
            "You want to describe typical behaviour or patterns"
        ]
    },
    {
        "id": "cat-016",
        "name": {"en": "Topic Introducers", "zh": "话题引入"},
        "slug": "topic-intros",
        "macroGroup": "Conversation & Interaction Management",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#673AB7",
        "description": {
            "en": "Expressions that narrow focus to a specific aspect of the discussion.",
            "zh": "将焦点缩小到讨论的特定方面的表达。"
        },
        "sortOrder": 16,
        "tags": ["topic-introduction"],
        "scenarios": [
            "You want to introduce a specific aspect of the question",
            "You need to narrow your focus before giving details"
        ]
    },
    {
        "id": "cat-017",
        "name": {"en": "Recalling & Memory", "zh": "回忆与记忆"},
        "slug": "recalling",
        "macroGroup": "Narrative & Description",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#FFEB3B",
        "description": {
            "en": "Markers used to introduce personal memories or past experiences.",
            "zh": "用于引入个人记忆或过去经历的标记词。"
        },
        "sortOrder": 17,
        "tags": ["narrative", "memory"],
        "scenarios": [
            "You are describing a past experience or memory",
            "You need to retrieve specific details from your memory"
        ]
    },
    {
        "id": "cat-018",
        "name": {"en": "Shared Knowledge", "zh": "共享知识"},
        "slug": "shared-knowledge",
        "macroGroup": "Metacognitive & Information Structuring",
        "cefrMin": "B1",
        "cefrMax": "C2",
        "color": "#E040FB",
        "description": {
            "en": "References to commonly known information or prior discussion.",
            "zh": "引用常识或先前讨论过的信息。"
        },
        "sortOrder": 18,
        "tags": ["shared-knowledge"],
        "scenarios": [
            "You want to reference something the listener already knows",
            "You are appealing to shared understanding or common ground"
        ]
    },
    {
        "id": "cat-019",
        "name": {"en": "Specifying & Clarifying", "zh": "具体说明"},
        "slug": "specifying",
        "macroGroup": "Metacognitive & Information Structuring",
        "cefrMin": "B1",
        "cefrMax": "C2",
        "color": "#795548",
        "description": {
            "en": "Markers that introduce precise details or clarify previous statements.",
            "zh": "引入精确细节或澄清之前陈述的标记词。"
        },
        "sortOrder": 19,
        "tags": ["specification"],
        "scenarios": [
            "You want to give precise details rather than general statements",
            "You need to clarify or narrow down what you mean"
        ]
    },
    {
        "id": "cat-020",
        "name": {"en": "Clarification Requests", "zh": "请求澄清"},
        "slug": "clarification-req",
        "macroGroup": "Conversation & Interaction Management",
        "cefrMin": "A2",
        "cefrMax": "C2",
        "color": "#FF6F00",
        "description": {
            "en": "Polite expressions used to ask for repetition, explanation, or elaboration.",
            "zh": "用于请求重复、解释或详细说明的礼貌表达。"
        },
        "sortOrder": 20,
        "tags": ["clarification"],
        "scenarios": [
            "You didn't hear or understand the question fully",
            "You need the speaker to explain something in more detail"
        ]
    },
    {
        "id": "cat-021",
        "name": {"en": "Summarising & Concluding", "zh": "总结与结论"},
        "slug": "summarising",
        "macroGroup": "Metacognitive & Information Structuring",
        "cefrMin": "B1",
        "cefrMax": "C2",
        "color": "#1565C0",
        "description": {
            "en": "Markers that wrap up a response or present the final takeaway.",
            "zh": "总结回答或呈现最终要点的标记词。"
        },
        "sortOrder": 21,
        "tags": ["summary"],
        "scenarios": [
            "You are wrapping up your argument or response",
            "You want to present the final takeaway of your discussion"
        ]
    },
    {
        "id": "cat-022",
        "name": {"en": "Perspective Framing (Part 3)", "zh": "角度框架（Part 3）"},
        "slug": "perspective",
        "macroGroup": "Stance, Attitude & Evaluation",
        "cefrMin": "B2",
        "cefrMax": "C2",
        "color": "#00E5FF",
        "description": {
            "en": "Advanced expressions that frame arguments from different viewpoints (societal, individual, governmental). Essential for Part 3.",
            "zh": "从不同角度（社会、个人、政府）构建论点的高级表达，Part 3必备。"
        },
        "sortOrder": 22,
        "tags": ["perspective", "part3"],
        "scenarios": [
            "You need to demonstrate sophisticated analytical framing in Part 3",
            "You want to discuss an issue from multiple perspectives",
            "You need to show the examiner you can think beyond personal experience"
        ]
    }
]

# Save
output_path = '/Users/agentii/dev/ielts-with-kee/discourse-markers/categories.json'
with open(output_path, 'w') as f:
    json.dump(CATEGORIES, f, indent=2, ensure_ascii=False)

print(f"Categories saved: {len(CATEGORIES)} categories")
for c in CATEGORIES:
    print(f"  {c['id']}: {c['name']['en']} ({c['slug']})")
