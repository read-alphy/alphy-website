

import React, { useState } from 'react'
import MannerArea from './MannerArea'
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


export default function Settings({
  settings,
  setSettings,
  theme,
  adjustments,
  advancedSettingsToggled,
  setAdvancedSettingsToggled,
  manner,
  setManner,
}) {
  
  const [detailLevel, setDetailLevel] = useState(null)
  const [lengthLevel, setLengthLevel] = useState(null)
  const [useTranscript, setUseTranscript] = useState(false)
  const [useTranscriptExplanation, setUseTranscriptExplanation] =
    useState(false)

  return (
    <div className="pl-2 w-full  ">
      {
        <div
          className={`${
            advancedSettingsToggled ? 'max-h-96 ' : 'max-h-0'
          } pr-6 overflow-hidden transition-[max-height] duration-500 ease-in-out rounded-md `}
        >
          
      

         
          <div className="flex flex-row gap-2 mt-6">
            <p className=" items-center text-center text-zinc-500 dark:text-zinc-300 text-sm mr-6  ">
              Detail
            </p>
            <button
              value={'Low'}
              className={`border text-zinc-500  ${
                detailLevel === 'Low'
                  ? 'border-indigo-200 dark:border-indigo-400 bg-indigo-100 dark:bg-indigo-200 dark:text-zinc-500'
                  : 'border-zinc-200 dark:border-zinc-700 dark:bg-mildDarkMode dark:text-zinc-300'
              } rounded-md px-2 py-1 text-sm`}
              onClick={e => {
                if (detailLevel !== e.target.value) {
                  setSettings({
                    ...settings,
                    detail_level: e.target.value.toLowerCase(),
                  })
                  setDetailLevel(e.target.value)
                } else {
                  setSettings({ ...settings, detail_level: null })
                  setDetailLevel(null)
                }
              }}
            >
              Low
            </button>
            <button
              value={'Mid'}
              className={`border text-zinc-500 dark:text-zinc-300 ${
                detailLevel === 'Mid'
                  ? 'border-indigo-200 dark:border-indigo-400 bg-indigo-100 dark:bg-indigo-200 dark:text-zinc-500'
                  : 'border-zinc-200 dark:border-zinc-700 dark:bg-mildDarkMode dark:text-zinc-300'
              } rounded-md px-2 py-1 text-sm`}
              onClick={e => {
                if (detailLevel !== e.target.value) {
                  setSettings({ ...settings, detail_level: e.target.value })
                  setDetailLevel(e.target.value)
                } else {
                  setSettings({ ...settings, detail_level: null })
                  setDetailLevel(null)
                }
              }}
            >
              Mid
            </button>
            <button
              value={'High'}
              className={`border text-zinc-500 dark:text-zinc-300 ${
                detailLevel === 'High'
                  ? 'border-indigo-200 dark:border-indigo-400 bg-indigo-100 dark:bg-indigo-200 dark:text-zinc-500'
                  : 'border-zinc-200 dark:border-zinc-700 dark:bg-mildDarkMode dark:text-zinc-300'
              }
                rounded-md px-2 py-1 text-sm`}
              onClick={e => {
                if (detailLevel !== e.target.value) {
                  setSettings({
                    ...settings,
                    detail_level: e.target.value.toLowerCase(),
                  })
                  setDetailLevel(e.target.value)
                } else {
                  setSettings({ ...settings, detail_level: null })
                  setDetailLevel(null)
                }
              }}
            >
              High
            </button>
          </div>

          <div className="mt-8 flex flex-row gap-2">
            <p className=" items-center text-center text-zinc-500 dark:text-zinc-300 text-sm mr-4  ">
              Length
            </p>
          

            <button
              value={'Short'}
              className={`border text-zinc-500 dark:text-zinc-300 ${
                lengthLevel === 'Short'
                  ? 'border-indigo-200 dark:border-indigo-400 bg-indigo-100 dark:bg-indigo-200 dark:text-zinc-500'
                  : 'border-zinc-200 dark:border-zinc-700 dark:bg-mildDarkMode dark:text-zinc-300'
              } rounded-md px-2 py-1 text-sm`}
              onClick={e => {
                if (lengthLevel !== e.target.value) {
                  setSettings({
                    ...settings,
                    length_level: e.target.value.toLowerCase(),
                  })
                  setLengthLevel(e.target.value)
                } else {
                  setSettings({ ...settings, length_level: null })
                  setLengthLevel(null)
                }
              }}
            >
              Short
            </button>
            <button
              value={'Average'}
              className={`border text-zinc-500 dark:text-zinc-300 ${
                lengthLevel === 'Average'
                  ? 'border-indigo-200 dark:border-indigo-400 bg-indigo-100 dark:bg-indigo-200 dark:text-zinc-500'
                  : 'border-zinc-200 dark:border-zinc-700 dark:bg-mildDarkMode dark:text-zinc-300'
              } rounded-md px-2 py-1 text-sm`}
              onClick={e => {
                if (lengthLevel !== e.target.value) {
                  setSettings({ ...settings, length_level: 'medium' })
                  setLengthLevel(e.target.value)
                } else {
                  setSettings({ ...settings, length_level: null })
                  setLengthLevel(null)
                }
              }}
            >
              Average
            </button>
            <button
              value={'Long'}
              className={`border text-zinc-500 dark:text-zinc-300 ${
                lengthLevel === 'Long'
                  ? 'border-indigo-200 dark:border-indigo-400 bg-indigo-100 dark:bg-indigo-200 dark:text-zinc-500'
                  : 'border-zinc-200 dark:border-zinc-700 dark:bg-mildDarkMode dark:text-zinc-300'
              } rounded-md px-2 py-1 text-sm`}
              onClick={e => {
                if (lengthLevel !== e.target.value) {
                  setSettings({
                    ...settings,
                    length_level: e.target.value.toLowerCase(),
                  })
                  setLengthLevel(e.target.value)
                } else {
                  setSettings({ ...settings, length_level: null })
                  setLengthLevel(null)
                }
              }}
            >
              Long
            </button>
          </div>

          <div className="flex flex-row mt-6 items-center gap-2">
            <div className="flex flex-row">
              <p className=" text-zinc-500 dark:text-zinc-300 text-sm">
                Use Transcript
              </p>

              <div className="relative flex flex-col">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative flex flex-row group cursor-default">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke={theme === 'light' ? '#a1a1aa' : '#a1a1aa'}
                          className="w-5 h-5 ml-1 cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                          />
                        </svg>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[400px] bg-white text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 text-xs shadow-md border">
                      Custom creations work on summaries by default. Switching to
                      transcripts will cover more details, but the process may take
                      longer.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <Switch
                checked={useTranscript}
                onCheckedChange={(checked) => {
                  setUseTranscript(checked);
                  setSettings({
                    ...settings,
                    content_to_use: checked ? 'transcript' : 'summary',
                  });
                }}
                className="data-[state=checked]:bg-indigo-500 data-[state=checked]:glow-indigo-500/30"
              />
          </div>

          <div className="mt-2">
            <MannerArea
              settings={settings}
              setSettings={setSettings}
              theme={theme}
              manner={manner}
              setManner={setManner}
            />
          </div>
        </div>
      }
    </div>
  )
}
