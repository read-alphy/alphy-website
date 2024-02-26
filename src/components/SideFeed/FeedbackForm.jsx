import { useState } from 'react'
import { useEffect } from 'react'

export default function FeedbackForm() {
  const [inputValue, setInputValue] = useState('')
 const [isDarkMode, setDarkMode] = useState(localStorage.theme)

  return (
    <div className="dark mx-auto  md:w-800 w-full mt-10 " id="feedback">
      <div className=" flex justify-center "></div>

      <div className=" flex justify-center ">
        <div className="hidden dark:flex sm:w-5/6">
        <iframe
            className={`sm:w-5/6 max-w-4xl mb-20 md:ml-30 overflow-auto h-160`}
            src={`https://tally.so/embed/${"wbjL6E"}?alignLeft=1&hideTitle=1&dynamicHeight=1`}
          ></iframe>
        </div>
         
        <div className="flex dark:hidden sm:w-5/6">
        <iframe
            className={`sm:w-5/6 max-w-4xl mb-20 md:ml-30 overflow-auto h-160`}
            src={`https://tally.so/embed/${"wQedOk"}?alignLeft=1&hideTitle=1&dynamicHeight=1`}
          ></iframe>
        </div>
      </div>
    </div>
  )
}
