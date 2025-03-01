import React, { useState, useRef, useEffect } from 'react'
import { HelpCircle, RefreshCw, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const ArcChatSuggestedQuestions = ({
  answerData,
  isLoadingInside,
  selectedQuestions,
  setSelectedQuestions,
  setI,
  handleAskPremadeQuestion
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const carouselRef = useRef(null)
  const isForwardArrowVisibleRef = useRef(true)
  const isBackwardArrowVisibleRef = useRef(false)
  const [, forceUpdate] = useState({})

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current
        const isScrollEnd =
          container.scrollLeft + container.clientWidth >= container.scrollWidth - 10
        
        isForwardArrowVisibleRef.current = !isScrollEnd
        isBackwardArrowVisibleRef.current = container.scrollLeft > 0
        
        forceUpdate({})
      }
    }

    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll)
      handleScroll()
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [selectedQuestions])

  const scrollForward = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 260 : 380
      carouselRef.current.scrollLeft += scrollAmount
    }
  }

  const scrollBackward = () => {
    if (carouselRef.current) {
      const scrollAmount = 300
      carouselRef.current.scrollLeft -= scrollAmount
    }
  }

  if (answerData.answer !== '' || isLoadingInside) {
    return null
  }

  return (
    <div className="mt-10 px-3 opacity-80">
      <div className="">
        <div className="flex items-center justify-between mb-5">
          {/*   <Button
            variant="ghost"
            size="sm"
            className="text-slate-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400"
            onClick={() => {
              setSelectedQuestions([])
              setI(0)
            }}
            title="Refresh questions"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            <span className="text-xs">Refresh</span>
          </Button> */}
        </div>

        {/* Desktop view - grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {selectedQuestions.length > 0 &&
            selectedQuestions.map((question, index) => (
              <TooltipProvider key={`question-desktop-${index}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card
                      className="border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full h-auto py-2 px-2 justify-start text-left text-slate-700 dark:text-zinc-300 quicksand text-xs sm:text-sm font-normal"
                        onClick={() => handleAskPremadeQuestion(question)}
                      >
                        <MessageSquare className="h-3 w-3 mr-1.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                        <span className="line-clamp-3 text-sm">{question}</span>
                      </Button>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    className="max-w-[300px] p-3 bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 shadow-lg border border-slate-200 dark:border-zinc-700"
                  >
                    <div className="text-sm">{question}</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </div>

        {/* Mobile view - carousel */}
        <div className="sm:hidden relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {selectedQuestions.length > 0 &&
              selectedQuestions.map((question, index) => (
                <Card
                  key={`question-mobile-${index}`}
                  className="border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow flex-shrink-0 w-[280px] snap-start"
                >
                  <Button
                    variant="ghost"
                    className="w-full h-auto py-2 px-2 justify-start text-left text-slate-700 dark:text-zinc-300 quicksand text-xs sm:text-sm font-normal"
                    onClick={() => handleAskPremadeQuestion(question)}
                  >
                    <MessageSquare className="h-3 w-3 mr-1.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    <span className="line-clamp-3 text-sm">{question}</span>
                  </Button>
                </Card>
              ))}
          </div>
          
         
        </div>
      </div>
    </div>
  )
}

export default ArcChatSuggestedQuestions