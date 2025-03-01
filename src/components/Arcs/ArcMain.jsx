// components/Arc/ArcMain.jsx
import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronLeft } from "lucide-react"

// Components
import SideFeed from '../SideFeed/SideFeed'
import ArcCreation from './ArcCreation'
import ArcChat from './ArcChat/ArcChat'
import EditArc from './EditArc'
import Loading from '../Loading'
import DeleteArcDialog from './components/DeleteArcDialog'
import AuthorizationError from './components/AuthorizationError'


// Custom hooks
import useArcData from './hooks/useArcData'
import useArcMutations from './hooks/useArcMutations'

// Utils
import { getArcPageType, canCreateArc, isMobileWidth } from './utils/arcHelpers'
import jsonData from './arcs_and_thumbnails.json' // TODO: replace with API call

export default function ArcMain({
  currentUser,
  collapsed,
  setCollapsed,
  tier,
  userArcs,
  setUserArcs,
  credit,
  setCreditCalled,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
  setLoggedIn,
}) {
  const router = useRouter()
  
  // Determine page type from URL
  const { isCreateArc, isEditArc, isArc, isArcPage } = useMemo(() => 
    getArcPageType(router.asPath), [router.asPath]
  )

  
  // State for window size detection
  const [windowSizeChecked, setWindowSizeChecked] = useState(false)
  const [dataArc, setDataArc] = useState([])
  const [sourceIDsArc, setSourceIDsArc] = useState([])
  
  // State for delete dialog
  const [deleteDialog, setDeleteDialog] = useState(false)
  
  // Check authorization once and memoize results
  const authState = useMemo(() => {
    return {
      isAuthenticated: !!currentUser,
      canCreate: currentUser ? canCreateArc(tier, userArcs.length) : false
    }
  }, [currentUser, tier, userArcs.length])
  
  // Custom hooks
  const arcData = useArcData(isArc, isEditArc, router, currentUser)
  
  const {
    isLoadingSubmit,
    isLoadingDelete,
    isLoadingVisibility,
    error,
    handleCreateOrUpdateArc,
    handleDeleteArc,
    handleVisibility,
    clearError
  } = useArcMutations(router, currentUser, userArcs, setUserArcs)
  
  // Destructure arcData for easier access
  const {
    data,
    arcInfo,
    arcTitle,
    arcDescription,
    isLoading,
    isVisible,
    isPublic,
    authorizationError,
    updateArcState,
    fetchArcData
  } = arcData

  
  
  // Handle window size check on initial load
  useEffect(() => {
    if (!windowSizeChecked) {
      if (isMobileWidth()) {
        setCollapsed(true)
      }
      setWindowSizeChecked(true)
    }
  }, [])
  
  // Handle arc reload on navigation
  useEffect(() => {
    if (isArc && sessionStorage.getItem('arcAction') === 'true') {
      sessionStorage.removeItem('arcAction')
      window.location.reload()
    }
  }, [])
  useEffect(() => {
    if (arcData?.dataArc && dataArc.length === 0) {
      setDataArc(arcData.dataArc);
      setSourceIDsArc(arcData.sourceIDsArc);
    }
  }, [arcData]);
  
  // Handlers
  const handleArc = () => {
    handleCreateOrUpdateArc(
      isCreateArc,
      arcInfo,
      arcTitle,
      arcDescription,
      dataArc
    )
  }
  
  const handleArcDelete = () => {
    handleDeleteArc(arcInfo)
  }
  
  const toggleVisibility = async () => {
    const newVisibility = await handleVisibility(arcInfo.uid, isVisible)
    updateArcState({ 
      isVisible: newVisibility, 
      isPublic: newVisibility
    })
  }
  
  const setArcDescription = (newDescription) => {
    updateArcState({ arcDescription: newDescription })
  }
  
  const setArcTitle = (newTitle) => {
    updateArcState({ arcTitle: newTitle })
  }
  
  
  // Optimized content rendering with memoization
  const createArcContent = useMemo(() => {
    if (!authState.isAuthenticated) {
      return (
        <div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20 md:mt-40 pl-5">
          <div className="mb-10">
            <Link
              href="/submit"
              className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 duration-200 ease-in transition cursor-pointer flex items-center gap-2"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm quicksand font-semibold">
                Go Back
              </span>
            </Link>
          </div>
          <Link
            href="/u/login"
            className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
          >
            Sign in
          </Link>{' '}
          or{' '}
          <Link
            href="/u/register"
            className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
          >
            create an account
          </Link>{' '}
          to access this page.
        </div>
      )
    }
    
    if (!authState.canCreate) {
      return (
        <div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20 md:mt-40 flex flex-col">
          <p className="quicksand font-semibold">
            You've already have the maximum number of Arcs for your
            plan.
          </p>

          <p className="mt-4 quicksand font-semibold">
            <Link
              href="/account"
              className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
            >
              Upgrade
            </Link>{' '}
            your plan to create more Arcs.
          </p>
        </div>
      )
    }
    
    return (
      <ArcCreation
        userArcs={userArcs}
        tier={tier}
        arcDescription={arcDescription}
        dataArc={dataArc}
        setDataArc={setDataArc}
        arcTitle={arcTitle}
        setArcDescription={setArcDescription}
        setArcTitle={setArcTitle}
        sourceIDsArc={sourceIDsArc}
        setSourceIDsArc={setSourceIDsArc}
        errorMessage={error}
        setErrorMessage={clearError}
        credit={credit}
        setCreditCalled={setCreditCalled}
        isCreateArc={isCreateArc}
        isEditArc={isEditArc}
        isLoadingSubmit={isLoadingSubmit}
        onSave={handleArc}
        onDelete={() => setDeleteDialog(true)}
      />
    )
  }, [authState.isAuthenticated, authState.canCreate, userArcs, tier, arcDescription, dataArc, arcTitle, sourceIDsArc, error, credit, isLoadingSubmit])
  
  const editArcContent = useMemo(() => {
    if (!authState.isAuthenticated) {
      return (
        <div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20 md:mt-40 quicksand font-semibold pl-5">
          <Link
            href="/u/login"
            className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
          >
            Sign in
          </Link>{' '}
          or{' '}
          <Link
            href="/u/register"
            className="dark:text-greenColor text-green-400 underline quicksand font-semibold"
          >
            create an account
          </Link>{' '}
          to access this page.
        </div>
      )
    }

    return (
      <EditArc
        currentUser={currentUser}
        arcInfo={arcInfo}
        tier={tier}
        setArcInfo={(newInfo) => updateArcState({ arcInfo: newInfo })}
        userArcs={userArcs}
        arcDescription={arcDescription}
        dataArc={dataArc}
        setDataArc={setDataArc}
        arcTitle={arcTitle}
        setArcDescription={setArcDescription}
        setArcTitle={setArcTitle}
        sourceIDsArc={sourceIDsArc}
        setSourceIDsArc={setSourceIDsArc}
        errorMessage={error}
        setErrorMessage={clearError}
        credit={credit}
        setCreditCalled={setCreditCalled}
        isCreateArc={isCreateArc}
        isEditArc={isEditArc}
        isLoadingSubmit={isLoadingSubmit}
        onSave={handleArc}
        onDelete={() => setDeleteDialog(true)}
      />
    )
  }, [authState.isAuthenticated, arcInfo, tier, userArcs, arcDescription, dataArc, arcTitle, sourceIDsArc, error, credit, isLoadingSubmit])
  
  const arcContent = useMemo(() => {
    if (isLoading) {
      return <Loading />
    }
    
    if (authorizationError) {
      return <AuthorizationError />
    }
    
    

    return (
      <ArcChat
        data={data}
        setData={(newData) => updateArcState({ data: newData })}
        currentUser={currentUser}
        dataArc={dataArc}
        setDataArc={setDataArc}
        handleVisibility={toggleVisibility}
        isVisible={isVisible}
        setIsVisible={(newValue) => updateArcState({ isVisible: newValue })}
        isPublic={isPublic}
        setIsPublic={(newValue) => updateArcState({ isPublic: newValue })}
        isLoadingVisibility={isLoadingVisibility}
        tier={tier}
      />
    )
  }, [isLoading, authorizationError, data, currentUser, dataArc, isVisible, isPublic, isLoadingVisibility, tier])
  
  // Simplified render logic
  const renderContent = () => {
    if (isCreateArc) return createArcContent
    if (isEditArc) return editArcContent
    return arcContent
  }
  
  return (
    <div className="scrolling dark:bg-darkMode dark:text-zinc-300">
      {/* Mobile top navigation bar */}
      <div
        className={`w-screen bg-bordoLike transition origin-top-right transform sm:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row">
        {/* Side feed - desktop */}
        {<div className={`hidden ${isArc ? 'md:flex' : 'md:flex'} `}>
          <SideFeed
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            currentUser={currentUser}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            source_id={isArc ? router.query.arc_id : router.asPath.split('/')[3]}
            dataArc={dataArc}
            tier={tier}
            sandboxHistory={sandboxHistory}
            setSandboxHistory={setSandboxHistory}
            isArc={isArc}
          />
        </div>}

        {/* Side feed - mobile */}
        <div
          className={`fixed top-0 z-50 transition origin-top-right transform ${
            isArc ? 'md:hidden' : 'md:hidden'
          }  w-full shadow-lg bg-zinc-100 ${
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
                source_id={isArc ? router.query.arc_id : router.asPath.split('/')[3]}
                dataArc={dataArc}
                tier={tier}
                sandboxHistory={sandboxHistory}
                setSandboxHistory={setSandboxHistory}
                isArc={isArc}
              />
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div
          className={`${
            collapsed ? 'scrolling' : 'scrolling'
          } xl:px-20 pb-20 sm:pb-0 w-full sm:max-h-[100vh] ${
            collapsed ? 'hidden' : ' overflow-hidden'
          }}`}
        >
          {renderContent()}
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md">
          <div className="flex">
            <div>
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
            <button 
              className="ml-4" 
              onClick={clearError}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog */}
      <DeleteArcDialog
        isOpen={deleteDialog}
        onClose={() => setDeleteDialog(false)}
        onDelete={handleArcDelete}
        isLoading={isLoadingDelete}
      />
    </div>
  )
}