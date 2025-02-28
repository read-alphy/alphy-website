"use client"

import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LogIn as LoginIcon, Menu, X } from 'lucide-react'

// Import shadcn sidebar components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
  useSidebar
} from '../ui/sidebar'

// Import SVG icons
import { HubIcon, CollapseIcon, ExploreIcon, NewIcon, CreationsIcon, SignInIcon, ExpandIcon } from './svgs'
import Logo from '../../../public/img/ALPHY_BG_REMOVED_LIGHT.png'
import LogoBlack from '../../../public/img/ALPHY_BG_REMOVED_DARK.png'

// Import components
import FeedItem from '../FeedTabs/FeedItem'
import Footer from './Footer'
import HubFeedItem from '../FeedTabs/HubFeedItemElements/HubFeedItem'

import { inputMessages } from '../Content/Sandbox/messageBank'

// Custom styles for sidebar width
const sidebarStyles = {
  "--sidebar-width": "200px",
  "--sidebar-width-icon": "50px"
};

export default function SideFeed({
  collapsed,
  setCollapsed,
  userLayout,
  loggedIn,
  setLoggedIn,
  dataArc,
  tier,
  sandboxHistory,
  currentUser,
  isArc
}) {
  const [called, setCalled] = useState(false)
  const carouselRef = useRef(null)
  const auth = useAuth()
  const router = useRouter()
  const [mobileScreen, setMobileScreen] = useState(false)

  // Initialize state for grouped data and visibility
  const [groupedData, setGroupedData] = useState([])
  const [visibleGroups, setVisibleGroups] = useState({})

  useEffect(() => {
    setTimeout(() => {
      if(window.innerWidth < 640){
        setMobileScreen(true)
      }
      setCalled(true)
    }, 300)
  }, [])

  // Add keyboard shortcut for toggling sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+B or Cmd+B
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setCollapsed(!collapsed);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [collapsed, setCollapsed]);

  // Group sandbox history data
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

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current
        const isScrollEnd =
          container.scrollLeft + container.clientWidth === container.scrollWidth
      }
    }

    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  // Handle sign out
  const handleSignOut = async () => {
    try {
      auth.logout()
      localStorage.setItem('logged in', 'false')
      localStorage.setItem('idToken', null)
      localStorage.setItem('tier', '')
      setLoggedIn(false)

      router.push('/')
      window.location.reload()
    } catch (error) {
      console.log('sign out error', error)
    }
  }

  // Navigate to source
  const seeInSource = item => {
    sessionStorage.setItem('fillPrompt', JSON.stringify(item))
    router.push(`/${item.source_type}/${item.source_id}`)
  }

  // Toggle group visibility
  const toggleGroupVisibility = index => {
    setVisibleGroups(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  // Handle sidebar collapse state

  
  // Navigation items with icons
  const navItems = [
    { 
      icon: NewIcon, 
      label: "New", 
      href: "/submit", 
      isActive: router.asPath.includes('/submit'),
      className: `text-slate-700 ${!collapsed ? 'ml-2' : ''} hover:scale-[102%] shadow-md transition duration-300 ease-in-out bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-200 via-indigo-100 to-sky-200 text-slate-700 dark:text-slate-700 rounded-lg max-w-[140px] flex flex-row quicksand font-extrabold`
    },
    { icon: HubIcon, label: "My Hub", href: "/myhub", isActive: userLayout },
    { icon: ExploreIcon, label: "Explore", href: "/explore", isActive: router.asPath.includes('/explore') },
    { icon: CreationsIcon, label: "My Creations", href: "/history", isActive: router.asPath.includes('/history'), requiresAuth: true },
    { icon: SignInIcon, label: "Sign In", href: "/u/login", requiresGuest: true, className: "text-green-400 dark:text-green-200" }
  ];


  
  
  return (
    <div className="flex dark:bg-darkMode" id="side-feed">
      <SidebarProvider className="bg-white">
        <Sidebar 
          className="dark:bg-mildDarkMode dark:text-zinc-300 bg-white sm:bg-slate-50 min-h-[100vh] sm:max-h-[100vh]"
          collapsible="icon"
          open={!collapsed}
          onOpenChange={(isOpen) => setCollapsed(!isOpen)}
          style={sidebarStyles}
        >
          <SidebarHeader className="pt-4 sm:pt-8">
            <div className="flex w-items-center font-bold relative justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Link href="/">
                  <Image
                    src={Logo}
                    width={30}
                    className="hidden dark:block"
                    alt="Alphy Logo"
                  />
                  <Image
                    src={LogoBlack}
                    width={30}
                    className="dark:hidden opacity-80"
                    alt="Alphy Logo"
                  />
                  </Link>
                  <div className="flex flex-row items-center">
                    {!collapsed && (
                      <Link href="/">
                        <h2 className="ml-1 text-xl quicksand font-bold">ALPHY</h2>
                      </Link>
                    )}
                  </div>
                </div>
                
                <SidebarTrigger 
                  disabled={called === false}
                  onClick={() => setCollapsed(!collapsed)} 
                  className={`${collapsed ? 'absolute top-0 left-0 opacity-0 ' : 'flex text-slate-700 dark:text-slate-700 cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 hover:transition hover:duration-200 hover:ease-in-out p-1 rounded-full ml-1'}`}
                />
              </div>
              
             
            </div>
          </SidebarHeader>

          <SidebarContent className="pt-2"
           >
            <div className="flex flex-col w-full justify-start">
              <SidebarMenu className="">
                {navItems.map((item, index) => (
                  ((item.requiresAuth && currentUser) || 
                   (item.requiresGuest && !loggedIn) || 
                   (!item.requiresAuth && !item.requiresGuest)) && (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton
                        asChild
                        isActive={item.isActive}
                        onClick={() => {
                          if (mobileScreen) {
                            setCollapsed(true)
                          }
                        }}
                        className={`py-2 mt-2 text-sm ${item.className || ''}`}
                        tooltip={item.label}
                      >
                        <Link href={item.href}>
                          <item.icon />
                            <p className={`quicksand font-semibold text-sm shadow-none bg-transparent  ${item.label === "My Creations" ? "pl-1" : ""} ${item.className || ''} ${item.label === "New" ? "-ml-[6px]" : ""}`}>
                              {item.label}
                            </p>
                      
                        </Link>
                      </SidebarMenuButton>
                      
                      {item.label === "My Creations" && currentUser &&  groupedData.length > 0 && (
                        <div className={`select-none relative ml-5 mt-2 ${collapsed && 'hidden'}`}>
                          {groupedData.map((group, index) => (
                            <div key={index} className="relative flex flex-col group cursor-pointer">
                              <p
                                className="text-slate-700 h-[20px] overflow-hidden dark:text-zinc-300 text-xs hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-md p-1 quicksand"
                                onClick={() => toggleGroupVisibility(index)}
                              >
                                {group[0].title}
                              </p>
                              <div className="pl-2 text-zinc-400 dark:text-zinc-400 font-normal">
                                {group.map((subItem, subIndex) => (
                                  <p
                                    key={subIndex}
                                    onClick={() => seeInSource(subItem)}
                                    className={`text-xs h-[20px] rounded-lg quicksand font-semibold overflow-hidden transition-all duration-200 ease-in-out hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-md ${
                                      visibleGroups[index]
                                        ? 'max-h-96 p-1'
                                        : 'max-h-0 p-0'
                                    }`}
                                  >
                                    {typeof subItem.request.command === 'object'
                                      ? subItem.request.command.prompt
                                      : inputMessages.find(
                                          obj =>
                                            obj.command_type ===
                                            subItem.request.command
                                        ).title}
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </SidebarMenuItem>
                  )
                ))}
              </SidebarMenu>
            </div>

           {/*  {dataArc !== undefined &&
            dataArc.length > 0 &&
            location.pathname.includes('/arc/createArc') == false &&
            location.pathname.includes('/arc/editArc') == false ? (
              <div>
                <div className="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-4"></div>
                <p className="text-slate-700 dark:text-zinc-300 mt-6 ml-4 mb-2 text-sm quicksand font-semibold">
                  Sources
                </p>
                <div className="overflow-y-scroll max-h-[65vh] 2xl:max-h-[66vh]">
                  <div className="overflow-x-hidden hidden md:block lg:hidden">
                    {dataArc.map((item, index) => (
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
                    {dataArc.length > 0
                      ? dataArc.map((item, index) => (
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
            ) : null} */}
          </SidebarContent>

          <SidebarFooter>
            <Footer
              currentUser={currentUser}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              handleSignout={handleSignOut}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              tier={tier}
            />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      </SidebarProvider>
    </div>
  )
}
