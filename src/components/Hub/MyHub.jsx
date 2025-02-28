import React, { useState, useEffect } from 'react'
import SideFeed from '../../components/ArticleComponents/SideFeed'
// import ArticleCreator from "./ArticleComponents/ArticleCreator"

import { Dialog } from "@/components/ui/dialog"

import Loading from '../../components/Loading'
import HubContent from './HubContent'

function Hub({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  contentName,
  credit,
  userArcs,
  dataGlobalArcs,
  setDataGlobalArcs,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
  setLoggedIn
}) {
  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)

  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [globalLayout, setGlobalLayout] = useState(false)
  const [userLayout, setUserLayout] = useState(true)
  const [submitLayout, setSubmitLayout] = useState(false)
  const [mainShow, setMainShow] = useState('default')

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
     
      <div
        className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row bg-white dark:bg-darkMode ">
   
        {
          <div className={`hidden sm:block`}>
            <SideFeed 
loggedIn={loggedIn}
setLoggedIn={setLoggedIn}
              currentUser={currentUser}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              source_id={source_id}
              globalLayout={globalLayout}
              setGlobalLayout={setGlobalLayout}
              userLayout={userLayout}
              setUserLayout={setUserLayout}
              submitLayout={submitLayout}
              setSubmitLayout={setSubmitLayout}
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
              <SideFeed 
loggedIn={loggedIn}
setLoggedIn={setLoggedIn}
                currentUser={currentUser}
                setCollapsed={setCollapsed}
                source_id={source_id}
                globalLayout={globalLayout}
                setGlobalLayout={setGlobalLayout}
                userLayout={userLayout}
                setUserLayout={setUserLayout}
                submitLayout={submitLayout}
                setSubmitLayout={setSubmitLayout}
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
            collapsed ? 'hidden' : ' overflow-hidden'
          }}`}
        >
          {isLoading ? (
            <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />
          ) : (
            <HubContent
              data={data}
              tier={tier}
              credit={credit}
              currentUser={currentUser}
              userArcs={userArcs}
              dataGlobalArcs={dataGlobalArcs}
              setDataGlobalArcs={setDataGlobalArcs}
              globalLayout={globalLayout}
              setGlobalLayout={setGlobalLayout}
              userLayout={userLayout}
              setUserLayout={setUserLayout}
              submitLayout={submitLayout}
              setSubmitLayout={setSubmitLayout}
              mainShow={mainShow}
              setMainShow={setMainShow}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          )}
        </div>
      </div>

      {deleteDialog && (
        <Dialog open={deleteDialog} onOpenChange={() => setDeleteDialog(false)}>
          {/* Dialog content would go here */}
        </Dialog>
      )}
    </div>
  )
}

export default Hub
