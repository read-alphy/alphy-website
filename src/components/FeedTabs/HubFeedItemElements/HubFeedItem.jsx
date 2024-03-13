import Twitter from '../../../../public/img/twitter_space.png'
import ApplePodcastBanner from '../../../../public/img/apple_podcast_banner.png'
import Twitch from '../../../../public/img/twitchSource.png'
import X from '../../../../public/img/X.png'
import { useState } from 'react'
import MyWorksFeedItem from './MyWorksFeedItem'
import BookmarkFeedItem from './BookmarkFeedItem'
import MyUploadsFeedItem from './MyUploadsFeedItem'

export default function HubFeedItem ({
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
}){
  const source_id = item !== undefined ? item.source_id : ''
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
  if (item !== undefined) {
    if (item.source_type === 'yt') {
      imageUrl = `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`
    } else if (item.source_type === 'sp') {
      imageUrl = Twitter
    } else if (item.source_type === 'ap') {
      imageUrl = ApplePodcastBanner
    } else if (item.source_type === 'tw') {
      /* 	imageUrl = item.thumbnail ? item.thumbnail : Twitch */
      imageUrl = Twitch
    } else if (item.source_type === 'x') {
      imageUrl = X
    }
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

  return (
    <div className={`grid border-b-0 w-full md:w-full   `}>
      {item !== undefined ? (
        item.source_type !== 'up' ? (
          !myBookmarks ? (
            <MyWorksFeedItem
              item={item}
              index={index}
              source_id={source_id}
              imageUrl={imageUrl}
              language_codes={language_codes}
            />
          ) : (
            <BookmarkFeedItem
              item={item}
              index={index}
              source_id={source_id}
              imageUrl={imageUrl}
              language_codes={language_codes}
              removed={removed}
              setRemoved={setRemoved}
              currentUser={currentUser}
            />
          )
        ) : (
          <MyUploadsFeedItem
            item={item}
            index={index}
            source_id={source_id}
            imageUrl={imageUrl}
            language_codes={language_codes}
            setCollapsed={setCollapsed}
            sideFeed={sideFeed}
            formattedDate={formattedDate}
          />
        )
      ) : null}
    </div>
  )
}

