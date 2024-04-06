import { inputMessages } from '../Content/Sandbox/messageBank'
import Twitter from '../../../public/img/twitter_space.png'
import ApplePodcast from '../../../public/img/apple_podcast_banner.png'
import Twitch from '../../../public/img/twitchSource.png'
import X from '../../../public/img/X.png'
/* import YouTube from '../../img/youtube.png'
import HistoryIcon from '@mui/icons-material/History' */
import { useState } from 'react'
import {useRouter} from 'next/router'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'


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
    if (window.getSelection().toString().length === 0) {
      setVisibleGroups(prevState => ({
        ...prevState,
        [index]: !prevState[index],
      }))
    }
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
    <div className="px-4 mx-auto sm:px-10 flex flex-col  items-center mt-10 xl:mt-20 sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] pb-20">
      <div className="flex flex-row text-slate-700 dark:text-zinc-300 w-full ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8    text-slate-700 dark:text-zinc-300 mr-2   "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <p className="text-xl quicksand font-bold">Creation History</p>
      </div>

      <div className="border-b border-gray-200 dark:border-zinc-600 w-full mt-4"></div>
      <div className="mt-10 ">
        {sandboxHistory && sandboxHistory.length === 0 && (
          <div className="text-center text-slate-700 dark:text-zinc-200">
            Anything you'll create with Playground will appear here.
            <br /> <br />
            {/* Learn more about Playground. */}
            Switch to the Playground mode on any source page to create content with AI.

           
            <video
            className="lg:max-w-[650px] mt-20 2xl:max-w-[700px] 3xl:max-w-[800px] border-4 rounded-lg border-zinc-900 dark:border-zinc-400 drop-shadow-lg"
            autoPlay
            loop
            muted
            >

            <source src="/img/playground_demo.mp4" type="video/mp4" />
          </video>



          </div>
        )}
        {sandboxHistory &&
          sandboxHistory.map((item, index) => (
            <div
              onMouseUp={() => toggleGroupVisibility(index)}
              className="mt-4 cursor-pointer  "
              key={index}
            >
              <div className="group">
                <div className="flex flex-row gap-6 items-center relative w-full  ">
                  <Image
                    src={imageURLSetter(item.source_type, item.source_id)}
                    width={100}
                    className="rounded-lg"
                    height={100}
                    alt="source image"
                  />
                  <p className="text-lg text-slate-700 dark:text-zinc-300 quicksand font-bold select-none w-full  group-hover:brightness-[125%] transition  duration-300 ease-in-out ">
                    {item.title}
                  </p>
                  <div
                    className={`w-1/3  right-0    relative ${'max-h-96 text-slate-600   mb-10   '}`}
                  >
                    <button
                      className="text-blue-900 flex flex-row quicksand font-bold text-sm dark:text-white right-0 absolute px-2 py-2 rounded-md
                              bg-sky-100 dark:bg-indigo-400"
                      onClick={event => {
                        event.stopPropagation()
                        seeInSource(item)
                      }}
                    >
                      <p> See On Source</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 mt-1 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col transition  duration-300 ease-in-out  group-hover:brightness-[125%] transition  duration-300 ease-in-out">
                  <p className="flex text-md text-slate-700 dark:text-zinc-300 mt-4  quicksand font-bold">
                    {typeof item.request.command === 'object'
                      ? inputMessages.find(obj => obj.command_type === 'custom')
                          .icon
                      : inputMessages.find(
                          obj => obj.command_type === item.request.command
                        ).icon}
                    <p className="ml-1">
                      {typeof item.request.command === 'object'
                        ? item.request.command.prompt.slice(0, 100)
                        : inputMessages
                            .find(
                              obj => obj.command_type === item.request.command
                            )
                            .message.slice(0, 100)}
                    </p>
                  </p>
                  <p
                    className={`  output-message transition-all overflow-x-hidden text-sm text-slate-500 dark:text-slate-400 overflow-hidden  duration-200 ease-in-out ${
                      visibleGroups[index]
                        ? 'max-h-[100%] text-slate-600 mt-4'
                        : 'max-h-20 text-slate-500 mt-2'
                    }`}
                  >
                    {item.response.includes('```')    ? 
                    
                    <div className=" overflow-x-scroll max-w-[600px] break-all pb-4"><ReactMarkdown>{item.response}</ReactMarkdown></div>

                    : <ReactMarkdown                >
                    {item.response}</ReactMarkdown>}
                    
                  </p>
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
