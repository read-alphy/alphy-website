import React, { useState } from 'react'
import GenerationZone from './Generation/GenerationZone'
import OutputZone from './Output/OutputZone'
import InputMessage from './Output/InputMessage/InputMessage'

export default function Sandbox({ data }) {
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [outputMessage, setOutputMessage] = useState(' ')
  const [isLoading, setIsLoading] = useState(false)
  const [activeGenerationZone, setActiveGenerationZone] = useState(true)
  const [promptType, setPromptType] = useState('')

  return (
    <div className="min-h-[70vh] w-full ">
      <div className="flex flex-col ">
        {outputMessage.length > 0 && (
          <div className=" w-full mt-8 max-w-[800px]">
            <button
              className=" flex underline flex-row gap-2"
              onClick={() => setActiveGenerationZone(!activeGenerationZone)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke={localStorage.theme === 'light' ? '#64748b' : '#f4f4f5'}
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>

              <span className="  text-slate-500 dark:text-zinc-100">
                {activeGenerationZone
                  ? 'See your output'
                  : 'Create something new'}
              </span>
            </button>
          </div>
        )}

        <div className=" grid grid-cols-4 relative">
          {activeGenerationZone === true && (
            <div
              className={`transition-transform duration-500 ${
                activeGenerationZone
                  ? 'translate-x-0'
                  : '-translate-x-full opacity-0'
              } col-span-4`}
            >
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
            className={`absolute inset-0 transition-transform transition-opacity duration-300 mx-auto w-full justify-center ${
              !activeGenerationZone
                ? 'translate-x-0 opacity-100'
                : 'translate-x-[125%] opacity-20 '
            } col-span-4`}
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
