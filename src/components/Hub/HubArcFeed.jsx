import React, { useState } from 'react'
import { useEffect } from 'react'

import axios from 'axios'

import CuratedCarouselItem from '../FeedTabs/CuratedCarouselItem'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import AddIcon from '@mui/icons-material/Add'
import Link from 'next/link'
import { API_URL } from '../../constants'

export default function HubArcFeed({
  dataGlobalArchipelagos,
  setDataGlobalArchipelagos,
  currentUser,
  mainShow,
  collapsed,
}) {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  /*const const { currentUser } = useAuth(); */

  const [inputValue, setInputValue] = useState('')

  const [submitted, setSubmitted] = useState(false)
  const [called, setCalled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMemory, setSearchMemory] = useState('')

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

  function searchKeyword(array) {
    return array.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
  }
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

useEffect(() => {
  window.addEventListener('beforeunload', () => {
    if (submitted === true) {
      localStorage.setItem('search', search)
    } else {
      localStorage.setItem('search', '')
    }
  })
}, [submitted])

  const temp = 10
  const limit = temp
  const searchInputRef = React.useRef(null)

  const getData = (offset, firstTime, hasMore) => {
    if (!hasMore) {
      return
    }
    setIsLoading(true)
    const params = {
      offset,
      limit,
    }
    if (inputValue) {
      params.q = search
    }
    axios
      .get(`${API_URL}/sources/`, {
        params,
      })
      .then(response => {
        setHasMore(!(response.data.length < limit))

        if (firstTime) {
          setData(response.data)
        } else {
          setData([...data, ...response.data])
        }
        setIsLoading(false)
      })
  }

  const loadMore = () => {
    setOffset(offset + limit)
    getData(offset + limit, false, true)
  }

  if (called === false && search.length === 0) {
    getData(0, true, true)

    setCalled(true)
  }

  const limit_glob = 40

  /* const { currentUser } = useAuth(); */

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }

  useEffect(() => {
    // TODO this delays the loading of the page, but it's necessary to get the user's idToken.
    // Find a way to store idToken in local storage, minding the expiration behavior.
    // Would improve performance throughout.
    console.log(dataGlobalArchipelagos)
    if (dataGlobalArchipelagos.length === 0) {
      getDataGlobalArchipelagos(0, true, true)
    }
  }, [currentUser, dataGlobalArchipelagos])

  const getDataGlobalArchipelagos = (
    offsetGlobalArchipelagos,
    firstTime,
    hasMoreGlobalArchipelagos
  ) => {
    if (!hasMoreGlobalArchipelagos) {
      return
    }

    axios
      .get(`${API_URL}/playlists/`, {
        params: {
          limit_glob,
          offset: offsetGlobalArchipelagos,
          only_my: false,
        },
      })
      .then(response => {
        if (firstTime) {
          
          shuffleArray(response.data)

          /* setDataGlobalArchipelagos(response.data); */
          const temporary = []
          response.data.forEach(item => {
            if (
              item.user_id === null ||
              item.user_id === 'dUfMZPwN8fcxoBtoYeBuR5ENiBD3'
            ) {
              temporary.push(item)
            }
          })
          setDataGlobalArchipelagos(temporary)
        } else {
          shuffleArray(response.data)
          const temporary = []
          response.data.forEach(item => {
            if (
              item.user_id === null ||
              item.user_id === 'dUfMZPwN8fcxoBtoYeBuR5ENiBD3'
            ) {
              temporary.push(item)
            }
          })
          setDataGlobalArchipelagos(temporary)
        }

        setTimeout(() => {
          const elements = document.querySelectorAll(
            '.styles-module_item-provider__YgMwz'
          )
          if (elements) {
            elements.forEach(element => {
              element.classList.add('cursor-default')
            })
          }
        }, 500)
      })
      .catch(error => {
        console.error('Error fetching data in global arcs: ', error)
      })
  }

  return (
    <div className="w-full mt-10 mx-auto  md:pl-10  lg:pl-16 3xl:pl-40 flex flex-row overflow-hidden">
      {mainShow === 'default' ? (
        <div className=" p-[10px]  xl:min-w-[1200px]  xl:max-w-[1200px] ">
          <p className="text-zinc-700 dark:text-zinc-300 text-xl xl:text-2xl font-averta-semibold">
            Learn from the best online sources with Alphy's Arcs.
          </p>

          {/* <form
										className="flex items-center pt-4"
										
										onSubmit={(e) => {
											e.preventDefault();

										}}
									>
										<label htmlFor="voice-search" className="sr-only">
											Search
										</label>
										<div className="relative  ">


											<div className="relative h-11 ">
												<input
													ref={searchInputRef}
													
													onChange={(e) => {
														setSearch(e.target.value);
													}}
													placeholder="Start searching..."
													className=" pl-10 peer md:min-w-[300px] xl:min-w-[500px] h-full border-zinc-500 bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] dark:border-zinc-800 focus:border-blue-000 dark:focus:border-blue-000" />
												<div
										
										className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3 "
									>

										<svg
											width="20"
											
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

									
									</form> */}

          <div className={`buttons flex justify-between mt-2 `}></div>

          <div
            className={`  mx-auto md:mx-0 w-full container  ${
              collapsed
                ? 'md:max-w-[800px] lg:max-w-[840px]'
                : 'md:max-w-[620px] lg:max-w-[840px]'
            }  xl:max-w-[900px] 2xl:max-w-[1000px]`}
          >
            <div
              className={`relative  grid grid-cols-2 xsSm:grid-cols-3 overflow-x-hidden w-full`}
            >
              {dataGlobalArchipelagos.length > 0 &&
                searchKeyword(dataGlobalArchipelagos).map(
                  (item, index) =>
                    index < 6 && (
                      <div key={index} className="my-5 mx-2 md:mx-5 md:my-5">
                        <CuratedCarouselItem
                          currentUser={currentUser}
                          key={index}
                          item={item}
                          forFeed={true}
                          expandedLayout={true}
                        />
                      </div>
                    )
                )}
            </div>

            <Link
              href="/arcs"
              type="button"
              className="md:text-lg  flex flex-row text-zinc-600 font-semibold dark:text-zinc-200 underline mt-6 ml-2 mb-10 "
            >
              <p className="font-averta-semibold">See All Arcs</p>
              <ArrowForwardIosIcon className="cursor-pointer text-zinc-600 dark:text-zinc-200 p-1 " />
            </Link>

            {/* <div className="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-20 mb-10" ></div> */}

            {/* {hasMore && (
											<div className="w-full flex justify-center">
												{
													<button
														className="justify-center flex text-blueLike dark:text-zinc-300 font-semibold  mt-10 underline"
														onClick={loadMore}
													>
														{'Load more'}
													</button>
												}
											</div>
										)} */}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="  xl:max-w-[1400px]">
            <div className="mb-10">
              <Link
                href="/"
                className="text-zinc-700 dark:text-zinc-300 text-lg  cursor-pointer"
              >
                <KeyboardArrowLeftIcon fontSize="small" className="" />
                <span className="text-sm">Go Back</span>
              </Link>
            </div>
            <p className="mb-10 text-xl lg:text-2xl text-zinc-700 dark:text-zinc-200 font-averta-semibold ">
              Discover All Arcs
            </p>

            <div
              className={`grid grid-cols-2 xsSm:grid-cols-3 xsSm:gap-6 sm:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 `}
            >
              <Link
                href="/arc/createArc"
                className="drop-shadow-lg rounded-lg min-h-[150px] max-h-[150px] min-w-[150px] max-w-[150px]  lg:min-h-[360px] lg:max-h-[360px] lg:min-w-[240px] lg:max-w-[240px] border border-2 bg-white dark:bg-mildDarkMode border dark:border-zinc-700 mt-5 ml-2 md:ml-5 items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div>
                  <AddIcon
                    fontSize="large"
                    className="text-zinc-600 dark:text-zinc-300 mb-4 "
                  />
                  <p className="text-zinc-600 dark:text-zinc-300 text-l lg:text-xl font-averta-semibold">
                    Create Your Arc
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-500 hidden lg:block text-sm px-5 font-normal mt-2">
                    Connect multiple audio content with AI.
                  </p>
                </div>
              </Link>
              {dataGlobalArchipelagos.length > 0 &&
                searchKeyword(dataGlobalArchipelagos).map((item, index) => (
                  <div className="mx-2 my-5 md:mx-5 md:my-5 col-span-1 ">
                    <CuratedCarouselItem
                      currentUser={currentUser}
                      key={index}
                      item={item}
                      forFeed={true}
                      expandedLayout={true}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

