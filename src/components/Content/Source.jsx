import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import Link from 'next/link'
import {useRouter} from 'next/router'
    

import axios from 'axios'
import Loading from '../Loading'



import dynamic from 'next/dynamic'

import Content from './Content'
import { API_URL } from '../../constants'



export default function SourcePage({

  collapsed,
  setCollapsed,
  tier,
  setContentName,
  userArchipelagos,
  currentUser,
  sandboxHistory,
  setSandboxHistory,
  getSandboxHistory,
  loggedIn,
  setLoggedIn,
  data
}) {
 

  

  const [isBookmarked, setIsBookmarked] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [actionsHub, setActionsHub] = useState(false)
  const [bookmarkChecked, setBookmarkChecked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [isSandbox, setIsSandbox] = useState(false)

  const [language, setLanguage] = useState(
    data.summaries !== undefined &&
      data.summaries.length > 1 &&
      data.lang !== undefined &&
      data.summaries[1] !== undefined &&
      data.summaries[1].complete === true
      ? data.lang
      : 'en'
  )

  const [called, setCalled] = useState(false)
  const [authorizationError, setAuthorizationError] = useState(false)
  
const router = useRouter()

  const source_type = router.query.source_type
  const source_id = router.query.source_id  
  

 /*  if (router.asPath.split('/')[2].split('&q=')[0] !== undefined) {
    {source_id} = router.asPath.split('/')[2].split('&q=')[0]
  } else {
    source_id = router.asPath.split('/')[2]
    
  } */

  
  const checkBookmark = async () => {
    try {
      await currentUser.getIdToken().then(idToken => {
        axios
          .get(
            `${API_URL}/sources/${source_type}/${source_id}/bookmark`,

            {
              headers: {
                'id-token': idToken,
              },
            }
          )
          .then(response => {
            if (response.data) {
              setBookmarkChecked(true)
              setIsBookmarked(response.data.is_bookmark)
            }
          })
      })
    } catch (error) {
      console.error('Error checking bookmarks', error)
      setBookmarkChecked(true)
    }
  }

  

  
  /* 	const url_bookmark= `${API_URL}/sources/${source_type}/${source_id}/bookmark`
   */

  useEffect(() => {
    const previousUrl = sessionStorage.getItem('previousUrl')
  

    /* if (
      (called === false && data.complete !== true) ||
      window.location.href !== previousUrl
    ) {
      if (
        source_type === 'up' &&
        (data.length === 0 || window.location.href !== previousUrl)
      ) {
        setCalled(true)

        fetchDataUpload(url, false)
        sessionStorage.setItem('previousUrl', window.location.href)
      }
      if (
        source_type !== 'up' &&
        (data.length === 0 || window.location.href !== previousUrl)
      ) {
        setCalled(true)

        fetchData(url, false)
        sessionStorage.setItem('previousUrl', window.location.href)
      }
    } */

    if (currentUser !== null && bookmarkChecked === false) {
      setTimeout(() => {
        /* checkBookmark() */
      }, 1000)
    }
  }, [data, currentUser, source_id])

  const handleLanguageChange = event => {
    /* 	if(errorMessage ==true || translationMessage==true)
			{
				window.location.reload();
			} */
    const selectedCode = event.target.value
    setLanguage(selectedCode)
  }

  useEffect(() => {
    const interval = setInterval(
      () => {
        let summaryComplete = false

        if (data !== null && data.summaries !== undefined) {
          if (data.summaries.length > 0) {
            summaryComplete =
              data.summaries.find(item => item.lang === language).complete !==
              undefined
                ? data.summaries.find(item => item.lang === language).complete
                : false
          }
        }

        if (data !== null && summaryComplete === false && called === true) {
          if (source_type === 'up' && summaryComplete === false) {
             fetchDataUpload(url, true) 
          } else if (source_type !== 'up' && summaryComplete === false) {
             fetchData(url, true) 
          }
        } else {
          return
        }
      },

      5000
    )

    return () => clearInterval(interval)
  }, [data, language])

  const handleVisibility = () => {
    const targetVisibility = !isVisible
    localStorage.setItem('isVisibleUpload', isVisible)

    try {
      axios
        .patch(
          `${API_URL}/sources/${source_type}/${source_id}/visibility?visibility=${targetVisibility}`,
          null,
          {
            headers: {
              accept: 'application/json',
              'id-token': currentUser.accessToken,
            },
          }
        )
        .then(response => {
          localStorage.setItem('isVisibleUpload', targetVisibility)
          setIsVisible(targetVisibility)
          setIsPublic(targetVisibility)
        })
    } catch (error) {
      console.log('arcChat error', error)
      if (axios.isCancel(error)) {
        console.log('Request cancelled')
      }
    }
  }

  return (
    <div className="article bg-white dark:bg-darkMode dark:text-zinc-300">
    
      <div
        className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${
          collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
        }`}
      ></div>

      <div className="flex flex-row ">
        {
          <div className={`hidden sm:flex `}>
            <SideFeed
              currentUser={currentUser}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              source_id={source_id}
              actionsHub={actionsHub}
              setActionsHub={setActionsHub}
              tier={tier}
              isSandbox={isSandbox}
              sandboxHistory={sandboxHistory}
              loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
            />
          </div>
        }

        <div
          className={`fixed top-0 z-50 transition origin-top-right transform sm:hidden w-full shadow-lg bg-zinc-100 ${
            collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-slate-50'
          }`}
        >
          <div className="rounded-lg rounded-t-none shadow-lg">
            <div className="h-screen">
              <SideFeed
                currentUser={currentUser}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                source_id={source_id}
                actionsHub={actionsHub}
                setActionsHub={setActionsHub}
                tier={tier}
                isSandbox={isSandbox}
                sandboxHistory={sandboxHistory}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            </div>
          </div>
        </div>

        <div
          className={`scrolling  mx-auto  h-full sm:max-h-[100vh] w-full ${
            collapsed ? 'hidden' : ' max-h-[100vh]'
          }}`}
        >
          {isLoading || data.length ? (
            <Loading />
          ) : authorizationError ? (
            <div className="flex-col flex mx-10 md:mx-20 mx-auto mt-20 md:mt-40">
              <div className="text-xl max-w-[600px] text-zinc-700 dark:text-zinc-300 font-averta-semibold">
                The page you're trying to reach either doesn't exist or you
                don't have permission to access it.
              </div>
              <Link
                href="/myhub"
                className="underline mt-6 text-zinc-700 dark:text-zinc-300 max-w-[150px] font-averta-semibold"
              >
                Back To My Hub
              </Link>
            </div>
          ) : (
             <Content
              data={data}
              tier={tier}
              isVisible={isVisible}
              isPublic={isPublic}
              handleVisibility={handleVisibility}
              isBookmarked={isBookmarked}
              setIsBookmarked={setIsBookmarked}
              userArchipelagos={userArchipelagos}
              actionsHub={actionsHub}
              language={language}
              setLanguage={setLanguage}
              handleLanguageChange={handleLanguageChange}
              isSandbox={isSandbox}
              setIsSandbox={setIsSandbox}
              getSandboxHistory={getSandboxHistory}
              source_id={source_id}
              source_type={source_type}
            /> 
            
          )}
        </div>
      </div>
    </div>
  )
}

