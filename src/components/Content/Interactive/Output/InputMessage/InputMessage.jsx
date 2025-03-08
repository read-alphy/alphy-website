import { inputMessages } from '../../messageBank'
import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react"

export default function InputMessage({ promptType, userPrompt, settings, contentDetails }) {
  const [promptAreaExpanded, setPromptAreaExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const messageRef = useRef(null)

  const checkOverflow = () => {
    const current = messageRef.current
    if (isOverflowing) {
      return
    }
    if (!current) {
      return
    }
    const isOverflow = current.scrollHeight > current.clientHeight
    setIsOverflowing(isOverflow)
  }

  useEffect(() => {
    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [promptAreaExpanded, userPrompt])

  let messageObject
  if (promptType) {
    messageObject = inputMessages.find(item => item.command_type === promptType)
    if (
      messageObject !== undefined &&
      messageObject.command_type === 'custom'
    ) {
      messageObject = {
        command_type: 'custom',
        message: userPrompt,
      }
    }
  }

  return (
    <Card className=" w-full p-3  shadow-sm border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800">
      <CardContent className="">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <div
              className={`flex flex-col ${
                promptAreaExpanded ? 'max-h-96' : 'max-h-24'
              } overflow-y-hidden transition-all duration-500 ease-in-out`}
            >
              <h3 className="text-zinc-600 dark:text-zinc-100 text-sm font-medium">
                Command
              </h3>
              <p
                ref={messageRef}
                className="text-sm mt-2 text-zinc-700 dark:text-zinc-300 overflow-hidden"
              >
                {messageObject !== undefined &&
                  (messageObject.message ? messageObject.message : '')}
              </p>
            </div>
          </div>
          
          {settings !== undefined && settings.content_to_use !== undefined && (
            <div className="mt-3 flex items-center">
              <Badge variant="outline" className="flex items-center gap-1 text-xs font-normal text-zinc-600 dark:text-zinc-400 bg-slate-50 dark:bg-zinc-800/50 border-slate-200 dark:border-zinc-700/50">
                <CheckCircle className="h-3 w-3 text-emerald-500" />
                Generated On {settings.content_to_use === "transcript" ? "Transcript" : "Summary"}
              </Badge>
            </div>
          )}
        </div>
        
        {isOverflowing && (
          <button 
            onClick={() => setPromptAreaExpanded(!promptAreaExpanded)}
            className="flex items-center justify-center w-full mt-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            {promptAreaExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
      </CardContent>
    </Card>
  )
}
