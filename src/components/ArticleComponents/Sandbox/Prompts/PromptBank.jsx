


/* export const SettingsPrompt= `

The following will define how you'll process the request.
On a scale of 1-10, your verbosity level should be set to

` */


//key takeaways expander
//twitter thread generator from summary
//newsletter generator from summary
//blog post generator from summary
//quote getter from transcript


//highlight idea generator from summary (which points of discussions can I highlight?)
//Video topic / Twitter Space generator inspired from summary --> includes conversation topics + potential guest persona + 3 interview questions
//Twitter Space description from summary
//Keyword identifier (to do what? this looks like a middle step)
//create a catchy Twitter Space intro for me
//analyze the video like a financial analyst
//create actionables from the video 
//create quizes from the video
//create synopses
//report - executive brief


//investment analysis
//community update analysis
//crypto technical explainer


////internal stuff
//summary manager
//keytakeaways manager
//transcript manager

export const characterExplainer = `
Tone: The overall character and mood of your responses, which sets the emotional atmosphere for communication.

Approach: The method and perspective you employ to convey your message and articulate your points.

Structure: The organization and composition of your sentences and paragraphs, which dictate the flow and clarity of your responses.
`

export const CharacterPrompts = [
            {name:"Casual",
            prompt: `
            

            You are a Casual voice. Answer in a way that feels like chatting with a friend.
            Tone: Be conversational, using everyday language.
            Approach: Include humor and colloquial expressions when fitting.
            Structure: Keep sentences simple and brief, with a relaxed use of grammar.
            
            `},

            {name:"Formal",
            prompt: `
        
            \n\n
            You are a Formal communicator. You'll answer content according to your Focus Area, Content, and Engagement.
            Focus Areas: Professionalism and clarity.
            Content: Utilizes official terminology and provides balanced viewpoints.
            Engagement: Invites respectful and formal user interactions.
            `},

            {name:"Academic",
            prompt: `
            
            \n\n
            You are an Academic expert. Your responses should reflect a scholarly environment.
            Tone: Maintain a formal and instructive tone, prioritizing precision and clarity.
            Approach: Use technical terms and detailed explanations where necessary.
            Structure: Formulate responses with structured arguments and clear evidence.
            
            `},

            {name:"Marketing",
            prompt: `
            
            \n\n
            You are a Marketing professional. Your answers should persuade and motivate.
            Tone: Be engaging and enthusiastic, aiming to captivate the user’s interest.
            Approach: Highlight benefits and use a narrative to contextualize products or services.
            Structure: Craft messages that are impactful and prompt a clear action from the user.
            
            `},

            {name:"Scientific",
            prompt:`
            
            \n\n
            You are a Scientific authority. Provide information that is empirical and well-substantiated.
            Tone: Remain objective, focusing on data and research findings.
            Approach: Use specific terminology and reference studies or statistics.
            Structure: Present information logically, leading the user through your reasoning process.            
            `},

            {name:"Literary",
            prompt:`
            \n\n You are a Literary voice. Craft your responses as though they are part of a narrative.
            Tone: Be expressive and imaginative, using language to evoke imagery and emotion.
            Approach: Employ literary devices such as metaphors and analogies.
            Structure: Compose your responses with a rhythm and flow that enhances the content.            
            `},

]


export const twitterThreadWriter =`
        Create a Twitter thread from the provided text. The thread should be concise, direct, and devoid of unnecessary elements, presenting the core message effectively in a series of tweets.

        Guidelines:
        - Break down the text into tweet-sized chunks, each conveying a distinct point or idea.
        - Each tweet should be no more than 280 characters.
        - The thread should start with an engaging tweet that summarizes the main idea.
        - Subsequent tweets should unfold the text logically and coherently.
        - Conclude with a final tweet that wraps up the discussion or provides a call-to-action.
        - Use clear and impactful language suitable for social media engagement.
`






export const quoteGetter= `

        Talking Points: {{ TALKING POINTS }}
        Extract quotes from the provided transcript that are relevant to the specified talking points. The quotes should capture key insights or statements related to these points.

        Guidelines:
        - Identify and extract quotes that directly address or relate to the talking points.
        - Quotes should be verbatim and maintain the speaker's original intent and tone.
        - Provide context for each quote if necessary, especially if the quote's relevance is not immediately clear.
        - Limit the length of each quote to ensure it remains impactful and concise.
        - Ensure the quotes are well-distributed across the talking points, offering a balanced view of the discussion.
`


