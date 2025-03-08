import ReactMarkdown from 'react-markdown'
import { saveAs } from 'file-saver'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { RefreshCw, Copy, Download, Check, Loader2 } from "lucide-react"
import HandAnimation from './HandAnimation'
import { motion } from "framer-motion"

export default function OutputMessage({
  generatedPrompt,
  outputMessage,
  createDopeStuff,
  isLoading,
}) {
  const [copiedText, setCopiedText] = useState(false)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    if(localStorage.getItem('theme') === null) {
      setTheme('light')
    }
    else {
      setTheme(localStorage.getItem('theme'))
    }
  }, [])

  // Copy text to clipboard
  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(true)
      setTimeout(() => {
        setCopiedText(false)
      }, 1500)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  // Download text as a TXT file
  const downloadTxtFile = (text, filename = 'download.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, filename)
  }

  return (
    <div className="w-full p-6 max-h-[80vh] overflow-y-auto rounded-xl shadow-sm border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:border-zinc-700/50 transition-all duration-200">
      <div className="flex flex-row justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
          <h3 className="text-zinc-600 dark:text-zinc-100 text-sm font-medium">
            Output
          </h3>
        </div>
        
        <div className="flex flex-col">
          <div className={`flex flex-row gap-2 ${outputMessage.length === 0 && 'opacity-0 pointer-events-none'}`}>
            <Button
              onClick={() => copyToClipboard(outputMessage)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Copy"
            >
              {copiedText ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>

            <Button
              onClick={() => downloadTxtFile(outputMessage)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Export"
            >
              <Download className="h-4 w-4" />
            </Button>

            {!isLoading && <Button
              onClick={() => createDopeStuff()}
              size="sm"
              className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all duration-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              <span>Regenerate</span>
            </Button>}
          </div>
        </div>
      </div>
      
      <div 
        id="output-message" 
        className="output-message mt-4 p-4 rounded-lg  dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-700/50 min-h-[200px]"
      >
        {outputMessage.length > 0 ? (
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm">
            <ReactMarkdown>{outputMessage.replace(/\n/g, '\n')}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <HandAnimation />
                <p className="text-zinc-500 dark:text-zinc-400 mt-4 text-sm">
                  Generating your content...
                </p>
              </div>
            ) : (
              <p className="text-zinc-400 dark:text-zinc-500 text-sm italic">
                Your generated content will appear here
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
