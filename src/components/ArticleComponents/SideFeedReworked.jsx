import axios from 'axios'
import React, { useState, useRef, useCallback } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import ExploreIcon from '@mui/icons-material/Explore'
import AddIcon from '@mui/icons-material/Add'
import FeedItem from './FeedTabs/FeedItem'
import HubIcon from '@mui/icons-material/Hub'
import FooterReworked from './FooterReworked'
import { useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login'
import LastPageIcon from '@mui/icons-material/LastPage'
import Logo from '../../img/ALPHY_BG_REMOVED_LIGHT.png'
import LogoBlack from '../../img/ALPHY_BG_REMOVED_DARK.png'
import { Link } from 'react-router-dom'
import HubFeedItem from '../../routes/Hub/HubFeedItemElements/HubFeedItem'
import { useLocation } from 'react-router-dom'
import HistoryIcon from '@mui/icons-material/History'
import { inputMessages } from './Sandbox/messageBank'

function SideFeedReworked({
  collapsed,
  setCollapsed,
  userLayout,
  submitLayout,
  globalLayout,
  dataArchipelago,
  tier,
  sandboxHistory,
  currentUser,
}) {
  const [called, setCalled] = useState(false)
  const [isDragging, setIsDragging] = useState(false);
  const [sideFeedWidth, setSideFeedWidth] = useState(200);
  const [sliceSize, setSliceSize] = useState(15)


  const location = useLocation()
  const carouselRef = useRef(null)
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      setCalled(true)
    }, 1000)
  }, [])

  const [groupedData, setGroupedData] = useState([])

  const [visibleGroups, setVisibleGroups] = useState({})



  const toggleGroupVisibility = index => {
    setVisibleGroups(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  useEffect(() => {
    if (sandboxHistory === undefined) {
      return
    }
    const groupBySourceId = sandboxHistory.slice(0, 10).reduce((acc, item) => {
      const { source_id, created_at } = item
      if (!acc[source_id]) {
        acc[source_id] = []
      }
      acc[source_id].push(item)
      return acc
    }, {})

    const sortedGroups = Object.values(groupBySourceId).sort(
      (a, b) =>
        new Date(
          b.sort(
            (x, y) => new Date(y.created_at) - new Date(x.created_at)
          )[0].created_at
        ) -
        new Date(
          a.sort(
            (x, y) => new Date(y.created_at) - new Date(x.created_at)
          )[0].created_at
        )
    )

    setGroupedData(sortedGroups)
  }, [sandboxHistory])

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current
        const isScrollEnd =
          container.scrollLeft + container.clientWidth === container.scrollWidth
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


 
  const onMouseDown = (e) => {
    // Only left mouse button
    
    if (e.button !== 0) return;
    setIsDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      // Set the width to the new mouse position
      if(e.clientX < 200|| e.clientX > 350){return}
      setSideFeedWidth(e.clientX);
      
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };  

  // Add event listeners when dragging starts and remove them when it ends
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
    
    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging]); // Only re-run the effect if the isDragging state changes


  const handleSignOut = async () => {
    try {
      auth.logout()
      localStorage.setItem('logged in', 'false')
      localStorage.setItem('idToken', null)
      localStorage.setItem('tier', '')

      navigate('/')
      window.location.reload()
    } catch (error) {
      console.log('sign out error', error)
    }
  }
