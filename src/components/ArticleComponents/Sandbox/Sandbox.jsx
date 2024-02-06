import React, { useState } from 'react'
import GenerationZone from './Generation/GenerationZone'
import OutputZone from './Output/OutputZone'
import InputMessage from './Output/InputMessage/InputMessage'

export default function Sandbox({ data }) {
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [outputMessage, setOutputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeGenerationZone, setActiveGenerationZone] = useState(true)
  const [promptType, setPromptType] = useState('')

  return (
    <div className="min-h-[70vh] w-full">
      {/*  <div className="flex flex-row text-zinc-700 dark:text-zinc-300 gap-6 text-lg cursor-pointer">
        <p className="underline" onClick={() => setActiveGenerationZone(true)}>
          Generation Module
        </p>
        <p className="underline" onClick={() => setActiveGenerationZone(false)}>
          Output Zone
          </p>
      </div>  */}
      {/* <div className="border-b border-gray-100 dark:border-zinc-700  flex mt-10 mb-5 dark:opacity-40 w-full max-w-[1000px]"></div> */}
      <div className="flex flex-col ">
        {outputMessage.length > 0 && (
          <div className="mb-10">
            <button
              className=" flex underline flex-row gap-2"
              onClick={() => setActiveGenerationZone(!activeGenerationZone)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke={localStorage.theme === 'light' ? '#3f3f46' : '#f4f4f5'}
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>

              <span className="text-zinc-700 dark:text-zinc-100">
                {activeGenerationZone
                  ? 'See your output'
                  : 'Create something new'}
              </span>
            </button>
          </div>
        )}

        {/*  {!activeGenerationZone ? (
          <OutputZone
            generatedPrompt={generatedPrompt}
            outputMessage={outputMessage}
            setOutputMessage={setOutputMessage}
            activeGenerationZone={activeGenerationZone}
            setActiveGenerationZone={setActiveGenerationZone}
            promptType={promptType}
            setPromptType={setPromptType}
          />
        ) : (
          <GenerationZone
            data={data}
            generatedPrompt={generatedPrompt}
            setGeneratedPrompt={setGeneratedPrompt}
            outputMessage={outputMessage}
            setOutputMessage={setOutputMessage}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            activeGenerationZone={activeGenerationZone}
            setActiveGenerationZone={setActiveGenerationZone}
            promptType={promptType}
            setPromptType={setPromptType}
          />
        )} */}

        <div className=" grid grid-cols-4">
          {activeGenerationZone === true && (
            <div className="col-span-4">
              <GenerationZone
                data={data}
                generatedPrompt={generatedPrompt}
                setGeneratedPrompt={setGeneratedPrompt}
                outputMessage={outputMessage}
                setOutputMessage={setOutputMessage}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                activeGenerationZone={activeGenerationZone}
                setActiveGenerationZone={setActiveGenerationZone}
                promptType={promptType}
                setPromptType={setPromptType}
              />
            </div>
          )}

          <div
            className={`${
              activeGenerationZone === false ? 'col-span-3' : 'hidden'
            }`}
          >
            <OutputZone
              generatedPrompt={generatedPrompt}
              outputMessage={outputMessage}
              setOutputMessage={setOutputMessage}
              activeGenerationZone={activeGenerationZone}
              setActiveGenerationZone={setActiveGenerationZone}
              promptType={promptType}
              setPromptType={setPromptType}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
