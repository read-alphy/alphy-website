// File: ArcChatAnswerSection.jsx
import React from 'react'
import { MessageSquare, RotateCw, AlertCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

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
      className="mt-10 px-6  "
    >
      <div className="flex items-center gap-2 mb-3">
        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 px-2 py-1">
          <MessageSquare className="mr-1 inline-block h-3.5 w-3.5" />
          Answer
        </Badge>
        
        {answerData.answer !== '' && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
            onClick={() => {
              setAnswerData({ answer: '', sources: [] })
              setInputValue('')
            }}
          >
            <RotateCw className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Reset</span>
          </Button>
        )}
      </div>
      
      {isLoadingInside && (
        <Card className="border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 shadow-none">
          <CardContent className="p-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[85%]" />
              <Skeleton className="h-4 w-[70%]" />
            </div>
          </CardContent>
        </Card>
      )}

      {answerData.answer !== '' && (
        <Card className="border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 shadow-none">
          <CardContent className="p-4 border-none">
            <div className="text-slate-800 dark:text-zinc-300">
              <div className="whitespace-pre-line quicksand font-normal">
                {formatAnswer(answerData.answer)}
              </div>
              
              
              
            {/*   <div className="flex items-center justify-center text-xs text-slate-600 dark:text-zinc-400 quicksand">
                <AlertCircle className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span>Always check the passages before quoting. AI may not be 100% accurate.</span>
              </div> */}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ArcChatAnswerSection 