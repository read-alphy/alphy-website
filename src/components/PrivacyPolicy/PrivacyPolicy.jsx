import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'
import Loading from '../Loading'
import PrivacyPolicyInfo from './PrivacyPolicyInfo'

function PrivacyPolicy({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  setShowWelcomeForm,
  showWelcomeForm,
  sandboxHistory,
  setSandboxHistory,
  userArcs,
  loggedIn,
  setLoggedIn
}) {
  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [subCalled, setSubCalled] = useState(false)

  useEffect(() => {
    if (!windowSizeChecked) {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
      setWindowSizeChecked(true)
    }
  })

  return (
    <div className="scrolling dark:bg-darkMode dark:text-zinc-300 font-averta-semibold">
      <div className="flex flex-row bg-white dark:bg-darkMode">
        <SideFeed 
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          tier={tier}
          sandboxHistory={sandboxHistory}
          isArc={false}
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
            <PrivacyPolicyInfo
              tier={tier}
              currentUser={currentUser}
              showWelcomeForm={showWelcomeForm}
              setShowWelcomeForm={setShowWelcomeForm}
              userArcs={userArcs}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
