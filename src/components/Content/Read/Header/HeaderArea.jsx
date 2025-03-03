"use client"
import React, { useState, useEffect } from 'react'

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
  reorderedLanguageCodes,
  isSandbox,

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
    <div className={`flex ${isSandbox && ''}`}>
      <div className="w-full pl-2 xl:mt-0">
        {/* Title Section */}
        <div className="flex flex-row justify-between items-center w-full ml-1">
          <h2 className="mt-2 text-lg quicksand font-bold text-left text-blueLike dark:bg-darkMode dark:text-zinc-300">
            {data.source_type === 'up' ? title.substring(0, title.lastIndexOf('.')) : title}
          </h2>
          <div className="mr-4">
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
        <div className="w-full ml-1">
          <h2 className="text-sm text-left quicksand font-normal mt-2 text-slate-600 dark:bg-darkMode dark:text-zinc-400">
            {data.source_type !== 'up' ? data.creator_name : 'Private Content'}
          </h2>
        </div>
      </div>
    </div>
  )
}