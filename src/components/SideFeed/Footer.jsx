'use client'
import Image from 'next/image'
import TwitterIcon from '@mui/icons-material/Twitter'
import EmailIcon from '@mui/icons-material/Email'
import DiscordIcon from '../../../public/img/discord.svg'
import Dialog from '@mui/material/Dialog'
import { useState, useEffect } from 'react'
import FeedbackForm from './FeedbackForm'
import PersonIcon from '@mui/icons-material/Person'
import { useTheme } from "next-themes";


import Link  from 'next/link'

import FooterMenu from './FooterMenu'

export default function Footer({
  currentUser,
  collapsed,
  setCollapsed,
  handleSignout,
  tier,
  loggedIn,
  
}) {
  const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false)
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false)
  
  const [FooterShow, setFooterShow] = useState(false)

  

  const handleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  useEffect(() => {
    setIsClient(true)
  }
  , [])


  return (
    <div className="w-full mx-auto mb-4">
      {!collapsed ? (
        <div>
          {currentUser && (
            <div>
              <div
                className={`${
                  FooterShow ? 'max-h-96' : 'max-h-0'
                } overflow-hidden transition-all duration-300 ease-in-out`}
              >
                <div className="bg-white dark:bg-zinc-900 mx-1 border border-sky-50 dark:border-zinc-800 rounded-lg mb-2 py-4">
                  <FooterMenu
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    setOpenFeedbackDialog={setOpenFeedbackDialog}
                    handleDarkMode={handleDarkMode}
                    currentUser={currentUser}
                    handleSignout={handleSignout}
                    loggedIn={loggedIn}
                    theme= {theme}
                    tier = {tier}
                    isClient = {isClient}
                  />
                </div>
              </div>

             
              <div
                onClick={() => setFooterShow(!FooterShow)}
                className="flex flex-row text-slate-600 dark:text-zinc-200 mx-auto w-full pl-6 font-normal cursor-pointer rounded-lg hover:bg-zinc-100s dark:hover:bg-darkModes py-2 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.2"
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <p className="text-sm lg:text-md select-none quicksand">
                  {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}
                </p>
              </div>
            </div>
          )}

          {currentUser === null && (
            <div className="-ml-2 sm:ml-1 sm:pl-2">
              <FooterMenu
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setOpenFeedbackDialog={setOpenFeedbackDialog}
                handleDarkMode={handleDarkMode}
                currentUser={currentUser}
                handleSignout={handleSignout}
                theme = {theme}
                isClient = {isClient}
              />
            </div>
          )}

<div className=" mt-6 text-sm cursor-pointer text-slate-600 dark:text-zinc-200">
            
          </div>

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
                <Image src={DiscordIcon} className="mt-1" alt="Discord Icon"/>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="pl-4 mb-6 mt-20">
          <div className="mb-6 ">
            <div className="flex flex-col">
              <Link
                className="text-slate-600 dark:text-zinc-200 text-sm w-full cursor-pointer w-full"
                href={
                  loggedIn
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-user"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            </div>

            <div className="mt-6">
              <button
                className="text-slate-600 dark:text-zinc-200 text-sm    w-full cursor-pointer w-[120px]"
                onClick={() => setOpenFeedbackDialog(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
                  />
                </svg>
              </button>
            </div>
          </div>

          {isClient&& (theme==="light" ? (
              <div onClick={handleDarkMode} className="flex flex-row cursor-pointer text-slate-600 dark:text-zinc-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-sun"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-moon"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </div>
            ))}
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