useEffect (() => {

  if(window.innerWidth < 640){
    setSideFeedWidth(640)
  }
  else{
    setSideFeedWidth(200)

  }
},[window.innerWidth])
 

  const seeInSource = item => {
    sessionStorage.setItem('fillPrompt', JSON.stringify(item))

    navigate(`/${item.source_type}/${item.source_id}`)
  }

  return (
    <div className="flex dark:bg-darkMode"
   
    id="side-feed"
    >
    <div
      id="side-feed"
      
      className={` font-averta-semibold dark:bg-mildDarkMode  dark:text-zinc-300 bg-white sm:bg-slate-50 min-h-[100vh] sm:max-h-[100vh] ${
        collapsed ? 'w-[60px] max-w-[60px]' : `w-full`
      } flex flex-col transition-all duration-300 ease-in-out	overflow-y-scroll `}
      style ={{width : `${sideFeedWidth}px`}}
    >
      {!collapsed ? (
        <div className="flex flex-col flex-grow ">
          <div className={`flex w-full items-center font-bold pt-4 sm:pt-8 relative justify-space-between`}>
            <Link
              to="/"
              className="text-zinc-800 dark:text-gray-200 pl-4 sm:pl-6 "
            >
              <div className="flex-row flex">
                <img src={Logo} width={40} className="hidden dark:block"></img>
                <img
                  src={LogoBlack}
                  width={40}
                  className="dark:hidden opacity-80 "
                ></img>
                <h1 className="ml-1 text-2xl mt-1 ">ALPHY</h1>
              </div>
            </Link>
            <div className="hidden md:flex w-full justify-end items-end ">
              {/* <LastPageIcon onClick={() => setCollapsed(true)} fontSize="large" className="rotate-180 ml-16  text-zinc-500 dark:text-zinc-500 cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 hover:transition hover:duration-200 hover:ease-in-out p-1" /> */}
              <svg
                onClick={() => setCollapsed(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-chevron-left ml-16  text-zinc-500 dark:text-zinc-500 cursor-pointer rounded-full transition transform hover:-translate-x-1 duration-300 ease-in p-1 mr-1"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>

            <div className="absolute right-0 mr-6 -mt-1">
              <div
                id={'nav-icon3'}
                onClick={() => setCollapsed(!collapsed)}
                className={` cursor-pointer md:hidden ${
                  collapsed ? ' ' : ' open '
                } text-zinc-500 dark:text-zinc-500`}
              >
                <span className="bg-zinc-700 dark:bg-zinc-200"></span>
                <span className="bg-zinc-700 dark:bg-zinc-200"></span>
                <span className="bg-zinc-700 dark:bg-zinc-200"></span>
                <span className="bg-zinc-700 dark:bg-zinc-200"></span>
              </div>
            </div>
          </div>

          <div className="pt-10 md:pl-5">
            <div className="flex flex-col w-full justify-start px-2 m">
              <Link
                to="/submit"
                className={`text-zinc-700  drop-shadow-lg px-2 py-2 transition duration-300 ease-in-out    text-sm sm:text-md bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-100 via-blue-100 to-sky-200   text-zinc-600 dark:text-zinc-700 rounded-lg  text-md max-w-[140px] flex flex-row `}
              >
                <AddIcon fontSize="small" className="mr-3" />
                <p className="font-averta-semibold">New</p>
              </Link>

              <div className="flex flex-col w-full justify-start px-3 mt-2 ">
                <Link
                  to="/myhub"
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      setCollapsed(true)
                    }
                  }}
                  className={` flex flex-row py-3 mt-2   text-sm sm:text-md  ${
                    userLayout
                      ? 'text-zinc-700 dark:text-zinc-200'
                      : 'text-zinc-500 dark:text-zinc-300'
                  } dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out`}
                >
                  <svg
                    className="mr-3 mt-0.5 feather feather-layers "
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  <p className="font-averta-semibold">My Hub</p>
                </Link>

                <Link
                  to="/explore"
                  onClick={() => {
                    if (window.innerWidth < 640) {
                      setCollapsed(true)
                    }
                  }}
                  className={`${
                    window.location.href.includes("/explore")
                      ? 'text-zinc-700 dark:text-zinc-200'
                      : 'text-zinc-500 dark:text-zinc-300'
                  } flex flex-row py-3 mt-2  text-sm sm:text-md  dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-3 mt-0.5 feather feather-compass"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>

                  <p className="font-averta-semibold">Explore</p>
                </Link>

                {/* 

                
             <Link
                    to="/arcs"
                    onClick={() => {
                        if (window.innerWidth < 640) {
                        setCollapsed(true)
                        }
                    }}
                    className={`  w-full  mt-2  py-3 flex flex-row text-sm sm:text-md  text-zinc-700 dark:text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-200 transition duration-300 ease-in-out`}
                    >
                    <svg
                        className="mr-3 mt-0.5 feather feather-message-square"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <p className="font-averta-semibold text-sm ml-0.5">Arcs</p>
                    </Link> */}

                {currentUser && (
                  <div className="flex flex-col">
                    <Link
                      to="/history"
                      className={`${
                        window.location.href.includes("/history") ? "text-zinc-700 dark:text-zinc-200" : "text-zinc-500 dark:text-zinc-300"} flex flex-row py-3 mt-2  text-sm sm:text-md  -pr-0.5  hover:text-zinc-500 dark:hover:text-zinc-100 transition duration-300 ease-in-out`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5 text-zinc-500 dark:text-zinc-300 mr-2 "
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>

                      {/* <HistoryIcon strokeWidth={"1.5"} className="text-zinc-500 dark:text-zinc-300 mr-2  " /> */}
                      <p  >
                        History
                      </p>
                    </Link>

                    {groupedData.length > 0 && (
                      <div className="select-none relative">
                    
                        {groupedData.map((item, index) => (
                          <div className="relative flex flex-col group cursor-pointer">
                            <p
                              className="text-zinc-500 h-[20px] overflow-hidden dark:text-zinc-300 text-xs hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-md p-1"
                              onClick={() => toggleGroupVisibility(index)}
                            >
                              {item[0].title}
                            </p>
                            <div className="pl-2 text-zinc-400 dark:text-zinc-400 font-normal">
                              {item.map(subItem => (
                                <p
                                  onClick={() => seeInSource(subItem)}
                                  className={`text-xs h-[20px] rounded-lg font-averta-semibold overflow-hidden transition-all duration-200 ease-in-out hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-md ${
                                    visibleGroups[index]
                                      ? 'max-h-96 p-1 '
                                      : 'max-h-0 p-0'
                                  }`}
                                >
                                  
                          
                                        

                                        
                                  {typeof subItem.request.command === 'object'
                                    ? subItem.request.command.prompt
                                    : inputMessages
                                        .find(
                                          obj =>
                                            obj.command_type ===
                                            subItem.request.command
                                        )
                                        .title}
                                </p>
                              ))}
                            </div>
                          </div>
                        ))}
                   

                      </div>
                    )}

                    
                  </div>
                )}

                {currentUser === null && called === true && (
                  <Link
                    className="text-zinc-500 dark:text-zinc-300 hover:text-slate-400 duration-200 transition flex flex-row py-3 mt-2 -ml-1 text-sm sm:text-md dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out"
                    to="/u/login"
                  >
                    <LoginIcon
                      className="mr-3 text-green-300 dark:text-green-200"
                      fontSize="small"
                    />
                    <p className="text-green-400 dark:text-green-200 ">
                      Sign In
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {dataArchipelago !== undefined &&
          dataArchipelago.length > 0 &&
          location.pathname.includes('/arc/createArc') == false &&
          location.pathname.includes('/arc/editArc') == false ? (
            <div>
              <div className="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-4"></div>
              <p className="text-zinc-700 dark:text-zinc-300 mt-10 ml-4 mb-2  text-l">
                Sources
              </p>
              <div
                className={`overflow-y-scroll ${
                  collapsed
                    ? 'max-h-[55vh] 2xl:max-h-[66vh]'
                    : 'max-h-[65vh] 2xl:max-h-[66vh]'
                }`}
              >
                <div className="overflow-x-hidden hidden md:block lg:hidden">
                  {dataArchipelago.map((item, index) => (
                    <HubFeedItem
                      sideFeed={true}
                      key={index}
                      item={item.source}
                      setCollapsed={setCollapsed}
                      myBookmarks={false}
                    />
                  ))}
                </div>

                <div className="overflow-x-hidden md:hidden lg:block">
                  {dataArchipelago.length > 0
                    ? dataArchipelago.map((item, index) => (
                        <FeedItem
                          sideFeed={true}
                          key={index}
                          item={item.source}
                          setCollapsed={setCollapsed}
                          myBookmarks={false}
                        />
                      ))
                    : null}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-grow justify-end items-end w-full">
              <FooterReworked
                currentUser={currentUser}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                handleSignout={handleSignOut}
                tier={tier}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col flex-grow">
            <div className={`flex items-center font-bold pt-10 pl-0.5`}>
              <button
                onClick={() => setCollapsed(false)}
                className="text-zinc-800 dark:text-gray-200 "
              >
                <div className="flex-row flex">
                  <img
                    src={Logo}
                    width={50}
                    className="hidden dark:block"
                  ></img>
                  <img
                    src={LogoBlack}
                    width={50}
                    className="dark:hidden opacity-80 "
                  ></img>

                  <div className="absolute z-50 pl-1 pt-1">
                    <button className="opacity-0 hover:opacity-100 hover:text-sky-800 dark:hover:text-zinc-800 hover:block text-zinc-500 dark:text-zinc-800 cursor-pointer rounded-full hover:bg-sky-100 dark:hover:bg-white hover:transition  hover:ease-in-out duration-300 p-1 ">
                      <svg
                        onClick={() => setCollapsed(true)}
                        className="feather feather-chevron-left  rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              </button>
            </div>

            <div className="pt-16 ">
              <div className="flex flex-col w-full justify-start ">
                <div className="pl-2">
                  <Link
                    to="/submit"
                    className={`text-zinc-700 transition duration-300 ease-in-out rounded-full  px-2 py-2 dark:text-zinc-200 dark:hover:text-white text-md`}
                  >
                    <AddIcon className="mb-1" fontSize="small" />
                  </Link>
                </div>

                <Link
                  to="/myhub"
                  className={` pl-4 flex flex-row py-3 mt-6 text-zinc-500 dark:text-zinc-300	 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-white  transition duration-300 ease-in-out`}
                >
                  <svg
                    className="mr-3 mt-0.5 feather feather-layers "
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </Link>
                <Link
                  to="/"
                  className={` pl-4 text-zinc-500 dark:text-zinc-300 flex flex-row py-3 mt-6 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-white transition duration-300 ease-in-out`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-3 mt-0.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-compass"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                </Link>
                {localStorage.getItem('logged in') === 'true' ? null : (
                  <Link
                    className="pl-4 text-zinc-500 dark:text-zinc-300 hover:text-slate-400 duration-200 transition flex flex-row py-3 mt-6 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-200 transition duration-300 ease-in-out"
                    to="/u/login"
                  >
                    <LoginIcon
                      className="mr-3 text-green-300 dark:text-green-200"
                      fontSize="small"
                    />
                  </Link>
                )}
              </div>
            </div>

            <div className="flex flex-grow justify-end items-end w-full mt-4 pb-4">
              <FooterReworked
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                handleSignout={handleSignOut}
                currentUser={currentUser}
              />
            </div>
          </div>
        </div>
      )}
       
    </div>
    <div
          className=" hidden sm:flex w-1 cursor-col-resize  bg-transparent   "
          
          onMouseDown={onMouseDown}>
          {/* This is the draggable area */}
        </div>
    </div>
  )
}
export default SideFeedReworked
