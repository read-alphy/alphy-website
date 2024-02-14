import React, { useState, useEffect } from 'react'
import SideFeed from '../SideFeed/SideFeed'
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import Link from 'next/link'
import {useRouter} from 'next/router'
    

import axios from 'axios'
import Loading from '../Loading'


import { API_URL } from '../../constants'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./Content'), {
  ssr: false,
})


export default function SourcePage({
  source_type,
  source_id,
  collapsed,
  setCollapsed,
  tier,
  setContentName,
  userArchipelagos,
  currentUser,
  sandboxHistory,
  setSandboxHistory,
  loggedIn,
  setLoggedIn
}) {
 

  

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [data, setData] = useState([])
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
  

  

 /*  if (router.asPath.split('/')[2].split('&q=')[0] !== undefined) {
    {source_id} = router.asPath.split('/')[2].split('&q=')[0]
  } else {
    source_id = router.asPath.split('/')[2]
    
  } */

  

  const fetchData = async (url, constantFetch) => {
    

    try {
      if (!constantFetch) {
        setIsLoading(true)
      }

      const response = await axios
        .get(url)
        .then(response => {
          if (response.data !== null && response.data !== undefined) {
            if (
              response.data.lang !== undefined &&
              response.data.lang !== null
            ) {
              setLanguage(response.data.lang)
            }
            setData(response.data)
            setContentName(response.data.title)
          }
        })
        .catch(error => {
          console.log('error1', error, constantFetch)
          if (constantFetch === false && error.code !== 'ERR_NETWORK') {
            navigate('/404')
          }
        })
    } catch (error) {
      if (error.response?.status === 404) {
        setIsLoading(false)
        console.log('error2', error)
        navigate('/404')
      }
      console.error(`Error fetching data: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

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

  const fetchDataUpload = async (url, constantFetch) => {
    setAuthorizationError(false)
    localStorage.setItem('isVisibleUpload', false)

    const idToken =
      localStorage.getItem('idToken').length > 0
        ? localStorage.getItem('idToken')
        : '123'

    try {
      if (constantFetch === false) {
        setIsLoading(true)
      }

      const response = await axios
        .get(url, {
          headers: {
            'id-token': idToken,
          },
        })
        .then(response => {
          if (response.data !== null && response.data !== undefined) {
            if (
              response.data.lang !== undefined &&
              response.data.lang !== null
            ) {
              setLanguage(response.data.lang)
            }
            setData(response.data)
            setIsVisible(response.data.is_visible)
            setIsPublic(response.data.is_visible)
            localStorage.setItem('isVisibleUpload', response.data.is_visible)
            setContentName(response.data.title)
          }
        })
        .catch(error => {
          console.error('Error getting upload data', error)
          if (error.response.data.detail === 'Source is inaccessible') {
            setAuthorizationError(true)
          }
        })
    } catch (error) {
      if (error.response?.status === 404) {
        setIsLoading(false)
        console.log('error3', error)
        /* navigate('/404'); */
      } else {
        navigate('/404')
      }
    } finally {
      setIsLoading(false)
    }
  }

  

  const url = `${API_URL}/sources/${source_type}/${source_id}`
  /* 	const url_bookmark= `${API_URL}/sources/${source_type}/${source_id}/bookmark`
   */

  useEffect(() => {
    const previousUrl = sessionStorage.getItem('previousUrl')
    if(source_id==='[source_id]'){
      
      return}

    if (
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
    }

    if (currentUser !== null && bookmarkChecked === false) {
      setTimeout(() => {
        checkBookmark()
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
          `${API_URL}/sources/${data.source_type}/${data.source_id}/visibility?visibility=${targetVisibility}`,
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
    <div className="article dark:bg-darkMode dark:text-zinc-300">


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
            /> 
            
          )}
        </div>
      </div>
    </div>
  )
}
