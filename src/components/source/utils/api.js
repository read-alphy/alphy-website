import { API_URL, API_HOST, API_SSL } from '@/constants'

/**
 * Build external link to original source
 * 
 * @param {string} sourceType - Source type (yt, tw, sp, x, ap, up)
 * @param {string} sourceId - Source ID
 * @param {number} timestamp - Optional timestamp in seconds
 * @returns {string|null} External URL or null
 */
export function getExternalSourceUrl(sourceType, sourceId, timestamp = 0) {
  switch (sourceType) {
    case 'yt':
      return timestamp > 0
        ? `https://youtu.be/${sourceId}?t=${Math.floor(timestamp)}`
        : `https://youtu.be/${sourceId}`
    
    case 'tw': {
      const h = Math.floor(timestamp / 3600)
      const m = Math.floor((timestamp % 3600) / 60)
      const s = Math.floor(timestamp % 60)
      return timestamp > 0
        ? `https://www.twitch.tv/videos/${sourceId}?t=${h}h${m}m${s}s`
        : `https://www.twitch.tv/videos/${sourceId}`
    }
    
    case 'sp':
      return `https://twitter.com/i/spaces/${sourceId}`
    
    case 'x':
      return `https://twitter.com/i/status/${sourceId}`
    
    case 'ap': {
      const [podcastId, episodeId] = sourceId.split('-')
      return `https://podcasts.apple.com/podcast/id${podcastId}?i=${episodeId}`
    }
    
    case 'up':
      return null // Private uploads have no external link
    
    default:
      return null
  }
}

/**
 * Get thumbnail URL for source
 * 
 * @param {string} sourceType - Source type
 * @param {string} sourceId - Source ID
 * @param {string} customThumbnail - Custom thumbnail URL if available
 * @returns {string} Thumbnail URL
 */
export function getThumbnailUrl(sourceType, sourceId, customThumbnail = null) {
  if (customThumbnail) return customThumbnail
  
  switch (sourceType) {
    case 'yt':
      return `https://i.ytimg.com/vi/${sourceId}/hqdefault.jpg`
    case 'sp':
      return '/img/twitter_space.png'
    case 'x':
      return '/img/X.png'
    case 'tw':
      return '/img/twitchSource.png'
    case 'ap':
      return '/img/apple_podcast_banner.png'
    default:
      return '/img/ALPHY_BG_REMOVED_DARK.png'
  }
}

/**
 * Get source type display name
 * 
 * @param {string} sourceType - Source type code
 * @returns {string} Human readable name
 */
export function getSourceTypeName(sourceType) {
  const names = {
    yt: 'YouTube',
    tw: 'Twitch',
    sp: 'Twitter Space',
    x: 'X Video',
    ap: 'Apple Podcast',
    up: 'Upload'
  }
  return names[sourceType] || 'Content'
}

/**
 * Build WebSocket URL
 * 
 * @param {string} path - WebSocket path (e.g., '/sandbox/ws', '/qa/ws')
 * @returns {string} Full WebSocket URL
 */
export function getWebSocketUrl(path) {
  const protocol = API_SSL ? 'wss' : 'ws'
  return `${protocol}://${API_HOST}${path}`
}

/**
 * Valid source types
 */
export const VALID_SOURCE_TYPES = ['yt', 'sp', 'x', 'tw', 'ap', 'up']

/**
 * Check if source type is valid
 */
export function isValidSourceType(type) {
  return VALID_SOURCE_TYPES.includes(type)
}

