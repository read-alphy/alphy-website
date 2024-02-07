import React, { useState, useEffect } from 'react'
import InputArea from './InputArea'
import Settings from './Settings'
import { Button, Spinner } from '@material-tailwind/react'
import { promptGenerator } from '../Prompts/PromptHandler'
import Toolbox from './Toolbox'

import MannerArea from './MannerArea'

const sourcesMap = {
  yt: 'YouTube',
  sp: 'Twitter Spaces',
  x: 'Twitter',
  tw: 'Twitch',
  ap: 'Apple Podcasts',
}

export default function GenerationZone({
  data,

  setGeneratedPrompt,
  setActiveGenerationZone,
  outputMessage,
  setOutputMessage,
  isLoading,
  setIsLoading,
  setPromptType,
}) {
  const [userPrompt, setUserPrompt] = useState('')
  const [advancedSettingsToggled, setAdvancedSettingsToggled] = useState(false)
  const [toolboxActive, setToolboxActive] = useState(false)
  const [selectedTool, setSelectedTool] = useState('')

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
      source_type = sourcesMap[data.source_type]
    }
    if (data.creator_name) {
      creator_name = data.creator_name
    }

    const content_details = {
      manner: settings.manner,
      source_variant: settings.content_to_use,
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
    const request = {
      source_type: contentDetails.source_type,
      source_id: contentDetails.source_id,
      source_variant: contentDetails.source_variant,
      // "source_variant": "transcript",

      // TEMPORARILY REQUIRED
      title: contentDetails.source_title,
      creator: contentDetails.creator_name,

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
      command: settings.command_type,
      command_custom:
        settings.command_type === 'command_custom' ? userPrompt : null,
    }

    console.log(request)
    /* 
    if (settings.command_type) {
      setPromptType(settings.command_type)
    }
    

    const ws = new WebSocket('ws://localhost:8000/sandbox');
  
      ws.onopen = () => {
        ws.send(JSON.stringify(request));
      }


      ws.onmessage = (message) => {
        setOutputMessage((prevMessage) => prevMessage + message.data);
        
      }


      ws.onclose = () => {
       console.log("closed")
       
      }
      ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
        setOutputMessage('Error connecting to WebSocket');
      };
      
    setActiveGenerationZone(false)  */

    /*     const generated_prompt = promptGenerator(settings, contentDetails)
    
    setGeneratedPrompt(generated_prompt)
    setOutputMessage(generated_prompt) */
  }
  const adjustments = (
    <svg
      class="w-5 h-5 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={`${theme === 'light' ? '#52525b' : 'white'}`}
        stroke-linecap="round"
        stroke-width="1.5"
        d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"
      />
    </svg>
  )

  return (
    <div className="mt-6   h-full  flex flex-col  px-2 sm:px-0">
      <div
        className={`max-w-[800px] w-full font-averta-regular text-lg text-zinc-500 dark:text-zinc-200 transition-opacity overflow-hidden ease-in-out ${
          !toolboxActive && outputMessage.length === 0
            ? 'opacity-100 delay-300 '
            : 'opacity-0  pointer-events-none   '
        }`}
      >
        Turn the conversation into vibrant content.
      </div>
      {
        <div
          className={` max-w-[800px] w-full overflow-hidden transition-[max-height] duration-300 px-2 ease-in-out ${
            toolboxActive ? 'max-h-[100%]' : 'max-h-0 '
          }`}
        >
          <MannerArea
            settings={settings}
            setSettings={setSettings}
            theme={theme}
          />
        </div>
      }

      <div
        className={` max-w-[800px] w-full overflow-hidden transition-[max-height] duration-300 ease-in-out rounded-md pb-4 px-2 ${
          selectedTool === 'command_custom' ? 'max-h-[100%]' : 'max-h-0 '
        }`}
      >
        <InputArea
          userPrompt={userPrompt}
          setUserPrompt={setUserPrompt}
          createDopeStuff={createDopeStuff}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <div className="md:hidden">
          <Settings
            settings={settings}
            setSettings={setSettings}
            advancedSettingsToggled={advancedSettingsToggled}
            setAdvancedSettingsToggled={setAdvancedSettingsToggled}
            theme={theme}
            adjustments={adjustments}
          />
        </div>

        <div className="flex flex-row justify-end mt-4  pr-6 ">
          <div className="hidden md:flex">
            <Settings
              settings={settings}
              setSettings={setSettings}
              advancedSettingsToggled={advancedSettingsToggled}
              setAdvancedSettingsToggled={setAdvancedSettingsToggled}
              theme={theme}
              adjustments={adjustments}
            />
          </div>
          <Button
            ripple={true}
            onClick={() => setAdvancedSettingsToggled(!advancedSettingsToggled)}
            className="items-center margin-auto  gap-1 items-center flex text-center justify-center bg-transparent border text-zinc-600 dark:text-zinc-300 border-indigo-200 dark:border-indigo-200 cursor-pointer normal-case mr-4 h-[40px]"
          >
            {adjustments} <p className="hidden md:flex">Advanced Settings</p>
          </Button>

          <Button
            onClick={() => createDopeStuff()}
            ripple={true}
            disabled={
              selectedTool === 'command_custom' && userPrompt.length === 0
            }
            className={`${
              selectedTool === 'command_custom' && userPrompt.length === 0
                ? 'opacity-70'
                : 'opacity-100'
            }  transition-opacity duration-300 ease-in-out bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] h-[38px] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800  text-zinc-700 dark:from-purple-400 font-averta-regular normal-case w-[120px]`}
          >
            {isLoading ? <Spinner color="blue" size="sm" /> : 'Generate'}
          </Button>
        </div>
      </div>

      <Toolbox
        theme={theme}
        createDopeStuff={createDopeStuff}
        toolboxActive={toolboxActive}
        setToolboxActive={setToolboxActive}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
      />
    </div>
  )
}
