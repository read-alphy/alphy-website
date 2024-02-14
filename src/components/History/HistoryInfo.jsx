import { inputMessages } from '../Content/Sandbox/messageBank'
import Twitter from '../../../public/img/twitter_space.webp'
import ApplePodcast from '../../../public/img/apple_podcast_banner.png'
import Twitch from '../../../public/img/twitchSource.png'
import X from '../../../public/img/X.png'
/* import YouTube from '../../img/youtube.png'
import HistoryIcon from '@mui/icons-material/History' */
import { useState } from 'react'
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'

export default function HistoryDefault({ sandboxHistory, setSandboxHistory }) {
  const router = useRouter()

  const [visibleGroups, setVisibleGroups] = useState({})
  const [copiedText, setCopiedText] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState(null)

  const seeInSource = item => {
    sessionStorage.setItem('fillPrompt', JSON.stringify(item))

    router.push(`/${item.source_type}/${item.source_id}`)
  }

  const toggleGroupVisibility = index => {
    setVisibleGroups(prevState => ({
      ...prevState,
      [index]: !prevState[index],
    }))
  }

  const imageURLSetter = (source_type, source_id) => {
    if (source_type === 'sp') {
      return Twitter
    } else if (source_type === 'x') {
      return X
    } else if (source_type === 'ap') {
      return ApplePodcast
    } else if (source_type === 'tw') {
      return Twitch
    } else if (source_type === 'yt') {
      /* return YouTube  */
      return `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`
    } else return null
  }

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(true)
      setCopiedIndex(index)
      setTimeout(() => {
        setCopiedText(false)
      }, 500)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="mx-auto flex flex-col w-full items-center mt-10 xl:mt-20 max-w-[800px] pb-20">
      <div className="flex flex-row text-zinc-700 dark:text-zinc-300 w-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8    text-zinc-700 dark:text-zinc-300 mr-2   "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <p className="text-xl font-averta-semibold">History</p>
      </div>

      <div className="border-b border-gray-200 dark:border-zinc-600 w-full mt-4"></div>
      <div className="mt-10">
        {sandboxHistory &&
          sandboxHistory.map((item, index) => (
            <div
              onClick={() => toggleGroupVisibility(index)}
              className="mt-4 cursor-pointer "
              key={index}
            >
              <div className="flex flex-row gap-6 items-center relative w-full">
                <Image
                  src={imageURLSetter(item.source_type, item.source_id)}
                  width={40}
                  className="rounded-lg"
                />
                <p className="text-xl text-zinc-700 dark:text-zinc-300 font-averta-semibold hover:brightness-[150%] transition  duration-300 ease-in-out">
                  {item.title}
                </p>

                <div className="flex flex-col items-end right-0 absolute mt-4 ">
                  <button
                    onClick={event => {
                      event.stopPropagation()
                      copyToClipboard(item.response, index)
                    }}
                    className="flex flex-row items-center rounded-xl px-4 py-1 bg-transparent text-sm font-averta-semibold text-zinc-500 dark:text-zinc-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke={`${
                        localStorage.getItem('theme') === 'light'
                          ? '#71717a'
                          : '#d4d4d8'
                      }`}
                      class="w-5 h-5 pr-0.5 mt-0.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                    Copy
                  </button>

                  <div
                    className={`flex text-zinc-500 dark:text-zinc-300 flex-row text-sm mt-1 h-[30px] mr-4 ${
                      copiedText && index === copiedIndex
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none    '
                    } overflow-hidden`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#86efac"
                      class="w-5 h-5 mr-0.5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    Done!
                  </div>
                </div>
              </div>
              <div className="flex flex-col transition  duration-300 ease-in-out">
                <p className="flex text-md text-zinc-700 dark:text-zinc-300 mt-4  font-averta-semibold">
                  {typeof item.request.command === 'object'
                    ? item.request.command.prompt.slice(0, 100)
                    : inputMessages
                        .find(obj => obj.command_type === item.request.command)
                        .message.slice(0, 100)}
                </p>
                <p
                  className={`hover:brightness-[150%]   transition-all text-sm text-zinc-500 dark:text-zinc-400 overflow-hidden  duration-200 ease-in-out ${
                    visibleGroups[index]
                      ? 'max-h-96 text-zinc-600 mt-4'
                      : 'max-h-20 text-zinc-500 mt-2'
                  }`}
                >
                  <ReactMarkdown>{item.response}</ReactMarkdown>
                </p>

                <div
                  className={`w-full      relative ${
                    visibleGroups[index]
                      ? 'max-h-96 text-zinc-600  pt-6  mb-10   '
                      : 'max-h-0 text-zinc-500 overflow-hidden '
                  }`}
                >
                  <button
                    className="text-blue-900 font-averta-semibold text-sm dark:text-white right-0 absolute px-2 py-2 rounded-lg bg-sky-100 dark:bg-indigo-400"
                    onClick={event => {
                      event.stopPropagation()
                      seeInSource(item)
                    }}
                  >
                    See it on the source
                  </button>
                </div>
              </div>
              {index !== sandboxHistory.length - 1 && (
                <div className="border-b border-gray-200 dark:border-zinc-800 w-full mt-4"></div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
