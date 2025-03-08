import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'
import Loading from '../Loading'
import axios from 'axios'
import AuthInfo from './AuthInfo'

function Auth({
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
  setLoggedIn
}) {
  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
      <div className="flex flex-row bg-white dark:bg-darkMode">
        <SideFeed 
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          source_id={source_id}
          tier={tier}
          sandboxHistory={sandboxHistory}
          setSandboxHistory={setSandboxHistory}
        />

        <div
          className={`${
            collapsed ? 'scrolling' : 'scrolling'
          } w-full max-h-[90vh] sm:max-h-[100vh] ${
            collapsed ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
        >
          {isLoading ? (
            <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
          ) : (
            <AuthInfo
              tier={tier}
              currentUser={currentUser}
              showWelcomeForm={showWelcomeForm}
              setShowWelcomeForm={setShowWelcomeForm}
              userArcs={userArcs}
              sandboxHistory={sandboxHistory}
              setSandboxHistory={setSandboxHistory}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
