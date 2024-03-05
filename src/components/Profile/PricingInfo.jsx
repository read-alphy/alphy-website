import React from 'react'
import 'tailwindcss/tailwind.css'



import { useState } from 'react'
import Switch, { switchClasses } from '@mui/joy/Switch'
import { useEffect } from 'react'
import {useRouter} from 'next/router'

import ReactLoading from 'react-loading'

import FreeCard from './PricingCards/FreeCard'
import BasicCard from './PricingCards/BasicCard'
import PremiumCard from './PricingCards/PremiumCard'

export default function Pricing({ tier,currentUser }) {
  
  const router = useRouter()

  const [isLoaded, setIsLoaded] = useState(false)
  const [canceledAtPeriodEnd, setCanceledAtPeriodEnd] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const [openPopover1, setOpenPopover1] = useState(false)
  const [isYearly, setIsYearly] = useState(true)

  //Popover
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  }

  const triggers1 = {
    onMouseEnter: () => setOpenPopover1(true),
    onMouseLeave: () => setOpenPopover1(false),
  }

  const themePopover = {
    popover: {
      styles: {
        base: {
          bg: 'bg-white dark:bg-mildDarkMode',
          color: 'text-zinc-600 dark:text-zinc-200',
          border: 'border-2 border-zinc-100 dark:border-mildDarkMode',
        },
      },
    },
  }

  useEffect(() => {
    // can be removed just for debugging

    if (currentUser !== null) {
      router.push('/account')
      setTimeout(() => {
        try {
          setTimeout(() => {
            setIsLoaded(true)
          }, 400)
        } catch (e) {
          console.log(e)
          setTimeout(() => {
            setIsLoaded(true)
          }, 400)
        }
      }, 1200)
    } else {
      setIsLoaded(true)
    }
  }, [currentUser])

  
  return (
    <div className="dark:bg-darkMode  lg:mt-10 md:pl-10 lg:pl-20 xl:pl-20 2xl:pl-0 pb-10">
      {isLoaded ? (
        <div className="dark:bg-darkMode">
          <div className=" w-full pt-20 grid grid-col-3 mb-30 items-center margin-auto">
            <p className="text-center text-blueLike  dark:bg-darkMode dark:text-zinc-300 text-xl md:text-2xl lg:text-3xl font-averta-semibold">
              Choose the best plan for you
            </p>
            <p className="text-center text-zinc-600  dark:bg-darkMode dark:text-zinc-300  md:text-lg mt-6   mb-6 max-w-[600px] items-center justify-center mx-auto">
              Upgrade to have extra transcription credits, submit from multiple
              platforms, upload audio files, and access most capable AI models.
            </p>
            
            <div className="flex flex-row mx-auto w-fit ">
<div className="flex gap-6 flex-row w-fit justify-center my-6  px-4 py-2 rounded-xl xl:pl-20">
  
<p className={`text-lg font-bold ${isYearly ? "text-slate-700 dark:text-white" : " text-indigo-400"}`} >Monthly</p>
        <Switch
      checked={isYearly}
      onChange={() => setIsYearly(!isYearly)}
      sx={(theme) => ({
        '--Switch-thumbShadow': '0 3px 7px 0 rgba(0 0 0 / 0.12)',
        '--Switch-thumbBackground': "#818cf8",
        '--Switch-thumbSize': '27px',
        '--Switch-trackWidth': '70px',
        '--Switch-trackHeight': '30px',
        '--Switch-trackBackground': '#334155',
        [`& .${switchClasses.thumb}`]: {
          transition: 'width 0.2s, left 0.2s',

        },
        '&:hover': {
          
          '--Switch-trackBackground': '#334155',
        },
        '&:active': {
          '--Switch-thumbWidth': '32px',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-thumbBackground': '#818cf8',
          '--Switch-trackBackground': '#334155',
          '&:hover': {
            '--Switch-trackBackground': '#334155', 
          },
        },
      })}
    />
    <p className={`text-lg font-bold ${isYearly===false ? "text-slate-700 dark:text-white" : "text-indigo-400"}`} >
    Yearly (Save 40%)</p>
      

        

  
  </div>
  </div>
          

            <div className="flex gap-10 mx-auto items-center justify-center flex-col xl:flex-row max-w-[1200px]">
              <FreeCard
                currentUser={currentUser}
                tier={tier}
                triggers1={triggers1}
                openPopover1={openPopover1}
                setOpenPopover1={setOpenPopover1}
                canceledAtPeriodEnd={canceledAtPeriodEnd}
                setCanceledAtPeriodEnd={setCanceledAtPeriodEnd}
              />
              {/*  <BasicCard
                currentUser={currentUser}
                tier={tier}
                triggers={triggers}
                openPopover={openPopover}
                setOpenPopover={setOpenPopover}
                canceledAtPeriodEnd={canceledAtPeriodEnd}
                setCanceledAtPeriodEnd={setCanceledAtPeriodEnd}
              /> */}
              <PremiumCard
                currentUser={currentUser}
                tier={tier}
                triggers={triggers}
                openPopover={openPopover}
                setOpenPopover={setOpenPopover}
                canceledAtPeriodEnd={canceledAtPeriodEnd}
                setCanceledAtPeriodEnd={setCanceledAtPeriodEnd}
                isYearly={isYearly}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen  opacity-50 flex justify-center items-center text-center mx-auto pb-40 ">
          <div className="mb-20">
            <ReactLoading type="spinningBubbles" color="blueLike" width={100} />
          </div>
        </div>
      )}
    </div>
  )
}
