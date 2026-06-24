const discourseData = [
{
  cat: "Stalling & Fillers · 停顿与填充词",
  slug: "stalling-fillers",
  funcs: [
    {
      name: "Word-Finding · 找词",
      phrases: [
        {expression:"you know",collocation:"[statement], you know, + [the word or phrase you can't recall]",contexts:"Casual conversation when you can't recall a word mid-sentence",connotation:"informal, friendly, invites listener to fill in",example:"I need to pick up the, you know, the thing you use to open wine bottles."},
        {expression:"what's it called",collocation:"[forgotten name], what's it called, + [attempted description]",contexts:"Everyday chat when a name escapes you",connotation:"casual, self-deprecating, shows you're trying",example:"We went to what's it called, that little café behind the station."},
        {expression:"it's on the tip of my tongue",collocation:"[almost remembered word] is on the tip of my tongue",contexts:"When you almost remember a name or word but can't quite get it",connotation:"slightly frustrated, relatable",example:"Her name is... ugh, it's on the tip of my tongue. Give me a second."},
        {expression:"the word for",collocation:"[description of concept]. What's the word for + [the exact term you can't recall]?",contexts:"Describing a concept when the exact term isn't coming",connotation:"neutral, shows linguistic awareness",example:"There's the word for when someone helps you without being asked... altruism?"},
        {expression:"what do you call it",collocation:"[situation or object], what do you call it, + [halting description]",contexts:"Pausing mid-story to search for vocabulary",connotation:"informal, conversational",example:"She did that thing where—what do you call it—she gaslit me about the whole situation."},
        {expression:"um",collocation:"[incomplete statement], um, + [brief pause before continuing]",contexts:"The most universal filler—dropped into any conversation when searching for a word",connotation:"universal, unremarkable, buys a beat",example:"The restaurant was, um, you know that place with the red awning on Fifth?"}
      ]
    },
    {
      name: "Thinking · 思考停顿",
      phrases: [
        {expression:"well",collocation:"Well, + [pause] + [attempted answer]",contexts:"When someone asks you a question and you need a moment to form an answer",connotation:"neutral, buys time politely",example:"Well, I haven't really thought about it that way before."},
        {expression:"let me see",collocation:"Let me see... + [pause] + [retrieved fact or opinion]",contexts:"When asked for an opinion or fact you need to retrieve",connotation:"thoughtful, unhurried",example:"Let me see... I think the last time we spoke was back in March."},
        {expression:"hmm",collocation:"Hmm, + [pause] + [thoughtful response]",contexts:"When a question catches you off guard and you need to think",connotation:"reflective, acknowledges the question's depth",example:"Hmm, that's a good question. I guess it depends on the context."},
        {expression:"how shall I put it",collocation:"How shall I put it... + [carefully phrased statement]",contexts:"When you need to phrase something delicately or precisely",connotation:"careful, deliberate",example:"How shall I put this—it wasn't a disaster, but it definitely wasn't great."},
        {expression:"give me a second",collocation:"Give me a second, + [pause] + [formulated answer]",contexts:"Straightforward request for thinking time in any conversation",connotation:"direct, unapologetic",example:"Give me a second, I want to phrase this right."},
        {expression:"that's an interesting question",collocation:"That's an interesting question. + [pause] + [thoughtful answer]",contexts:"When a thoughtful question deserves a thoughtful pause before answering",connotation:"engaged, respectful, buys time gracefully",example:"That's an interesting question—I've never really thought about it from that angle before."}
      ]
    },
    {
      name: "Buying Time · 争取时间",
      phrases: [
        {expression:"I mean",collocation:"[unclear statement], I mean, + [rephrased or softened version]",contexts:"When you need to stall before delivering a sensitive point",connotation:"hesitant, softens what follows",example:"I mean, it's not that I don't want to go, it's just that I'm exhausted."},
        {expression:"the thing is",collocation:"The thing is, + [complicated or awkward explanation]",contexts:"Leading into a potentially awkward or complicated explanation",connotation:"prefatory, signals complexity ahead",example:"The thing is, I've already made other plans for that weekend."},
        {expression:"like I said",collocation:"[tangent or digression]. Like I said, + [return to main point]",contexts:"Recovering after a tangent, returning to your main point",connotation:"reassuring, recenters the conversation",example:"Anyway, like I said, the whole trip was basically a comedy of errors."},
        {expression:"actually",collocation:"[partial statement], actually, + [self-correction or backtrack]",contexts:"Realising you need to backtrack or correct yourself mid-thought",connotation:"self-corrective, honest",example:"Actually, wait—I'm getting my dates mixed up. It was Thursday, not Friday."},
        {expression:"to be honest",collocation:"To be honest, + [candid or potentially unpopular truth]",contexts:"Stalling before saying something potentially unpopular or too honest",connotation:"candid, disarming",example:"To be honest, I haven't even started on that report yet."},
        {expression:"so yeah",collocation:"[rambling lead-up]. So yeah, + [main takeaway or pivot]",contexts:"Filling a gap while you collect your thoughts, often before pivoting",connotation:"very casual, slightly rambling",example:"So yeah, I think the main takeaway is that we need better documentation."}
      ]
    }
  ]
},
{
  cat: "Reformulation · 重新表述",
  slug: "reformulation",
  funcs: [
    {
      name: "Self-Correction · 自我纠正",
      phrases: [
        {expression:"I mean",collocation:"[unclear statement], I mean, + [rephrased or softened version]",contexts:"Correcting yourself in the middle of a story or explanation",connotation:"apologetic, self-aware",example:"We went to Barcelona—I mean, Valencia—last summer for the festival."},
        {expression:"or rather",collocation:"[initial statement], or rather, + [more accurate version]",contexts:"Refining a statement to be more accurate",connotation:"precise, slightly formal",example:"She's my colleague, or rather, she was my colleague before the restructure."},
        {expression:"actually",collocation:"[partial statement], actually, + [self-correction or backtrack]",contexts:"Stopping yourself mid-claim when you realise you're wrong",connotation:"honest, quick to correct",example:"It was about two hundred—actually, no, it was closer to a hundred and fifty."},
        {expression:"let me rephrase that",collocation:"[awkward statement]. Let me rephrase that: + [clearer version]",contexts:"When you realise what you said came out wrong or unclear",connotation:"polite, self-aware",example:"That sounded harsh. Let me rephrase that—I meant it as constructive feedback."},
        {expression:"what I meant was",collocation:"[misunderstood statement]. What I meant was + [clarified meaning]",contexts:"Clarifying after someone misinterprets your words",connotation:"patient, clarifying",example:"What I meant was that the deadline is flexible, not that it doesn't matter."},
        {expression:"scratch that",collocation:"[abandoned statement]. Scratch that, + [fresh attempt]",contexts:"Abandoning what you just said to try again more clearly",connotation:"casual, self-deprecating",example:"Scratch that—I'm making this sound way more complicated than it actually is."}
      ]
    },
    {
      name: "Rephrasing · 换种说法",
      phrases: [
        {expression:"in other words",collocation:"[complex statement]. In other words, + [simplified version]",contexts:"Summarising a complex point more simply for clarity",connotation:"helpful, simplifying",example:"The algorithm prioritises recency over relevance—in other words, newer posts win."},
        {expression:"put another way",collocation:"[original framing]. To put it another way, + [alternative framing]",contexts:"Offering an alternative framing of the same idea",connotation:"patient, teacherly",example:"To put it another way, we're spending more than we're earning, and that can't last."},
        {expression:"that is to say",collocation:"[vague statement], that is to say, + [more precise version]",contexts:"Adding precision to a statement that was a bit vague",connotation:"formal, clarifying",example:"The proposal was rejected—that is to say, it was sent back for major revisions."},
        {expression:"what I'm trying to say is",collocation:"[ramble or long explanation]. What I'm trying to say is + [core point]",contexts:"When you've been rambling and need to get to the point",connotation:"slightly frustrated with self, clarifying",example:"Look, what I'm trying to say is that I don't think this is working anymore."},
        {expression:"essentially",collocation:"[detailed explanation]. So essentially, + [boiled-down core]",contexts:"Boiling down a complicated explanation to its core",connotation:"reductive, helpful",example:"So essentially, the update just makes everything run faster without changing the interface."},
        {expression:"to put it differently",collocation:"[first metaphor or framing]. To put it differently, + [new analogy or angle]",contexts:"Trying a completely different metaphor to make a point land",connotation:"creative, persistent",example:"To put it differently, think of the app as a house—the backend is the foundation, the UI is the paint job."}
      ]
    },
    {
      name: "Simplifying · 简化表达",
      phrases: [
        {expression:"basically",collocation:"[complex situation]. Basically, + [stripped-down bottom line]",contexts:"Stripping away complexity to give someone the bottom line",connotation:"casual, no-nonsense",example:"Basically, if you don't reply by Friday, they give your slot to someone else."},
        {expression:"in a nutshell",collocation:"[long story or explanation]. In a nutshell, + [shortest possible summary]",contexts:"Giving the shortest possible summary of a long story",connotation:"concise, friendly",example:"In a nutshell, the meeting was two hours of people agreeing with each other."},
        {expression:"put simply",collocation:"[technical or complex issue]. Put simply, + [plain-language version]",contexts:"Boiling a technical or complex issue down for non-experts",connotation:"accessible, clear",example:"Put simply, the battery drains because too many apps run in the background."},
        {expression:"the long and short of it",collocation:"[drawn-out story]. The long and short of it is + [bottom line]",contexts:"Summarising a drawn-out story for someone who wants the bottom line",connotation:"colloquial, slightly impatient",example:"The long and short of it is that we're moving offices next month."},
        {expression:"at the end of the day",collocation:"[detailed discussion]. At the end of the day, + [what ultimately matters]",contexts:"Cutting through detail to focus on what ultimately matters",connotation:"philosophical, definitive",example:"At the end of the day, what matters is whether the team can actually deliver on time."},
        {expression:"all I'm saying is",collocation:"[over-explanation]. Look, all I'm saying is + [stripped-down core point]",contexts:"Stripping your point to its bare essence after over-explaining",connotation:"slightly defensive, reductive",example:"Look, all I'm saying is that maybe we should get a second opinion before signing."}
      ]
    }
  ]
},
{
  cat: "Adding Information · 添加信息",
  slug: "adding-information",
  funcs: [
    {
      name: "Equal Weight · 并列添加",
      phrases: [
        {expression:"also",collocation:"[point A]. Also, + [related point B]",contexts:"Adding a related point in a casual chat or meeting",connotation:"neutral, additive",example:"The hotel has a great pool. Also, they do free breakfast until eleven."},
        {expression:"in addition",collocation:"[main point]. In addition, + [further point of equal weight]",contexts:"Layering another point in a semi-formal discussion",connotation:"structured, thorough",example:"We need better onboarding. In addition, the team has asked for more regular feedback sessions."},
        {expression:"plus",collocation:"[benefit or reason A]. Plus, + [additional benefit or reason B]",contexts:"Piling on reasons or benefits in casual conversation",connotation:"enthusiastic, persuasive",example:"The rent includes utilities. Plus, it's walking distance from the office."},
        {expression:"moreover",collocation:"[supporting point A]. Moreover, + [weightier supporting point B]",contexts:"Adding a weighty supporting point in a formal argument",connotation:"formal, authoritative",example:"The policy reduced emissions by fifteen percent. Moreover, it created thousands of green jobs."},
        {expression:"as well as",collocation:"[primary quality] as well as + [secondary quality]",contexts:"Acknowledging a secondary benefit alongside the main point",connotation:"balanced, comprehensive",example:"The design is stunning as well as being highly functional."},
        {expression:"and also",collocation:"[list item 1], [item 2], and also + [last-minute addition]",contexts:"Casually piling on afterthoughts in informal conversation",connotation:"spontaneous, informal",example:"We need milk, bread, eggs, and also—can you grab some of that sourdough from the bakery?"}
      ]
    },
    {
      name: "Stronger Emphasis · 递进添加",
      phrases: [
        {expression:"what's more",collocation:"[impressive point A]. What's more, + [even more impressive point B]",contexts:"Adding a surprising or impressive point on top of what you just said",connotation:"emphatic, building momentum",example:"She finished the marathon in under four hours. What's more, it was her first race ever."},
        {expression:"furthermore",collocation:"[supporting argument A]. Furthermore, + [stronger supporting argument B]",contexts:"Building a structured case with increasingly important points",connotation:"formal, persuasive",example:"The product is cheaper than competitors. Furthermore, independent tests show it lasts twice as long."},
        {expression:"not only that",collocation:"[striking point A]. Not only that, + [even more striking point B]",contexts:"Emphasising an additional point in excited storytelling",connotation:"animated, convincing",example:"He showed up late to the interview. Not only that, he hadn't even read the job description."},
        {expression:"on top of that",collocation:"[bad thing A]. On top of that, + [additional bad thing B]",contexts:"Adding a final point that makes a situation even more remarkable",connotation:"colloquial, emphatic",example:"They lost their luggage. On top of that, the hotel had cancelled their reservation."},
        {expression:"to make matters worse",collocation:"[already bad situation]. To make matters worse, + [further complication]",contexts:"Adding a negative detail to an already bad situation",connotation:"dramatic, building tension",example:"The car broke down in the middle of nowhere. To make matters worse, my phone had no signal."},
        {expression:"on top of all that",collocation:"[chain of unfortunate events]. And on top of all that, + [final straw]",contexts:"Adding the final straw to a chain of unfortunate or remarkable events",connotation:"emphatic, building to a climax",example:"The hotel was overbooked, the flight was delayed, and on top of all that, someone stole my wallet."}
      ]
    },
    {
      name: "Surprising Addition · 意外补充",
      phrases: [
        {expression:"incidentally",collocation:"[current topic]. Incidentally, + [tangential but interesting fact]",contexts:"Slipping in a related but tangential fact mid-conversation",connotation:"offhand, conversational",example:"We're meeting at six. Incidentally, the café changed owners last month."},
        {expression:"come to think of it",collocation:"[remark or observation]. Come to think of it, + [sudden realisation]",contexts:"A sudden realisation or extra thought that just occurred to you",connotation:"spontaneous, genuine",example:"I don't think they responded to the invite. Come to think of it, I'm not sure I even sent it."},
        {expression:"it's worth mentioning",collocation:"[main recommendation]. It's worth mentioning that + [important caveat or bonus]",contexts:"Pointing out something the listener might not have considered",connotation:"helpful, modest",example:"The restaurant has great reviews. It's worth mentioning that they only take cash, though."},
        {expression:"by the way",collocation:"[main message]. By the way, + [loosely related afterthought]",contexts:"Adding a loosely related thought that just popped into your head",connotation:"casual, spontaneous",example:"The meeting's been moved to three. By the way, have you seen the new office layout?"},
        {expression:"and another thing",collocation:"[list of reminders]. Oh, and another thing — + [last-minute addition]",contexts:"Remembering something else to add in an animated conversation",connotation:"energetic, slightly scattered",example:"Make sure you pack sunscreen. Oh, and another thing—bring cash for the market vendors."},
        {expression:"while I think of it",collocation:"[current topic]. While I think of it, + [relevant reminder]",contexts:"Remembering something relevant mid-conversation before you forget again",connotation:"spontaneous, practical",example:"We should leave by seven. While I think of it, have you booked the parking yet?"}
      ]
    }
  ]
},
{
  cat: "Cause & Effect · 因果关系",
  slug: "cause-effect",
  funcs: [
    {
      name: "Direct Cause · 直接原因",
      phrases: [
        {expression:"because of",collocation:"[outcome or change] because of + [cause or reason]",contexts:"Explaining why plans changed or something happened",connotation:"neutral, straightforward",example:"The flight was cancelled because of the storm warning."},
        {expression:"as a result",collocation:"[cause described]. As a result, + [logical outcome]",contexts:"Describing the direct outcome of a previous event",connotation:"neutral, cause-and-effect",example:"The server crashed at peak traffic. As a result, we lost about two hours of sales."},
        {expression:"due to",collocation:"[outcome or change] due to + [formal reason or cause]",contexts:"Giving a formal reason for a change or problem",connotation:"formal, impersonal",example:"The event has been postponed due to unforeseen circumstances."},
        {expression:"thanks to",collocation:"[positive outcome] thanks to + [person or contributing factor]",contexts:"Acknowledging a person or thing that caused a positive outcome",connotation:"grateful, positive",example:"Thanks to her last-minute edits, the proposal got approved on the first submission."},
        {expression:"led to",collocation:"[small cause or event], which led to + [larger or cascading consequence]",contexts:"Explaining a chain of events in a story",connotation:"neutral, narrative",example:"The small leak went unnoticed, which led to a whole ceiling collapse three weeks later."},
        {expression:"brought about",collocation:"[event or force] brought about + [significant change or transformation]",contexts:"Describing how one event caused a significant shift or transformation",connotation:"formal, narrative",example:"The pandemic brought about a permanent shift in how companies think about remote work."}
      ]
    },
    {
      name: "Inferred Cause · 推断原因",
      phrases: [
        {expression:"must have been",collocation:"[observed outcome] — it must have been because + [speculated cause]",contexts:"Guessing why something happened based on evidence",connotation:"speculative, reasonable",example:"He missed the call—it must have been because his phone was on silent again."},
        {expression:"which suggests",collocation:"[observed pattern], which suggests that + [logical inference]",contexts:"Drawing a logical conclusion from observed facts",connotation:"analytical, measured",example:"Sales dropped in Q3, which suggests the summer campaign didn't land."},
        {expression:"it stands to reason",collocation:"[known premise]. It stands to reason that + [logical conclusion]",contexts:"Making a logical deduction everyone should agree with",connotation:"logical, slightly formal",example:"If demand doubled and supply didn't change, it stands to reason prices went up."},
        {expression:"judging by",collocation:"[visible evidence]. Judging by + [inferred state or cause]",contexts:"Inferring cause from visible cues or behaviour",connotation:"observant, interpretive",example:"Judging by how quiet she got, I think the news hit her harder than she let on."},
        {expression:"probably because",collocation:"[observed outcome], probably because + [educated guess at cause]",contexts:"Making an educated guess about a cause in casual conversation",connotation:"informal, understanding",example:"They didn't show up, probably because the invite went to their spam folder."},
        {expression:"the likely explanation is",collocation:"[puzzling outcome]. The likely explanation is that + [most reasonable cause]",contexts:"Offering the most reasonable guess for why something happened",connotation:"analytical, reasoned",example:"The likely explanation is that the supplier ran into production delays and didn't want to admit it."}
      ]
    },
    {
      name: "Root Cause · 根本原因",
      phrases: [
        {expression:"the reason is",collocation:"[surface-level explanation]. The reason is + [deeper root cause]",contexts:"Getting to the core explanation after dismissing surface-level ones",connotation:"direct, definitive",example:"The reason we're behind isn't the budget—it's that we lost two senior devs."},
        {expression:"at the heart of it",collocation:"[complex situation]. At the heart of it, + [fundamental cause]",contexts:"Identifying the deepest or most fundamental cause",connotation:"philosophical, insightful",example:"At the heart of it, the conflict comes down to misaligned incentives."},
        {expression:"stems from",collocation:"[current problem] stems from + [originating source or cause]",contexts:"Tracing a current problem back to its origin",connotation:"analytical, formal",example:"Most of the friction on the team stems from unclear role definitions."},
        {expression:"it all goes back to",collocation:"[chain of events]. It all goes back to + [single originating decision or moment]",contexts:"Tracing a complex situation to a single originating cause",connotation:"narrative, connecting dots",example:"It all goes back to that decision we made in January to delay the launch."},
        {expression:"the underlying issue is",collocation:"[surface symptom A, symptom B]. The underlying issue is + [true root problem]",contexts:"Peeling back surface symptoms to reveal the real problem",connotation:"insightful, problem-solving",example:"The arguments about the schedule are just surface-level. The underlying issue is trust."},
        {expression:"at the root of",collocation:"[visible dysfunction]. At the root of + [deepest originating cause]",contexts:"Identifying the deepest originating cause after peeling back layers",connotation:"insightful, analytical",example:"At the root of the team's dysfunction was a total lack of psychological safety."}
      ]
    }
  ]
},
{
  cat: "Contrast & Concession · 对比与让步",
  slug: "contrast-concession",
  funcs: [
    {
      name: "Direct Contrast · 直接对比",
      phrases: [
        {expression:"whereas",collocation:"[thing A with trait X], whereas + [thing B with opposite trait Y]",contexts:"Comparing two things side by side to highlight differences",connotation:"neutral, comparative",example:"The old system took five minutes to boot, whereas this one's ready in under ten seconds."},
        {expression:"on the other hand",collocation:"[advantage or argument A]. On the other hand, + [opposing disadvantage or argument B]",contexts:"Presenting an opposing view in a balanced discussion",connotation:"balanced, thoughtful",example:"Remote work saves commute time. On the other hand, it can feel isolating."},
        {expression:"in contrast",collocation:"[thing or situation A]. In contrast, + [starkly different thing or situation B]",contexts:"Setting up a stark difference between two things",connotation:"formal, emphatic",example:"The city centre is chaotic and loud. In contrast, the suburbs are almost eerily quiet."},
        {expression:"unlike",collocation:"Unlike + [the norm or other examples], + [this specific case stands apart]",contexts:"Singling something out as different from the norm",connotation:"distinguishing, sometimes complimentary",example:"Unlike most startups that burn cash, they've been profitable from day one."},
        {expression:"while",collocation:"While + [conceding point A], + [contrasting main point B]",contexts:"Juxtaposing two contrasting ideas in one sentence",connotation:"balanced, concessive",example:"While the design is beautiful, the user experience is frustratingly slow."},
        {expression:"conversely",collocation:"[scenario with trait X]. Conversely, + [opposite scenario with trait Y]",contexts:"Flipping to the opposite scenario in a balanced comparison",connotation:"structured, analytical",example:"Poor lighting makes a room feel cramped. Conversely, well-placed lamps can make a small space feel expansive."}
      ]
    },
    {
      name: "Concessive · 让步",
      phrases: [
        {expression:"even though",collocation:"Even though + [obstacle or counterpoint], + [action or result that happened regardless]",contexts:"Acknowledging an obstacle before stating what happened anyway",connotation:"resilient, matter-of-fact",example:"Even though we were understaffed, we still shipped the update on time."},
        {expression:"despite",collocation:"Despite + [obstacle or warning], + [action or result achieved against the odds]",contexts:"Pointing out that something happened against the odds",connotation:"determined, slightly defiant",example:"Despite everyone telling her it was impossible, she got the funding in six weeks."},
        {expression:"admittedly",collocation:"Admittedly, + [weakness or concession], + [but the overall point still stands]",contexts:"Conceding a weakness before defending the overall point",connotation:"honest, self-aware",example:"Admittedly, the location isn't ideal, but the rent makes up for it."},
        {expression:"granted",collocation:"Granted, + [conceded counterpoint], + [but the main argument still holds]",contexts:"Accepting a counterpoint before pivoting back to your argument",connotation:"fair, reasonable",example:"Granted, the train takes longer than flying, but it's a third of the price."},
        {expression:"all the same",collocation:"[counterargument acknowledged]. All the same, + [sticking to original position]",contexts:"Acknowledging the other side but sticking to your preference",connotation:"stubborn but polite",example:"I know it's the popular choice. All the same, I'd rather go somewhere less crowded."},
        {expression:"be that as it may",collocation:"[opponent's point acknowledged]. Be that as it may, + [position unchanged]",contexts:"Acknowledging someone's point without letting it change your position",connotation:"formal, stubborn-but-polite",example:"Be that as it may, we still need the report by Friday regardless of the holiday schedule."}
      ]
    },
    {
      name: "Surprising Contrast · 意外对比",
      phrases: [
        {expression:"actually",collocation:"[earlier assumption]. Actually, + [contradicting discovery]",contexts:"Revealing an outcome that went against expectations",connotation:"surprising, corrective",example:"Everyone expected the movie to flop. Actually, it became the highest-grossing film of the year."},
        {expression:"as it happens",collocation:"[plan or expectation]. As it happens, + [unexpected and convenient reality]",contexts:"Pointing out an unexpected and convenient coincidence",connotation:"pleasantly surprised, conversational",example:"I was going to call a plumber. As it happens, my neighbour's brother is one."},
        {expression:"ironically",collocation:"[someone's stated position or warning]. Ironically, + [they fell victim to the very thing]",contexts:"Highlighting a contradiction between expectation and reality",connotation:"wry, observant",example:"He spent years warning about overwork. Ironically, he's the one who burnt out first."},
        {expression:"turns out",collocation:"[earlier assumption]. Turns out + [contradicting discovery]",contexts:"Revealing a discovery that contradicted your earlier assumption",connotation:"humble, honest",example:"I thought she'd be impossible to work with. Turns out she's the most supportive manager I've had."},
        {expression:"oddly enough",collocation:"[expected pattern]. Oddly enough, + [counterintuitive finding]",contexts:"Noting an unexpected or counterintuitive finding",connotation:"mildly surprised, observant",example:"Oddly enough, the cheaper headphones had much better sound quality."},
        {expression:"strange as it sounds",collocation:"Strange as it sounds, + [counterintuitive but true observation]",contexts:"Prefacing a counterintuitive observation that might surprise the listener",connotation:"self-aware, intriguing",example:"Strange as it sounds, I actually focus better with background noise than in total silence."}
      ]
    }
  ]
},
{
  cat: "Comparison · 比较",
  slug: "comparison",
  funcs: [
    {
      name: "Similarity · 相似",
      phrases: [
        {expression:"similarly",collocation:"[situation or finding A]. Similarly, + [parallel situation or finding B]",contexts:"Pointing out a parallel between two situations or findings",connotation:"neutral, pattern-spotting",example:"The London office saw a productivity dip. Similarly, the Berlin team reported burnout."},
        {expression:"in the same way",collocation:"In the same way that + [familiar analogy A], + [unfamiliar concept B works similarly]",contexts:"Drawing an analogy to help someone understand",connotation:"explanatory, relatable",example:"In the same way that coffee wakes you up, a quick walk resets your brain in the afternoon."},
        {expression:"likewise",collocation:"[someone's observation A]. Likewise, + [your own matching observation B]",contexts:"Echoing someone's observation with your own similar experience",connotation:"agreeable, connecting",example:"I've had trouble sleeping lately. Likewise, I've noticed I'm more irritable during the day."},
        {expression:"just as",collocation:"Just as + [primary priority A], + [secondary priority B is equally important]",contexts:"Elevating a secondary point to equal importance",connotation:"balanced, fair",example:"Just as the visuals matter, the audio quality can make or break the experience."},
        {expression:"much like",collocation:"[new concept] works much like + [familiar comparison]",contexts:"Drawing a relatable comparison in explanation",connotation:"warm, accessible",example:"The new interface works much like the way you'd organise photos on your phone."},
        {expression:"along the same lines",collocation:"[someone's idea A]. Along the same lines, + [parallel suggestion B]",contexts:"Building on someone's idea with a parallel suggestion",connotation:"collaborative, constructive",example:"I like the subscription model idea. Along the same lines, we could offer a family plan."}
      ]
    },
    {
      name: "Difference · 差异",
      phrases: [
        {expression:"whereas",collocation:"[thing A with trait X], whereas + [thing B with opposite trait Y]",contexts:"Comparing two distinct approaches or outcomes",connotation:"neutral, comparative",example:"We used to approve everything by email. Whereas now, it all goes through the dashboard."},
        {expression:"by contrast",collocation:"[thing or method A with trait X]. By contrast, + [thing or method B with dramatically different trait Y]",contexts:"Highlighting how much better or worse something is compared to another",connotation:"emphatic, evaluative",example:"The first draft took three weeks. By contrast, the revision was done in two days."},
        {expression:"as opposed to",collocation:"[preferred approach A] as opposed to + [rejected or lesser approach B]",contexts:"Distinguishing between two approaches or interpretations",connotation:"clarifying, precise",example:"We need data-driven decisions as opposed to just going with gut feeling."},
        {expression:"differently from",collocation:"[action] differently from + [expected or taught approach]",contexts:"Explaining how something was done in an unexpected way",connotation:"neutral, descriptive",example:"She approached the negotiation differently from how I'd been taught, and it worked."},
        {expression:"unlike before",collocation:"Unlike before, + [what changed this time]",contexts:"Noting a change from a previous pattern or situation",connotation:"observant, comparative",example:"Unlike before, this time the team actually volunteered for the extra shift."},
        {expression:"a far cry from",collocation:"[current thing A] is a far cry from + [much worse or dramatically different past thing B]",contexts:"Emphasising how dramatically different something is from a previous state",connotation:"emphatic, comparative",example:"The new office is a far cry from the cramped basement we used to work in."}
      ]
    },
    {
      name: "Degree · 程度",
      phrases: [
        {expression:"far more",collocation:"[quality A] is far more + [adjective] than + [quality B]",contexts:"Emphasising a significant difference in degree",connotation:"emphatic, prioritising",example:"Consistency is far more important than occasional bursts of brilliance."},
        {expression:"nowhere near as",collocation:"[thing A] is nowhere near as + [adjective] as + [thing B]",contexts:"Downplaying difficulty by comparison",connotation:"reassuring, comparative",example:"The second interview was nowhere near as intense as the first one."},
        {expression:"considerably less",collocation:"[new situation] involves considerably less + [negative quality] than + [old situation]",contexts:"Noting a meaningful reduction compared to before",connotation:"positive, relieved",example:"The new workflow involves considerably less back-and-forth on email."},
        {expression:"head and shoulders above",collocation:"[thing A] is head and shoulders above + [competitors or alternatives]",contexts:"Declaring something vastly superior to competitors",connotation:"emphatic, confident",example:"This restaurant is head and shoulders above anything else in the neighbourhood."},
        {expression:"a whole different level",collocation:"[thing A] is on a whole different level compared to + [thing B]",contexts:"Expressing that something is incomparably better or harder",connotation:"impressed, emphatic",example:"Her public speaking is on a whole different level compared to the rest of us."},
        {expression:"miles ahead of",collocation:"[thing A] is miles ahead of + [competition or comparison point]",contexts:"Declaring something dramatically superior in casual conversation",connotation:"enthusiastic, confident",example:"Their customer service is miles ahead of any other airline I've flown with."}
      ]
    }
  ]
},
{
  cat: "Exemplification · 举例说明",
  slug: "exemplification",
  funcs: [
    {
      name: "Specific Examples · 具体例子",
      phrases: [
        {expression:"for instance",collocation:"[abstract claim]. For instance, + [concrete illustration]",contexts:"Giving a concrete illustration of an abstract point",connotation:"helpful, clarifying",example:"Some colours affect mood strongly. For instance, blue tends to make people feel calmer."},
        {expression:"such as",collocation:"[category or general statement], such as + [specific listed examples]",contexts:"Listing concrete items that illustrate a category",connotation:"neutral, illustrative",example:"We need to cut non-essential spending, such as those premium software subscriptions nobody uses."},
        {expression:"take",collocation:"Take + [real person or situation], for instance",contexts:"Pointing to a real person or situation as an example",connotation:"conversational, relatable",example:"Not everyone wants a big wedding. Take my sister—she eloped and loved it."},
        {expression:"a case in point",collocation:"[general claim]. A case in point is + [perfect real-world example]",contexts:"Presenting a perfect real-world example of what you just described",connotation:"confident, illustrative",example:"People underestimate small habits. A case in point is how ten minutes of stretching daily fixed my back."},
        {expression:"like",collocation:"[abstract pattern or fear], like + [quick relatable example]",contexts:"Throwing out a quick relatable example in casual conversation",connotation:"informal, relatable",example:"Some fears are irrational—like when you panic about a spider that's smaller than your fingernail."},
        {expression:"to illustrate",collocation:"To illustrate what I mean, + [concrete scenario or analogy]",contexts:"Explicitly signalling an example is coming to clarify an abstract point",connotation:"deliberate, helpful",example:"To illustrate what I mean, think about the last time you procrastinated on something important."}
      ]
    },
    {
      name: "Representative Cases · 典型案例",
      phrases: [
        {expression:"for example",collocation:"[broad trend or claim]. For example, + [typical illustration]",contexts:"Offering a typical scenario that illustrates a broader trend",connotation:"standard, clarifying",example:"Remote work changed office culture. For example, many companies now do four-day weeks."},
        {expression:"a good illustration of",collocation:"[concept X]. A good illustration of this is + [clear memorable example]",contexts:"Pointing to a clear, memorable example that captures the idea",connotation:"teacherly, effective",example:"A good illustration of this is how kids learn languages faster than adults."},
        {expression:"to give you an idea",collocation:"To give you an idea of + [scale or nature], + [clarifying example]",contexts:"Preparing the listener for a clarifying example",connotation:"helpful, approachable",example:"To give you an idea of the scale, the database handles about three million queries a second."},
        {expression:"by way of illustration",collocation:"By way of illustration, + [formal structured example]",contexts:"Introducing an example in a slightly formal, structured explanation",connotation:"formal, deliberate",example:"By way of illustration, consider how a restaurant kitchen runs during peak hours."},
        {expression:"consider",collocation:"Consider + [thought-provoking scenario] + [as an example of the broader point]",contexts:"Inviting someone to imagine a scenario as an example",connotation:"engaging, thought-provoking",example:"Consider how different your mornings would be if you didn't check your phone first thing."},
        {expression:"take the case of",collocation:"Take the case of + [typical example] + [to see the broader pattern]",contexts:"Walking through a detailed representative example to make a point concrete",connotation:"thorough, illustrative",example:"Take the case of a typical small business trying to adopt AI—they face barriers most tech companies never consider."}
      ]
    }
  ]
},
{
  cat: "Emphasis · 强调",
  slug: "emphasis",
  funcs: [
    {
      name: "Highlight Key Point · 强调重点",
      phrases: [
        {expression:"the key thing is",collocation:"[long discussion]. The key thing is + [single most important takeaway]",contexts:"Zeroing in on the most important takeaway from a discussion",connotation:"focused, directive",example:"The key thing is that the client needs the draft by Friday, not Monday."},
        {expression:"above all",collocation:"[list of priorities]. Above all, + [the highest priority]",contexts:"Elevating one priority above everything else",connotation:"emphatic, prioritising",example:"Above all, make sure the data is accurate before you present it."},
        {expression:"the bottom line is",collocation:"[detailed debate]. The bottom line is + [non-negotiable truth]",contexts:"Cutting through discussion to state the non-negotiable truth",connotation:"blunt, definitive",example:"The bottom line is that we can't afford to delay the launch any further."},
        {expression:"it's crucial",collocation:"It's crucial that + [specific action or condition]",contexts:"Stressing the importance of a specific action or decision",connotation:"serious, urgent",example:"It's crucial that we get sign-off from legal before publishing anything."},
        {expression:"let me stress",collocation:"Let me stress + [easily overlooked point]",contexts:"Drawing special attention to something easily overlooked",connotation:"deliberate, emphatic",example:"Let me stress that this deadline isn't flexible—the event is already scheduled."},
        {expression:"I can't overstate",collocation:"I can't overstate how + [adjective] + [thing or experience was]",contexts:"Emphasising something so important that even strong words feel insufficient",connotation:"intense, sincere",example:"I can't overstate how much that small gesture meant to me at the time."}
      ]
    },
    {
      name: "Singular Emphasis · 唯一强调",
      phrases: [
        {expression:"the one thing",collocation:"The one thing + [you need to know or remember] + [explanation]",contexts:"Isolating the single most important factor",connotation:"definitive, focused",example:"The one thing you need to know about this software is that it auto-saves everything."},
        {expression:"if there's one thing",collocation:"If there's one thing + [I've learned or you should know], + [the distilled lesson]",contexts:"Sharing a distilled life lesson or key insight",connotation:"wise, reflective",example:"If there's one thing I've learned, it's that over-communicating is always better than under-communicating."},
        {expression:"nothing is more",collocation:"Nothing is more + [adjective] than + [the ultimate example]",contexts:"Emphasising something as the ultimate example of a quality",connotation:"emphatic, superlative",example:"Nothing is more frustrating than losing work because you forgot to save."},
        {expression:"the single biggest",collocation:"The single biggest + [factor, predictor, or element] is + [the most impactful one]",contexts:"Identifying the most impactful element among many",connotation:"analytical, emphatic",example:"The single biggest predictor of customer retention is the onboarding experience."},
        {expression:"first and foremost",collocation:"First and foremost, + [the primary point]. + [Secondary points come after]",contexts:"Putting the primary point before any secondary ones",connotation:"organised, prioritised",example:"First and foremost, this is a safety issue—cost comes second."},
        {expression:"if nothing else",collocation:"If nothing else, + [the one thing to remember above all]",contexts:"Isolating the one thing worth remembering if everything else is forgotten",connotation:"pragmatic, memorable",example:"If nothing else, remember that the customer's perception is their reality."}
      ]
    },
    {
      name: "Noteworthy Point · 值得注意",
      phrases: [
        {expression:"it's worth noting",collocation:"It's worth noting that + [easily overlooked detail or caveat]",contexts:"Drawing attention to something the listener might overlook",connotation:"helpful, observant",example:"It's worth noting that the parking garage closes at eight, not midnight."},
        {expression:"interestingly",collocation:"Interestingly, + [fascinating or unexpected observation]",contexts:"Pointing out a fascinating or unexpected detail",connotation:"curious, engaging",example:"Interestingly, people who talk to their plants actually do grow healthier ones—it's the CO2."},
        {expression:"the striking thing",collocation:"The striking thing about + [subject] is + [the most surprising or memorable aspect]",contexts:"Highlighting the most surprising or memorable aspect",connotation:"impressed, emphatic",example:"The striking thing about her presentation wasn't the data—it was how she told the story."},
        {expression:"significantly",collocation:"Significantly, + [important development or finding]",contexts:"Flagging a development or detail that carries real importance",connotation:"serious, analytical",example:"Significantly, the report found that flexible hours reduced turnover by forty percent."},
        {expression:"the remarkable thing is",collocation:"The remarkable thing is that + [genuinely impressive detail]",contexts:"Expressing genuine amazement at a particular detail",connotation:"impressed, enthusiastic",example:"The remarkable thing is that the entire project was built by a team of just three people."},
        {expression:"notably",collocation:"[broader finding]. Notably, + [a particularly striking specific data point]",contexts:"Drawing attention to a particularly striking data point or detail",connotation:"observant, precise",example:"Notably, the same survey found that younger workers prioritised flexibility over salary."}
      ]
    }
  ]
},
{
  cat: "Opinion & Stance · 观点与立场",
  slug: "opinion-stance",
  funcs: [
    {
      name: "Personal View · 个人看法",
      phrases: [
        {expression:"in my view",collocation:"In my view, + [personal perspective without claiming absolute truth]",contexts:"Offering your perspective in a discussion without claiming absolute truth",connotation:"measured, personal",example:"In my view, the best approach is to start small and iterate based on feedback."},
        {expression:"personally",collocation:"Personally, + [individual preference or take]",contexts:"Giving your individual preference among several options",connotation:"subjective, friendly",example:"Personally, I'd go with the blue one—it feels calmer for a bedroom."},
        {expression:"as far as I'm concerned",collocation:"As far as I'm concerned, + [clear personal stance]",contexts:"Stating your opinion clearly but acknowledging others may differ",connotation:"direct, unapologetic",example:"As far as I'm concerned, working overtime shouldn't be the default expectation."},
        {expression:"if you ask me",collocation:"If you ask me, + [bold or candid opinion]",contexts:"Offering an opinion that might be stronger than expected",connotation:"candid, slightly bold",example:"If you ask me, they should have promoted her years ago."},
        {expression:"the way I see it",collocation:"The way I see it, + [one valid framing among several]",contexts:"Framing your perspective as one valid interpretation",connotation:"open-minded, framing",example:"The way I see it, we have two options: cut costs or find new revenue."},
        {expression:"for my part",collocation:"For my part, + [individual take in a group context]",contexts:"Offering your personal take in a group discussion without claiming it's the final word",connotation:"measured, individual",example:"For my part, I'd rather take the risk and fail than never try at all."}
      ]
    },
    {
      name: "Strong Conviction · 强烈信念",
      phrases: [
        {expression:"I firmly believe",collocation:"I firmly believe that + [deeply held conviction]",contexts:"Stating a deeply held conviction in a serious discussion",connotation:"passionate, principled",example:"I firmly believe that access to education shouldn't depend on where someone was born."},
        {expression:"there's no doubt in my mind",collocation:"There's no doubt in my mind that + [absolute certainty]",contexts:"Expressing absolute certainty about a conviction",connotation:"unwavering, confident",example:"There's no doubt in my mind that she's the right person to lead this project."},
        {expression:"I'm convinced",collocation:"I'm convinced that + [strong evidence-based prediction or belief]",contexts:"Stating a strong belief based on evidence or pattern recognition",connotation:"confident, evidence-based",example:"I'm convinced that within five years, most meetings will be replaced by async updates."},
        {expression:"it's clear to me",collocation:"It's clear to me that + [obvious correct path forward]",contexts:"Asserting that the correct path forward is obvious",connotation:"decisive, clear-eyed",example:"It's clear to me that the current process is unsustainable."},
        {expression:"I'd stake my reputation on",collocation:"I'd stake my reputation on + [bold prediction or assessment]",contexts:"Expressing extreme confidence in a statement or prediction",connotation:"bold, committed",example:"I'd stake my reputation on this hire—they're going to transform the team."},
        {expression:"I'm absolutely certain",collocation:"I'm absolutely certain that + [unshakeable conviction]",contexts:"Expressing total conviction, often in a debate or serious discussion",connotation:"unshakable, authoritative",example:"I'm absolutely certain that investing in this team is the best decision we could make right now."}
      ]
    },
    {
      name: "Cautious Opinion · 谨慎观点",
      phrases: [
        {expression:"I tend to think",collocation:"I tend to think that + [tentative opinion]",contexts:"Offering an opinion gently without wanting to impose it",connotation:"tentative, respectful",example:"I tend to think that rushing decisions leads to more problems than it solves."},
        {expression:"I'm inclined to believe",collocation:"I'm inclined to believe that + [leaning position while acknowledging doubt]",contexts:"Leaning toward a view while acknowledging you could be wrong",connotation:"measured, open-minded",example:"I'm inclined to believe the issue is with the server, not the app itself."},
        {expression:"my gut feeling is",collocation:"My gut feeling is that + [intuition-based hunch rather than data-driven conclusion]",contexts:"Sharing an intuition-based opinion rather than a data-driven one",connotation:"instinctive, honest",example:"My gut feeling is that this partnership isn't going to work out long-term."},
        {expression:"it seems to me",collocation:"It seems to me that + [observation framed as perception, not fact]",contexts:"Framing an observation as perception rather than fact",connotation:"observant, tentative",example:"It seems to me that the real tension isn't about the schedule but about ownership."},
        {expression:"I could be wrong but",collocation:"I could be wrong, but + [humble opinion acknowledging possible error]",contexts:"Humbling an opinion by acknowledging the possibility of error",connotation:"humble, honest",example:"I could be wrong, but I think they're planning to announce layoffs next quarter."}
      ]
    }
  ]
},
{
  cat: "Hedging & Softening · 缓和与模糊表达",
  slug: "hedging-softening",
  funcs: [
    {
      name: "Softening Force · 弱化语气",
      phrases: [
        {expression:"kind of",collocation:"[strong statement softened] — I kind of + [tentative version]",contexts:"Softening what you're about to say in casual conversation",connotation:"tentative, friendly",example:"I kind of feel like we're overcomplicating something that should be simple."},
        {expression:"a bit",collocation:"[criticism or observation] is a bit + [softened adjective]",contexts:"Softening criticism to avoid sounding harsh",connotation:"gentle, polite",example:"The music is a bit loud if you're trying to have a conversation."},
        {expression:"perhaps",collocation:"Perhaps + [suggestion framed as gentle possibility]",contexts:"Making a suggestion without being pushy",connotation:"polite, non-imposing",example:"Perhaps we could revisit this after the morning's data comes in."},
        {expression:"might want to",collocation:"You might want to + [non-pushy suggestion or advice]",contexts:"Offering advice without sounding bossy",connotation:"helpful, non-directive",example:"You might want to double-check the contract before you sign anything."},
        {expression:"just",collocation:"I was just + [downplayed request or observation]",contexts:"Downplaying a request to make it less demanding",connotation:"casual, unassuming",example:"I was just wondering if you had a minute to look at this draft."}
      ]
    },
    {
      name: "Avoiding Absolutes · 避免绝对化",
      phrases: [
        {expression:"tends to",collocation:"[phenomenon or pattern] tends to + [verb] + [frequency qualifier]",contexts:"Describing a pattern without claiming it always happens",connotation:"measured, observant",example:"The Wi-Fi tends to drop around three in the afternoon for some reason."},
        {expression:"it's not uncommon",collocation:"It's not uncommon for + [thing or situation] to + [verb]",contexts:"Acknowledging that something happens fairly often without saying always",connotation:"understated, observant",example:"It's not uncommon for new hires to feel overwhelmed in the first month."},
        {expression:"in most cases",collocation:"In most cases, + [general truth with reasonable exceptions implied]",contexts:"Qualifying a general statement with a reasonable exception",connotation:"fair, balanced",example:"In most cases, restarting the computer fixes the issue."},
        {expression:"to some extent",collocation:"To some extent, + [partial agreement leaving room for nuance]",contexts:"Partially agreeing while leaving room for nuance",connotation:"diplomatic, nuanced",example:"To some extent, I agree that the design is dated, but the functionality is still solid."},
        {expression:"not necessarily",collocation:"[assumption challenged]. It's not necessarily + [absolute claim] + [nuance]",contexts:"Pushing back gently against an assumption",connotation:"thoughtful, corrective",example:"A smaller team isn't necessarily slower—it often makes decisions faster."}
      ]
    },
    {
      name: "Approximation · 近似表达",
      phrases: [
        {expression:"sort of",collocation:"[approximate description] — it's sort of like + [best available analogy]",contexts:"Describing something that isn't quite the word you want",connotation:"informal, approximate",example:"The feeling is sort of like when you walk into a room and forget why you went there."},
        {expression:"something like",collocation:"[rough quantity or description] — something like + [approximate figure or comparison]",contexts:"Giving a rough description without committing to precision",connotation:"casual, approximate",example:"The budget is something like five thousand—I'd need to check the exact number."},
        {expression:"roughly",collocation:"Roughly + [approximate number or time]",contexts:"Giving an approximate number when exact data isn't available",connotation:"casual, imprecise",example:"Roughly how many people showed up to the launch event?"},
        {expression:"or something",collocation:"[specific time or quantity], or something + [deliberately vague alternative]",contexts:"Ending a statement with deliberate vagueness when you're not sure",connotation:"very casual, noncommittal",example:"We should grab lunch around noon or something, if you're free."},
        {expression:"give or take",collocation:"[estimate] + [number], give or take + [margin of error]",contexts:"Offering an estimate with a built-in margin of error",connotation:"honest, approximate",example:"The drive takes about three hours, give or take traffic."}
      ]
    }
  ]
},
{
  cat: "Generalising · 概括表达",
  slug: "generalising",
  funcs: [
    {
      name: "Broad Generalisation · 广泛概括",
      phrases: [
        {expression:"generally speaking",collocation:"Generally speaking, + [broad observation about pattern or group]",contexts:"Making a broad observation about a group or pattern",connotation:"measured, observant",example:"Generally speaking, the earlier you book flights, the cheaper they are."},
        {expression:"on the whole",collocation:"On the whole, + [balanced overall assessment]",contexts:"Giving an overall assessment of a situation",connotation:"balanced, summary",example:"On the whole, it's been a productive year despite the rough start."},
        {expression:"by and large",collocation:"By and large, + [statement true most of the time]",contexts:"Making a general statement that's true most of the time",connotation:"confident, generalising",example:"By and large, most customers don't read the terms and conditions."},
        {expression:"for the most part",collocation:"For the most part, + [typical state with unstated exceptions]",contexts:"Describing the typical state while acknowledging exceptions",connotation:"honest, balanced",example:"For the most part, the event ran smoothly, apart from the audio glitch at the start."},
        {expression:"as a rule",collocation:"As a rule, + [personal or observed principle]",contexts:"Stating a personal or observed principle",connotation:"principled, general",example:"As a rule, I try not to check emails after eight in the evening."}
      ]
    },
    {
      name: "Qualified Generalisation · 有限概括",
      phrases: [
        {expression:"more often than not",collocation:"More often than not, + [what usually happens without claiming it's universal]",contexts:"Stating what usually happens without claiming it's universal",connotation:"observant, measured",example:"More often than not, the simplest explanation turns out to be the right one."},
        {expression:"in many cases",collocation:"In many cases, + [common pattern without overgeneralising]",contexts:"Acknowledging a common pattern without overgeneralising",connotation:"cautious, fair",example:"In many cases, the delay isn't caused by the developer but by unclear requirements."},
        {expression:"broadly speaking",collocation:"Broadly speaking, + [high-level categorisation before diving into details]",contexts:"Setting up a high-level categorisation before diving into details",connotation:"structured, overview",example:"Broadly speaking, there are two approaches to solving this: top-down or bottom-up."},
        {expression:"tend to",collocation:"[group or people] tend to + [verb] + [common but not universal behaviour]",contexts:"Observing a common human tendency",connotation:"observant, wise",example:"People tend to underestimate how long creative work actually takes."},
        {expression:"with a few exceptions",collocation:"With a few exceptions, + [general claim explicitly allowing outliers]",contexts:"Making a general claim while explicitly allowing for outliers",connotation:"fair, precise",example:"With a few exceptions, everyone on the team preferred the four-day work week."}
      ]
    }
  ]
},
{
  cat: "Sequencing · 顺序连接",
  slug: "sequencing",
  funcs: [
    {
      name: "Chronological · 时间顺序",
      phrases: [
        {expression:"at first",collocation:"At first, + [initial impression or state]. + [How it changed later]",contexts:"Describing an initial impression that later changed",connotation:"narrative, reflective",example:"At first, I thought she was being rude, but then I realised she was just shy."},
        {expression:"subsequently",collocation:"[key event A]. Subsequently, + [later event B in chronological sequence]",contexts:"Narrating events that happened after a key moment",connotation:"formal, sequential",example:"The prototype failed the first test. Subsequently, the team spent three months redesigning it."},
        {expression:"eventually",collocation:"[long process described]. Eventually, + [final resolution or outcome]",contexts:"Telling how something resolved after a long process",connotation:"patient, resolved",example:"We tried six different approaches, and eventually, the simplest one worked."},
        {expression:"meanwhile",collocation:"[main action in one place]. Meanwhile, + [parallel action happening elsewhere]",contexts:"Juggling two parallel timelines in a story",connotation:"narrative, engaging",example:"While we were stuck in traffic, meanwhile, they'd already started the presentation without us."},
        {expression:"afterwards",collocation:"[main event concluded]. Afterwards, + [what happened following it]",contexts:"Describing what happened following a main event",connotation:"sequential, narrative",example:"The ceremony ended around four. Afterwards, we all went to her parents' place for dinner."}
      ]
    },
    {
      name: "Logical Sequence · 逻辑顺序",
      phrases: [
        {expression:"first of all",collocation:"First of all, + [step 1 or foundational point]",contexts:"Opening a structured explanation or argument",connotation:"organised, clear",example:"First of all, we need to define what success looks like before we set any targets."},
        {expression:"next",collocation:"[step A completed]. Next, + [step B in the process]",contexts:"Moving through steps in a process or argument",connotation:"sequential, guiding",example:"Next, you'll want to season the pan before adding anything else."},
        {expression:"then",collocation:"[step A completed], then + [the following step or result]",contexts:"Continuing a step-by-step explanation",connotation:"casual, sequential",example:"Let the dough rest for an hour, then roll it out on a floured surface."},
        {expression:"lastly",collocation:"[points 1 through N-1 listed]. Lastly, + [final point or step]",contexts:"Finishing a list of points with the final one",connotation:"conclusive, organised",example:"Lastly, don't forget to back up your files before running the update."},
        {expression:"following that",collocation:"[stage A completed]. Following that, + [next procedural stage B]",contexts:"Moving from one stage to the next in a process",connotation:"formal, procedural",example:"Following that, the candidate will have a thirty-minute chat with the team lead."}
      ]
    },
    {
      name: "Importance Order · 重要性排序",
      phrases: [
        {expression:"most importantly",collocation:"[multiple points listed]. Most importantly, + [the most critical point elevated above all]",contexts:"Elevating the most critical point above all others",connotation:"emphatic, prioritising",example:"The project was on time, under budget, and most importantly, the client loved it."},
        {expression:"above all else",collocation:"[list of priorities]. Above all else, + [the ultimate non-negotiable priority]",contexts:"Stressing the ultimate priority before anything else",connotation:"urgent, directive",example:"Above all else, remember to stay calm when the Q&A gets hostile."},
        {expression:"to begin with",collocation:"To begin with, + [foundational point everything else depends on]",contexts:"Starting with the foundational point that everything else depends on",connotation:"foundational, logical",example:"To begin with, the whole premise of the argument is based on outdated data."},
        {expression:"more to the point",collocation:"[secondary issue dismissed]. More to the point, + [core matter cut to directly]",contexts:"Cutting past secondary issues to the core matter",connotation:"direct, impatient",example:"We can debate the wording later. More to the point, why wasn't anyone told about this?"},
        {expression:"at the top of the list",collocation:"At the top of the list is + [the number-one priority among several]",contexts:"Naming the number-one priority among several",connotation:"decisive, clear",example:"At the top of the list is fixing the checkout flow—everything else can wait."}
      ]
    }
  ]
},
{
  cat: "Topic Management · 话题管理",
  slug: "topic-management",
  funcs: [
    {
      name: "Introducing a Topic · 引入话题",
      phrases: [
        {expression:"speaking of",collocation:"[topic keyword just mentioned]. Speaking of + [related topic], + [new related angle or question]",contexts:"Segueing naturally from something just mentioned to a related topic",connotation:"smooth, conversational",example:"Speaking of travel, have you decided where you're going for the holidays?"},
        {expression:"on the subject of",collocation:"On the subject of + [topic], + [transition to structured discussion]",contexts:"Formally transitioning to a new topic in a meeting",connotation:"structured, professional",example:"On the subject of deadlines, I think we need to push the launch back by a week."},
        {expression:"that reminds me",collocation:"[something someone just said]. That reminds me — + [triggered thought or task]",contexts:"A thought triggered by what someone just said",connotation:"spontaneous, genuine",example:"That reminds me—I need to pick up the dry cleaning before they close."},
        {expression:"this brings us to",collocation:"[preceding discussion]. This brings us to + [next logical question or topic]",contexts:"Steering the conversation toward a specific point",connotation:"guiding, deliberate",example:"This brings us to the question of whether we should hire internally or externally."},
        {expression:"while we're on the topic",collocation:"While we're on the topic of + [current subject], + [opportunistic related point]",contexts:"Taking advantage of the current subject to raise something related",connotation:"opportunistic, conversational",example:"While we're on the topic of budgets, has anyone looked at the software licensing costs?"}
      ]
    },
    {
      name: "Switching Topic · 转换话题",
      phrases: [
        {expression:"on a different note",collocation:"[previous topic concluded]. On a different note, + [unrelated new subject]",contexts:"Transitioning to an unrelated subject after finishing a discussion",connotation:"polite, directional",example:"On a different note, has anyone tried that new ramen place on the corner?"},
        {expression:"changing the subject",collocation:"Changing the subject, + [deliberate shift to a new topic]",contexts:"Deliberately steering the conversation elsewhere, often from something awkward",connotation:"deliberate, sometimes evasive",example:"Changing the subject for a moment—are we still on for drinks on Thursday?"},
        {expression:"that aside",collocation:"[current topic set aside]. That aside, + [new topic to address]",contexts:"Setting aside the current topic to address something else",connotation:"efficient, directive",example:"That aside, let's talk about the actual numbers from last quarter."},
        {expression:"anyway",collocation:"[tangent or awkward pause]. Anyway, + [return to or shift in conversation]",contexts:"Casually moving on from a tangent or awkward pause",connotation:"informal, redirecting",example:"Anyway, as I was saying before we got sidetracked, the deal's basically done."},
        {expression:"moving on",collocation:"[current agenda item finished]. Moving on to + [next agenda item]",contexts:"Progressing through an agenda or conversation",connotation:"efficient, slightly formal",example:"Moving on to the next item on the list—the marketing budget for Q3."}
      ]
    },
    {
      name: "Returning to Topic · 回到话题",
      phrases: [
        {expression:"as I was saying",collocation:"[interruption or tangent happened]. As I was saying, + [resuming the original thread]",contexts:"Picking up a thread after being interrupted or going on a tangent",connotation:"patient, persistent",example:"As I was saying before we got interrupted, the numbers actually look better than expected."},
        {expression:"coming back to",collocation:"[digression concluded]. Coming back to + [earlier point that deserves more attention]",contexts:"Returning to an earlier point that deserves more attention",connotation:"thoughtful, attentive",example:"Coming back to what you said about the onboarding process, I think you're right."},
        {expression:"to pick up where we left off",collocation:"To pick up where we left off, + [resuming paused discussion]",contexts:"Resuming a discussion that was paused",connotation:"deliberate, professional",example:"To pick up where we left off earlier, the main issue is still resource allocation."},
        {expression:"going back to",collocation:"[long digression]. Going back to + [the original topic or question]",contexts:"Returning to the initial topic after a long digression",connotation:"refocusing, structured",example:"Going back to the original question, I think the answer depends on the timeline."},
        {expression:"circling back",collocation:"Circling back to + [point raised earlier but not fully addressed]",contexts:"Revisiting a point that was raised earlier but not fully addressed",connotation:"thorough, attentive",example:"Circling back to something you mentioned earlier about vendor reliability—can you elaborate?"}
      ]
    }
  ]
},
{
  cat: "Clarification · 澄清说明",
  slug: "clarification",
  funcs: [
    {
      name: "Explaining · 解释",
      phrases: [
        {expression:"what I mean is",collocation:"[misunderstood statement]. What I mean is + [clarification]",contexts:"Elaborating on a point that clearly wasn't understood",connotation:"patient, clarifying",example:"What I mean is that the feature isn't broken—it's just not turned on by default."},
        {expression:"let me explain",collocation:"Let me explain + [how something works or what something means]",contexts:"Offering a fuller explanation when someone looks confused",connotation:"helpful, patient",example:"Let me explain how the referral system works—it's simpler than it sounds."},
        {expression:"allow me to clarify",collocation:"Allow me to clarify: + [formal correction of misunderstanding]",contexts:"Formally correcting a misunderstanding before it spreads",connotation:"polite, professional",example:"Allow me to clarify—the budget was approved, but only for the first phase."},
        {expression:"in the sense that",collocation:"[broad statement] in the sense that + [narrowed specific meaning]",contexts:"Narrowing down what you meant by a broad or ambiguous statement",connotation:"precise, clarifying",example:"It's risky in the sense that we'd be betting on an unproven market, not that it's illegal."},
        {expression:"to put it more clearly",collocation:"[poorly expressed original]. To put it more clearly, + [restated version]",contexts:"Restating something that came out badly the first time",connotation:"self-corrective, clear",example:"To put it more clearly, I'm not saying the idea is bad—I'm saying we don't have the resources for it."}
      ]
    },
    {
      name: "Redefining · 重新定义",
      phrases: [
        {expression:"by that I mean",collocation:"[ambiguous term used]. By that I mean + [specific intended definition]",contexts:"Immediately clarifying a potentially ambiguous term",connotation:"precise, thoughtful",example:"We need a more agile approach—by that I mean shorter feedback loops, not more meetings."},
        {expression:"strictly speaking",collocation:"Strictly speaking, + [precise correction of loose usage]",contexts:"Applying a precise definition to correct a loose usage",connotation:"precise, slightly pedantic",example:"Strictly speaking, it's not an investment—it's a loan with extra steps."},
        {expression:"in the strictest sense",collocation:"In the strictest sense, + [most accurate definition applied]",contexts:"Applying the most accurate definition possible",connotation:"precise, formal",example:"In the strictest sense, this isn't a promotion—it's a lateral move with more responsibility."},
        {expression:"or more accurately",collocation:"[initial statement], or more accurately, + [refined self-correction]",contexts:"Refining your own statement to be more precise",connotation:"self-corrective, honest",example:"The issue is speed—or more accurately, the perception of speed, since the backend is fine."},
        {expression:"not so much X as Y",collocation:"[description]. Not so much + [quality A] as + [quality B — the truer description]",contexts:"Clarifying a distinction between two similar things",connotation:"nuanced, precise",example:"I'm not so much angry as I am confused about why nobody flagged this earlier."}
      ]
    }
  ]
},
{
  cat: "Summarising · 总结",
  slug: "summarising",
  funcs: [
    {
      name: "Summarising · 概括总结",
      phrases: [
        {expression:"in short",collocation:"[long explanation]. In short, + [concise gist or bottom line]",contexts:"Giving the gist of a long explanation at a meeting",connotation:"concise, efficient",example:"In short, we're on track for the launch, but we need two more weeks of testing."},
        {expression:"to sum up",collocation:"To sum up, + [key takeaways from a presentation or discussion]",contexts:"Wrapping up a presentation or discussion with the key takeaways",connotation:"structured, conclusive",example:"To sum up the main points: costs are down, satisfaction is up, and we need to hire."},
        {expression:"the upshot is",collocation:"[complicated back-and-forth]. The upshot is + [practical bottom line]",contexts:"Giving the practical bottom line after a complicated explanation",connotation:"direct, practical",example:"There were a lot of debates, but the upshot is that we're going with the cheaper option."},
        {expression:"all things considered",collocation:"All things considered, + [balanced summary weighing pros and cons]",contexts:"Giving a balanced summary that weighs pros and cons",connotation:"balanced, reflective",example:"All things considered, it went better than anyone expected, given the tight timeline."},
        {expression:"to cut a long story short",collocation:"To cut a long story short, + [the key outcome skipping all the details]",contexts:"Skipping the details to deliver the key outcome of a story",connotation:"colloquial, self-aware",example:"To cut a long story short, we missed the train, took a bus, and arrived three hours late."}
      ]
    },
    {
      name: "Concluding · 结论",
      phrases: [
        {expression:"in conclusion",collocation:"In conclusion, + [formal wrap-up of an argument or presentation]",contexts:"Formally ending a structured argument or presentation",connotation:"formal, definitive",example:"In conclusion, the data supports expanding into the Asian market next year."},
        {expression:"ultimately",collocation:"[all angles considered]. Ultimately, + [final decisive point]",contexts:"Reaching the final point after considering all angles",connotation:"definitive, philosophical",example:"Ultimately, the decision comes down to whether we value speed or quality more."},
        {expression:"when all is said and done",collocation:"When all is said and done, + [what truly matters beyond the noise]",contexts:"Looking past the noise to what really matters",connotation:"philosophical, conclusive",example:"When all is said and done, what people remember is how you made them feel."},
        {expression:"the takeaway here",collocation:"The takeaway here is + [single most important lesson from the discussion]",contexts:"Delivering the single most important lesson from a discussion",connotation:"direct, memorable",example:"The takeaway here is simple: clear expectations prevent most conflicts."},
        {expression:"so there you have it",collocation:"So there you have it — + [casual wrap-up of an explanation or story]",contexts:"Casually wrapping up an explanation or story",connotation:"informal, satisfied",example:"So there you have it—that's how three people built a company worth millions."}
      ]
    }
  ]
},
{
  cat: "Certainty & Uncertainty · 确定与不确定",
  slug: "certainty-uncertainty",
  funcs: [
    {
      name: "Certain · 确定",
      phrases: [
        {expression:"undoubtedly",collocation:"Undoubtedly, + [statement expressed with total confidence]",contexts:"Expressing complete confidence in a statement",connotation:"confident, emphatic",example:"This is undoubtedly the best pizza in the entire city."},
        {expression:"there's no question",collocation:"There's no question that + [statement beyond debate]",contexts:"Stating something as beyond debate",connotation:"assertive, definitive",example:"There's no question that she was the most qualified candidate by a wide margin."},
        {expression:"it goes without saying",collocation:"It goes without saying that + [obvious foundational truth]",contexts:"Stating something obvious as a foundation for further discussion",connotation:"matter-of-fact, foundational",example:"It goes without saying that you shouldn't share confidential data outside the team."},
        {expression:"without a doubt",collocation:"Without a doubt, + [emphatic agreement or statement of total conviction]",contexts:"Emphatically agreeing or stating something with total conviction",connotation:"enthusiastic, absolute",example:"Without a doubt, the highlight of the trip was the sunrise hike."},
        {expression:"I'm positive",collocation:"I'm positive that + [personal assertion of certainty]",contexts:"Asserting personal certainty based on memory",connotation:"confident, personal",example:"I'm positive I sent that email—check your spam folder."}
      ]
    },
    {
      name: "Probable · 可能",
      phrases: [
        {expression:"chances are",collocation:"Chances are, + [reasonable prediction based on past experience]",contexts:"Making a reasonable prediction based on past experience",connotation:"optimistic, practical",example:"Chances are, the meeting will run over by at least fifteen minutes."},
        {expression:"most likely",collocation:"Most likely, + [the most probable explanation or outcome]",contexts:"Identifying the most probable explanation among several",connotation:"logical, reasoned",example:"Most likely, the delay is due to customs rather than the supplier."},
        {expression:"it's quite possible",collocation:"It's quite possible that + [real possibility acknowledged without full commitment]",contexts:"Acknowledging a real possibility without committing to it",connotation:"open-minded, reasonable",example:"It's quite possible that the market shifts significantly before the end of the year."},
        {expression:"I wouldn't be surprised if",collocation:"I wouldn't be surprised if + [prediction based on observed patterns]",contexts:"Predicting something likely based on observed patterns",connotation:"knowing, predictive",example:"I wouldn't be surprised if they announce a merger by the end of the quarter."},
        {expression:"in all likelihood",collocation:"In all likelihood, + [high-confidence measured prediction]",contexts:"Making a high-confidence prediction with a touch of formality",connotation:"measured, confident",example:"In all likelihood, we'll be working remotely for at least another six months."}
      ]
    },
    {
      name: "Uncertain · 不确定",
      phrases: [
        {expression:"I'm not sure",collocation:"I'm not sure if + [genuine admission of uncertainty]",contexts:"Honestly admitting you don't know something",connotation:"humble, honest",example:"I'm not sure if the cinema still does discount Tuesdays."},
        {expression:"it's hard to say",collocation:"It's hard to say + [what depends on more information]",contexts:"Acknowledging that more information is needed to judge",connotation:"cautious, fair",example:"It's hard to say whether the new policy will work until we see a full quarter of data."},
        {expression:"I could be wrong but",collocation:"I could be wrong, but + [humble opinion acknowledging possible error]",contexts:"Offering information with an honest caveat",connotation:"humble, open",example:"I could be wrong, but I think the deadline got moved up to the fifteenth."},
        {expression:"your guess is as good as mine",collocation:"Your guess is as good as mine — [making it clear you know as little as they do]",contexts:"Admitting you know as little as the other person",connotation:"informal, self-deprecating",example:"Will they actually finish on time? Your guess is as good as mine."},
        {expression:"I'm in two minds",collocation:"I'm in two minds about + [genuine indecision between two options]",contexts:"Expressing genuine indecision about a personal choice",connotation:"torn, thoughtful",example:"I'm in two minds about accepting the offer—the salary is great but the commute is brutal."}
      ]
    }
  ]
},
{
  cat: "Agreement & Disagreement · 同意与不同意",
  slug: "agreement-disagreement",
  funcs: [
    {
      name: "Agreeing · 同意",
      phrases: [
        {expression:"absolutely",collocation:"Absolutely — + [enthusiastic full agreement with someone's point]",contexts:"Enthusiastically agreeing with someone's point",connotation:"warm, emphatic",example:"Absolutely—that was the best decision we made all year."},
        {expression:"I'm with you on that",collocation:"I'm with you on that — + [solidarity with someone's opinion]",contexts:"Expressing solidarity with someone's opinion",connotation:"supportive, casual",example:"I'm with you on that—the new layout is way more intuitive."},
        {expression:"no argument here",collocation:"No argument here — + [full concession that someone is correct]",contexts:"Conceding that someone's point is correct without debate",connotation:"agreeable, easygoing",example:"No argument here—I should have checked the data before presenting."},
        {expression:"that's a fair point",collocation:"That's a fair point — + [acknowledging validity of a counterargument]",contexts:"Acknowledging the validity of someone's counterargument",connotation:"respectful, open-minded",example:"That's a fair point—I hadn't considered the impact on the support team."},
        {expression:"you hit the nail on the head",collocation:"You hit the nail on the head — + [someone perfectly captured the issue]",contexts:"Telling someone they've perfectly captured the issue",connotation:"impressed, emphatic",example:"You hit the nail on the head—it's not a technical problem, it's a communication problem."}
      ]
    },
    {
      name: "Partial Agreement · 部分同意",
      phrases: [
        {expression:"up to a point",collocation:"Up to a point, I agree — + [but with this reservation]",contexts:"Agreeing with the general idea but having reservations",connotation:"measured, diplomatic",example:"Up to a point, I agree—but I think we're underestimating the implementation time."},
        {expression:"I see what you mean but",collocation:"I see what you mean, but + [nuanced counterpoint or addition]",contexts:"Acknowledging someone's perspective while adding nuance",connotation:"respectful, nuanced",example:"I see what you mean, but consider how this would affect the smaller teams."},
        {expression:"that's true to an extent",collocation:"That's true to an extent, though + [important qualification or counterpoint]",contexts:"Partially conceding a point before offering a counterpoint",connotation:"fair, balanced",example:"That's true to an extent, though it really depends on which market we're talking about."},
        {expression:"I take your point",collocation:"I take your point about + [specific concern], + [but here's the nuance]",contexts:"Acknowledging a valid concern while not fully agreeing",connotation:"respectful, diplomatic",example:"I take your point about the timeline, but rushing the testing phase could backfire."},
        {expression:"you have a point, still",collocation:"You have a point about + [conceded aspect]. Still, + [maintaining original position]",contexts:"Conceding partial validity while maintaining your position",connotation:"fair, persistent",example:"You have a point about the cost. Still, I think the long-term savings justify it."}
      ]
    },
    {
      name: "Polite Disagreement · 礼貌反驳",
      phrases: [
        {expression:"I'm not sure I agree",collocation:"I'm not sure I agree that + [gentle pushback on a claim]",contexts:"Pushing back gently in a professional setting",connotation:"polite, measured",example:"I'm not sure I agree that outsourcing is the only solution here."},
        {expression:"with all due respect",collocation:"With all due respect, + [respectful but firm disagreement]",contexts:"Preparing to disagree when speaking to someone senior",connotation:"respectful but firm",example:"With all due respect, I think we're focusing on the wrong metrics."},
        {expression:"I see it differently",collocation:"I see it differently — + [alternative perspective without dismissing theirs]",contexts:"Offering an alternative perspective without dismissing theirs",connotation:"open, diplomatic",example:"I see it a bit differently—I think the slow uptake is a messaging problem, not a product problem."},
        {expression:"that's one way to look at it",collocation:"That's one way to look at it, but + [implying there's another valid perspective]",contexts:"Acknowledging a perspective while implying there are others",connotation:"diplomatic, slightly dismissive",example:"That's one way to look at it, but the data tells a different story."},
        {expression:"I'd argue the opposite",collocation:"I'd argue the opposite — + [confidently taking the opposing view]",contexts:"Directly but politely taking the opposing view",connotation:"confident, respectful",example:"Actually, I'd argue the opposite—tight deadlines often produce the most creative solutions."}
      ]
    }
  ]
},
{
  cat: "Shared Knowledge · 共享知识",
  slug: "shared-knowledge",
  funcs: [
    {
      name: "Common Ground · 共识基础",
      phrases: [
        {expression:"as we all know",collocation:"As we all know, + [shared background fact everyone in the room is aware of]",contexts:"Referencing something everyone in the room is aware of",connotation:"inclusive, foundational",example:"As we all know, the supplier has been unreliable for the past two quarters."},
        {expression:"obviously",collocation:"Obviously, + [point that should be clear to everyone present]",contexts:"Pointing out something that should be clear to everyone",connotation:"matter-of-fact, shared",example:"Obviously, we'd prefer to launch in spring, but the timeline doesn't allow it."},
        {expression:"needless to say",collocation:"Needless to say, + [obvious reaction or outcome to a shared understanding]",contexts:"Stating the obvious reaction to a situation",connotation:"emphatic, relatable",example:"Needless to say, I was thrilled when they offered me the position."},
        {expression:"it's no secret that",collocation:"It's no secret that + [something widely known but perhaps not openly discussed]",contexts:"Acknowledging something widely known but perhaps not openly discussed",connotation:"candid, honest",example:"It's no secret that the team has been stretched thin since the reorganisation."},
        {expression:"we've all been there",collocation:"We've all been there — + [universal shared experience that builds empathy]",contexts:"Appealing to a universal shared experience",connotation:"empathetic, bonding",example:"We've all been there—you prepare for weeks and then your mind goes blank."}
      ]
    },
    {
      name: "Checking Understanding · 确认理解",
      phrases: [
        {expression:"if you see what I mean",collocation:"[explanation], if you see what I mean — [checking if it landed]",contexts:"Checking if your explanation landed during a casual chat",connotation:"conversational, inviting",example:"It's less of a job and more of a calling, if you see what I mean."},
        {expression:"does that make sense",collocation:"[explanation finished]. Does that make sense? — [pausing to check listener comprehension]",contexts:"Pausing mid-explanation to ensure the listener is following",connotation:"considerate, patient",example:"The data flows from the app to the server, then back. Does that make sense?"},
        {expression:"are we on the same page",collocation:"Are we on the same page about + [specific point being confirmed]?",contexts:"Confirming alignment before moving forward in a discussion",connotation:"collaborative, thorough",example:"Are we on the same page about the budget, or should we go over it again?"},
        {expression:"you know what I mean",collocation:"[informal description], you know what I mean? — [seeking informal confirmation]",contexts:"Seeking confirmation that your informal description was understood",connotation:"informal, bonding",example:"It's that feeling when you walk into a room and forget why—you know what I mean?"},
        {expression:"if that tracks",collocation:"[your reasoning]. Does that track with + [the other person's understanding]?",contexts:"Checking if your reasoning aligns with the other person's understanding",connotation:"collaborative, casual",example:"So the delay came from the design side, not engineering—if that tracks with what you saw."}
      ]
    }
  ]
},
{
  cat: "Attitude & Emotion · 态度与情感",
  slug: "attitude-emotion",
  funcs: [
    {
      name: "Surprise · 惊讶",
      phrases: [
        {expression:"surprisingly",collocation:"Surprisingly, + [outcome that defied expectation]",contexts:"Expressing pleasant or notable surprise at an outcome",connotation:"pleased, observant",example:"Surprisingly, the cheapest option turned out to be the most durable."},
        {expression:"I was taken aback",collocation:"I was taken aback by + [what genuinely caught you off guard]",contexts:"Describing being genuinely caught off guard",connotation:"honest, vulnerable",example:"I was taken aback by how thoughtful her feedback was—she'd really read the whole thing."},
        {expression:"it never occurred to me",collocation:"It never occurred to me that + [blind spot or unconsidered possibility]",contexts:"Acknowledging a blind spot you didn't see coming",connotation:"humble, self-aware",example:"It never occurred to me that working from home could actually increase productivity."},
        {expression:"lo and behold",collocation:"[long search or expectation]. And lo and behold, + [dramatic surprising discovery]",contexts:"Dramatically revealing a surprising discovery in a story",connotation:"storyteller, playful",example:"I searched everywhere for my keys, and lo and behold, they were in the fridge."},
        {expression:"you won't believe",collocation:"You won't believe + [surprising event or coincidence]",contexts:"Building anticipation before sharing something surprising",connotation:"excited, engaging",example:"You won't believe who I ran into at the airport—our old physics teacher."}
      ]
    },
    {
      name: "Regret · 遗憾",
      phrases: [
        {expression:"unfortunately",collocation:"Unfortunately, + [disappointing news delivered sympathetically]",contexts:"Delivering disappointing news with a sympathetic tone",connotation:"sympathetic, regretful",example:"Unfortunately, the venue was double-booked, so we had to find an alternative."},
        {expression:"I wish I had",collocation:"I wish I had + [past action you regret not taking]",contexts:"Expressing personal regret about a past decision",connotation:"reflective, honest",example:"I wish I had started saving for retirement in my twenties instead of my thirties."},
        {expression:"in hindsight",collocation:"In hindsight, + [what you'd do differently with benefit of experience]",contexts:"Reflecting on what you'd do differently with the benefit of experience",connotation:"wise, reflective",example:"In hindsight, we should have tested the feature with real users before the full launch."},
        {expression:"if only",collocation:"If only + [missed opportunity expressed wistfully]",contexts:"Expressing wistful regret about missing an opportunity",connotation:"wistful, slightly mournful",example:"If only I'd known they were hiring, I would have applied in a heartbeat."},
        {expression:"it's a shame",collocation:"It's a shame + [disappointing situation beyond anyone's control]",contexts:"Expressing disappointment about a situation beyond anyone's control",connotation:"empathetic, gentle",example:"It's a shame they couldn't make it—they would have loved the exhibit."}
      ]
    },
    {
      name: "Sincerity · 真诚",
      phrases: [
        {expression:"frankly",collocation:"Frankly, + [candid statement even when uncomfortable]",contexts:"Being completely honest, even when it's uncomfortable",connotation:"candid, direct",example:"Frankly, I think we've been avoiding the real problem for months."},
        {expression:"honestly",collocation:"Honestly, + [genuine sincere answer rather than a made-up one]",contexts:"Answering with genuine candour rather than making something up",connotation:"sincere, refreshing",example:"Honestly, I have no idea how they pulled it off with that budget."},
        {expression:"to tell you the truth",collocation:"To tell you the truth, + [revealing true feelings after perhaps hiding them]",contexts:"Revealing your true feelings after perhaps hiding them",connotation:"vulnerable, honest",example:"To tell you the truth, I was terrified the whole time I was on stage."},
        {expression:"I'll be straight with you",collocation:"I'll be straight with you — + [honest but possibly unwelcome truth]",contexts:"Preparing someone for an honest but possibly unwelcome truth",connotation:"direct, trustworthy",example:"I'll be straight with you—the timeline you're proposing isn't realistic."},
        {expression:"in all honesty",collocation:"In all honesty, + [admitting something you might have been reluctant to say]",contexts:"Admitting something you might have been reluctant to say",connotation:"candid, self-aware",example:"In all honesty, I expected the project to fail, and I'm thrilled I was wrong."}
      ]
    }
  ]
},
{
  cat: "Turn-taking · 话轮转换",
  slug: "turn-taking",
  funcs: [
    {
      name: "Taking the Turn · 接过话轮",
      phrases: [
        {expression:"can I just say",collocation:"Can I just say — + [polite interjection in a group conversation]",contexts:"Politely interjecting in a group conversation",connotation:"eager, polite",example:"Can I just say—I think what Sarah just proposed is actually brilliant."},
        {expression:"if I could jump in",collocation:"If I could jump in here, + [polite interruption with a contribution]",contexts:"Interrupting politely in a professional discussion",connotation:"polite, assertive",example:"If I could jump in here, I have some data that might inform this decision."},
        {expression:"that's interesting, and",collocation:"That's interesting — + [building on someone's point while taking the floor]",contexts:"Building on someone's point while taking the conversational floor",connotation:"engaged, collaborative",example:"That's interesting—and it also connects to what we discussed about retention last week."},
        {expression:"to add to that",collocation:"To add to + [point just made], + [extending or contributing further]",contexts:"Contributing to the conversation by extending someone's point",connotation:"supportive, additive",example:"To add to that, I think the timing issue is also about seasonal demand patterns."},
        {expression:"speaking of which",collocation:"[topic keyword just mentioned]. Speaking of which, + [natural segue to take the floor]",contexts:"Using a natural segue to take the floor",connotation:"smooth, conversational",example:"Speaking of which, I actually tried that method you recommended and it worked perfectly."}
      ]
    },
    {
      name: "Holding the Floor · 保持话轮",
      phrases: [
        {expression:"before I forget",collocation:"Before I forget, + [final point added before yielding the floor]",contexts:"Keeping the floor to add a final point before yielding",connotation:"organised, mindful",example:"Before I forget, there's one more thing I wanted to mention about the schedule."},
        {expression:"let me finish",collocation:"Let me finish + [this thought], + [then I'll yield the floor]",contexts:"Assertively keeping the floor when someone tries to interrupt",connotation:"assertive, firm",example:"Let me finish this thought, and then I want to hear your take."},
        {expression:"not only that, but",collocation:"[striking point A]. Not only that, + [even more striking point B]",contexts:"Extending your point to hold the floor for another sentence",connotation:"building, emphatic",example:"The design is elegant. Not only that, it actually improved load times by thirty percent."},
        {expression:"the other thing is",collocation:"[point A made]. The other thing is + [point B added without yielding floor]",contexts:"Transitioning to a second point without yielding the floor",connotation:"structured, thorough",example:"The other thing is, we haven't factored in the cost of customer support for the new feature."},
        {expression:"hang on, I'm getting to",collocation:"Hang on, I'm getting to that — + [asking for patience before revealing the answer]",contexts:"Playfully telling someone to wait for the answer to their question",connotation:"playful, in control",example:"Hang on, I'm getting to that—let me set the context first."}
      ]
    },
    {
      name: "Yielding the Turn · 结束话轮",
      phrases: [
        {expression:"what do you think",collocation:"[your opinion stated]. What do you think? — [direct invitation to the other person]",contexts:"Directly inviting someone else into the conversation",connotation:"open, inviting",example:"I've laid out my thinking. What do you think about the timeline?"},
        {expression:"but I'd love to hear your take",collocation:"[your perspective shared]. But I'd love to hear your take — [gracefully yielding the floor]",contexts:"Gracefully yielding the floor after sharing your opinion",connotation:"respectful, curious",example:"That's my perspective, but I'd love to hear your take on it."},
        {expression:"anyway, that's my side",collocation:"Anyway, that's my side — + [signalling you've finished and it's their turn]",contexts:"Signalling you've finished and it's someone else's turn",connotation:"casual, closing",example:"Anyway, that's my side of things. What's been going on with you?"},
        {expression:"I'll stop there",collocation:"I'll stop there and + [consciously opening the floor to others]",contexts:"Consciously ending your contribution to make space for others",connotation:"self-aware, generous",example:"I've been talking for a while—I'll stop there and open it up to the group."},
        {expression:"over to you",collocation:"Over to you — + [formally handing the conversational floor to someone else]",contexts:"Formally handing the conversational floor to someone else",connotation:"polite, structured",example:"That covers the main updates from my side. Over to you for any questions."}
      ]
    }
  ]
}
];

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = discourseData;
}
