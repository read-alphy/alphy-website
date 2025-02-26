import { Tab, Tabs } from 'react-bootstrap'
import Loading from '../../Loading'
import ReactMarkdown from 'react-markdown'
import * as Selection from 'selection-popover'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitchIcon from '../../../../public/img/twitch.png'
import X from '../../../../public/img/X.png'
import TwitterSpaces from '../../../../public/img/twitter_space.png'

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  ThemeProvider,
  Button,
  Spinner,
} from '@material-tailwind/react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import QuestionAnswering from '../Read/QA/QuestionAnswering'

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
}) 


{
  const [isClient, setIsClient] = useState(false)
  

  useEffect(() => {
    setIsClient(true)
  }, [])


  


  function convertTimeToSeconds(time) {
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




  
  return (
    <div id="content-area overscroll-none">
  
      {(transcript.length > 0 &&
      ((summary !== undefined &&
        summary.complete !== undefined &&
        language === summary.lang) ||
        (summary !== undefined && summary.complete === undefined)) ? (
        <div className="flex flex-col xl:flex-row mt-5 lg:mt-16">
          {transcript.length > 0 && (
            <div
              className={`${
                data.summaries.length === 0 ? 'hidden' : ''
              } grid-cols-2 w-full md:min-w-[500px]`}
            >
              {/* <div className={`hidden lg:flex justify-center items-center ${data.transcript ? "xl:w-1/2 w-2/3 h-[300px]" : "w-full h-[500px]"}  h-inherit mx-auto pb-10 xl:pb-0`}> */}

              {showYouTubeFrame === true && (
                <div>
                  <div
                    className={`hidden ${
                      data.source_type === 'yt' ||
                      data.source_type === 'ap' ||
                      data.source_type === 'tw'
                        ? 'lg:flex '
                        : ''
                    }  justify-center items-center `}
                  >
                    {data.source_type === 'yt' &&
                      (transcript.length > 0 || data.complete === true ? (
                        <div>
                          <iframe
                            id="player"
                            ref={videoRef}
                            title="My YouTube Video "
                            className={`fixed bottom-24 right-4 w-[480px] h-[320px] rounded-lg z-50 transition-all duration-500 ease-in-out transform hover:scale-105 ${
                              showYouTubeFrame ? 'opacity-100' : 'opacity-0'
                            }}`}
                            src={`https://www.youtube.com/embed/${data.source_id}?autoplay=${autoplay}&start=${timestamp}`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          ></iframe>
                          <canvas
                            ref={canvasRef}
                            style={{ display: 'none' }}
                          ></canvas>
                        </div>
                      ) : null)}

                    {data.source_type === 'tw' &&
                      (transcript.length > 0 || data.complete === true ? (
                        <div>
                          <iframe
                            ref={videoRef}
                            className={`fixed bottom-24 right-4 w-[480px] h-[320px] rounded-lg z-50 transition-all duration-500 ease-in-out transform hover:scale-105 ${
                              showYouTubeFrame ? 'opacity-100' : 'opacity-0'
                            }}`}
                            src={`https://player.twitch.tv/?video=v${
                              data.source_id
                            }&parent=${
                              window.location.href.includes('localhost')
                                ? 'localhost'
                                : window.location.href.includes('alphy.app')
                                ? 'alphy.app'
                                : 'staging--alphy-web.netlify.app'
                            }&autoplay=${
                              autoplay === 0 ? 'false' : 'true'
                            }&t=${timestamp}`}
                            width="100%"
                            height="100%"
                            allowFullScreen={true}
                            title={title ? title : ''}
                          ></iframe>
                          <canvas
                            ref={canvasRef}
                            style={{ display: 'none' }}
                          ></canvas>
                        </div>
                      ) : null)}

                    {data.source_type === 'ap' &&
                      (transcript.length > 0 || data.complete === true ? (
                        <div>
                          <iframe
                            ref={videoRef}
                            className={`fixed drop-shadow-xl  bottom-24 right-4 w-[540px] h-[160px] rounded-lg z-50 transition-all duration-500 ease-in-out transform hover:scale-105 ${
                              showYouTubeFrame ? 'opacity-100' : 'opacity-0'
                            }}`}
                            src={`https://embed.podcasts.apple.com/podcast/id${
                              data.source_id.split('-')[0]
                            }?i=${data.source_id.split('-')[1]}&theme=${
                              theme ==='dark'
                                ? 'dark'
                                : 'light'
                            }`}
                            width="100%"
                            height="100%"
                            allowFullScreen={true}
                            title={title ? title : ''}
                          ></iframe>
                        </div>
                      ) : null)}
                  </div>

                  <div
                    className={`bg-white dark:bg-mildDarkMode border pt-6 cursor-default items-center border-zinc-300 dark:border-zinc-500 drop-shadow-lg rounded-xl fixed bottom-24 right-4 min-w-[360px] max-w-[400px] min-h-[240px] z-50 ${
                      data.source_type === 'sp' ? 'hidden lg:flex' : ' hidden'
                    }`}
                  >
                    <a
                      className=" flex flex-col col-span-1 hidden lg:flex mx-auto mb-5 mt-3"
                      target="_blank"
                      href={`https://twitter.com/i/spaces/${data.source_id}`}
                      rel="noreferrer"
                    >
                      <Image
                        src={TwitterSpaces}
                        className="w-[240px] h-[120px] mx-auto"
                        width={240}
                        alt="X Spaces"
                      />
                      <p className="text-md text-slate-600 dark:text-slate-300 mt-10 text-center px-5 mx-auto underline quicksand font-bold">
                        Listen to{' '}
                        <span className="font-bold pb-6 hyphenate quicksand font-bold">
                          "{`${title}`.substring(0, 90)}{' '}
                          {title.length > 90 && '...'}"
                        </span>{' '}
                        on Twitter
                      </p>
                    </a>
                  </div>

                  <div
                    className={`bg-white dark:bg-mildDarkMode border pt-6 cursor-default items-center border-zinc-300 dark:border-zinc-500 drop-shadow-lg rounded-xl fixed bottom-24 right-4 min-w-[360px] max-w-[400px] min-h-[240px] z-50 ${
                      data.source_type === 'x' ? 'hidden lg:flex' : ' hidden'
                    }`}
                  >
                    <a
                      className=" flex flex-col col-span-1 hidden lg:flex mx-auto mb-5 mt-3"
                      target="_blank"
                      href={`https://twitter.com/i/status/${data.source_id}`}
                      rel="noreferrer"
                    >
                      <Image src={X} className="w-[240px] h-[120px] mx-auto" width={240}
                      alt="X Video"
                      />
                      <p className="text-md text-slate-600 dark:text-slate-300 mt-10 text-center px-5 mx-auto underline quicksand font-bold">
                        Watch{' '}
                        <span className="font-bold pb-6 hyphenate quicksand font-bold">
                          "{`${title}`.substring(0, 90)}{' '}
                          {title.length > 90 && '...'}"
                        </span>{' '}
                        on Twitter
                      </p>
                    </a>
                  </div>
                </div>
              )}

              <button
                onClick={handleShowYouTubeFrame}
                className={`z-50 fixed hidden ${
                  data.source_type == 'yt' && 'lg:block'
                } bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-red-400 transform transition-all duration-500 ease-in-out  hover:-translate-y-2 dark:bg-zinc-60`}
              >
                {showYouTubeFrame ? (
                  <ArrowDownwardIcon fontSize="large" className="text-white " />
                ) : (
                  <YouTubeIcon fontSize="large" className="text-white" />
                )}
              </button>

              <button
                onClick={handleShowYouTubeFrame}
                className={`z-50 fixed hidden ${
                  data.source_type == 'tw' && 'lg:block'
                } bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-[#9146ff] transform transition-all duration-500 ease-in-out  hover:-translate-y-2 dark:bg-zinc-60`}
              >
                {showYouTubeFrame ? (
                  <ArrowDownwardIcon fontSize="large" className="text-black " />
                ) : (
                  <Image
                    src={TwitchIcon}
                    fontSize="large"
                    className="text-white opacity-80"
                    width={35}
                    height={35}
                    alt="Twitch"
                  />
                )}
              </button>

              <button
                onClick={handleShowYouTubeFrame}
                className={`z-50 fixed hidden ${
                  data.source_type == 'sp' && 'lg:block'
                } bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-[#7366d7] transform transition-all duration-500 ease-in-out  hover:-translate-y-2 `}
              >
                {showYouTubeFrame ? (
                  <ArrowDownwardIcon fontSize="large" className="text-white " />
                ) : (
                  <TwitterIcon fontSize="large" className="text-white" />
                )}
              </button>

              <button
                onClick={handleShowYouTubeFrame}
                className={`z-50 fixed hidden ${
                  data.source_type == 'x' && 'lg:block'
                } bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-black transform transition-all duration-500 ease-in-out  hover:-translate-y-2 `}
              >
                {showYouTubeFrame ? (
                  <ArrowDownwardIcon fontSize="large" className="text-white " />
                ) : (
                  <TwitterIcon fontSize="large" className="text-white" />
                )}
              </button>

              <button
                onClick={handleShowYouTubeFrame}
                className={`z-50 fixed hidden ${
                  data.source_type == 'ap' && 'lg:block'
                } bottom-0 right-0 p-3 mb-4 mr-4 absolute right-0 rounded-full bg-[#ff4cd7] transform transition-all duration-500 ease-in-out  hover:-translate-y-2 dark:bg-zinc-60`}
              >
                {showYouTubeFrame ? (
                  <ArrowDownwardIcon fontSize="large" className="text-white " />
                ) : (
                  <svg
                    fill="#ffffff"
                    width="35px"
                    height="35px"
                    viewBox="-32 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      <path d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z" />
                    </g>
                  </svg>
                )}
              </button>

              <div
                className={`col-span-2  ${
                  data.source_type === 'yt' && ''
                } drop-shadow-sm `}
              >
                {summary.key_qa !== undefined && summary.key_qa === null ? (
                  <div
                    id="q-and-a"
                    className={
                      'question-answering  md:min-h-[600px] border-b overflow-auto pt-10 pl-5 pr-5 pb-5 border border-zinc-100 dark:border-zinc-700   rounded-xl'
                    }
                  >
                    <p className="text-xl text-slate-500 dark:text-slate-200 quicksand font-normal max-w-screen-md p-3 text-center italic ">
                      Generating questions... plugging in an AI assistant...
                      <Image
                        className={'opacity-70 dark:opacity-90 mx-auto'}
                        src={working}
                        width={140}
                        alt="My SVG"
                      />
                    </p>
                  </div>
                ) : (
                  (summary.key_qa ) && (
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
                  )
                )}
              </div>
            </div>
          )}
         
         
         
          {transcript.length > 0 && (
            <div
              className={`${
                isLoading ? 'hidden' : ''
              } w-full 3xl:w-5/6 max-w-[700px]  mt-10 md:mt-0 ${
                window.innerWidth > 1280 && window.innerWidth < 1420 ? '' : ''
              }`}
            >
              {transcript.length > 0 ? (
                <div
                  className={` mt-14 xl:mt-0 w-full bg-white dark:bg-mildDarkMode drop-shadow-md 3xl:min-w-[500px] mb-10 lg:mb-0  ${
                    window.innerWidth > 1280 && window.innerWidth < 1420
                      ? window.innerWidth > 1280 && window.innerWidth < 1340
                        ? 'ml-2'
                        : 'ml-6'
                      : 'xl:ml-10'
                  } rounded-lg px-5 py-2 border border-zinc-100 drop-shadow-sm dark:border-zinc-700`}
                >
                  <div className="text-sm font-medium text-center text-slate-700 dark:text-slate-200 dark:border-gray-700 ">
                    <ul className="flex flex-wrap xl:w-[450px] w-full mx-auto quicksand font-bold	">
                      <li
                        className={`w-1/3 md:w-4/12 ${
                          activeTab === 'tab3'
                            ? 'text-slate-700 dark:bg-mildDarkMode dark:text-slate-300 border-b-2  quicksand font-bold border-greenColor'
                            : 'quicksand font-bold border-b border-gray-200   '
                        }`}
                      >
                        <button
                          onClick={() => setActiveTab('tab3')}
                          className={
                            'text-l  p-4 pt-6 rounded-t-lg dark:text-slate-200 dark:border-greenColor'
                          }
                        >
                          Key Takeaways
                        </button>
                      </li>
                      <li
                        className={` w-1/3 md:w-4/12 ${
                          activeTab === 'tab1'
                            ? 'text-slate-700 dark:bg-mildDarkMode dark:text-slate-300 border-b-2 quicksand font-bold border-greenColor'
                            : 'quicksand font-bold border-b border-gray-200 '
                        }`}
                      >
                        <button
                          onClick={() => setActiveTab('tab1')}
                          className={
                            'text-l inline-block p-4 pt-6 rounded-t-lg dark:text-slate-200 dark:border-greenColor'
                          }
                        >
                          Summary
                        </button>
                      </li>
                      <li
                        className={` w-1/3 md:w-4/12 ${
                          activeTab === 'tab2'
                            ? 'text-slate-700 dark:bg-mildDarkMode dark:text-slate-300 border-b-2 quicksand font-bold border-greenColor'
                            : 'quicksand font-bold border-b border-gray-200  '
                        }`}
                      >
                        <button
                          onClick={() => setActiveTab('tab2')}
                          className={
                            'text-l inline-block p-4 pt-6 rounded-t-lg dark:text-slate-200 dark:border-greenColor'
                          }
                        >
                          Transcript
                        </button>
                      </li>
                      {/* 										<li className={` w-1/3 md:w-3/12 ${activeTab === "tab4" ? "text-blueLike dark:bg-darkMode dark:text-slate-300 border-b-2 font-semibold border-blue-600" : "hover:text-gray-600 hover:border-gray-300"}`} >
											<button onClick={() => setActiveTab("tab4")} className={`text-l inline-block p-4 rounded-t-lg  dark:text-slate-200 dark:border-greenColor`}>Ask questions</button>
										</li> */}
                    </ul>
                  </div>

                  <Selection.Root>
                    <Selection.Portal>
                      <Selection.Content>
                        <div className="flex flex-col bg-white dark:bg-darkMode border dark:border dark:border-zinc-600 rounded-lg drop-shadow-2xl p-4">
                          <Button
                            size="sm"
                            className="rounded-md justify-center h-[40px] bg-purple-500 mx-auto w-full mt-2 mb-2 text-white dark:text-slate-800 quicksand font-bold flex flex-row items-center text-center gap-2"
                            onClick={() => handleAskAlphy('sandbox')}
                          >
                            {' '}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#fde047"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#1e293b"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                              />
                            </svg>
                            <p>Use in Sandbox</p>
                          </Button>

                          <Button
                            size="sm"
                            className="rounded-md bg-green-200  h-[40px] mt-2 mb-2 text-slate-700 dark:text-slate-800 quicksand font-bold drop-shadow-none"
                            onClick={() => handleAskAlphy('default')}
                          >
                            {' '}
                            Ask Alphy to learn more about it
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-md bg-blue-300  h-[40px] mt-2 mb-2 text-slate-700 dark:text-slate-800 quicksand font-bold "
                            onClick={() => handleAskAlphy('ELI5')}
                          >
                            {' '}
                            Explain like I'm 5
                          </Button>
                        </div>

                        {/* <Selection.Arrow className="text-green-300 fill-green-300 mb-2" color="white" /> */}
                      </Selection.Content>
                    </Selection.Portal>

                    <Selection.Trigger>
                      <div
                        ref={contentRef}
                        className="main-content text-slate-700 dark:text-slate-200 "
                      >
                        <Tabs>
                          <Tab eventKey="transcript" title="">
                            {activeTab === 'tab3' &&
                              (data ? (
                                summary.key_takeaways ? (
                                  summary.key_takeaways.map((item, index) => {
                                    return (
                                      <p className="flex flex-row pb-2 summary-text ">
                                        {index + 1})
                                        <ReactMarkdown className="ml-1 ">
                                          {item}
                                        </ReactMarkdown>
                                      </p>
                                    )
                                  })
                                ) : summary === undefined ||
                                  summary.length === 0 ? (
                                  <p className="text-l text-slate-500 dark:text-slate-200 quicksand font-bold max-w-screen-md mx-auto p-3 text-center">
                                    This content doesn't have key takeaways.
                                    Check out the transcript!
                                  </p>
                                ) : (
                                  <p>
                                    <p className="text-l text-slate-500 dark:text-slate-200 quicksand font-normal max-w-screen-md mx-auto p-3 text-center">
                                      Processing key takeaways...
                                      <Image
                                        className={
                                          'opacity-70 dark:opacity-90 mx-auto'
                                        }
                                        src={working}
                                        width={80}
                                        alt="My SVG"
                                      />
                                    </p>
                                  </p>
                                )
                              ) : null)}

                            {activeTab === 'tab1' && (
                              <div
                                className={
                                  'content-area text-l font-normal  max-w-screen-lg overflow-auto h-full xl:max-h-[110vh]'
                                }
                              >
                                {/* <button className="flex ml-auto justify-end flex-row justify-end mb-2 mr-8 opacity-60 font-semibold text-black" onClick={handleDownload}><p className="pr-2">Download</p> {downloading ? <img src={Download}></img> : <img title="Download summary" src={DownloadStatic}></img>}</button> */}

                                {isLoading ? (
                                  <Loading />
                                ) : summaryArray.length === 0 ? (
                                  <p className="text-l text-slate-500 dark:text-slate-200 quicksand font-bold max-w-screen-md mx-auto p-3 text-center flex flex-col">
                                    {summary === undefined ||
                                    summary.length === 0
                                      ? "This content doesn't have a summary. Check out the transcript!"
                                      : 'Still waiting for the summary! Meanwhile, check the transcript.'}
                                    {summary === undefined ||
                                    summary.length === 0 ? null : (
                                      <Image
                                        className={
                                          'opacity-70 dark:opacity-90 mx-auto'
                                        }
                                        src={working}
                                        width={80}
                                        alt="My SVG"
                                      />
                                    )}
                                  </p>
                                ) : typeof summaryArray[0] === 'string' ? (
                                  summaryArray.map((item, index) => {
                                    return (
                                      <div
                                        className="mb-4 text-slate-700 dark:text-slate-200"
                                        key={index}
                                      >
                                        <div className="summary-text quicksand font-bold ">
                                          <ReactMarkdown>{item}</ReactMarkdown>
                                        </div>
                                      </div>
                                    )
                                  })
                                ) : (
                                  Object.values(summaryArray).map(
                                    (item, index) => (
                                      <div
                                        className="mb-4  text-slate-800  quicksand dark:text-slate-200"
                                        key={index}
                                      >
                                        <div className="text-l   dark:border-indigo-100 p-4">
                                          <h3
                                            className="text-xl mb-1 quicksand font-bold  underline text-slate-700 cursor-pointer dark:text-slate-200"
                                            onClick={() =>
                                              handleClickTimestamp(item.at)
                                            }
                                          >
                                            {`${item.title}`}
                                          </h3>
                                          <h5
                                            onClick={() =>
                                              handleClickTimestamp(item.at)
                                            }
                                            className="mb-2 cursor-pointer"
                                          >
                                            {(typeof item.at === 'string' && item.at.match(/^PT/))

                                            ? 
                                             
                                            `${
                                              Math.floor(convertTimeToSeconds(item.at) / 3600) < 10
                                                ? `0${Math.floor(
                                                    convertTimeToSeconds(item.at) / 3600
                                                  )}`
                                                : `${Math.floor(
                                                    convertTimeToSeconds(item.at) / 3600
                                                  )}`
                                              }
																								${':'}
																								${
                                                  Math.floor(convertTimeToSeconds(item.at) / 60) < 10
                                                    ? `0${Math.floor(
                                                        convertTimeToSeconds(item.at) / 60
                                                      )}`
                                                    : Math.floor(
                                                        convertTimeToSeconds(item.at) % 3600
                                                      ) < 600
                                                    ? `0${Math.floor(
                                                        convertTimeToSeconds(item.at) / 60 -
                                                          Math.floor(
                                                            convertTimeToSeconds(item.at) / 3600
                                                          ) *
                                                            60
                                                      )}`
                                                    : Math.floor(
                                                        convertTimeToSeconds(item.at) / 60 -
                                                          Math.floor(
                                                            convertTimeToSeconds(item.at) / 3600
                                                          ) *
                                                            60
                                                      )
                                                }
																								${':'}
																								${
                                                  Math.floor(convertTimeToSeconds(item.at) % 60) < 10
                                                    ? `0${Math.floor(
                                                        convertTimeToSeconds(item.at) % 60
                                                      )}`
                                                    : Math.floor(convertTimeToSeconds(item.at) % 60)
                                                }`
                                                
                                                :


                                            
                                            
                                            
                                            `${
                                              Math.floor(item.at / 3600) < 10
                                                ? `0${Math.floor(
                                                    item.at / 3600
                                                  )}`
                                                : `${Math.floor(
                                                    item.at / 3600
                                                  )}`
                                              }
																								${':'}
																								${
                                                  Math.floor(item.at / 60) < 10
                                                    ? `0${Math.floor(
                                                        item.at / 60
                                                      )}`
                                                    : Math.floor(
                                                        item.at % 3600
                                                      ) < 600
                                                    ? `0${Math.floor(
                                                        item.at / 60 -
                                                          Math.floor(
                                                            item.at / 3600
                                                          ) *
                                                            60
                                                      )}`
                                                    : Math.floor(
                                                        item.at / 60 -
                                                          Math.floor(
                                                            item.at / 3600
                                                          ) *
                                                            60
                                                      )
                                                }
																								${':'}
																								${
                                                  Math.floor(item.at % 60) < 10
                                                    ? `0${Math.floor(
                                                        item.at % 60
                                                      )}`
                                                    : Math.floor(item.at % 60)
                                                }`}
                                          </h5>

                                          {item.summary
                                            .split('\n')
                                            .map((item, index) => {
                                              return (
                                                <div
                                                  key={index}
                                                  className="quicksand font-normal text-slate-700 dark:text-slate-300 text-md mt-4"
                                                >
                                                  <ReactMarkdown className="react-markdown-edit quicksand">
                                                    {item}
                                                  </ReactMarkdown>
                                                </div>
                                              )
                                            })}
                                        </div>
                                      </div>
                                    )
                                  )
                                )}
                              </div>
                            )}
                            {activeTab === 'tab2' && (
                              <div className="content-area text-l font-normal max-w-screen-md overflow-auto h-full xl:max-h-[110vh] ">
                                {isLoading ? (
                                  <Loading />
                                ) : (
                                  transcript.map((item, index) => {
                                    if (
                                      index % 2 === 0 &&
                                      index < transcript.length
                                    ) {
                                      return window.innerWidth > 999 &&
                                        (data.source_type === 'yt' ||
                                          data.source_type === 'tw') ? (
                                        <div className="flex flex-row dark:text-slate-300">
                                          <a
                                            onClick={handleClickTimestamp}
                                            className={`${
                                              data.source_type === 'yt' ||
                                              data.source_type === 'tw'
                                                ? 'lg:cursor-pointer lg:pointer-events-auto'
                                                : ''
                                            } lg:pointer-events-auto lg:text-slate-900 lg:font-bold underline dark:text-slate-300`}
                                            key={index}
                                          >
                                            <br></br>

                                            <p className="text-md summary-text ">
                                              {item}{' '}
                                            </p>
                                          </a>

                                          <div
                                            className={`${
                                              index !== 0 ? 'hidden' : ''
                                            }   flex ml-auto justify-end flex-row justify-end `}
                                          >
                                            <Popover>
                                              <PopoverHandler>
                                                <button
                                                  id="popoverButtonDownload"
                                                  data-popover-target="popoverHover"
                                                  data-popover-trigger="hover"
                                                  className={`${
                                                    tier === 'free' ||
                                                    tier === undefined
                                                      ? 'cursor-default dark:invert'
                                                      : ''
                                                  } mr-8 opacity-80 pt-4`}
                                                >
                                                  <button
                                                    className={`${
                                                      tier === 'free' ||
                                                      tier === undefined
                                                        ? 'bg-indigo-200 text-white pointer-events-none'
                                                        : ''
                                                    } text-sm  quicksand font-bold bg-indigo-300 dark:bg-indigo-400 w-[180px] drop-shadow-sm rounded-lg p-2 text-white`}
                                                  >
                                                    {downloading ? (
                                                      <Spinner
                                                        className="flex justify-center mx-auto opacity-70 pointer-events-none"
                                                        color="gray"
                                                      />
                                                    ) : (
                                                      'Download Transcript'
                                                    )}
                                                  </button>
                                                </button>
                                              </PopoverHandler>

                                              <div
                                                data-popover
                                                id="popoverHover"
                                                role="tooltip"
                                                className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white quicksand font-bold  rounded-lg shadow-sm opacity-0 dark:text-slate-200 dark:border-gray-600 dark:bg-mildDarkMode "
                                              >
                                                <ThemeProvider
                                                  value={themePopover}
                                                >
                                                  <PopoverContent background="indigo">
                                                    {tier !== undefined &&
                                                    tier != 'free' &&
                                                    basicDataLoaded === true ? (
                                                      <div className="">
                                                        <div
                                                          onClick={() =>
                                                            handleDownload(1)
                                                          }
                                                          className="px-3 cursor-pointer py-2 hover:bg-zinc-100  quicksand font-bold dark:hover:bg-zinc-200 dark:hover:text-slate-500"
                                                        >
                                                          <p className="quicksand font-bold">
                                                            Download as Plain
                                                            Subtitles (.srt)
                                                          </p>
                                                        </div>

                                                        <div
                                                          onClick={() =>
                                                            handleDownload(2)
                                                          }
                                                          className="px-3 cursor-pointer py-2 hover:bg-zinc-100  quicksand font-bold dark:hover:bg-zinc-200 dark:hover:text-slate-500"
                                                        >
                                                          <p className="quicksand font-bold">
                                                            Download Formatted
                                                            Transcript (.txt)
                                                          </p>
                                                        </div>
                                                      </div>
                                                    ) : (
                                                      <div className="px-3 cursor-pointer py-2 pointer-events-none ">
                                                        <p className="quicksand font-bold">
                                                          Upgrade your plan to
                                                          download the
                                                          transcript
                                                        </p>
                                                      </div>
                                                    )}
                                                  </PopoverContent>
                                                </ThemeProvider>
                                              </div>
                                            </Popover>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex flex-row">
                                          <a
                                            target="_blank"
                                            href={
                                              data.source_type !== 'up'
                                                ? (data.source_type === 'yt' &&
                                                    `https://youtu.be/${
                                                      data.source_id
                                                    }?t=${Math.floor(
                                                      parseInt(
                                                        item.split(':')[0] *
                                                          3600
                                                      ) +
                                                        parseInt(
                                                          item.split(':')[1] *
                                                            60
                                                        ) +
                                                        parseInt(
                                                          item.split(':')[2]
                                                        )
                                                    )}`) ||
                                                  (data.source_type === 'tw' &&
                                                    `https://www.twitch.tv/videos/${
                                                      data.source_id
                                                    }?t=${
                                                      Math.floor(
                                                        parseInt(
                                                          item.split(':')[0]
                                                        )
                                                      ) +
                                                      'h' +
                                                      Math.floor(
                                                        parseInt(
                                                          item.split(':')[1]
                                                        )
                                                      ) +
                                                      'm' +
                                                      Math.floor(
                                                        parseInt(
                                                          item.split(':')[2]
                                                        )
                                                      ) +
                                                      's'
                                                    }`) ||
                                                  (data.source_type === 'sp' &&
                                                    `https://twitter.com/i/spaces/${data.source_id}`)
                                                : null
                                            }
                                            className={`summary-text  ${
                                              data.source_type === 'yt' ||
                                              data.source_type === 'tw'
                                                ? 'lg:cursor-pointer lg:pointer-events-auto'
                                                : ''
                                            }  lg:pointer-events-auto lg:text-slate-900 dark:text-slate-300 font-bold underline`}
                                            key={index}
                                            rel="noreferrer"
                                          >
                                            <br></br>
                                            {item}{' '}
                                          </a>

                                          <div
                                            className={`${
                                              index !== 0 ? 'hidden' : ''
                                            }   flex ml-auto justify-end flex-row justify-end`}
                                          >
                                            <Popover>
                                              <PopoverHandler>
                                                <button
                                                  id="popoverButtonDownload"
                                                  data-popover-target="popoverHover"
                                                  data-popover-trigger="hover"
                                                  className={`${
                                                    tier === 'free' ||
                                                    tier === undefined
                                                      ? 'cursor-default dark:invert'
                                                      : ''
                                                  } mr-8 opacity-80 pt-4`}
                                                >
                                                  <button
                                                    className={`${
                                                      tier === 'free' ||
                                                      tier === undefined
                                                        ? 'bg-indigo-200 text-white pointer-events-none'
                                                        : ''
                                                    } text-sm bg-indigo-300 dark:bg-indigo-400 w-[180px] drop-shadow-sm rounded-lg p-2 text-white quicksand font-bold`}
                                                  >
                                                    {downloading ? (
                                                      <Spinner
                                                        className="flex justify-center mx-auto opacity-70"
                                                        color="gray"
                                                      />
                                                    ) : (
                                                      'Download Transcript'
                                                    )}
                                                  </button>
                                                </button>
                                              </PopoverHandler>

                                              <div
                                                data-popover
                                                id="popoverHover"
                                                role="tooltip"
                                                className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-slate-200 dark:border-gray-600 dark:bg-mildDarkMode "
                                              >
                                                <ThemeProvider
                                                  value={themePopover}
                                                >
                                                  <PopoverContent background="indigo">
                                                    {tier !== undefined &&
                                                    tier != 'free' &&
                                                    basicDataLoaded === true ? (
                                                      <div>
                                                        <div
                                                          onClick={() =>
                                                            handleDownload(1)
                                                          }
                                                          className="px-3 cursor-pointer py-2 hover:bg-zinc-100 quicksand font-bold dark:hover:bg-zinc-200 dark:hover:text-slate-500"
                                                        >
                                                          <p className=" quicksand font-bold">
                                                            Download as Plain
                                                            Subtitles (.srt)
                                                          </p>
                                                        </div>

                                                        <div
                                                          onClick={() =>
                                                            handleDownload(2)
                                                          }
                                                          className="px-3 cursor-pointer py-2 hover:bg-zinc-100 quicksand font-bold  dark:hover:bg-zinc-200 dark:hover:text-slate-500"
                                                        >
                                                          <p className="quicksand font-bold">
                                                            Download Formatted
                                                            Transcript (.txt)
                                                          </p>
                                                        </div>
                                                      </div>
                                                    ) : (
                                                      <div className="px-3 cursor-pointer py-2 pointer-events-none quicksand font-bold ">
                                                        <p className="">
                                                          Upgrade your plan to
                                                          download the
                                                          transcript
                                                        </p>
                                                      </div>
                                                    )}
                                                  </PopoverContent>
                                                </ThemeProvider>
                                              </div>
                                            </Popover>
                                          </div>
                                        </div>
                                      )
                                    } else if (
                                      index % 2 === 1 &&
                                      index < transcript.length
                                    ) {
                                      return (
                                        <div
                                          className="summary-text "
                                          key={index}
                                        >
                                          <br></br>

                                          {item.replace(/\\h/g, ' ')}
                                        </div>
                                      )
                                    }
                                  })
                                )}
                              </div>
                            )}
                          </Tab>
                        </Tabs>
                      </div>
                    </Selection.Trigger>
                  </Selection.Root>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}{' '}
        </div>
      ) : (
        <div className="flex flex-col mb-20 mt-20 ">
          {errorMessage === true ||
          languagesWanted.includes(language) === true ||
          languages.includes(language) ||
          (summary !== undefined &&
            summary.summary !== undefined &&
            summary.summary !== null &&
            summary.summary.length > 0) ||
          (contentSummaries !== undefined &&
            contentSummaries.length > 1 &&
            (contentSummaries[0].lang === language ||
              contentSummaries[1].lang === language)) ||
          language === 'en' ? null : (
            <p className="text-xl text-slate-500 dark:text-slate-200 quicksand font-normal max-w-screen-md mx-auto p-3 text-center">
              Seems like Alphy hasn't processed the content in{' '}
              {language_codes[language]} yet.{' '}
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
              {/* 	<div className="ml-4 mt-12">
						<button type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Request Summary</button>
					</div> */}
            </p>
          )}
        </div>
      )
      )
        }
    </div>
  )
}
