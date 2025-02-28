// File: ArcChatSuggestedQuestions.jsx
import React from 'react'
import { HelpCircle, RefreshCw } from 'lucide-react'

const ArcChatSuggestedQuestions = ({
  answerData,
  isLoadingInside,
  selectedQuestions,
  setSelectedQuestions,
  setI,
  handleAskPremadeQuestion
}) => {
  if (answerData.answer !== '' || isLoadingInside) {
    return null
  }

  return (
    <div className="mt-10 animate-bounce-slow px-3">
      <div className="sm:px-5 mt-10">
        {answerData.answer.length === 0 && selectedQuestions.length > 0 && (
          <div className="mt-20 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40"></div>
        )}
        
        <p className="flex flex-row mb-5 sm:ml-6">
          <HelpCircle className="text-greenColor dark:text-green-200 mr-2 h-5 w-5" />
          <span className="text-slate-700 dark:text-zinc-200 quicksand font-bold">
            Suggested Questions
          </span>

          <RefreshCw
            title="Refresh questions."
            className="ml-2 mt-1 text-slate-600 dark:text-zinc-300 cursor-pointer h-4 w-4"
            onClick={() => {
              setSelectedQuestions([])
              setI(0)
            }}
          />
        </p>

        {selectedQuestions.length > 0 &&
          selectedQuestions.map((question, index) => (
            <button
              key={`question-${index}`}
              className={`${
                index % 2 === 0
                  ? 'bg-slate-100 dark:bg-darkMode'
                  : 'bg-white dark:bg-mildDarkMode'
              } border dark:text-zinc-300 hover:scale-105 duration-300 transition ease-in-out rounded-xl px-5 py-1 text-md mr-4 mt-4 dark:border-zinc-700 drop-shadow-sm quicksand font-normal`}
              onClick={handleAskPremadeQuestion}
            >
              {question}
            </button>
          ))}
      </div>
    </div>
  )
}

export default ArcChatSuggestedQuestions