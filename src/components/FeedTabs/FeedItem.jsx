import './FeedItem.css'
import Twitter from '../../../public/img/twitter_space.png'
import ApplePodcast from '../../../public/img/apple_podcast_banner.png'
import Twitch from '../../../public/img/twitchSource.png'
import X from '../../../public/img/X.png'
import axios from 'axios'
import { useState } from 'react'
import { CircleMinus, BookmarkX, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { API_URL } from '../../constants'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FeedItem({
  item,
  index,
  setCollapsed,
  myBookmarks,
  currentUser,
  sideFeed,
  fromArc,
  dataArc,
  setDataArc,
  sourceIDsArc,
  setSourceIDsArc,
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
    if (fromArc !== undefined && forDetail !== true) {
      e.preventDefault() // This will prevent the link from navigating
    }
  }

  const isInProgress = item.summaries !== undefined &&
    item.summaries[0] !== undefined &&
    item.summaries[0].complete !== true;

  if (item.source_type === 'up') {
    return (
      <div className="grid border-b-0 w-full md:w-full">
        <Link href={`/${item.source_type}/${source_id}`}>
          <div className="flex w-full hover:opacity-70 duration-200 transform ease-in*out">
            <div
              className="flex flex-row items-center justify-start cursor-pointer w-full h-full py-4 rounded-md mb-2 transition duration-200 ease-in-out transform sm:hover:translate-x-2 sm:hover:translate-y-2 mr-auto ml-auto pointer-events-none"
              onClick={() => setCollapsed(true)}
              target="_blank"
            >
              <div className="text-xs">
                {isInProgress && (
                  <div className="text-purpleLike dark:text-zinc-300 quicksand font-bold">
                    📝 IN PROGRESS
                  </div>
                )}
                <div className="text-sm text-slate-800 dark:bg-mildDarkMode dark:text-zinc-300 underline quicksand font-bold">
                  {item.title}{' '}
                </div>
                <div className="text-slate-500 dark:text-zinc-300 quicksand font-bold">
                  Time added: {formattedDate}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (myBookmarks) {
    return (
      <div className="grid border-b-0 w-full md:w-full">
        <div className="flex w-full">
          <div
            className="grid grid-cols-3 lg:grid-cols-2 flex flex-row items-center justify-start w-full h-full p-2 rounded-md mb-2 transition duration-200 ease-in-out mr-auto ml-auto"
            onClick={() => setCollapsed(sideFeed !== true && true)}
            target="_blank"
          >
            <Link href={`/${item.source_type}/${source_id}`}>
              <div className="col-span-1 min-w-[100px] max-w-[300px] mr-3 cursor-pointer">
                <div
                  className="flex items-center justify-center h-0 dark:opacity-80 rounded-md bg-gray-600 max-w-[300px] bg-center bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    paddingBottom: '50%',
                  }}
                ></div>
              </div>
            </Link>

            <div className="col-span-2 lg:col-span-1 text-xs h-full">
              <div className="grid grid-cols-6">
                <div className="col-span-5">
                  {isInProgress && (
                    <div className="text-purpleLike dark:text-zinc-300 quicksand font-bold">
                      📝 IN PROGRESS
                    </div>
                  )}

                  <Link
                    className="cursor-pointer"
                    href={`/${item.source_type}/${source_id}`}
                  >
                    <div className="text-sm video-text text-slate-800 dark:bg-mildDarkMode dark:text-zinc-300 quicksand font-bold">
                      {item.title}
                    </div>
                    <div className="text-slate-500 dark:text-zinc-300 quicksand font-normal">
                      {item.creator_name}
                    </div>
                    <div className="text-zinc-400 dark:text-zinc-300 flex flex-row">
                      {item.summaries !== undefined &&
                        item.summaries.map((summary, index) => (
                          <div
                            key={index}
                            className={index !== 0 ? 'ml-1 quicksand font-bold' : 'quicksand font-bold'}
                          >
                            {language_codes[summary.lang]}
                            {index !== item.summaries.length - 1 && ','}
                          </div>
                        ))}
                    </div>
                  </Link>
                </div>

                <div className={`col-span-1 flex justify-end ${sideFeed === true && 'mr-0 mb-0'}`}>
                  {removed ? (
                    <RotateCcw
                      onClick={removeBookmark}
                      className="cursor-pointer text-slate-600 dark:text-zinc-300"
                    />
                  ) : (
                    <BookmarkX
                      onClick={removeBookmark}
                      className="cursor-pointer text-slate-600 dark:text-zinc-300"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid border-b-0 w-full md:w-full ${sideFeed ? '' : ''}`}>
      <Link href={`/${item.source_type}/${source_id}`} onClick={handleClick}>
        <Card className={`overflow-hidden shadow-none transition-all duration-300 hover:shadow-md dark:bg-zinc-800 dark:border-zinc-700 h-full ${
          ((dataArc !== undefined && dataArc.includes(item) && fromArc === 'search') ||
            (sourceIDsArc !== undefined && sourceIDsArc.includes(item.source_id) && forCreationPool !== true)) &&
          'border-4 border-greenColor'
        }`}>
          <div
            className="w-full h-40 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${typeof imageUrl === "object" ? imageUrl.src : imageUrl})`,
            }}
          />
          
          <CardHeader className="p-3 pb-0">
            {isInProgress && (
              <Badge variant="outline" className="w-[120px] mb-2 bg-indigo-50 text-indigo-400 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700">
                📝 IN PROGRESS
              </Badge>
            )}
            <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300 quicksand line-clamp-2">
              {item.title || (item.source && item.source.title)}
            </h3>
          </CardHeader>
          
          <CardContent className="p-3 pt-1">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 quicksand font-bold">
              {item.creator_name || (item.source && item.source.creator_name)}
            </p>
          </CardContent>
          
          <CardFooter className="p-3 pt-0 flex flex-col items-start">
            <div className="flex flex-wrap text-xs text-zinc-400 dark:text-zinc-500 quicksand font-bold">
              {item.summaries !== undefined &&
                item.summaries.map((summary, index) => (
                  <span key={index} className={index !== 0 ? 'ml-1' : 'text-sm'}>
                    {language_codes[summary.lang]}
                    {index !== item.summaries.length - 1 && ','}
                  </span>
                ))}
            </div>
            
            {fromArc === 'arc' && forDetail !== true && (
              <div className="w-full flex justify-end mt-2">
                <CircleMinus
                  className="cursor-pointer text-red-500"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const newArcArray = dataArc.filter(
                      element => element.source_id !== item.source_id
                    );
                    setDataArc(newArcArray);
                    const newSourceIDArray = sourceIDsArc.filter(
                      element => element !== item.source_id
                    );
                    setSourceIDsArc(newSourceIDArray);
                  }}
                />
              </div>
            )}
          </CardFooter>
        </Card>
      </Link>
    </div>
  )
}
