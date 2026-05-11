import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Lightbulb, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSource } from '../context/SourceContext'
import { useSourceUI } from '../context/UIContext'
import { formatTimestamp, timestampToSeconds } from '../utils/formatTimestamp'

export default function SummaryView() {
  const { summary, keyTakeaways } = useSource()
  const { seekToTimestamp } = useSourceUI()
  
  // Parse summary into displayable format
  const summaryContent = useMemo(() => {
    if (!summary?.summary) return null
    
    // Use prettified version if available
    const content = summary.summary_prettified || summary.summary
    
    return content
  }, [summary])
  
  // No summary yet
  if (!summaryContent) {
    return (
      <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
        <p className="quicksand font-medium">
          Summary is being generated. Check the transcript in the meantime!
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Key Takeaways */}
      {keyTakeaways.length > 0 && (
        <KeyTakeawaysCard takeaways={keyTakeaways} />
      )}
      
      {/* Summary Content */}
      <SummaryContent content={summaryContent} onTimestampClick={seekToTimestamp} />
    </div>
  )
}

function KeyTakeawaysCard({ takeaways }) {
  const displayedTakeaways = takeaways.slice(0, 5)
  
  return (
    <Card className="border border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 shadow-none">
      <CardHeader className="pb-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40">
        <CardTitle className="flex items-center text-lg font-semibold text-indigo-800 dark:text-indigo-300">
          <Lightbulb className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" strokeWidth={2} />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <ul className="space-y-2">
          {displayedTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start">
              <Badge 
                variant="outline" 
                className="mr-2 mt-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {index + 1}
              </Badge>
              <span className="quicksand font-medium text-zinc-800 dark:text-zinc-200 text-sm">
                {takeaway}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function SummaryContent({ content, onTimestampClick }) {
  // Handle string content
  if (typeof content === 'string') {
    return (
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown className="quicksand">{content}</ReactMarkdown>
      </div>
    )
  }
  
  // Handle array of strings
  if (Array.isArray(content) && typeof content[0] === 'string') {
    return (
      <div className="space-y-2">
        {content.map((item, index) => (
          <div key={index} className="flex items-start">
            <span className="mr-2 text-zinc-400">•</span>
            <ReactMarkdown className="quicksand text-zinc-800 dark:text-zinc-200">
              {item.replace(/^[-•]\s*/, '')}
            </ReactMarkdown>
          </div>
        ))}
      </div>
    )
  }
  
  // Handle chaptered content (array of objects with title, at, summary)
  if (Array.isArray(content) || typeof content === 'object') {
    const chapters = Array.isArray(content) ? content : Object.values(content)
    
    return (
      <div className="space-y-6">
        {chapters.map((chapter, index) => (
          <ChapterSection 
            key={index} 
            chapter={chapter} 
            onTimestampClick={onTimestampClick}
          />
        ))}
      </div>
    )
  }
  
  return null
}

function ChapterSection({ chapter, onTimestampClick }) {
  const handleClick = () => {
    if (chapter.at) {
      onTimestampClick(chapter.at)
    }
  }
  
  const displayTimestamp = chapter.at ? formatTimestamp(timestampToSeconds(chapter.at)) : null
  
  return (
    <div className="py-4">
      {/* Chapter Title */}
      {chapter.title && (
        <h3
          onClick={handleClick}
          className="text-xl mb-1 quicksand font-bold text-zinc-900 dark:text-zinc-100 
            cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 
            transition-colors underline decoration-zinc-300 dark:decoration-zinc-600"
        >
          {chapter.title}
        </h3>
      )}
      
      {/* Timestamp */}
      {displayTimestamp && (
        <button
          onClick={handleClick}
          className="text-sm text-zinc-500 dark:text-zinc-400 
            hover:text-indigo-500 dark:hover:text-indigo-300 
            transition-colors mb-3 block"
        >
          {displayTimestamp}
        </button>
      )}
      
      {/* Chapter Summary */}
      <ChapterSummaryContent content={chapter.summary} />
    </div>
  )
}

function ChapterSummaryContent({ content }) {
  if (!content) return null
  
  // String content
  if (typeof content === 'string') {
    return (
      <div className="space-y-3">
        {content.split('\n').filter(Boolean).map((paragraph, index) => (
          <div key={index} className="quicksand text-zinc-700 dark:text-zinc-300">
            <ReactMarkdown>{paragraph}</ReactMarkdown>
          </div>
        ))}
      </div>
    )
  }
  
  // Array of bullet points
  if (Array.isArray(content)) {
    return (
      <ul className="space-y-2 mt-3">
        {content.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-zinc-400 mt-1">•</span>
            <span className="quicksand text-zinc-700 dark:text-zinc-300">{point}</span>
          </li>
        ))}
      </ul>
    )
  }
  
  return null
}

