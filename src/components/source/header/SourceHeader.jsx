import { useMemo } from 'react'
import { Clock, BookOpen } from 'lucide-react'
import { useSource } from '../context/SourceContext'
import { useSourceUI } from '../context/UIContext'
import { calculateReadTime } from '../utils/formatTimestamp'
import HeaderMenu from './HeaderMenu'

export default function SourceHeader() {
  const { source } = useSource()
  const { setShowMediaPlayer } = useSourceUI()
  
  // Calculate read time from summary
  const readTime = useMemo(() => {
    if (!source?.summaries?.[0]?.summary) return 0
    
    const summary = source.summaries[0].summary
    let text = ''
    
    if (Array.isArray(summary)) {
      text = summary.map(item => item.summary || item).join(' ')
    } else if (typeof summary === 'string') {
      text = summary
    }
    
    return calculateReadTime(text)
  }, [source?.summaries])
  
  // Format title - strip extension for uploads
  const displayTitle = useMemo(() => {
    if (!source?.title) return 'Untitled'
    if (source.source_type === 'up') {
      const lastDot = source.title.lastIndexOf('.')
      return lastDot > 0 ? source.title.substring(0, lastDot) : source.title
    }
    return source.title
  }, [source?.title, source?.source_type])
  
  // Creator display
  const creatorName = source?.source_type === 'up' 
    ? 'Private Content' 
    : source?.creator_name || 'Unknown'
  
  const handleThumbnailClick = () => {
    setShowMediaPlayer(true)
  }
  
  return (
    <div className="flex w-full">
      {/* YouTube Thumbnail - only for yt sources */}
      {source?.source_type === 'yt' && source?.source_id && (
        <div className="hidden lg:block mr-4 flex-shrink-0">
          <img 
            src={`https://i.ytimg.com/vi/${source.source_id}/hqdefault.jpg`} 
            alt={displayTitle}
            className="rounded-lg shadow-md max-w-[150px] cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={handleThumbnailClick}
          />
        </div>
      )}
      
      <div className="flex-1 pl-2">
        {/* Title and Menu Row */}
        <div className="flex justify-between items-start w-full">
          <h1 className="text-lg quicksand font-bold text-blueLike dark:text-zinc-300 pr-4">
            {displayTitle}
          </h1>
          
          <HeaderMenu />
        </div>
        
        {/* Creator Info */}
        <div className="mt-2">
          <p className="text-sm quicksand font-normal text-slate-600 dark:text-zinc-400">
            {creatorName}
          </p>
          
          {/* Duration and Read Time */}
          {source?.source_mins && (
            <p className="text-xs quicksand font-normal mt-1 text-slate-500 dark:text-zinc-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {parseInt(source.source_mins)} min content
              <span className="mx-1">•</span>
              <BookOpen className="h-3 w-3 mr-1" />
              {readTime} min read
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

