"use client"
import React, { useState, useEffect } from 'react'
import { Clock, BookOpen } from 'lucide-react'

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
  showClip,
  setShowClip,
  showYouTubeFrame,
  handleShowYouTubeFrame,
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

  const [readTime, setReadTime] = useState(0);
  useEffect(() => {
    // Calculate reading time for summary if available
    if (data?.summaries && data.summaries.length > 0 && data.summaries[0]?.summary) {
      let summaryText = '';
      
      // Check if summary is an array that needs mapping
      if (Array.isArray(data.summaries[0].summary)) {
        summaryText = data.summaries[0].summary.map(item => item.summary).join(' ');
      } 
      // Check if summary is already a string
      else if (typeof data.summaries[0].summary === 'string') {
        summaryText = data.summaries[0].summary;
      }
      
      const wordCount = summaryText.split(/\s+/).length;
      const readingTimeMinutes = Math.ceil(wordCount / 200); // Using 200 words per minute
      setReadTime(readingTimeMinutes);
    }
  }, [data]);

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
    <div className={`flex w-full`}>
      <div className="w-full pl-2 xl:mt-0">
        {/* Title Section */}
        <div className="flex flex-row justify-between items-center w-full ml-1">
        
          <h2 className="text-lg quicksand font-bold text-left text-blueLike dark:bg-darkMode dark:text-zinc-300">
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
            toggleTheme={toggleTheme}
            showClip={showClip}
            setShowClip={setShowClip}
            showYouTubeFrame={showYouTubeFrame}
            handleShowYouTubeFrame={handleShowYouTubeFrame}
          />
          </div>
        </div>

        {/* Creator Info */}
        <div className="w-full ml-1">
          <h2 className="text-sm text-left quicksand font-normal mt-2 text-slate-600 dark:bg-darkMode dark:text-zinc-400">
            {data.source_type !== 'up' ? data.creator_name : 'Private Content'}
          </h2>
          {data?.source_mins && (
            <p className="text-xs text-left quicksand font-normal mt-1 text-slate-500 dark:bg-darkMode dark:text-zinc-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" /> {parseInt(data.source_mins)} min content 
              <span className="mx-1">•</span> 
              <BookOpen className="h-3 w-3 mr-1 ml-1" /> {readTime} min read
            </p>
          )}
        </div>
      </div>
    </div>
  )
}