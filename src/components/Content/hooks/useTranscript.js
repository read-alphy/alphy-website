import { useState, useCallback } from 'react'
import srtParser2 from 'srt-parser-2'

export const useTranscript = (data) => {
  const [transcript, setTranscript] = useState([])

  const transcriptParser = useCallback(async () => {
    const transcript = []
    const parser = await new srtParser2()
    const transcriptRaw = data.transcript
    
    if (transcriptRaw === undefined || transcriptRaw === null) {
      return
    }
    
    const srt_array = await parser.fromSrt(transcriptRaw)
    
    let nothing = ''
    let count = 0

    await transcript.push('00:00:00')

    for (let i = 0; i < srt_array.length; i++) {
      count = count + 1
      const text_to_be_added = srt_array[i].text.replace(/\\h/g, ' ')

      nothing = nothing + ' ' + text_to_be_added

      if (
        (count > 4 || count >= srt_array.length) &&
        (srt_array[i].text.substring(
          srt_array[i].text.length - 1,
          srt_array[i].text.length
        ) === '.' ||
          srt_array[i].text.substring(
            srt_array[i].text.length - 1,
            srt_array[i].text.length
          ) === '?' ||
          srt_array[i].text.substring(
            srt_array[i].text.length - 1,
            srt_array[i].text.length
          ) === '!')
      ) {
        await transcript.push(nothing)
        await transcript.push(
          srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)
        )
        count = 0
        nothing = ''
      }
      // in case missing punctuation, push it anyway
      else if (count > 12) {
        await transcript.push(nothing)
        await transcript.push(
          srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)
        )
        count = 0
        nothing = ''
      } else if (i === srt_array.length - 1) {
        await transcript.push(nothing)
        count = 0
        nothing = ''
      }
    }

    await setTranscript(transcript)
  }, [data.transcript])

  return { transcript, setTranscript, transcriptParser }
}