export const keyTakeawaysExpander =  `
        Expand upon these key takeaways by providing additional related information. The expansion should delve deeper into the subject matter, offering insights, context, and elaboration that were not initially present in the provided takeaways.
        
        Guidelines:
        - Each key takeaway should be expanded separately.
        - Provide relevant and novel information that enhances the understanding of the takeaway.
        - The expansion for each takeaway should be approximately 100 words.
        - Ensure the additional information is directly related to the original takeaway, maintaining focus and relevance.
        - Avoid repeating information already present in the key takeaways.
        - The expanded content should be insightful and provide value to someone deeply familiar with the topic.
        `




export const blogPostGenerator= `

Create a blog post based on this text. The blog post should be concise, direct, and clearly communicate the key points, aimed at readers who seek a deeper understanding of the topic.

Guidelines:
- Organize the content into a structured format with a clear introduction, body, and conclusion.
- Expand on each point in the text with additional context, examples, or analysis.
- Use headings and subheadings to break up the text and guide the reader.
- Include a concluding section that summarizes the main points and provides personal insights or recommendations.
- Ensure the language is engaging and suitable for a blog audience, maintaining a balance between professionalism and approachability.
`

export const newsletterWriter = `
Generate an email newsletter from this text. The newsletter should be concise, direct, and effectively communicate the essence of the text, targeting an audience familiar with the subject.

Guidelines:y
- Open with a compelling subject line that captures the essence of the text.
- Begin the newsletter with a brief introduction that sets the context.
- Break down the text into short, digestible paragraphs.
- Each paragraph should focus on a single aspect or idea from the text.
- Include a conclusion or call-to-action that encourages engagement or further exploration.
- The language should be professional yet accessible, suitable for an email format.
`

export const highlightIdeasGenerator = `
Generate highlight ideas from this text. Identify key points of discussion that would be most impactful or interesting to emphasize.

Guidelines:
- Analyze the text and identify 3-5 key points or ideas that stand out.
- For each identified highlight, provide a brief rationale explaining why it is impactful or significant.
- The highlights should cover a range of ideas or themes present in the text.
- Ensure each highlight is concise (1-2 sentences) and captures the essence of the point.
- Consider the interests and needs of the target audience when selecting highlights.

`

export const videoTopicGenerator = `

Give me a YouTube video idea inspired by this text. Include a central theme, potential conversation topics, and a unique angle or approach to engage viewers.

Guidelines:             
- Identify a central theme or topic for the video that aligns with the text, ensuring it's engaging and suitable for a solo presentation or a deep dive.
- List 3-4 conversation topics or segments that would be explored in the video. These can range from detailed analysis, practical demonstrations, to real-world applications.
- Suggest a creative angle or approach to make the video engaging. This could include visual aids, interactive elements, on-screen graphics, or personal anecdotes to connect with the audience.
- Propose three compelling content segments or questions that you, as the presenter, will address. These should be designed to intrigue viewers, encourage comments, and increase engagement.
`
export const videoDescriptionGenerator = `

Generate a video description based on this transcript. Include a captivating title, a brief overview, key highlights, and reasons to watch.

Guidelines:
- Craft a title for the video that is both engaging and reflective of the content derived from the transcript. The title should capture the essence of the video and intrigue potential viewers.
- Provide a concise overview of the video content, summarizing the central theme and main points discussed in the transcript. This should give viewers a clear idea of what to expect from the video.
- Identify 3-4 key highlights or takeaways from the transcript that will be emphasized in the video. These could include insightful observations, groundbreaking ideas, or practical advice that viewers will find valuable.
- Suggest a unique selling point or a creative angle that sets this video apart from others in the same genre. This could involve an innovative presentation style, exclusive insights from experts, or interactive elements to engage the audience.
- Conclude with compelling reasons for the audience to watch the video. Highlight what they will gain, such as knowledge, inspiration, or entertainment, and encourage them to engage with the content through comments, likes, and shares.

`

export const spaceTopicGenerator = `

Create a concept for a Twitter Space inspired by this text. Include a central theme, conversation topics, a guest persona, and three interview questions.
- Develop a central theme or topic for the Twitter Space that aligns with the text, ideal for a live, interactive forum discussion.
- List 3-4 conversation topics that would be explored in the Twitter Space. These should be designed to facilitate dialogue, audience questions, and guest interactions.
- Describe a potential guest persona, including relevant expertise or background aligned with the theme. Consider multiple guests to enrich the discussion from various perspectives.
- Formulate three engaging interview questions tailored to the guest persona(s) and conversation topics. These questions should be open-ended to encourage discussion and audience participation.

`

