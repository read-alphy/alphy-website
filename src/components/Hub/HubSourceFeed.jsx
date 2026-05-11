import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

// Components
import HubFeedItem from '../FeedTabs/HubFeedItemElements/HubFeedItem'
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from '@/components/ui/input'
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

  return (
    <div className="w-full mx-auto max-w-[1280px]">
      <div className=" min-h-[60vh] w-full">
     {/*    <h1 className="font-bold text-zinc-700 dark:text-zinc-300 text-xl md:text-2xl">
          Explore our database
        </h1> */}

        {/* Search Form */}
        <div className="mt-6 md:mt-8">
          <div className="relative max-w-full">
            <div className="relative flex items-center w-full md:w-4/5 lg:w-3/5 xl:w-2/3">
              <div className="absolute left-3 flex items-center pointer-events-none">
                <svg
                  width="18"
                  height="18"
                  className="text-zinc-500 dark:text-zinc-400"
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
              <Input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Type in a key word or paste a link..."
                aria-label="Search content"
                className="pl-10 h-10 rounded-md font-normal text-sm shadow-sm bg-white dark:bg-zinc-800 w-full transition-all border border-zinc-400 dark:border-zinc-700"
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-3 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  aria-label="Clear search"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="text-zinc-500"
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-10">
          {isLoading && data.length === 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 gap-y-5 ">
              {[...Array(8)].map((_, index) => (
                <div key={`skeleton-${index}`} className="flex flex-col space-y-3">
                  <Skeleton className="h-40 w-full rounded-md" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Skeleton className="h-3 w-16 rounded-full" />
                    <Skeleton className="h-3 w-12 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 gap-y-5">
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
              
              <p className="mx-auto mt-4 max-w-md text-zinc-500 dark:text-zinc-400">
                New processing is disabled. Try another search term to browse existing public material.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HubSourceFeed
