import * as React from "react"

const MOBILE_BREAKPOINT = 1024

export function useIsMobile() {
  // Start with false to match SSR, update immediately in useEffect
  const [isMobile, setIsMobile] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    // Mark that we're on the client
    setIsClient(true)
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    // Set initial value immediately on client
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    return () => mql.removeEventListener("change", onChange);
  }, [])

  // During SSR and initial hydration, return false to match server
  // After client-side effect runs, return the actual value
  return isClient ? isMobile : false
}
