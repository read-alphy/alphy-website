import React, { useState, useEffect } from 'react'
import SideFeedReworked from '../../components/ArticleComponents/SideFeedReworked'

import HistoryInfo from './HistoryInfo'

import Loading from '../../components/Loading'

import { Helmet } from 'react-helmet'

export default function History({
  source_type,
  collapsed,
  setCollapsed,
  tier,
  setContentName,
  userArchipelagos,
  currentUser,
  sandboxHistory,
  setSandboxHistory,
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
      <Helmet>
        <title>Alphy - About</title>
      </Helmet>
      <div
        className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row bg-white dark:bg-darkMode ">
        {
          <div className={`hidden sm:block`}>
            <SideFeedReworked
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
          className={`fixed top-0 z-50 transition origin-top-right transform sm:hidden w-full shadow-lg bg-zinc-100 ${
            collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-white'
          }`}
        >
          <div className="rounded-lg rounded-t-none shadow-lg">
            <div className="h-screen">
              <SideFeedReworked
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
          {isLoading ? (
            <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
          ) : (
            <HistoryInfo
              tier={tier}
              currentUser={currentUser}
              sandboxHistory={sandboxHistory}
              setSandboxHistory={setSandboxHistory}
              userArchipelagos={userArchipelagos}
            />
          )}
        </div>
      </div>
    </div>
  )
}
