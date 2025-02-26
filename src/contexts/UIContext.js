import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

const UIContext = createContext();

export function UIProvider({ children, initialData = {} }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  
  // Media data state
  const [data, setData] = useState(initialData.data || null);
  
  // User state
  const [currentUser, setCurrentUser] = useState(initialData.currentUser || null);
  
  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState(initialData.isBookmarked || false);
  
  // Archipelago/Arc state
  const [userArchipelagoNames, setUserArchipelagoNames] = useState(
    initialData.userArchipelagoNames || []
  );
  
  // Visibility state
  const [isVisible, setIsVisible] = useState(initialData.isVisible || true);
  
  // Language state
  const [language, setLanguage] = useState(initialData.language || 'en');
  const [languages, setLanguages] = useState(initialData.languages || []);
  const [reorderedLanguageCodes, setReorderedLanguageCodes] = useState(
    initialData.reorderedLanguageCodes || {}
  );
  
  // Report issue state
  const [showReportIssue, setShowReportIssue] = useState(false);
  
  // Popover state
  const [mainPopoverOpen, setMainPopoverOpen] = useState(false);
  
  // Mobile state
  const [isMobile, setIsMobile] = useState(false);
  
  // Sandbox state
  const [isSandbox, setIsSandbox] = useState(initialData.isSandbox || false);
  
  // Define callbacks for actions
  const handleBookmark = useCallback(() => {
    setIsBookmarked(prev => !prev);
    // Additional logic to save bookmark state to backend
  }, []);
  
  const handleAddToArchipelago = useCallback((archipelagoId, isNew) => {
    // Logic to add to archipelago
    console.log(`Adding to archipelago: ${archipelagoId}, isNew: ${isNew}`);
    setMainPopoverOpen(false);
  }, []);
  
  const handleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
    // Additional logic to update visibility on backend
  }, []);
  
  const handleLanguageChange = useCallback((event) => {
    setLanguage(event.target.value);
    // Additional logic for language change
  }, []);
  
  const handleReportIssue = useCallback(() => {
    setShowReportIssue(true);
    setMainPopoverOpen(false);
  }, []);
  
  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    // State
    theme,
    setTheme,
    data,
    setData,
    currentUser,
    setCurrentUser,
    isBookmarked,
    setIsBookmarked,
    userArchipelagoNames,
    setUserArchipelagoNames,
    isVisible,
    setIsVisible,
    language,
    setLanguage,
    languages,
    setLanguages,
    reorderedLanguageCodes,
    setReorderedLanguageCodes,
    showReportIssue,
    setShowReportIssue,
    mainPopoverOpen,
    setMainPopoverOpen,
    isMobile,
    setIsMobile,
    isSandbox,
    setIsSandbox,
    
    // Handlers
    handleBookmark,
    handleAddToArchipelago,
    handleVisibility,
    handleLanguageChange,
    handleReportIssue,
    
    // Additional data
    tier: initialData.tier || 'free',
  }), [
    theme, data, currentUser, isBookmarked, userArchipelagoNames,
    isVisible, language, languages, reorderedLanguageCodes,
    showReportIssue, mainPopoverOpen, isMobile, isSandbox,
    handleBookmark, handleAddToArchipelago, handleVisibility,
    handleLanguageChange, handleReportIssue, initialData.tier
  ]);
  
  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}