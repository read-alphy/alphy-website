import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'
import { Dialog } from "@/components/ui/dialog"
import Loading from '../Loading'
import HubContent from './HubContent'
import { useRouter } from 'next/router'

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
  const router = useRouter()
  
  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [globalLayout, setGlobalLayout] = useState(false)
  const [userLayout, setUserLayout] = useState(true)
  const [submitLayout, setSubmitLayout] = useState(false)
  const [mainShow, setMainShow] = useState('default')
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
          <div className="dialog-content"></div>
        </Dialog>
      )}
    </div>
  )
}

export default Hub
