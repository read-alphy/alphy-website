import { useState, useCallback, useRef, useEffect } from 'react'
import { GripVertical } from 'lucide-react'

/**
 * Resizable two-column layout with drag handle
 */
export default function ResizableLayout({ 
  leftPanel, 
  rightPanel, 
  defaultLeftWidth = 60, // percentage
  minLeftWidth = 30,
  maxLeftWidth = 80,
  className = ''
}) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMouseDown = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const containerRect = container.getBoundingClientRect()
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

    // Clamp to min/max
    const clampedWidth = Math.min(Math.max(newLeftWidth, minLeftWidth), maxLeftWidth)
    setLeftWidth(clampedWidth)
  }, [isDragging, minLeftWidth, maxLeftWidth])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-resize'
    } else {
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div 
      ref={containerRef}
      className={`flex h-full ${className}`}
    >
      {/* Left Panel */}
      <div 
        className="h-full overflow-hidden"
        style={{ width: `${leftWidth}%` }}
      >
        {leftPanel}
      </div>

      {/* Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        className={`
          relative w-1 flex-shrink-0 cursor-col-resize group
          bg-zinc-200 dark:bg-zinc-700
          hover:bg-indigo-300 dark:hover:bg-indigo-600
          transition-colors duration-150
          ${isDragging ? 'bg-indigo-400 dark:bg-indigo-500' : ''}
        `}
      >
        {/* Visual indicator */}
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          p-1 rounded bg-zinc-300 dark:bg-zinc-600
          opacity-0 group-hover:opacity-100 transition-opacity
          ${isDragging ? 'opacity-100' : ''}
        `}>
          <GripVertical className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        </div>
      </div>

      {/* Right Panel */}
      <div 
        className="h-full overflow-hidden flex-1"
        style={{ width: `${100 - leftWidth}%` }}
      >
        {rightPanel}
      </div>
    </div>
  )
}

