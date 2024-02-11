import React, { useState } from 'react'
import InputArea from './InputArea'
import Settings from './Settings'
import { Button, Spinner } from '@material-tailwind/react'
import Toolbox from './Toolbox'

import MannerArea from './MannerArea'

/* const sourcesMap = {
  yt: 'YouTube',
  sp: 'Twitter Spaces',
  x: 'Twitter',
  tw: 'Twitch',
  ap: 'Apple Podcasts',
} */

export default function GenerationZone({
  settings,
  setSettings,
  outputMessage,
  userPrompt,
  setUserPrompt,
  createDopeStuff,
  isLoading,
  setIsLoading,
  theme,
  selectedTool,
  setSelectedTool,
}) {
  const [advancedSettingsToggled, setAdvancedSettingsToggled] = useState(false)
  const [toolboxActive, setToolboxActive] = useState(false)

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
        className={`lg:max-w-[800px]  font-averta-regular text-lg text-zinc-500 dark:text-zinc-200 transition-opacity overflow-hidden ease-in-out ${
          !toolboxActive && outputMessage.length === 0
            ? 'opacity-100 delay-300 '
            : 'opacity-0  pointer-events-none   '
        }`}
      >
        Turn the conversation into vibrant content.
      </div>

      <div
        className={` ${
          selectedTool === 'custom' &&
          'bg-slate-50 dark:bg-mildDarkMode rounded-lg w-fit mb-4'
        } sm:p-2`}
      >
        {
          <div
            className={` lg:max-w-[800px] w-full overflow-hidden  transition-[max-height] duration-300 sm:px-2 ease-in-out ${
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
          className={`lg:max-w-[800px] w-fit  overflow-hidden  transition-[max-height] duration-300 ease-in-out rounded-md pb-4 sm:px-2 ${
            selectedTool === 'custom' ? 'max-h-[100%]' : 'max-h-0 '
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

          <div className={`flex flex-row justify-end mt-4 -ml-6 mr-4 sm:mr-2`}>
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
              onClick={() =>
                setAdvancedSettingsToggled(!advancedSettingsToggled)
              }
              className="items-center margin-auto  gap-1 items-center flex text-center justify-center bg-transparent border text-zinc-600 dark:text-zinc-300 border-indigo-200 dark:border-indigo-200 cursor-pointer normal-case mr-4 h-[40px]"
            >
              {adjustments} <p className="hidden md:flex">Advanced Settings</p>
            </Button>

            <Button
              onClick={() => createDopeStuff()}
              ripple={true}
              disabled={selectedTool === 'custom' && userPrompt.length === 0}
              className={`${
                selectedTool === 'custom' && userPrompt.length === 0
                  ? 'opacity-70'
                  : 'opacity-100'
              }  transition-opacity duration-300 ease-in-out bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] h-[38px] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800  text-zinc-700 dark:from-purple-400 font-averta-regular normal-case w-[120px]`}
            >
              {isLoading ? <Spinner color="blue" size="sm" /> : 'Generate'}
            </Button>
          </div>
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
