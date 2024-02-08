import Radio, { radioClasses } from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import Sheet from '@mui/joy/Sheet'
import React, { useState } from 'react'

export default function MannerArea({ theme, settings, setSettings }) {
  const [manner, setManner] = useState('Neutral')

  const conversationBubble = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={`${theme === 'light' ? '#3f3f46' : '#a1a1aa'}`}
      class="w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
      />
    </svg>
  )

  const megaphone = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={`${theme === 'light' ? '#3f3f46' : '#a1a1aa'}`}
      class="w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
      />
    </svg>
  )

  const beaker = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={`${theme === 'light' ? '#3f3f46' : '#a1a1aa'}`}
      class="w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
      />
    </svg>
  )

  const commandLine = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={`${theme === 'light' ? '#3f3f46' : '#a1a1aa'}`}
      class="w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>
  )

  const book = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={`${theme === 'light' ? '#3f3f46' : '#a1a1aa'}`}
      class="w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  )

  const building = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={`${theme === 'light' ? '#3f3f46' : '#a1a1aa'}`}
      class="w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
      />
    </svg>
  )

  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke={`${theme === 'light' ? '#a5b4fc' : '#a5b4fc'}`}
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  )

  const newsPaper = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke={`${theme === 'light' ? '#3f3f46' : '#a1a1aa'}`}
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
      />
    </svg>
  )

  return (
    <div className="overflow-x-scroll content-area">
      <p className="mb-6  ml-2 text-md text-zinc-500 dark:text-zinc-300 w-fit">
        Pick your Agent (optional)
      </p>
      <RadioGroup
        className="w-[600px] pl-0.5 "
        aria-label="platform"
        defaultValue="Website"
        overlay
        name="platform"
        sx={{
          flexDirection: 'row',
          gap: 2,
          [`& .${radioClasses.checked}`]: {
            [`& .${radioClasses.action}`]: {
              inset: -1,
              border: '3px solid',
              borderColor: `${theme === 'light' ? '#a5b4fc' : '#a5b4fc'}  `,
            },
          },
          [`& .${radioClasses.radio}`]: {
            display: 'contents',
            '& > svg': {
              zIndex: 2,
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              bgcolor: `${theme === 'light' ? '#ffffff' : '#18181b'}    `,
              borderRadius: '50%',
            },
          },
        }}
      >
        {[
          'friend',
          'teacher',
          'marketer',
          'technical',
          'scientist',
          'writer',
          'journalist',
        ].map(value => (
          <div className="flex flex-col">
            <Sheet
              key={value}
              variant="outlined"
              sx={{
                background: 'transparent',

                width: '70px', // Set a fixed width
                height: '70px', // Set a height equal to the width to form a square
                borderRadius: 'md',
                boxShadow: 'sm',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: `1px solid ${
                  theme === 'light' ? '#e0e7ff' : '#52525b'
                }`,
                gap: 1.5,
                p: 2,
              }}
            >
              <Radio
                id={value}
                value={value}
                checkedIcon={checkIcon}
                checked={manner === value}
                onClick={e => {
                  if (manner === value) {
                    setManner('')
                    setSettings({ ...settings, manner: null })
                  } else {
                    setManner(e.target.value)
                    setSettings({ ...settings, manner: e.target.value })
                  }
                }}
              />

              {value === 'friend' && conversationBubble}
              {value === 'teacher' && building}
              {value === 'marketer' && megaphone}
              {value === 'technical' && commandLine}
              {value === 'scientist' && beaker}
              {value === 'writer' && book}
              {value === 'journalist' && newsPaper}
            </Sheet>

            <p className="dark:text-zinc-300 text-center items-center mx-auto mt-2 text-xs md:text-sm">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </p>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
