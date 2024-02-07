import React, { useEffect, useRef } from 'react'
import { Button, Spinner } from '@material-tailwind/react'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import EditNoteIcon from '@mui/icons-material/EditNote'

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

    if (textarea.value.trim() !== '') {
      textarea.classList.add('glow-effect-textarea')
    } else {
      textarea.classList.remove('glow-effect-textarea')
    }
  }

  useEffect(() => {
    resizeTextarea()
  }, [userPrompt])

  const prompt_quoteGetter = `Extract and compile a comprehensive list of quotes related to the talking points I specify. Focus on identifying and presenting all mentions, discussions, and analyses that directly pertain to the talking points. For instance, if my talking point is "generative AI", I want you to get a comprehensive list of quotes from the conversation about generative AI.\n\n Here are the talking points:  [TALKING POINTS]`
  const prompt_summarizer = `Summarize the conversation by focusing on the following subjects : [SUBJECTS]`

  return (
    <div className="flex flex-col mt-10 ">
      <p className="font-medium  text-md  text-zinc-500 ml-2 dark:text-zinc-300">
        Tell what you want to generate
      </p>
      <textarea
        ref={textareaRef}
        className="  text-zinc-700 text-sm md:text-md dark:text-zinc-200 textarea overflow-y-scroll  focus-glow-effect  dark:bg-mildDarkMode  dark:border-zinc-700 rounded-lg w-[95%] mt-4 mx-2 md:mx-0  
        margin-auto min-h-[10vh] max-h-[300px]  resize-none dark:focus:border-zinc-700 focus:border-zinc-200 border border-zinc-200 placeholder:text-sm"
        onInput={resizeTextarea}
        onChange={resizeTextarea}
        value={userPrompt}
        placeholder="generate something beautiful for me..."
      />
      {/*     <Button onClick={() => createDopeStuff()} ripple={true} className="mr-6 hidden md:flex bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] h-[38px] from-purple-200 to-blue-200 text-zinc-700 font-averta-regular normal-case">
            {isLoading ? <Spinner color="blue" size="sm"/>: "Generate"}
        </Button> */}
      <div className="flex flex-row mt-6 mb-10 overflow-y-hidden gap-4 overflow-x-scroll">
        <button
          onClick={() => {
            if (textareaRef.current) {
              setUserPrompt(prompt_quoteGetter)
              textareaRef.style.height = 'auto' // Reset height to recalculate
              textareaRef.style.height = textareaRef.scrollHeight + 'px' // Set to scroll height
            }
          }}
          className=" px-4  py-1 underline text-sm text-zinc-500 dark:text-zinc-300 flex flex-row items-center gap-0.5"
        >
          <FormatQuoteIcon
            className="text-zinc-500  dark:text-zinc-300 mt-1 mr-1"
            sx={{
              width: '16px',
              height: '16px',
            }}
          />
          Get me quotes
        </button>
        <button
          onClick={() => {
            if (textareaRef.current) {
              setUserPrompt(prompt_summarizer)
              textareaRef.style.height = 'auto' // Reset height to recalculate
              textareaRef.style.height = textareaRef.scrollHeight + 'px' // Set to scroll height
            }
          }}
          className="  px-4 py-1 underline text-sm dark:text-zinc-300 text-zinc-500 flex flex-row items-center "
        >
          <EditNoteIcon
            className="text-zinc-500 dark:text-zinc-300 mt-0.5 mr-1"
            sx={{
              width: '16px',
              height: '16px',
            }}
          />
          Summarize with focus
        </button>
      </div>
    </div>
  )
}
