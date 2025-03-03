import { useCallback } from 'react'
import { saveAs } from 'file-saver'

export const useDownloadHandling = (activeTab, data, transcript, setDownloading) => {
  const handleDownload = useCallback((selection) => {
    setDownloading(true)
    
    const downloadTimer = setTimeout(() => {
      if (activeTab === 'tab2') {
        if (selection === 1) {
          // Download subtitles
          const blob = new Blob([data.transcript], { type: 'text/srt' })
          saveAs(blob, `${data.creator_name}_${data.title}_Subtitles.srt`)
        } else if (selection === 2) {
          // Download full transcript
          let text = ''
          for (let i = 0; i < transcript.length; i++) {
            text = text + transcript[i] + '\n\n'
          }
          const blob = new Blob([text], { type: 'text/txt' })
          saveAs(blob, `${data.creator_name}_${data.title}_Transcript.txt`)
        } else if (selection === 3) {
          // Download plain text (no timestamps)
          let text = ''
          for (let i = 0; i < transcript.length; i++) {
            if (i % 2 === 1) {
              text = text + transcript[i]
            }
          }
          const blob = new Blob([text], { type: 'text/txt' })
          saveAs(blob, `${data.creator_name}_${data.title}_PlainText.txt`)
        }
        
        // Reset downloading state after download completes
        const resetTimer = setTimeout(() => {
          setDownloading(false)
        }, 2000)
        
        return () => clearTimeout(resetTimer)
      }
    }, 1000)
    
    return () => clearTimeout(downloadTimer)
  }, [activeTab, data, transcript, setDownloading])
  
  return { handleDownload }
}