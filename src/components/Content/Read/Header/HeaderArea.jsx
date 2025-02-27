"use client"
import React, { useState, useEffect } from 'react'

import ModeToggle from './ModeToggle'
import HeaderMenu from './HeaderMenu'
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
  handleAddToArc,
  userArcNames,
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
  console.log('HeaderArea - Component Rendering', { 
    data, 
    title, 
    tier, 
    isVisible, 
    isBookmarked, 
    currentUser, 
    language, 
    modelName, 
    isSandbox 
  });
  
  const [theme, setTheme] = useState(() => {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      console.log('HeaderArea - Initializing theme from localStorage or system preference');
      // Try to get from localStorage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        console.log('HeaderArea - Found theme in localStorage:', savedTheme);
        return savedTheme;
      }
      
      // Otherwise, check for system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('HeaderArea - Using system preference: dark theme');
        return 'dark';
      }
    }
    
    // Default to light theme
    console.log('HeaderArea - Using default light theme');
    return 'light';
  });

  useEffect(() => {
    console.log('HeaderArea - Theme changed:', theme);
    if (typeof window !== 'undefined') {
      // Save theme to localStorage
      localStorage.setItem('theme', theme);
      console.log('HeaderArea - Saved theme to localStorage:', theme);
      
      // Apply theme to document
      const root = window.document.documentElement;
      
      if (theme === 'dark') {
        console.log('HeaderArea - Applying dark theme to document');
        root.classList.add('dark');
      } else {
        console.log('HeaderArea - Applying light theme to document');
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    console.log('HeaderArea - Toggle theme called, current theme:', theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      console.log('HeaderArea - Setting new theme:', newTheme);
      return newTheme;
    });
  };

  console.log('HeaderArea - Rendering with transcript length:', transcript.length);
  console.log('HeaderArea - Summary defined:', summary !== undefined);
  console.log('HeaderArea - Language match with summary:', summary !== undefined && language === summary.lang);

  return (
    <div
      className={`grid max-w-[800px] lg:w-[800px] grid-cols-2 flex ${
        isSandbox && ''
      }`}
    >
      {console.log('HeaderArea - Rendering main container, isSandbox:', isSandbox)}
      <div
        className={`col-span-2 pl-2 lg:col-span-3 xl:mt-0 ${
          transcript.length > 0 &&
          summary != undefined &&
          language == summary.lang
            ? 'xl:col-span-2'
            : 'xl:col-span-3'
        }`}
      >
        {console.log('HeaderArea - Rendering inner container with column span logic')}
        {/* Processing Tier Info */}
        <div id="processing-tier" className={`${isSandbox && ''}`}>
          {console.log('HeaderArea - Processing tier section, modelName:', modelName)}
          {modelName === 'HIGH' && (
            <div className="relative flex flex-col">
              {console.log('HeaderArea - Rendering HIGH tier badge')}
              <div className="relative flex flex-row group cursor-default">
                <WorkspacePremiumIcon className="text-indigo-400" />
                <p className="text-indigo-400 ml-2 quicksand font-bold">
                  Premium Processing
                </p>
                <span className="absolute opacity-0 quicksand font-bold group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-slate-500 dark:text-zinc-300 text-sm rounded py-1 px-2 left-0 md:bottom-full z-50 mb-2 ml-4">
                  This content was processed with advanced AI models accessible
                  to Premium.
                </span>
              </div>
            </div>
          )}

          {modelName === 'MID' && (
            <div className="relative flex flex-col">
              {console.log('HeaderArea - Rendering MID tier badge')}
              <div className="relative flex flex-row group cursor-default">
                <MemoryIcon className="text-gray-500" />
                <p className="text-gray-500 ml-2 quicksand font-bold">
                  Standard Processing
                </p>
                <span className="absolute opacity-0 quicksand font-bold group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-slate-500 dark:text-gray-300 text-sm rounded py-1 px-2 md:bottom-full z-50 mb-2 ml-4">
                  This content was processed with standard AI models.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Title Section */}
        <div className="flex flex-row ml-1">
          {console.log('HeaderArea - Rendering title section, source_type:', data.source_type)}
          <h2 className="col-span-2 mt-2 text-xl quicksand font-bold lg:max-w-[40vw] text-left lg:col-span-3 text-blueLike dark:bg-darkMode dark:text-zinc-300 font-bold">
            {data.source_type === 'up'
              ? title.substring(0, title.lastIndexOf('.'))
              : title}
          </h2>

          
          <div className="flex flex-row justify-end mx-auto">
            {console.log('HeaderArea - Rendering HeaderMenu')}
            <HeaderMenu 
              data={data}
              currentUser={currentUser}
              isBookmarked={isBookmarked}
              handleBookmark={handleBookmark}
              handleAddToArc={handleAddToArc}
              userArcNames={userArcNames}
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
          {console.log('HeaderArea - Rendering creator info, source_type:', data.source_type)}
          <div className="col-span-1">
            <h2 className="text-lg text-left lg:col-span-3 quicksand font-normal mt-2 text-slate-600 dark:bg-darkMode dark:text-zinc-400 flex flex-row">
              {data.source_type !== 'up' && data.creator_name}
              {data.source_type === 'up' && 'Private Content'}
            </h2>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex flex-row pt-6">
          {console.log('HeaderArea - Rendering ModeToggle, isSandbox:', isSandbox)}
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