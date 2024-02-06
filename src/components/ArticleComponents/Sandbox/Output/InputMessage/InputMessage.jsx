import { inputMessages } from './messageBank'
import Lottie from 'react-lottie'
import writingAnimation from '../writingAnimation.json'
import writingAnimationLight from '../writingAnimationLight.json'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Button } from '@material-tailwind/react'
import { useState, useRef, useEffect } from 'react'

export default function InputMessage({
  promptType,
  generatedPrompt,
  setActiveGenerationZone,
}) {
  const [promptAreaExpanded, setPromptAreaExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const messageRef = useRef(null)

  /* 
  const optionsDark = {
    loop: true,
    autoplay: true,
    animationData: writingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  const optionsLight = {
    loop: true,
    autoplay: true,
    animationData: writingAnimationLight,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  } */

  useEffect(() => {
    const checkOverflow = () => {
      const current = messageRef.current
      if (!current) {
        return
      }
      const isOverflow = current.scrollHeight > current.clientHeight
      setIsOverflowing(isOverflow)
    }

    checkOverflow()

    // Optional: Re-check on window resize if your layout is responsive
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [promptAreaExpanded]) // Re-check on expand/collapse

  let messageObject
  if(promptType){
  messageObject = inputMessages.find(
    item => item.prompt_type === promptType
    )
  }



  return (
    <div
      className={`max-w-[800px] w-fit  p-6 rounded-lg  right-0 flex flex-col  border-zinc-200 dark:border-zinc-800 bg-slate-50 dark:bg-mildDarkMode`}
    >
      {/* { <p className="text-zinc-600 dark:text-zinc-300 text-lg">Current Task</p>} */}
      {/* <TwitterIcon
        className=" mt-6"
        fontSize="large"
        sx={{
          color: '#4ab3f4',
        }}
      /> */}
      <div className="flex flex-row justify-between items-center">
        <div
          className={`flex flex-col ${
            promptAreaExpanded ? 'max-h-96' : 'max-h-14'
          } overflow-y-hidden transition-all duration-500 ease-in-out`}
        >
          <p className="text-zinc-700 dark:text-zinc-300 text-md font-averta-semibold">
            Command
          </p>
          <p
            ref={messageRef}
            className="text-md mt-2 text-zinc-700 dark:text-zinc-300 overflow-hidden"
          >
            {messageObject !== undefined && (messageObject.message ? messageObject.message : '')}
          </p>
        </div>

        {/* <div className="flex dark:hidden opacity-60 pointer-events-none  left-0 items-start justify-start w-[100px] mt-6">
        <Lottie options={optionsDark} width={60} height={60} />
      </div>
      <div className="hidden dark:flex brightness-200 justify-start items-start ">
        <div className="brightness-200 hidden dark:flex pointer-events-none">
          <div className="brightness-150">
            <Lottie options={optionsLight} width={60} height={60} />
          </div>
        </div>
      </div> */}

        <div className="mt-2 ml-10 items-center flex justify-center">
          <Button
            onClick={() => setActiveGenerationZone(true)}
            ripple={true}
            className="  bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] h-[38px] from-purple-200 to-blue-200 text-zinc-700 font-averta-regular normal-case w-[120px]"
          >
            Start Over
          </Button>
        </div>
      </div>
      {isOverflowing && (
        <div classname="flex w-full items-center mx-auto">
          <svg
            onClick={() => setPromptAreaExpanded(!promptAreaExpanded)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class={`w-4 h-4 mx-auto mt-4 cursor-pointer ${
              promptAreaExpanded ? 'rotate-180' : ''
            }`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
