import React, { useEffect, useState, useRef } from 'react'
import QuestionAnswering from '../QuestionAnswering'
import srtParser2 from 'srt-parser-2'
import working from './working.svg'
import axios from 'axios'

import { useNavigate } from 'react-router-dom'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { saveAs } from 'file-saver' // library to save file as blob
import { useAuth } from '../../../hooks/useAuth'
import ReadComponent from './ReadComponent'
import { API_URL } from '../../../constants'
import HeaderArea from './HeaderArea'
import Sandbox from '../Sandbox/Sandbox'

export default function Content({
  language,
  setLanguage,
  handleLanguageChange,
  ...props
}) {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(
    props.data.transcript === undefined
  )

  const [activeTab, setActiveTab] = useState('tab1')
  const [autoplay, setAutoplay] = useState(0)
  const [timestamp, setTimestamp] = useState()
  const [downloading, setDownloading] = useState(false)
  const [basicDataLoaded, setBasicDataLoaded] = useState(false)
  const [showReportIssue, setShowReportIssue] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [translatingLanguage, setTranslatingLanguage] = useState('')
  const [languagesWanted, setLanguagesWanted] = useState([])
  const [askText, setAskText] = useState('')
  const [selectionCall, setSelectionCall] = useState(false)
  const [modelName, setModelName] = useState('')
  const [languages, setLanguages] = useState([])
  const [showScrollBackButton, setShowScrollBackButton] = useState(false)

  const [mainPopoverOpen, setMainPopoverOpen] = useState(false)
  const [mainPopoverOpenSmall, setMainPopoverOpenSmall] = useState(false)
  const [transcript, setTranscript] = useState([])
  const [summaryArray, setSummaryArray] = useState([])
  const [showYouTubeFrame, setShowYouTubeFrame] = useState(
    props.data.source_type !== undefined && props.data.source_type === 'sp'
      ? false
      : localStorage.getItem('showYouTubeFrame') !== 'false'
  )
  const [isPastMainPopoverOpenThreshold, setIsPastMainPopoverOpenThreshold] =
    useState(window.innerWidth <= 1000)

  const [summary, setSummary] = useState('')

  const [inputValue, setInputValue] = useState('')

  const [highlightClass, setHighlightClass] = useState('')
  const [isSandbox, setIsSandbox] = useState(false)

  const buttonRef = useRef(null)
  const inputRef = useRef(null)
  const contentRef = useRef(null)

  const userArchipelagoNames = props.userArchipelagos.map(item => [
    item.name,
    item.uid,
  ])

  const data = props.data

  const title = data.title
  const inputDate =
    data.added_ts !== undefined ? data.added_ts.substring(0, 10) : undefined
  let formattedDate = ''
  useEffect(() => {
    if (inputDate !== undefined && formattedDate.length === 0) {
      const parts = inputDate.split('-')
      formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`
    }
  }, [inputDate])

  let contentSummaries = []

  const transcript_raw = props.data.transcript

  const ref = useRef(null)

  const language_codes = {
    __: '__',
    af: 'Afrikaans',
    ar: 'العربية',
    hy: 'Հայերեն',
    az: 'Azərbaycan dili',
    be: 'Беларуская',
    bs: 'Bosanski',
    bg: 'Български',
    ca: 'Català',
    zh: '中文',
    hr: 'Hrvatski',
    cs: 'Čeština',
    da: 'Dansk',
    nl: 'Nederlands',
    en: 'English',
    et: 'Eesti',
    fi: 'Suomi',
    fr: 'Français',
    gl: 'Galego',
    de: 'Deutsch',
    el: 'Ελληνικά',
    he: 'עברית',
    hi: 'हिन्दी',
    hu: 'Magyar',
    is: 'Íslenska',
    id: 'Bahasa Indonesia',
    it: 'Italiano',
    ja: '日本語',
    kn: 'ಕನ್ನಡ',
    kk: 'Қазақ',
    ko: '한국어',
    lv: 'Latviešu',
    lt: 'Lietuvių',
    mk: 'Македонски',
    ms: 'Bahasa Melayu',
    mr: 'मराठी',
    mi: 'Māori',
    ne: 'नेपाली',
    no: 'Norsk',
    fa: 'فارسی',
    pl: 'Polski',
    pt: 'Português',
    ro: 'Română',
    ru: 'Русский',
    sr: 'Српски',
    sk: 'Slovenčina',
    sl: 'Slovenščina',
    es: 'Español',
    sw: 'Kiswahili',
    sv: 'Svenska',
    tl: 'Tagalog',
    ta: 'தமிழ்',
    th: 'ไทย',
    tr: 'Türkçe',
    uk: 'Українська',
    ur: 'اردو',
    vi: 'Tiếng Việt',
    cy: 'Cymraeg',
  }
  useEffect(() => {
    if (summary !== undefined && summary !== null) {
      setModelName(summary.quality_str)
    }
  }, [summary])

  useEffect(() => {
    if (
      props.data !== undefined &&
      props.data !== null &&
      contentSummaries.length === 0
    ) {
      contentSummaries = props.data.summaries
      const languagesToSet = []
      if (contentSummaries !== undefined && contentSummaries.length > 0) {
        contentSummaries.map(summary => languagesToSet.push(summary.lang))
        if (
          summary !== undefined &&
          summary.length > 0 &&
          summary.summary === null
        ) {
          languagesWanted.push(language)
        }
      }

      setLanguages(languagesToSet)
    }
  }, [props.data, language])

  const reorderedLanguageCodes = {
    ...languages.reduce((result, code) => {
      if (language_codes.hasOwnProperty(code)) {
        result[code] = language_codes[code]
        delete language_codes[code]
      }
      return result
    }, {}),
    ...language_codes,
  }

  useEffect(() => {
    summaryParser()
  }, [language, data])

  const requestTranslation = async () => {
    await currentUser.getIdToken().then(idToken => {
      axios
        .post(
          `${API_URL}/sources/${data.source_type}/${data.source_id}?lang=${language}`,
          {
            lang: language,
          },
          {
            headers: {
              'id-token': idToken,
            },
          }
        )
        .then(response => {
          setLanguagesWanted([...languagesWanted, language])

          setTranslatingLanguage(language)
        })
        .catch(error => {
          setErrorMessage(true)
        })
    })
  }

  const handleBookmark = async () => {
    const changeBookmark = !props.isBookmarked

    await currentUser.getIdToken().then(idToken => {
      axios
        .patch(
          `${API_URL}/sources/${data.source_type}/${data.source_id}/bookmark?bookmark=${changeBookmark}`,
          {},
          {
            headers: {
              accept: 'application/json',
              'id-token': idToken,
            },
          }
        )
        .then(props.setIsBookmarked(!props.isBookmarked))
    })
  }

  const themePopover = {
    popover: {
      styles: {
        base: {
          bg: 'bg-white dark:bg-mildDarkMode',
          color: 'text-blue-gray-500 dark:text-zinc-200',
          border: 'border  dark:border-zinc-600',
        },
      },
    },
  }

  const url = window.location.href
  const parts = url.split('/')
  const upPart = parts[3]

  useEffect(() => {
    if (upPart === 'up' && data.length === 0 && basicDataLoaded === true) {
      /* navigate("/404") */
    }
  }, [basicDataLoaded, data])

  useEffect(() => {
    if (data != undefined && data.source_type === 'up') {
      setTimeout(() => {
        setBasicDataLoaded(true)
      }, 2000)
    } else if (data != undefined) {
      setTimeout(() => {
        setBasicDataLoaded(true)
      }, 1000)
    }
    setTimeout(() => {}, 2000)

    /* const scrollableDiv = ref.current
    scrollableDiv.addEventListener('scroll', checkScrollPosition)

    return () => {
      scrollableDiv.removeEventListener('scroll', checkScrollPosition)
    } */
  }, [])

  // for question answering
  const timestampChanger = event => {
    setAutoplay(1)
    setShowYouTubeFrame(true)
    const formattedTimestamp = event.target.textContent
    const [hours, minutes, seconds] = formattedTimestamp.split(':')
    setTimestamp(hours * 3600 + minutes * 60 + seconds.substring(0, 2) * 1)

    /*
				setTimestamp(hours[0] === "0" ? hours[1] * 3600 : hours * 3600

					+ minutes[0] === "0" ? minutes[1] * 60 : minutes * 60

						+ seconds[0] === "0" ? seconds[1] * 1 : seconds.substring(0, 2) * 1) */
  }
  const handleClickTimestamp = event => {
    setAutoplay(1)
    let formattedTimestamp
    if (event.target) {
      formattedTimestamp = event.target.textContent
      const [hours, minutes, seconds] = formattedTimestamp.split(':')

      setTimestamp(hours * 3600 + minutes * 60 + seconds * 1)
    } else {
      setTimestamp(Math.floor(event))
    }

    setShowYouTubeFrame(true)
  }

  const handleReportIssue = () => {
    if (showReportIssue === false) {
      if (currentUser !== null && currentUser !== undefined) {
        setShowReportIssue(true)
      }
    }
  }

  async function summaryParser() {
    let activeSummary

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
      if (
        activeSummary.summary_prettified !== undefined &&
        activeSummary.summary_prettified !== null
      ) {
        if (typeof activeSummary.summary_prettified === 'string') {
          await setSummaryArray(activeSummary.summary_prettified.split('\n'))
        } else {
          await setSummaryArray(activeSummary.summary_prettified)
        }
      } else {
        if (typeof activeSummary.summary === 'string') {
          await setSummaryArray(activeSummary.summary.split('\n'))
        } else {
          await setSummaryArray(activeSummary.summary)
        }
      }
    }
  }

  async function transcriptParser() {
    const transcript = []

    const parser = await new srtParser2()

    const srt_array = await parser.fromSrt(transcript_raw)

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
        // timestamps = timestamps + `<a style='cursor:pointer' onclick={event.target.textContent} ${srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)} <a/>`
        count = 0
        nothing = ''
      }
      // in case missing punctuation, push it anyway
      else if (count > 12) {
        await transcript.push(nothing)
        await transcript.push(
          srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)
        )
        // timestamps = timestamps + `<a style='cursor:pointer' onclick={event.target.textContent} ${srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4)} <a/>`
        count = 0
        nothing = ''
      } else if (i === srt_array.length - 1) {
        await transcript.push(nothing)
        count = 0
        nothing = ''
      }
    }

    await setTranscript(transcript)
    /* transcript_array = data.transcript_chunked.split("\n") */
  }

  if (
    transcript.length === 0 &&
    data !== undefined &&
    data.transcript !== null
  ) {
    transcriptParser()
  }

  useEffect(() => {
    if (
      summaryArray.length === 0 &&
      summary !== undefined &&
      summary.summary !== null
    ) {
      summaryParser()
    }
  }, [summary])

  const handleDownload = selection => {
    setDownloading(true)
    // popover.toggle()

    // create .srt file
    setTimeout(() => {
      if (activeTab === 'tab2') {
        if (selection === 1) {
          const blob = new Blob([data.transcript], { type: 'text/srt' })

          // save file as blob
          saveAs(blob, `${data.creator_name}_${title}_Subtitles.srt`)
        } else if (selection === 2) {
          let text = ''
          let stop = false
          for (let i = 0; i < transcript.length; i++) {
            text = text + transcript[i] + '\n\n'
            if (i === transcript.length - 1) {
              stop = true
            }
          }
          if (stop === true) {
            const blob = new Blob([text], { type: 'text/txt' })
            saveAs(blob, `${data.creator_name}_${title}_Transcript.txt`)
          }
        }

        setTimeout(() => {
          setDownloading(false)
        }, 2000)
      }
    }, 3000)
  }

  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection().toString()

      if (selectedText.length > 0) {
        setAskText(selectedText)
      } else {
      }
    }

    document.addEventListener('mouseup', handleSelection)
    return () => {
      document.removeEventListener('mouseup', handleSelection)
    }
  }, [])

  const handleAskAlphy = type => {
    let askInput

    const selection = window.getSelection()

    setShowScrollBackButton(true)
    if (!selection.rangeCount) return
    if (document.getElementById('selection-span') !== null) {
      const previousSpanSelection = document.getElementById('selection-span')
      previousSpanSelection.outerHTML = previousSpanSelection.innerHTML
      previousSpanSelection.className = ''
      previousSpanSelection.id = ''
    }
    const range = selection.getRangeAt(0)

    const span = document.createElement('span')
    span.id = 'selection-span'
    let lastChild = range.commonAncestorContainer.lastChild
    if (lastChild == null) {
      lastChild = range.commonAncestorContainer
    }

    const newRange = document.createRange()
    newRange.selectNode(lastChild)
    newRange.surroundContents(span)
    /* range.surroundContents(span); */
    if (window.getSelection) {
      window.getSelection().removeAllRanges() // Clears the text selection
    } else if (document.selection) {
      // For older versions of IE
      document.selection.empty()
    }

    if (type === 'default') {
      askInput = 'Explain the following:' + askText + "?'"
    } else if (type === 'ELI5') {
      /* 		else if (type === "investment") {
					askInput = "Give me the investment opportunities and risks for the following:" + "'" + askText + "'"
				} */
      askInput = "Explain the following like I'm 5:" + "'" + askText + "'"
    }

    setInputValue(askInput)

    // setSelectionCall(true)

    if (inputRef.current) {
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.click()
        }
      }, 1000)
    }

    handleScroll()
  }

  const scrollToSavedDepth = () => {
    setShowScrollBackButton(false)

    if (document.getElementById('selection-span')) {
      const selectionSpan = document.getElementById('selection-span')

      if (selectionSpan) {
        selectionSpan.scrollIntoView({ behavior: 'smooth' }) // Smooth scroll
        selectionSpan.className = 'flash-effect'
      }
    }

    /* 	if (savedPosition && ref.current) {
				ref.current.scrollTop = parseInt(savedPosition, 10);
				setShowScrollBackButton(false)
			} */
  }

  const handleAddToArchipelago = (archipelagoUID, create) => {
    const newSource = {
      source_id: data.source_id,
      source_type: data.source_type,
    }
    if (create === false) {
      axios
        .get(
          `${
            API_URL || 'http://localhost:3001'
          }/playlists/${archipelagoUID}?nof_questions=10&tracks=true`
        )
        .then(response => {
          axios.patch(
            `${API_URL || 'http://localhost:3001'}/playlists/${archipelagoUID}`,
            {
              user_id: currentUser.uid,
              sources: [...response.data.tracks, newSource],
            }
          )

          setMainPopoverOpen(false)
        })
        .then(() => {})
    } else if (create === true) {
      axios
        .post(
          `${API_URL || 'http://localhost:3001'}/playlists/`,
          {
            name: title,
            user_id: currentUser.uid,
            sources: [newSource],
          },
          {
            headers: {
              'id-token': currentUser.accessToken,
            },
          }
        )
        .then(response => {
          setMainPopoverOpen(false)
          const archipelagoUID = response.data.uid
          navigate(`/arc/${archipelagoUID}`)
        })
        .catch(error => {
          console.error('Error adding to arc:', error)
          setMainPopoverOpen(false)
        })
    }
  }

  const handleScroll = () => {
    const contentElement = document.getElementById('processing-tier')
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleVisibility = () => {
    const bodyTextElement = document.getElementById('q-and-a')
    if (bodyTextElement) {
      const position = bodyTextElement.getBoundingClientRect()
      /* 	if (position.top < window.innerHeight && position.bottom >= 0) {
					setScrollUpButton(true);
				} else {
					setScrollUpButton(false);
				} */
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth
      const newIsPastThreshold = currentWidth <= 1000

      if (isPastMainPopoverOpenThreshold !== newIsPastThreshold) {
        setIsPastMainPopoverOpenThreshold(newIsPastThreshold)
        setMainPopoverOpenSmall(false)
        setMainPopoverOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isPastMainPopoverOpenThreshold])

  function handleShowYouTubeFrame() {
    if (showYouTubeFrame) {
      setShowYouTubeFrame(false)
      localStorage.setItem('showYouTubeFrame', false)
    } else {
      setShowYouTubeFrame(true)
      localStorage.setItem('showYouTubeFrame', true)
    }
  }

  const triggerFlashEffect = () => {
    setHighlightClass('flash-effect')
    setTimeout(() => setHighlightClass(''), 1000) // Reset after animation
  }

  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  return (
    <div
      ref={ref}
      className={`md:max-w-[100vw] scroll-smooth pb-10 md:px-10  xl:px-20  3xl:px-40  mt-5 md:mt-0  mx-auto 3xl:mx-0 overflow-x-hidden   md:pt-20 h-full lg:min-h-[100vh] lg:max-h-[100vh] overflow-y-auto`}
    >
      <div
        className={`transition-transform duration-300 ${
          isSandbox
            ? 'sm:translate-x-[5%] lg:translate-x-[10%] xl:translate-x-[15%] 3xl:translate-x-[15%]'
            : 'translate-x-0'
        } flex flex-col `}
      >
        
        <HeaderArea
          data={data}
          title={title}
          tier={props.tier}
          isVisible={props.isVisible}
          handleVisibility={props.handleVisibility}
          handleBookmark={handleBookmark}
          isBookmarked={props.isBookmarked}
          handleReportIssue={handleReportIssue}
          showReportIssue={showReportIssue}
          setShowReportIssue={setShowReportIssue}
          handleAddToArchipelago={handleAddToArchipelago}
          userArchipelagoNames={userArchipelagoNames}
          currentUser={currentUser}
          transcript={transcript}
          summary={summary}
          language={language}
          handleLanguageChange={handleLanguageChange}
          languages={languages}
          mainPopoverOpen={mainPopoverOpen}
          setMainPopoverOpen={setMainPopoverOpen}
          mainPopoverOpenSmall={mainPopoverOpenSmall}
          setMainPopoverOpenSmall={setMainPopoverOpenSmall}
          modelName={modelName}
          reorderedLanguageCodes={reorderedLanguageCodes}
          isSandbox={isSandbox}
          setIsSandbox={setIsSandbox}
        />

        <div className="">
          <div className={`${isSandbox && 'hidden'}`}>
            <ReadComponent
              data={data}
              transcript={transcript}
              summary={summary}
              summaryArray={summaryArray}
              isLoading={isLoading}
              handleClickTimestamp={handleClickTimestamp}
              handleDownload={handleDownload}
              handleAskAlphy={handleAskAlphy}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              inputValue={inputValue}
              setInputValue={setInputValue}
              selectionCall={selectionCall}
              setSelectionCall={setSelectionCall}
              buttonRef={buttonRef}
              inputRef={inputRef}
              timestampChanger={timestampChanger}
              languages={languages}
              languagesWanted={languagesWanted}
              language={language}
              errorMessage={errorMessage}
              contentSummaries={contentSummaries}
              showYouTubeFrame={showYouTubeFrame}
              setShowYouTubeFrame={setShowYouTubeFrame}
              videoRef={videoRef}
              canvasRef={canvasRef}
              autoplay={autoplay}
              timestamp={timestamp}
              title={title}
              basicDataLoaded={basicDataLoaded}
              setBasicDataLoaded={setBasicDataLoaded}
              handleShowYouTubeFrame={handleShowYouTubeFrame}
              contentRef={contentRef}
              working={working}
              downloading={downloading}
              themePopover={themePopover}
              language_codes={language_codes}
              currentUser={currentUser}
              QuestionAnswering={QuestionAnswering}
              requestTranslation={requestTranslation}
              tier={props.tier}
            />
          </div>

          <div className={`${isSandbox ? 'flex' : 'hidden'} w-full `}>
            <Sandbox data={data} />
          </div>
        </div>
      </div>

      {basicDataLoaded === true && (
        <div>
          {data !== null && transcript.length === 0 && language === 'en' ? (
            <div className="flex flex-col mb-20 mt-20 ">
              <p className="text-xl text-zinc-500 dark:text-zinc-200  max-w-screen-md mx-auto p-3 text-center">
                <span className="font-averta-regular">
                  Alphy is doing its best to process this{' '}
                  {data.source_type === 'yt' ? 'video' : 'recording'}, it will
                  be ready in a few minutes. We'll send you an email when it's
                  ready!
                  <img
                    className={'opacity-70 dark:opacity-90 mx-auto '}
                    src={working}
                    alt="My SVG"
                  />
                </span>
              </p>
            </div>
          ) : null}
          {((summary !== undefined &&
            summary !== null &&
            summary.summary === null &&
            summary.lang !== 'en' &&
            language !== 'en' &&
            summary.summary === undefined) ||
            (languagesWanted.includes(language) === true &&
              language !== 'en')) && (
            <div className="flex flex-col mb-20 mt-20 ">
              {data !== null && (
                <p className="text-xl text-zinc-500 dark:text-zinc-200 font-averta-regular  max-w-screen-md mx-auto p-3 text-center">
                  Alphy is currently working hard to translate this{' '}
                  {data.source_type === 'yt' ? 'video' : 'recording'} to{' '}
                  {language_codes[language]}. Please come back in a few minutes!
                  <img
                    className={'opacity-70 dark:opacity-90 mx-auto '}
                    src={working}
                    alt="My SVG"
                  />
                </p>
              )}
            </div>
          )}
        </div>
      )}
      {errorMessage === true && (
        <div className="flex flex-col mb-20 mt-20 ">
          <p className="text-xl text-zinc-500 dark:text-zinc-200 font-averta-semibold max-w-screen-md mx-auto p-3 text-center">
            There was an error with the request :( <br></br>
            <br></br>Please refresh the page and try again. If the issue
            persists, please contact us at support@alphy.app
          </p>
        </div>
      )}
      {showScrollBackButton ? (
        <button
          onClick={scrollToSavedDepth}
          className={`xl:hidden absolute ${
            showYouTubeFrame ? 'right-24 bottom-8' : 'lg:mb-20 right-5 bottom-5'
          }  text-zinc-300 dark:text-zinc-600  bg-mildDarkMode dark:bg-green-200 hover:bg-green-200 hover:text-zinc-700 text-white font-averta-semibold text-sm py-2 px-2 rounded-full transition ease-in-out duration-300 hover:scale-105  `}
        >
          {showYouTubeFrame ? (
            <p>SCROLL BACK</p>
          ) : (
            <ArrowUpwardIcon className="rotate-180" />
          )}
        </button>
      ) : (
        <button
          onClick={handleScroll}
          className={
            'lg:hidden lg:mb-20 absolute text-zinc-300 dark:text-zinc-600 bottom-5 right-5 bg-mildDarkMode opacity-80 dark:opacity-100 dark:bg-green-200 hover:bg-green-300 hover:text-zinc-800 text-white font-bold py-2 px-2 rounded-full transition ease-in-out duration:300'
          }
        >
          <ArrowUpwardIcon className="" />
        </button>
      )}
    </div>
  )
}