export const twitterSpaceDescriptionGenerator = `

Write an impactful tweet describing this Twitter Space. The description should succinctly convey the main themes and encourage replays.

Guidelines:
- The tweet should be under 280 characters.
- Include why this Twitter Space is relevant or valuable to potential participants.
- Use engaging and inviting language to encourage participation.

`

export const keywordIdentifier = `
Identify and extract key SEO keywords from this text. The keywords should be relevant to the main themes and topics discussed.

Guidelines:
- Analyze the text to identify words or phrases that are central to the topic and are likely to be used in searches.
- List 5-10 keywords or phrases, ensuring they are relevant and specific to the text's content.
- Include a mix of both short-tail and long-tail keywords.
- Avoid overly general or broad keywords that are not specifically tied to the text's subject matter.
- Ensure the keywords are naturally occurring within the context of the text."
`



export const actionablesGenerator = `

Extract and formulate actionable items based on the content of the video. These should be clear, feasible steps or recommendations derived from the video's key points.

Guidelines:
- List 3-5 actionable items inspired by the video's content.
- Each item should be a specific, clear, and implementable step or recommendation.
- Ensure the actions are directly related to the core themes or advice given in the video.
- Provide a brief explanation or rationale for each actionable item, linking it back to the video content.
- The actionable items should be useful for the intended audience, offering tangible ways to apply the video's insights."
`


export const quizGenerator = `

Design a quiz based on the content of the video. The quiz should test knowledge and understanding of key points, facts, and concepts presented in the video.

Guidelines:
- Develop 5-10 quiz questions that cover the main topics of the video.
- Questions should vary in format (e.g., multiple choice, true/false, short answer).
- Ensure each question is clear and directly related to the video content.
- Provide correct answers and brief explanations for each question.
- The quiz should be engaging and educational, suitable for the video's target audience."
`


/* export const synopsesGenerator = `
Write a synopsis for the provided video or Twitter Space based on its transcript. The synopsis should succinctly capture the main themes, discussions, and conclusions.

Guidelines:
- Summarize the key points and themes discussed in the video/Twitter Space.
- Include any significant conclusions or findings presented.
- Keep the synopsis concise, ideally within 200-300 words.
- Ensure the synopsis provides a clear and accurate overview of the video/Twitter Space content.
- Use engaging language to make the synopsis appealing to potential viewers or participants."


` */

export const executiveBriefGenerator = `

Prepare an executive brief based on the provided content. The brief should offer a high-level overview, key insights, and major takeaways for executives or decision-makers.

Guidelines:
- Present a concise summary of the main points and findings.
- Highlight critical insights or data that are relevant for decision-making.
- Identify any strategic recommendations or conclusions drawn from the content.
- Keep the brief professional and to-the-point, ideally within 1-2 pages.
- Use clear, precise language suitable for an executive audience."


`
















export const investmentAnalysis = `
SPOTTING INVESTMENT OPPORTUNITIES


You will spot the potential investment opportunities from the above text.

Follow the following steps.

Identify potential investment opportunities.

Give reasoning behind the opportunity.

Talk about the further implications of the mentioned opportunities to other projects, markets, and neighbor sectors.

Give a loose risk assessment for each investment opportunity that is specific to the opportunity.

Give an actionable DYOR section where you give step-by-step guidance for retail investors to do further research about the opportunity.

Each investment opportunity should have the following items: "Opportunity", "Reasoning", "Further implications","Risk assessment", "DYOR"

` 



export const communityUpdateInfoSpotter = `


You will spot the potentially valuable information that are present in the above text.

Follow the following steps.

Identify the valuable information for potential retail investors.

A valuable information can be about project updates, market news, info about roadmap; financial metrics like tokenomics, supply, and burning; market position like partnerships, collaborations, and competitive edge; regulatory compliance, and community engagement.

Elaborate on the details of the update. Your elaboration should be ~100 words maximum.

Give the reasoning why that can be a valuable information. Your reasoning should be ~50 words maximum.

Make space with fusion, compression, and removal of uninformative phrases like "the article discusses".

Each valuable information should have the following items:  "Information", "Elaboration", "Reasoning"
`


export const cryptoTechnicalExplainer = `
You will explain the technicalities present in the above text at an expert level. Adhere to the following steps.

Identify key technical topics or subjects about crypto, finance, blockchain, and computer sciences within the transcript without summarizing them.

Provide expert-level explanation on each identified technical topic or subject.

Discuss the implications of these technical topics or subjects on related projects, technologies, or sectors, and investor decisions.

Assess potential limitations or constraints specific to the technical topics or subjects discussed.

Each valuable information should have the following items:  "Technical Subject", "Explanation", "Further Implications","Risk Assessment".

`

