// hooks/useArcMutations.js
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/constants'

// Constants
const REDIRECT_DELAY_MS = 2000
const DEFAULT_ARC_TITLE = 'My Arc'

export default function useArcMutations(router, currentUser, userArcs, setUserArcs) {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [isLoadingVisibility, setIsLoadingVisibility] = useState(false)
  const [error, setError] = useState(null)

  // Helper for API requests
  const getAuthHeaders = () => ({
    'id-token': currentUser?.accessToken
  })

  const validateArcData = (title, dataArc) => {
    if (!dataArc || dataArc.length === 0) {
      setError('An arc must contain at least one item')
      return false
    }
    
    if (!title || title.trim() === '') {
      setError('Arc title cannot be empty')
      return false
    }
    
    return true
  }

  const handleCreateOrUpdateArc = async (isCreateArc, arcInfo, arcTitle, arcDescription, dataArc) => {
    // Validate input data
    const title = arcTitle?.trim() || DEFAULT_ARC_TITLE
    if (!validateArcData(title, dataArc)) {
      return false
    }

    // Reset error and set loading state
    setError(null)
    setIsLoadingSubmit(true)
    
    try {
      // Prepare request body
      const requestBody = {
        name: title,
        user_id: currentUser.uid,
        description: arcDescription || '',
        sources: [...dataArc]
      }

      let response
      
      if (isCreateArc) {
        
        response = await axios.post(`${API_URL}/playlists/`, requestBody, { 
          headers: getAuthHeaders() 
        })
        
      } else {
        // Update existing arc
        response = await axios.patch(`${API_URL}/playlists/${arcInfo.uid}`, requestBody, { 
          headers: getAuthHeaders() 
        })
      }

      // Set arcAction flag in session storage
      sessionStorage.setItem('arcAction', 'true')
      
      // Optimistically update the UI
      if (!isCreateArc && setUserArcs) {
        const updatedArcs = userArcs.map(arc => 
          arc.uid === arcInfo.uid ? { ...arc, ...requestBody } : arc
        )
        setUserArcs(updatedArcs)
      }

      
      
   /*    // Wait a bit then redirect to the new/updated arc
      setTimeout(() => {
        router.push(`/arc/${response.data.uid}`)
        setIsLoadingSubmit(false)
      }, REDIRECT_DELAY_MS)
       */
      return true
    } catch (error) {
      setIsLoadingSubmit(false)
      
      // Handle specific error cases
      if (error.response?.status === 400) {
        setError('Invalid arc data. Please check your inputs.')
      } else if (error.response?.status === 401) {
        setError('Authentication error. Please log in again.')
      } else if (error.response?.status === 403) {
        setError('You do not have permission to perform this action.')
      } else {
        setError(`Error ${isCreateArc ? 'creating' : 'updating'} arc: ${error.message || 'Unknown error'}`)
      }
      
      console.error(`Error ${isCreateArc ? 'creating' : 'updating'} arc:`, error)
      return false
    }
  }

  const handleDeleteArc = async (arcInfo) => {
    if (!arcInfo?.uid) {
      setError('Invalid arc information')
      return false
    }
    
    setError(null)
    setIsLoadingDelete(true)
    
    try {
      await axios.delete(`${API_URL}/playlists/${arcInfo.uid}`, {
        headers: getAuthHeaders()
      })
      
      // Optimistically update the UI
      if (setUserArcs) {
        const updatedArcs = userArcs.filter(arc => arc.uid !== arcInfo.uid)
        setUserArcs(updatedArcs)
      }
      
      // Redirect to home
      router.push('/')
      return true
    } catch (error) {
      setIsLoadingDelete(false)
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        setError('Authentication error. Please log in again.')
      } else if (error.response?.status === 403) {
        setError('You do not have permission to delete this arc.')
      } else if (error.response?.status === 404) {
        setError('Arc not found. It may have been already deleted.')
        // Still update local state since arc doesn't exist
        if (setUserArcs) {
          const updatedArcs = userArcs.filter(arc => arc.uid !== arcInfo.uid)
          setUserArcs(updatedArcs)
        }
        router.push('/')
        return true
      } else {
        setError(`Error deleting arc: ${error.message || 'Unknown error'}`)
      }
      
      console.error('Error deleting arc:', error)
      return false
    }
  }

  const handleVisibility = async (arcUid, currentVisibility) => {
    if (!arcUid) {
      setError('Invalid arc information')
      return currentVisibility
    }
    
    setError(null)
    setIsLoadingVisibility(true)
    
    const targetVisibility = !currentVisibility
    
    // Optimistically update local storage
    localStorage.setItem('isVisible', String(targetVisibility))
    
    try {
      await axios.patch(
        `${API_URL}/playlists/${arcUid}/visibility?visibility=${targetVisibility}`,
        null,
        {
          headers: {
            accept: 'application/json',
            ...getAuthHeaders()
          }
        }
      )
      
      setIsLoadingVisibility(false)
      return targetVisibility
    } catch (error) {
      setIsLoadingVisibility(false)
      
      // Revert local storage on failure
      localStorage.setItem('isVisible', String(currentVisibility))
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        setError('Authentication error. Please log in again.')
      } else if (error.response?.status === 403) {
        setError('You do not have permission to change visibility for this arc.')
      } else {
        setError(`Error updating visibility: ${error.message || 'Unknown error'}`)
      }
      
      console.error('Error updating visibility:', error)
      return currentVisibility
    }
  }

  // Clear error message
  const clearError = () => setError(null)

  return {
    isLoadingSubmit,
    isLoadingDelete,
    isLoadingVisibility,
    error,
    handleCreateOrUpdateArc,
    handleDeleteArc,
    handleVisibility,
    clearError
  }
}