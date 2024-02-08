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
    <div className="flex flex-col w-full justify-center items-center mt-10 sm:mt-20 2xl:mt-40">
      {localStorage.getItem('theme') === 'light' ? (
        <iframe
          title="Welcome Form"
          className="h-[800px] sm:w-[450px] focus:border-none focus:ring-0 focus:outline-none"
          src={`https://tally.so/embed/mVQV4E?user_id=${
            currentUser !== null && currentUser.uid
          }&alignLeft=1&transparentBackground=1&dynamicHeight=0`}
        ></iframe>
      ) : (
        <iframe
          title="Welcome Form"
          className="h-[800px] sm:w-[450px] focus:border-none focus:ring-0 focus:outline-none"
          src={`https://tally.so/embed/mDk5Mp?user_id=${
            currentUser !== null && currentUser.uid
          }&alignLeft=1&transparentBackground=1&dynamicHeight=0`}
        ></iframe>
      )}
    </div>
  )
}
