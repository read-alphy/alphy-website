import { useState, useCallback } from 'react'
import { WandSparkles, Sparkles, Twitter, FileText, Mail, Highlighter, Video, 
  Search, CheckSquare, HelpCircle, Briefcase, TrendingUp, Bitcoin, Mic,
  ArrowLeft, Loader2, Copy, Check, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSource } from '../context/SourceContext'
import { useAuth } from '@/hooks/useAuth'
import { useWebSocket } from '../hooks/useWebSocket'
import ReactMarkdown from 'react-markdown'

// Tool definitions
const TOOLS = [
  { id: 'custom', title: 'Custom Creation', desc: 'Create content with your own prompt', icon: Sparkles, color: 'text-yellow-400', free: true },
  { id: 'twitter_thread', title: 'X Thread', desc: 'Write an engaging X thread', icon: Twitter, color: 'text-blue-400', free: true },
  { id: 'blog_post', title: 'Blog Post', desc: 'Turn into an accessible blog post', icon: FileText, color: 'text-slate-500', free: true },
  { id: 'executive_brief', title: 'Executive Brief', desc: 'Key insights and recommendations', icon: Briefcase, color: 'text-amber-700', free: true },
  { id: 'newsletter', title: 'Newsletter', desc: 'Ready-to-send newsletter format', icon: Mail, color: 'text-slate-500', free: false },
  { id: 'highlights', title: 'Highlights', desc: 'Most impactful parts', icon: Highlighter, color: 'text-yellow-400', free: false },
  { id: 'youtube_shorts', title: 'YouTube Shorts', desc: 'Engaging short-form moments', icon: Video, color: 'text-red-500', free: false },
  { id: 'keywords', title: 'SEO Keywords', desc: 'Extract main keywords for SEO', icon: Search, color: 'text-slate-500', free: false },
  { id: 'actionables', title: 'Actionables', desc: 'Clear action steps to implement', icon: CheckSquare, color: 'text-green-500', free: false },
  { id: 'quiz', title: 'Pop Quiz', desc: 'Test understanding of key points', icon: HelpCircle, color: 'text-slate-500', free: false },
  { id: 'investment', title: 'Investment Analysis', desc: 'Spot opportunities and risks', icon: Bitcoin, color: 'text-orange-400', free: false },
  { id: 'financial', title: 'Financial Insights', desc: 'Key info for retail investors', icon: TrendingUp, color: 'text-green-400', free: false },
]

export default function PlaygroundView() {
  const { source } = useSource()
  const { currentUser } = useAuth()
  const { connect, isLoading } = useWebSocket()
  
  const [selectedTool, setSelectedTool] = useState(null)
  const [customPrompt, setCustomPrompt] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  // Get user tier (simplified - you'd get this from context in real app)
  const tier = 'premium' // TODO: Get from context

  const handleGenerate = useCallback(() => {
    if (!currentUser || !source) return

    setOutput('')

    const command = selectedTool === 'custom' 
      ? { prompt: customPrompt }
      : selectedTool

    connect(
      '/sandbox/ws',
      {
        id_token: currentUser.accessToken,
        source_type: source.source_type,
        source_id: source.source_id,
        title: source.title,
        creator: source.creator_name,
        command
      },
      (message) => {
        setOutput(message.data)
      }
    )
  }, [currentUser, source, selectedTool, customPrompt, connect])

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBack = () => {
    setSelectedTool(null)
    setOutput('')
  }

  // Not signed in
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-4">
        <WandSparkles className="h-12 w-12 text-indigo-500 mb-4" />
        <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-2">
          Create content from this conversation
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
          Sign in to use the Playground
        </p>
        <Button asChild>
          <a href="/u/login">Sign In</a>
        </Button>
      </div>
    )
  }

  // Show output
  if (output) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <Button variant="ghost" onClick={handleBack} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to tools
          </Button>
        </div>
        
        <ScrollArea className="flex-grow p-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
          <Button onClick={handleCopy} variant="outline" className="flex-1">
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Regenerate'
            )}
          </Button>
        </div>
      </div>
    )
  }

  // Show custom prompt input
  if (selectedTool === 'custom') {
    return (
      <div className="flex flex-col h-full p-4">
        <Button variant="ghost" onClick={handleBack} className="self-start mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to tools
        </Button>
        
        <div className="flex-grow">
          <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-2">
            Custom Creation
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            What would you like to create from this content?
          </p>
          
          <Textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="E.g., Write a LinkedIn post summarizing the key insights..."
            className="min-h-[150px] mb-4"
          />
        </div>
        
        <Button 
          onClick={handleGenerate} 
          disabled={!customPrompt.trim() || isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          Generate
        </Button>
      </div>
    )
  }

  // Show tool grid
  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-6 mt-4">
          <WandSparkles className="h-6 w-6 text-indigo-500" />
          <span className="text-zinc-800 dark:text-zinc-200">
            Turn conversation into content
          </span>
        </div>
        
        {/* Tool Grid */}
        <div className="grid grid-cols-2 gap-3">
          {TOOLS.map((tool) => (
            <ToolCard 
              key={tool.id}
              tool={tool}
              isSelected={selectedTool === tool.id}
              onSelect={() => setSelectedTool(tool.id)}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              isPremium={!tool.free}
              hasPremium={tier === 'premium'}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}

function ToolCard({ tool, isSelected, onSelect, onGenerate, isLoading, isPremium, hasPremium }) {
  const Icon = tool.icon
  const isLocked = isPremium && !hasPremium
  
  return (
    <div
      onClick={() => !isLocked && onSelect()}
      className={`
        relative p-3 rounded-lg border cursor-pointer transition-all
        ${isSelected 
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' 
          : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
        }
        ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}
        ${tool.id === 'custom' 
          ? 'bg-gradient-to-tr from-slate-50 via-indigo-50 to-slate-50 dark:from-zinc-900 dark:via-indigo-950/20 dark:to-zinc-900' 
          : 'bg-white dark:bg-zinc-800'
        }
      `}
    >
      {/* Premium indicator */}
      {isPremium && !hasPremium && (
        <div className="absolute top-2 right-2">
          <Lock className="h-3 w-3 text-indigo-400" />
        </div>
      )}
      
      <Icon className={`h-5 w-5 ${tool.color} mb-2`} />
      <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
        {tool.title}
      </h4>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {tool.desc}
      </p>
      
      {/* Generate button (for non-custom tools) */}
      {isSelected && tool.id !== 'custom' && (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onGenerate()
          }}
          disabled={isLoading || isLocked}
          size="sm"
          className="mt-3 w-full bg-gradient-to-r from-purple-400 to-indigo-400 text-white text-xs"
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : isLocked ? (
            'Premium'
          ) : (
            'Generate'
          )}
        </Button>
      )}
    </div>
  )
}

