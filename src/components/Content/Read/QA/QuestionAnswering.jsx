// File: components/QuestionAnswering/index.js
import React, { useState, useEffect, createRef, useRef } from 'react'
import { useRouter } from 'next/router'
import { Database } from 'lucide-react'

// Custom hooks
import { useQAState } from './hooks/useQAState'
import { useQAHandlers } from './hooks/useQAHandlers'

// Components
import SearchBar from './components/SearchBar'
import BaseQuestions from './BaseQuestions'
import QuestionLoading from './QuestionLoading'
import DynamicQA from './DynamicQA'
import ErrorMessage from './components/ErrorMessage'

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
      className="h-screen"
      ref={QARef}
    >
    
      <div className="">
        {inputError && inputValue.length === 0 && (
          <ErrorMessage message={errorText} />
        )}

        {/* <div className="mt-10">
          {isCleared && !isLoadingInside && answerData.answer.length === 0 && (
            <BaseQuestions
              key_qa={key_qa}
              data={data}
              collapseIndex={collapseIndex}
              handleBaseQAaccordion={handleBaseQAaccordion}
              setBaseSources={setBaseSources}
              handleCopyToClipboard={handleCopyToClipboard}
              handleShareLink={handleShareLink}
              handleLength={handleLength}
              QARef={QARef}
              baseSources={baseSources}
              updateVariable={updateVariable}
              DataArrayIcon={Database}
              formatAnswer={formatAnswer}
              areaRefs={areaRefs}
              singleSource={singleSource}
              showSource={showSource}
              handleShowAllSources={handleShowAllSources}
            />
          )}
        </div> */}

        {isLoadingInside && !showBaseQA && (
          <QuestionLoading />
        )}

        {answerData.answer.length !== 0 && !showBaseQA && showUserQA && (
          <DynamicQA
            answerData={answerData}
            data={data}
            setAnswer={setAnswer}
            answer={answer}
            handleClear={handleClear}
            inputValue={inputValue}
            handleShareLink={handleShareLink}
            handleCopyToClipboard={handleCopyToClipboard}
            formatAnswer={formatAnswer}
            singleSource={singleSource}
            showSource={showSource}
            updateVariable={updateVariable}
            DataArrayIcon={Database}
            handleShowAllSources={handleShowAllSources}
            areaRefs={areaRefs}
            highlightIndex={highlightIndex}
            handleLength={handleLength}
          />
        )}
      </div>
      
      <div className="sticky bottom-0 left-0 right-0 bg-white dark:bg-zinc-800">
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