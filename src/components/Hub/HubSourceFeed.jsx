import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

// Components
import HubFeedItem from '../FeedTabs/HubFeedItemElements/HubFeedItem'
import SkeletonItem from '../FeedTabs/SkeletonItem'
import { Button, Spinner } from '@material-tailwind/react'
import { API_URL } from '../../constants'

function HubSourceFeed({ currentUser, tier, credit }) {
  // Data fetching state
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)
  
  // Search state
  const [search, setSearch] = useState('')
  const searchInputRef = useRef(null)
  const searchRef = useRef('')
  
  // Pagination state
  const [offset, setOffset] = useState(0)
  const limit = 40
  
  // Form submission state
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)
  const [errorMessageSubmit, setErrorMessageSubmit] = useState('')
  
  const router = useRouter()

  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchRef.current !== search) {
        searchRef.current = search
        setOffset(0)
        getData(0, true, true)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [search])

  // Handle beforeunload event
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('search', search || '')
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [search])

  // Initial data fetch
  useEffect(() => {
    getData(0, true, true)
  }, [])

  // Fetch data from API
  const getData = useCallback((offsetValue, firstTime, shouldFetch) => {
    if (!shouldFetch) return
    
    setIsLoading(true)

    axios.get(`${API_URL}/sources/`, {
      params: {
        q: search,
        offset: offsetValue,
        limit,
      },
    })
    .then(response => {
      setHasMore(response.data.length >= limit)
      
      if (firstTime) {
        setData(response.data)
      } else {
        setData(prevData => [...prevData, ...response.data])
      }
    })
    .catch(error => {
      console.error('Failed to fetch sources:', error)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [search, limit])

  // Load more data
  const loadMore = () => {
    const newOffset = offset + limit
    
    if (window.location.href.includes('/explore')) {
      setOffset(newOffset)
      getData(newOffset, false, true)
    } else {
      router.push('/explore')
    }
  }

  // Check if URL is supported
  const isValidUrl = (url) => {
    const supportedDomains = [
      'youtube.com/watch',
      'youtu.be',
      'm.youtube.com',
      'twitter.com/i/spaces',
      'youtube.com/live',
      'podcasts.apple.com',
      'twitch.tv',
      'twitch.com',
      'twitter.com',
      'x.com',
      'x.com/i/spaces'
    ]
    
    return supportedDomains.some(domain => url.includes(`https://${domain}`) || 
                                          url.includes(`https://www.${domain}`))
  }

  // Handle tier restrictions
  const getTierRestrictionMessage = (source) => {
    if (tier === 'free') {
      const tierMessages = {
        'sp': 'Upgrade your plan to process X Spaces.',
        'ap': 'Upgrade your plan to process Apple Podcasts.',
        'tw': 'Upgrade your plan to process Twitch recordings.',
        'x': 'Upgrade your plan to process X Videos.'
      }
      
      return tierMessages[source] || 'This content requires a higher tier plan.'
    }
    return null
  }

  // Extract video info from URL
  const extractVideoInfo = (url) => {
    let videoId = null
    let videoSource = null
    
    if (url.includes('youtube.com/watch')) {
      try {
        videoId = url.split('/').pop().split('?v=')[1].split('&')[0]
        videoSource = 'yt'
      } catch {
        return { error: 'Invalid YouTube URL' }
      }
    } else if (url.includes('youtube.com/live')) {
      videoId = url.split('/').pop().split('?')[0]
      videoSource = 'yt'
    } else if (url.includes('youtu.be')) {
      videoId = url.split('/').pop().split('?')[0]
      videoSource = 'yt'
    } else if (url.includes('m.youtube.com')) {
      videoId = url.split('/').pop().split('?v=')[1].split('&')[0]
      videoSource = 'yt'
    } else if (url.includes('twitter.com/i/spaces') || url.includes('x.com/i/spaces')) {
      const tierMessage = getTierRestrictionMessage('sp')
      if (tierMessage) return { error: tierMessage }
      
      videoId = url.split('/').pop().split('?')[0]
      videoSource = 'sp'
    } else if (url.includes('podcasts.apple.com')) {
      const tierMessage = getTierRestrictionMessage('ap')
      if (tierMessage) return { error: tierMessage }
      
      const idMatch = url.match(/id(\d+)/)
      const iMatch = url.match(/i=(\d+)/)
      
      const podcastId = idMatch ? idMatch[1] : ''
      const episodeId = iMatch ? iMatch[1] : ''
      
      videoId = `${podcastId}-${episodeId}`
      videoSource = 'ap'
    } else if (url.includes('twitch.tv') || url.includes('twitch.com')) {
      const tierMessage = getTierRestrictionMessage('tw')
      if (tierMessage) return { error: tierMessage }
      
      const match = url.match(/twitch\.(tv|com)\/videos\/(\d+)/)
      videoId = match ? match[2] : null
      videoSource = 'tw'
    } else if ((url.includes('x.com') || url.includes('twitter.com')) && !url.includes('i/spaces')) {
      const tierMessage = getTierRestrictionMessage('x')
      if (tierMessage) return { error: tierMessage }
      
      const match = url.split('/video/')[0].match(/status\/(\d+)/)
      videoId = match ? match[1] : ''
      videoSource = 'x'
    }
    
    return { videoId, videoSource }
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!isValidUrl(search)) {
      setErrorMessageSubmit('Please provide a valid link.')
      setFailed(true)
      return
    }
    
    if (!currentUser) {
      setErrorMessageSubmit('Please sign in to submit content.')
      setFailed(true)
      return
    }
    
    const { videoId, videoSource, error } = extractVideoInfo(search)
    
    if (error) {
      setErrorMessageSubmit(error)
      setFailed(true)
      return
    }
    
    try {
      setLoading(true)
      setFailed(false)
      
      const idToken = await currentUser.getIdToken()
      const response = await axios.post(
        `${API_URL}/sources/`,
        {
          url: videoSource === 'tw' ? search.split('/video/')[0] : search,
        },
        {
          headers: {
            'id-token': idToken,
          },
        }
      )
      
      sessionStorage.setItem('refreshCredit', 'true')
      setSearch('')
      getData(0, true, true)
      router.push(`/${response.data.source_type}/${response.data.source_id}`)
    } catch (error) {
      let errorMsg = 'There was an error processing your request.'
      
      if (error.response) {
        if (error.response.data.detail === 'Free users cannot submit X Spaces') {
          errorMsg = 'Upgrade your plan to process X Spaces.'
        } else if (error.response.data.detail === 'Not enough minutes') {
          errorMsg = "You don't have enough credits."
        }
      }
      
      setErrorMessageSubmit(errorMsg)
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full mx-auto lg:mx-0 px-4 md:px-6 lg:px-8 xl:px-10 max-w-[1280px]">
      <div className="py-10 min-h-[60vh] w-full">
        <h1 className="font-bold text-zinc-700 dark:text-zinc-300 text-xl md:text-2xl">
          Explore our database
        </h1>

        {/* Search Form */}
        <div className="mt-6 md:mt-8">
          <div className="relative max-w-full">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Type in a key word or paste a link..."
              aria-label="Search content"
              className="pl-10 w-full md:w-4/5 lg:w-3/5 xl:w-2/3 h-12 border rounded-lg 
                         border-zinc-300 bg-white dark:bg-zinc-800 dark:border-zinc-700 
                         text-zinc-800 dark:text-zinc-200 outline-none focus:ring-2 
                         focus:ring-sky-300 dark:focus:ring-zinc-500 transition-all 
                         placeholder-zinc-400 dark:placeholder-zinc-500 text-sm px-3 py-2.5"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                width="20"
                className="text-zinc-600 dark:text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-10">
          {isLoading && data.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 gap-y-6">
              {[...Array(8)].map((_, index) => (
                <SkeletonItem key={`skeleton-${index}`} />
              ))}
            </div>
          ) : data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 gap-y-6">
                {data.map((item, index) => (
                  item.summaries?.length > 0 && (
                    <HubFeedItem
                      currentUser={currentUser}
                      myBookmarks={false}
                      key={`item-${item.id || index}`}
                      item={item}
                      mainFeedInput={search}
                    />
                  )
                ))}
              </div>
              
              {/* Load More Button */}
              {hasMore && (
                <div className="w-full flex justify-center mt-10">
                  <button
                    className="text-blue-600 dark:text-blue-400 font-semibold py-2 px-4 rounded-md 
                               hover:bg-blue-50 dark:hover:bg-zinc-800 transition duration-200 ease-in-out"
                    onClick={loadMore}
                    aria-label="Load more content"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            // Empty state - No results
            <div className="mt-8 text-center py-10 px-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                No results found
              </h3>
              
              {isValidUrl(search) && currentUser ? (
                <div className="mt-6 max-w-md mx-auto">
                  <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium text-zinc-700 dark:text-zinc-300 mb-4">
                      Submit for processing
                    </h4>
                    
                    <div className="flex items-center justify-between mb-6 text-sm">
                      <div className="flex items-center">
                        <span className="text-zinc-500 dark:text-zinc-400">
                          {tier === 'free' ? 'Starter Plan' : 
                           tier === 'basic' ? 'Basic Plan' : 'Premium Plan'}
                        </span>
                        <span className="mx-2 text-zinc-400 dark:text-zinc-500">|</span>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          {Math.floor(credit)} minutes remaining
                        </span>
                      </div>
                      
                      {(tier === 'basic' || tier === 'premium') && (
                        <Link
                          href="/account"
                          onClick={() => sessionStorage.setItem('creditPurchase', 'true')}
                          className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 
                                     dark:hover:text-indigo-300 font-medium"
                        >
                          Buy credits
                        </Link>
                      )}
                    </div>
                    
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className={`w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 
                                 rounded-md transition duration-200 ease-in-out 
                                 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <Spinner
                          color="white"
                          size="sm"
                          className="mx-auto"
                        />
                      ) : (
                        'Submit for processing'
                      )}
                    </Button>
                    
                    {failed && (
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 
                                      dark:border-red-900/30 rounded text-red-600 dark:text-red-400 text-sm">
                        {errorMessageSubmit}
                      </div>
                    )}
                  </div>
                </div>
              ) : !currentUser ? (
                <div className="mt-4 text-zinc-600 dark:text-zinc-400">
                  <p className="mb-4">
                    Can't find what you're looking for? Sign in to submit content.
                  </p>
                  <Link
                    href="/u/login"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white 
                               py-2 px-6 rounded-md transition duration-200 ease-in-out"
                  >
                    Sign in
                  </Link>
                </div>
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400">
                  Paste a video or podcast link in the search bar to process new content.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HubSourceFeed