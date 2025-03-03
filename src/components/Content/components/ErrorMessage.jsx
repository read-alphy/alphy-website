
// components/ErrorMessage.js
import React from 'react'

export const ErrorMessage = ({ errorMessage }) => {
  if (!errorMessage) return null
  
  return (
    <div className="flex flex-col mb-20 mt-20">
      <p className="text-xl text-zinc-500 dark:text-zinc-200 quicksand font-bold max-w-screen-md mx-auto p-3 text-center">
        There was an error with the request :( <br></br>
        <br></br>Please refresh the page and try again. If the issue
        persists, please contact us at support@alphy.app
      </p>
    </div>
  )
}

