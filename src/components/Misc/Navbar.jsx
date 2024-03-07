import React, { useEffect, useR } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'

import Logo from '../../../public/img/ALPHY_BG_REMOVED_LIGHT.png'
import LogoBlack from '../../../public/img/ALPHY_BG_REMOVED_DARK.png'
import Image from 'next/image'

function Navbar({ collapsed, setCollapsed }) {
  const router = useRouter()
  
  
  
  

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    const handleResize = () => {}

    window.addEventListener('resize', handleResize)

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


 

  // boolean to check if the user is in the /yt/id or /sp/id
  const isYt = router.asPath.includes('/yt')
  const isSp = router.asPath.includes('/sp')
  const isUp = router.asPath.includes('/up')
  const isArc = router.asPath.includes('/arc')
  const isHub = router.asPath.includes('/hub')

  return (
    <div
      className={`items-center ${
        isYt || isSp || isUp || isArc || isHub ? '' : ''
      } justify-between dark:bg-darkMode pb-2	`}
    >
      <div
        className={`flex  justify-between flex-row top-0 z-40 text-blueLike bg-white   dark:text-zinc-300 dark:text-gray-200 text-sm md:text-md font-normal ${
          isYt || isSp || isUp || isArc || isHub
            ? 'h-[8vh] min-h-[40px]'
            : 'h-[8vh] min-h-[40px]'
        } dark:bg-darkMode`}
      >
        <div
          className={`flex mt-4 font-bold ${
            collapsed == false && 'lg:pl-4'
          } ${
            !collapsed
              ? 'lg:bg-zinc-100 dark:lg:bg-mildDarkMode'
              : ''
          } `}
        >
          {collapsed == true && isArc && (
            <div
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex cursor-pointer bg-zinc-100 dark:bg-mildDarkMode min-w-[32px] max-w-[32px]"
            ></div>
          )}
          <Link href={'/'} className="text-zinc-800 dark:text-gray-200 pl-4 ">
            <div className="flex-row flex">
              <Image src={Logo} width={40} className="hidden dark:block"
              alt="Alphy Logo"
              ></Image>
              <Image
                src={LogoBlack}
                width={40}
                className="dark:hidden opacity-80 "
                alt="Alphy Logo"
              ></Image>
              <h1 className="ml-1 mt-1 text-2xl">ALPHY</h1>
            </div>
          </Link>

          {isArc ? (
            <div
              onClick={() => setCollapsed(!collapsed)}
              className={`hidden lg:flex rounded-full bg-opacity-0 hover:bg-opacity-60 hover:bg-zinc-200 dark:hover:bg-zinc-700 ml-40  mr-4 p-1 transition duration-300 ease-in-out ${
                collapsed
                  ? ' lg:hidden bg-slate-50 dark:bg-darkMode'
                  : ' bg-zinc-100 dark:bg-mildDarkMode  justify-end  '
              }  `}
            >
              <button>
                <svg
                  className={`${
                    !collapsed && 'rotate-180'
                  } opacity-50 hover:opacity-40 duration-200 ease-in-out transform`}
                  width={30}
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        <div className={`flex `}>
          <div>
            <div className="flex flex-row mt-6 dark:text-gray-300 ">
              <div
                id={'nav-icon3'}
                onClick={() => setCollapsed(!collapsed)}
                className={`block cursor-pointer col-span-3 mr-5 lg:hidden ${
                  collapsed ? ' ' : ' open '
                } `}
              >
                <span className="bg-zinc-700 dark:bg-zinc-200"></span>
                <span className="bg-zinc-700 dark:bg-zinc-200"></span>
                <span className="bg-zinc-700 dark:bg-zinc-200"></span>
                <span className="bg-zinc-700 dark:bg-zinc-200"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`w-screen   transition origin-top-right transform lg:hidden ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>
    </div>
  )
}

export default Navbar
