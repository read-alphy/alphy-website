import React, { useState, useCallback } from 'react'
import { useEffect } from 'react'

import HubFeedItem from '../FeedTabs/HubFeedItemElements/HubFeedItem'
import axios from 'axios'
import SkeletonItem from '../FeedTabs/SkeletonItem'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Button } from '@material-tailwind/react'
import CircularProgress from '@mui/material/CircularProgress';
import { API_URL } from '../../constants'


function HubSourceFeed(
tier,
credit,
currentUser,



) {
  
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [prevLength, setPrevLength] = useState(0)
  /*const const { currentUser } = useAuth(); */

  const router  = useRouter()

  const [inputValue, setInputValue] = useState('')

  const [submitted, setSubmitted] = useState(false)
  const [called, setCalled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMemory, setSearchMemory] = useState('')
  const [loading, setLoading] = useState(false)

  const [submitInputValue, setSubmitInputValue] = useState('')
  const [failed, setFailed] = useState(false)
  const [errorMessageSubmit, setErrorMessageSubmit] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(search)
    }, 500) // delay of 500ms

    return () => clearTimeout(timer) // this will clear the timer if the user keeps typing before the 500ms has passed
  }, [search])

  useEffect(() => {
    if (searchQuery || (searchQuery === '' && searchMemory !== '')) {
      handleSearch()
    }
  }, [searchQuery])

  const handleSearch = () => {
    setSearchMemory(search)
    localStorage.setItem('search', search)
    if (searchInputRef.current.value.length === 0) {
      setSearch('')
    }
    setOffset(0)
    getData(0, true, true)

    setSubmitted(true)
  }

  window.addEventListener('beforeunload', () => {
    if (submitted === true) {
      localStorage.setItem('search', search)
    } else {
      localStorage.setItem('search', '')
    }
  })
  const limit = 20
  const searchInputRef = React.useRef(null)

  // Inside your HubSourceFeed component
  const getData = useCallback(
    (offset, firstTime, hasMore) => {
      if (!hasMore) {
        return
      }
      setIsLoading(true)

      axios
        .get(`${API_URL}/sources/`, {
          params: {
            q: search,
            offset: offset,
            limit,
          },
        })
        .then(response => {
          setHasMore(!(response.data.length < limit))

          if (firstTime) {
            setData(response.data)
          } else {
            setData(prevData => [...prevData, ...response.data])
          }
          setIsLoading(false)
        })
        .catch(error => {
          console.log(error)
          setIsLoading(false)
          throw error
        })
    },
    [search, limit]
  ) // Add any other dependencies if needed

  const loadMore = () => {
    if (window.location.href.includes('/explore')) {
      setOffset(offset + limit)
      getData(offset + limit, false, true)
    } else {
      router.push('/explore')
    }
  }

  if (called === false && search.length === 0) {
    getData(0, true, true)
    setCalled(true)
  }
  useEffect(() => {
    if (prevLength > 0 && search.length === 0) {
      getData(0, true, true) // Call the provided function when the input value is empty
    }
    setPrevLength(search.length)
  }, [search, getData, prevLength]) //

  const handleSubmit = (event, selectedOption) => {
    if (
      !(
        search.includes('https://www.youtube.com/watch') ||
        search.includes('https://youtu.be') ||
        search.includes('https://m.youtube.com') ||
        search.includes('https://twitter.com/i/spaces') ||
        search.includes('https://www.youtube.com/live') ||
        search.includes('https://podcasts.apple.com') ||
        search.includes('https://www.twitch.tv') ||
        search.includes('https://www.twitch.com') ||
        search.includes('https://twitter.com') ||
        search.includes('https://x.com') ||
        search.includes('https://x.com/i/spaces')
      )
    ) {
      setInputValue('')
      setErrorMessageSubmit('Please provide a valid link.')
      setFailed(true)
      return
    } else {
      let videoId
      let video_source
      //check if video already exists
      if (search.includes('https://www.youtube.com')) {
        if (search.includes('https://www.youtube.com/watch')) {
          try {
            videoId = search.split('/').pop().split('?v=')[1].split('&')[0]
          } catch {
            setErrorMessageSubmit('Please provide a valid link.')
            setFailed(true)
            return
          }
        } else if (search.includes('https://www.youtube.com/live')) {
          videoId = search.split('/').pop().split('?')[0]
        } else {
          setErrorMessageSubmit('Please provide a valid link.')
          setFailed(true)
          return
        }
        video_source = 'yt'
      } else if (search.includes('https://youtu.be')) {
        videoId = search.split('/').pop().split('?')[0]
        video_source = 'yt'
      } else if (search.includes('https://m.youtube.com')) {
        videoId = search.split('/').pop().split('?v=')[1].split('&')[0]
        video_source = 'yt'
      } else if (search.includes('https://twitter.com/i/spaces')) {
        if (tier === 'basic' || tier === 'premium') {
          videoId = search.split('/').pop().split('?')[0]
          video_source = 'sp'
        } else {
          setFailed(true)
          setErrorMessageSubmit(
            'Upgrade your plan to process Twitter Spaces. See Account page for more detail.'
          )
          return
        }
      } else if (search.includes('https://podcasts.apple.com')) {
        if (tier === 'basic' || tier === 'premium') {
          const idRegex = /id(\d+)/
          const iRegex = /i=(\d+)/

          const idMatch = search.match(idRegex)
          const iMatch = search.match(iRegex)

          const podcastId = idMatch ? idMatch[1] : ''
          const episodeId = iMatch ? iMatch[1] : ''

          videoId = `${podcastId}-${episodeId}`
          video_source = 'ap'
        } else {
          setFailed(true)
          setErrorMessageSubmit(
            'Upgrade your plan to process Apple Podcasts. See Account page for more detail.'
          )
          return
        }
      } else if (
        search.includes('https://www.twitch.tv') ||
        search.includes('https://www.twitch.com')
      ) {
        if (tier === 'basic' || tier === 'premium') {
          const regex = /twitch\.(tv|com)\/videos\/(\d+)/
          const match = search.match(regex)
          videoId = match ? match[1] : null

          video_source = 'tw'
        } else {
          setFailed(true)
          setErrorMessageSubmit(
            'Upgrade your plan to process Twitch recordings. See Account page for more detail.'
          )
          return
        }
      } else if (
        (search.includes('https://x.com') ||
          search.includes('https://twitter.com')) &&
        !search.includes('i/spaces')
      ) {
        if (tier === 'basic' || tier === 'premium') {
          setSearch(search.split('/video/')[0])
          const regex = /status\/(\d+)/
          const match = search.split('/video/')[0].match(regex)
          videoId = match ? match[1] : ''
          video_source = 'x'
        } else {
          setFailed(true)
          setErrorMessageSubmit(
            'Upgrade your plan to process Twitter videos. See Account page for more detail.'
          )
          return
        }
      }

      if (currentUser) {
        setLoading(true)
        // get id token
        currentUser.getIdToken().then(idToken => {
          axios
            .post(
              `${API_URL}/sources/`,
              {
                url:
                  video_source === 'tw' ? search.split('/video/')[0] : search,
              },
              {
                headers: {
                  'id-token': idToken,
                },
              }
            )
            .then(response => {
              sessionStorage.setItem('refreshCredit', 'true')

              setErrorMessageSubmit('')
              setLoading(false)
              setFailed(false)
              setSearch('')
              getData(0, true, true)
              router.push(
                `/${response.data.source_type}/${response.data.source_id}`
              )

              /* navigate(`/${video_source}/${videoId}`) */
            })
            .catch(error => {
              if (errorMessageSubmit.length === 0) {
                setErrorMessageSubmit(
                  'There was an error submitting the form. Please check the link and your remaining credits and try again.'
                )
              } else if (
                error.response &&
                error.response.data.detail ==
                  'Free users cannot submit twitter spaces'
              ) {
                setErrorMessageSubmit(
                  'Upgrade your plan to process Twitter Spaces. See Account page for more detail.'
                )
              } else if (
                error.response &&
                error.response.data.detail == 'Not enough minutes'
              ) {
                setErrorMessageSubmit("You don't have enough credits.")
              }
              setFailed(true)
              setSubmitInputValue('')
              setLoading(false)
              throw error
            })
        })
      } else {
        // sign in
        // navigate('/auth');
        setErrorMessageSubmit('Please sign in to submit content.')
      }
    }
  }

  return (
    <div className="xl:min-w-[1000px] xl:max-w-[1000px] 3xl:max-w-[1280px] 3xl:min-w-[1280px] w-full mx-auto xl:mx-0 md:pl-10  lg:pl-16  xl:pl-20 3xl:pl-40   flex flex-row">
      <div className=" p-[10px] mt-10 min-h-[60vh]  w-full">
        <p className="quicksand font-bold text-slate-700 dark:text-zinc-300 text-lg  text-xl xl:text-2xl pl-2">
          {' '}
          Explore our database.
        </p>

        <form
          className="flex items-center pt-8"
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative  ">
            <div className="relative h-11 ">
              <input
                ref={searchInputRef}
                onChange={e => {
                  setSearch(e.target.value)
                }}
                placeholder="Type in a key word or paste a link..."
                className=" pl-10 peer min-w-[320px] max-w-[320px] quicksand font-normal xs:min-w-[380px] sm:min-w-[400px] xl:min-w-[600px] h-full border-zinc-300 bg-white dark:bg-mildDarkMode dark:border-zinc-700 text-blue-gray-700  outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] focus:border-sky-300 dark:focus:border-zinc-500"
              />
              <div className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3 ">
                <svg
                  width="20"
                  className="text-zinc-600 dark:text-zinc-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24 "
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap={'round'}
                    strokeLinejoin={'round'}
                    strokeWidth={'2'}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </form>

        <div className={`buttons flex justify-between mt-2 `}></div>

        <div className="w-full">
          <div
            className={`
							grid  mt-10
							${
                isLoading
                  ? 'grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
                  : data.length === 1
                  ? 'lg:grid-cols-1 xl:grid-cols-1 lg:w-1/2'
                  : 'xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
              }
							gap-4
							`}
          >
            {isLoading
              ? data.length > 0
                ? data.map((item, index) =>
                    item.summaries !== undefined &&
                    item.summaries.length > 0 ? (
                      <HubFeedItem
                        currentUser={currentUser}
                        myBookmarks={false}
                        key={index}
                        item={item}
                        mainFeedInput={search}
                      />
                    ) : null
                  )
                : [...Array(10)].map((item, index) => (
                    <SkeletonItem key={index} />
                  ))
              : data.map((item, index) =>
                  item.summaries !== undefined && item.summaries.length > 0 ? (
                    <HubFeedItem
                      currentUser={currentUser}
                      myBookmarks={false}
                      key={index + 1000}
                      item={item}
                    />
                  ) : null
                )}
          </div>
          {hasMore && (
            <div className="w-full flex justify-center">
              {
                <button
                  className="justify-center flex text-slate-700 dark:text-zinc-300 font-semibold  mt-10 underline quicksand font-bold"
                  onClick={loadMore}
                >
                  {'Load more'}
                </button>
              }
            </div>
          )}

          {data.length === 0 && !isLoading && currentUser ? (
            search.includes('https://www.youtube.com/watch') ||
            search.includes('https://youtu.be') ||
            search.includes('https://m.youtube.com') ||
            search.includes('https://twitter.com/i/spaces') ||
            search.includes('https://www.youtube.com/live') ||
            search.includes('https://podcasts.apple.com') ||
            search.includes('https://www.twitch.tv') ||
            search.includes('https://www.twitch.com') ||
            search.includes('https://twitter.com') ||
            search.includes('https://x.com') ||
            search.includes('https://x.com/i/spaces') ? (
              <div>
                <p className="mb-4 text-zinc-500 dark:text-zinc-400 flex flex-col text-md">
                  Submit for processing
                </p>

                <div className="flex-col flex mb-6 text-sm">
                  <div className="flex flex-row ">
                    <a
                      href="/account"
                      className="text-zinc-500 dark:text-zinc-400"
                    >
                      {tier === 'free' && 'Starter Plan'}
                      {tier === 'basic' && 'Basic Plan'}
                      {tier === 'premium' && 'Premium Plan'}
                    </a>
                    <p className="ml-1 mr-1 text-zinc-500 dark:text-zinc-400">
                      {' '}
                      -{' '}
                    </p>
                    <p className=" text-zinc-500 dark:text-zinc-400">
                      {' '}
                      Remaining Credits : {Math.floor(credit)} minutes
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  type="submit"
                  onClick={e => {
                    handleSubmit()
                  }}
                  className={`${
                    loading ? 'opacity-60 pointer-events-none' : 'opacity-100'
                  } bg-green-200  dark:text-zinc-700 px-6 py-3 text-sm lg:text-[15px] normal-case`}
                >
                  {loading ? (
                    <CircularProgress
                      color="inherit"
                      size={window.innerWidth > 1000 ? 'lg' : `md`}
                      className="flex mx-auto opacity-30"
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>

                {failed && (
                  <div className="mx-auto mt-5 text-sm text-red-400 ml-2">
                    {errorMessageSubmit}
                  </div>
                )}

                {(tier === 'basic' || tier === 'premium') && (
                  <div className="mt-8 flex flex-row text-sm">
                    <p className="text-zinc-500 dark:text-zinc-400 mr-2">
                      Need more credits?{' '}
                    </p>{' '}
                    <Link
                      onClick={() =>
                        sessionStorage.setItem('creditPurchase', 'true')
                      }
                      href="/account"
                      className="text-indigo-400 font-semibold underline"
                    >
                      Buy here.
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-2 mb-8 text-zinc-500 dark:text-zinc-400 flex flex-col text-md">
                Can't find what you are looking for? Paste the link for the
                content above to process it.
              </p>
            )
          ) : (
            data.length === 0 &&
            !isLoading && (
              <p className="mt-2 mb-8 text-zinc-600 dark:text-zinc-300  text-sm">
                <Link
                  href="u/login"
                  className="text-green-300 underline cursor-pointer"
                >
                  Sign in
                </Link>{' '}
                to submit content.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default HubSourceFeed
