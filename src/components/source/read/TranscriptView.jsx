import { useSource } from '../context/SourceContext'
import { useSourceUI } from '../context/UIContext'
import { getExternalSourceUrl } from '../utils/api'

export default function TranscriptView() {
  const { transcript, source } = useSource()
  const { seekToTimestamp } = useSourceUI()
  
  if (transcript.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
        <p className="quicksand font-medium">
          Transcript is being generated now...
        </p>
      </div>

    )
  }
  
  return (
    <div className="max-w-3xl space-y-4">
      {transcript.map((segment, index) => (
        <TranscriptSegment
          key={index}
          segment={segment}
          sourceType={source.source_type}
          sourceId={source.source_id}
          onTimestampClick={seekToTimestamp}
        />
      ))}
    </div>
  )
}

function TranscriptSegment({ segment, sourceType, sourceId, onTimestampClick }) {
  const { timestamp, text } = segment
  
  // For desktop YT/Twitch, use internal player
  // For mobile or other sources, link externally
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024
  const canUseInternalPlayer = isDesktop && (sourceType === 'yt' || sourceType === 'tw')
  
  const handleTimestampClick = (e) => {
    e.preventDefault()
    if (canUseInternalPlayer) {
      onTimestampClick(timestamp)
    }
  }
  
  // Parse timestamp to seconds for external link
  const getTimestampSeconds = () => {
    const parts = timestamp.split(':')
    if (parts.length === 3) {
      return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
    }
    return 0
  }
  
  const externalUrl = getExternalSourceUrl(sourceType, sourceId, getTimestampSeconds())
  
  return (
    <div className="group">
      {/* Timestamp */}
      {canUseInternalPlayer ? (
        <button
          onClick={handleTimestampClick}
          className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 
            underline hover:text-indigo-600 dark:hover:text-indigo-400 
            transition-colors"
        >
          {timestamp}
        </button>
      ) : externalUrl ? (
        <a
          href={externalUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 
            underline hover:text-indigo-600 dark:hover:text-indigo-400 
            transition-colors"
        >
          {timestamp}
        </a>
      ) : (
        <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          {timestamp}
        </span>
      )}
      
      {/* Transcript Text */}
      <p className="mt-2 mb-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {text}
      </p>
    </div>
  )
}

