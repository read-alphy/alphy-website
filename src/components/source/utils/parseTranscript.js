import srtParser2 from 'srt-parser-2'

/**
 * Parse SRT transcript into display-friendly segments
 * Groups subtitles into paragraphs based on punctuation
 * 
 * @param {string} srtContent - Raw SRT file content
 * @returns {Array<{timestamp: string, text: string}>} Parsed segments
 */
export function parseTranscript(srtContent) {
  if (!srtContent) return []
  
  const parser = new srtParser2()
  const srtArray = parser.fromSrt(srtContent)
  
  if (!srtArray || srtArray.length === 0) return []
  
  const segments = []
  let currentText = ''
  let currentTimestamp = '00:00:00'
  let lineCount = 0
  
  for (let i = 0; i < srtArray.length; i++) {
    const entry = srtArray[i]
    const text = entry.text.replace(/\\h/g, ' ').trim()
    
    if (lineCount === 0) {
      // Start new segment, capture timestamp
      currentTimestamp = formatSrtTimestamp(entry.startTime)
    }
    
    currentText += ' ' + text
    lineCount++
    
    const endsWithPunctuation = /[.?!]$/.test(text)
    const isLastEntry = i === srtArray.length - 1
    
    // Push segment if: ends with punctuation (after 4+ lines), or 12+ lines, or last entry
    if ((lineCount >= 4 && endsWithPunctuation) || lineCount >= 12 || isLastEntry) {
      segments.push({
        timestamp: currentTimestamp,
        text: currentText.trim()
      })
      currentText = ''
      lineCount = 0
    }
  }
  
  return segments
}

/**
 * Format SRT timestamp (00:00:00,000) to display format (00:00:00)
 */
function formatSrtTimestamp(srtTime) {
  if (!srtTime) return '00:00:00'
  // Remove milliseconds (,000) and return HH:MM:SS
  return srtTime.split(',')[0]
}

