import TwitterIcon from '@mui/icons-material/Twitter'
import StarRateIcon from '@mui/icons-material/StarRate'
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin'
import EmailIcon from '@mui/icons-material/Email'
import HighlightIcon from '@mui/icons-material/Highlight'
import YouTubeIcon from '@mui/icons-material/YouTube'
import MicIcon from '@mui/icons-material/Mic'
import GoogleIcon from '@mui/icons-material/Google'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import QuizIcon from '@mui/icons-material/Quiz'
import WorkIcon from '@mui/icons-material/Work'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'

export const inputMessages = [
  {
    command_type: 'custom',
    title: 'Custom Creation',
    message: 'Create content from the conversation with your own prompt.',
    icon: svgMaker('custom'),
  },
  {
    command_type: 'twitter_thread',
    title: 'Twitter Thread',
    message: 'Write an engaging Twitter thread from the conversation.',
    icon: svgMaker('twitter_thread'),
  },

  {
    command_type: 'audiogram',
    title: 'Audiogram',
    message:
      'Give me 5 moments from the conversation that would go well as an audiogram.',
    icon: svgMaker('audiogram'),
  },
  {
    command_type: 'youtube_shorts',
    title: 'YouTube Shorts',
    message:
      'Give me 5 moments from the conversation that would create engaging YouTube Shorts.',
    icon: svgMaker('youtube_shorts'),
  },
  {
    command_type: 'blog_post',
    title: 'Blog Posts',
    message: 'Turn the conversation into an easily accessible blog post.',
    icon: svgMaker('blog_post'),
  },
  {
    command_type: 'investment_analysis',
    title: 'Investment Analysis',
    message:
      'Spot investment opportunities with associated risks and further action items.',
    icon: svgMaker('investment_analysis'),
  },
  {
    command_type: 'newsletter_generator',
    title: 'Newsletter Generator',
    message:
      'Turn the conversation into a newsletter ready for sending readers.',
    icon: svgMaker('newsletter_generator'),
  },
  {
    command_type: 'highlight_generator',
    title: 'Highlights',
    message:
      'Get me the most impactful and interesting parts of the conversation.',
    icon: svgMaker('highlight_generator'),
  },
  {
    command_type: 'video_topic_generator',
    title: 'YouTube Video Ideas',
    message:
      'Generate new YouTube video ideas from this content with themes and segments.',
    icon: svgMaker('video_topic_generator'),
  },
  {
    command_type: 'video_description',
    title: 'YouTube Video Description',
    message: 'Write a compelling description for this YouTube video.',
    icon: svgMaker('video_description'),
  },
  {
    command_type: 'space_idea_generator',
    title: 'X Space Idea',
    message: 'Come up with a new X Space idea based on this content.',
    icon: svgMaker('space_idea_generator'),
  },
  {
    command_type: 'space_description_generator',
    title: 'X Space Description',
    message:
      'Create an impactful tweet describing this X Space to encourage replays.',
    icon: svgMaker('space_description_generator'),
  },
  {
    command_type: 'keyword_identifier',
    title: 'SEO Keyword Extractor',
    message:
      'Extract the main keywords from the conversation to use in my SEO strategy.',
    icon: svgMaker('keyword_identifier'),
  },
  {
    command_type: 'get_actionables',
    title: 'Actionables',
    message:
      'Outline clear and specific action steps from the content to implement its insights.',
    icon: svgMaker('get_actionables'),
  },
  {
    command_type: 'generate_quizzes',
    title: 'Pop Quiz',
    message:
      'Craft a pop quiz from the content to assess understanding of key points and facts.',
    icon: svgMaker('generate_quizzes'),
  },
  {
    command_type: 'executive_brief_composer',
    title: 'Executive Brief',
    message:
      'Write an executive brief highlighting key insights and strategic recommendations.',
    icon: svgMaker('executive_brief_composer'),
  },
  {
    command_type: 'investment_insight_extractor',
    title: 'Financial Insights',
    message:
      'Identify and elaborate on key information for retail investors from content.',
    icon: svgMaker('investment_insight_extractor'),
  },
]

function svgMaker(prompt_type) {
let theme = 'light'

  const custom = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#fde047"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={'#1e293b'}
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  )

  const twitter_thread = (
    <TwitterIcon
      className="row-span-1"
      sx={{
        color: '#4ab3f4',
      }}
    />
  )

  const audiogram = (
    <GraphicEqIcon className="row-span-1" sx={{ color: '#818cf8' }} />
  )

  const youtube_shorts = (
    <YouTubeIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: '#dc2626' }}
    />
  )

  const blog_post = (
    <svg
      className="row-span-1 w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={`${theme === 'light' ? '#64748b' : '#cbd5e1'}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  )

  const investment_analysis = (
    <CurrencyBitcoinIcon className="row-span-1" sx={{ color: '#ef8e19' }} />
  )
  const newsletter_generator = (
    <EmailIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: `${theme === 'light' ? '#64748b' : '#cbd5e1'}` }}
    />
  )
  const highlight_generator = (
    <HighlightIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: '#facc15' }}
    />
  )

  const video_topic_generator = (
    <YouTubeIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: '#dc2626' }}
    />
  )

  const video_description = (
    <YouTubeIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: '#dc2626' }}
    />
  )

  const space_idea_generator = (
    <MicIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: '#7366d7' }}
    />
  )

  const space_description_generator = (
    <MicIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: '#7366d7' }}
    />
  )

  const keyword_identifier = (
    <GoogleIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: `${theme === 'light' ? '#64748b' : '#cbd5e1'}` }}
    />
  )

  const get_actionables = (
    <ChecklistRtlIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: `${theme === 'light' ? '#22c55e' : '#22c55e'}` }}
    />
  )

  const generate_quizzes = (
    <QuizIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: `${theme === 'light' ? '#64748b' : '#cbd5e1'}` }}
    />
  )

  const executive_brief_composer = (
    <WorkIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: `${theme === 'light' ? '#a16207' : '#422006'}` }}
    />
  )

  const investment_insight_extractor = (
    <ShowChartIcon
      className="row-span-1"
      fontSize="medium"
      sx={{ color: `${theme === 'light' ? '#86efac' : '#86efac'}` }}
    />
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
}
