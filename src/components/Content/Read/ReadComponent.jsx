import { useEffect, useState } from 'react'
import MediaPlayer from './ReadComponents/MediaPlayer'
import MediaControls from './ReadComponents/MediaControls'
import TabNavigation from './ReadComponents/TabNavigation'
import ContentDisplay from './ReadComponents/ContentDisplay'
import SelectionPopover from './ReadComponents/SelectionPopover'
import QuestionAnswering from './QA/QuestionAnswering'

export default function ReadComponent({
  data,
  transcript,
  summary,
  summaryArray,
  isLoading,
  handleClickTimestamp,
  handleDownload,
  handleAskAlphy,
  activeTab,
  setActiveTab,
  inputValue,
  setInputValue,
  selectionCall,
  setSelectionCall,
  buttonRef,
  inputRef,
  timestampChanger,
  languages,
  languagesWanted,
  language,
  errorMessage,
  contentSummaries,
  showYouTubeFrame,
  setShowYouTubeFrame,
  videoRef,
  canvasRef,
  autoplay,
  timestamp,
  title,
  basicDataLoaded,
  setBasicDataLoaded,
  handleShowYouTubeFrame,
  contentRef,
  working,
  downloading,
  themePopover,
  language_codes,
  currentUser,
  requestTranslation,
  tier,
  theme,
}) {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const convertTimeToSeconds = (time) => {
    // Check if the input is a string and matches the ISO 8601 duration format
    if (typeof time === 'string' && time.match(/^PT/)) {
      const matches = time.match(/PT(\d+H)?(\d+M)?(\d+(?:\.\d+)?S)?/);
      let seconds = 0;
  
      // If hours are present, convert them to seconds and add to total
      if (matches[1]) {
        seconds += parseInt(matches[1]) * 3600;
      }
  
      // If minutes are present, convert them to seconds and add to total
      if (matches[2]) {
        seconds += parseInt(matches[2]) * 60;
      }
  
      // If seconds are present, add them to total
      if (matches[3]) {
        seconds += parseFloat(matches[3]);
      }
  
      return seconds;
    } else if (typeof time === 'number' || (typeof time === 'string' && time.match(/^\d+(?:\.\d+)?$/))) {
      // If the input is a numeric value or a string representing a number, parse it directly
      return parseFloat(time);
    } else {
      // If the input is neither, return null or throw an error
      return null;
    }
  }

  // Content available check
  const isContentAvailable = transcript.length > 0 && 
    ((summary !== undefined && summary.complete !== undefined && language === summary.lang) || 
     (summary !== undefined && summary.complete === undefined));

  // Translation request check
  const needsTranslation = errorMessage === true || 
    languagesWanted.includes(language) === true || 
    languages.includes(language) || 
    (summary !== undefined && summary.summary !== undefined && 
     summary.summary !== null && summary.summary.length > 0) || 
    (contentSummaries !== undefined && contentSummaries.length > 1 && 
     (contentSummaries[0].lang === language || contentSummaries[1].lang === language)) || 
    language === 'en';

  return (
    <div id="content-area" className="overscroll-none">
      {isContentAvailable ? (
        <div className="flex flex-col xl:flex-row mt-5 lg:mt-16">
          {transcript.length > 0 && (
            <div className={`${data.summaries.length === 0 ? 'hidden' : ''} grid-cols-2 w-full md:min-w-[500px]`}>
              <MediaPlayer 
                data={data}
                transcript={transcript}
                showYouTubeFrame={showYouTubeFrame}
                videoRef={videoRef}
                canvasRef={canvasRef}
                autoplay={autoplay}
                timestamp={timestamp}
                title={title}
                theme={theme}
              />
              
              <MediaControls 
                data={data}
                showYouTubeFrame={showYouTubeFrame}
                handleShowYouTubeFrame={handleShowYouTubeFrame}
              />
              
              {summary.key_qa !== undefined && (
                <div 
                  id="q-and-a" 
                  className={summary.key_qa === null ? 
                    'question-answering md:min-h-[600px] border-b overflow-auto pt-10 pl-5 pr-5 pb-5 border border-zinc-100 dark:border-zinc-700 rounded-xl' : ''}
                >
                  {summary.key_qa === null ? (
                    <p className="text-xl text-slate-500 dark:text-slate-200 quicksand font-normal max-w-screen-md p-3 text-center italic">
                      Generating questions... plugging in an AI assistant...
                      <img
                        className={'opacity-70 dark:opacity-90 mx-auto'}
                        src={working}
                        width={140}
                        alt="Working"
                      />
                    </p>
                  ) : (
                    <QuestionAnswering
                      source_id={data.source_id}
                      source_type={data.source_type}
                      selectionCall={selectionCall}
                      setSelectionCall={setSelectionCall}
                      key_qa={summary.key_qa}
                      inputValue={inputValue}
                      setInputValue={setInputValue}
                      setShowYouTubeFrame={setShowYouTubeFrame}
                      buttonRef={buttonRef}
                      inputRef={inputRef}
                      data={data}
                      transcript={transcript}
                      timestampChanger={timestampChanger}
                      currentUser={currentUser}
                    />
                  )}
                </div>
              )}
            </div>
          )}
          
          {transcript.length > 0 && (
            <div className={`${isLoading ? 'hidden' : ''} w-full 3xl:w-5/6 max-w-[700px] mt-10 md:mt-0`}>
              {transcript.length > 0 && (
                <div className="mt-14 xl:mt-0 w-full bg-white dark:bg-mildDarkMode drop-shadow-md 3xl:min-w-[500px] mb-10 lg:mb-0 xl:ml-10 rounded-lg px-5 py-2 border border-zinc-100 drop-shadow-sm dark:border-zinc-700">
                  <TabNavigation 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                  />
                  
                  <SelectionPopover handleAskAlphy={handleAskAlphy}>
                    <div ref={contentRef} className="main-content text-slate-700 dark:text-slate-200">
                      <ContentDisplay
                        activeTab={activeTab}
                        data={data}
                        summary={summary}
                        summaryArray={summaryArray}
                        isLoading={isLoading}
                        transcript={transcript}
                        handleClickTimestamp={handleClickTimestamp}
                        working={working}
                        convertTimeToSeconds={convertTimeToSeconds}
                        handleDownload={handleDownload}
                        downloading={downloading}
                        tier={tier}
                        basicDataLoaded={basicDataLoaded}
                        themePopover={themePopover}
                      />
                    </div>
                  </SelectionPopover>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col mb-20 mt-20">
          {!needsTranslation && (
            <p className="text-xl text-slate-500 dark:text-slate-200 quicksand font-normal max-w-screen-md mx-auto p-3 text-center">
              Seems like Alphy hasn't processed the content in {language_codes[language]} yet.{' '}
              {tier !== undefined && tier !== 'free' ? (
                <p className="quicksand font-normal">
                  Request Alphy to generate summary, key takeaways, and
                  questions in {language_codes[language]} clicking{' '}
                  <a
                    onClick={requestTranslation}
                    className="underline text-greenColor cursor-pointer"
                  >
                    here
                  </a>
                  .
                </p>
              ) : (
                <p className="quicksand font-normal">
                  Upgrade your plan request translation. You can check out the{' '}
                  <a
                    className="underline text-green-300"
                    href={currentUser ? '/account' : '/plans'}
                  >
                    {currentUser ? 'account' : 'plans'}
                  </a>{' '}
                  page for more detail
                </p>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  )
}