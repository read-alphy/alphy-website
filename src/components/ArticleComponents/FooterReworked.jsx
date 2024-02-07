import TwitterIcon from '@mui/icons-material/Twitter'
import EmailIcon from '@mui/icons-material/Email'
import DiscordIcon from '../../img/discord.svg'
import Dialog from '@mui/material/Dialog'
import { useState, useEffect } from 'react'
import FeedbackForm from '../FeedbackForm'
import PersonIcon from '@mui/icons-material/Person'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Button } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import VerifiedIcon from '@mui/icons-material/Verified'
import ChromeIcon from '../../img/chrome_icon.png'

export default function FooterReworked({
  currentUser,
  collapsed,
  setCollapsed,
  handleSignout,
  tier,
}) {
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false)
  const [isDarkMode, setDarkMode] = useState(localStorage.theme || 'light')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleDarkMode = () => {
    const colorTheme = isDarkMode === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.remove(isDarkMode)
    document.documentElement.classList.add(colorTheme)
    setDarkMode(colorTheme)
    localStorage.setItem('theme', colorTheme)
  }

  return (
    <div className="w-full mx-auto mb-4">
      {!collapsed ? (
        <div>
          <div className="">
            <div className="flex flex-col">
              <div className=" pl-3 md:pl-6  mb-6"></div>
               {/*  {tier!=="premium" && 
                                    <div className="mb-6 hidden lg:flex lg:flex-col text-sm max-w-[200px]">
                                    <p className = "text-zinc-500 dark:text-zinc-200 text-md  w-full w-full pl-10 mb-5 ">Try Premium</p>
                                    <p className = "text-zinc-500 dark:text-zinc-300 text-sm w-full w-full pl-10 ">Upgrade for creative access, more transcription credits, and smarter AI.</p>
                                    <Link to="/plans" className=" text-xs w-full cursor-pointer w-full pl-10 mt-5 text-green-400 dark:text-greenColor">Learn More > </Link>
                                    </div>
                                    } */}
 
              {tier === 'premium' && (
                <div className="mb-6  flex flex-row w-full pl-6 md:pl-10">
                  <p className="text-indigo-400 text-md  ">
                    <span className="mt-1 font-averta-semibold">Premium</span>
                    <VerifiedIcon
                      fontSize="small"
                      className=" ml-2 text-indigo-400 "
                    />
                  </p>
                </div>
              )}
              {localStorage.getItem('logged in') === 'true' ? (
                <Link
                  className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-6 md:pl-10 "
                  to="/account"
                >
                  {/* <PersonIcon className="text-zinc-300 mr-2" fontSize="medium"/> */}
                  <span className="font-averta-semibold">Account</span>
                </Link>
              ) : (
                <Link
                  className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-6 md:pl-10 "
                  to="/plans"
                >
                  <span className="font-averta-semibold">Pricing</span>
                </Link>
              )}
            </div>

            <div className="mt-2 lg:mt-4 pl-6 md:pl-10">
              <Link
                className="text-zinc-500 dark:text-zinc-300 text-sm  font-averta-semibold  w-full cursor-pointer w-[120px]"
                onClick={() => setOpenFeedbackDialog(true)}
              >
                Reach Us
              </Link>
            </div>
            <div className=" mt-2 lg:mt-4 pl-6 md:pl-10">
              <Link
                className="text-zinc-500 dark:text-zinc-300 text-sm font-averta-semibold    w-full cursor-pointer w-[120px]"
                to="/about "
              >
                FAQ
              </Link>
            </div>
          </div>
          <div className="pl-6 md:pl-10 mt-2 lg:mt-4 text-sm cursor-pointer text-zinc-500 dark:text-zinc-300">
            {localStorage.getItem('theme') === 'light' ? (
              <div onClick={handleDarkMode} className=" flex flex-row">
                <p className=" pt-1  font-averta-semibold ">Light </p>
                <svg
                  className=" mt-1 ml-4 duration-200 transition ease-in duration-200 feather feather-sun"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
            ) : (
              <div onClick={handleDarkMode} className="flex flex-row">
                <p className=" pt-1  font-averta-semibold ">Dark</p>

                <svg
                  className=" mt-1 ml-4 duration-200 transition ease-in duration-200 feather feather-moon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </div>
            )}
          </div>
         {/*  <div className="pl-6 md:pl-10 mt-2 lg:mt-4 flex flex-row">
            <Link
              className="text-zinc-500 dark:text-zinc-300 text-sm   w-full cursor-pointer w-[120px] font-averta-semibold"
              to="/privacypolicy"
            >
              Privacy Policy
            </Link>
          </div> */}
          {currentUser !== null && currentUser !== undefined && (
            <div className="pl-6 md:pl-10 mt-2 lg:mt-4 flex flex-row">
              <button
                className="text-zinc-500 dark:text-zinc-300 text-sm cursor-pointer font-averta-semibold"
                onClick={() => handleSignout()}
              >
                Sign Out
              </button>
            </div>
          )}

          <div className="border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-5 mt-5 dark:opacity-40"></div>

          <div className="grid grid-cols-3 justify-items-center px-2 ">
            <a
              href="https://twitter.com/alphyapp"
              className="cursor-pointer"
              target="_blank"
            >
              <TwitterIcon fontSize="small" className="text-[#ced4da]" />
            </a>
            <a href="mailto:support@alphy.app" className="cursor-pointer">
              <EmailIcon fontSize="small" className="text-[#ced4da]" />
            </a>
            <div>
              <a href="https://discord.gg/N4CkQhCVv2" target="_blank">
                <img src={DiscordIcon} className="mt-1" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="pl-4 mb-6 mt-20">
          <div className="mb-6 ">
            <div className="flex flex-col">
              <Link
                className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full"
                to={
                  localStorage.getItem('logged in') === 'true'
                    ? '/account'
                    : '/plans'
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            </div>

            <div className="mt-6">
              <Link
                className="text-zinc-500 dark:text-zinc-300 text-sm    w-full cursor-pointer w-[120px]"
                onClick={() => setOpenFeedbackDialog(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-message-square"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className=" mt-6 text-sm cursor-pointer text-zinc-500  dark:text-zinc-300">
            {localStorage.getItem('theme') === 'light' ? (
              <div onClick={handleDarkMode} className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-sun"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
            ) : (
              <div onClick={handleDarkMode} className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-moon"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </div>
            )}
          </div>
        </div>
      )}

      <Dialog
        maxWidth={'md'}
        fullWidth={true}
        open={openFeedbackDialog}
        onClose={() => setOpenFeedbackDialog(false)}
      >
        <div className="dark:bg-mildDarkMode">
          <FeedbackForm />
        </div>
      </Dialog>
    </div>
  )
}
