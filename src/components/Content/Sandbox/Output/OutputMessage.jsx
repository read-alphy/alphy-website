import ReactMarkdown from 'react-markdown'
import { saveAs } from 'file-saver'
import { useState, useEffect } from 'react'
import { Button } from '@material-tailwind/react'
import ReplayIcon from '@mui/icons-material/Replay'
import dynamic from 'next/dynamic'


const HandAnimation  = dynamic(() => import('./HandAnimation'), {
  ssr: false,
})

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
            <button
              onClick={() => copyToClipboard(generatedPrompt)}
              className="flex flex-row items-center rounded-xl px-1 sm:px-4 py-1 bg-transparent text-sm font-averta-semibold text-zinc-500 dark:text-zinc-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke={`${
                  theme === 'light'
                    ? '#71717a'
                    : '#d4d4d8'
                }`}
                className="w-5 h-5 pr-0.5 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
              <p className="hidden sm:flex">Copy</p>
            </button>

            <button
              onClick={() => downloadTxtFile(outputMessage)}
              className="flex flex-row items-center rounded-xl px-1 sm:px-4 py-1 bg-transparent  text-sm font-averta-semibold text-zinc-500 dark:text-zinc-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke={`${
                  theme === 'light'
                    ? '#71717a'
                    : '#d4d4d8'
                }`}
                className="w-5 h-5 pr-0.5 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              <p className="hidden sm:flex">Export</p>
            </button>

            <div className="mt-2  ">
              <Button
                onClick={() => createDopeStuff()}
                ripple={true}
                className=" flex flex-row bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] h-[38px] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800  text-zinc-700 font-averta-regular normal-case w-[120px]"
              >
                <ReplayIcon
                  className="mr-1 -ml-1"
                  sx={{
                    color: '#191919',
                    width: '16px',
                    height: '16px',
                  }}
                />

                <p>Regenerate</p>
              </Button>
            </div>
          </div>

          <div
            className={`flex text-zinc-500 dark:text-zinc-300 flex-row sm:ml-4 text-sm mt-1 h-[30px] ${
              copiedText ? 'opacity-100' : 'opacity-0 pointer-events-none    '
            } overflow-hidden`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#86efac"
              className="w-5 h-5 mr-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Done!
          </div>
        </div>
      </div>
      <div id="output-message" className=" output-message mt-4">
        {outputMessage.length > 0 ? (
          <ReactMarkdown>{outputMessage.replace(/\n/g, '\n')}</ReactMarkdown>
        ) : (
          <div className="">{isLoading && <HandAnimation />}</div>
        )}
      </div>
    </div>
  )
}
