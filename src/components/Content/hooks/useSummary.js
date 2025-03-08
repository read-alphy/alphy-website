import { useState, useCallback } from 'react'

export const useSummary = (data, language) => {
  const [summary, setSummary] = useState('')
  const [summaryArray, setSummaryArray] = useState([])
  const [keyTakeaways, setKeyTakeaways] = useState([])

  const summaryParser = useCallback(async () => {
    let activeSummary
    const contentSummaries = data.summaries

    if (contentSummaries !== undefined && contentSummaries.length > 0) {
      activeSummary = await contentSummaries.find(
        summary => summary.lang === language
      )
    }

    await setSummary(activeSummary)

    if (
      activeSummary !== undefined &&
      activeSummary !== null &&
      activeSummary.summary !== undefined &&
      activeSummary.summary !== null
    ) {
      if (typeof activeSummary.summary === 'string') {
        await setSummaryArray(activeSummary.summary.split('\n'))
      } else {
        await setSummaryArray(activeSummary.summary)
      }
    }

    // Set key takeaways if available
    
    if (
      activeSummary?.key_takeaways !== undefined &&
      activeSummary?.key_takeaways !== null
    ) {
      await setKeyTakeaways(activeSummary.key_takeaways)
    } else {
      await setKeyTakeaways([])
    }
  }, [data.summaries, language])

  

  return { 
    summary, 
    setSummary, 
    summaryArray, 
    setSummaryArray, 
    summaryParser,
    keyTakeaways
  }
}
