/**
 * Convert various timestamp formats to seconds
 * 
 * @param {string|number} time - Timestamp in various formats
 * @returns {number} Time in seconds
 */
export function timestampToSeconds(time) {
  if (typeof time === 'number') {
    return Math.floor(time)
  }
  
  if (typeof time !== 'string') {
    return 0
  }
  
  // ISO 8601 duration format (PT1H2M3.5S)
  if (time.startsWith('PT')) {
    const matches = time.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/)
    if (matches) {
      const hours = parseInt(matches[1] || 0)
      const minutes = parseInt(matches[2] || 0)
      const seconds = parseFloat(matches[3] || 0)
      return Math.floor(hours * 3600 + minutes * 60 + seconds)
    }
    return 0
  }
  
  // HH:MM:SS format
  const parts = time.split(':')
  if (parts.length === 3) {
    return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2])
  }
  
  // MM:SS format
  if (parts.length === 2) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1])
  }
  
  // Plain number string
  return Math.floor(parseFloat(time) || 0)
}

/**
 * Convert seconds to display format (HH:MM:SS)
 * 
 * @param {number} totalSeconds - Time in seconds
 * @returns {string} Formatted timestamp
 */
export function secondsToTimestamp(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = Math.floor(totalSeconds % 60)
  
  const pad = (n) => n.toString().padStart(2, '0')
  
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

/**
 * Format timestamp for display, handling various input formats
 * 
 * @param {string|number} time - Input timestamp
 * @returns {string} Formatted HH:MM:SS string
 */
export function formatTimestamp(time) {
  const seconds = timestampToSeconds(time)
  return secondsToTimestamp(seconds)
}

/**
 * Calculate reading time in minutes
 * 
 * @param {string} text - Text content
 * @param {number} wordsPerMinute - Reading speed (default 200)
 * @returns {number} Reading time in minutes
 */
export function calculateReadTime(text, wordsPerMinute = 200) {
  if (!text) return 0
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

