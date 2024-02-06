import ReactMarkdown from 'react-markdown'
import { saveAs } from 'file-saver'
import { useState } from 'react'


export default function OutputMessage({ generatedPrompt }) {

    const [copiedText, setCopiedText] = useState(false)



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
    <div className="  w-fit   p-6 rounded-lg  right-0 flex flex-col border-zinc-200 dark:border-zinc-800 bg-slate-50  dark:bg-mildDarkMode">
      <div className="flex flex-row justify-between">
        <p className="text-zinc-700 dark:text-zinc-300 text-md font-averta-semibold mb-6 ">
          Output
        </p>
        <div className="flex flex-col">
        
        <div className="flex flex-row gap-4">
            
          <button onClick={() => copyToClipboard(generatedPrompt)}className="flex flex-row items-center rounded-xl px-4 py-1 bg-transparent text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="white"
              class="w-5 h-5 pr-0.5 mt-0.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
            Copy
          </button>
        
          
          <button onClick={() => downloadTxtFile(generatedPrompt)}className="flex flex-row items-center rounded-xl px-4 py-1 bg-transparent text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-5 h-5 pr-0.5 mt-0.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Export
          </button>
        </div>
        
       
        <div className={`flex flex-row ml-4 text-sm mt-1 h-[30px] ${copiedText ?  "opacity-100" : "opacity-0 pointer-events-none"} overflow-hidden`} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#86efac" class="w-5 h-5 mr-0.5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

            
            Done!
            
            </div>
            
        </div>
        
      </div>
      <div className="mt-4">
        <ReactMarkdown>{generatedPrompt.split('"""')[1]}</ReactMarkdown>
      </div>
    </div>
  )
}
