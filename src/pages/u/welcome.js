import React, { useState, useEffect } from 'react'
import SideFeed from '../../components/SideFeed/SideFeed'
// import ArticleCreator from "./ArticleComponents/ArticleCreator"

import Loading from '../../components/Loading'
import Welcome from '../../components/Auth/Welcome'
import { useRouter } from 'next/router'

function WelcomePage({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  customerID,
  credit,
  loggedIn,
  setLoggedIn,
}) {
  const router = useRouter()
  
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
    <div className="scrolling dark:bg-darkMode dark:text-zinc-300 font-averta-semibold">
      <div className="flex flex-row bg-white dark:bg-darkMode">
        <SideFeed
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          currentUser={currentUser}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          source_id={source_id}
          tier={tier}
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
            <Welcome
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