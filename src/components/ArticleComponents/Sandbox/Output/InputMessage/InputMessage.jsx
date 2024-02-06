import { inputMessages } from './messageBank'
import Lottie from 'react-lottie'
import writingAnimation from '../writingAnimation.json'
import writingAnimationLight from '../writingAnimationLight.json'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Button } from '@material-tailwind/react'

export default function InputMessage({
  promptType,
  generatedPrompt,
  setActiveGenerationZone,
}) {
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
  }

  const messageObject = inputMessages.find(
    item => item.prompt_type === promptType
  )

  return (
    <div className=" min-h-[150px] w-full  items-center  text-center p-6 rounded-lg  right-0 flex flex-col border-zinc-200 dark:border-zinc-800 bg-white dark:bg-mildDarkMode">
      {/* { <p className="text-zinc-600 dark:text-zinc-300 text-lg">Current Task</p>} */}
      <TwitterIcon
        className="row-span-1 mt-6"
        fontSize="large"
        sx={{
          color: '#4ab3f4',
        }}
      />

      <p className="text-md mt-2 text-zinc-700 dark:text-zinc-300">
        {messageObject.message ? messageObject.message : ''}
      </p>

      <div className="flex dark:hidden opacity-60 pointer-events-none  left-0 items-start justify-start w-[100px] mt-6">
        <Lottie options={optionsDark} width={60} height={60} />
      </div>
      <div className="hidden dark:flex brightness-200 justify-start items-start ">
        <div className="brightness-200 hidden dark:flex pointer-events-none">
          <div className="brightness-150">
            <Lottie options={optionsLight} width={60} height={60} />
          </div>
        </div>
      </div>
      <Button
        onClick={() => setActiveGenerationZone(true)}
        ripple={true}
        className=" mt-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] h-[38px] from-purple-200 to-blue-200 text-zinc-700 font-averta-regular normal-case w-[120px]"
      >
        Start Over
      </Button>
    </div>
  )
}
