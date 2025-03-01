import { Star, Bitcoin, Mail, Highlighter, Youtube, Mic, Search, CheckSquare, HelpCircle, Briefcase, TrendingUp, Edit, WaveformCircle, Sparkles, FileText, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';

// Define svgMaker as a function that takes theme as a parameter
const svgMaker = (prompt_type, currentTheme = 'light') => {
  const theme = currentTheme;

  const custom = (
    <Sparkles className="w-6 h-6" color="#fde047" strokeWidth={1.5} />
  )

  const twitter_thread = (
    <Twitter className="row-span-1" color="#4ab3f4" />
  )

  const audiogram = (
    <WaveformCircle className="row-span-1" color="#818cf8" />
  )

  const youtube_shorts = (
    <Youtube className="row-span-1" color="#dc2626" />
  )

  const blog_post = (
    <FileText
      className="row-span-1 w-6 h-6"
      color={theme === 'light' ? '#64748b' : '#cbd5e1'}
    />
  )

  const investment_analysis = (
    <Bitcoin className="row-span-1" color="#ef8e19" />
  )
  
  const newsletter_generator = (
    <Mail
      className="row-span-1"
      color={theme === 'light' ? '#64748b' : '#cbd5e1'}
    />
  )
  
  const highlight_generator = (
    <Highlighter className="row-span-1" color="#facc15" />
  )

  const video_topic_generator = (
    <Youtube className="row-span-1" color="#dc2626" />
  )

  const video_description = (
    <Youtube className="row-span-1" color="#dc2626" />
  )

  const space_idea_generator = (
    <Mic className="row-span-1" color="#7366d7" />
  )

  const space_description_generator = (
    <Mic className="row-span-1" color="#7366d7" />
  )

  const keyword_identifier = (
    <Search
      className="row-span-1"
      color={theme === 'light' ? '#64748b' : '#cbd5e1'}
    />
  )

  const get_actionables = (
    <CheckSquare className="row-span-1" color="#22c55e" />
  )

  const generate_quizzes = (
    <HelpCircle
      className="row-span-1"
      color={theme === 'light' ? '#64748b' : '#cbd5e1'}
    />
  )

  const executive_brief_composer = (
    <Briefcase
      className="row-span-1"
      color={theme === 'light' ? '#a16207' : '#422006'}
    />
  )

  const investment_insight_extractor = (
    <TrendingUp className="row-span-1" color="#86efac" />
  )

  if (prompt_type === 'custom') {
    return custom
  }
  if (prompt_type === 'twitter_thread') {
    return twitter_thread
  }
  if (prompt_type === 'audiogram') {
    return audiogram
  }
  if (prompt_type === 'youtube_shorts') {
    return youtube_shorts
  }
  if (prompt_type === 'blog_post') {
    return blog_post
  }
  if (prompt_type === 'investment_analysis') {
    return investment_analysis
  }
  if (prompt_type === 'newsletter_generator') {
    return newsletter_generator
  }
  if (prompt_type === 'highlight_generator') {
    return highlight_generator
  }
  if (prompt_type === 'video_topic_generator') {
    return video_topic_generator
  }
  if (prompt_type === 'video_description') {
    return video_description
  }
  if (prompt_type === 'space_idea_generator') {
    return space_idea_generator
  }
  if (prompt_type === 'space_description_generator') {
    return space_description_generator
  }
  if (prompt_type === 'keyword_identifier') {
    return keyword_identifier
  }
  if (prompt_type === 'get_actionables') {
    return get_actionables
  }
  if (prompt_type === 'generate_quizzes') {
    return generate_quizzes
  }
  if (prompt_type === 'executive_brief_composer') {
    return executive_brief_composer
  }
  if (prompt_type === 'investment_insight_extractor') {
    return investment_insight_extractor
  }
  
  // Add a default return to handle any unmatched prompt_type
  return <Edit className="row-span-1" color={theme === 'light' ? '#64748b' : '#cbd5e1'} />;
}

// Create a wrapper component to use the hook and provide icons
export function MessageIconProvider({ prompt_type }) {
  const { theme } = useTheme() || { theme: 'light' };
  // Ensure prompt_type is always defined
  return svgMaker(prompt_type || 'custom', theme);
}

export const inputMessages = [
  {
    command_type: 'custom',
    title: 'Custom Creation',
    message: 'Create content from the conversation with your own prompt.',
    icon: <MessageIconProvider prompt_type="custom" />,
  },
  {
    command_type: 'twitter_thread',
    title: 'Twitter Thread',
    message: 'Write an engaging Twitter thread from the conversation.',
    icon: <MessageIconProvider prompt_type="twitter_thread" />,
  },

  {
    command_type: 'audiogram',
    title: 'Audiogram',
    message:
      'Give me 5 moments from the conversation that would go well as an audiogram.',
    icon: <MessageIconProvider prompt_type="audiogram" />,
  },
  {
    command_type: 'youtube_shorts',
    title: 'YouTube Shorts',
    message:
      'Give me 5 moments from the conversation that would create engaging YouTube Shorts.',
    icon: <MessageIconProvider prompt_type="youtube_shorts" />,
  },
  {
    command_type: 'blog_post',
    title: 'Blog Posts',
    message: 'Turn the conversation into an easily accessible blog post.',
    icon: <MessageIconProvider prompt_type="blog_post" />,
  },
  {
    command_type: 'investment_analysis',
    title: 'Investment Analysis',
    message:
      'Spot investment opportunities with associated risks and further action items.',
    icon: <MessageIconProvider prompt_type="investment_analysis" />,
  },
  {
    command_type: 'newsletter_generator',
    title: 'Newsletter Generator',
    message:
      'Turn the conversation into a newsletter ready for sending readers.',
    icon: <MessageIconProvider prompt_type="newsletter_generator" />,
  },
  {
    command_type: 'highlight_generator',
    title: 'Highlights',
    message:
      'Get me the most impactful and interesting parts of the conversation.',
    icon: <MessageIconProvider prompt_type="highlight_generator" />,
  },
  {
    command_type: 'video_topic_generator',
    title: 'YouTube Video Ideas',
    message:
      'Generate new YouTube video ideas from this content with themes and segments.',
    icon: <MessageIconProvider prompt_type="video_topic_generator" />,
  },
  {
    command_type: 'video_description',
    title: 'YouTube Video Description',
    message: 'Write a compelling description for this YouTube video.',
    icon: <MessageIconProvider prompt_type="video_description" />,
  },
  {
    command_type: 'space_idea_generator',
    title: 'X Space Idea',
    message: 'Come up with a new X Space idea based on this content.',
    icon: <MessageIconProvider prompt_type="space_idea_generator" />,
  },
  {
    command_type: 'space_description_generator',
    title: 'X Space Description',
    message:
      'Create an impactful tweet describing this X Space to encourage replays.',
    icon: <MessageIconProvider prompt_type="space_description_generator" />,
  },
  {
    command_type: 'keyword_identifier',
    title: 'SEO Keyword Extractor',
    message:
      'Extract the main keywords from the conversation to use in my SEO strategy.',
    icon: <MessageIconProvider prompt_type="keyword_identifier" />,
  },
  {
    command_type: 'get_actionables',
    title: 'Actionables',
    message:
      'Outline clear and specific action steps from the content to implement its insights.',
    icon: <MessageIconProvider prompt_type="get_actionables" />,
  },
  {
    command_type: 'generate_quizzes',
    title: 'Pop Quiz',
    message:
      'Craft a pop quiz from the content to assess understanding of key points and facts.',
    icon: <MessageIconProvider prompt_type="generate_quizzes" />,
  },
  {
    command_type: 'executive_brief_composer',
    title: 'Executive Brief',
    message:
      'Write an executive brief highlighting key insights and strategic recommendations.',
    icon: <MessageIconProvider prompt_type="executive_brief_composer" />,
  },
  {
    command_type: 'investment_insight_extractor',
    title: 'Financial Insights',
    message:
      'Identify and elaborate on key information for retail investors from content.',
    icon: <MessageIconProvider prompt_type="investment_insight_extractor" />,
  },
]
