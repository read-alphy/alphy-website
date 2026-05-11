import { useState } from 'react'
import { Download, FileText, FileCode, FileType, Loader2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useSource } from '../context/SourceContext'
import { saveAs } from 'file-saver'

export default function DownloadMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const { source, transcript } = useSource()
  
  const handleDownload = async (type) => {
    if (!source) return
    
    setDownloading(true)
    
    try {
      const filename = `${source.creator_name || 'content'}_${source.title || 'transcript'}`
      
      switch (type) {
        case 'srt': {
          // Download original SRT subtitles
          if (source.transcript) {
            const blob = new Blob([source.transcript], { type: 'text/srt' })
            saveAs(blob, `${filename}_Subtitles.srt`)
          }
          break
        }
        
        case 'transcript': {
          // Download formatted transcript with timestamps
          let text = ''
          transcript.forEach(segment => {
            text += `${segment.timestamp}\n${segment.text}\n\n`
          })
          const blob = new Blob([text], { type: 'text/plain' })
          saveAs(blob, `${filename}_Transcript.txt`)
          break
        }
        
        case 'plain': {
          // Download plain text (no timestamps)
          let text = ''
          transcript.forEach(segment => {
            text += segment.text + ' '
          })
          const blob = new Blob([text.trim()], { type: 'text/plain' })
          saveAs(blob, `${filename}_PlainText.txt`)
          break
        }
      }
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setTimeout(() => setDownloading(false), 500)
      setIsOpen(false)
    }
  }
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="h-8"
          disabled={downloading || transcript.length === 0}
        >
          {downloading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download
            </>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-56 p-2" align="end">
        <div className="space-y-1">
          <DownloadOption
            icon={FileCode}
            label="SRT Subtitles"
            description="Original subtitle format"
            onClick={() => handleDownload('srt')}
          />
          <DownloadOption
            icon={FileText}
            label="Transcript"
            description="With timestamps"
            onClick={() => handleDownload('transcript')}
          />
          <DownloadOption
            icon={FileType}
            label="Plain Text"
            description="Text only"
            onClick={() => handleDownload('plain')}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

function DownloadOption({ icon: Icon, label, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full p-2 rounded-md text-left
        hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
    >
      <Icon className="h-4 w-4 text-zinc-500" />
      <div>
        <div className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          {label}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {description}
        </div>
      </div>
    </button>
  )
}

