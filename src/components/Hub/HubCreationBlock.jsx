import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

// Components
import { Button } from '@material-tailwind/react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import ChatIcon from '@mui/icons-material/Chat'
import LinkIcon from '@mui/icons-material/Link'
import Dialog from '@mui/material/Dialog'

import UploadBlock from '../Creation/UploadBlock'
import SubmitBlock from '../Creation/SubmitBlock'

import { API_URL } from '../../constants'

// Constants
const SUPPORTED_URLS = [
  { prefix: 'https://www.youtube.com/watch', source: 'yt', idExtractor: (url) => url.split('/').pop().split('?v=')[1]?.split('&')[0] },
  { prefix: 'https://www.youtube.com/live', source: 'yt', idExtractor: (url) => url.split('/').pop().split('?')[0] },
  { prefix: 'https://youtu.be', source: 'yt', idExtractor: (url) => url.split('/').pop().split('?')[0] },
  { prefix: 'https://m.youtube.com', source: 'yt', idExtractor: (url) => url.split('/').pop().split('?v=')[1]?.split('&')[0] },
  { prefix: 'https://twitter.com/i/spaces', source: 'sp', idExtractor: (url) => url.split('/').pop().split('?')[0], requiresPremium: true },
  { prefix: 'https://x.com/i/spaces', source: 'sp', idExtractor: (url) => url.split('/').pop().split('?')[0], requiresPremium: true },
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
    excludeIfIncludes: 'i/spaces',
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
    excludeIfIncludes: 'i/spaces',
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
  // Dialog states
  const [submitDialog, setSubmitDialog] = useState(false)
  const [uploadDialog, setUploadDialog] = useState(false)
  const [arcDialog, setArcDialog] = useState(false)
  
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
            error: `Upgrade your plan to process ${urlType.source === 'sp' ? 'Twitter Spaces' : 
                    urlType.source === 'ap' ? 'Apple Podcasts' : 
                    urlType.source === 'tw' ? 'Twitch recordings' : 
                    'Twitter videos'}. See Account page for more detail.`
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
      error: 'Please provide a link to a YouTube video, Twitter Space, Twitter video, Twitch recording, or an Apple Podcast.' 
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
        setSubmitDialog(true)
        setUploadDialog(false)
      } else if (newItem === 'upload') {
        setUploadDialog(true)
        setSubmitDialog(false)
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
      const response = await axios.post(
        `${API_URL}/sources/`,
        { url: processedUrl },
        { headers: { 'id-token': idToken } }
      )
      
      // Update session and redirect
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
        } else if (errorDetail === 'Free users cannot submit twitter spaces') {
          errorMsg = 'Upgrade your plan to process Twitter Spaces. See Account page for more detail.'
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

  // Navigate to Arc creation page
  const handleArcNavigation = () => {
    router.push('/arc/createArc')
  }

  // Handle dialog close
  const handleGoBack = () => {
    if (sessionStorage.getItem('navigatedFromMainPage')) {
      router.push('/')
      sessionStorage.removeItem('navigatedFromMainPage')
    }
    
    setSubmitDialog(false)
    setUploadDialog(false)
    setArcDialog(false)
  }

  // Render action cards for desktop
  const renderDesktopView = () => (
    <div className="hidden pt-10 lg:flex flex-row gap-6 sm:gap-10 lg:gap-20 w-full mx-auto justify-center xl:px-20">
      <div className="flex flex-col gap-10">
        <div className="text-xl text-stone-900 dark:text-zinc-300 text-center mb-10 quicksand font-semibold">
          Process New Content
        </div>

        {/* Submit Link Card */}
        <div
          className="min-h-[230px] max-h-[230px] bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer w-[300px] transform hover:scale-102 transition duration-300 ease-in-out"
          onClick={() => {
            setSubmitDialog(true)
            handleButtonClick()
          }}
        >
          <div className="flex flex-col items-center p-6 h-full">
            <p className="text-green-400 text-lg font-semibold mb-4">
              Submit a Link
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm text-center mb-6">
              Submit a link to an online discussion to process with Alphy.
            </p>
            <div className="mt-auto mb-4">
              <LinkIcon
                fontSize="medium"
                className="text-green-400"
              />
            </div>
          </div>
        </div>

        {/* Upload Recording Card */}
        <div
          className="min-h-[230px] max-h-[230px] bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer w-[300px] transform hover:scale-102 transition duration-300 ease-in-out"
          onClick={() => setUploadDialog(true)}
        >
          <div className="flex flex-col items-center p-6 h-full">
            <p className="text-indigo-400 text-lg font-semibold mb-4">
              Upload a Recording
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm text-center mb-6">
              Import an audio file from your device to transcribe,
              summarize, and question privately.
            </p>
            <div className="mt-auto mb-4">
              <CloudUploadIcon
                fontSize="medium"
                className="text-indigo-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-r border-gray-200 dark:border-zinc-700 dark:opacity-40"></div>

      {/* Create Arc Card */}
      <div className="justify-center flex flex-col">
        <div className="text-xl text-stone-900 quicksand font-semibold dark:text-zinc-300 text-center mb-10">
          Connect Audio with AI
        </div>
        <div
          className="min-h-[230px] max-h-[230px] my-auto bg-white dark:bg-zinc-800 dark:border-zinc-700 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer w-[300px] transform hover:scale-102 transition duration-300 ease-in-out"
          onClick={handleArcNavigation}
        >
          <div className="flex flex-col items-center p-6 h-full">
            <p className="text-red-400 text-lg font-semibold mb-4">
              Create an Arc
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm text-center mb-6">
              Build your own AI-assisted search engine on countless hours of audiovisual content.
            </p>
            <div className="mt-auto mb-4">
              <ChatIcon
                fontSize="medium"
                className="text-red-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render action cards for mobile
  const renderMobileView = () => (
    <div className="dark:bg-zinc-900 lg:hidden justify-center h-full py-10 px-5 items-center overflow-y-auto mt-6 lg:mt-20">
      <h2 className="mb-10 text-xl font-semibold text-zinc-700 dark:text-zinc-300 text-center">
        Start discovering Alphy's capabilities
      </h2>
      
      <div className="flex flex-col gap-6 w-full mx-auto max-w-md">
        {/* Submit Link Card */}
        <div
          className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 hover:shadow-lg transform hover:scale-102 transition duration-300 ease-in-out"
          onClick={() => {
            setSubmitDialog(true)
            handleButtonClick()
          }}
        >
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
              <LinkIcon className="text-green-500 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-500 dark:text-green-400 mb-1">
                Submit a Link
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {isMobile ? 'Use Alphy on online content' : 'Submit a link to an audiovisual content to process with Alphy.'}
              </p>
            </div>
          </div>
        </div>

        {/* Upload Recording Card */}
        <div
          className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 hover:shadow-lg transform hover:scale-102 transition duration-300 ease-in-out"
          onClick={() => setUploadDialog(true)}
        >
          <div className="flex items-center">
            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
              <CloudUploadIcon className="text-indigo-500 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-500 dark:text-indigo-400 mb-1">
                Upload a Recording
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {isMobile ? 'Process an audio file from your device' : 'Import an audio file from your device to transcribe, summarize, and question privately.'}
              </p>
            </div>
          </div>
        </div>

        {/* Create Arc Card */}
        <div
          className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6 hover:shadow-lg transform hover:scale-102 transition duration-300 ease-in-out"
          onClick={handleArcNavigation}
        >
          <div className="flex items-center">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mr-4">
              <ChatIcon className="text-red-500 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-500 dark:text-red-400 mb-1">
                Create an Arc
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                {isMobile 
                  ? 'Create an AI assistant as simply as creating a playlist'
                  : 'Build your own AI-assisted search engine as effortlessly as building a playlist.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="md:mt-10 xl:mt-20 mx-auto">
      {!submitDialog && !uploadDialog && !arcDialog && (
        <>
          {renderDesktopView()}
          {renderMobileView()}
        </>
      )}

      {submitDialog && (
        <SubmitBlock
          handleGoBack={handleGoBack}
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
        />
      )}

      {uploadDialog && (
        <UploadBlock
          handleGoBack={handleGoBack}
          currentUser={currentUser}
          tier={tier}
          credit={credit}
        />
      )}
    </div>
  )
}