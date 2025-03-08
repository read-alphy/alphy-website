import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'
import Loading from '../Loading'
import SuccessInfo from './SuccessInfo'

function Success({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  customerID,
  credit,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
  setLoggedIn
}) {
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

  return (
    <div className="scrolling dark:bg-darkMode dark:text-zinc-300">
      <div className="flex flex-row bg-white dark:bg-darkMode">
        <SideFeed 
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          userLayout={false}
          tier={tier}
          sandboxHistory={sandboxHistory}
          isArc={false}
          dataArc={null}
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
            <SuccessInfo
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

export default Success
