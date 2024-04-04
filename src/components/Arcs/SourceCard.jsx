import FeedItem from '../FeedTabs/FeedItem'

import Twitter from '../../../public/img/twitter_spaces.png'
import React, { useState, useEffect, useRef } from 'react'

import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import CloseIcon from '@mui/icons-material/Close'
import Logo from '../../../public/img/ALPHY_BG_REMOVED_LIGHT.png'
import LogoInverted from '../../../public/img/ALPHY_BG_REMOVED_DARK.png'
import { useRouter } from 'next/router'
import Image from 'next/image'


export default function SourceCard({
  source,
  tracks,
  setFullWidth,
  setSelectedSourceCard,
  selectedSourceCard,
  forDialog,
  openDialog,
  setOpenDialog,
}) {
  const setOpenDialogInside = setOpenDialog
  const startTime =convertTimeToSeconds(source.start)
  const endTime = convertTimeToSeconds(source.end)
  const [expanded, setExpanded] = useState(false)
const router = useRouter()
  let displayText = ''
  let transcript

  let sentences
  let groupedText

  function convertTimeToSeconds(time) {
    // Check if the input is a string and matches the ISO 8601 duration format
    if (typeof time === 'string' && time.match(/^PT/)) {
      const matches = time.match(/PT(\d+H)?(\d+M)?(\d+(?:\.\d+)?S)?/);
      let seconds = 0;
  
      // If hours are present, convert them to seconds and add to total
      if (matches[1]) {
        seconds += parseInt(matches[1]) * 3600;
      }
  
      // If minutes are present, convert them to seconds and add to total
      if (matches[2]) {
        seconds += parseInt(matches[2]) * 60;
      }
  
      // If seconds are present, add them to total
      if (matches[3]) {
        seconds += parseFloat(matches[3]);
      }
  
      return seconds;
    } else if (typeof time === 'number' || (typeof time === 'string' && time.match(/^\d+(?:\.\d+)?$/))) {
      // If the input is a numeric value or a string representing a number, parse it directly
      return parseFloat(time);
    } else {
      // If the input is neither, return null or throw an error
      return null;
    }
  }

  if (source.text !== undefined) {
    const sentenceRegex = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/
    sentences = source.text.split(sentenceRegex)
    const groups = sentences.reduce((acc, sentence, index) => {
      const groupIndex = Math.floor(index / 3)
      if (!acc[groupIndex]) {
        acc[groupIndex] = []
      }
      acc[groupIndex].push(sentence)
      return acc
    }, [])
    const groupedSentences = groups.map(group => group.join(' '))
    groupedText = groupedSentences.join('<br/> <br/>')
    groupedText = `${
      groupedText[0] === groupedText[0].toUpperCase() ? '' : '...'
    }${groupedText}${
      groupedText[groupedText.length - 1] === '.' ||
      groupedText.substring(groupedText.length - 1) === '?' ||
      groupedText[groupedText.length - 1] === ',' ||
      groupedText[groupedText.length - 1] === '!' ||
      groupedText[groupedText.length - 1] === ':' ||
      groupedText[groupedText.length - 1] === '...'
        ? ''
        : '...'
    }`

    if (window.innerWidth > 768) {
      displayText = expanded
        ? source.text
        : `${
            source.text[299] === ' '
              ? source.text.slice(0, 299)
              : source.text.slice(0, 300)
          }`
    } else {
      displayText = expanded
        ? source.text
        : `${
            source.text[119] === ' '
              ? source.text.slice(0, 119)
              : source.text.slice(0, 120)
          }`
    }
  }

  
  let title = ''
  if (
    tracks.length !== 0 &&
    tracks[0] !== undefined &&
    tracks.find(track => track.source_id === source.source_id) !== undefined
  ) {
    title = tracks.find(track => track.source_id === source.source_id).source
      .title
  }

  let displayTitle = ''
  if (title) {
    if (window.innerWidth > 600) {
      if (title.length > 30) {
        displayTitle = expanded
          ? title
          : `${title[29] === ' ' ? title.slice(0, 29) : title.slice(0, 30)}...`
      } else {
        displayTitle = title
      }
    } else {
      if (title.length > 20) {
        displayTitle = expanded
          ? title
          : `${title[19] === ' ' ? title.slice(0, 19) : title.slice(0, 20)}`
      } else {
        displayTitle = title
      }
    }
  }

  let imageUrl
  if (source.source_type === 'yt') {
    imageUrl = `https://i.ytimg.com/vi/${source.source_id}/hqdefault.jpg`
  } else if (source.source_type === 'sp') {
    imageUrl = Twitter
  }

  const myRef = useRef(null)
  let height
  const element = myRef.current
  if (element) {
    height = element.getBoundingClientRect().height
  }
  const showDialog = () => {
    setOpenDialogInside(true)
    setSelectedSourceCard(source)
  }

  const handleAlphyClick = event => {
    event.stopPropagation()
    setTimeout(() => {
      router.asPath(`/${source.source_type}/${source.source_id}`)
    }, 100)
  }

  useEffect(() => {
    const handleResize = () => {
      if (setFullWidth) {
        if (window.innerWidth < 600) {
          setFullWidth(true)
        } else {
          setFullWidth(false)
        }
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setFullWidth])

  return (
    <div className="dark:bg-mildDarkMode ">
      {!forDialog ? (
        <div
          onClick={showDialog}
          className=" border border-zinc-200 dark:border-mildDarkMode dark:bg-mildDarkMode w-[240px]  sm:w-[360px] h-[420px] py-2 px-4 overflow-y-hidden drop-shadow-sm cursor-pointer"
        >
          <div className=" flex flex-row mt-4">
            <div
              className={`min-w-[120px] max-w-[120px] mr-3 min-h-[60px] max-h-[60px] overflow-hidden`}
            >
              <div
                className="flex items-center justify-center h-0 dark:opacity-80  rounded-md bg-gray-600"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  paddingBottom: '50%',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              ></div>
            </div>

            <div className=" text-lg w-full font-sans min-h-[80px] max-h-[80px] overflow-y-hidden text-slate-700 dark:text-zinc-200">
              <p className="quicksand font-bold">{displayTitle}</p>
            </div>
          </div>
          <div>
            <a
              onClick={handleAlphyClick}
              className="underline mt-4 flex flex-row transform hover:scale-105 transition duration-300"
            >
              <div>
                <Image
                  src={Logo}
                  className="w-[30px] h-[30px] hidden dark:flex"
                  alt="Alphy Logo"
                />
                <Image
                  src={LogoInverted}
                  className="w-[30px] h-[30px]  dark:hidden"
                  alt="Alphy Logo"
                />
              </div>
              <p className="ml-2 mt-1 text-sm sm:text-md text-slate-600 dark:text-zinc-300 quicksand font-normal">
                See more details on Alphy{' '}
              </p>
            </a>
            <p className="mt-4">
              <a className=" text-slate-600 dark:text-zinc-300 quicksand font-bold">
                {Math.floor(startTime / 3600) < 10
                  ? `0${Math.floor(startTime / 3600)}`
                  : `${Math.floor(startTime / 3600)}`}
                {':'}
                {Math.floor(startTime / 60) < 10
                  ? `0${Math.floor(startTime / 60)}`
                  : Math.floor(startTime % 3600) < 600
                  ? `0${Math.floor(
                      startTime / 60 - Math.floor(startTime / 3600) * 60
                    )}`
                  : Math.floor(
                      startTime / 60 - Math.floor(startTime / 3600) * 60
                    )}
                {':'}
                {Math.floor(startTime % 60) < 10
                  ? `0${Math.floor(startTime % 60)}`
                  : Math.floor(startTime % 60)}

                {' - '}

                {Math.floor(endTime / 3600) < 10
                  ? `0${Math.floor(endTime / 3600)}`
                  : `${Math.floor(endTime / 3600)}`}
                {':'}
                {Math.floor(endTime / 60) < 10
                  ? `0${Math.floor(endTime / 60)}`
                  : Math.floor(endTime % 3600) < 600
                  ? `0${Math.floor(
                      endTime / 60 - Math.floor(endTime / 3600) * 60
                    )}`
                  : Math.floor(
                      endTime / 60 - Math.floor(endTime / 3600) * 60
                    )}
                {':'}
                {Math.floor(endTime % 60) < 10
                  ? `0${Math.floor(endTime % 60)}`
                  : Math.floor(endTime % 60)}
              </a>
            </p>
            <p
              ref={myRef}
              className={` mt-4 text-slate-600 dark:text-zinc-300 text-md  pb-2 quicksand font-normal`}
            >
              {displayText[0] === displayText[0].toUpperCase() ? '' : '...'}
              {displayText}
              {displayText[displayText.length - 1] === '.' ||
              displayText.substring(displayText.length - 1) === '?' ||
              displayText[displayText.length - 1] === ',' ||
              displayText[displayText.length - 1] === '!' ||
              displayText[displayText.length - 1] === ':' ||
              displayText[displayText.length - 1] === '...'
                ? ''
                : '...'}
            </p>
          </div>
          <p className="absolute bottom-0 text-greenColor quicksand font-bold  ">
            Click to see more
          </p>
        </div>
      ) : (
        <div className="w-full">
          <CloseIcon
            className="right-0 absolute mr-4 mt-2 cursor-pointer text-slate-600 dark:text-zinc-300"
            onClick={() => setOpenDialog(false)}
          ></CloseIcon>
          <div
            className="sm:w-[600px] py-10 px-4 sm:px-10 "
            onBlur={() => setOpenDialog(false)}
          >
            {source.source_type === 'yt' && (
              <iframe
                className="sm:w-[430px] h-[200px] items-center mx-auto mb-10"
                id="player"
                title="My YouTube Video "
                src={`https://www.youtube.com/embed/${source.source_id}?start=${startTime}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            )}
            <p
              className={`text-greenColor mt-4 mb-4 px-2 sm:px-10 quicksand font-bold`}
            >
              <TextSnippetIcon /> Passage
            </p>
            <p
              className="px-2 sm:px-10 text-slate-600 dark:text-zinc-300 quicksand font-normal"
              dangerouslySetInnerHTML={{ __html: groupedText }}
            ></p>
          </div>
        </div>
      )}
    </div>
  )
}
