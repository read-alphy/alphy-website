// hooks/useArcMutations.js
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '@/constants'

export default function useArcMutations(router, currentUser, userArcs, setUserArcs) {
  const [mutationState, setMutationState] = useState({
    isLoadingSubmit: false,
    isLoadingDelete: false,
    errorMessage: false
  })

  const handleCreateOrUpdateArc = async (isCreateArc, arcInfo, arcTitle, arcDescription, dataArc) => {
    // Validate data
    if (dataArc.length === 0) {
      setMutationState(prev => ({ ...prev, errorMessage: true }))
      return
    }

    // Set loading state
    setMutationState(prev => ({ ...prev, isLoadingSubmit: true, errorMessage: false }))
    try {
      // Prepare request body
      const requestBody = {
        name: arcTitle.length > 0 ? arcTitle : 'My Arc',
        user_id: currentUser.uid,
        description: arcDescription,
        sources: [...dataArc]
      }

      // Headers
      const headers = {
        'id-token': currentUser.accessToken
      }

      let response
      
      if (isCreateArc) {
        // Create new arc
        
        response = await axios.post(`${API_URL}/playlists/`, requestBody, { headers })
      } else {
        // Update existing arc
        response = await axios.patch(`${API_URL}/playlists/${arcInfo.uid}`, requestBody, { headers })
      }

      // Set arcAction flag in session storage
      sessionStorage.setItem('arcAction', 'true')
      
      // Wait a bit then redirect to the new/updated arc
      setTimeout(() => {
        router.push(`/arc/${response.data.uid}`)
        setMutationState(prev => ({ ...prev, isLoadingSubmit: false }))
      }, 2000)
      
    } catch (error) {
      setMutationState(prev => ({ 
        ...prev, 
        isLoadingSubmit: false,
        errorMessage: error.response?.status === 400
      }))
      
      console.error('Error creating/updating arc:', error)
    }
  }

  const handleDeleteArc = async (arcInfo) => {
    setMutationState(prev => ({ ...prev, isLoadingDelete: true }))
    
    try {
      await axios.delete(`${API_URL}/playlists/${arcInfo.uid}`, {
        headers: {
          'id-token': currentUser.accessToken
        }
      })
      
      // Update the user's arcs list
      const updatedArcs = userArcs.filter(arc => arc.uid !== arcInfo.uid)
      setUserArcs(updatedArcs)
      
      // Redirect to home
      router.push('/')
      
    } catch (error) {
      setMutationState(prev => ({ ...prev, isLoadingDelete: false }))
      console.error('Error deleting arc:', error)
    }
  }

  const handleVisibility = async (arcUid, currentVisibility) => {
    const targetVisibility = !currentVisibility
    
    try {
      await axios.patch(
        `${API_URL}/playlists/${arcUid}/visibility?visibility=${targetVisibility}`,
        null,
        {
          headers: {
            accept: 'application/json',
            'id-token': currentUser.accessToken
          }
        }
      )
      
      // Update local storage
      localStorage.setItem('isVisible', targetVisibility)
      
      return targetVisibility
    } catch (error) {
      console.error('Error updating visibility:', error)
      return currentVisibility
    }
  }

  return {
    ...mutationState,
    handleCreateOrUpdateArc,
    handleDeleteArc,
    handleVisibility,
    setMutationState
  }
}