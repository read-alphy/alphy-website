import React, { useState, useEffect } from 'react'
import GenerationZone from './Generation/GenerationZone'
import OutputZone from './Output/OutputZone'
import { API_HOST } from '../../../constants'

export default function Sandbox({ data, askAlphyForSandbox, askText }) {
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [outputMessage, setOutputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeGenerationZone, setActiveGenerationZone] = useState(true)
  const [promptType, setPromptType] = useState('')
  const [userPrompt, setUserPrompt] = useState('')
  const [selectedTool, setSelectedTool] = useState('')
  const [creationCalled, setCreationCalled] = useState(false)
  const [error, setError] = useState(false)

  const theme = localStorage.getItem('theme')
  useEffect(() => {
    setSettings(prevSettings => {
      return {
        ...prevSettings,
        command_type: selectedTool,
      }
    })
  }, [selectedTool])

  const [contentDetails, setContentDetails] = useState({
    content: '',
    content_type: '',
    source_type: '',
    source_title: '',
    creator_name: '',
  })

  const [settings, setSettings] = useState({
    length_level: null,
    detail_level: null,
    content_to_use: 'summary',
    command_type: '',
    manner: null,
  })

  useEffect(() => {
    if (askAlphyForSandbox) {
      let excerpt = '"' + askText + '"'
      setUserPrompt(excerpt)
      setSelectedTool('custom')
    }
  }, [askAlphyForSandbox, askText])

  function generateContentDetails() {
    let source_title = ''
    let source_type = ''
    let creator_name = ''
    let source_id = ''

    if (data.source_id) {
      source_id = data.source_id
    }
    if (data.title) {
      source_title = data.title
    }
    if (data.source_type) {
      source_type = data.source_type
    }
    if (data.creator_name) {
      creator_name = data.creator_name
    }

    const content_details = {
      manner: settings.manner,
      source_variant:
        settings.command_type === 'custom'
          ? settings.content_to_use
          : 'transcript',
      source_type: source_type,
      source_id: source_id,
      source_title: source_title,
      creator_name: creator_name,
    }
    return content_details
  }

  useEffect(() => {
    if (data === null || data === undefined) {
      return
    }
    if (data.summaries === null || data.summaries === undefined) {
      return
    }

    const content_details = generateContentDetails()
    setContentDetails(content_details)
  }, [data, settings])

  function createDopeStuff() {
    setOutputMessage('')
    setCreationCalled(true)
    setIsLoading(true)

    const request = {
      source_type: contentDetails.source_type,
      source_id: contentDetails.source_id,
      /* source_variant: contentDetails.source_variant, */
      // "source_variant": "transcript",

      // TEMPORARILY REQUIRED
      title: contentDetails.source_title,
      creator: contentDetails.creator_name,
      summary_lang: contentDetails.source_variant === 'summary' ? 'en' : null,

      // MUST GIVE manner_custom if manner is custom
      // OMITTABLE
      manner: settings.manner,
      // "manner": "custom",
      // "manner_custom": "Talk like a kindergartener",

      // OMITTABLE
      slider_detail: settings.detail_level,
      slider_length: settings.length_level,

      // MUST GIVE command_custom if command is custom
      // NOT OMITTABLE
      command:
        settings.command_type === 'custom'
          ? { prompt: userPrompt }
          : settings.command_type,
    }

    if (settings.command_type) {
      setPromptType(settings.command_type)
    }

    const ws = new WebSocket(`wss://${API_HOST}/sandbox/ws`)

    /* wss://backend-staging-2459.up.railway.app/ws/question */
    /* wss://backend-staging-2459.up.railway.app/ws/sandbox */

    ws.onopen = () => {
      console.log('connected')
      ws.send(JSON.stringify(request))
    }

    ws.onmessage = message => {
      setOutputMessage(prevMessage => prevMessage + message.data)
    }

    ws.onclose = event => {
      console.log('closed')
      setIsLoading(false)
      setError(true)
    }
    ws.onerror = error => {
      console.error('WebSocket Error:', error)
      setIsLoading(false)
      setError(true)
    }

    setActiveGenerationZone(false)

    /*     const generated_prompt = promptGenerator(settings, contentDetails)
    
    setGeneratedPrompt(generated_prompt)
    setOutputMessage(generated_prompt) */
  }

  return (
    <div className="min-h-[70vh] w-full ">
      <div className="flex flex-col ">
        {creationCalled === true && (
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
                userPrompt={userPrompt}
                setUserPrompt={setUserPrompt}
                theme={theme}
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
                createDopeStuff={createDopeStuff}
                settings={settings}
                setSettings={setSettings}
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
              userPrompt={userPrompt}
              setOutputMessage={setOutputMessage}
              activeGenerationZone={activeGenerationZone}
              setActiveGenerationZone={setActiveGenerationZone}
              promptType={promptType}
              setPromptType={setPromptType}
              createDopeStuff={createDopeStuff}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
