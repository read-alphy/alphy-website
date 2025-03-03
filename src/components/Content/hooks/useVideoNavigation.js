// hooks/useVideoNavigation.js
import { useState } from 'react'
export const useVideoNavigation = () => {
  const [autoplay, setAutoplay] = useState(0)
  const [timestamp, setTimestamp] = useState()
  const [showYouTubeFrame, setShowYouTubeFrame] = useState(false)

  const handleClickTimestamp = event => {
    console.log(event)
    setAutoplay(1)
    
    // Handle ISO 8601 duration format (e.g., PT0.08S)
    if (typeof event === 'string' && event.startsWith('PT')) {
      const secondsMatch = event.match(/PT(\d+(?:\.\d+)?)S/)
      if (secondsMatch) {
        const seconds = parseFloat(secondsMatch[1])
        setTimestamp(Math.floor(seconds))
      }
    } 
    // Handle DOM event with target
    else if (event.target) {
      const formattedTimestamp = event.target.textContent
      const [hours, minutes, seconds] = formattedTimestamp.split(':')
      setTimestamp(hours * 3600 + minutes * 60 + seconds * 1)
    } 
    // Handle numeric timestamp directly
    else {
      setTimestamp(Math.floor(event))
    }
    
    setShowYouTubeFrame(true)
  }

  const timestampChanger = event => {
    setAutoplay(1)
    setShowYouTubeFrame(true)
    
    // Handle if event is a string in ISO format
    if (typeof event === 'string' && event.startsWith('PT')) {
      const secondsMatch = event.match(/PT(\d+(?:\.\d+)?)S/)
      if (secondsMatch) {
        const seconds = parseFloat(secondsMatch[1])
        setTimestamp(Math.floor(seconds))
        return
      }
    }
    
    // Handle DOM event
    if (event.target) {
      const formattedTimestamp = event.target.textContent
      const [hours, minutes, seconds] = formattedTimestamp.split(':')
      setTimestamp(hours * 3600 + minutes * 60 + seconds.substring(0, 2) * 1)
    }
  }

  return {
    autoplay,
    setAutoplay,
    timestamp,
    setTimestamp,
    showYouTubeFrame,
    setShowYouTubeFrame,
    handleClickTimestamp,
    timestampChanger
  }
}