import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent } from '../../components/ui/dialog'
import { ArrowRight, ArrowLeft, FileText } from 'lucide-react'
import SourceCard from './SourceCard'

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

  if (!answerData.sources || answerData.sources.length === 0 || isLoadingInside) {
    return null
  }

  return (
    <>
      <p className="text-greenColor dark:text-green-200 ml-10 mt-4 mb-4 quicksand font-bold">
        <FileText className="inline-block mr-1 h-5 w-5" /> Passages
      </p>

      <div className="relative">
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
              <ArrowLeft className={`text-slate-700 p-1 h-6 w-6 ${!isBackwardArrowVisible ? 'opacity-50' : ''}`} />
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
              <ArrowRight className="cursor-pointer text-slate-700 p-1 h-6 w-6" />
            </div>
          </button>

          {/* Mobile Navigation Buttons */}
          <div className="flex flex-row mx-auto mt-6 md:hidden">
            <button
              onClick={scrollBackward}
              type="button"
              className="left-arrow justify-center my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none"
            >
              <div className="rounded-full p-1 mr-1 hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                <ArrowLeft
                  className={`${
                    isBackwardArrowVisible
                      ? 'cursor-pointer text-slate-600'
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
                      ? 'cursor-pointer text-slate-600'
                      : 'text-zinc-300 dark:text-slate-800 cursor-default'
                  } p-1 h-5 w-5`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Source Detail Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white dark:bg-mildDarkMode max-w-md sm:max-w-xl">
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
    </>
  )
}

export default ArcChatSourceSection