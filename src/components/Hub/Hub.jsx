
import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'



import HubContent from './HubContent'
import Dialog from '@mui/material/Dialog'
import Loading from '../Loading'
import { useRouter } from 'next/router';


/* import HubContent from './HubContent */

export default function Hub({
  arcs,
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  credit,
  userArchipelagos,
  dataGlobalArchipelagos,
  setDataGlobalArchipelagos,
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
}) {
  const router = useRouter()
  
  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)

  

  const [isLoading, setIsLoading] = useState(true)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [subCalled, setSubCalled] = useState(false)


  const [mainShow, setMainShow] = useState("default")
  

  
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
} , [router.asPath])




  if ((tier !== undefined || tier !== null) && subCalled === false) {
    setSubCalled(true)
    setIsLoading(false)
  }


  return (
    <div className="scrolling   dark:bg-darkMode dark:text-zinc-300 font-averta-semibold">

      <div
        className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row bg-white dark:bg-darkMode ">
        {
          <div className={` hidden sm:block `}>
            <SideFeed
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
          className={`fixed top-0 z-50 transition origin-top-right transform overflow-y-scroll sm:hidden w-full shadow-lg bg-zinc-100 ${
            collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-slate-50'
          }`}
        >
          <div className="rounded-lg rounded-t-none shadow-lg">
            <div className="">
              <SideFeed
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
          </div>
        </div>

        <div
          className={`${
            collapsed ? 'scrolling' : 'scrolling'
          } w-full max-h-[90vh]   sm:max-h-[100vh] ${
            collapsed ? 'hidden' : ' overflow-hidden'
          }}`}
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
                userArchipelagos={userArchipelagos}
                dataGlobalArchipelagos={dataGlobalArchipelagos}
                setDataGlobalArchipelagos={setDataGlobalArchipelagos}
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
        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
        ></Dialog>
      )}
    </div>
  )
}


