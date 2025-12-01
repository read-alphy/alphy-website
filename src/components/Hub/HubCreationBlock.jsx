import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

// Components
import { Button } from '@/components/ui/button'
import { Link as LinkIcon, Upload, BookOpen, Sparkles } from 'lucide-react'

import UploadBlock from '../Creation/UploadBlock'
import SubmitBlock from '../Creation/SubmitBlock'
import ArcBlock from '../Creation/ArcBlock'
import { API_URL } from '../../constants'


// Constants
const SUPPORTED_URLS = [
  { prefix: 'https://www.youtube.com/watch', source: 'yt', idExtractor: (url) => url.split('/').pop().split('?v=')[1]?.split('&')[0] },
  { prefix: 'https://www.youtube.com/live', source: 'yt', idExtractor: (url) => url.split('/').pop().split('?')[0] },
  { prefix: 'https://youtu.be', source: 'yt', idExtractor: (url) => url.split('/').pop().split('?')[0] },
  { prefix: 'https://m.youtube.com', source: 'yt', idExtractor: (url) => url.split('/').pop().split('?v=')[1]?.split('&')[0] },
  { prefix: 'https://twitter.com/i/status', source: 'sp', idExtractor: (url) => url.split('/').pop().split('?')[0], requiresPremium: true },
  { prefix: 'https://x.com/i/status', source: 'sp', idExtractor: (url) => url.split('/').pop().split('?')[0], requiresPremium: true },
  { 
    prefix: 'https://podcasts.apple.com', 
    source: 'ap', 
    requiresPremium: true,
    idExtractor: (url) => {
      const idMatch = url.match(/id(\d+)/)
      const iMatch = url.match(/i=(\d+)/)
      const podcastId = idMatch ? idMatch[1] : ''
      const episodeId = iMatch ? iMatch[1] : ''
      return `${podcastId}-${episodeId}`
    }
  },
  { 
    prefix: 'https://www.twitch.tv', 
    source: 'tw', 
    requiresPremium: true,
    idExtractor: (url) => {
      const match = url.match(/twitch\.tv\/videos\/(\d+)/)
      return match ? match[1] : null
    }
  },
  { 
    prefix: 'https://www.twitch.com', 
    source: 'tw', 
    requiresPremium: true,
    idExtractor: (url) => {
      const match = url.match(/twitch\.com\/videos\/(\d+)/)
      return match ? match[1] : null
    }
  },
  { 
    prefix: 'https://twitter.com', 
    source: 'x', 
    requiresPremium: true,
    excludeIfIncludes: 'i/status',
    idExtractor: (url) => {
      const baseUrl = url.split('/video/')[0]
      const match = baseUrl.match(/status\/(\d+)/)
      return match ? match[1] : ''
    }
  },
  { 
    prefix: 'https://x.com', 
    source: 'x', 
    requiresPremium: true,
    excludeIfIncludes: 'i/status',
    idExtractor: (url) => {
      const baseUrl = url.split('/video/')[0]
      const match = baseUrl.match(/status\/(\d+)/)
      return match ? match[1] : ''
    }
  }
]

