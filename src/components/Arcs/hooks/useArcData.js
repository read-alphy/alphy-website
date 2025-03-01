// hooks/useArcData.js
import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@/constants'

export default function useArcData(isArc, isEditArc, router, currentUser) {
  const [arcState, setArcState] = useState({
    data: [],
    arcInfo: {},
    arcDescription: '',
    arcTitle: '',
    dataArc: [],
    sourceIDsArc: [],
    isVisible: false,
    isPublic: false,
    isLoading: true,
    authorizationError: false,
    called: false
  })

  // Derive source_id from router
  const source_id = isArc
    ? router.query.arc_id
    : router.asPath.split('/')[3]

  useEffect(() => {
    // Only fetch if we're on an arc page or edit page and haven't fetched yet
    if ((isArc || isEditArc) && 
        arcState.data.length === 0 && 
        !arcState.called && 
        currentUser) {
      fetchArcData()
    }
  }, [currentUser, router.asPath])

  
  const fetchArcData = async () => {
    // Reset error state
    setArcState(prev => ({ ...prev, authorizationError: false, isLoading: true }))
    
    // Get the user's token if available
    const idToken = currentUser?.accessToken || null
    try {
      const response = await axios.get(
        `${API_URL}/playlists/${source_id}?nof_questions=30`, 
        {
          headers: {
            accept: 'application/json',
            'id-token': idToken,
          },
        }
      )
      
      // Process the response
      const responseData = response.data
      
      // Extract tracks and source IDs
      const tracks = responseData.tracks || []
      const sources = tracks.map(item => item.source_id)
      
      // Update state with all the fetched data
      setArcState({
        data: responseData,
        arcInfo: responseData,
        arcDescription: responseData.description === 'null' ? '' : responseData.description,
        arcTitle: responseData.name,
        dataArc: tracks,
        sourceIDsArc: sources,
        isVisible: responseData.is_visible,
        isPublic: responseData.is_public,
        isLoading: false,
        authorizationError: false,
        called: true
      })
      
      // Store visibility in localStorage
      localStorage.setItem('isVisible', responseData.is_visible)
      
    } catch (error) {
      setArcState(prev => ({ 
        ...prev, 
        isLoading: false,
        called: true,
        authorizationError: error.response?.data?.detail === 'You are not authorized to see this playlist.'
      }))
      
      console.error('Error fetching arc data:', error)
    }
  }

  // Update specific parts of the state
  const updateArcState = (updates) => {
    setArcState(prev => ({ ...prev, ...updates }))
  }

  return {
    ...arcState,
    updateArcState,
    fetchArcData
  }
}