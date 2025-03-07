import { Bitcoin, Mail, Highlighter, Mic, Video, Search, CheckSquare, HelpCircle, Briefcase, TrendingUp, Edit, Music, Sparkles, FileText, Twitter } from 'lucide-react';
import { useTheme } from 'next-themes';


const svgMaker = (prompt_type, currentTheme = 'light') => {
  const theme = currentTheme;

  const custom = (
    <Sparkles className="row-span-1 w-6 h-6" color="#fde047" strokeWidth={1.5} />
  )

  const twitter_thread = (
    <Twitter className="row-span-1 w-6 h-6" color="#4ab3f4" strokeWidth={1.5} />
  )

  const audiogram = (
    <Music className="row-span-1 w-6 h-6" color="#818cf8" strokeWidth={1.5} />
  )

  const youtube_shorts = (
    <Video className="row-span-1 w-6 h-6" color="#dc2626" strokeWidth={1.5} />
  )

  const blog_post = (
    <FileText
      className="row-span-1 w-6 h-6"
      color={theme === 'light' ? '#64748b' : '#cbd5e1'}
      strokeWidth={1.5}
    />
  )

  const investment_analysis = (
    <Bitcoin className="row-span-1 w-6 h-6" color="#ef8e19" strokeWidth={1.5} />
  )
  
  const newsletter_generator = (
    <Mail
      className="row-span-1 w-6 h-6"
      color={theme === 'light' ? '#64748b' : '#cbd5e1'}
      strokeWidth={1.5}
    />
  )
  
  const highlight_generator = (
    <Highlighter className="row-span-1 w-6 h-6" color="#facc15" strokeWidth={1.5} />
  )

  const video_topic_generator = (
    <Video className="row-span-1 w-6 h-6" color="#dc2626" strokeWidth={1.5} />
  )

  const video_description = (
    <Video className="row-span-1 w-6 h-6" color="#dc2626" strokeWidth={1.5} />
  )

  const space_idea_generator = (
    <Mic className="row-span-1 w-6 h-6" color="#7366d7" strokeWidth={1.5} />
  )

  const space_description_generator = (
    <Mic className="row-span-1 w-6 h-6" color="#7366d7" strokeWidth={1.5} />
  )

  const keyword_identifier = (
    <Search
      className="row-span-1 w-6 h-6"
      color={theme === 'light' ? '#64748b' : '#cbd5e1'}
      strokeWidth={1.5}
    />
  )

  const get_actionables = (
    <CheckSquare className="row-span-1 w-6 h-6" color="#22c55e" strokeWidth={1.5} />
  )

  const generate_quizzes = (
    <HelpCircle
      className="row-span-1 w-6 h-6"
      color={theme === 'light' ? '#64748b' : '#cbd5e1'}
      strokeWidth={1.5}
    />
  )

  const executive_brief_composer = (
    <Briefcase
      className="row-span-1 w-6 h-6"
      color={theme === 'light' ? '#a16207' : '#422006'}
      strokeWidth={1.5}
    />
  )

  const investment_insight_extractor = (
    <TrendingUp className="row-span-1 w-6 h-6" color="#86efac" strokeWidth={1.5} />
  )

  switch(prompt_type) {
    case 'custom':
      return custom;
    case 'twitter_thread':
      return twitter_thread;
    case 'audiogram':
      return audiogram;
    case 'youtube_shorts':
      return youtube_shorts;
    case 'blog_post':
      return blog_post;
    case 'investment_analysis':
      return investment_analysis;
    case 'newsletter_generator':
      return newsletter_generator;
    case 'highlight_generator':
      return highlight_generator;
    case 'video_topic_generator':
      return video_topic_generator;
    case 'video_description':
      return video_description;
    case 'space_idea_generator':
      return space_idea_generator;
    case 'space_description_generator':
      return space_description_generator;
    case 'keyword_identifier':
      return keyword_identifier;
    case 'get_actionables':
      return get_actionables;
    case 'generate_quizzes':
      return generate_quizzes;
    case 'executive_brief_composer':
      return executive_brief_composer;
    case 'investment_insight_extractor':
      return investment_insight_extractor;
    default:
      return <Edit className="row-span-1 w-6 h-6" color={theme === 'light' ? '#64748b' : '#cbd5e1'} strokeWidth={1.5} />;
  }
}

