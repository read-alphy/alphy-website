import React, { useState, useEffect } from 'react'
import SideFeedReworked from '../components/ArticleComponents/SideFeedReworked'
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { useLocation, useNavigate } from 'react-router-dom'

import Loading from '../components/Loading'

import { Helmet } from 'react-helmet'
import WelcomePageInfo from './WelcomePageInfo'

function WelcomePage({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  customerID,
  credit,
}) {
  const location = useLocation()
  const navigate = useNavigate()

  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  const [subCalled, setSubCalled] = useState(false)

  useEffect(() => {
    if (!windowSizeChecked) {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
      setWindowSizeChecked(true)
    }
  })

  if ((tier !== undefined || tier !== null) && subCalled === false) {
    setSubCalled(true)
    setIsLoading(false)
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="scrolling dark:bg-darkMode dark:text-zinc-300">
      <Helmet>
        <title>Alphy - Account</title>
      </Helmet>
      <div
        className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row bg-white dark:bg-darkMode ">
        {/* {collapsed==true && 
              <div className="flex w-full  hidden lg:flex lg:h-[92vh] overflow-hidden bg-zinc-100 dark:bg-mildDarkMode min-w-[32px] max-w-[32px]">
              <div className={`hidden md:flex `}>
                  <button onClick={handleCollapse }>
  
          
              <svg className={`${!collapsed && "rotate-180"} opacity-30 dark:opacity-80`}  width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
  
              </button			>
              </div> 
  
              </div>
              } */}
        {
          <div className={`flex hidden sm:block dark:bg-mildDarkMode`}>
            <SideFeedReworked
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              source_id={source_id}
              tier={tier}
            />
          </div>
        }

        <div
          className={`fixed top-0 z-50 transition origin-top-right transform sm:hidden w-full shadow-lg bg-zinc-100 ${
            collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-white'
          }`}
        >
          <div className="rounded-lg rounded-t-none shadow-lg">
            <div className="h-screen">
              <SideFeedReworked
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                source_id={source_id}
                tier={tier}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            collapsed ? 'scrolling' : 'scrolling'
          } md:px-0  w-full max-h-[90vh] sm:max-h-[100vh] ${
            collapsed ? 'hidden' : ' overflow-hidden'
          }}`}
        >
          {isLoading ? (
            <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
          ) : (
            <WelcomePageInfo
              tier={tier}
              credit={credit}
              currentUser={currentUser}
              customerID={customerID}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default WelcomePage