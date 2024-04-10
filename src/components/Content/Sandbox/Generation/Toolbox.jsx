import React, { useState, useEffect } from 'react'
import { Button } from '@material-tailwind/react'
import CircularProgress from '@mui/material/CircularProgress';
import VerifiedIcon from '@mui/icons-material/Verified'

import { inputMessages } from '../messageBank'


export default function Toolbox({
  tier,
  createDopeStuff,
  isLoading,
  toolboxActive,
  setToolboxActive,
  selectedTool,
  setSelectedTool,
}) {
  useEffect(() => {
    if (selectedTool !== '') {
      setToolboxActive(true)
    } else {
      setToolboxActive(false)
    }
  }, [selectedTool])

  return (
    <div className="w-full  max-w-[800px] ">
      {/*       <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-5 pt-6 dark:opacity-40"></div>

      <p className="text-lg mt-6 text-slate-500 dark:text-zinc-300 ">
        One-click Generation
      </p> */}

      <div className="flex flex-wrap mt-4 gap-6 justify-center sm:justify-normal">
        {/* CUSTOM INPUT */}
        <div
          className={`${
            selectedTool === 'custom' && 'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px]   p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() => {
              if (selectedTool === 'custom') {
                setSelectedTool('')
              } else {
                setSelectedTool('custom')
              }
            }}
            className={` p-4 pb-2  h-full grid grid-row-3  normal-case rounded-lg ${
              selectedTool !== 'custom' && ''
            }  cursor-pointer border border-slate-100 bg-gradient-to-tr from-slate-50 via-indigo-100 to-slate-100 dark:bg-gradient-to-tr dark:from-stone-900 dark:via-zinc-900 dark:to-stone-950 drop-shadow-sm text-slate-700 dark:text-zinc-300 dark:text-zinc-200 dark:border-zinc-500  flex flex-col   max-w-[350px] sm:max-w-[240px]   `}
          >
            <div className="flex flex-row">
              {inputMessages.find(obj => obj.command_type === 'custom').icon}{' '}
            </div>

            <p className="row-span-1 text-md quicksand font-bold text-slate-700  dark:text-zinc-300 ">
              {inputMessages.find(obj => obj.command_type === 'custom').title}{' '}
            </p>
            <p className="row-span-1 text-sm quicksand font-normal text-slate-500 dark:text-zinc-400 dark:text-zinc-400 ">
              {inputMessages.find(obj => obj.command_type === 'custom').message}{' '}
            </p>

            <div
              className={`${
                selectedTool === 'twitter_thread' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            ></div>
          </div>
        </div>

        {/* TWITTER THREAD */}
        <div
          id="twitter_thread"
          className={`${
            selectedTool === 'twitter_thread' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px]   p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() => {
              if (selectedTool === 'twitter_thread') {
                setSelectedTool('')
              } else {
                setSelectedTool('twitter_thread')
              }
            }}
            className={` p-4 pb-2  h-full grid grid-row-3  normal-case rounded-lg ${
              selectedTool !== 'twitter_thread' && ''
            }  cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode drop-shadow-sm text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-200 dark:border-zinc-800  flex flex-col  max-w-[350px]  sm:max-w-[240px]   `}
          >
            {
              inputMessages.find(obj => obj.command_type === 'twitter_thread')
                .icon
            }

            <p className="row-span-1 text-md quicksand font-bold text-slate-700  dark:text-zinc-300 ">
              {
                inputMessages.find(obj => obj.command_type === 'twitter_thread')
                  .title
              }
            </p>
            <p className="row-span-1 text-sm quicksand font-normal text-slate-500 dark:text-zinc-400 dark:text-zinc-400 ">
              {
                inputMessages.find(obj => obj.command_type === 'twitter_thread')
                  .message
              }
            </p>

            <div
              className={`${
                selectedTool === 'twitter_thread' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={selectedTool !== 'twitter_thread'}
                className={`${
                  selectedTool !== 'twitter_thread'
                    ? 'opacity-0'
                    : 'opacity-100'
                }  transition-opacity delay-200 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>
        {/* BLOG POST */}

        <div
          className={`${
            selectedTool === 'blog_post' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(selectedTool === 'blog_post' ? '' : 'blog_post')
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'blog_post' && ''
            }`}
          >
            {inputMessages.find(obj => obj.command_type === 'blog_post').icon}{' '}
            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(obj => obj.command_type === 'blog_post')
                  .title
              }{' '}
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(obj => obj.command_type === 'blog_post')
                  .message
              }
            </p>
            <div
              className={`${
                selectedTool === 'blog_post' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={selectedTool !== 'blog_post'}
                className={`${
                  selectedTool !== 'blog_post' ? 'opacity-0' : 'opacity-100'
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>
        {/* SPACE DESCRIPTION GENERATOR */}
        <div
          className={`${
            selectedTool === 'space_description_generator' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'space_description_generator'
                  ? ''
                  : 'space_description_generator'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'space_description_generator' && ''
            }`}
          >
            {
              inputMessages.find(
                obj => obj.command_type === 'space_idea_generator'
              ).icon
            }

            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'space_description_generator'
                ).title
              }
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'space_description_generator'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'space_description_generator'
                  ? 'max-h-96'
                  : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={selectedTool !== 'space_description_generator'}
                className={`${
                  selectedTool !== 'space_description_generator'
                    ? 'opacity-0'
                    : 'opacity-100'
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* EXECUTIVE BRIEF COMPOSER */}
        <div
          className={`${
            selectedTool === 'executive_brief_composer' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'executive_brief_composer'
                  ? ''
                  : 'executive_brief_composer'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'executive_brief_composer' && ''
            }`}
          >
            {
              inputMessages.find(
                obj => obj.command_type === 'executive_brief_composer'
              ).icon
            }

            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'executive_brief_composer'
                ).title
              }
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'executive_brief_composer'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'executive_brief_composer'
                  ? 'max-h-96'
                  : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={selectedTool !== 'executive_brief_composer'}
                className={`${
                  selectedTool !== 'executive_brief_composer'
                    ? 'opacity-0'
                    : 'opacity-100'
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>
        {/* AUDIOGRAM */}

        <div
          className={`${
            selectedTool === 'audiogram' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px]  p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(selectedTool === 'audiogram' ? '' : 'audiogram')
            }
            className={`p-4 pb-2  h-full h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'audiogram' && ''
            }`}
          >
            <div className="flex flex-row w-full">
              {inputMessages.find(obj => obj.command_type === 'audiogram').icon}
              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>
            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(obj => obj.command_type === 'audiogram')
                  .title
              }
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(obj => obj.command_type === 'audiogram')
                  .message
              }
            </p>
            <div
              className={`${
                selectedTool === 'audiogram' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height] overflow-hidden duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={selectedTool !== 'audiogram' || tier !== 'premium'}
                className={`${
                  selectedTool !== 'audiogram' ? 'opacity-0' : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* INVESTMENT ANALYSIS */}

        <div
          className={`${
            selectedTool === 'investment_analysis' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'investment_analysis'
                  ? ''
                  : 'investment_analysis'
              )
            }
            className={` p-4 pb-2 h-full pb-2 grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'investment_analysis' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(
                  obj => obj.command_type === 'investment_analysis'
                ).icon
              }{' '}
              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>

            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'investment_analysis'
                ).title
              }{' '}
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'investment_analysis'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'investment_analysis' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden  overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'investment_analysis' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'investment_analysis'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* QUOTE GETTER */}
        {/* <div className={`${selectedTool === "quote_getter" && "animated-gradient-border rounded-lg "} flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}>
    <div onClick={() => setSelectedTool("quote_getter")} className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${selectedTool !== "quote_getter" && ""}`}>
        <FormatQuoteIcon className="row-span-1" fontSize="medium" sx={{ color: "#86198f" }}/>
        <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">Quotes</p>
        <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">Get me quotes from the conversation about the talking points I specify.</p>
    </div>
</div> */}

        {/* NEWSLETTER GENERATOR */}
        <div
          className={`${
            selectedTool === 'newsletter_generator' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'newsletter_generator'
                  ? ''
                  : 'newsletter_generator'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'newsletter_generator' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(
                  obj => obj.command_type === 'newsletter_generator'
                ).icon
              }

              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>

            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'newsletter_generator'
                ).title
              }
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'newsletter_generator'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'newsletter_generator' ? 'max-h-96' : 'max-h-0'
              } transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'newsletter_generator' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'newsletter_generator'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* HIGHLIGHT GENERATOR */}
        <div
          className={`${
            selectedTool === 'highlight_generator' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'highlight_generator'
                  ? ''
                  : 'highlight_generator'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'highlight_generator' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(
                  obj => obj.command_type === 'highlight_generator'
                ).icon
              }
              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>
            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'highlight_generator'
                ).title
              }
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'highlight_generator'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'highlight_generator' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'highlight_generator' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'highlight_generator'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* YOUTUBE SHORT IDEATION */}
        <div
          className={`${
            selectedTool === 'youtube_shorts' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'youtube_shorts' ? '' : 'youtube_shorts'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'youtube_shorts' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(obj => obj.command_type === 'youtube_shorts')
                  .icon
              }{' '}
              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>
            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(obj => obj.command_type === 'youtube_shorts')
                  .title
              }{' '}
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(obj => obj.command_type === 'youtube_shorts')
                  .message
              }
            </p>

            <div
              className={`${
                selectedTool === 'youtube_shorts' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'youtube_shorts' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'youtube_shorts'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* VIDEO TOPIC GENERATOR */}
        <div
          className={`${
            selectedTool === 'video_topic_generator' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'video_topic_generator'
                  ? ''
                  : 'video_topic_generator'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'video_topic_generator' && ''
            }`}
          >
            <div className="flex flex-row w-full">
              {
                inputMessages.find(
                  obj => obj.command_type === 'video_topic_generator'
                ).icon
              }
              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>

            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              YouTube Video Ideas
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'video_topic_generator'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'video_topic_generator'
                  ? 'max-h-96'
                  : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'video_topic_generator' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'video_topic_generator'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* VIDEO CLIPS */}
        <div
          className={`${
            selectedTool === 'video_description' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'video_description' ? '' : 'video_description'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'video_description' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(
                  obj => obj.command_type === 'video_description'
                ).icon
              }{' '}
              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>

            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'video_description'
                ).title
              }{' '}
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'video_description'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'video_description' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'video_description' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'video_description'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* SPACE IDEA GENERATOR */}
        <div
          className={`${
            selectedTool === 'space_idea_generator' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'space_idea_generator'
                  ? ''
                  : 'space_idea_generator'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'space_idea_generator' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(
                  obj => obj.command_type === 'space_idea_generator'
                ).icon
              }

              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>

            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'space_idea_generator'
                ).title
              }
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'space_idea_generator'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'space_idea_generator' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'space_idea_generator' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'space_idea_generator'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* KEYWORD IDENTIFIER */}
        <div
          className={`${
            selectedTool === 'keyword_identifier' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'keyword_identifier'
                  ? ''
                  : 'keyword_identifier'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'keyword_identifier' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(
                  obj => obj.command_type === 'keyword_identifier'
                ).icon
              }

              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>
            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'keyword_identifier'
                ).title
              }
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'keyword_identifier'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'keyword_identifier' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'keyword_identifier' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'keyword_identifier'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* GET ACTIONABLES */}
        <div
          className={`${
            selectedTool === 'get_actionables' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'get_actionables' ? '' : 'get_actionables'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'get_actionables' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(
                  obj => obj.command_type === 'get_actionables'
                ).icon
              }

              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>
            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'get_actionables'
                ).title
              }
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'get_actionables'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'get_actionables' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'get_actionables' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'get_actionables'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* GENERATE QUIZZES */}
        <div
          className={`${
            selectedTool === 'generate_quizzes' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'generate_quizzes' ? '' : 'generate_quizzes'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'generate_quizzes' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(
                  obj => obj.command_type === 'generate_quizzes'
                ).icon
              }{' '}
              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>

            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'generate_quizzes'
                ).title
              }{' '}
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'generate_quizzes'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'generate_quizzes' ? 'max-h-96' : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'generate_quizzes' || tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'generate_quizzes'
                    ? 'opacity-0'
                    : 'opacity-100'
                }  ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* INVESTMENT INSIGHT EXTRACTOR */}
        <div
          className={`${
            selectedTool === 'investment_insight_extractor' &&
            'animated-gradient-border rounded-lg '
          } flex flex-col h-[210px] p-0.5  transition duration-300 ease-in-out  `}
        >
          <div
            onClick={() =>
              setSelectedTool(
                selectedTool === 'investment_insight_extractor'
                  ? ''
                  : 'investment_insight_extractor'
              )
            }
            className={`p-4 pb-2 h-full grid grid-row-3 normal-case rounded-lg cursor-pointer border border-slate-100 bg-white dark:bg-mildDarkMode text-slate-700 dark:text-zinc-300 dark:bg-mildDarkMode dark:text-zinc-300 dark:border-zinc-800 drop-shadow-sm flex flex-col  max-w-[350px] sm:max-w-[240px]   ${
              selectedTool !== 'investment_insight_extractor' && ''
            }`}
          >
            <div className="flex flex-row">
              {
                inputMessages.find(
                  obj => obj.command_type === 'investment_insight_extractor'
                ).icon
              }

              <div className="justify-end flex flex-row w-full pl-6 md:pl-10">
                <p className="text-indigo-400 text-md  ">
                  {tier !== 'premium' && (
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  )}
                </p>
              </div>
            </div>
            <p className="text-md quicksand font-bold text-slate-700 dark:text-zinc-300">
              {
                inputMessages.find(
                  obj => obj.command_type === 'investment_insight_extractor'
                ).title
              }
            </p>
            <p className="text-sm quicksand font-normal text-slate-500 dark:text-zinc-400">
              {
                inputMessages.find(
                  obj => obj.command_type === 'investment_insight_extractor'
                ).message
              }
            </p>

            <div
              className={`${
                selectedTool === 'investment_insight_extractor'
                  ? 'max-h-96'
                  : 'max-h-0'
              }  transition-[max-height]  duration-500 ease-in-out overflow-hidden n`}
            >
              <Button
                onClick={event => {
                  event.stopPropagation()
                  createDopeStuff()
                }}
                ripple={true}
                disabled={
                  selectedTool !== 'investment_insight_extractor' ||
                  tier !== 'premium'
                }
                className={`${
                  selectedTool !== 'investment_insight_extractor'
                    ? 'opacity-0'
                    : 'opacity-100'
                } ${
                  tier !== 'premium' && 'flex flex-row opacity-50 '
                } transition-opacity delay-50 duration-100 ease-in overflow-hidden mt-6 w-[120px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200 to-blue-200 dark:to-blue-400 dark:text-zinc-800 text-slate-800 quicksand font-normal normal-case`}
              >
                {tier !== 'premium' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 mr-1 -mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                )}{' '}
                {isLoading ? (
                  <CircularProgress
                    color="blue"
                    size="sm"
                    className="mx-auto w-full justify-center "
                  />
                ) : tier !== 'premium' ? (
                  'Premium'
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
