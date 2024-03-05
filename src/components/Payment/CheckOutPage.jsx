import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'

import Loading from '../Loading'


import CheckOutPageInfo from './CheckOutPageInfo'

export default function CheckOutPage({
  currentUser,
  collapsed,
  setCollapsed,
  hasActiveSub,
  setShowWelcomeForm,
  showWelcomeForm,
  stripePromise,
  userArchipelagos,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
  setLoggedIn
}) {
  const [clientSecret, setClientSecret] = useState('')

  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!windowSizeChecked) {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
      setWindowSizeChecked(true)
    }
  })

  useEffect(() => {
    setIsLoading(false)
  })

  return (
    <div className="scrolling dark:bg-darkMode dark:text-zinc-300">

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
          <div className={`hidden sm:block`}>
            <SideFeed 
loggedIn={loggedIn}
setLoggedIn={setLoggedIn}
              currentUser={currentUser}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              source_id={source_id}
              hasActiveSub={hasActiveSub}
              sandboxHistory={sandboxHistory}
              setSandboxHistory={setSandboxHistory}
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
              <SideFeed 
loggedIn={loggedIn}
setLoggedIn={setLoggedIn}
                currentUser={currentUser}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                source_id={source_id}
                hasActiveSub={hasActiveSub}
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
          {isLoading ? (
            <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
          ) : (
            <CheckOutPageInfo
              stripePromise={stripePromise}
              hasActiveSub={hasActiveSub}
              currentUser={currentUser}
              showWelcomeForm={showWelcomeForm}
              setShowWelcomeForm={setShowWelcomeForm}
              userArchipelagos={userArchipelagos}
              clientSecret={clientSecret}
              setClientSecret={setClientSecret}
              

            />
          )}
        </div>
      </div>
    </div>
  )
}
