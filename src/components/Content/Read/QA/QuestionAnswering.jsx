// File: components/QuestionAnswering/index.js
import React, { useState, useEffect, createRef, useRef } from 'react'
import { useRouter } from 'next/router'
import { Database } from 'lucide-react'

// Custom hooks
import { useQAState } from './hooks/useQAState'
import { useQAHandlers } from './hooks/useQAHandlers'

// Components
import SearchBar from './components/SearchBar'
import QuestionLoading from './QuestionLoading'
import ErrorMessage from './components/ErrorMessage'

// Import the new unified components
import { QuestionsDisplay, DynamicQuestion } from './UnifiedQAComponent'

// Services
import QaWsManager from './QaWsManager'
import { formatAnswer, handleLength } from './utils/textFormatters'
import { API_HOST, API_SSL } from '../../../../constants'

export default function QuestionAnswering({
  currentUser,
  timestampChanger,
  key_qa,
  data,
  inputValue,
  setInputValue,
  inputRef,
  buttonRef,
  setSelectionCall,
}) {
  
  const QARef = useRef(null)
  const router = useRouter()
  const [question, setQuestion] = useState(null);
  
  // State management with custom hook
  const {
    answerData,
    setAnswerData,
    isLoadingInside,
    setIsLoadingInside,
    answer,
    setAnswer,
    showSource,
    setShowSource,
    showBaseQA,
    setShowBaseQA,
    baseSources,
    setBaseSources,
    baseQuestion,
    setBaseQuestion,
    isCleared,
    setIsCleared,
    showUserQA,
    setShowUserQA,
    inputError,
    setInputError,
    errorText,
    setErrorText,
    clicked,
    setClicked,
    triggerWs,
    setTriggerWs,
    singleSource,
    setSingleSource,
    collapseIndex,
    setCollapseIndex,
    highlightIndex,
    setHighlightIndex,
  } = useQAState()

  // Create refs for the source areas
  const numberOfAreas = 5
  const areaRefs = useRef(
    Array.from({ length: numberOfAreas }, () => createRef())
  )

  // Event handlers with custom hook
  const {
    handleClear,
    handleBaseQA,
    handleBaseQAaccordion,
    handleOptionClear,
    handleKeyDown,
    handleShareLink,
    handleCopyToClipboard,
    handleShowSingleSource,
    handleScroll,
    handleShowAllSources,
    fetchData,
  } = useQAHandlers({
    currentUser,
    inputValue,
    setInputValue,
    QARef,
    setIsCleared,
    setShowBaseQA,
    setShowUserQA,
    setInputError,
    setErrorText,
    setBaseQuestion,
    setCollapseIndex,
    setAnswerData,
    setAnswer,
    setBaseSources,
    setSingleSource,
    setIsLoadingInside,
    setTriggerWs,
    setSelectionCall,
    setHighlightIndex,
    setClicked,
    data,
    baseQuestion,
    collapseIndex,
    answer,
    baseSources,
    singleSource,
    areaRefs,
    QaWsManager,
    API_HOST,
    API_SSL,
    buttonRef
  })

  // Handle timestamp changes from parent
  const updateVariable = (event) => {
    timestampChanger(event)
  }
  // Process URL query parameter on initial load
  useEffect(() => {
    
    const processUrlQuery = () => {
      if (
        router.asPath.split('/')[2]?.split('&q=')[1] !== undefined &&
        !clicked
      ) {
        const my_question = router.asPath.split('/')[2].split('&q=')[1]
        runAnswererFromUrl(my_question)

        setTimeout(() => {
          const element = document.querySelector('#q-and-a')
          if (element) {
            QARef.current = element
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 300)
      }
    }

    // Add a slight delay to ensure router is ready
    const timer = setTimeout(() => {
      processUrlQuery()
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [router.asPath, clicked])

  // Process a question from URL
  const runAnswererFromUrl = (my_question) => {
    if (!my_question) {
      return;
    }

    const decodedText = decodeURIComponent(my_question)

    if (key_qa[decodedText]) {
      const keys = Object.keys(key_qa)
      const index = keys.indexOf(decodedText)

      setCollapseIndex(index)
      setBaseQuestion(decodedText)
      setClicked(true)
    } else {
      setInputValue(decodedText)
      setClicked(true)
      
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.click()
        }
      }, 1000)
    }
  }

  return (
    
      <div
        id="q-and-a"
        className="relative h-[95vh] flex flex-col "
        ref={QARef}
      >
        <div className="">
          {inputError && inputValue.length === 0 && (
            <ErrorMessage message={errorText} />
          )}
  
          {isLoadingInside && !showBaseQA && (
            <QuestionLoading />
          )}
  
          {(
            <DynamicQuestion
              answerData={answerData}
              data={data}
              handleClear={handleClear}
              handleCopyToClipboard={handleCopyToClipboard}
              handleShowSingleSource={handleShowSingleSource}
              formatAnswer={formatAnswer}
              updateVariable={updateVariable}
              handleLength={handleLength}
              inputValue={inputValue}
            />
          )}
        </div>
  
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-zinc-800 pb-10">
          <div className="mb-4">
            {(
              <QuestionsDisplay
                questions={key_qa}
                data={data}
                areaRefs={areaRefs}
                setQuestion={setQuestion}
                updateVariable={updateVariable}
                handleCopyToClipboard={handleCopyToClipboard}
                formatAnswer={formatAnswer}
                handleLength={handleLength}
                answerData={answerData}
                handleShowSingleSource={handleShowSingleSource}
                setAnswerData={setAnswerData} // Add this prop
              />
            )}
          </div>
          <SearchBar
            inputRef={inputRef}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleKeyDown={handleKeyDown}
            handleClear={handleClear}
            isLoadingInside={isLoadingInside}
            fetchData={fetchData}
            buttonRef={buttonRef}
          />
        </div>
      </div>
    
  )
}