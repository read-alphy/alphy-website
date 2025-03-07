import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PanelLeft, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Logo from '../../../public/img/ALPHY_BG_REMOVED_LIGHT.png'
import LogoBlack from '../../../public/img/ALPHY_BG_REMOVED_DARK.png'

function Navbar({ collapsed, setCollapsed }) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)


  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  return (
    <header className="sticky top-0 fixed z-50 w-full bg-white dark:bg-darkMode border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and left side */}
          <div className="flex items-center">
            
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src={Logo} 
                width={36} 
                height={36} 
                alt="Alphy Logo" 
                className="hidden dark:block"
              />
              <Image 
                src={LogoBlack} 
                width={36} 
                height={36} 
                alt="Alphy Logo" 
                className="dark:hidden"
              />
              <span className="text-xl font-bold tracking-tight quicksand">ALPHY</span>
            </Link>
          </div>

        

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
             
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className="mr-2"
                aria-label="Toggle sidebar"
              >
                <PanelLeft className={collapsed ? "" : "rotate-180"} />
              </Button>
            
          </div>
        </div>
      </div>

     
    </header>
  )
}

export default Navbar