// Create a wrapper component to use the hook and provide icons
export function MessageIconProvider({ prompt_type }) {
  // Safely access theme with fallback
  const themeContext = useTheme();
  const theme = themeContext?.theme || 'light';
  
  // Return the SVG directly
  return svgMaker(prompt_type || 'custom', theme);
}

// Pre-render icons for the inputMessages array to avoid hook usage issues
const renderIconForType = (type) => {
  // Use a default theme since this is executed at module level
  return svgMaker(type, 'light');
};

export const inputMessages = [
  {
    command_type: 'custom',
    title: 'Custom Creation',
    message: 'Create content from the conversation with your own prompt.',
    icon: renderIconForType('custom'),
  },
  {
    command_type: 'twitter_thread',
    title: 'X Thread',
    message: 'Write an engaging X thread from the conversation.',
    icon: renderIconForType('twitter_thread'),
  },

  {
    command_type: 'audiogram',
    title: 'Audiogram',
    message:
      'Give me 5 moments from the conversation that would go well as an audiogram.',
    icon: renderIconForType('audiogram'),
  },
  {
    command_type: 'youtube_shorts',
    title: 'YouTube Shorts',
    message:
      'Give me 5 moments from the conversation that would create engaging YouTube Shorts.',
    icon: renderIconForType('youtube_shorts'),
  },
  {
    command_type: 'blog_post',
    title: 'Blog Posts',
    message: 'Turn the conversation into an easily accessible blog post.',
    icon: renderIconForType('blog_post'),
  },
  {
    command_type: 'investment_analysis',
    title: 'Investment Analysis',
    message:
      'Spot investment opportunities with associated risks and further action items.',
    icon: renderIconForType('investment_analysis'),
  },
  {
    command_type: 'newsletter_generator',
    title: 'Newsletter Generator',
    message:
      'Turn the conversation into a newsletter ready for sending readers.',
    icon: renderIconForType('newsletter_generator'),
  },
  {
    command_type: 'highlight_generator',
    title: 'Highlights',
    message:
      'Get me the most impactful and interesting parts of the conversation.',
    icon: renderIconForType('highlight_generator'),
  },
  {
    command_type: 'video_topic_generator',
    title: 'YouTube Video Ideas',
    message:
      'Generate new YouTube video ideas from this content with themes and segments.',
    icon: renderIconForType('video_topic_generator'),
  },
  {
    command_type: 'video_description',
    title: 'YouTube Video Description',
    message: 'Write a compelling description for this YouTube video.',
    icon: renderIconForType('video_description'),
  },
  {
    command_type: 'space_idea_generator',
    title: 'X Space Idea',
    message: 'Come up with a new X Space idea based on this content.',
    icon: renderIconForType('space_idea_generator'),
  },
  {
    command_type: 'space_description_generator',
    title: 'X Space Description',
    message:
      'Create an impactful tweet describing this X Space to encourage replays.',
    icon: renderIconForType('space_description_generator'),
  },
  {
    command_type: 'keyword_identifier',
    title: 'SEO Keyword Extractor',
    message:
      'Extract the main keywords from the conversation to use in my SEO strategy.',
    icon: renderIconForType('keyword_identifier'),
  },
  {
    command_type: 'get_actionables',
    title: 'Actionables',
    message:
      'Outline clear and specific action steps from the content to implement its insights.',
    icon: renderIconForType('get_actionables'),
  },
  {
    command_type: 'generate_quizzes',
    title: 'Pop Quiz',
    message:
      'Craft a pop quiz from the content to assess understanding of key points and facts.',
    icon: renderIconForType('generate_quizzes'),
  },
  {
    command_type: 'executive_brief_composer',
    title: 'Executive Brief',
    message:
      'Write an executive brief highlighting key insights and strategic recommendations.',
    icon: renderIconForType('executive_brief_composer'),
  },
  {
    command_type: 'investment_insight_extractor',
    title: 'Financial Insights',
    message:
      'Identify and elaborate on key information for retail investors from content.',
    icon: renderIconForType('investment_insight_extractor'),
  },
]
