import React, { useState, useRef, useCallback } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Button } from '@material-tailwind/react'
import { useDropzone } from 'react-dropzone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import VerifiedIcon from '@mui/icons-material/Verified'
import { API_URL } from '../../../constants'
import ConvertPrivately from '../../../public/img/convertprivately.png'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Image from 'next/image'

export default function UploadBlock({
  currentUser,
  tier,
  credit,
  handleGoBack,
}) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadDuration, setUploadDuration] = useState('')
  const [uploadTitle, setUploadTitle] = useState('')
  const [file, setFile] = useState(null)
  const [fileUploading, setFileUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const audioRef = useRef(null)
  const router = useRouter()

  const navigateCredit = () => {
    sessionStorage.setItem('creditPurchase', 'true')
    router.push('/account')
  }

  const handleFileUpload = event => {
    setErrorMessage(false)
    const uploadFile = event.target.value

    const formData = new FormData()
    formData.append('file', uploadFile)
    setFile(formData)
    const audio = audioRef.current
    audio.src = URL.createObjectURL(uploadFile)
    audio.onloadedmetadata = () => {
      setUploadDuration(audio.duration)

      setUploadTitle(uploadFile.name)
    }
  }

  const handleFileUploadByDrop = files => {
    setErrorMessage(false)

    const file = files[0]
    const allowedExtensions = [
      '.mp3',
      '.m4a',
      '.mpga',
      '.mpeg',
      '.wav',
      '.webm',
    ]
    const fileExtension = file.name
      .substring(file.name.lastIndexOf('.'))
      .toLowerCase()
    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage(true)
      return
      // You can display an error message or take other actions here
    }

    const formData = new FormData()
    formData.append('file', file)
    setFile(formData)
    const audio = audioRef.current
    audio.src = URL.createObjectURL(file)
    audio.onloadedmetadata = () => {
      setUploadDuration(audio.duration)
      setUploadTitle(file.name)
    }
  }

  const handlePostUpload = () => {
    setFileUploading(true)

    axios
      .post(`${API_URL || 'http://localhost:3001'}/sources/upload`, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'id-token': currentUser.accessToken,
        },
        onUploadProgress: progressEvent => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )

          setUploadProgress(progress)
        },
      })
      .then(response => {
        // Handle the response after successful upload
        const responsed = response.data

        navigate('/up/' + responsed.source_id)
        //page'e navige et
      })
      .catch(error => {
        console.log(error)

        setErrorMessage(true)
        handleFileUploadClear()
        // Handle any errors that occur during upload
        console.error(error)
      })
  }

  const handleFileUploadClear = () => {
    setFile(null)
    setUploadProgress(0)
    setUploadDuration('')
    setUploadTitle('')
    setFileUploading(false)
  }

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the dropped files

    handleFileUploadByDrop(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div className="mt-10 sm:mt-20 text-zinc-700 h-full p-5 dark:text-zinc-300 max-w-[1000px] mx-auto items-center  justify-center sm:px-20">
      <div className="mb-10">
        <p
          onClick={() => handleGoBack()}
          className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 duration-200  ease-in transition cursor-pointer"
        >
          <KeyboardArrowLeftIcon fontSize="small" className="" />
          <span className="text-sm  font-averta-semibold">Go Back</span>
        </p>
      </div>
      <div className="pb-4 ">
        <div className="flex mx-auto   text-indigo-400 text-sm font-bold mb-10">
          <VerifiedIcon className="mr-1 " />
          <span>PREMIUM</span>
        </div>
        <p className="dark:text-zinc-200 text-zinc-700 mb-4 text-lg font-averta-semibold">
          Upload an audio file (MP3, M4A, MPGA, MPEG, WAV, or WEBM)
        </p>
        {/*    <p className="dark:text-zinc-500 text-zinc-500 mb-6 text-md font-averta-semibold">
          As we value your privacy, we immediately delete your audio files after
          transcription, and we make sure Alphy's summary, transcription, and
          chatbot are only accessible to you and no one else.
        </p> */}
      </div>

      {file === null ? (
        tier === 'premium' ? (
          <div className="flex items-center justify-center w-full">
            <label
              {...getRootProps()}
              for="dropzone-file"
              className={`flex flex-col items-center justify-center w-full border-2 border-zinc-00 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-mildDarkMode hover:opacity-80 dark:border-gray-600 dark:hover:border-gray-700 dark:hover:bg-zinc-800 transition duration-200 ease-in `}
            >
              <div
                className={`flex flex-col items-center justify-center pt-5 pb-6 min-w-[200px] ${
                  isDragActive ? '' : ''
                }`}
              >
                {!isDragActive ? (
                  <div className="items-center justify-center flex flex-col px-2">
                    {!errorMessage ? (
                      <div className="items-center justify-center flex flex-col">
                        <CloudUploadIcon
                          fontSize="large"
                          className="text-indigo-400 mb-4 "
                        />

                        <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-300">
                          <span className="font-semibold">
                            Click to upload an audio file
                          </span>{' '}
                          or drag and drop.
                        </p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                          {' '}
                          We accept MP3, M4A, MPGA, MPEG, WAV, or WEBM
                        </p>
                      </div>
                    ) : (
                      <div className="items-center justify-center flex flex-col">
                        <p className="mb-2 text-sm text-red-500">
                          <span className="">
                            Please make sure you submit one of the following
                            file types!
                          </span>
                        </p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                          {' '}
                          We accept MP3, M4A, MPGA, MPEG, WAV, or WEBM
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="items-center justify-center flex flex-col items-center">
                    <svg
                      className="w-10 h-10 mb-3 text-zinc-600 dark:text-zinc-300 items-center flex"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-300 font-sans">
                      <strong>Drop your file here. </strong>
                    </p>
                  </div>
                )}
              </div>

              <input
                {...getInputProps()}
                className="hidden"
                accept=".mp3,.wav,.mpeg,.m4a,.webm,.mpga"
              />
              <input
                onChange={handleFileUpload}
                type="file"
                className="hidden"
                accept=".mp3,.wav,.mpeg,.m4a,.webm,.mpga"
              />

              <audio className="hidden" ref={audioRef} controls />
            </label>
          </div>
        ) : (
          <div>
            <div className="flex flex-col  col-span-2 mx-auto items-center">
              <p className="text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l  mb-5 w-full  font-averta-semibold col-span-2">
                You need to go{' '}
                <Link
                  className="text-indigo-400 underline font-bold"
                  href="/account"
                >
                  premium
                </Link>{' '}
                to upload personal files.
              </p>
            </div>
          </div>
        )
      ) : (
        <div className="rounded-xl dark:border-darkMode  pr-10 pt-10 font-semibold ">
          <p
            className={`flex flex-row font-sans text-zinc-500 dark:text-zinc-400  ${
              uploadProgress > 0 ? 'italic' : 'underline'
            } `}
          >
            {' '}
            {uploadProgress > 0 && uploadProgress !== 100
              ? 'Sending to Alphy...'
              : 'Process another file instead'}
            <svg
              onClick={handleFileUploadClear}
              className={`${
                uploadProgress > 0 && !errorMessage
                  ? 'opacity-40 pointer-events-none'
                  : ' cursor-pointer '
              } ml-2`}
              width="20px"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title className="font-bold">Clear</title>
              <path
                clipRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                fillRule="evenodd"
              ></path>
            </svg>
          </p>
          <div className="lg:flex lg:flex-row lg:grid lg:grid-cols-5">
            <p className="lg:col-span-2 flex  items-center font-sans text-zinc-500 dark:text-zinc-300 mt-8 lg:mt-0 ">
              {' '}
              {uploadTitle}
            </p>
            {/* 					<p className="text-sm text-zinc-600 dark:text-zinc-300 "> 

        Duration: {Math.floor(uploadDuration/60)}.{Math.floor(uploadDuration%60)} minutes

        </p> */}
            {/*  */}
            <div className="lg:col-span-2 mt-2 ">
              <div className="lg:grid lg:grid-cols-3">
                <div className="lg:col-span-3 hidden lg:flex  lg:justify-center lg:mt-2 ">
                  {/* <Progress className={`${uploadProgress===0 ? "hidden" : "w-5/6"}`} color="green"  size="lg" value={uploadProgress} label={uploadProgress} /> */}
                  <div
                    className={`${
                      uploadProgress === 0 && 'hidden'
                    } w-5/6 bg-gray-200 rounded-full h-3 dark:bg-gray-700 mt-2`}
                  >
                    <div
                      className={`bg-indigo-400 h-3 rounded-full `}
                      style={{ width: uploadProgress + '%' }}
                    ></div>
                  </div>
                  {/*  */}{' '}
                  {fileUploading === false && (
                    <p className="text-sm  text-zinc-500 dark:text-zinc-300 italic font-sans w-full flex justify-center lg:mt-2">
                      Click continue to process the file...
                    </p>
                  )}
                  {/* <Progress className={`${uploadProgress>0 && "hidden"}`}color="gray" size="lg" value={100} label={0} /> */}
                </div>
                {/* 	<div className="sm:col-span-1 text-sm flex justify-center font-sans  text-zinc-500 dark:text-zinc-300">
    {Math.floor(uploadDuration/60)}.{Math.floor(uploadDuration%60)} minutes
        </div> */}
              </div>
            </div>

            <div className="col-span-1 flex flex-col lg:flex-row lg:items-center lg:justify-center  lg:margin-auto">
              {fileUploading === 0 && (
                <p className="text-sm  text-zinc-500 dark:text-zinc-300 italic font-sans my-4 lg:hidden">
                  Click continue to process the file...
                </p>
              )}
              <div
                className={`${
                  uploadProgress === 0 && 'hidden'
                } my-4 lg:hidden w-5/6 bg-gray-200 rounded-full h-3 dark:bg-gray-700`}
              >
                <div
                  className={`bg-indigo-400 h-3 rounded-full w-[${uploadProgress}%]`}
                  style={{ width: uploadProgress + '%' }}
                ></div>
              </div>
              {/* <Progress className={`${uploadProgress===0 ? "hidden" : "w-5/6"} lg:hidden my-4`} color="green"  size="lg" value={uploadProgress} label={uploadProgress} />
               */}
              {fileUploading ? (
                <p className=" text-zinc-600 dark:text-zinc-300 text-sm font-sans italic my-4">
                  <p
                    className={`text-sm font-sans ${
                      errorMessage
                        ? 'text-red-400 dark:text-400'
                        : 'text-zinc-500 dark:text-zinc-300'
                    }`}
                  >
                    {uploadProgress !== 100
                      ? `Uploading... ${uploadProgress}% `
                      : errorMessage
                      ? 'There was an error. Please try again.'
                      : `Complete!`}
                  </p>{' '}
                </p>
              ) : (
                <div className="flex flex-row">
                  {' '}
                  {/* <p className="lg:hidden">You are about to process this file.</p> */}
                  <Button
                    onClick={handlePostUpload}
                    className="bg-indigo-400 lg:ml-10 normal-case max-w-[100px] my-4 text-zinc-100 dark:text-zinc-700"
                  >
                    Continue
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {tier === 'premium' && file !== null && (
        <div className={`${file !== null && 'mt-10'}`}>
          <div className="border-b border-gray-200 dark:border-gray-600 mx-auto items-center flex mb-5 mt-5"></div>
          <div className="flex-col flex">
            <div className="flex flex-row">
              <a
                href="/account"
                className=" text-zinc-500 dark:text-zinc-400 font-averta-semibold"
              >
                {tier === 'free' && 'Starter Plan'}
                {tier === 'basic' && 'Basic Plan'}
                {tier === 'premium' && 'Premium Plan'}
              </a>
              <p className="ml-1 mr-1"> - </p>
              <p className="text-zinc-500 dark:text-zinc-400 font-averta-semibold">
                {' '}
                Remaining Credits : {Math.floor(credit)} minutes
              </p>
            </div>

            <div className="mt-8 mb-8  flex flex-col text-sm">
              <p
                className={`text-zinc-500 dark:text-zinc-400 mr-2  font-averta-semibold`}
              >
                Need more credits?{' '}
              </p>

              <div className="flex flex-col ">
                <p
                  onClick={navigateCredit}
                  size="sm"
                  className={` ${
                    tier === 'basic' || tier === 'premium'
                      ? ''
                      : 'pointer-events-none opacity-50'
                  } cursor-pointer mt-4 w-[100px] font-averta-semibold`}
                >
                  <span className="mt-1 underline font-averta-semibold text-indigo-400">
                    Buy here
                  </span>

                  {/*  <div className="relative flex flex-row group cursor-default">
						  <WorkspacePremiumIcon className="text-indigo-400"/>
						  <p className="text-indigo-400 ml-2 font-averta-semibold">Premium Processing</p>
						  <span className="absolute opacity-0 font-averta-semibold group-hover:opacity-100 transform group-hover:scale-100 transition-all duration-500 ease-in-out bg-white dark:bg-zinc-800 drop-shadow-lg text-zinc-500 dark:text-zinc-300 text-sm rounded py-1 px-2 left-0 md:bottom-full z-50 mb-2 ml-4">
							This content was processed with advanced AI models accessible to Premium.
						  </span>
						</div> */}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {file === null && (
        <div className="pb-10 w-full py-4">
          <div className="border-b border-gray-200 dark:border-gray-600 mx-auto items-center flex mb-5 "></div>

          <p className=" dark:text-zinc-200 text-zinc-500 text-md font-averta-semibold items-center ">
            Use our free converter tool to get your video and audio files ready
            for transcription.{' '}
          </p>
          <div className="flex flex-row items-center mt-6 ">
            <a
              className="cursor-pointer rounded-md bg-gradient-to-br from-indigo-300 to-indigo-500 px-2 py-1 transition duration-500 hover:scale-105 ease-in-out"
              href="https://convertprivately.com/"
              target="_blank"
            >
              <div className="flex flex-row items-center rounded-lg p-1 ">
                <Image src={ConvertPrivately} width={30} className="p-1" />
                <p className="ml-2 text-md font-bold text-white dark:text-zinc-800">
                  {' '}
                  ConvertPrivately
                </p>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
