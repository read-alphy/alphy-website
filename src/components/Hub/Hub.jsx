import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'
import HubContent from './HubContent'
import { Dialog } from "@/components/ui/dialog"
import Loading from '../Loading'
import { useRouter } from 'next/router';

export default function Hub({
  arcs,
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  credit,
  userArcs,
  dataGlobalArcs,
  setDataGlobalArcs,
  totalMinutes,
  setTotalMinutes,
  sandboxHistory,
  setSandboxHistory,
  globalLayout,
  setGlobalLayout,
  userLayout,
  setUserLayout,
  submitLayout,
  setSubmitLayout,
  data,
  loggedIn,
  setLoggedIn,
  
}) {
  const router = useRouter()
  
  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)
  const [mainShow, setMainShow] = useState("default")

  const [isLoading, setIsLoading] = useState(true)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [subCalled, setSubCalled] = useState(false)

  useEffect(() => {
    if(router.asPath.includes('/explore')){
      setMainShow("sources")
    }
    else{
      setMainShow("default")
    }
  }, [router.asPath])
  
  useEffect(() => {   
    if (!windowSizeChecked) {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      }
      setWindowSizeChecked(true)
    }
  })

  useEffect (() => {
    if (router.asPath.includes('?onboarding_form=complete')) {
      localStorage.setItem('onboarding_form', 'complete')
      const newUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname
      window.history.pushState({ path: newUrl }, '', newUrl)
    }
  }, [router.asPath])

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
          userLayout={userLayout}
          tier={tier}
          sandboxHistory={sandboxHistory}
          isArc={arcs ? true : false}
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
                arcs={arcs}
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
                totalMinutes={totalMinutes}
                setTotalMinutes={setTotalMinutes}
              /> 
            </div>
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
