// File: ArcChatAnswerSection.jsx
import React from 'react'
import { MessageSquare, RotateCw } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const ArcChatAnswerSection = ({
  answerData,
  isLoadingInside,
  formatAnswer,
  setAnswerData,
  setInputValue
}) => {
  if (!isLoadingInside && answerData.answer === '') {
    return null
  }

  return (
    <div
      id="answer-area"
      className="answer-area text-l max-w-[900px] ml-2 sm:ml-10 mt-10"
    >
      <p className="text-greenColor dark:text-green-200 text-l quicksand font-bold">
        <MessageSquare className="text-greenColor dark:text-green-200 mr-1 inline-block h-5 w-5" />
        Answer
        <RotateCw
          className="ml-2 cursor-pointer text-slate-600 dark:text-zinc-300 h-4 w-4 inline-block"
          onClick={() => {
            setAnswerData({ answer: '', sources: [] })
            setInputValue('')
          }}
        />
      </p>
      
      {isLoadingInside && (
        <div className="opacity-60 dark:opacity-100">
          <div className="hidden dark:block opacity-60 w-full pr-3 lg:px-0">
            <div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          <div className="dark:hidden w-full pr-3 lg:px-0 lg:w-[900px]">
            <div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      )}

      {answerData.answer !== '' && (
        <div className="text-slate-800 dark:text-zinc-300">
          <div className="whitespace-pre-line quicksand font-normal">
            {formatAnswer(answerData.answer)}
          </div>

          <div className="dark:text-zinc-300 text-slate-700 opacity-60 text-center items-center mt-20 quicksand font-bold">
            Always check the passages before quoting. AI may not be 100% accurate.
          </div>
        </div>
      )}
    </div>
  )
}

export default ArcChatAnswerSection 