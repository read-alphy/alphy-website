import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { Dialog } from '../../components/ui/dialog'
import { 
  MessageSquare, 
  HelpCircle, 
  RefreshCw, 
  RotateCw,
} from 'lucide-react'
import { Skeleton } from '../../components/ui/skeleton'
import ArcChatHeader from './ArcChatHeader'
import ArcChatSourceSection from './ArcChatSourceSection'
import { API_HOST, API_SSL } from '../../constants'
import QaWsManager from '../Content/Read/QA/QaWsManager'

export default function ArcChat({
  data,
  isVisible,
  tier,
  handleVisibility,
  currentUser,
  dataArc,
  setDataArc,
  collapsed,
}) {
  const [inputValue, setInputValue] = useState('')
  const [isLoadingInside, setIsLoadingInside] = useState(false)
  const [isCleared, setIsCleared] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [answerData, setAnswerData] = useState({ answer: '', sources: [] })
  const [selectedSourceCard, setSelectedSourceCard] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [showTrackDetails, setShowTrackDetails] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [tracks, setTracks] = useState([])
  const [i, setI] = useState(0)
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [triggerWs, setTriggerWs] = useState(false)
  const buttonRef = useRef(null)
  const carouselRef = useRef(null)

  // Initialize tracks
  useEffect(() => {
    if (tracks.length === 0 && data.tracks !== undefined && data.tracks.length !== 0) {
      setTracks(data.tracks)
    }
  }, [data.tracks, tracks.length])

  // Initialize selected questions
  useEffect(() => {
    if (data?.questions?.length && selectedQuestions.length === 0 && i === 0) {
      const selectedItems = []
      const maxItems = Math.min(5, data.questions.length)
      
      while (selectedItems.length < maxItems) {
        const randomIndex = Math.floor(Math.random() * data.questions.length)
        const randomItem = data.questions[randomIndex]
        if (!selectedItems.includes(randomItem)) {
          selectedItems.push(randomItem)
        }
      }
      
      setSelectedQuestions(selectedItems)
      setI(1)
    }
  }, [data.questions, i, selectedQuestions.length])

  // Check for arc edits
  useEffect(() => {
    if (localStorage.getItem('arcEdited') === 'true') {
      localStorage.setItem('arcEdited', 'false')
      window.location.reload()
    }
  }, [])

  const handleSubmit = () => {
    setIsCleared(false)
    setErrorMessage(false)
    
    if (currentUser === null && !selectedQuestions.includes(inputValue)) {
      setErrorMessage(true)
      setIsLoadingInside(false)
      return
    }
    
    if (inputValue.length === 0) {
      return
    }
    
    try {
      setAnswerData({ answer: '', sources: [] })
      setTriggerWs(true)
      const idToken = currentUser ? currentUser.accessToken : '123'
      setIsLoadingInside(true)
      setErrorMessage(false)

      const wsManager = new QaWsManager({
        apiInfo: {
          apiHost: API_HOST,
          ssl: API_SSL,
        },
        callbacks: {
          setSources: sources => {
            setIsLoadingInside(false)
            setAnswerData(prevData => ({
              ...prevData,
              sources: sources,
            }))
          },
          setAnswer: answer => {
            setIsLoadingInside(false)
            setAnswerData(prevData => ({
              ...prevData,
              answer: answer,
            }))
          },
          onError: reason => {
            console.error(`Error in main: ${reason}`)
            setIsLoadingInside(false)
          },
        },
        question: inputValue,
        arcId: data.uid,
        idToken: idToken,
      })

      setTimeout(() => {
        wsManager.close()
      }, 20000)

    } catch (error) {
      console.log(error)
      setIsLoadingInside(false)
    }
  }

  const handleClear = () => {
    setAnswerData({ answer: '', sources: [] })
    setIsCleared(true)
    setTriggerWs(false)
    setIsLoadingInside(false)
    setInputValue('')
    setErrorMessage(false)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleEdit = () => {
    router.push(`/arc/editArc/${data.uid}`)
  }

  const handleAskPremadeQuestion = event => {
    if (event.target) {
      setInputValue(event.target.innerText)
    }
    setIsLoadingInside(true)
    setTimeout(() => {
      buttonRef.current.click()
    }, 300)
  }

  const formatAnswer = (answer) => {
    const cleanedText = answer.replace(/\r?\n|\r/g, ' ')

    const regexPattern = /\]\./g
    const replaceEverySecondOccurrence = (text, pattern, replacement) => {
      let count = 0
      return text.replace(new RegExp(pattern, 'g'), match => {
        count++
        return count % 2 === 0 ? match.replace(pattern, replacement) : match
      })
    }

    const formattedRawAnswer = replaceEverySecondOccurrence(
      cleanedText,
      regexPattern,
      '].\n\n'
    )
    const parts = formattedRawAnswer.split(/\[(\d+)\]/g)

    return parts.map((part, index) => {
      if (answerData.sources.hasOwnProperty(part - 1)) {
        return (
          <div key={`source-${index}`} className="relative inline-flex group">
            <span
              className="underline text-xs text-green-300 cursor-pointer"
              onClick={() => handleShowSingleSource(part)}
            >
              [{part}]
            </span>
          </div>
        )
      }
      return part
    })
  }

  const handleShowSingleSource = sourceNumber => {
    setSelectedSourceCard(answerData.sources[sourceNumber - 1])
    setTimeout(() => {
      setOpenDialog(true)
    }, 300)
  }

  return (
    <div
      className={`${
        collapsed
          ? 'lg:w-[1000px] xl:max-w-[1000px]'
          : 'lg:w-[600px] xl:w-[900px] 2xl:w-[1000px]'
      } grow mx-auto pt-10 pb-20`}
    >
      {/* Header Section */}
      <ArcChatHeader 
        data={data}
        arcUserID={data.user_id}
        title={data.name}
        description={data.description}
        expanded={expanded}
        toggleExpand={() => setExpanded(!expanded)}
        showTrackDetails={showTrackDetails}
        setShowTrackDetails={setShowTrackDetails}
        dataArc={dataArc}
        setDataArc={setDataArc}
        currentUser={currentUser}
        handleEdit={handleEdit}
        isVisible={isVisible}
        handleVisibility={handleVisibility}
        tier={tier}
      />

      {/* Input Section */}
      <div className="sm:ml-10 px-3">
        <div>
          <div className="flex items-center pr-1 mt-6 xl:mt-8 max-w-[900px]">
            <div className="flex flex-row drop-shadow-md w-full flex-grow relative dark:bg-zinc-800 border border-black/10 dark:text-white rounded-xl dark:rounded-xl gizmo:rounded-2xl shadow-xs dark:shadow-xs bg-white">
              <input
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                title={inputValue}
                type="text"
                id="questionAnswering"
                placeholder="Type your question here..."
                className="m-0 w-full quicksand font-normal text-slate-800 dark:text-zinc-300 dark:placeholder:text-slate-500 text-sm resize-none border-0 bg-transparent dark:bg-transparent py-[10px] pr-16 focus:outline-none focus:ring-0 focus-visible:ring-0 md:py-4 md:pr-20 gizmo:md:py-3.5 pl-4 md:pl-[26px]"
              />
              {inputValue.length > 0 && (
                <div
                  onClick={handleClear}
                  className="cursor-pointer absolute inset-y-0 right-0 flex items-center mr-10 md:mr-14 dark:text-zinc-500 text-slate-500"
                >
                  <svg
                    width="20"
                    onClick={handleClear}
                    className="cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              )}

              <button
                ref={buttonRef}
                onClick={handleSubmit}
                className={`absolute rounded-md p-1 gizmo:md:bottom-2.5 ${
                  isLoadingInside
                    ? 'pointer-events-none cursor-default bg-transparent md:p-2 md:right-3 bottom-0 right-2'
                    : 'bg-green-200 md:p-2 md:right-3 bottom-2 right-2'
                }`}
              >
                {isLoadingInside ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] p-1 cursor-default z-50 text-slate-700 dark:text-slate-300" />
                ) : (
                  <svg
                    className="w-4 h-4 text-slate-700 dark:text-slate-800"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className="mt-4 text-slate-600 dark:text-slate-500">
            <p className="quicksand font-bold">
              Please{' '}
              <a
                href="/u/login"
                className="underline text-greenColor dark:text-green-200 quicksand font-bold"
              >
                sign in
              </a>{' '}
              to start asking questions.
            </p>
          </div>
        )}
      </div>

      {/* Suggested Questions Section */}
      <div className="mt-10 animate-bounce-slow px-3">
        {answerData.answer === '' && !isLoadingInside && (
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
        )}

        {/* Answer Section */}
        <div
          id="answer-area"
          className="answer-area text-l max-w-[900px] ml-2 sm:ml-10 mt-10"
        >
          {(isLoadingInside || answerData.answer !== '') && (
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
          )}
          
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

        {/* Sources Section */}
        {answerData.answer !== '' && (
          <div className="mt-10 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40"></div>
        )}

        <ArcChatSourceSection 
          answerData={answerData}
          isLoadingInside={isLoadingInside}
          tracks={tracks}
          carouselRef={carouselRef}
          selectedSourceCard={selectedSourceCard}
          setSelectedSourceCard={setSelectedSourceCard}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      </div>
    </div>
  )
}