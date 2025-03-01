// utils/arcHelpers.js

/**
 * Determines if the user can create an arc based on their tier and current arc count
 */
export const canCreateArc = (tier, arcCount) => {
    if (tier === 'premium') return true
    if (tier === 'basic' && arcCount < 3) return true
    if (tier === 'free' && arcCount < 1) return true
    return false
  }
  
  /**
   * Parses router path to determine current page type
   */
  export const getArcPageType = (path) => {
    const segments = path.split('/')
    const isCreateArc = segments[2] === 'createArc'
    const isEditArc = segments[2] === 'editArc'
    const isArc = segments[1] === 'arc' && 
                 !isCreateArc && 
                 !isEditArc
    const isArcPage = segments[1] === 'arc'
    
    return { isCreateArc, isEditArc, isArc, isArcPage }
  }
  
  /**
   * Gets thumbnail and name from arc data
   */
  export const getArcMetadata = (router, jsonData) => {
    const { isArc, isEditArc } = getArcPageType(router.asPath)
    
    if (!isArc && !isEditArc) return { item_thumbnail: null, item_name: null }
    
    const item = jsonData.find(t => t.arc_id === router.asPath.split('/')[2])
    
    return {
      item_thumbnail: item?.thumbnail_url,
      item_name: item?.name
    }
  }
  
  /**
   * Checks if window width is below mobile breakpoint
   */
  export const isMobileWidth = () => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  }