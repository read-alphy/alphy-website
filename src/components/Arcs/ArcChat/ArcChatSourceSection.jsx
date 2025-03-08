import React, { useState, useEffect, useRef } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ArrowRight, ArrowLeft, FileText, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import SourceCard from '../SourceCard'

const ArcChatSourceSection = ({
  answerData,
  isLoadingInside,
  tracks,
  carouselRef,
  selectedSourceCard,
  setSelectedSourceCard,
  openDialog,
  setOpenDialog
}) => {
  const [isForwardArrowVisible, setIsForwardArrowVisible] = useState(true)
  const [isBackwardArrowVisible, setIsBackwardArrowVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMobileCarousel, setShowMobileCarousel] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current
        const isScrollEnd =
          container.scrollLeft + container.clientWidth >= container.scrollWidth - 10
        setIsForwardArrowVisible(!isScrollEnd)
        setIsBackwardArrowVisible(container.scrollLeft > 0)
      }
    }

    // Attach scroll event listener
    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll)
      // Initial check
      handleScroll()
    }

    // Clean up the event listener on component unmount
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [carouselRef, answerData.sources])

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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const toggleMobileCarousel = () => {
    setShowMobileCarousel(!showMobileCarousel)
  }

  if (!answerData.sources || answerData.sources.length === 0 || isLoadingInside) {
    return null
  }

  return (
    <div className="mt-6 px-6">
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 px-2 py-1">
          <FileText className="mr-1 inline-block h-3.5 w-3.5" />
          Sources ({answerData.sources.length})
        </Badge>
        
      
      </div>

      {isExpanded ? (
        <Card className="border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 shadow-none mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {answerData.sources.map((source, index) => (
                <div 
                  key={`source-preview-${index}`}
                  className="border border-slate-200 dark:border-zinc-800 rounded-md p-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                  onClick={() => {
                    setSelectedSourceCard(source)
                    setOpenDialog(true)
                  }}
                >
                  <h4 className="font-medium text-sm text-slate-800 dark:text-zinc-200 mb-1 truncate">
                    {source.title || 'Untitled Source'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-3">
                    {source.text ? source.text.substring(0, 120) + '...' : 'No text available'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Mobile Banner */}
          <div className="md:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 flex items-center justify-between"
              onClick={toggleMobileCarousel}
            >
              <span className="text-sm font-medium">View Source Cards</span>
              {showMobileCarousel ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>

          {/* Desktop view always visible, mobile view conditionally visible */}
          <div className={`relative mb-6 ${!showMobileCarousel ? 'hidden md:block' : 'block'}`}>
            <div className="flex flex-col lg:flex-row">
              {/* Left Arrow (desktop) */}
              <button
                onClick={scrollBackward}
                type="button"
                className={`left-arrow hidden md:block justify-center my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
                  isBackwardArrowVisible ? '' : 'opacity-50 cursor-default'
                }`}
                disabled={!isBackwardArrowVisible}
              >
                <div className="rounded-full p-1 mr-1 hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                  <ArrowLeft className={`text-slate-700 dark:text-zinc-400 p-1 h-6 w-6 ${!isBackwardArrowVisible ? 'opacity-50' : ''}`} />
                </div>
              </button>

              {/* Source Cards Carousel */}
              <div
                className="flex flex-row gap-4 overflow-x-scroll scroll-smooth carousel-area"
                ref={carouselRef}
              >
                {answerData.sources.map((source, index) => (
                  <SourceCard
                    key={`source-${index}`}
                    forDialog={false}
                    source={source}
                    tracks={tracks}
                    setSelectedSourceCard={setSelectedSourceCard}
                    selectedSourceCard={selectedSourceCard}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                  />
                ))}
              </div>

              {/* Right Arrow (desktop) */}
              <button
                onClick={scrollForward}
                type="button"
                className={`right-arrow hidden md:block my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
                  isForwardArrowVisible ? 'block' : 'hidden'
                }`}
              >
                <div className="rounded-full p-1 mr-1 hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                  <ArrowRight className="cursor-pointer text-slate-700 dark:text-zinc-400 p-1 h-6 w-6" />
                </div>
              </button>
            </div>

            {/* Mobile Navigation Buttons */}
            <div className="flex flex-row justify-center gap-4 mt-4 md:hidden">
              <button
                onClick={scrollBackward}
                type="button"
                className="left-arrow my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none"
              >
                <div className="rounded-full p-1 mr-1 hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                  <ArrowLeft
                    className={`${
                      isBackwardArrowVisible
                        ? 'cursor-pointer text-slate-600 dark:text-zinc-400'
                        : 'text-zinc-300 dark:text-slate-800 cursor-default'
                    } p-1 h-5 w-5`}
                  />
                </div>
              </button>
              <button
                onClick={scrollForward}
                type="button"
                className="right-arrow my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none"
              >
                <div className="rounded-full p-1 mr-1 hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                  <ArrowRight
                    className={`${
                      isForwardArrowVisible
                        ? 'cursor-pointer text-slate-600 dark:text-zinc-400'
                        : 'text-zinc-300 dark:text-slate-800 cursor-default'
                    } p-1 h-5 w-5`}
                  />
                </div>
              </button>
            </div> 
          </div>
        </>
      )}

      {/* Source Detail Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white dark:bg-zinc-900 max-w-md sm:max-w-xl">
          {answerData.sources !== undefined &&
            answerData.sources.length !== 0 &&
            answerData.sources.map((source, index) => (
              <div key={`dialog-source-${index}`}>
                {source === selectedSourceCard && (
                  <SourceCard
                    forDialog={true}
                    source={source}
                    tracks={tracks}
                    setSelectedSourceCard={setSelectedSourceCard}
                    selectedSourceCard={selectedSourceCard}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                  />
                )}
              </div>
            ))}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ArcChatSourceSection