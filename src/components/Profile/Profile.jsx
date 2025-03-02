import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'
import Loading from '../Loading'
import { useRouter } from 'next/router'
import ProfileInfo from './ProfileInfo'

function Profile({
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
  const router = useRouter()
  const [windowSizeChecked, setWindowSizeChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [subCalled, setSubCalled] = useState(false)
  
  // Determine if we're on the account page or pricing page
  const isAccountPage = router.pathname.includes('account')
  
  
  useEffect(() => {
    if (!windowSizeChecked) {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
      setWindowSizeChecked(true)
    }
  }, [])




  useEffect(() => {
    if ((tier !== undefined && tier !== null) && subCalled === false) {
      setSubCalled(true)
      setIsLoading(false)
    }
  }, [tier])

  const handleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="scrolling dark:bg-darkMode dark:text-zinc-300">
      <div
        className={`w-screen bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row bg-white dark:bg-darkMode">
        <div className={`flex hidden sm:block ${isAccountPage ? "" : "mr-5"} bg-zinc-100 dark:bg-mildDarkMode`}>
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
        </div>

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
          } md:px-0 w-full max-h-[90vh] sm:max-h-[100vh] ${
            collapsed ? 'hidden' : ' max-h-[100vh] overflow-hidden'
          }}`}
        >
          {isLoading ? (
            <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
          ) : (
            <ProfileInfo
              isAccountPage={isAccountPage}
              tier={tier}
              credit={credit}
              currentUser={currentUser}
              customerID={customerID}
              collapsed={collapsed}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile