import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const [isDarkMode, setDarkMode] = useState(
    typeof window !== 'undefined' && localStorage.theme ? localStorage.theme : 'light'
  )
  const colorTheme = isDarkMode === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    document.documentElement.classList.remove(colorTheme)
    document.documentElement.classList.add(isDarkMode)

    localStorage.setItem('theme', isDarkMode)
  }, [isDarkMode, colorTheme])

  return [colorTheme, setDarkMode]
}

// Keep the default export for backward compatibility
export default useDarkMode
