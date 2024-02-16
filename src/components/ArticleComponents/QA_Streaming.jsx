// QaWsManagerHook.js
import { useEffect } from 'react'
import QaWsManager from './QaWsManager'
import { API_HOST, API_SSL } from '../../constants'

export const initializeQaWsManager = ({
  question,
  source,
  setAnswerData,
  triggerWs,
  setTriggerWs,
  isCleared,
  setIsLoadingInside,
  arcId,
  idToken,
}) => {
  let wsManager

  if (isCleared) {
    setAnswerData({ answer: '', sources: [] })
  }
  if (triggerWs !== true) {
    return
  }

  setTriggerWs(false)
  wsManager = new QaWsManager({
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
      },
    },
    question: question,
    source: source,
    arcId: arcId,
    idToken: idToken,
  })

  // Close the WebSocket connection after 20 seconds
  setTimeout(() => {
    wsManager.close()
  }, 20000) // Re-run the effect if `question` or `arcId` or `source` changes
}
