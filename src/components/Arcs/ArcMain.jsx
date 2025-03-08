// components/Arc/ArcMain.jsx
import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { ChevronLeft, LogIn, UserPlus, Lock, ArrowRight } from "lucide-react"

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
        <div className="flex flex-col items-center justify-center py-16 px-4 max-w-md mx-auto">
          <div className="h-20 w-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-8">
            <Lock className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sign in to continue</h3>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-8 text-center max-w-xs">
            Create an account to create and manage Arcs with Alphy
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <Link 
              href="/u/login" 
              className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors flex items-center justify-center"
            >
              <LogIn className="h-3 w-3 mr-2" />
              Sign In
            </Link>
            
            <Link 
              href="/u/register" 
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors flex items-center justify-center"
            >
              <UserPlus className="h-3 w-3 mr-2" />
              Create Account
            </Link>
          </div>
          
         
        </div>
      )
    }
    
    if (!authState.canCreate) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 max-w-md mx-auto">
          <div className="h-20 w-20 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center mb-8">
            <Lock className="h-10 w-10 text-amber-500 dark:text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Plan Limit Reached</h3>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-8 text-center max-w-xs">
            You've reached the maximum number of Arcs for your current plan. Upgrade to create more.
          </p>
          
          <Link 
            href="/account" 
            className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors flex items-center justify-center"
          >
            Upgrade Plan
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
          
         
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
        <div className="flex flex-col items-center justify-center py-16 px-4 max-w-md mx-auto">
          <div className="h-20 w-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-8">
            <Lock className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sign in to continue</h3>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-8 text-center max-w-xs">
            Create an account to edit and manage Arcs with Alphy
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
            <Link 
              href="/u/login" 
              className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors flex items-center justify-center"
            >
              <LogIn className="h-3 w-3 mr-2" />
              Sign In
            </Link>
            
            <Link 
              href="/u/register" 
              className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors flex items-center justify-center"
            >
              <UserPlus className="h-3 w-3 mr-2" />
              Create Account
            </Link>
          </div>
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
      <div className="flex flex-row bg-white dark:bg-darkMode">
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

        <div
          className={`${
            collapsed ? 'scrolling' : 'scrolling'
          } w-full max-h-[90vh] sm:max-h-[100vh] ${
            collapsed ? 'overflow-hidden' : 'overflow-y-auto'
          }`}
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