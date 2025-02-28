"use client"
import React, { useState, useEffect } from 'react'

import ModeToggle from './ModeToggle'
import HeaderMenu from './HeaderMenu'

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
  
  const [theme, setTheme] = useState(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Try to get from localStorage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      
      // Otherwise, check for system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    
    // Default to light theme
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save theme to localStorage
      localStorage.setItem('theme', theme);
      
      // Apply theme to document
      const root = window.document.documentElement;
      
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      return prevTheme === 'dark' ? 'light' : 'dark';
    });
  };

  return (
    <div
      className={`grid max-w-[800px] lg:w-[800px] grid-cols-2 flex ${
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
       
        {/* Title Section */}
        <div className="flex flex-row ml-1">
          <h2 className="col-span-2 mt-2 text-xl quicksand font-bold lg:max-w-[40vw] text-left lg:col-span-3 text-blueLike dark:bg-darkMode dark:text-zinc-300 font-bold">
            {data.source_type === 'up'
              ? title.substring(0, title.lastIndexOf('.'))
              : title}
          </h2>

          <div className="flex flex-row justify-end mx-auto">
            <HeaderMenu 
              data={data}
              currentUser={currentUser}
              isBookmarked={isBookmarked}
              handleBookmark={handleBookmark}
              handleAddToArchipelago={handleAddToArchipelago}
              userArchipelagoNames={userArchipelagoNames}
              isVisible={isVisible}
              handleVisibility={handleVisibility}
              tier={tier}
              language={language}
              handleLanguageChange={handleLanguageChange}
              reorderedLanguageCodes={reorderedLanguageCodes}
              languages={languages}
              handleReportIssue={handleReportIssue}
              showReportIssue={showReportIssue}
              setShowReportIssue={setShowReportIssue}
              mainPopoverOpen={mainPopoverOpen}
              setMainPopoverOpen={setMainPopoverOpen}
              theme={theme}
            />
          </div>
        </div>

        {/* Creator Info */}
        <div
          className={`${
            isSandbox
              ? 'col-span-2 ml-1 grid grid-cols-2 flex flex-row'
              : 'col-span-2 ml-1 grid grid-cols-2 flex flex-row'
          }`}
        >
          <div className="col-span-1">
            <h2 className="text-lg text-left lg:col-span-3 quicksand font-normal mt-2 text-slate-600 dark:bg-darkMode dark:text-zinc-400 flex flex-row">
              {data.source_type !== 'up' && data.creator_name}
              {data.source_type === 'up' && 'Private Content'}
            </h2>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex flex-row pt-6">
          <ModeToggle 
            isSandbox={isSandbox} 
            setIsSandbox={setIsSandbox} 
          />
        </div>

        <p className="max-w-[800px] mt-5 border border-zinc-100 dark:border-zinc-700"></p>
      </div>
    </div>
  )
}