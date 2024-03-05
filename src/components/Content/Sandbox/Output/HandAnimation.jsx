import Lottie from 'react-lottie'
import writingAnimation from './writingAnimation.json'
import writingAnimationLight from './writingAnimationLight.json'

export default function HandAnimation() {
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

  return (
    <div>
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
    </div>
  )
}
