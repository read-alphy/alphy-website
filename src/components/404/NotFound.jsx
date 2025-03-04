import React, { useState, useEffect } from 'react'
import SideFeed from "../SideFeed/SideFeed"
import Head from 'next/head'
import NotFoundInfo from './NotFoundInfo'

export default function NotFound({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  setShowWelcomeForm,
  showWelcomeForm,
  userArcs,
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

      <div className="flex flex-row bg-white dark:bg-darkMode">
        <SideFeed 
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          tier={tier}
          sandboxHistory={sandboxHistory}
          source_id={source_id}
        />

        <div
          className={`${
            collapsed ? 'scrolling' : 'scrolling'
          } w-full max-h-[90vh] sm:max-h-[100vh] ${
            collapsed ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
        >
          <NotFoundInfo
            tier={tier}
            currentUser={currentUser}
            showWelcomeForm={showWelcomeForm}
            setShowWelcomeForm={setShowWelcomeForm}
            userArcs={userArcs}
          />
        </div>
      </div>
    </div>
  )
}
