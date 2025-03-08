// components/TranslationStatus.js
import React from 'react'

export const TranslationStatus = ({ 
  data, 
  transcript, 
  summary, 
  language, 
  languagesWanted,
  source_type, 
  LANGUAGE_CODES 
}) => {
  if (!data) return null
  
  // Show processing message if no transcript in English
  if (data !== null && transcript.length === 0 && language === 'en') {
    return (
      <div className="flex flex-col mb-20 mt-20">
        <p className="text-xl text-zinc-500 dark:text-zinc-200 max-w-screen-md mx-auto p-3 text-center">
          <span className="quicksand">
            Alphy is doing its best to process this{' '}
            {source_type === 'yt' ? 'video' : 'recording'}, it will
            be ready in a few minutes. We'll send you an email when it's
            ready!
          </span>
        </p>
      </div>
    )
  }
  
  // Show translation in progress message
  if ((summary?.summary === null && 
       summary?.lang !== 'en' &&
       language !== 'en' &&
       summary?.summary === undefined) || 
      (languagesWanted.includes(language) === true &&
       language !== 'en')) {
    return (
      <div className="flex flex-col mb-20 mt-20">
        {data !== null && (
          <p className="text-xl text-zinc-500 dark:text-zinc-200 quicksand max-w-screen-md mx-auto p-3 text-center">
            Alphy is currently working hard to translate this{' '}
            {source_type === 'yt' ? 'video' : 'recording'} to{' '}
            {LANGUAGE_CODES[language]}. Please come back in a few minutes!
          </p>
        )}
      </div>
    )
  }
  
  return null
}
