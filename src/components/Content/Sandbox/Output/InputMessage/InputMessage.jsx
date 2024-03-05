import { inputMessages } from '../../messageBank'

import { Button } from '@material-tailwind/react'
import { useState, useRef, useEffect } from 'react'

export default function InputMessage({ promptType, userPrompt, settings, contentDetails }) {
  const [promptAreaExpanded, setPromptAreaExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const messageRef = useRef(null)

  const checkOverflow = () => {
    const current = messageRef.current
    if (isOverflowing) {
      return
    }
    if (!current) {
      return
    }
    const isOverflow = current.scrollHeight > current.clientHeight
    setIsOverflowing(isOverflow)
  }

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [promptAreaExpanded, userPrompt])

  let messageObject
  if (promptType) {
    messageObject = inputMessages.find(item => item.command_type === promptType)
    if (
      messageObject !== undefined &&
      messageObject.command_type === 'custom'
    ) {
      messageObject = {
        command_type: 'custom',
        message: userPrompt,
      }
    }
  }

  return (
    <div
      className={`xl:max-w-[800px] w-full  p-6 rounded-lg  right-0 flex flex-col  border border-slate-100 dark:border-zinc-700  bg-slate-50 dark:bg-mildDarkMode`}
    >
      {/* { <p className="text-zinc-600 dark:text-zinc-300 text-lg">Current Task</p>} */}
      {/* <TwitterIcon
        className=" mt-6"
        fontSize="large"
        sx={{
          color: '#4ab3f4',
        }}
      /> */}
      <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div
          className={`flex flex-col ${
            promptAreaExpanded ? 'max-h-96' : 'max-h-14'
          } overflow-y-hidden transition-all duration-500 ease-in-out`}
        >
          <p className="text-zinc-700 dark:text-zinc-300 text-md font-averta-semibold">
            Command
          </p>
          <p
            ref={messageRef}
            className="text-md mt-2 text-zinc-700 dark:text-zinc-300 overflow-hidden"
          >
            {messageObject !== undefined &&
              (messageObject.message ? messageObject.message : '')}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-zinc-500 dark:text-zinc-400 flex-row flex text-sm">
        <svg
              aria-hidden="true"
              className="flex-shrink-0 w-4 h-4 mr-1 text-sky-200 dark:text-zinc-400 mt-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            { settings!== undefined && settings.content_to_use!== undefined &&       <p className="mt-0.5">
      Generated On {settings.content_to_use==="transcript" ? "Transcript" : "Summary"}
      </p>
}
      </p>
      </div>
      </div>
      {isOverflowing && (
        <div classname="flex w-full items-center mx-auto">
          <svg
            onClick={() => setPromptAreaExpanded(!promptAreaExpanded)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={`w-4 h-4 mx-auto mt-4 cursor-pointer ${
              promptAreaExpanded ? 'rotate-180' : ''
            }`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
