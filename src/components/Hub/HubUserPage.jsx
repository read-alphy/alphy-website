import React, { Fragment, useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import HubFeedItem from '../FeedTabs/HubFeedItemElements/HubFeedItem'
import Loading from '../../components/Loading'
import CuratedCarouselItem from '../FeedTabs/CuratedCarouselItem'
import AddIcon from '@mui/icons-material/Add'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import LinkIcon from '@mui/icons-material/Link'
import { API_URL } from '../../constants'

export default function HubUserPage({
  currentUser,
  credit,
  tier,
  userArchipelagos,
  setUserLayout,
  setGlobalLayout,
  setSubmitLayout,
  mainShow,
  setMainShow,
  collapsed,
  loggedIn
}) {
  const [data, setData] = useState([])

  const [search, setSearch] = useState('')

  const [hasMorePersonal, setHasMorePersonal] = useState(false)
  const [isLoadingPersonal, setIsLoadingPersonal] = useState(
    loggedIn===true ? true : false
  )
  const [dataPersonal, setDataPersonal] = useState([])
  const [offsetPersonal, setOffsetPersonal] = useState(0)
  const [called, setCalled] = useState(false)

  const [hasMoreUploads, setHasMoreUploads] = useState(false)
  const [dataUploads, setDataUploads] = useState([])
  const [isLoadingUploads, setIsLoadingUploads] = useState(true)

  const [offsetBookmarks, setOffsetBookmarks] = useState(0)
  const [offsetUploads, setOffsetUploads] = useState(0)
  const [hasMoreBookmarks, setHasMoreBookmarks] = useState(false)
  const [dataBookmarks, setDataBookmarks] = useState([])
  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(true)

  const carouselRef = useRef(null)
  const rightButtonRef = useRef(null)
  const leftButtonRef = useRef(null)
  const [isForwardArrowVisible, setIsForwardArrowVisible] = useState(true)
  const [isBackwardArrowVisible, setIsBackwardArrowVisible] = useState(false)

  let limit = 16
  let calledAndEmpty

  const getDataPersonal = (
    offsetPersonal,
    firstTimePersonal,
    hasMorePersonal
  ) => {
    setIsLoadingPersonal(true)

    if (currentUser) {
      currentUser
        .getIdToken()
        .then(idtoken => {
          const params = {
            offset: offsetPersonal,
            limit,
            only_my: 'submits',
          }
          // if (search !== "") {
          //     params.q = search
          // }

          axios
            .get(`${API_URL}/sources/`, {
              params,
              headers: {
                'id-token': idtoken,
              },
            })
            .then(response => {
              setHasMorePersonal(!(response.data.length < limit))
              if (response.data.length > 0) {
                calledAndEmpty = false
              }
              if (firstTimePersonal) {
                setDataPersonal(response.data)
              } else {
                setDataPersonal([...dataPersonal, ...response.data])
              }
              setIsLoadingPersonal(false)
            })
        })
        .catch(error => {
          setIsLoadingPersonal(false)
        })
    }
  }

  const getDataBookmarks = (offsetBookmarks, firstTime, hasMoreBookmarks) => {
    setIsLoadingBookmarks(true)
    if (currentUser) {
      setIsLoadingBookmarks(true)
      currentUser
        .getIdToken()
        .then(idtoken => {
          const params = {
            offset: offsetBookmarks,
            limit,
            only_my: 'bookmarks',
          }
          // if (search !== "") {
          //     params.q = search
          // }
          axios
            .get(`${API_URL}/sources/`, {
              params,
              headers: {
                'id-token': idtoken,
              },
            })
            .then(response => {
              setHasMoreBookmarks(!(response.data.length < limit))
              if (response.data.length > 0) {
                calledAndEmpty = false
              }
              if (firstTime) {
                setDataBookmarks(response.data)
              } else {
                setDataBookmarks([...dataBookmarks, ...response.data])
              }
              setIsLoadingBookmarks(false)
            })
        })
        .catch(error => {
          setIsLoadingBookmarks(false)
        })
    }
  }

  const getDataUploads = (offsetUploads, firstTimeUploads, hasMoreUploads) => {
    setIsLoadingUploads(true)

    localStorage.setItem('search', search)

    if (currentUser) {
      setIsLoadingUploads(true)
      currentUser.getIdToken().then(idToken => {
        const params = {
          offset: offsetUploads,
          limit,
          only_my: 'uploads',
        }
        // if (search !== "") {
        //     params.q = search
        // }
        axios
          .get(`${API_URL}/sources/`, {
            params,
            headers: {
              'id-token': idToken,
            },
          })
          .then(response => {
            setHasMoreUploads(!(response.data.length < limit))
            if (firstTimeUploads) {
              setDataUploads(response.data)
            } else {
              setDataUploads([...dataUploads, ...response.data])
            }
            setIsLoadingUploads(false)
          })
      })
    }
  }

  if (currentUser !== null && called === false) {
    console.log('calling')

    getDataPersonal(0, true, hasMorePersonal)

    getDataBookmarks(0, true, hasMoreBookmarks)

    getDataUploads(0, true, hasMoreUploads)

    setCalled(true)
  }

  const loadMore = type => {
    if (type === 'personal') {
      setOffsetPersonal(offsetPersonal + 10)
      getDataPersonal(offsetPersonal + limit, false, true)
    } else if (type === 'bookmarks') {
      setOffsetBookmarks(offsetBookmarks + 10)
      getDataBookmarks(offsetBookmarks + limit, false, true)
    } else if (type === 'uploads') {
      setOffsetUploads(offsetUploads + 10)
      getDataUploads(offsetUploads + limit, false, true)
    }
  }

  function searchKeyword(array) {
    return array.filter(
      item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.creator_name.toLowerCase().includes(search.toLowerCase())
    )
  }

  function handleHubNavigation(type) {
    if (type == 'submit') {
      setUserLayout(false)
      setGlobalLayout(false)
      setSubmitLayout(true)
    } else if (type == 'global') {
      setUserLayout(false)
      setGlobalLayout(true)
      setSubmitLayout(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current
        const isScrollEnd =
          container.scrollLeft + container.clientWidth === container.scrollWidth
        setIsForwardArrowVisible(!isScrollEnd)
        setIsBackwardArrowVisible(container.scrollLeft > 0)
      }
    }

    // Attach scroll event listener
    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll)
    }

    // Clean up the event listener on component unmount
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scrollForward = () => {
    if (carouselRef.current) {
      const container = carouselRef.current

      const scrollAmount = 300

      carouselRef.current.scrollLeft += scrollAmount
    }
  }

  const scrollBackward = () => {
    if (carouselRef.current) {
      const container = carouselRef.current

      const scrollAmount = 300
      carouselRef.current.scrollLeft -= scrollAmount
    }
  }

  return (
    <div className="xl:max-w-[1200px] xl:ml-20 pt-20 p-4 md:ml-5 sm:pl-10">
      {currentUser && (
        <p className="text-2xl text-slate-700 dark:text-zinc-300  quicksand font-bold">
          Welcome to Your Hub!
        </p>
      )}

      {currentUser ? (
        <div className="mt-10">
          <p className="text-slate-700 dark:text-zinc-300 text-xl quicksand font-bold">
            Arcs
          </p>
          <div className="flex flex-row mt-10 ">
            <div className="xl:min-w-[1200px]  xl:max-w-[1200px]">
              <div className="w-full">
                <div className="w-full h-full container  lg:max-w-[900px] xl:max-w-[840px] 2xl:max-w-[1200px]  ">
                  <div className="relative ">
                    {/*   {userArchipelagos.length > 0 &&
                                            <button onClick={scrollBackward} ref={leftButtonRef} type="button" className={`left-arrow absolute top-0 left-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none ${isBackwardArrowVisible ? '' : 'hidden'
                                                }`}>
                                                <div className="rounded-full bg-zinc-200 bg-opacity-40 p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out ">
                                                    <ArrowBackIosNewIcon className="cursor-pointer text-slate-700 p-1 " />
                                                </div>
                                            </button>
                                        } */}
                    <div
                      className={`grid grid-cols-2 xsSm:grid-cols-3  xl:grid-cols-3 2xl:grid-cols-4 sm:gap-6 
                                        
                                
                                        
                                        gap-4  `}
                      ref={carouselRef}
                    >
                      <Link
                        href="/arc/createArc"
                        className="mt-2 ml-2 drop-shadow-lg min-h-[150px] max-h-[150px] min-w-[150px] max-w-[150px]  lg:min-h-[360px] lg:max-h-[360px] lg:min-w-[240px] lg:max-w-[240px] border border-2 bg-white dark:bg-mildDarkMode border dark:border-zinc-700 rounded-lg items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
                      >
                        <div>
                          <AddIcon
                            fontSize="large"
                            className="text-slate-700 dark:text-zinc-300 mb-4 "
                          />
                          <p className="text-slate-700 dark:text-zinc-300 text-l lg:text-xl quicksand font-bold">
                            Create An Arc
                          </p>
                          <p className="text-slate-700 dark:text-zinc-500 hidden lg:block text-sm px-5 font-normal mt-2">
                            Connect multiple audio content with AI.
                          </p>
                        </div>
                      </Link>

                      {userArchipelagos.map((item, index) => (
                        <div className="mt-2">
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

                    {/*  {userArchipelagos.length > 0 &&
                                            <button onClick={scrollForward} ref={rightButtonRef} type="button" className={`right-arrow absolute top-0 right-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none ${isForwardArrowVisible ? 'hidden lg:block' : 'hidden'
                                                }`}>
                                                <div className="rounded-full bg-zinc-200 bg-opacity-40 p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out dark:bg-mildDarkMode">
                                                    <ArrowForwardIosIcon className="cursor-pointer text-slate-700 p-1 " />
                                                </div>
                                            </button>
                                        } */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-10 mb-10"></div>

          <div className="mb-20">
            <div className="flex flex-row mt-20">
              <p className="text-slate-700 dark:text-zinc-300 text-xl mb-10 quicksand font-bold">
                Submissions
              </p>

              {/*    <button onClick={()=>setShowTab("myBookmarks")} className="mb-4 ml-2">
                                My Bookmarks
                    </button>
 */}
            </div>

            <div>
              <div
                className={`grid grid-cols-1 xs:grid-cols-2 ${
                  collapsed ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-3'
                } xl:grid-cols-4 2xl:grid-cols-5`}
              >
                {dataPersonal.length > 0 && (
                  <Link
                    href="/submit"
                    onClick={() => {
                      localStorage.setItem('newItem', 'link')
                    }}
                    className="md:mt-2 drop-shadow-lg  mb-6 xs:mb-0 ml-2 xs:ml-0 min-w-[320px] max-w-[320px]  xs:min-w-[100px] xs:max-w-[200px]  rounded-lg  h-[140px] xs:min-h-none xs:max-h-none border border-2 bg-white dark:bg-mildDarkMode border dark:border-zinc-700 items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
                  >
                    <div>
                      <LinkIcon
                        fontSize="medium"
                        className="text-slate-700 dark:text-zinc-300 mb-4 "
                      />
                      <p className="text-slate-700 dark:text-zinc-300 text-md md:text-l quicksand font-bold">
                        Submit A Link
                      </p>
                    </div>
                  </Link>
                )}
                {dataPersonal.length > 0 ? (
                  searchKeyword(dataPersonal).map(
                    (item, index) =>
                      index < offsetPersonal + 10 && (
                        <HubFeedItem item={item} index={index} />
                      )
                  )
                ) : called ? (
                  <div className="text-slate-700 dark:text-zinc-300 min-h-[20vh]">
                    {/*   <div href="/arc/createArc" className="min-h-[240px] max-h-[240px] min-w-[180px] max-w-[180px] border border-2 bg-white dark:bg-mildDarkMode border-dashed dark:border-zinc-700  ml-5 items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">

                                                        <div >
                                                            <AddIcon fontSize = "large" className="text-slate-700 dark:text-zinc-300 mb-4 "/>
                                                            <p className="text-slate-700 dark:text-zinc-300 text-xl">Submit a link</p>

                                                        </div>


                                                        </div> */}

                    <div className="font-averta-regular">
                      You don't have any submissions. Process your first online
                      conversation{' '}
                      <Link
                        href="/submit"
                        className="underline dark:text-greenColor text-green-400 cursor-pointer quicksand font-bold"
                        onClick={() => {
                          localStorage.setItem('newItem', 'link')
                        }}
                      >
                        here
                      </Link>
                      .
                    </div>
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
              <div>
                {offsetPersonal < dataPersonal.length &&
                  dataPersonal.length > 10 &&
                  searchKeyword(dataPersonal).length > 0 && (
                    <div className="w-full flex justify-center">
                      {
                        <button
                          className="justify-center flex text-blueLike dark:text-zinc-300 quicksand font-bold  mt-10 underline"
                          onClick={() => loadMore('personal')}
                        >
                          {'Load more'}
                        </button>
                      }
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-10 mb-10"></div>

          <div className="min-h-[300px]">
            <div className="">
              <p className="text-slate-700 dark:text-zinc-300 text-xl mb-10 quicksand font-bold">
                Bookmarks
              </p>
              <div>
                {dataBookmarks.length > 0 ? (
                  <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {searchKeyword(dataBookmarks).map(
                      (item, index) =>
                        index < offsetBookmarks + 10 && (
                          <HubFeedItem
                            item={item}
                            index={index}
                            myBookmarks={true}
                            currentUser={currentUser}
                          />
                        )
                    )}
                  </div>
                ) : called ? (
                  <div className="text-slate-700 dark:text-zinc-300 min-h-[20vh] font-averta-regular">
                    You don't have any bookmarks.{' '}
                    <Link
                      href="/explore"
                      className="text-indigo-400 underline cursor-pointer quicksand font-bold"
                    >
                      Discover
                    </Link>{' '}
                    the content other users unlocked with Alphy.
                  </div>
                ) : (
                  <Loading />
                )}
                {offsetBookmarks < dataBookmarks.length &&
                  dataBookmarks.length > 0 &&
                  searchKeyword(dataBookmarks).length > 0 &&
                  hasMoreBookmarks && (
                    <div className="w-full flex justify-center">
                      {
                        <button
                          className="justify-center flex text-blueLike dark:text-zinc-300 font-semibold  mt-10 underline"
                          onClick={() => loadMore('bookmarks')}
                        >
                          {'Load more'}
                        </button>
                      }
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-10 mb-10"></div>

          <div className="mt-20">
            <p className="mb-4">
              <p className="text-slate-700 dark:text-zinc-300 text-xl mb-10 quicksand">
                Uploads
              </p>
            </p>
            {}
            {dataUploads.length > 0 ? (
              <div
                className={`grid grid-cols-1  xs:grid-cols-2 ${
                  collapsed
                    ? ' md:grid-cols-2 lg:grid-cols-3'
                    : 'mg:grid-cols-2 lg:grid-cols-2'
                }  xl:grid-cols-4 pl-4`}
              >
                <Link
                  href="/submit"
                  onClick={() => {
                    localStorage.setItem('newItem', 'upload')
                  }}
                  className="drop-shadow-lg  mb-4 xs:mb-0  xs:ml-0 min-w-[320px] max-w-[320px]  xs:min-w-[100px] xs:max-w-[200px] h-[140px]  rounded-lg border border-2 bg-white dark:bg-mildDarkMode  border dark:border-zinc-700 items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  <div>
                    <CloudUploadIcon
                      fontSize="medium"
                      className="text-slate-700 dark:text-zinc-400 mb-4 "
                    />
                    <p className="text-slate-700 dark:text-zinc-300 text-md md:text-l quicksand font-bold">
                      Upload A Recording
                    </p>
                  </div>
                </Link>
                {searchKeyword(dataUploads).map((item, index) => (
                  <HubFeedItem item={item} index={index} />
                ))}
              </div>
            ) : called ? (
              <div className="text-slate-700 dark:text-zinc-300 min-h-[20vh]">
                {data.length === 0 && tier !== 'premium' && called && (
                  <p className="font-averta-regular ">
                    You don't have any uploads. Upgrade to{' '}
                    <Link
                      href="/account"
                      className="underline dark:text-greenColor text-green-400 cursor-pointer quicksand font-bold"
                    >
                      premium plan
                    </Link>{' '}
                    to upload your own files.
                  </p>
                )}

                {data.length === 0 && tier === 'premium' && called && (
                  <p className="font-averta-regular">
                    You don't have any uploads.{' '}
                    <Link
                      href={'/submit'}
                      onClick={() => {
                        localStorage.setItem('newItem', 'upload')
                      }}
                      className="underline dark:text-greenColor text-green-400 cursor-pointer quicksand font-bold"
                    >
                      Process your first file now!
                    </Link>
                  </p>
                )}
              </div>
            ) : (
              <Loading />
            )}

            {offsetUploads < dataUploads.length &&
              dataUploads.length > 0 &&
              searchKeyword(dataUploads).length > 0 &&
              hasMoreUploads && (
                <div className="w-full flex justify-center">
                  {
                    <button
                      className="justify-center flex text-blueLike dark:text-zinc-300 font-semibold  mt-10 underline"
                      onClick={() => loadMore('uploads')}
                    >
                      {'Load more'}
                    </button>
                  }
                </div>
              )}
          </div>
        </div>
      ) : (
        <div>
         {/*  <button
            onClick={() => handleHubNavigation('global')}
            className="text-zinc-700 dark:text-zinc-300 text-lg mt-20 cursor-pointer"
          >
            <KeyboardArrowLeftIcon fontSize="small" className="" />
            <span className="text-sm quicksand">Go Back</span>
          </button> */}
          <div className="text-md text-zinc-700 dark:text-zinc-300 mx-auto mt-20 quicksand">
            <a
              href="/u/login"
              className="dark:text-greenColor text-green-400 underline quicksand"
            >
              Sign in
            </a>{' '}
            or{' '}
            <a
              href="/u/register"
              className="dark:text-greenColor text-green-400 underline quicksand"
            >
              {' '}
              create an account
            </a>{' '}
            to access this page.
          </div>
        </div>
      )}
    </div>
  )
}
