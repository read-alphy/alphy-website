import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import HubContent from './HubContent'
import Loading from '../Loading'

function SubmitPage({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
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
  const [mainShow, setMainShow] = useState('default')
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [globalLayout, setGlobalLayout] = useState(false)
  const [userLayout, setUserLayout] = useState(false)
  const [submitLayout, setSubmitLayout] = useState(true)

  useEffect(() => {
    if (!windowSizeChecked) {
      if (window.innerWidth < 1000) {
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
          userLayout={userLayout}
          tier={tier}
          sandboxHistory={sandboxHistory}
          isArc={false}
          dataArc={dataGlobalArcs}
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
            <div>
              <HubContent
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
            </div>
          )}
        </div>
      </div>

      {deleteDialog && (
        <Dialog open={deleteDialog} onOpenChange={() => setDeleteDialog(false)}>
          <DialogContent className="dark:bg-mildDarkMode">
            <div className="dialog-content"></div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default SubmitPage
