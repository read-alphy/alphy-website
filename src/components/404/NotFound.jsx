import React, { useState, useEffect } from 'react'
import SideFeed from "../SideFeed/SideFeed"
// import ArticleCreator from "./ArticleComponents/ArticleCreator"


import Head from 'next/head'


import NotFoundInfo from './NotFoundInfo'

export default function NotFound({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  setShowWelcomeForm,
  showWelcomeForm,
  userArchipelagos,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
  setLoggedIn,
}) {
  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)

  

  useEffect(() => {
    if (!windowSizeChecked) {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
      setWindowSizeChecked(true)
    }
  })

  return (
    <div className="scrolling dark:bg-darkMode dark:text-zinc-300">
      <Head>
        <title>Alphy - Not Found :( </title>
      </Head>
      <div
        className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row bg-white dark:bg-darkMode ">
        {/* 	<div className="flex w-full  hidden lg:flex lg:h-[92vh] overflow-hidden bg-zinc-100 dark:bg-mildDarkMode min-w-[32px] max-w-[32px]">
			<div className={`hidden md:flex `}>
				<button onClick={handleCollapse }>

		
			<svg className={`${!collapsed && "rotate-180"} opacity-30 dark:opacity-80`}  width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>

			</button			>
			</div> 

			</div> */}

        {
          <div className={`hidden lg:block`}>
            <SideFeed
              loggedIn = {loggedIn}
              setLoggedIn = {setLoggedIn}
                currentUser={currentUser}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                source_id={source_id}
                
                tier={tier}
                sandboxHistory={sandboxHistory}
                setSandboxHistory={setSandboxHistory}
            />
          </div>
        }

        <div
          className={`fixed top-0 z-50 transition origin-top-right transform lg:hidden w-full shadow-lg bg-zinc-100 ${
            collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-white'
          }`}
        >
          <div className="rounded-lg rounded-t-none shadow-lg">
            <div className="h-screen">
              <SideFeed
                loggedIn = {loggedIn}
                setLoggedIn = {setLoggedIn}
                  currentUser={currentUser}
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  source_id={source_id}
                  
                  tier={tier}
                  sandboxHistory={sandboxHistory}
                  setSandboxHistory={setSandboxHistory}
              />
            </div>
          </div>
        </div>

        <div
          className={`${
            collapsed ? 'scrolling' : 'scrolling'
          } md:px-0  w-full max-h-[90vh] sm:max-h-[100vh] ${
            collapsed ? 'hidden' : ' max-h-[100vh] overflow-hidden'
          }}`}
        >
        
            <NotFoundInfo
              tier={tier}
              currentUser={currentUser}
              showWelcomeForm={showWelcomeForm}
              setShowWelcomeForm={setShowWelcomeForm}
              userArchipelagos={userArchipelagos}
            />
          
        </div>
      </div>
    </div>
  )
}

