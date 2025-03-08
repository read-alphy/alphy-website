import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MediaSourceLink from './MediaSourceLink';
import ArchipelagoMenu from './ArchipelagoMenu';
import VisibilityToggle from './VisibilityToggle';
import BookmarkButton from './BookmarkButton';
import LanguageSelector from './LanguageSelector';
import ReportIssueButton from './ReportIssueButton';

export default function HeaderMenu({ 
  data, 
  currentUser, 
  isMobile, 
  handleLanguageChange, 
  theme,
  isVisible,
  handleVisibility,
  tier,
  showReportIssue,
  setShowReportIssue,
  handleReportIssue,
  isBookmarked,
  handleBookmark,
  handleAddToArchipelago,
  userArchipelagoNames,
  language,
  reorderedLanguageCodes,
  languages,
  mainPopoverOpen,
  setMainPopoverOpen
}) {  
  console.log(mainPopoverOpen)
  // Modern gear icon with simpler design
  const MenuIcon = () => (
    <svg
      className="cursor-pointer text-slate-700 dark:text-zinc-300 hover:opacity-80 transition-opacity duration-200"
      width={24}
      height={24}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );

  const Divider = () => (
    <div className="border-b border-gray-100 dark:border-zinc-700 mx-auto w-full my-3 dark:opacity-40"></div>
  );

  return (
    <Popover open={mainPopoverOpen} onOpenChange={setMainPopoverOpen}>
      <PopoverTrigger asChild>
        <div 
          className={`flex mt-5 lg:mt-8 mr-4
            rounded-full p-2.5 bg-slate-50 dark:bg-zinc-800 
            transition-colors duration-200 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-800`}
          aria-label="Menu"
          role="button"
          tabIndex="0"
        >
          <MenuIcon />
        </div>
      </PopoverTrigger>
      <PopoverContent className="dark:bg-zinc-800 dark:border-zinc-700 bg-white rounded-lg shadow-lg p-4 max-w-xs w-64 border border-gray-200">
        <div className="space-y-2">
          {/* Media Source Link */}
          <MediaSourceLink data={data} theme={theme} />
          
          {data?.source_type && <Divider />}

          {/* Add to Arc/Archipelago */}
          <div className="transform hover:scale-102 transition-transform duration-200 py-1">
            <ArchipelagoMenu handleAddToArchipelago={handleAddToArchipelago} userArchipelagoNames={userArchipelagoNames} theme={theme} />
          </div>

          {/* Visibility Toggle (only for content owners) */}
          {data?.source_type === 'up' &&
            data !== undefined &&
            data !== null &&
            currentUser !== null &&
            data.submitter_id === currentUser.uid && (
              <>
                <Divider />
                <div className="transform hover:scale-102 transition-transform duration-200 py-1">
                  <VisibilityToggle 
                    isVisible={isVisible} 
                    handleVisibility={handleVisibility} 
                    tier={tier} 
                    theme={theme} 
                  />
                </div>
              </>
          )}

          <Divider />

          {/* Bookmark Button */}
          <div className="transform hover:scale-102 transition-transform duration-200 py-1">
            <BookmarkButton isBookmarked={isBookmarked} handleBookmark={handleBookmark} currentUser={currentUser} data={data} />
          </div>
          
          {currentUser && 
            data && 
            data.submitter_id !== currentUser.uid && (
              <Divider />
          )}
          
          {/* Language Selector */}
          <div className="transform hover:scale-102 transition-transform duration-200 py-1">
            <LanguageSelector handleLanguageChange={handleLanguageChange} language={language} reorderedLanguageCodes={reorderedLanguageCodes} languages={languages} theme={theme} />
          </div>

          <Divider />

          {/* Report Issue Button */}
          <div className="transform hover:scale-102 transition-transform duration-200 py-1">
            <ReportIssueButton 
              handleReportIssue={handleReportIssue}
              showReportIssue={showReportIssue}
              setShowReportIssue={setShowReportIssue}
              currentUser={currentUser}
              data={data}
              theme={theme}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}