import React, { useEffect, useRef } from 'react'
import { Quote, FileEdit } from 'lucide-react'

export default function InputArea({
  userPrompt,
  setUserPrompt,
  createDopeStuff,
  isLoading,
}) {
  const textareaRef = useRef(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      setUserPrompt(textareaRef.current.value)
      textarea.style.height = 'auto' // Reset height to recalculate
      textarea.style.height = textarea.scrollHeight + 'px' // Set to scroll height
    }
  }

  useEffect(() => {
    resizeTextarea()
  }, [userPrompt])

  const prompt_quoteGetter = `Extract and compile a comprehensive list of quotes related to the talking points I specify with the timestamps. Focus on identifying and presenting all mentions, discussions, and analyses that directly pertain to the talking points. For instance, if my talking point is "generative AI", I want you to get a comprehensive list of quotes from the conversation about generative AI with the timestamps.\n\n Here are the talking points:  [TALKING POINTS]`
  const prompt_summarizer = `Summarize the conversation by focusing on the following subjects : [SUBJECTS]`

  return (
    <div className="flex flex-col mt-10 pr-4 sm:pr-0">
      <p className="font-normal quicksand ml-2 text-sm  text-slate-700 dark:text-zinc-300">
        Tell what you want to create
      </p>
      <textarea
        ref={textareaRef}
        className="  focus:outline-none p-4 text-zinc-700 text-sm md:text-md dark:text-zinc-200 textarea overflow-y-scroll glow-effect-textarea focus-glow-effect dark:bg-zinc-900  dark:border-zinc-700 rounded-lg mt-4 md:mx-0  
        margin-auto min-h-[20vh] max-h-[400px] sm:min-h-[10vh] sm:max-h-[300px]  resize-none dark:focus:border-zinc-700 focus:border-zinc-200 border border-zinc-200 placeholder:text-sm"
        onInput={resizeTextarea}
        onChange={resizeTextarea}
        value={userPrompt}
        placeholder="generate something beautiful for me..."
      />
      
      <div className="flex flex-row mt-6 mb-10 overflow-y-hidden gap-4 overflow-x-scroll">
        <button
          onClick={() => {
            if (textareaRef.current) {
              setUserPrompt(prompt_quoteGetter)
            }
          }}
          className=" px-4  py-1 underline text-sm text-zinc-500 dark:text-zinc-300 flex flex-row items-center gap-0.5"
        >
          <Quote
            className="text-zinc-500 dark:text-zinc-300 mr-1"
            size={16}
          />
          Get me quotes
        </button>
        <button
          onClick={() => {
            if (textareaRef.current) {
              setUserPrompt(prompt_summarizer)
            }
          }}
          className="  px-4 py-1 underline text-sm dark:text-zinc-300 text-zinc-500 flex flex-row items-center "
        >
          <FileEdit
            className="text-zinc-500 dark:text-zinc-300 mr-1"
            size={16}
          />
          Summarize with focus
        </button>
      </div>
    </div>
  )
}
