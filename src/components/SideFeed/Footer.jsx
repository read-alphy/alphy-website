'use client'
import Image from 'next/image'
import { Twitter, Mail, User, Users, Sun, Moon, LayoutDashboard, MessageSquare} from 'lucide-react'
import { useState, useEffect } from 'react'
import FeedbackForm from './FeedbackForm'
import { useTheme } from "next-themes"
import Link from 'next/link'
import FooterMenu from './FooterMenu'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {useDarkMode} from "@/hooks/useDarkMode"

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
  const [colorTheme, setDarkMode] = useDarkMode();

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(colorTheme);
    setTheme(theme === "light" ? "dark" : "light");
  }

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
                <div className="bg-white dark:bg-zinc-900 mx-1 border border-sky-50 dark:border-zinc-800 rounded-lg mb-2 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                  <FooterMenu
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    setOpenFeedbackDialog={setOpenFeedbackDialog}
                    handleDarkMode={toggleDarkMode}
                    currentUser={currentUser}
                    handleSignout={handleSignout}
                    loggedIn={loggedIn}
                    theme={theme}
                    tier={tier}
                    isClient={isClient}
                  />
                </div>
              </div>

              <div
                onClick={() => setFooterShow(!FooterShow)}
                className="flex flex-row text-slate-600 dark:text-zinc-200 mx-auto w-full font-normal cursor-pointer rounded-lg hover:bg-zinc-100s dark:hover:bg-darkModes py-2 transition duration-300 ease-in-out"
              >
                
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4" />
          </div>
          <div className="transition-opacity duration-300 group-data-[collapsible=icon]:opacity-0">
            <p className="text-sm font-medium">{currentUser.displayName
                    ? currentUser.displayName.substring(0, 15) + (currentUser.displayName.length > 15 ? "..." : "")
                    : currentUser.email.substring(0, 15) + (currentUser.email.length > 15 ? "..." : "")}</p>
          
          </div>
        </div>
    
              </div>
            </div>
          )}

          {currentUser === null && (
            <div className="-ml-2 sm:ml-1 sm:pl-2">
              <FooterMenu
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                setOpenFeedbackDialog={setOpenFeedbackDialog}
                handleDarkMode={toggleDarkMode}
                currentUser={currentUser}
                handleSignout={handleSignout}
                theme={theme}
                isClient={isClient}
              />
            </div>
          )}

          <div className="mt-2 text-sm cursor-pointer text-slate-600 dark:text-zinc-200">
            
          </div>

          <div className="border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-2 mt-2 dark:opacity-40"></div>

          <div className="grid grid-cols-3 justify-items-center px-2 opacity-70">
            <a
              href="https://twitter.com/alphyapp"
              className="cursor-pointer hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors p-1.5 rounded-full bg-slate-50 dark:bg-zinc-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={16} className="text-slate-500 dark:text-zinc-400" />
            </a>
            <a 
              href="mailto:support@alphy.app" 
              className="cursor-pointer hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors p-1.5 rounded-full bg-slate-50 dark:bg-zinc-900"
            >
              <Mail size={16} className="text-slate-500 dark:text-zinc-400" />
            </a>
            <Link 
              href="/blog"
              className="cursor-pointer hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors p-1.5 rounded-full bg-slate-50 dark:bg-zinc-900"
            >
              <LayoutDashboard size={16} className="text-slate-500 dark:text-zinc-400" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="pl-2 mb-6 mt-20">
          <div className="mb-6">
            <div className="flex flex-col">
              <Link
                className="text-slate-600 dark:text-zinc-200 text-sm w-full cursor-pointer"
                href={
                  loggedIn
                    ? '/account'
                    : '/plans'
                }
              >
                <User size={18} strokeWidth={2} />
              </Link>
            </div>

            <div className="mt-6">
              <button
                className="text-slate-600 dark:text-zinc-200 text-sm w-full cursor-pointer w-[120px]"
                onClick={() => setOpenFeedbackDialog(true)}
              >
                <MessageSquare size={16} className="text-slate-500 dark:text-zinc-400" />
              </button>
            </div>
          </div>

         {/*  {isClient && (theme === "light" ? (
            <div onClick={() => {
              setDarkMode(true);
              setTheme(theme === "light" ? "dark" : "light");
            }} className="flex flex-row cursor-pointer text-slate-600 dark:text-zinc-200">
              <Sun size={18} strokeWidth={2} />
            </div>
          ) : (
            <div onClick={() => {
              setDarkMode(true);
              setTheme(theme === "light" ? "dark" : "light");
            }} className="flex flex-row cursor-pointer text-slate-600 dark:text-zinc-200">
              <Moon size={18} strokeWidth={2} />
            </div>
          ))} */}
        </div>
      )}

      <Dialog open={openFeedbackDialog} onOpenChange={setOpenFeedbackDialog}>
        <DialogContent className="sm:max-w-md dark:bg-mildDarkMode">
          <FeedbackForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
