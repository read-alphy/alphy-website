import ReactMarkdown from 'react-markdown'
import { saveAs } from 'file-saver'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { RefreshCw, Copy, Download, Check } from "lucide-react"
import dynamic from 'next/dynamic'

/* 
const HandAnimation  = dynamic(() => import('./HandAnimation'), {
  ssr: false,
})
 */
export default function OutputMessage({
  generatedPrompt,
  outputMessage,
  createDopeStuff,
  isLoading,
}) {
  const [copiedText, setCopiedText] = useState(false)
  const [theme, setTheme] = useState('dark')


useEffect (() => {
  if(localStorage.getItem('theme') === null) {
  setTheme('light')
  }
  else{
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
      }, 500)
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
    <div className=" w-full  p-6 rounded-lg  right-0 flex flex-col border border-slate-100 dark:border-zinc-700 rounded-lg bg-slate-50  dark:bg-mildDarkMode">
      <div className="flex flex-row justify-between">
        <p className="text-zinc-700 dark:text-zinc-300 text-md font-averta-semibold mb-6 items-center text-center justify-center flex">
          Output
        </p>
        <div className="flex flex-col">
          <div
            className={`flex flex-row gap-4 ${
              outputMessage.length === 0 && 'opacity-0 pointer-events-none'
            }`}
          >
            <Button
              onClick={() => copyToClipboard(generatedPrompt)}
              variant="ghost"
              size="sm"
              className="flex flex-row items-center text-zinc-500 dark:text-zinc-300"
            >
              <Copy className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Copy</span>
            </Button>

            <Button
              onClick={() => downloadTxtFile(outputMessage)}
              variant="ghost"
              size="sm"
              className="flex flex-row items-center text-zinc-500 dark:text-zinc-300"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>

            <div className="mt-2">
              <Button
                onClick={() => createDopeStuff()}
                className="flex flex-row bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] h-[38px] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-zinc-700 font-averta-regular normal-case w-[120px]"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                <span>Regenerate</span>
              </Button>
            </div>
          </div>

          <div
            className={`flex text-zinc-500 dark:text-zinc-300 flex-row sm:ml-4 text-sm mt-1 h-[30px] ${
              copiedText ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } overflow-hidden`}
          >
            <Check className="h-5 w-5 mr-1 text-green-300" />
            Done!
          </div>
        </div>
      </div>
      <div id="output-message" className=" output-message mt-4">
        {outputMessage.length > 0 ? (
          <ReactMarkdown>{outputMessage.replace(/\n/g, '\n')}</ReactMarkdown>
        ) : (
          <div className="">{isLoading && {/* <HandAnimation /> */}}</div>
        )}
      </div>
    </div>
  )
}
