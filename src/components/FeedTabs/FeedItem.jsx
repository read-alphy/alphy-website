import './FeedItem.css'
import Twitter from '../../../public/img/twitter_space.png'
import ApplePodcast from '../../../public/img/apple_podcast_banner.png'
import Twitch from '../../../public/img/twitchSource.png'
import X from '../../../public/img/X.png'
import axios from 'axios'
import { useState } from 'react'
import { Button } from '@material-tailwind/react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import ReplayIcon from '@mui/icons-material/Replay'

import Link  from 'next/link'
import { useRouter } from 'next/router'
import { API_URL } from '../../constants'

export default function FeedItem ({
  item,
  index,
  setCollapsed,
  myBookmarks,
  currentUser,
  sideFeed,
  fromArchipelago,
  dataArchipelago,
  setDataArchipelago,
  sourceIDsArchipelago,
  setSourceIDsArchipelago,
  forDetail,
  forCreationPool,
}) {
  const router = useRouter()
  const source_id = item !== undefined && item.source_id
  let formattedDate = ''
  const inputDate =
    item !== undefined &&
    item.added_ts !== undefined &&
    item.added_ts.substring(0, 10)
  const [removed, setRemoved] = useState(false)
  if (
    inputDate !== undefined &&
    item !== undefined &&
    item.added_ts !== undefined
  ) {
    const parts = inputDate.split('-')
    formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`
  }
  
  let imageUrl
  if (item !== undefined && item.source_type === 'yt') {
    imageUrl = `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`
  } else if (item !== undefined && item.source_type === 'sp') {
    imageUrl = Twitter
  } else if (item !== undefined && item.source_type === 'ap') {
    imageUrl = ApplePodcast
  } else if (item !== undefined && item.source_type === 'tw') {
    imageUrl = Twitch
  } else if (item !== undefined && item.source_type === 'x') {
    imageUrl = X
  }

  const language_codes = {
    af: 'Afrikaans',
    ar: 'العربية',
    hy: 'Հայերեն',
    az: 'Azərbaycan dili',
    be: 'Беларуская',
    bs: 'Bosanski',
    bg: 'Български',
    ca: 'Català',
    zh: '中文',
    hr: 'Hrvatski',
    cs: 'Čeština',
    da: 'Dansk',
    nl: 'Nederlands',
    en: 'English',
    et: 'Eesti',
    fi: 'Suomi',
    fr: 'Français',
    gl: 'Galego',
    de: 'Deutsch',
    el: 'Ελληνικά',
    he: 'עברית',
    hi: 'हिन्दी',
    hu: 'Magyar',
    is: 'Íslenska',
    id: 'Bahasa Indonesia',
    it: 'Italiano',
    ja: '日本語',
    kn: 'ಕನ್ನಡ',
    kk: 'Қазақ',
    ko: '한국어',
    lv: 'Latviešu',
    lt: 'Lietuvių',
    mk: 'Македонски',
    ms: 'Bahasa Melayu',
    mr: 'मराठी',
    mi: 'Māori',
    ne: 'नेपाली',
    no: 'Norsk',
    fa: 'فارسی',
    pl: 'Polski',
    pt: 'Português',
    ro: 'Română',
    ru: 'Русский',
    sr: 'Српски',
    sk: 'Slovenčina',
    sl: 'Slovenščina',
    es: 'Español',
    sw: 'Kiswahili',
    sv: 'Svenska',
    tl: 'Tagalog',
    ta: 'தமிழ்',
    th: 'ไทย',
    tr: 'Türkçe',
    uk: 'Українська',
    ur: 'اردو',
    vi: 'Tiếng Việt',
    cy: 'Cymraeg',
  }
  const removeBookmark = () => {
    axios
      .patch(
        `${API_URL}/sources/${item.source_type}/${
          item.source_id
        }/bookmark?bookmark=${removed === false ? false : true}`,
        {},
        {
          headers: {
            accept: 'application/json',
            'id-token': currentUser.accessToken,
          },
        }
      )
      .then(response => {
        setRemoved(!removed)
      })
  }

  const handleClick = e => {
    if (fromArchipelago !== undefined && forDetail !== true) {
      e.preventDefault() // This will prevent the link from navigating
    }
  }

  return (
    <div className={`grid border-b-0 w-full md:w-full ${sideFeed ? '' : ''}`}>
      {item.source_type !== 'up' ? (
        !myBookmarks ? (
          <Link href={`/${item.source_type}/${source_id}`} onClick={handleClick}>
            <div className="flex w-full ">
              <div
                className={`grid ${
                  fromArchipelago === 'archipelago' && forDetail !== true
                    ? 'grid-cols-3 sm:grid-cols-4 cursor-default'
                    : 'grid-cols-3'
                } ${
                  fromArchipelago === undefined &&
                  'lg:grid-cols-2 sm:hover:scale-10 transform sm:hover:translate-x-2'
                } flex ${
                  ((dataArchipelago !== undefined &&
                    dataArchipelago.includes(item) &&
                    fromArchipelago === 'search') ||
                    (sourceIDsArchipelago !== undefined &&
                      sourceIDsArchipelago.includes(item.source_id) &&
                      forCreationPool !== true)) &&
                  'border-4 border-greenColor'
                } flex-row items-center justify-start cursor-pointer w-full h-full  p-2 rounded-md mb-2  transition duration-200 ease-in-out  mr-auto ml-auto`}
                onClick={() => {
                  // navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);

                  if (fromArchipelago === undefined) {
                    setCollapsed(true)
                  } else {
                    if (fromArchipelago === 'search') {
                      if (
                        dataArchipelago.includes(item) ||
                        sourceIDsArchipelago.includes(item.source_id)
                      ) {
                        const newArchipelagoArray = dataArchipelago.filter(
                          element => element.source_id !== item.source_id
                        )
                        setDataArchipelago(newArchipelagoArray)

                        const newSourceIDArray = sourceIDsArchipelago.filter(
                          element => element !== item.source_id
                        )

                        setSourceIDsArchipelago(newSourceIDArray)
                      } else {
                        setDataArchipelago([...dataArchipelago, item])
                        setSourceIDsArchipelago([
                          ...sourceIDsArchipelago,
                          item.source_id,
                        ])
                      }
                    }
                  }
                }}
                target="_blank"
              >
                <div
                  className={`col-span-1  ${
                    router.pathname.includes('arc/createArc') ||
                    router.pathname.includes('arc/editArc')
                      ? `${
                          fromArchipelago === 'archipelago'
                            ? 'min-w-[80px]'
                            : 'min-w-[80px]'
                        }`
                      : 'min-w-[100px]'
                  } max-w-[300px] mr-3 `}
                >
                  {forDetail === true ? (
                    <div className="flex flex-row">
                      <div className="flex mr-4 text-zinc-700 dark:text-zinc-400 font-averta-semibold">
                        {index + 1}
                      </div>
                      <div
                        className={`flex w-full  h-0 dark:opacity-80 rounded-md bg-gray-600 bg-center bg-no-repeat bg-cover`}
                        style={{
                          backgroundImage: `url(${imageUrl})`,
                          paddingBottom: '50%',
                        }}
                      ></div>
                    </div>
                  ) : (
                    <div
                      className="flex w-full  max-w-[220px] h-0 dark:opacity-80  rounded-md bg-gray-600 bg-center bg-no-repeat bg-cover"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                        paddingBottom: '50%',
                      }}
                    ></div>
                  )}
                </div>

                <div
                  className={`${
                    fromArchipelago === 'archipelago'
                      ? 'col-span-1 sm:col-span-2'
                      : 'col-span-2'
                  } ${!fromArchipelago && 'lg:col-span-1'}  ${
                    window.innerWidth > 400 && window.innerWidth < 500 && 'ml-5'
                  } xs:ml-0 sm:ml-0 justify-start text-xs`}
                >
                  {(item.summaries !== undefined &&
                    item.summaries[0] !== undefined &&
                    item.summaries[0].complete === true) ||
                  (fromArchipelago === 'archipelago' &&
                    item.source !== undefined &&
                    item.source.complete === true) ? null : (
                    <div className=" text-purpleLike dark:text-zinc-300 font-averta-semibold">
                      📝 IN PROGRESS
                    </div>
                  )}
                  <div
                    className={`text-sm  text-black dark:text-zinc-300 font-averta-semibold  ${'max-w-[200px]'}`}
                  >
                    {item.title}
                    {item.source !== undefined && item.source.title}
                  </div>
                  <div className="font-averta-regular text-zinc-500 dark:text-zinc-300 ">
                    {item.creator_name}
                    {item.source !== undefined && item.source.creator_name}
                  </div>
                  <div className="font-averta-semibold text-zinc-400 dark:text-zinc-300 flex flex-row">
                    {item.summaries !== undefined &&
                      item.summaries.map((summary, index) => (
                        <div
                          className={
                            index !== 0
                              ? 'ml-1 font-averta-semibold'
                              : 'font-averta-semibold'
                          }
                        >
                          {language_codes[summary.lang]}
                          {index !== item.summaries.length - 1 && ','}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="col-span-1">
                  {fromArchipelago === 'archipelago' && forDetail !== true && (
                    <div className="justify-center items-center flex">
                      <RemoveCircleOutlineIcon
                        className="cursor-pointer"
                        onClick={() => {
                          const newArchipelagoArray = dataArchipelago.filter(
                            element => element.source_id !== item.source_id
                          )
                          setDataArchipelago(newArchipelagoArray)

                          const newSourceIDArray = sourceIDsArchipelago.filter(
                            element => element !== item.source_id
                          )

                          setSourceIDsArchipelago(newSourceIDArray)
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex w-full ">
            <div
              className={`grid grid-cols-3 lg:grid-cols-2 flex  flex-row items-center justify-start w-full h-full  p-2 rounded-md mb-2 transition duration-200 ease-in-out    mr-auto ml-auto`}
              onClick={() => {
                // navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);

                setCollapsed(sideFeed !== true && true)
              }}
              target="_blank"
            >
              <Link href={`/${item.source_type}/${source_id}`}>
                <div
                  className={`col-span-1 min-w-[100px] min-w-[100px] max-w-[300px] mr-3 cursor-pointer`}
                >
                  <div
                    className="flex items-center justify-center h-0 dark:opacity-80  rounded-md bg-gray-600 max-w-[300px] bg-center bg-no-repeat bg-cover"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      paddingBottom: '50%',
                    }}
                  ></div>
                </div>
              </Link>

              <div className="col-span-2 lg:col-span-1  text-xs h-full">
                <div className="grid grid-cols-6">
                  <div className="col-span-5">
                    {item.summaries !== undefined &&
                    item.summaries[0] !== undefined &&
                    (item.summaries[0].complete === true ||
                      item.summaries[1] !== undefined ||
                      item.summaries[0] !== undefined) ? null : (
                      <div className=" text-purpleLike dark:text-zinc-300 font-averta-semibold">
                        📝 IN PROGRESS
                      </div>
                    )}

                    <Link
                      className="cursor-pointer"
                      href={`/${item.source_type}/${source_id}`}
                    >
                      <div className="text-sm video-text text-black dark:bg-mildDarkMode dark:text-zinc-300  font-averta-semibold">
                        {item.title}
                      </div>
                      <div className="_ text-zinc-500 dark:text-zinc-300 font-averta-regular">
                        {item.creator_name}
                      </div>
                      <div className=" text-zinc-400 dark:text-zinc-300 flex flex-row">
                        {item.summaries !== undefined &&
                          item.summaries.map((summary, index) => (
                            <div
                              className={
                                index !== 0
                                  ? 'ml-1 font-averta-semibold'
                                  : 'font-averta-semibold'
                              }
                            >
                              {language_codes[summary.lang]}
                              {index !== item.summaries.length - 1 && ','}
                            </div>
                          ))}
                      </div>
                    </Link>
                  </div>

                  <div
                    className={`col-span-1 flex justify-end  ${
                      sideFeed == true && 'mr-0 mb-0'
                    }`}
                  >
                    {removed ? (
                      <ReplayIcon
                        onClick={removeBookmark}
                        className="cursor-pointer text-zinc-600 dark:text-zinc-300"
                      />
                    ) : (
                      <BookmarkRemoveIcon
                        onClick={removeBookmark}
                        className="cursor-pointer text-zinc-600 dark:text-zinc-300"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <Link href={`/${item.source_type}/${source_id}`}>
          <div className="flex w-full hover:opacity-70 duration-200 transform ease-in*out">
            <div
              className={`flex ${' '} ${'pointer-events-none'} flex-row items-center justify-start cursor-pointer w-full h-full py-4 rounded-md mb-2 transition duration-200 ease-in-out    transform sm:hover:translate-x-2 sm:hover:translate-y-2 mr-auto ml-auto`}
              onClick={() => {
                // navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);

                setCollapsed(true)
              }}
              target="_blank"
            >
              <div className="text-xs">
                {item.summaries !== undefined &&
                item.summaries[0] !== undefined &&
                (item.summaries[0].complete === true ||
                  item.summaries[1] !== undefined ||
                  item.summaries[0] !== undefined) ? null : (
                  <div className=" text-purpleLike dark:text-zinc-300 font-averta-semibold">
                    📝 IN PROGRESS
                  </div>
                )}
                <div className="text-sm  text-black dark:bg-mildDarkMode dark:text-zinc-300  underline font-averta-semibold">
                  {item.title}{' '}
                </div>
                <div className="_ text-zinc-500 dark:text-zinc-300 font-averta-semibold">
                  Time added: {formattedDate}
                </div>

                {/* <div className="side-feed-date">{moment(item.source_ts).format('DD:MM:YYYY')}</div> */}
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}

