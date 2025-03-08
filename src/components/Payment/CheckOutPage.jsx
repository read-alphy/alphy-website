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
  userArcs,
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
      <div className="flex flex-row bg-white dark:bg-darkMode">
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
            <CheckOutPageInfo
              stripePromise={stripePromise}
              hasActiveSub={hasActiveSub}
              currentUser={currentUser}
              showWelcomeForm={showWelcomeForm}
              setShowWelcomeForm={setShowWelcomeForm}
              userArcs={userArcs}
              clientSecret={clientSecret}
              setClientSecret={setClientSecret}
            />
          )}
        </div>
      </div>
    </div>
  )
}
