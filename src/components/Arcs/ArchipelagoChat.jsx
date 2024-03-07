import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Button, Spinner } from '@material-tailwind/react'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import {useRouter} from 'next/router'
import SourceCard from './SourceCard'
import Dialog from '@mui/material/Dialog'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import EditIcon from '@mui/icons-material/Edit'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import FeedItem from '../FeedTabs/FeedItem'
import CloseIcon from '@mui/icons-material/Close'
import QuizIcon from '@mui/icons-material/Quiz'
import QaWsManager from '../Content/Read/QA/QaWsManager'
import ReactMarkdown from 'react-markdown'
import LoopIcon from '@mui/icons-material/Loop'
import RefreshIcon from '@mui/icons-material/Refresh'
import { API_HOST, API_SSL } from '../../constants'
import Image from 'next/image'

export default function ArchipelagoChat({
  data,
  isVisible,
  tier,
  handleVisibility,
  currentUser,
  dataArchipelago,
  setDataArchipelago,
  collapsed,
}) {
  const [inputValue, setInputValue] = useState('')
  const [isLoadingInside, setIsLoadingInside] = useState(false)
  const [isCleared, setIsCleared] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [answerData, setAnswerData] = useState({ answer: '', sources: [] })
  const [selectedSourceCard, setSelectedSourceCard] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [fullWidth, setFullWidth] = useState(true)
  const [showTrackDetails, setShowTrackDetails] = useState(false)
  const [elementCalled, setElementCalled] = useState(false)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [isForwardArrowVisible, setIsForwardArrowVisible] = useState(true)
  const [isBackwardArrowVisible, setIsBackwardArrowVisible] = useState(false)
  const [tracks, setTracks] = useState([])
  const [i, setI] = useState(0)
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const ref = useRef()
  const title = data.name
  const description = data.description
  const [triggerWs, setTriggerWs] = useState(false)

  const carouselRef = useRef(null)

  let displayText = ''
  if (
    tracks.length === 0 &&
    data.tracks !== undefined &&
    data.tracks.length !== 0
  ) {
    setTracks(data.tracks)
  }

  const selectedItems = []
  if (data !== undefined && data.questions !== undefined) {
    while (
      (data.questions.length !== 0 &&
        data.questions.length >= 5 &&
        selectedItems.length < 5) ||
      (data.questions.length < 5 &&
        selectedItems.length < data.questions.length)
    ) {
      const randomIndex = Math.floor(Math.random() * data.questions.length)
      const randomItem = data.questions[randomIndex]
      if (!selectedItems.includes(randomItem)) {
        selectedItems.push(randomItem)
      }
    }
    if (selectedItems.length <= 5 && i == 0) {
      setSelectedQuestions(selectedItems)
      setI(1)
    }
  }

  const archipelagoUserID = data.user_id
  const archipelagoImageLink = `${data.thumbnail_url ? data.thumbnail_url : ''}`
  const archipelagoID = data.uid
  const buttonRef = useRef(null)

  if (localStorage.getItem('archipelagoEdited') === 'true') {
    localStorage.setItem('archipelagoEdited', 'false')
    window.location.reload()
  }
  //remove cursor for trendyol carousel gaps
  const elements = document.querySelectorAll(
    '.styles-module_item-container__a8zaY'
  )
  if (elements && elementCalled === false) {
    elements.forEach(element => {
      element.classList.add('cursor-default')
    })
    setElementCalled(true)
  }

  const handleSubmit = () => {
    setIsCleared(false)
    setErrorMessage(false)

    if (
      currentUser === null &&
      selectedQuestions.includes(inputValue) === false
    ) {
      setErrorMessage(true)
      setIsLoadingInside(false)
      return
    } else {
      if (inputValue.length === 0) {
        return
      } else {
        try {
          setAnswerData({ answer: '', sources: [] })
          setTriggerWs(true)
          const idToken = currentUser ? currentUser.accessToken : '123'
          setIsLoadingInside(true)
          setErrorMessage(false)

          /*  initializeQaWsManager(
               {question:inputValue, 
               setAnswerData: setAnswerData,
               arcId:data.uid,
               triggerWs:triggerWs,
               setTriggerWs:setTriggerWs,
               setIsLoadingInside: setIsLoadingInside,
               isCleared:isCleared,
               idToken:currentUser!==null ? currentUser.accessToken : null
           })
        */

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
              },
            },
            question: inputValue,
            arcId: data.uid,
            idToken: idToken,
          })

          setTimeout(() => {
            wsManager.close()
          }, 20000)

          setTimeout(() => {
            const elements = document.querySelectorAll(
              '.styles-module_item-container__a8zaY'
            )
            if (elements) {
              elements.forEach(element => {
                element.classList.add('cursor-default')
              })
            }
          }, 500)
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  const handleClear = () => {
    setAnswerData({ answer: '', sources: [] })
    setIsCleared(true)
    setTriggerWs(false)
    setIsLoadingInside(false)
    setInputValue('')
    setErrorMessage(false)
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  const handleEdit = () => {
    router.push(`/arc/editArc/${data.uid}`)
  }

  const handleAskPremadeQuestion = event => {
    if (event.target) {
      setInputValue(event.target.innerText)
    }
    setIsLoadingInside(true)
    setTimeout(() => {
      buttonRef.current.click()
    }, 300)
  }

  if (description !== undefined) {
    displayText = expanded ? description : `${description.slice(0, 50)}...`
  }
  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current
        const isScrollEnd =
          container.scrollLeft + container.clientWidth === container.scrollWidth
        setIsForwardArrowVisible(!isScrollEnd)
        setIsBackwardArrowVisible(container.scrollLeft > 0)
      }
    }

    // Attach scroll event listener
    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll)
    }

    // Clean up the event listener on component unmount
    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scrollForward = () => {
    if (carouselRef.current) {
      const container = carouselRef.current

      const scrollAmount = window.innerWidth < 640 ? 260 : 380

      carouselRef.current.scrollLeft += scrollAmount
    }
  }

  const scrollBackward = () => {
    if (carouselRef.current) {
      const container = carouselRef.current

      const scrollAmount = 300
      carouselRef.current.scrollLeft -= scrollAmount
    }
  }

  const label = {
    inputProps: { 'aria-label': `${true ? 'Visible' : 'Private'}` },
  }
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === 'dark' ? '#177ddc' : '#bbf7d0',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#71717a',
      boxSizing: 'border-box',
    },
  }))

  
  const formatAnswer = (answer, answerData) => {
    const cleanedText = answer.replace(/\r?\n|\r/g, ' ')

    const regexPattern = /\]\./g
    const replaceEverySecondOccurrence = (text, pattern, replacement) => {
      let count = 0
      return text.replace(new RegExp(pattern, 'g'), match => {
        count++
        return count % 2 === 0 ? match.replace(pattern, replacement) : match
      })
    }

    const formattedRawAnswer = replaceEverySecondOccurrence(
      cleanedText,
      regexPattern,
      '].\n\n'
    )
    const parts = formattedRawAnswer.split(/\[(\d+)\]/g)

    return parts.map((part, index) => {
      if (answerData.sources.hasOwnProperty(part - 1)) {
        return (
          <div className="relative inline-flex  group ">
            <span
              key={index}
              className="underline text-xs text-green-300 cursor-pointer"
              onClick={() => handleShowSingleSource(part)}
            >
              [{part}]
            </span>
          </div>
        )
      }
      return part
    })
  }

  const handleShowSingleSource = sourceNumber => {
    setSelectedSourceCard(answerData.sources[sourceNumber - 1])

    setTimeout(() => {
      setOpenDialog(true)
    }, 300)
  }

  return (
    <div
      className={`${
        collapsed
          ? 'lg:w-[1000px] xl:max-w-[1000px]'
          : 'lg:w-[600px] xl:w-[900px] 2xl:w-[1000px]'
      } grow mx-auto pt-10 pb-20 `}
    >
      <div className="grid grid-cols-5 sm:grid-cols-4 mt-20 w-full sm:ml-10 px-3 ">
        <div className="col-span-4 sm:col-span-3 flex flex-row">
          {archipelagoImageLink.length > 0 && (
            <img
              className={`${'hidden'} sm:block w-[200px] sm:mr-4`}
              src={archipelagoImageLink}
              alt = "archipelago image"
              width={200}
              height={200}
            />
          )}
          <div className="ml-2">
            <p className="text-xl text-zinc-700 dark:text-zinc-300 font-averta-semibold">
              {title}
            </p>
            {
              <p
                onClick={toggleExpand}
                className={`text-md text-zinc-400 dark:text-zinc-500 font-averta-semibold ${
                  !expanded && 'hover:opacity-80'
                } ${'sm:hidden'} cursor-pointer`}
              >
                {displayText}
              </p>
            }
            <p
              className={`text-md text-zinc-400 dark:text-zinc-500 font-averta-semibold ${'hidden sm:block'} `}
            >
              {description}
            </p>
            <div className="flex">
              <p
                className="cursor-pointer underline text-zinc-600 dark:text-zinc-300 font-averta-semibold"
                onClick={() => setShowTrackDetails(true)}
              >
                More Details...
              </p>
            </div>

            <Dialog
              fullWidth={'true'}
              maxWidth={'md'}
              open={showTrackDetails}
              onClose={() => setShowTrackDetails(false)}
            >
              <div className="pt-10 pb-20 bg-white dark:bg-mildDarkMode text-sm">
                <CloseIcon
                  className="right-0 absolute mr-4 mt-2 cursor-pointer dark:text-zinc-300"
                  onClick={() => setShowTrackDetails(false)}
                ></CloseIcon>
                <div className="mb-10 px-4 sm:px-10">
                  <p className="text-zinc-700 dark:text-zinc-300 text-lg font-averta-semibold">
                    {title}
                  </p>
                  {
                    <p
                      onClick={toggleExpand}
                      className={`text-md text-zinc-400 dark:text-zinc-500 ${
                        !expanded && 'hover:opacity-80'
                      } ${'sm:hidden'} cursor-pointer`}
                    >
                      {displayText}
                    </p>
                  }
                  <p
                    className={`text-md text-zinc-400 dark:text-zinc-500 ${'hidden sm:block'} lg:max-w-[700px] font-averta-semibold`}
                  >
                    {description}
                  </p>

                  <div className="flex flex-row mt-5">
                    <p className="text-zinc-500 dark:text-zinc-500 text-md font-averta-semibold ">
                      {dataArchipelago !== null && dataArchipelago.length} items
                    </p>
                    <div className="ml-5">
                      {currentUser !== null &&
                        currentUser.uid === archipelagoUserID && (
                          <div className="flex flex-row w-full space-between flex-grow">
                            <div className="flex-grow flex">
                              <p
                                onClick={handleEdit}
                                className="cursor-pointer text-zinc-600 dark:text-zinc-300 underline font-averta-semibold"
                              >
                                Edit
                              </p>
                              <EditIcon
                                onClick={handleEdit}
                                fontSize="small"
                                className="cursor-pointer text-zinc-600 dark:text-zinc-300 pl-1 pt-1"
                                title={'Edit archipelago'}
                              />
                            </div>

                            <div className="relative flex flex-col ml-20">
                              <div className="relative flex flex-row  group  cursor-default">
                                <div className=" flex flex-row text-zinc-600 dark:text-zinc-300 items-center">
                                  <AntSwitch
                                    onChange={handleVisibility}
                                    defaultChecked={isVisible}
                                    disabled={tier !== 'premium'}
                                  />
                                  <span className="text-sm mx-2 font-averta-semibold">
                                    {localStorage.getItem('isVisible') ===
                                    'true'
                                      ? 'Public'
                                      : 'Private'}
                                  </span>
                                </div>

                                {tier === 'premium' && (
                                  <span className="absolute font-averta-semibold opacity-0 min-w-[200px] group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 md:top-full z-50 mb-2 ml-4">
                                    {isVisible
                                      ? 'Toggle the visibility of this arc. Switching to private makes it accessible only by you.'
                                      : 'Toggle the visibility of this arc. Switching to public makes it accessible by all.'}
                                  </span>
                                )}
                                {tier !== 'premium' && (
                                  <span className="absolute font-averta-semibold opacity-0 min-w-[200px]  group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 md:top-full z-50 mb-2 ml-4">
                                    This arc is private. Switch to the Premium
                                    plan to make it publicly accessible.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-10 mt-10 dark:opacity-40"></div>
                </div>
                <div className="w-full px-3 sm:px-8 ">
                  <p className="text-zinc-700 dark:text-zinc-300 text-lg font-averta-semibold">
                    Item List
                  </p>
                  <div
                    className={`
							grid grid-cols-1 mt-10
							${
                dataArchipelago.length === 1
                  ? 'lg:grid-cols-1 xl:grid-cols-1 lg:w-1/2'
                  : 'lg:grid-cols-2 xl:grid-cols-2'
              }
							gap-4 
							`}
                  >
                    {dataArchipelago.length > 0
                      ? dataArchipelago.map((item, index) => (
                          <div className="hover:bg-zinc-100 dark:hover:bg-zinc-700 font-averta-semibold">
                            <FeedItem
                              index={index}
                              item={item}
                              mainFeedInput={inputValue}
                              fromArchipelago={'archipelago'}
                              dataArchipelago={dataArchipelago}
                              setDataArchipelago={setDataArchipelago}
                              forDetail={true}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="sm:ml-10 px-3 ">
        <div>
          <div className="flex items-center pr-1 mt-6 xl:mt-8 max-w-[900px] ">
            <div className="flex flex-row drop-shadow-md w-full flex-grow relative dark:bg-zinc-800  border border-black/10   dark:text-white rounded-xl dark:rounded-xl gizmo:rounded-2xl shadow-xs dark:shadow-xs  bg-white">
              <input
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                title={inputValue}
                type="text"
                id="questionAnswering"
                placeholder="Type your question here..."
                className="m-0 w-full  font-averta-semibold text-zinc-700 dark:text-zinc-300 dark:placeholder:text-zinc-400 text-sm resize-none border-0 bg-transparent dark:bg-transparent py-[10px] pr-16 focus:ring-0 focus-visible:ring-0 md:py-4 md:pr-20 gizmo:md:py-3.5 pl-4 md:pl-[26px]"
              />
              {inputValue.length > 0 ? (
                <div
                  onClick={handleClear}
                  className="cursor-pointer absolute inset-y-0 right-0 flex items-center mr-10 md:mr-14 dark:text-zinc-500 text-zinc-400 "
                >
                  <svg
                    width="20"
                    onClick={handleClear}
                    className="cursor-pointer"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              ) : null}

              <button
                ref={buttonRef}
                onClick={handleSubmit}
                className={`absolute  rounded-md absolute p-1 rounded-md  gizmo:md:bottom-2.5 md:p-2 md:right-3 bottom-2 right-2 ${
                  isLoadingInside
                    ? 'pointer-events-none cursor-default  md:bottom-2 bg-transparent'
                    : 'bg-green-200'
                }`}
              >
                {isLoadingInside ? (
                  <Spinner
                    fontSize="small"
                    className="opacity-40 p-1 cursor-default z-50"
                    color="black"
                  />
                ) : (
                  <svg
                    className="w-4 h-4 text-zinc-600 dark:text-zinc-700"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className="mt-4 text-zinc-500 dark:text-zinc-400">
            <p className="font-averta-semibold">
              Please{' '}
              <a
                href="/u/login"
                className="underline text-greenColor dark:text-green-200 font-averta-semibold"
              >
                sign in
              </a>{' '}
              to start asking questions.
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 animate-bounce-slow px-3 ">
        {answerData.answer == '' && isLoadingInside === false && (
          <div className="sm:px-5 mt-10 ">
            {
              <div
                className={`${
                  answerData.answer.length > 0 &&
                  selectedQuestions.length < 0 &&
                  'hidden'
                } mt-20 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40`}
              ></div>
            }
            <p className="flex flex-row mb-5 sm:ml-6">
              <QuizIcon className="text-greenColor dark:text-green-200 mr-2" />
              <span className="text-zinc-600 dark:text-zinc-200 font-averta-semibold">
                Suggested Questions
              </span>

              <RefreshIcon
                title="Refresh questions."
                fontSize="small"
                className="ml-2 text-zinc-500 dark:text-zinc-300 cursor-pointer"
                onClick={() => {
                  setSelectedQuestions('')
                  setI(0)
                }}
              />
            </p>

            {selectedQuestions.length > 0 &&
              selectedQuestions.map((question, index) =>
                index % 2 == 0 ? (
                  <button
                    className="bg-stone-50 border dark:bg-darkMode hover:scale-105 duration-300 transition ease-in-out text-zinc-500 dark:text-zinc-300 rounded-full px-5 py-1 text-md mr-4 mt-4 dark:border-zinc-700 drop-shadow-sm font-averta-semibold"
                    onClick={handleAskPremadeQuestion}
                  >
                    {question}
                  </button>
                ) : (
                  <button
                    className="bg-white border dark:bg-mildDarkMode text-zinc-500 dark:text-zinc-300 hover:scale-105 duration-300 transition ease-in-out rounded-full px-5 py-1 text-md mr-4 mt-4 dark:border-zinc-700 drop-shadow-sm font-averta-semibold"
                    onClick={handleAskPremadeQuestion}
                  >
                    {question}
                  </button>
                )
              )}
          </div>
        )}

        <div
          id="answer-area"
          className="answer-area text-l max-w-[900px] ml-2 sm:ml-10 mt-10 "
        >
          {isLoadingInside || answerData.answer !== '' ? (
            <p className="text-greenColor dark:text-green-200 text-l font-averta-semibold">
              <QuestionAnswerIcon className="text-greenColor dark:text-green-200 mr-1 " />
              Answer
              <LoopIcon
                className="ml-2 cursor-pointer text-zinc-500 dark:text-zinc-300"
                fontSize="small"
                onClick={() => {
                  setAnswerData({ answer: '', sources: [] })
                  setInputValue('')
                }}
              />
            </p>
          ) : null}
          {isLoadingInside && (
            <div className="opacity-60 dark:opacity-100">
              <div className="hidden dark:block opacity-60 w-full pr-3 lg:px-0 ">
                <Box>
                  <Skeleton sx={{ bgcolor: '#71717a' }} animation="wave" />
                  <Skeleton sx={{ bgcolor: '#71717a' }} animation="wave" />
                  <Skeleton sx={{ bgcolor: '#71717a' }} animation="wave" />
                  <Skeleton
                    sx={{ bgcolor: '#71717a' }}
                    animation="wave"
                    height={80}
                  />
                </Box>
              </div>
              <div className="dark:hidden w-full pr-3 lg:px-0 lg:w-[900px]">
                <Box fullWidth>
                  <Skeleton sx={{ bgcolor: 'dark:#fff' }} animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" height={80} />
                </Box>
              </div>
            </div>
          )}

          {answerData.answer !== '' && (
            <div className="text-zinc-700 dark:text-zinc-300">
              {/* <p dangerouslySetInnerHTML={{ __html: answerData.answer.replace(/\n/g, '<br/>')
                                 }}/>  */}

              <div className="whitespace-pre-line font-averta-regular">
                {formatAnswer(answerData.answer, answerData)}
              </div>

              <div className="dark:text-zinc-300 text-zinc-600 opacity-60 text-center items-center mt-20 font-averta-semibold">
                Always check the passages before quoting. AI may not be 100%
                accurate.
              </div>
            </div>
          )}
        </div>
        {
          <div
            className={`${
              answerData.answer.length === 0 && 'hidden'
            } mt-10 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40`}
          ></div>
        }

        <p
          className={`text-greenColor dark:text-green-200  ml-10 mt-4 mb-4 font-averta-semibold ${
            answerData.answer.length === 0 && 'hidden'
          }`}
        >
          <TextSnippetIcon /> Passages
        </p>

        {/*     {(answerData.sources!==undefined && isLoadingInside===false) && 
                                (
                                   window.innerWidth>900 ?
                                   <Carousel 
                                   infinite={false}
                                   leftArrow={
                                        <div className="mt-40 pr-4 w-8">
                                        <ArrowBackIosNewIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                        </div>} 
                                   
                                   rightArrow={
                                                <div className="mt-40 pl-2 w-8">
                                            <ArrowForwardIosIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                            </div>} 
                                   className="cursor-default" show={2.5} slide={1} transition={0.5}>
                            {answerData.sources.map((source,index) => <SourceCard forDialog={false} source={source} tracks={tracks} setSelectedSourceCard={setSelectedSourceCard} selectedSourceCard={selectedSourceCard} openDialog={openDialog} setOpenDialog={setOpenDialog}/>)}
                                    
                                   </Carousel>
                                   :
                                   <Carousel 
                                   infinite={false}
                                   
                                   leftArrow={
                                    <div className="mt-40 pr-4 w-6 sm:w-8">
                                        <ArrowBackIosNewIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                        </div>} 
                                         rightArrow={<div className="mt-40 pl-2 w-6 sm:w-8">
                                         <ArrowForwardIosIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                         </div>} className="cursor-default" show={window.innerWidth>420 ? 1.6 : 1.2} slide={1} transition={0.5}>
                                   {answerData.sources.map((source) => <SourceCard forDialog={false} source={source} tracks={tracks} setSelectedSourceCard={setSelectedSourceCard} selectedSourceCard={selectedSourceCard} openDialog={openDialog} setOpenDialog={setOpenDialog}/>)} 
                                          </Carousel>
                                
                                )
                            } */}
        <div className="relative ">
          {answerData.sources !== undefined &&
            answerData.sources.length !== 0 &&
            isLoadingInside === false && (
              <div className="flex flex-col lg:flex-row ">
                <button
                  onClick={scrollBackward}
                  type="button"
                  className={`left-arrow hidden md:block justify-center my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
                    isBackwardArrowVisible ? '' : 'hidden'
                  }`}
                >
                  <div className="rounded-full  p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                    <ArrowBackIosNewIcon className="cursor-pointer text-zinc-600 p-1 " />
                  </div>
                </button>

                <div
                  className={`   flex  flex-row gap-4 overflow-x-scroll scroll-smooth carousel-area `}
                  ref={carouselRef}
                >
                  {answerData.sources.map(source => (
                    <SourceCard
                      forDialog={false}
                      source={source}
                      tracks={tracks}
                      setSelectedSourceCard={setSelectedSourceCard}
                      selectedSourceCard={selectedSourceCard}
                      openDialog={openDialog}
                      setOpenDialog={setOpenDialog}
                    />
                  ))}
                </div>

                <button
                  onClick={scrollForward}
                  type="button"
                  className={` right-arrow hidden md:block my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
                    isForwardArrowVisible ? 'block' : 'hidden'
                  }`}
                >
                  <div className="rounded-full p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                    <ArrowForwardIosIcon className="cursor-pointer text-zinc-600 p-1 " />
                  </div>
                </button>

                <div className="flex flex-row mx-auto mt-6 md:hidden">
                  <button
                    onClick={scrollBackward}
                    type="button"
                    className={`left-arrow justify-center my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none `}
                  >
                    <div className="rounded-full  p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                      <ArrowBackIosNewIcon
                        className={`${
                          isBackwardArrowVisible
                            ? 'cursor-pointer text-zinc-500  '
                            : ' text-zinc-300 dark:text-zinc-700cursor-default'
                        } p-1 `}
                      />
                    </div>
                  </button>
                  <button
                    onClick={scrollForward}
                    type="button"
                    className={`  right-arrow my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none`}
                  >
                    <div className="rounded-full p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                      <ArrowForwardIosIcon
                        className={`${
                          isForwardArrowVisible
                            ? 'cursor-pointer text-zinc-500'
                            : '  text-zinc-300 dark:text-zinc-700 cursor-default'
                        } p-1 `}
                      />
                    </div>
                  </button>
                </div>
              </div>
            )}
        </div>

        <Dialog
          maxWidth={'sm'}
          fullWidth={fullWidth}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          {answerData.sources !== undefined &&
            answerData.sources.length !== 0 &&
            answerData.sources.map(source => (
              <div ref={ref}>
                {source === selectedSourceCard && (
                  <SourceCard
                    forDialog={true}
                    setFullWidth={setFullWidth}
                    source={source}
                    tracks={tracks}
                    setSelectedSourceCard={setSelectedSourceCard}
                    selectedSourceCard={selectedSourceCard}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                  />
                )}
              </div>
            ))}
        </Dialog>
      </div>
    </div>
  )
}
