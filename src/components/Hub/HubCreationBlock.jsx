import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

// Components
import { Button } from '@material-tailwind/react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import LinkIcon from '@mui/icons-material/Link'

import UploadBlock from '../Creation/UploadBlock'
import SubmitBlock from '../Creation/SubmitBlock'

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
  dataGlobalArchipelagos,
  setDataGlobalArchipelagos,
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

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      {/* Credits info card at the top */}
      {currentUser && (
        <div className="bg-indigo-50 dark:bg-zinc-800 rounded-xl  border border-zinc-200 overflow-hidden mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6">
            <div>
              <div className="flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {tier === 'free' ? 'Starter' : tier === 'basic' ? 'Basic' : 'Premium'} Plan
                </span>
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {Math.floor(credit)} minutes remaining
                </span>
              </div>
            </div>
            
            <button
              onClick={() => {
                sessionStorage.setItem('creditPurchase', 'true')
                router.push('/account')
              }}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            >
              Need more credits?
            </button>
          </div>
        </div>
      )}

      {/* Main content with tabs */}
      <div className="bg-white dark:bg-zinc-800 rounded-xl  border border-zinc-300 dark:border-zinc-500 overflow-hidden">
        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'submit'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <LinkIcon className="mr-2" fontSize="small" />
            Submit a Link
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <CloudUploadIcon className="mr-2" fontSize="small" />
            Upload a Recording
          </button>
        </div>

        {/* Tab content */}
        <div className="p-0">
          {activeTab === 'submit' && (
            <div>
              <SubmitBlock
                setSubmitDialog={() => {}}  // No-op since we're using tabs now
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
                // Pass flag to hide redundant credit display
                hideCredits={true}
              />
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <UploadBlock
                setUploadDialog={() => {}}  // No-op since we're using tabs now
                currentUser={currentUser}
                tier={tier}
                credit={credit}
                // Pass flag to hide redundant credit display
                hideCredits={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}