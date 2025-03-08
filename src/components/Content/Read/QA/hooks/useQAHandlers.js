// File: components/QuestionAnswering/hooks/useQAHandlers.js
import { useCallback } from 'react'

export function useQAHandlers({
  currentUser,
  inputValue,
  setInputValue,
  QARef,
  setOpenDialog,
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
  setShowSource,
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
  buttonRef,
  setQuestion
}) {
  // Clear the input and reset state
  const handleClear = useCallback(() => {
    setAnswerData({ answer: '', sources: [] })
    setIsCleared(true)
    setIsLoadingInside(false)
    setShowBaseQA(false)
    setShowUserQA(false)
    setInputValue('')
    setInputError(false)
  }, [setAnswerData, setIsCleared, setIsLoadingInside, setShowBaseQA, setShowUserQA, setInputValue, setInputError])

  // Handle base question selection
// Updated handleBaseQA function in useQAHandlers.js
const handleBaseQA = useCallback((event) => {
  setIsCleared(false);
  setShowBaseQA(true);
  setShowUserQA(false);
  
  // Get the question text from the clicked element
  // This handles both direct clicks on the button and clicks on the span inside
  let questionText;
  if (event.target.dataset.questionText) {
    // Get from data attribute if available (from span element)
    questionText = event.target.dataset.questionText;
  } else if (event.target.querySelector('[data-question-text]')) {
    // Try to find a child element with the data attribute
    questionText = event.target.querySelector('[data-question-text]').dataset.questionText;
  } else {
    // Fallback to textContent
    questionText = event.target.textContent;
  }
  
  // Update state with the question text
  setInputValue(questionText);
  setBaseQuestion(questionText);
  
  // If we have a QARef, scroll to it
  if (QARef && QARef.current) {
    QARef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [setIsCleared, setShowBaseQA, setShowUserQA, setInputValue, setBaseQuestion, QARef]);

  // Clear specific options
  const handleOptionClear = useCallback(() => {
    setShowBaseQA(false)
    setInputValue('')
  }, [setShowBaseQA, setInputValue])



  // Share link to current question
  const handleShareLink = useCallback(() => {
    const encodedText = encodeURIComponent(
      inputValue.length > 0 ? inputValue : baseQuestion
    )

    const currentPath = window.location.pathname
    const baseUrl = `${window.location.origin}${currentPath.split('&q=')[0]}`
    const url = `${baseUrl}&q=${encodedText}`
    
    navigator.clipboard.writeText(url)
    // Could add a toast notification here
  }, [inputValue, baseQuestion])

  // Copy answer to clipboard
  const handleCopyToClipboard = useCallback((answer) => {
    const questionText = baseQuestion || inputValue
    
    let plainText = `${questionText} \n\n `
    if (answer) {
      plainText = `${questionText} \n\n ${answer}`
    }
    
    navigator.clipboard.writeText(plainText)
    // Could add a toast notification here
  }, [baseQuestion, inputValue])
  const handleScroll = useCallback((index) => {
    const targetRef = areaRefs.current[index]
    if (!targetRef || !targetRef.current) return

    const executeScroll = () => {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }

    executeScroll()
    setHighlightIndex(index)

    setTimeout(() => {
      setHighlightIndex(null)
    }, 1000)
  }, [areaRefs, setHighlightIndex])
  // Show a single source
  const handleShowSingleSource = useCallback((sourceNumber) => {
    setOpenDialog(true)
    setSingleSource(true)
    setAnswer(true)
    setBaseSources(true)
    setShowSource(parseInt(sourceNumber, 10))
    
    setTimeout(() => {
      handleScroll(sourceNumber - 1)
    }, 300)
  }, [setSingleSource, setAnswer, setBaseSources, setShowSource, handleScroll])

  // Scroll to a specific source
  

  // Toggle showing all sources
  const handleShowAllSources = useCallback(() => {
    if (singleSource === true && (answer === true || baseSources === true)) {
      setSingleSource(false)
    }

    if (singleSource === false) {
      setAnswer(!answer)
      setBaseSources(!baseSources)
    }
  }, [singleSource, answer, baseSources, setSingleSource, setAnswer, setBaseSources])

  
  // Fetch answer data
  const fetchData = useCallback(() => {
    // Clear any existing toast notifications
    setQuestion(inputValue)
    setShowBaseQA(false)
    setShowUserQA(true)
    setInputError(false)
    setIsCleared(false)

    // Validate input
    if (inputValue.length > 300) {
      setInputError(true)
      setErrorText('Your question is too long, please keep it under 300 characters.')
      setInputValue('')
      return
    } 
    
    if (inputValue.length === 0) {
      setInputError(true)
      setErrorText('Please enter a question.')
      setInputValue('')
      return
    }

    // User authentication check
    if (!currentUser) {
      setErrorText('You need to sign in to ask questions.')
      setInputValue('')
      setIsCleared(true)
      setInputError(true)
      setSelectionCall(false)
      return
    }

    // Setup WebSocket and fetch data
    try {
      setIsLoadingInside(true)
      setAnswer(false)
      setAnswerData({ answer: '', sources: [] })
      setTriggerWs(true)
      
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
        source: {
          source_type: data.source_type,
          source_id: data.source_id,
        },
        idToken: currentUser.accessToken,
      })

      // Close WebSocket after timeout
      setTimeout(() => {
        wsManager.close()
      }, 20000)
    } catch (error) {
      console.error(`Error fetching data: ${error}`)
      setSelectionCall(false)
      setIsLoadingInside(false)
    }
  }, [
    currentUser, 
    inputValue, 
    data, 
    setShowBaseQA, 
    setShowUserQA, 
    setInputError, 
    setIsCleared, 
    setErrorText, 
    setInputValue, 
    setIsLoadingInside, 
    setAnswer, 
    setAnswerData, 
    setTriggerWs, 
    setSelectionCall
  ])
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  }, [fetchData])
  return {
    handleClear,
    handleBaseQA,
    handleOptionClear,
    handleKeyDown,
    handleShareLink,
    handleCopyToClipboard,
    handleShowSingleSource,
    handleScroll,
    handleShowAllSources,
    fetchData,
  }
}