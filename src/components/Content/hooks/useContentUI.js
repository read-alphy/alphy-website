import { useState, useEffect } from 'react'

export const useContentUI = () => {
  const [mainPopoverOpen, setMainPopoverOpen] = useState(false)
  const [mainPopoverOpenSmall, setMainPopoverOpenSmall] = useState(false)
  const [isPastMainPopoverOpenThreshold, setIsPastMainPopoverOpenThreshold] = useState(false)
  const [showScrollBackButton, setShowScrollBackButton] = useState(false)
  const [downloading, setDownloading] = useState(false)
  
  // Theme configuration for popovers
  const themePopover = {
    popover: {
      styles: {
        base: {
          bg: 'bg-white dark:bg-mildDarkMode',
          color: 'text-blue-gray-500 dark:text-zinc-200',
          border: 'border dark:border-zinc-600',
        },
      },
    },
  }
  
  return {
    mainPopoverOpen,
    setMainPopoverOpen,
    mainPopoverOpenSmall,
    setMainPopoverOpenSmall,
    isPastMainPopoverOpenThreshold,
    setIsPastMainPopoverOpenThreshold,
    showScrollBackButton,
    setShowScrollBackButton,
    downloading,
    setDownloading,
    themePopover
  }
}