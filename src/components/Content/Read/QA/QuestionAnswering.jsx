// File: components/QuestionAnswering/index.js
import React, { useState, useEffect, createRef, useRef } from 'react'
import { useRouter } from 'next/router'
import { Spinner } from '@material-tailwind/react'
import DataArrayIcon from '@mui/icons-material/DataArray'

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
  console.log('QuestionAnswering - Component Rendering', { 
    currentUser, 
    key_qa, 
    data, 
    inputValue 
  });
  
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
  
  console.log('QuestionAnswering - State initialized', { 
    isLoadingInside, 
    showBaseQA, 
    isCleared, 
    showUserQA, 
    inputError, 
    clicked 
  });

  // Create refs for the source areas
  const numberOfAreas = 5
  const areaRefs = useRef(
    Array.from({ length: numberOfAreas }, () => createRef())
  )
  console.log('QuestionAnswering - Area refs created', { numberOfAreas });

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
  console.log('QuestionAnswering - Handlers initialized');

  // Handle timestamp changes from parent
  const updateVariable = (event) => {
    console.log('QuestionAnswering - updateVariable called with event:', event);
    timestampChanger(event)
  }

  // Process URL query parameter on initial load
  useEffect(() => {
    console.log('QuestionAnswering - URL query effect running', { 
      path: router.asPath, 
      clicked 
    });
    
    const processUrlQuery = () => {
      console.log('QuestionAnswering - Processing URL query');
      if (
        router.asPath.split('/')[2]?.split('&q=')[1] !== undefined &&
        !clicked
      ) {
        const my_question = router.asPath.split('/')[2].split('&q=')[1]
        console.log('QuestionAnswering - Found question in URL:', my_question);
        runAnswererFromUrl(my_question)

        setTimeout(() => {
          console.log('QuestionAnswering - Attempting to scroll to Q&A section');
          const element = document.querySelector('#q-and-a')
          if (element) {
            QARef.current = element
            element.scrollIntoView({ behavior: 'smooth' })
            console.log('QuestionAnswering - Scrolled to Q&A section');
          } else {
            console.log('QuestionAnswering - Q&A element not found for scrolling');
          }
        }, 300)
      } else {
        console.log('QuestionAnswering - No question in URL or already clicked');
      }
    }

    // Add a slight delay to ensure router is ready
    const timer = setTimeout(() => {
      processUrlQuery()
    }, 1000)

    return () => {
      console.log('QuestionAnswering - Cleaning up URL query effect');
      clearTimeout(timer)
    }
  }, [router.asPath, clicked])

  // Process a question from URL
  const runAnswererFromUrl = (my_question) => {
    console.log('QuestionAnswering - runAnswererFromUrl called with:', my_question);
    if (!my_question) {
      console.log('QuestionAnswering - No question provided, returning');
      return;
    }

    const decodedText = decodeURIComponent(my_question)
    console.log('QuestionAnswering - Decoded question:', decodedText);

    if (key_qa[decodedText]) {
      console.log('QuestionAnswering - Found question in key_qa');
      const keys = Object.keys(key_qa)
      const index = keys.indexOf(decodedText)
      console.log('QuestionAnswering - Question index:', index);

      setCollapseIndex(index)
      setBaseQuestion(decodedText)
      setClicked(true)
    } else {
      console.log('QuestionAnswering - Question not in key_qa, setting as input');
      setInputValue(decodedText)
      setClicked(true)
      
      setTimeout(() => {
        console.log('QuestionAnswering - Attempting to click button');
        if (buttonRef.current) {
          buttonRef.current.click()
          console.log('QuestionAnswering - Button clicked');
        } else {
          console.log('QuestionAnswering - Button ref not available');
        }
      }, 1000)
    }
  }

  console.log('QuestionAnswering - Rendering component', { 
    isCleared, 
    isLoadingInside, 
    answerDataLength: answerData?.answer?.length || 0,
    showBaseQA,
    showUserQA
  });

  return (
    <div
      id="q-and-a"
      className="md:min-h-[600px] lg:w-[700px] xl:w-[500px] 2xl:w-[550px] 3xl:w-full mx-auto sm:mx-0 bg-white drop-shadow-sm dark:bg-mildDarkMode border-b overflow-auto pt-10 pl-5 pr-5 pb-5 border border-zinc-100 dark:border-zinc-700 rounded-xl text-slate-700 dark:text-zinc-300"
      ref={QARef}
    >
      <p className="mb-4 quicksand font-normal text-l text-slate-700 dark:text-zinc-300">
        Chat with the content. In any language you want
      </p>

      <div className="Md:pl-10 md:pr-10">
        {console.log('QuestionAnswering - Rendering SearchBar')}
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

        {inputError && inputValue.length === 0 && (
          console.log('QuestionAnswering - Rendering ErrorMessage', { errorText }),
          <ErrorMessage message={errorText} />
        )}

        <div className="mt-10">
          {isCleared && !isLoadingInside && answerData.answer.length === 0 && (
            console.log('QuestionAnswering - Rendering BaseQuestions'),
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
              DataArrayIcon={DataArrayIcon}
              formatAnswer={formatAnswer}
              areaRefs={areaRefs}
              singleSource={singleSource}
              showSource={showSource}
              handleShowAllSources={handleShowAllSources}
            />
          )}
        </div>

        {isLoadingInside && !showBaseQA && (
          console.log('QuestionAnswering - Rendering QuestionLoading'),
          <QuestionLoading />
        )}

        {answerData.answer.length !== 0 && !showBaseQA && showUserQA && (
          console.log('QuestionAnswering - Rendering DynamicQA', { 
            answerLength: answerData.answer.length 
          }),
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
            DataArrayIcon={DataArrayIcon}
            handleShowAllSources={handleShowAllSources}
            areaRefs={areaRefs}
            highlightIndex={highlightIndex}
            handleLength={handleLength}
          />
        )}
      </div>
    </div>
  )
}