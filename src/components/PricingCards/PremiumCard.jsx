import { Button, Spinner } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'
import { Shine } from 'frosted-ui'
import VerifiedIcon from '@mui/icons-material/Verified'

import Dialog from '@mui/material/Dialog'
import { useState, useRef } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'

export default function PremiumCard({
  tier,
  openPopover,
  setOpenPopover,
  currentUser,
  triggers,
}) {
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [upgradeLoading, setUpgradeLoading] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [showCouponBox, setShowCouponBox] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const themePopover = {
    popover: {
      styles: {
        base: {
          bg: 'bg-white dark:bg-mildDarkMode',
          color: 'text-zinc-600 dark:text-zinc-200',
        },
      },
    },
  }

  const handleDialog = () => {
    if (currentUser) {
      if (tier === 'basic') {
        setShowUpgradeDialog(true)
      } else {
        navigate('/plans/checkout?sub=premium')
      }
    } else {
      navigate('/u/login')
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

  return (
    <div className="col-span-2  xs:max-w-[400px] xs:min-w-[400px] xl:max-w-[360px] xl:min-w-[270px] p-4 border border-zinc-700 transform *-translate-y-2* rounded-lg sm:p-8  bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-zinc-900 dark:bg-gradient-to-br dark:border-gray-700 ">
      <div className="flex flex-row">
        <VerifiedIcon fontSize="large" className="-ml-2 text-indigo-400 " />
        <p className="ml-1 mb-4 text-2xl font-averta-semibold text-zinc-900 dark:text-zinc-300">
          Premium
        </p>
      </div>

      {/* <h5 className="mb-4 text-xl font-averta-semibold text-gray-500 dark:text-zinc-300">For Seekers</h5> */}
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-averta-semibold">$</span>
        <span className="text-5xl font-averta-semibold tracking-tight">12</span>
        <span className="ml-1 text-xl font-averta-semibold text-gray-500 dark:text-zinc-300">
          /month
        </span>
      </div>
      <p className="mt-3 text-gray-400">Experience audiovisual mastery </p>
      <div className={`h-[720px]`}>
        <ul role="list" className="space-y-5 my-7">
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
              Unlimited access to Alphy's public database{' '}
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
              Unlimited access to Alphy's arcs
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
              Extra 10 hours of prioritized transcription credits per month
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
              Translate to 30 languages{' '}
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

            <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300 ">
              Smartest AI Models
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
                Access to custom creation
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

          <Shine puffyness="0.5">
            <button
              onClick={handleDialog}
              type="button"
              className={`normal-case text-white transition duration-200 ease-in ${
                tier === 'premium' ? 'pointer-events-none text-whiteLike' : ''
              } rounded-lg text-[16px]  drop-shadow-sm  bg-[#4262ff] font-averta-semibold px-5 py-3 inline-flex  justify-center w-full text-center `}
            >
              {tier === 'premium' ? 'Active' : 'Go Premium'}
            </button>
          </Shine>
        </ul>
      </div>

      <Dialog
        fullWidth={'true'}
        maxWidth={'sm'}
        open={showUpgradeDialog}
        onClose={handleUpgradeDialog}
      >
        <div className="p-10 text-zinc-600 text-sm dark:text-zinc-300 dark:bg-mildDarkMode">
          <p className="text-lg font-averta-semibold ">
            You are about to upgrade to Premium Plan
          </p>
          <div className="mb-6 mt-2 text-lg">$12/month</div>

          <div className="flex flex-col ">
            <ul role="list" className="space-y-5 my-7">
              <li className="flex space-x-3">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-indigo-300 "
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
                  Extra 10 hours of prioritized transcription credits per month
                </span>
              </li>

              <li className="flex space-x-3">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-indigo-300"
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
                  Multi-language translation{' '}
                </span>
              </li>
              <li className="flex space-x-3">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-indigo-300"
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
                  Process Twitter Spaces{' '}
                </span>
              </li>

              <li className="flex space-x-3">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-indigo-300"
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
                  className="flex-shrink-0 w-5 h-5 text-indigo-300"
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
                  className="flex-shrink-0 w-5 h-5 text-indigo-300"
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
                  GPT-4 Access
                </span>
              </li>

              <li className="flex space-x-3">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-5 h-5 text-indigo-300"
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
                  className="flex-shrink-0 w-5 h-5 text-indigo-300"
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
            </ul>

            <div className="flex flex-col">
              {/*             <div>
                                                                            <p onClick={handleCouponBox} className={`cursor-pointer text-indigo-400  font-averta-semiboldd text-md underline mb-2 mt-6`} >Add promotion code</p>
                                                                            </div>
                                                                            <input 
                                                                                        ref={inputRef}
                                                                                            type="text" 
                                                                                            value={couponCode} 
                                                                                            onChange={handleCouponCode} 
                                                                                            onBlur={() => setShowCouponBox(false)}
                                                                                            placeholder="Enter your code here.."
                                                                                            className={`${showCouponBox ? "min-w-[100px] max-w-[200px] opacity-100" :"min-w-[100px] max-w-[200px]  opacity-0 pointer-events-none"} transition duration-300  rounded-lg border border-indigo-300 focus:border-indigo-300 focus:outline-none focus:ring-indigo-300 text-sm`}
                                                                                        />
                                                                                        */}

              <Button
                className={`bg-indigo-300 w-[200px] mt-6 py-3 ${
                  upgradeLoading && 'pointer-events-none opacity-60'
                }`}
                size="md"
                onClick={upgradePlan}
              >
                {upgradeLoading ? (
                  <Spinner
                    color="gray"
                    className="opacity-40 w-5 text-center margin-auto w-full"
                  />
                ) : (
                  <p className="py-1 dark:text-zinc-800 text-md">Upgrade Now</p>
                )}
              </Button>

              {errorMessage.length == 0 ? (
                <p className="items-center margin-auto flex mt-4">
                  You will be charged automatically.
                </p>
              ) : (
                <p className="mt-4 text-red-400">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
