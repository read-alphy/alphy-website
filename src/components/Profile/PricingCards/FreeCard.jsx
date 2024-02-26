import {

  Button,
} from '@material-tailwind/react'
import Link from 'next/link'
import { useState } from 'react'

export default function FreeCard({ tier, currentUser }) {



  return (
    <div className="col-span-1 xs:max-w-[400px] xs:min-w-[400px] xl:max-w-[360px] xl:min-w-[270px] p-4 bg-white border border-zinc-700 rounded-lg    sm:p-8 dark:bg-zinc-900  dark:border-gray-700  ">
      <p className="mb-4 text-2xl  text-zinc-900 dark:text-zinc-300 font-averta-semibold">
        Starter
      </p>

      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-5xl  tracking-tight font-averta-semibold">
          Free
        </span>
      </div>
      <p className="mt-3 text-zinc-500 ">Discover Alphy's capabilities </p>
      <div className="h-[720px]">
        <ul role="list" className="space-y-5 my-7">
          <li className="flex  space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Unlimited access to Alphy's public database
            </span>
          </li>
          <li className="flex  space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Unlimited access to Alphy's arcs
            </span>
          </li>
          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              1 hour transcription credits for YouTube videos
            </span>
          </li>

          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Create 1 Arc
            </span>
          </li>

          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}

            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Default translation{' '}
            </span>
          </li>
          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Submit YouTube videos
            </span>
          </li>
          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              No transcript export
            </span>
          </li>
          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              No uploads
            </span>
          </li>
          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300  cursor-pointer">
              Medium AI Models
            </span>
          </li>

          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              No optional credit topups
            </span>
          </li>

          <div className="w-full border-b border-gray-300 dark:border-zinc-700 "></div>

          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Limited access to Playground:
            </span>
          </li>

          <div className="flex flex-col ml-6 gap-y-4">
            <li className="flex space-x-3">
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check icon</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
              <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
                Only works on summaries
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check icon</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
              <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
                No custom prompts
              </span>
            </li>

            <li className="flex space-x-3">
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check icon</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
              <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
                Limited access to preset commands
              </span>
            </li>
          </div>

          {/*                <li className="flex space-x-3">

                    
            
                        <Popover open={openPopover1} handler={setOpenPopover1}>
                        
                            
                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300"> Content popularity limit </span>
                            <PopoverHandler {...triggers1} >
                            <svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                            </PopoverHandler>
                     <ThemeProvider value={themePopover}>
                     <PopoverContent {...triggers1}>
                                <p> You can only submit videos with greater than <strong className="underline">10,000 views</strong></p>
                                </PopoverContent>
                            </ThemeProvider>
                            
                                </Popover>
                    </li>
 */}

          <div className="pt-12">
            {currentUser ? (
              <a
                target="_blank"
                rel="noreferrer"
                href={
                  tier !== 'free' &&
                  'https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE'
                }
              >
                <Button
                  type="button"
                  className={` bg-zinc-700  transition duration-200 ease-in ${
                    tier !== 'free'
                      ? 'bg-zinc-700  dark:bg-darkMode dark:bg-zinc-700 text-zinc-300'
                      : 'pointer-events-none text-zinc-700'
                  } normal-case rounded-lg text-[16px] font-averta-semibold px-5 py-3 inline-flex text-zinc-100 justify-center w-full text-center`}
                >
                  {currentUser
                    ? tier !== 'free'
                      ? 'Go Starter'
                      : 'Active'
                    : 'Sign Up For Free'}
                </Button>
              </a>
            ) : (
              <div className="w-full items-center">
                <Link
                  href="/u/login"
                  type="button"
                  className="items-center w-full"
                >
                  <button className=" normal-case bg-green-200 transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-averta-semibold drop-shadow-sm rounded-lg  px-5 py-3 inline-flex justify-center w-full text-center text-zinc-700 text-[16px]">
                    {currentUser ? 'Active' : 'Sign Up For Free'}
                  </button>
                </Link>
              </div>
            )}
          </div>

          <li className="flex space-x-3 pt-4">
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300"></span>
          </li>
        </ul>
      </div>
    </div>
  )
}
