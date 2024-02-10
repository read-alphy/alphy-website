import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Twitch from '../../img/twitch_full.png'
import Twitter from '../../img/twitter_square.png'
import Youtube from '../../img/youtube.png'
import ApplePodcast from '../../img/apple_podcasts.png'
import Spaces from '../../img/spaces_square.png'
import { Shine } from 'frosted-ui'
import axios from 'axios'
import { API_URL } from '../../constants'
import LitmusDemo from '../../img/litmus_demo.mp4'
import ChromeIcon from '../../img/chrome_icon.png'
import { Button } from '@material-tailwind/react'
import AboutMainPage from './AboutMainPage.jsx'
import FooterMainPage from './FooterMainPage.jsx'
import FlagArea from './FlagsArea.jsx'
import AudioFileIcon from '@mui/icons-material/AudioFile'

export default function WelcomeExplainer({
  currentUser,
  totalMinutes,
  setTotalMinutes,
}) {
  if (totalMinutes === 0) {
    axios.get(`${API_URL}/stats`).then(res => {
      if (res.data.total_mins !== undefined && res.data.total_mins !== null) {
        setTotalMinutes(res.data.total_mins)
      }
    })
  }

  const scrollToLanguages = () => {
    document.getElementById('languages').scrollIntoView({ behavior: 'smooth' })
  }
  const languages = [
    { language: 'English', country_code: 'gb' }, // United Kingdom
    { language: 'Chinese', country_code: 'cn' }, // China
    { language: 'Spanish', country_code: 'es' }, // Spain
    { language: 'Turkish', country_code: 'tr' }, // Turkey
    { language: 'German', country_code: 'de' }, // Germany
    { language: 'Arabic', country_code: 'sa' }, // Saudi Arabia
    { language: 'French', country_code: 'fr' }, // France
  ]

  return (
    <div>
      <div className="w-full  mx-auto  md:pl-10  lg:pl-16 xl:pl-20 3xl:pl-40  overflow-hidden pb-10">
        <div className="pl-5 pr-5 mt-4  sm:mt-10 lg:mt-20 ">
          {totalMinutes > 0 && (
            <div className="flex flex-row ">
              <p className="bg-gradient-to-r from-pink-200 to-amber-100 via-red-200 rounded-lg px-2 py-1   font-bold text-zinc-900 text-md xs:text-lg">
                {Math.floor(totalMinutes).toLocaleString()}{' '}
                <span className="font-averta-regular text-sm xs:text-md md:text-lg">
                  minutes processed with Alphy{' '}
                </span>
              </p>
            </div>
          )}
          <p className="text-zinc-900 dark:text-zinc-300 mb-5 mt-4 mx-auto text-3xl xs:text-4xl text-[30px]   font-bold  ">
            Turn audio to text, summarize, and ask questions
          </p>
          <p className="text-zinc-500 dark:text-zinc-400 mb-5  mt-4 text-lg xs:text-xl lg:text-xl font-averta-regular font-normal max-w-[640px]">
            {' '}
            Join the Alphy community to save time and learn better from audio
            content with the highest quality transcription and AI models.
          </p>

          <div className={`mt-8 flex flex-row`}>
            <Link
              to={`${currentUser ? '/submit' : '/u/register'}`}
              onClick={() => {
                if (currentUser) {
                  localStorage.setItem('newItem', 'link')
                }
              }}
              className={`rounded-lg  text-zinc-800  transition duration-300  ease-in-out hover:-translate-y-1 transform flex flex-row text-center text-md sm:text-md bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-teal-50 via-green-100 to-teal-200  px-2 sm:px-6  py-3 font-averta-semibold drop-shadow-sm
              
              `}
            >
              {currentUser && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 mr-1 mt-0.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                  />
                </svg>
              )}
              {currentUser
                ? window.innerWidth < 400
                  ? 'Submit a Link'
                  : 'Submit a Link'
                : 'Start for Free'}
            </Link>
            {/* {currentUser && 
            <Link
              to={`${currentUser ? '/submit' : '/u/register'}`}
              className="rounded-lg flex flex-row text-zinc-800  text-center text-md sm:text-md bg-none border border-zinc-700 dark:border-zinc-500 dark:text-zinc-300 ml-4  items-center py-3 font-averta-semibold drop-shadow-sm 
              
              px-2"
            >
              {currentUser && 
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1 mt-0.5">
             <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
           </svg>
            }
              
                {window.innerWidth < 400
                  ? 'Upload'
                  : 'Upload from Device'
                }
            </Link>

} */}

            {currentUser ? (
              <Link
                to="/submit"
                onClick={() => localStorage.setItem('newItem', 'upload')}
                className="rounded-lg  text-zinc-800  text-center text-md sm:text-md bg-none flex flex-row dark:border-zinc-500 dark:text-zinc-300 ml-4  px-4 py-3 font-averta-semibold drop-shadow-sm px-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>

                {window.innerWidth < 400 ? 'Upload' : 'Upload from Device'}
              </Link>
            ) : (
              <Link
                to="/explore"
                className="rounded-lg  flex flex-row text-zinc-800  text-center text-md sm:text-md bg-none dark:border-zinc-500 dark:text-zinc-300 ml-4  px-4 py-3 font-averta-semibold "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2 mt-1 feather feather-compass"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                </svg>

                {'See Examples'}
              </Link>
            )}
          </div>

          <div className=" mt-20  text-zinc-600 dark:text-zinc-300 text-lg flex flex-col">
            <div className="flex flex-col sm:flex-row">
              <span>Transcribe and use AI on more than</span>
              <span
                onClick={() => scrollToLanguages()}
                className="text-blue-500 dark:text-blue-400 cursor-pointer ml-1"
              >
                {' '}
                40 languages
              </span>
            </div>

            <div className="flex flex-row mt-6">
              {languages.map(language => (
                <img
                  className="rounded-full object-cover w-10 h-10 border border-green-100 dark:border-zinc-800 mx-1"
                  src={`https://flagcdn.com/w80/${language.country_code}.png`}
                  alt={language.language}
                />
              ))}
            </div>
          </div>

          <div className="max-w-[800px] border-b border-slate-200 dark:border-zinc-500  dark:opacity-40 mt-10 font-averta-semibold"></div>

          <div className="flex flex-col text-zinc-700 dark:text-zinc-300 font-averta-bold text-lg mt-16">
            Supported Online Platforms
            <div className="flex flex-row  mx-auto w-full mt-4       sm:mt-8 sm:gap-y-4 opacity-80 overflow-scroll">
              {/* <div className="hidden lg:block grid grid-rows-3 items-center text-center sm:mr-4   mx-2  ">
                    <AudioFileIcon title="Local Audio Files" className="row-span-3 lg:row-span-2 flex mx-auto " sx={{
                      color:"#bbf7d0",                  
                      width:`100px` ,
                      height:`80px`,
                    }}/>
                    <p className=" hidden lg:block text-md font-averta-regular text-[14px] lg:text-[16px]">Local Audio Files</p>
                    </div>
 */}
              <div className="grid grid-rows-3 items-center text-center sm:mr-4   mx-2 max-w-[160px]">
                <img
                  src={Youtube}
                  alt="YouTube"
                  height={20}
                  width={100}
                  title="YouTube"
                  className="row-span-3 lg:row-span-2 rounded-lg flex min-w-[40px] mx-auto"
                />
                <p className=" hidden lg:block  text-md font-normal text-[16px]">
                  YouTube
                </p>
              </div>
              <div className="grid grid-rows-3 items-center text-center sm:mr-4   mx-2 max-w-[160px]">
                <img
                  src={Twitter}
                  alt="Twitter / X videos"
                  height={20}
                  width={80}
                  title="Twitter / X videos"
                  className="row-span-3 lg:row-span-2 rounded-lg min-w-[40px] flex mx-auto"
                />
                <p className=" hidden lg:block  text-md font-normal  text-[16px]">
                  Twitter Videos
                </p>
              </div>

              <div className="grid grid-rows-3 items-center text-center sm:mr-4   mx-2 max-w-[160px]">
                <img
                  src={Spaces}
                  alt="Twitter / X Spaces"
                  height={20}
                  width={80}
                  title="Twitter / X Spaces"
                  className="row-span-3 lg:row-span-2 rounded-lg min-w-[40px] flex mx-auto"
                />
                <p className=" hidden lg:block  text-md font-normal text-[16px]">
                  Twitter Spaces
                </p>
              </div>
              <div className="grid grid-rows-3 items-center text-center sm:mr-4  mx-2 max-w-[160px]">
                <img
                  src={Twitch}
                  title="Twitch"
                  alt="Twitch"
                  height={20}
                  width={80}
                  className="row-span-3 lg:row-span-2 rounded-lg min-w-[40px] flex mx-auto"
                />
                <p className=" hidden lg:block  row-span-1 text-md font-normal text-[16px]">
                  Twitch
                </p>
              </div>

              <div className="grid grid-rows-3 items-center text-center sm:mr-4  mx-2 max-w-[160px]">
                <img
                  src={ApplePodcast}
                  height={20}
                  alt="Apple Podcasts"
                  width={80}
                  title="Apple Podcasts"
                  className="row-span-3 lg:row-span-2 rounded-lg min-w-[40px] flex mx-auto"
                />
                <p className="hidden lg:block  text-md font-normal text-[16px]">
                  Apple Podcasts
                </p>
              </div>
            </div>
          </div>

          {/*           <div>

          Import your meetings

          </div> */}

          <div className="mt-10 sm:mt-20 flex flex-col">
            <div className="flex flex-col">
              <p className="text-2xl text-zinc-900 dark:text-zinc-200">
                Meet Alphy's extension: Supercharge YouTube search with AI{' '}
              </p>
              <span className="text-zinc-500 dark:text-zinc-400 mb-5  mt-4 text-md lg:text-lg md:text-[16px] font-averta-regular font-normal max-w-[800px]">
                No need to watch. No need to summarize. Simply search YouTube
                and Alphy will give you direct answers from the top videos,
                complete with timestamps and source links.
              </span>
            </div>
            <div className="mb-10 mt-5">
              <a
                className=""
                href="https://chrome.google.com/webstore/detail/alphy/eifpdfgnodpopimeakmdebmfglimkdno "
                target="_blank"
              >
                <button className=" rounded-lg flex flex-row normal-case bg-white dark:bg-mildDarkMode items-center border border-zinc-700 dark:border-zinc-700  px-2 py-3 w-[300px]">
                  <div className="mx-auto flex flex-row items-center">
                    <img src={ChromeIcon} width={40} />
                    <span className="text-xl pl-4  font-averta-regular text-zinc-900 dark:text-zinc-300">
                      Install on Chrome
                    </span>
                  </div>
                </button>
              </a>
              <div></div>
            </div>
          </div>
          <video
            className="2xl:max-w-[800px] border-4 rounded-lg border-zinc-900 dark:border-zinc-400 drop-shadow-lg"
            autoPlay
            loop
            muted
          >
            <source src={LitmusDemo} type="video/mp4" />
          </video>
        </div>
        <div className="">
          <FlagArea />
        </div>

        <div className="sm:hidden">
          <AboutMainPage />
        </div>
      </div>
      <div className="sm:hidden">
        <FooterMainPage currentUser={currentUser} />
      </div>
    </div>
  )
}
