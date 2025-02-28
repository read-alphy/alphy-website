// File: ArcChat.jsx
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { API_HOST, API_SSL } from '../../../constants'
import ArcChatHeader from './ArcChatHeader'
import ArcChatInputSection from './ArcChatInputSection'
import ArcChatSuggestedQuestions from './ArcChatSuggestedQuestions'
import ArcChatAnswerSection from './ArcChatAnswerSection'
import ArcChatSourceSection from './ArcChatSourceSection'
import QaWsManager from '../../Content/Read/QA/QaWsManager'

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
          ? 'pt-10 pb-20'
          : 'pt-10 pb-20'
      } grow mx-auto`}
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
      <ArcChatInputSection
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleKeyDown={handleKeyDown}
        handleClear={handleClear}
        handleSubmit={handleSubmit}
        isLoadingInside={isLoadingInside}
        buttonRef={buttonRef}
        errorMessage={errorMessage}
      />

      {/* Suggested Questions Section */}
      <ArcChatSuggestedQuestions
        answerData={answerData}
        isLoadingInside={isLoadingInside}
        selectedQuestions={selectedQuestions}
        setSelectedQuestions={setSelectedQuestions}
        setI={setI}
        handleAskPremadeQuestion={handleAskPremadeQuestion}
      />

      {/* Answer Section */}
      <ArcChatAnswerSection
        answerData={answerData}
        isLoadingInside={isLoadingInside}
        formatAnswer={formatAnswer}
        setAnswerData={setAnswerData}
        setInputValue={setInputValue}
      />

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
  )
}
