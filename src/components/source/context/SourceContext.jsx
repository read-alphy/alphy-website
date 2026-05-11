import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'
import { API_URL } from '@/constants'
import { parseTranscript } from '../utils/parseTranscript'

const SourceContext = createContext(null)

export function SourceProvider({ children, sourceType, sourceId }) {
  const { currentUser } = useAuth()
  const router = useRouter()
  
  // Core state
  const [source, setSource] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [language, setLanguage] = useState('en')

  // Fetch source data
  const fetchSource = useCallback(async () => {
    if (!sourceId || !sourceType) return
    
    try {
      const headers = { 'Content-Type': 'application/json' }
      
      // Uploads require authentication
      if (sourceType === 'up' && currentUser) {
        headers['id-token'] = currentUser.accessToken
      }
      
      const res = await fetch(`${API_URL}/sources/${sourceType}/${sourceId}`, { headers })
      
      if (!res.ok) {
        if (res.status === 404) {
          router.push('/404')
          return
        }
        throw new Error(`HTTP ${res.status}`)
      }
      
      const data = await res.json()
      setSource(data)
      setError(null)
      
      // Set initial language from source if available
      if (data.lang && data.summaries?.some(s => s.lang === data.lang && s.complete)) {
        setLanguage(data.lang)
      }
    } catch (err) {
      console.error('Failed to fetch source:', err)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }, [sourceId, sourceType, currentUser, router])

  // Initial fetch
  useEffect(() => {
    fetchSource()
  }, [fetchSource])

  // Polling for incomplete summaries
  useEffect(() => {
    if (!source) return
    
    const currentSummary = source.summaries?.find(s => s.lang === language)
    const shouldPoll = currentSummary && !currentSummary.complete
    
    if (!shouldPoll) return
    
    const interval = setInterval(fetchSource, 5000)
    return () => clearInterval(interval)
  }, [source, language, fetchSource])

  // Check bookmark status
  useEffect(() => {
    if (!currentUser || !sourceId || sourceType === 'up') return
    
    const checkBookmark = async () => {
      try {
        const res = await fetch(`${API_URL}/sources/${sourceType}/${sourceId}/bookmark`, {
          headers: { 'id-token': currentUser.accessToken }
        })
        if (res.ok) {
          const data = await res.json()
          setIsBookmarked(data.is_bookmark)
        }
      } catch (err) {
        console.error('Failed to check bookmark:', err)
      }
    }
    
    checkBookmark()
  }, [currentUser, sourceId, sourceType])

  // Derived: parsed transcript
  const transcript = useMemo(() => {
    if (!source?.transcript) return []
    return parseTranscript(source.transcript)
  }, [source?.transcript])

  // Derived: current summary based on language
  const summary = useMemo(() => {
    if (!source?.summaries) return null
    return source.summaries.find(s => s.lang === language) || source.summaries[0] || null
  }, [source?.summaries, language])

  // Derived: key takeaways
  const keyTakeaways = useMemo(() => {
    return summary?.key_takeaways || []
  }, [summary])

  // Derived: available languages
  const availableLanguages = useMemo(() => {
    if (!source?.summaries) return ['en']
    return source.summaries.filter(s => s.complete).map(s => s.lang)
  }, [source?.summaries])

  // Actions
  const toggleBookmark = useCallback(async () => {
    if (!currentUser) return
    
    try {
      await fetch(`${API_URL}/sources/${sourceType}/${sourceId}/bookmark?bookmark=${!isBookmarked}`, {
        method: 'PATCH',
        headers: { 'id-token': currentUser.accessToken }
      })
      setIsBookmarked(!isBookmarked)
    } catch (err) {
      console.error('Failed to toggle bookmark:', err)
    }
  }, [currentUser, sourceType, sourceId, isBookmarked])

  const toggleVisibility = useCallback(async () => {
    if (!currentUser || !source) return
    
    const newVisibility = !source.is_visible
    try {
      await fetch(`${API_URL}/sources/${sourceType}/${sourceId}/visibility?visibility=${newVisibility}`, {
        method: 'PATCH',
        headers: { 'id-token': currentUser.accessToken }
      })
      setSource(prev => ({ ...prev, is_visible: newVisibility }))
    } catch (err) {
      console.error('Failed to toggle visibility:', err)
    }
  }, [currentUser, sourceType, sourceId, source])

  const requestTranslation = useCallback(async (lang) => {
    return
  }, [])

  const value = {
    // Data
    source,
    isLoading,
    error,
    
    // Derived
    transcript,
    summary,
    keyTakeaways,
    availableLanguages,
    
    // Bookmark
    isBookmarked,
    toggleBookmark,
    
    // Visibility (uploads only)
    toggleVisibility,
    
    // Language
    language,
    setLanguage,
    requestTranslation,
    
    // Refetch
    refetch: fetchSource,
  }

  return (
    <SourceContext.Provider value={value}>
      {children}
    </SourceContext.Provider>
  )
}

export function useSource() {
  const context = useContext(SourceContext)
  if (!context) {
    throw new Error('useSource must be used within a SourceProvider')
  }
  return context
}
