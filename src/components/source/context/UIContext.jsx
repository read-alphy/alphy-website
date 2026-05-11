import { createContext, useContext, useState, useCallback } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  // Tab state
  const [activeReadTab, setActiveReadTab] = useState('summary')
  const [activeInteractiveTab, setActiveInteractiveTab] = useState('playground')
  
  // Mobile panel switching (read vs interactive)
  const [activeMobilePanel, setActiveMobilePanel] = useState('read')
  
  // Media player
  const [showMediaPlayer, setShowMediaPlayer] = useState(false)
  const [timestamp, setTimestamp] = useState(0)
  const [autoplay, setAutoplay] = useState(0)
  
  // Interactive panel collapse (desktop)
  const [isInteractivePanelCollapsed, setIsInteractivePanelCollapsed] = useState(false)

  // Seek to timestamp and show media player
  const seekTo = useCallback((seconds) => {
    setTimestamp(Math.floor(seconds))
    setAutoplay(1)
    setShowMediaPlayer(true)
  }, [])

  // Parse timestamp string (HH:MM:SS) to seconds
  const seekToTimestamp = useCallback((timestampStr) => {
    if (typeof timestampStr === 'string') {
      // Handle ISO 8601 duration format (PT0.08S)
      if (timestampStr.startsWith('PT')) {
        const match = timestampStr.match(/PT(\d+(?:\.\d+)?)S/)
        if (match) {
          seekTo(parseFloat(match[1]))
          return
        }
      }
      
      // Handle HH:MM:SS format
      const parts = timestampStr.split(':')
      if (parts.length === 3) {
        const seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
        seekTo(seconds)
        return
      }
    }
    
    // Handle number directly
    if (typeof timestampStr === 'number') {
      seekTo(timestampStr)
    }
  }, [seekTo])

  const toggleInteractivePanel = useCallback(() => {
    setIsInteractivePanelCollapsed(prev => !prev)
  }, [])

  const value = {
    // Read panel tabs
    activeReadTab,
    setActiveReadTab,
    
    // Interactive panel tabs
    activeInteractiveTab,
    setActiveInteractiveTab,
    
    // Mobile panel
    activeMobilePanel,
    setActiveMobilePanel,
    
    // Media player
    showMediaPlayer,
    setShowMediaPlayer,
    timestamp,
    autoplay,
    seekTo,
    seekToTimestamp,
    
    // Interactive panel collapse
    isInteractivePanelCollapsed,
    toggleInteractivePanel,
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}

export function useSourceUI() {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useSourceUI must be used within a UIProvider')
  }
  return context
}

