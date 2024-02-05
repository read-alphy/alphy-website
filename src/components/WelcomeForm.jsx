import React, { useState } from 'react'

import addToUserMetadata from '../utils/addToUserMetadata'

export default function WelcomeForm({
  setShowWelcomeForm,
  userMetadata,
  setUserMetadata,
  currentUser,
}) {
  const handleShowWelcomeMessage = () => {
    setShowWelcomeForm(false)
    addToUserMetadata(currentUser.accessToken, { show_welcome_form: 'false' })
    setUserMetadata({ ...userMetadata, show_welcome_form: 'false' })
  }

  return (
    <div className="flex flex-col w-full pl-10 py-5 pr-5">
      <div className="flex justify-end ">
        <svg
          width="16"
          onClick={handleShowWelcomeMessage}
          className="cursor-pointer col-span-1 text-zinc-400 justify-end justify-self-end mt-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18L18 6M6 6l12 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>

      {localStorage.getItem('theme') === 'light' ? (
        <iframe
          className="h-[700px] sm:w-[450px]"
          src={`https://tally.so/embed/mVQV4E?user_id=${
            currentUser !== null && currentUser.uid
          }&alignLeft=1&transparentBackground=1&dynamicHeight=0`}
        ></iframe>
      ) : (
        <iframe
          className="h-[700px] sm:w-[450px]"
          src={`https://tally.so/embed/mDk5Mp?user_id=${
            currentUser !== null && currentUser.uid
          }&alignLeft=1&transparentBackground=1&dynamicHeight=0`}
        ></iframe>
      )}
    </div>
  )
}
