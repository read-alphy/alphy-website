import { Button, Spinner } from '@material-tailwind/react'
import {useRouter} from 'next/router'

import VerifiedIcon from '@mui/icons-material/Verified'

import Dialog from '@mui/material/Dialog'
import { useState, useRef } from 'react'
import axios from 'axios'
import { API_URL } from '../../../constants'

export default function PremiumCard({
  tier,

  currentUser,

  isYearly,
  getSubscriptionLink,
  subscriptionLinkLoading
  
}) {
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [upgradeLoading, setUpgradeLoading] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [showCouponBox, setShowCouponBox] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const inputRef = useRef(null)

  const handleDialog = () => {
    if (currentUser) {
      if (tier === 'basic') {
        setShowUpgradeDialog(true)
      } else {
        router.push('/plans/checkout?sub=premium')
      }
    } else {
      router.push('/u/login')
    }
  }

  const handleCouponCode = e => {
    setCouponCode(e.target.value)
  }

  const upgradePlan = async () => {
    setErrorMessage('')
    setUpgradeLoading(true)

    await currentUser.getIdToken().then(idToken => {
      axios
        .post(
          `${API_URL}/payments/subscription?subscription_type=premium`,
          {},
          {
            headers: {
              'id-token': idToken,
            },
          }
        )
        .then(r => {
          setUpgradeLoading(false)
          window.location.reload()
        })
        .catch(error => {
          console.log(error)
          setUpgradeLoading(false)
          setErrorMessage('Something went wrong, please try again')
        })
    })
  }

  const handleUpgradeDialog = () => {
    setShowUpgradeDialog(false)
    setErrorMessage('')
  }

  const handleCouponBox = () => {
    if (showCouponBox === false) {
      setShowCouponBox(true)
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    } else {
      setShowCouponBox(false)
    }
  }
  const handlePremiumUpgrade = () => {
    if (currentUser) {
      getSubscriptionLink(isYearly)
    } else {
      navigate('/u/login')
    }
  }



  
  return (
    <div className="relative col-span-2  xs:max-w-[400px] xs:min-w-[400px] xl:max-w-[360px] xl:min-w-[270px] p-4 border border-zinc-700 transform *-translate-y-2* rounded-lg sm:p-8  bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-zinc-900 dark:bg-gradient-to-br dark:border-gray-700 ">
      <div className="flex flex-row">
        <VerifiedIcon fontSize="large" className="-ml-2 text-indigo-400 " />
        <p className="ml-1 mb-4 text-2xl font-averta-semibold text-zinc-900 dark:text-zinc-300">
          Premium
        </p>
      </div>

      {/* <h5 className="mb-4 text-xl font-averta-semibold text-gray-500 dark:text-zinc-300">For Seekers</h5> */}
      
      
    <div className={` transition-all duration-300 overflow-hidden ${isYearly !== true ? " translate-x-[30%] opacity-0 max-h-0" : ""}` }>
        <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-averta-semibold">$</span>
        <span className="text-5xl font-averta-semibold tracking-tight">12</span>
        <span className="ml-1 text-xl font-averta-semibold text-gray-500 dark:text-zinc-300">
        /month 
        </span>
   
      </div>
      </div>
      <div className={` transition-all duration-300 overflow-hidden ${isYearly === true ? " translate-x-[30%] opacity-0 max-h-0" : ""}` }>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-averta-semibold">$</span>
        <span className="text-5xl font-averta-semibold tracking-tight">19.90</span>
        <span className="ml-1 text-xl font-averta-semibold text-gray-500 dark:text-zinc-300">
          /month 
        </span>
      </div>
      </div>  

      
        
      <p className="mt-3 text-gray-400">Experience audiovisual mastery </p>
      <div className={`h-[720px] `}>
        <ul role="list" className="space-y-5 my-7">
        <li className="flex space-x-3">
           
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300 underline">
              Everything on the Starter plan plus:
            </span>
          </li>
          

          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 mt-1 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              20 hours of prioritized transcription credits per month
            </span>
          </li>

          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Upload local audio files
            </span>
          </li>

          
          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Submit YouTube, Twitter Spaces, Twitter videos, Twitch recordings,
              and Apple Podcasts{' '}
            </span>
          </li>
          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Download transcripts
            </span>
          </li>
        
          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Create Unlimited Arcs
            </span>
          </li>

          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Optional credit topups
            </span>
          </li>

          <div className="w-full border-b border-gray-300 dark:border-zinc-700 "></div>

          <li className="flex space-x-3">
            <svg
              aria-hidden="true"
              className="flex-shrink-0 w-5 h-5 text-greenColor"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Check icon</title>
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
            {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
              Full access to Playground:
            </span>
          </li>

          <div className="flex flex-col ml-6 gap-y-4">
            <li className="flex space-x-3">
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-5 h-5 text-greenColor "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check icon</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
              <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
                Generative AI on Transcripts
              </span>
            </li>
            <li className="flex space-x-3">
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-5 h-5 text-greenColor"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check icon</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
              <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
                Create anything   with your own prompts
              </span>
            </li>

            <li className="flex space-x-3">
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-5 h-5 text-greenColor"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Check icon</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
              <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">
                Unlimited access to preset commands
              </span>
            </li>
          </div>

         
        </ul>
      </div>

      
            <button
              onClick={getSubscriptionLink}
              type="button"
              className={`absolute bottom-12 normal-case text-white transition duration-200 ease-in ${
                tier === 'premium' ? 'pointer-events-none text-whiteLike' : ''
              } rounded-lg text-[16px]  drop-shadow-sm  bg-[#4262ff] font-averta-semibold px-5 py-3  justify-center w-[295px] text-center `}
            >{

              subscriptionLinkLoading ? (<Spinner color="white" className=" w-5 text-center margin-auto w-full" />)
            :
            (
              tier === 'premium' ? 'Active' : 'Go Premium'
              )
            }
            </button>
      
         
      
    </div>
  )
}
