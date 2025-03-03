import React from 'react'
import { ArrowUp } from 'lucide-react'

export const ScrollControls = ({ 
  showScrollBackButton, 
  scrollToSavedDepth, 
  handleScroll, 
  showYouTubeFrame 
}) => {
  if (showScrollBackButton) {
    return (
      <button
        onClick={scrollToSavedDepth}
        className={`xl:hidden absolute ${
          showYouTubeFrame ? 'right-24 bottom-8' : 'lg:mb-20 right-5 bottom-5'
        } text-zinc-300 dark:text-zinc-600 bg-mildDarkMode dark:bg-green-200 hover:bg-green-200 hover:text-zinc-700 text-white quicksand font-bold text-sm py-2 px-2 rounded-full transition ease-in-out duration-300 hover:scale-105`}
      >
        {showYouTubeFrame ? (
          <p>SCROLL BACK</p>
        ) : (
          <ArrowUp className="rotate-180" />
        )}
      </button>
    )
  }
  
  return (
    <button
      onClick={handleScroll}
      className="lg:hidden lg:mb-20 absolute text-zinc-300 dark:text-zinc-600 bottom-5 right-5 bg-mildDarkMode opacity-80 dark:opacity-100 dark:bg-green-200 hover:bg-green-300 hover:text-zinc-800 text-white font-bold py-2 px-2 rounded-full transition ease-in-out duration:300"
    >
      <ArrowUp className="" />
    </button>
  )
}
