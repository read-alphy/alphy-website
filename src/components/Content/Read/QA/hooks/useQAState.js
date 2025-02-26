// File: components/QuestionAnswering/hooks/useQAState.js
import { useState } from 'react'

export function useQAState() {
  // Answer related state
  const [answerData, setAnswerData] = useState({ answer: '', sources: [] })
  const [answer, setAnswer] = useState(false)
  const [showSource, setShowSource] = useState(-1)
  const [singleSource, setSingleSource] = useState(false)
  
  // Loading and display state
  const [isLoadingInside, setIsLoadingInside] = useState(false)
  const [isCleared, setIsCleared] = useState(true)
  const [showBaseQA, setShowBaseQA] = useState(false)
  const [showUserQA, setShowUserQA] = useState(false)
  
  // UI interaction state
  const [baseSources, setBaseSources] = useState(false)
  const [baseQuestion, setBaseQuestion] = useState('')
  const [collapseIndex, setCollapseIndex] = useState(0)
  const [highlightIndex, setHighlightIndex] = useState(null)
  
  // Error handling state
  const [inputError, setInputError] = useState(false)
  const [errorText, setErrorText] = useState('')
  
  // Misc state
  const [clicked, setClicked] = useState(false)
  const [triggerWs, setTriggerWs] = useState(false)

  return {
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
  }
}
