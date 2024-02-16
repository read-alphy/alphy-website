import React from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AddIcon from '@mui/icons-material/Add'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import TwitchIcon from '../../../img/twitch.png'
import TwitterLogo from '../../../img/Twitter Logo Blue.svg'
import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from '@material-tailwind/react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import MemoryIcon from '@mui/icons-material/Memory'

export default function HeaderArea({
  data,
  title,
  tier,
  isVisible,
  handleVisibility,
  handleBookmark,
  isBookmarked,
  handleReportIssue,
  showReportIssue,
  setShowReportIssue,
  handleAddToArchipelago,
  userArchipelagoNames,
  currentUser,
  transcript,
  summary,
  language,
  handleLanguageChange,
  languages,
  mainPopoverOpen,
  setMainPopoverOpen,
  mainPopoverOpenSmall,
  setMainPopoverOpenSmall,
  modelName,
  reorderedLanguageCodes,
  isSandbox,
  setIsSandbox,
}) {
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        backgroundColor:
          localStorage.getItem('theme') === 'dark' ? '#1E1E1E' : '#fff',
        color: localStorage.getItem('theme') === 'dark' ? '#e4e4e7' : '#3f3f46',
        outline: 'none',
      },
    },
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

  return (
    <div
      className={`grid max-w-[800px] lg:w-[800px] grid-cols-3 lg:grid-cols-2 flex ${
        isSandbox && ''
      }`}
    >
      <div
        className={`col-span-2 pl-2 lg:col-span-3 xl:mt-0 ${
          transcript.length > 0 &&
          summary != undefined &&
          language == summary.lang
            ? 'xl:col-span-2'
            : 'xl:col-span-3'
        }`}
      >
        <div id="processing-tier" className={`${isSandbox && ''}`}>
          {modelName === 'HIGH' && (
            <div className="relative flex flex-col">
              <div className="relative flex flex-row group cursor-default">
                <WorkspacePremiumIcon className="text-indigo-400" />
                <p className="text-indigo-400 ml-2 font-averta-semibold">
                  Premium Processing
                </p>
                <span className="absolute opacity-0 font-averta-semibold group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-zinc-300 text-sm rounded py-1 px-2 left-0 md:bottom-full z-50 mb-2 ml-4">
                  This content was processed with advanced AI models accessible
                  to Premium.
                </span>
              </div>
            </div>
          )}

          {modelName === 'MID' && (
            <div className="relative flex flex-col">
              <div className="relative flex flex-row group cursor-default">
                <MemoryIcon className="text-gray-500" />
                <p className="text-gray-500 ml-2 font-averta-semibold">
                  Standard Processing
                </p>
                <span className="absolute opacity-0 font-averta-semibold group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 md:bottom-full z-50 mb-2 ml-4">
                  This content was processed with standard AI models.
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-row ml-1">
          <h1 className="col-span-2 mt-2 text-xl  font-averta-semibold lg:max-w-[40vw] text-left lg:col-span-3  text-blueLike dark:bg-darkMode dark:text-zinc-300 font-bold">
            {data.source_type === 'up'
              ? title.substring(0, title.lastIndexOf('.'))
              : title}
          </h1>

          <div className="flex flex-row justify-end mx-auto ">
            <Popover
              open={mainPopoverOpen}
              onBlur={() => setMainPopoverOpen(false)}
            >
              <PopoverHandler
                onClick={() => setMainPopoverOpen(!mainPopoverOpen)}
              >
                <div className="hidden lg:flex mt-8">
                  <svg
                    className="cursor-pointer text-zinc-700 dark:text-zinc-300"
                    width={30}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </PopoverHandler>
              <PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
                <div className="">
                  <div className="">
                    {data.source_type === 'yt' && (
                      <a
                        target="_blank"
                        className="flex flex-row  xl:hidden mb-5 mt-3"
                        href={`https://www.youtube.com/watch?v=${data.source_id}`}
                        rel="noreferrer"
                      >
                        <img
                          className="mr-1 -ml-2"
                          src="/youtubeicon.png"
                          width={40}
                        />
                        <p className="text-zinc-600 dark:text-zinc-300 items-center pt-1 text-center font-averta-semibold text-md">
                          Click to watch
                        </p>
                      </a>
                    )}
                    <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>

                    <Popover placement="right">
                      <PopoverHandler>
                        <button className="flex flex-row text-zinc-600 dark:text-zinc-300 font-averta-semibold">
                          <AddCircleIcon className="text-green-200" />{' '}
                          <p className="ml-2 text-zinc-600 dark:text-zinc-300 opacity-80 items-center text-md font-averta-semibold">
                            Add To Arc
                          </p>
                        </button>
                      </PopoverHandler>
                      <PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
                        <MenuItem
                          onClick={() => handleAddToArchipelago(0, true)}
                          className="text-zinc-700 dark:text-zinc-200 flex-row flex font-averta-semibold"
                        >
                          <AddIcon className="text-zinc-600 dark:text-zinc-300" />
                          <p className="text-zinc-600 dark:text-zinc-300 pl-1 font-averta-semibold">
                            Create An Arc
                          </p>
                        </MenuItem>
                        {userArchipelagoNames.map(item => (
                          <MenuItem
                            onClick={() =>
                              handleAddToArchipelago(item[1], false)
                            }
                            className="text-zinc-700 dark:text-zinc-200"
                            value={item}
                          >
                            <p className="text-zinc-600 dark:text-zinc-300 font-averta-semibold">
                              {item[0]}
                            </p>
                          </MenuItem>
                        ))}
                      </PopoverContent>
                    </Popover>

                    {data.source_type === 'up' &&
                      data !== undefined &&
                      data !== null &&
                      currentUser !== null &&
                      data.submitter_id == currentUser.uid && (
                        <div>
                          <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 mt-5"></div>

                          <div className="relative flex flex-row  group  cursor-default">
                            <div className=" flex flex-row text-zinc-600 dark:text-zinc-300 items-center z-[9999]">
                              <AntSwitch
                                onChange={handleVisibility}
                                defaultChecked={isVisible}
                                disabled={tier !== 'premium'}
                              />
                              <span className="text-sm mx-2 font-averta-semibold">
                                {isVisible === true ? 'Public' : 'Private'}
                              </span>
                            </div>

                            {tier === 'premium' && (
                              <span className="absolute opacity-0 min-w-[200px] font-averta-semibold  group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 md:top-full z-[9999] mb-2 ml-4">
                                {isVisible
                                  ? 'Toggle the visibility of this content. Switching to private makes it accessible only by you.'
                                  : 'Toggle the visibility of this content. Switching to public makes it accessible by all.'}
                              </span>
                            )}
                            {tier !== 'premium' && (
                              <span className="absolute opacity-0 min-w-[200px] font-averta-semibold group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 z-[9999] md:top-full z-50 mb-2 ml-4">
                                This content is private. Switch to the Premium
                                plan to make it publicly accessible.
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                    <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 mt-5"></div>

                    <div className="flex flex-row mb-2	 items-center hover:opacity-80 dark:hover:opacity-80 ">
                      <p
                        onClick={handleBookmark}
                        className="text-center items-center flex text-zinc-700 dark:text-zinc-200 opacity-80 cursor-pointer font-averta-semibold"
                      >
                        {currentUser &&
                          isBookmarked &&
                          currentUser &&
                          data &&
                          data.submitter_id !== currentUser.uid && (
                            <BookmarkRemoveIcon />
                          )}
                        {isBookmarked === false &&
                          currentUser &&
                          data &&
                          data.submitter_id !== currentUser.uid && (
                            <BookmarkAddIcon />
                          )}

                        {currentUser &&
                          isBookmarked === true &&
                          currentUser &&
                          data &&
                          data.submitter_id !== currentUser.uid && (
                            <span className="ml-2 font-averta-semibold">
                              Remove Bookmark
                            </span>
                          )}
                        {currentUser &&
                          isBookmarked === false &&
                          currentUser &&
                          data &&
                          data.submitter_id !== currentUser.uid && (
                            <span className="ml-2 font-averta-semibold">
                              Add To Bookmarks
                            </span>
                          )}
                      </p>
                    </div>
                    {currentUser &&
                      data &&
                      data.submitter_id !== currentUser.uid && (
                        <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
                      )}
                  </div>
                  <p className="mb-2 text-zinc-700 dark:text-zinc-300 font-averta-semibold">
                    Language
                  </p>
                  <Box sx={{ minWidth: 200 }} className="">
                    <FormControl
                      className="w-full text-zinc-200 dark:text-zinc-700 font-averta-semibold "
                      size="small"
                    >
                      <Select
                        sx={{
                          border: '1px solid #e2e8f0',
                        }}
                        value={language}
                        onChange={handleLanguageChange}
                        displayEmpty
                        MenuProps={MenuProps}
                        className="text-zinc-700 dark:text-zinc-200 font-averta-semibold"
                      >
                        {Object.entries(reorderedLanguageCodes).map(
                          ([code, name], index) =>
                            language === code ? (
                              <MenuItem
                                className="text-zinc-700 dark:text-zinc-200 font-averta-semibold"
                                key={code}
                                value={code}
                              >
                                <p className="font-averta-semibold text-zinc-700 dark:text-zinc-300">
                                  {' '}
                                  {name}
                                </p>
                              </MenuItem>
                            ) : index === languages.length ? (
                              <div className=" border-t mt-2 mb-4 border-gray-100 dark:border-zinc-700 mx-auto items-center flex  dark:opacity-40 text-zinc-700 dark:text-zinc-200"></div>
                            ) : (
                              <MenuItem
                                className={`${
                                  languages.includes(code)
                                    ? ''
                                    : 'text-gray-300 dark:text-gray-500'
                                } font-averta-semibold`}
                                key={code}
                                value={code}
                              >
                                <p className="font-averta-semibold">{name}</p>
                              </MenuItem>
                            )
                        )}
                      </Select>
                    </FormControl>
                  </Box>

                  <div className="mt-5">
                    <div className="border-b border-gray-100 mx-auto items-center flex dark:opacity-40"></div>
                  </div>

                  <button
                    className=" bg-none text-sm text-zinc-700 dark:text-zinc-200 flex  mt-5 pt-1 opacity-70"
                    onClick={handleReportIssue}
                  >
                    <svg
                      className="w-5 h-5 pr-1 "
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <p className="text-left font-averta-semibold">
                      Report an issue
                    </p>
                  </button>

                  <Dialog
                    maxWidth={'sm'}
                    open={showReportIssue}
                    onClose={() => setShowReportIssue(false)}
                    className=" dark:border-zinc-500"
                  >
                    {currentUser ? (
                      <div className="px-10 dark:bg-mildDarkMode dark:border-zinc-500">
                        <iframe
                          className="h-[600px] dark:hidden md:h-[640px] min-w-[350px]"
                          src={`https://tally.so/embed/wve4d8?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                        ></iframe>
                        <iframe
                          className="h-[600px] hidden dark:block md:h-[640px] min-w-[350px]"
                          src={`https://tally.so/embed/wMNL70?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                        ></iframe>
                      </div>
                    ) : (
                      <p className="dark:bg-mildDarkMode dark:border-zinc-500 dark:text-zinc-200">
                        Please{' '}
                        <a
                          className="text-greenColor underline"
                          href="/u/login"
                        >
                          sign in{' '}
                        </a>
                        to access the form.
                      </p>
                    )}
                  </Dialog>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div
          className={`${
            isSandbox
              ? 'col-span-2  ml-1 grid grid-cols-2 flex flex-row'
              : 'col-span-2  ml-1 grid grid-cols-2 flex flex-row'
          }`}
        >
          <div className="col-span-1">
            <h2 className="text-lg text-left lg:col-span-3 font-averta-regular mt-2 text-zinc-600  dark:bg-darkMode dark:text-zinc-400  flex flex-row">
              {data.source_type !== 'up' && data.creator_name}
              {data.source_type === 'up' && 'Private Content'}
            </h2>
          </div>
        </div>
        <div className="flex flex-row pt-6 ">
          {isSandbox === true ? (
            <button
              className="cursor-pointer flex flex-row gap-2 rounded-lg items-center text-center px-2 py-2 bg-transparent border-zinc-400 dark:border-zinc-200 border w-[200px] justify-center"
              onClick={() => setIsSandbox(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={`${
                  localStorage.getItem('theme') === 'light'
                    ? '#27272a'
                    : '#d4d4d8'
                }`}
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>

              <p className=" text-md font-averta-semibold text-zinc-800 dark:text-zinc-200 ">
                Reading
              </p>
            </button>
          ) : (
            <button
              className="cursor-pointer flex flex-row gap-2 rounded-lg 	px-2 py-2 bg-gradient-to-bl from-lime-100 via-sky-200 to-indigo-200 w-[200px] justify-center"
              onClick={() => setIsSandbox(true)}
            >
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

              <p className=" text-md font-averta-semibold text-zinc-700 dark:text-zinc-700 mr-1 ">
              Playground
              </p>
            </button>
          )}
        </div>
        <p className="max-w-[800px] mt-5 border border-zinc-100 dark:border-zinc-700"></p>
      </div>

      <div className="flex flex-col mt-5 ml-2 items-center  lg:hidden cursor-default">
        <Popover
          open={mainPopoverOpenSmall}
          onBlur={() => setMainPopoverOpenSmall(false)}
        >
          <PopoverHandler
            onClick={() => setMainPopoverOpenSmall(!mainPopoverOpenSmall)}
          >
            <div className="lg:hidden mt-5">
              <svg
                width={30}
                className="cursor-pointer"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </PopoverHandler>
          <PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
            <div>
              {data.source_type === 'yt' && (
                <a
                  target="_blank"
                  className="flex flex-row mb-3"
                  href={`https://www.youtube.com/watch?v=${data.source_id}`}
                  rel="noreferrer"
                >
                  <img className="-ml-2" src="/youtubeicon.png" width={40} />
                  <p className="text-zinc-600 dark:text-zinc-300 items-center pt-1 text-center text-md font-averta-semibold ">
                    Click to watch
                  </p>
                </a>
              )}
              {data.source_type === 'sp' && (
                <a
                  className="flex flex-row mb-5 mt-3  "
                  target="_blank"
                  href={`https://twitter.com/i/spaces/${data.source_id}`}
                  rel="noreferrer"
                >
                  <img className="ml-1" src={TwitterLogo} width={20} />
                  <p className=" text-zinc-600 dark:text-zinc-300 opacity-80 items-center text-md font-averta-semibold">
                    Click to listen
                  </p>
                </a>
              )}
              {data.source_type === 'tw' && (
                <a
                  className="flex flex-row mb-5 mt-3  "
                  target="_blank"
                  href={`https://www.twitch.tv/videos/${data.source_id}`}
                  rel="noreferrer"
                >
                  <img className="ml-1 mt-1" src={TwitchIcon} width={20} />
                  <p className=" text-zinc-600 ml-2 dark:text-zinc-300 opacity-80 items-center text-md font-averta-semibold">
                    Click to watch
                  </p>
                </a>
              )}
              {data.source_type === 'x' && (
                <a
                  className="flex flex-row mb-5 mt-3  "
                  target="_blank"
                  href={`https://www.x.com/i/status/${data.source_id}`}
                  rel="noreferrer"
                >
                  <svg
                    width={20}
                    hieght={20}
                    xmlns="http://www.w3.org/2000/svg"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 512 462.799"
                  >
                    <path
                      fillRule="nonzero"
                      d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
                    />
                  </svg>
                  <p className=" text-zinc-600 ml-2 dark:text-zinc-300 opacity-80 items-center text-md font-averta-semibold">
                    Click to watch
                  </p>
                </a>
              )}
              {data.source_type === 'ap' && (
                <a
                  className="flex flex-row mb-5 mt-3 ml-1  "
                  target="_blank"
                  href={`https://podcasts.apple.com/podcast/id${
                    data.source_id.split('-')[0]
                  }?i=${data.source_id.split('-')[1]}`}
                  rel="noreferrer"
                >
                  <svg
                    className="mt-1"
                    fill={`${
                      localStorage.getItem('theme') === 'dark'
                        ? '#f4f4f5'
                        : '#27272a'
                    }`}
                    width="16px"
                    height="16px"
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
                  <p className=" text-zinc-600 ml-2 dark:text-zinc-300 opacity-80 items-center text-md font-averta-semibold">
                    Click to listen
                  </p>
                </a>
              )}
              <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>

              <Popover placement="right">
                <PopoverHandler>
                  <button className="flex flex-row text-zinc-600 dark:text-zinc-300">
                    <AddCircleIcon className="text-green-200" />{' '}
                    <p className="ml-2 text-zinc-600 dark:text-zinc-300 opacity-80 items-center text-md font-averta-semibold">
                      Add To Arc
                    </p>
                  </button>
                </PopoverHandler>
                <PopoverContent className="dark:bg-mildDarkMode dark:border-zinc-500 dark:border-darkMode">
                  <MenuItem
                    onClick={() => handleAddToArchipelago(0, true)}
                    className="text-zinc-700 dark:text-zinc-200 flex-row flex"
                  >
                    <AddIcon className="text-zinc-600 dark:text-zinc-300" />
                    <p className="text-zinc-600 dark:text-zinc-300 opacity-80 items-center text-md font-averta-semibold">
                      Create An Arc
                    </p>
                  </MenuItem>
                  {userArchipelagoNames.map(item => (
                    <MenuItem
                      onClick={() => handleAddToArchipelago(item[1], false)}
                      className="text-zinc-700 dark:text-zinc-200"
                      value={item}
                    >
                      <p className="text-zinc-600 dark:text-zinc-300 font-averta-semibold">
                        {item[0]}
                      </p>
                    </MenuItem>
                  ))}
                </PopoverContent>
              </Popover>
              {data.source_type === 'up' &&
                data !== undefined &&
                data !== null &&
                currentUser !== null &&
                data.submitter_id == currentUser.uid && (
                  <div>
                    <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 mt-5 font-averta-semibold"></div>

                    <div className="relative flex flex-row  group  cursor-default">
                      <div className=" flex flex-row text-zinc-600 dark:text-zinc-300 items-center z-[9999]">
                        <AntSwitch
                          onChange={handleVisibility}
                          defaultChecked={isVisible}
                          disabled={tier !== 'premium'}
                        />
                        <span className="text-sm mx-2">
                          {isVisible === true ? 'Public' : 'Private'}
                        </span>
                      </div>

                      {tier === 'premium' && (
                        <span className="absolute mt-6 opacity-0 min-w-[200px] group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 md:top-full z-[9999] mb-2 ml-4">
                          {isVisible
                            ? 'Toggle the visibility of this content. Switching to private makes it accessible only by you.'
                            : 'Toggle the visibility of this content. Switching to public makes it accessible by all.'}
                        </span>
                      )}
                      {tier !== 'premium' && (
                        <span className="absolute mt-6 opacity-0 min-w-[200px]  font-averta-semibold group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-gray-300 text-sm rounded py-1 px-2 z-[9999] md:top-full z-50 mb-2 ml-4">
                          This content is private. Switch to the Premium plan to
                          make it publicly accessible.
                        </span>
                      )}
                    </div>
                  </div>
                )}
              <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mt-5 mb-5 dark:opacity-40"></div>

              {currentUser && data && data.submitter_id !== currentUser.uid && (
                <div className="flex flex-row mb-5 items-center hover:opacity-80 dark:hover:opacity-80 ">
                  <p
                    onClick={handleBookmark}
                    className="text-center items-center flex text-zinc-700 dark:text-zinc-200 opacity-80 cursor-pointer"
                  >
                    {currentUser &&
                      isBookmarked &&
                      currentUser &&
                      data &&
                      data.submitter_id !== currentUser.uid && (
                        <BookmarkRemoveIcon />
                      )}
                    {isBookmarked === false &&
                      currentUser &&
                      data &&
                      data.submitter_id !== currentUser.uid && (
                        <BookmarkAddIcon />
                      )}

                    {currentUser && isBookmarked === true && (
                      <span className="ml-2 text-zinc-600 dark:text-zinc-300 opacity-80 items-center text-md font-averta-semibold">
                        Remove Bookmark
                      </span>
                    )}
                    {currentUser && isBookmarked === false && (
                      <span className="ml-2 text-zinc-600 dark:text-zinc-300 opacity-80 items-center text-md font-averta-semibold">
                        Add Bookmark
                      </span>
                    )}
                  </p>
                </div>
              )}
              {currentUser && data && data.submitter_id !== currentUser.uid ? (
                <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40"></div>
              ) : null}

              <p className="mb-2 text-zinc-700 dark:text-zinc-200 opacity-80 font-averta-semibold">
                Language
              </p>

              <Box sx={{ minWidth: 200 }} className="">
                <FormControl
                  className="w-full text-zinc-200 dark:text-zinc-700 font-averta-semibold "
                  size="small"
                >
                  <Select
                    value={language}
                    onChange={handleLanguageChange}
                    displayEmpty
                    MenuProps={MenuProps}
                    className="text-zinc-700 dark:text-zinc-200 font-averta-semibold"
                  >
                    {Object.entries(reorderedLanguageCodes).map(
                      ([code, name], index) =>
                        language === code ? (
                          <MenuItem
                            className="text-zinc-700 dark:text-zinc-200 font-averta-semibold"
                            key={code}
                            value={code}
                          >
                            <p className="font-averta-semibold text-zinc-700 dark:text-zinc-300">
                              {name}
                            </p>
                          </MenuItem>
                        ) : index === languages.length ? (
                          <div className=" border-t mt-2 mb-4 border-gray-100 dark:border-zinc-700 mx-auto items-center flex  dark:opacity-40 text-zinc-700 dark:text-zinc-200"></div>
                        ) : (
                          <MenuItem
                            className={`${
                              languages.includes(code)
                                ? ''
                                : 'text-gray-300 dark:text-gray-500'
                            } font-averta-semibold`}
                            key={code}
                            value={code}
                          >
                            <p className="font-averta-semibold">{name}</p>
                          </MenuItem>
                        )
                    )}
                  </Select>
                </FormControl>
              </Box>

              <div className="border-b border-gray-100 mx-auto items-center flex mt-5 dark:opacity-40"></div>

              <button
                className=" bg-none text-sm text-zinc-700 dark:text-zinc-200 flex  mt-5 pt-1 opacity-70"
                onClick={handleReportIssue}
              >
                <svg
                  className="w-5 h-5 pr-1 "
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <p className="text-left">Report an issue</p>
              </button>

              <Dialog
                maxWidth={'sm'}
                open={showReportIssue}
                onClose={() => setShowReportIssue(false)}
                className=""
              >
                {currentUser ? (
                  <div className="px-10 dark:bg-mildDarkMode dark:border-zinc-500">
                    <iframe
                      className="h-[640px] dark:hidden  md:min-w-[350px]"
                      src={`https://tally.so/embed/wve4d8?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                    ></iframe>
                    <iframe
                      className="h-[640px] hidden dark:block md:min-w-[350px]"
                      src={`https://tally.so/embed/wMNL70?source_type=${data.source_type}&source_id=${data.source_id}&user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
                    ></iframe>
                  </div>
                ) : (
                  <p className=" dark:bg-mildDarkMode dark:border-zinc-500 dark:text-zinc-200 font-averta-semibold">
                    Please{' '}
                    <a
                      className="text-greenColor underline font-averta-semibold"
                      href="/u/login"
                    >
                      sign in{' '}
                    </a>
                    to access the form.
                  </p>
                )}
              </Dialog>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
