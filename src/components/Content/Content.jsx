"use client"
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { ArrowUp } from 'lucide-react'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { saveAs } from 'file-saver'

// Services and utilities
import { useAuth } from '../../hooks/useAuth'
import { API_URL } from '../../constants'
import { LANGUAGE_CODES } from './constants/languageCodes'

// Components
const ReadComponent = dynamic(() => import('./Read/ReadComponent'), { ssr: false })
const InteractiveComponent = dynamic(() => import('./Interactive/InteractiveComponent'), { ssr: false })
const HeaderArea = dynamic(() => import('./Read/Header/HeaderArea'), { ssr: false })

// Custom hooks
import { useTranscript } from './hooks/useTranscript'
import { useSummary } from './hooks/useSummary'
import { useVideoNavigation } from './hooks/useVideoNavigation'
import { useSelectionHandling } from './hooks/useSelectionHandling'
import { useArchipelago } from './hooks/useArchipelago'
import { useContentUI } from './hooks/useContentUI'
import { useDownloadHandling } from './hooks/useDownloadHandling'

// Extracted smaller components
import { TranslationStatus } from './components/TranslationStatus'
import { ErrorMessage } from './components/ErrorMessage'
import { ScrollControls } from './components/ScrollControls'

export default function Content({
  language,
  setLanguage,
  handleLanguageChange,
  isSandbox,
  setIsSandbox,
  data,
  isVisible,
  handleVisibility,
  tier,
  userArchipelagos,
  isBookmarked,
  setIsBookmarked,
  getSandboxHistory,
  source_id,
  source_type,
}) {
  const { currentUser } = useAuth()
  const router = useRouter()

  // Organize related state together
  // Basic content state
  const [isLoading, setIsLoading] = useState(data?.transcript === undefined)
  const [activeTab, setActiveTab] = useState('summary')
  const [basicDataLoaded, setBasicDataLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [modelName, setModelName] = useState('')
  
  // Language and text state
  const [languagesWanted, setLanguagesWanted] = useState([])
  const [languages, setLanguages] = useState([])
  const [askText, setAskText] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [translatingLanguage, setTranslatingLanguage] = useState('')
  
  // UI control state
  const [selectionCall, setSelectionCall] = useState(false)
  const [showReportIssue, setShowReportIssue] = useState(false)
  const [showClip, setShowClip] = useState(false)
  const [askAlphyForSandbox, setAskAlphyForSandbox] = useState(false)
  
  // References
  const buttonRef = useRef(null)
  const inputRef = useRef(null)
  const contentRef = useRef(null)
  const ref = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Custom hooks
  const { 
    transcript, 
    setTranscript, 
    transcriptParser 
  } = useTranscript(data)
  
  const { 
    summary, 
    setSummary, 
    summaryArray, 
    setSummaryArray, 
    summaryParser,
    keyTakeaways
  } = useSummary(data, language)
  
  const { 
    autoplay, 
    setAutoplay, 
    timestamp, 
    setTimestamp, 
    showYouTubeFrame, 
    setShowYouTubeFrame, 
    handleClickTimestamp, 
    timestampChanger 
  } = useVideoNavigation()
  const {
    mainPopoverOpen,
    setMainPopoverOpen,
    mainPopoverOpenSmall, 
    setMainPopoverOpenSmall,
    isPastMainPopoverOpenThreshold,
    setIsPastMainPopoverOpenThreshold,
    showScrollBackButton, 
    setShowScrollBackButton,
    downloading, 
    setDownloading,
    themePopover
  } = useContentUI()

  
  const {
    highlightClass,
    setHighlightClass,
    handleAskAlphy,
    scrollToSavedDepth
  } = useSelectionHandling(setAskText, setInputValue, setShowScrollBackButton, setIsSandbox, buttonRef, inputRef)
  
  const {
    handleAddToArchipelago
  } = useArchipelago(source_id, source_type, currentUser, setMainPopoverOpen, router)

 

  const { handleDownload } = useDownloadHandling(
    activeTab, 
    data, 
    transcript, 
    setDownloading
  )

  // Memoized values
  const formattedDate = useMemo(() => {
    if (!data?.added_ts) return ''
    const inputDate = data.added_ts.substring(0, 10)
    const parts = inputDate.split('-')
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }, [data?.added_ts])

  const userArchipelagoNames = useMemo(() => {
    return userArchipelagos.map(item => [item.name, item.uid])
  }, [userArchipelagos])

  const reorderedLanguageCodes = useMemo(() => {
    return {
      ...languages.reduce((result, code) => {
        if (LANGUAGE_CODES.hasOwnProperty(code)) {
          result[code] = LANGUAGE_CODES[code]
        }
        return result
      }, {}),
      ...LANGUAGE_CODES,
    }
  }, [languages])

  // Memoized handlers
  const requestTranslation = useCallback(async () => {
    try {
      const idToken = await currentUser.getIdToken()
      await axios.post(
        `${API_URL}/sources/${source_type}/${source_id}?lang=${language}`,
        { lang: language },
        { headers: { 'id-token': idToken } }
      )
      setLanguagesWanted(prev => [...prev, language])
      setTranslatingLanguage(language)
    } catch (error) {
      setErrorMessage(true)
      console.error('Translation request error:', error)
    }
  }, [currentUser, source_type, source_id, language])

  const handleBookmark = useCallback(async () => {
    try {
      const idToken = await currentUser.getIdToken()
      await axios.patch(
        `${API_URL}/sources/${source_type}/${source_id}/bookmark?bookmark=${!isBookmarked}`,
        {},
        { headers: { accept: 'application/json', 'id-token': idToken } }
      )
      setIsBookmarked(!isBookmarked)
    } catch (error) {
      console.error('Bookmark error:', error)
    }
  }, [currentUser, source_type, source_id, isBookmarked])

  const handleReportIssue = useCallback(() => {
    if (!showReportIssue && currentUser) {
      setShowReportIssue(true)
    }
  }, [showReportIssue, currentUser])

  const handleScroll = useCallback(() => {
    const contentElement = document.getElementById('processing-tier')
    if (contentElement) {
      contentElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  const handleShowYouTubeFrame = useCallback(() => {
    const newValue = !showYouTubeFrame
    setShowYouTubeFrame(newValue)
    localStorage.setItem('showYouTubeFrame', String(newValue))
  }, [showYouTubeFrame])

  // Effects
  useEffect(() => {
    if (window.innerWidth > 1000) {
      setIsPastMainPopoverOpenThreshold(true)
    }
    
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
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isPastMainPopoverOpenThreshold])

  useEffect(() => {
    if (isLoading) return
    
    const generationPrompt = sessionStorage.getItem('fillPrompt')
    if (generationPrompt !== null) {
      setIsSandbox(true)
    }
  }, [isLoading, setIsSandbox])

  useEffect(() => {
    if (!data || data === null) return;
    
    const contentSummaries = data.summaries;
    if (contentSummaries && contentSummaries.length > 0) {
      const languagesToSet = contentSummaries.map(summary => summary.lang);
      setLanguages(languagesToSet);
      
      if (summary?.length > 0 && summary.summary === null && !languagesWanted.includes(language)) {
        setLanguagesWanted(prev => [...prev, language]);
      }
    }
  }, [data, language, summary, languagesWanted]);

  useEffect(() => {
    if (summary?.quality_str) {
      setModelName(summary.quality_str)
    }
  }, [summary])
  
console.log(data)
  useEffect(() => {
    summaryParser();
  }, [language, data, summaryParser]);

  useEffect(() => {
    if (transcript.length === 0 && data?.transcript !== null) {
      transcriptParser();
    }
  }, [data, transcript, transcriptParser]);

  useEffect(() => {
    if (summaryArray.length === 0 && summary?.summary !== null) {
      summaryParser();
    }
  }, [summary, summaryArray, summaryParser]);

  useEffect(() => {
    if (!data) return
    
    const timer = setTimeout(() => {
      setBasicDataLoaded(true)
    }, source_type === 'up' ? 2000 : 1000)
    
    return () => clearTimeout(timer)
  }, [data, source_type])

  useEffect(() => {
    const handleSelection = () => {
      const selectedText = window.getSelection().toString()
      if (selectedText.length > 0) {
        setAskText(selectedText)
      }
    }

    document.addEventListener('mouseup', handleSelection)
    return () => {
      document.removeEventListener('mouseup', handleSelection)
    }
  }, [])


  return (
    <div ref={ref} className="h-screen overflow-hidden">
      <div
        className={`transition-transform duration-300 ${
          isSandbox
            ? 'sm:translate-x-[5%] lg:translate-x-[10%] xl:translate-x-[15%] 3xl:translate-x-[15%]'
            : ''
        } flex flex-row h-full`}
      >
        {/* Left section - 2/3 width */}

        <div className="w-3/5 flex flex-col h-full mt-10">
        <div className="flex flex-row">
        {data?.source_type === 'yt' && data?.source_id && (
          <div className="mb-4">
            <img 
              src={`https://i.ytimg.com/vi/${data.source_id}/hqdefault.jpg`} 
              alt={data?.title || "YouTube thumbnail"} 
              className="rounded-lg shadow-md max-w-[150px] hover:cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={handleShowYouTubeFrame}
              
            />
          </div>
        )}
         
          <HeaderArea
            data={data}
            title={data?.title}
            tier={tier}
            isVisible={isVisible}
            handleVisibility={handleVisibility}
            handleBookmark={handleBookmark}
            isBookmarked={isBookmarked}
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
            setLanguage={setLanguage}
            languages={languages}
            mainPopoverOpen={mainPopoverOpen}
            setMainPopoverOpen={setMainPopoverOpen}
            mainPopoverOpenSmall={mainPopoverOpenSmall}
            setMainPopoverOpenSmall={setMainPopoverOpenSmall}
            modelName={modelName}
            reorderedLanguageCodes={reorderedLanguageCodes}
            isSandbox={isSandbox}
            setIsSandbox={setIsSandbox}
            showClip={showClip}
            setShowClip={setShowClip}
            showYouTubeFrame={showYouTubeFrame}
            handleShowYouTubeFrame={handleShowYouTubeFrame}

          
          /> 
</div>
          <div className="flex-grow overflow-hidden">
           
              <div className="h-full overflow-auto mt-4">
              <ReadComponent
                  data={data}
                  transcript={transcript}
                  summary={summary}
                  summaryArray={summaryArray}
                  keyTakeaways={keyTakeaways}
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
                  contentSummaries={data?.summaries || []}
                  showYouTubeFrame={showYouTubeFrame}
                  setShowYouTubeFrame={setShowYouTubeFrame}
                  videoRef={videoRef}
                  canvasRef={canvasRef}
                  autoplay={autoplay}
                  timestamp={timestamp}
                  title={data?.title}
                  basicDataLoaded={basicDataLoaded}
                  setBasicDataLoaded={setBasicDataLoaded}
                  handleShowYouTubeFrame={handleShowYouTubeFrame}
                  contentRef={contentRef}
                  downloading={downloading}
                  themePopover={themePopover}
                  language_codes={LANGUAGE_CODES}
                  currentUser={currentUser}
                  requestTranslation={requestTranslation}
                  tier={tier}
                /> 
              </div>
            
          </div>
        </div>

        {/* Right section - 1/3 width */}
        <div className="w-2/5 h-full">
        <InteractiveComponent
            data={data}
            summary={summary}
            transcript={transcript}
            handleAskAlphy={handleAskAlphy}
            selectionCall={selectionCall}
            setSelectionCall={setSelectionCall}
            inputValue={inputValue}
            setInputValue={setInputValue}
            setShowYouTubeFrame={setShowYouTubeFrame}
            buttonRef={buttonRef}
            inputRef={inputRef}
            timestampChanger={timestampChanger}
            currentUser={currentUser}
            askAlphyForSandbox={askAlphyForSandbox}
            setAskAlphyForSandbox={setAskAlphyForSandbox}
            askText={askText}
            getSandboxHistory={getSandboxHistory}
            tier={tier}
          />
        </div>
      </div>

      {basicDataLoaded && (
        <TranslationStatus
          data={data}
          transcript={transcript}
          summary={summary}
          language={language}
          languagesWanted={languagesWanted}
          source_type={source_type}
          LANGUAGE_CODES={LANGUAGE_CODES}
        />
      )}
      
      <ErrorMessage 
        errorMessage={errorMessage} 
      />
      
      <ScrollControls
        showScrollBackButton={showScrollBackButton}
        scrollToSavedDepth={scrollToSavedDepth}
        handleScroll={handleScroll}
        showYouTubeFrame={showYouTubeFrame}
      />
    </div>
  )
}