export default function HubCreationBlock({
  currentUser,
  tier,
  credit,
  dataGlobalArcs,
  setDataGlobalArcs,
}) {
  // Tab state
  const [activeTab, setActiveTab] = useState('submit')
  
  // Form states
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [failed, setFailed] = useState(false)
  
  // Responsive states
  const [isMobile, setIsMobile] = useState(false)
  
  const router = useRouter()
  const inputRef = useRef(null)

  // Check if user has premium access
  const isPremiumUser = useMemo(() => {
    return tier === 'basic' || tier === 'premium'
  }, [tier])

  // Handle URL validation and parsing
  const parseUrl = (url) => {
    if (!url) return { isValid: false, error: 'Please provide a valid link.' }

    for (const urlType of SUPPORTED_URLS) {
      if (url.includes(urlType.prefix)) {
        // Skip if this URL type has an exclusion and it matches
        if (urlType.excludeIfIncludes && url.includes(urlType.excludeIfIncludes)) {
          continue
        }

        // Check if premium is required for this URL type
        if (urlType.requiresPremium && !isPremiumUser) {
          return {
            isValid: false,
            error: `Upgrade your plan to process ${urlType.source === 'sp' ? 'X Spaces' : 
                    urlType.source === 'ap' ? 'Apple Podcasts' : 
                    urlType.source === 'tw' ? 'Twitch recordings' : 
                    'X Videos'}. See Account page for more detail.`
          }
        }

        try {
          const videoId = urlType.idExtractor(url)
          if (!videoId) throw new Error('Could not extract ID from URL')
          
          return {
            isValid: true,
            videoId,
            videoSource: urlType.source,
            processedUrl: urlType.source === 'x' ? url.split('/video/')[0] : url
          }
        } catch (error) {
          return { 
            isValid: false, 
            error: 'Invalid URL format. Please check and try again.' 
          }
        }
      }
    }

    return { 
      isValid: false, 
      error: 'Please provide a link to a YouTube video, X Space, X Video, Twitch recording, or an Apple Podcast.' 
    }
  }

  // Focus input when button is clicked
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Check for new item in localStorage on component mount
  useEffect(() => {
    const newItem = localStorage.getItem('newItem')
    if (newItem) {
      if (newItem === 'link') {
        setActiveTab('submit')
      } else if (newItem === 'upload') {
        setActiveTab('upload')
      }
      localStorage.setItem('newItem', null)
      sessionStorage.setItem('navigatedFromMainPage', 'true')
    }
  }, [])

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Set initial value
    handleResize()
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Process URL submission
  const handleSubmit = async (event) => {
    // Parse and validate the URL
    const { isValid, error, videoId, videoSource, processedUrl } = parseUrl(inputValue)
    
    if (!isValid) {
      setErrorMessage(error)
      setFailed(true)
      return
    }
    
    if (!currentUser) {
      setErrorMessage('Please sign in to submit content.')
      setFailed(true)
      return
    }
    
    try {
      setLoading(true)
      setFailed(false)
      
      const idToken = await currentUser.getIdToken()
      console.log( `${API_URL}/sources/`,
        { url: processedUrl },
        { headers: { 'id-token': idToken } }
      )
      const response = await axios.post(
        `${API_URL}/sources/`,
        { url: processedUrl },
        { headers: { 'id-token': idToken } }
      )
      
      
      sessionStorage.setItem('refreshCredit', 'true')
      setErrorMessage('')
      setInputValue('')
      router.push(`/${response.data.source_type}/${response.data.source_id}`)
    } catch (error) {
      console.error('Submission error:', error)
      let errorMsg = 'There was an error submitting the form. Please try again.'
      
      if (error.response) {
        const errorDetail = error.response.data.detail
        
        if (errorDetail === 'Video not popular enough for free users') {
          errorMsg = 'Make sure the content you are submitting has more than 10,000 views.'
        } else if (errorDetail === 'Not enough minutes') {
          errorMsg = "You don't have enough credits to submit this content."
        } else if (errorDetail === 'Free users cannot submit X Spaces') {
          errorMsg = 'Upgrade your plan to process X Spaces. See Account page for more detail.'
        } else if (tier === 'basic' || tier === 'premium') {
          errorMsg = 'There was an error submitting the form. Please refresh the page and try again. If the issue persists, contact us at support@alphy.app'
        }
      }
      
      setErrorMessage(errorMsg)
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'submit', label: 'Submit Link', icon: LinkIcon },
    { id: 'upload', label: 'Upload Audio', icon: Upload },
    { id: 'arc', label: 'Create Arc', icon: BookOpen }
  ]

  return (
    <div className="max-w-3xl mx-auto py-8 md:py-12 px-4">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg shadow-indigo-500/30">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create Something New
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Submit a link, upload audio, or create an Arc to get started
        </p>
      </div>

      {/* Credits info card */}
      {currentUser && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-800 rounded-2xl border border-indigo-100 dark:border-zinc-700 overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white dark:bg-zinc-700 shadow-sm">
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {Math.floor(credit)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {Math.floor(credit)} minutes available
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {tier === 'free' ? 'Starter' : tier === 'basic' ? 'Basic' : 'Premium'} Plan
                </p>
              </div>
            </div>
            
            <Button
              onClick={() => {
                sessionStorage.setItem('creditPurchase', 'true')
                router.push('/account')
              }}
              variant="ghost"
              size="sm"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
            >
              Get more credits →
            </Button>
          </div>
        </div>
      )}

      {/* Main content with tabs */}
      <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-200 dark:border-zinc-700 overflow-hidden">
        {/* Tab navigation */}
        <div className="flex border-b border-gray-100 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-200 relative ${
                  activeTab === tab.id
                    ? 'text-indigo-600 dark:text-indigo-400 bg-white dark:bg-zinc-800'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-indigo-500' : ''}`} />
                <span className="hidden sm:inline">{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div>
          {activeTab === 'submit' && (
            <SubmitBlock
              setSubmitDialog={() => {}}
              loading={loading}
              currentUser={currentUser}
              tier={tier}
              handleSubmit={handleSubmit}
              inputValue={inputValue}
              setInputValue={setInputValue}
              credit={credit}
              failed={failed}
              errorMessage={errorMessage}
              handleButtonClick={handleButtonClick}
              inputRef={inputRef}
              hideCredits={true}
            />
          )}

          {activeTab === 'upload' && (
            <UploadBlock
              setUploadDialog={() => {}}
              currentUser={currentUser}
              tier={tier}
              credit={credit}
              hideCredits={true}
            />
          )}

          {activeTab === 'arc' && (
            <ArcBlock
              currentUser={currentUser}
              tier={tier}
            />
          )}
        </div>
      </div>
    </div>
  )
}