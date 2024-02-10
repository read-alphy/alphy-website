import React, { useState, useEffect } from 'react'
import SideFeedReworked from '../../components/ArticleComponents/SideFeedReworked'
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { useLocation } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import Loading from '../../components/Loading'
import { Helmet } from 'react-helmet'
import HubContent from './HubContent'

function Hub({
  arcs,
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  contentName,
  credit,
  userArchipelagos,
  dataGlobalArchipelagos,
  setDataGlobalArchipelagos,
  getDataGlobalArchipelagos,
}) {
  const location = useLocation()

  let source_id

  const [windowSizeChecked, setWindowSizeChecked] = useState(false)

  const [data, setData] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [subCalled, setSubCalled] = useState(false)

  const [globalLayout, setGlobalLayout] = useState(true)
  const [userLayout, setUserLayout] = useState(false)
  const [submitLayout, setSubmitLayout] = useState(false)
  const [mainShow, setMainShow] = useState(arcs === true ? 'arcs' : 'default')

  useEffect(() => {
    if (location.pathname.includes('arcs')) {
      setMainShow('arcs')
    } else if (location.pathname.includes('explore')) {
      setMainShow('sources')
    } else {
      setMainShow('default')
    }

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

  if (location.search.includes('?onboarding_form=complete')) {
    localStorage.setItem('onboarding_form', 'complete')
    const newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname
    window.history.pushState({ path: newUrl }, '', newUrl)
  }

  return (
    <div className="scrolling   dark:bg-darkMode dark:text-zinc-300 font-averta-semibold">
      <Helmet>
        <title>Alphy - AI Transcriber, Summarizer, Assistant</title>
      </Helmet>
      <div
        className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row bg-white dark:bg-darkMode ">
        {
          <div className={` hidden sm:block `}>
            <SideFeedReworked
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
            />
          </div>
        }

        <div
          className={`fixed top-0 z-50 transition origin-top-right transform overflow-y-scroll sm:hidden w-full shadow-lg bg-zinc-100 ${
            collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-zinc-50'
          }`}
        >
          <div className="rounded-lg rounded-t-none shadow-lg">
            <div className="">
              <SideFeedReworked
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
                getDataGlobalArchipelagos={getDataGlobalArchipelagos}
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
        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
        ></Dialog>
      )}
    </div>
  )
}

export default Hub
