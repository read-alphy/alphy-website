import '../globals.css'


import React, { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from '../components/Misc/Navbar'
import Head from 'next/head';
import { useAuth } from '../hooks/useAuth'
import { initializeApp } from 'firebase/app'

import { loadStripe } from '@stripe/stripe-js'

import axios from 'axios'

import { API_URL, STRIPE_PK } from '../constants'
import getUserMetadata from '../utils/getUserMetadata'
import { useRouter } from 'next/router';
import addToUserMetadata from '../utils/addToUserMetadata'
import { ThemeProvider } from "next-themes"
import {useTheme} from 'next-themes'
import {useDarkMode} from "@/hooks/useDarkMode"

const firebaseConfig = {
    apiKey: 'AIzaSyCQlDrSG7cOYqqOaj79hFbipJIFqzlRhwg',
    authDomain: 'auth.alphy.app',
    projectId: 'alphy-74583',
    storageBucket: 'alphy-74583.appspot.com',
    messagingSenderId: '606454102589',
    appId: '1:606454102589:web:1b94cc9a6d7b00a28c4854',
  }
  

function MyApp({ Component, pageProps }) {
    const auth = useAuth()
    const { currentUser } = useAuth()
  
    const [called, setCalled] = useState(false)
    const [tier, setTier] = useState('free')
    const [credit, setCredit] = useState(0)
    const [creditcalled, setCreditCalled] = useState(false)
    const [searchParams, setSearchParams] = useState({});
    const router = useRouter();
    const { query } = router;
    const [contentName, setContentName] = useState('')
    const [collapsed, setCollapsed] = useState(false)
    const [idToken, setIdToken] = useState('')
    const [userArcs, setUserArcs] = useState([])
    const [dataGlobalArcs, setDataGlobalArcs] = useState([])
    const [userMetadata, setUserMetadata] = useState('')
    const [showWelcomeForm, setShowWelcomeForm] = useState(false)
    const [welcomeFormCalled, setWelcomeFormCalled] = useState(false)
    const [totalMinutes, setTotalMinutes] = useState(0)
    const [sandboxHistory, setSandboxHistory] = useState([])
    const [globalLayout, setGlobalLayout] = useState(true)
    const [userLayout, setUserLayout] = useState(false)
    const [submitLayout, setSubmitLayout] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [sandboxHistoryCalled, setSandboxHistoryCalled] = useState(false)
    const {theme, setTheme} = useTheme('light')

    const [colorTheme, setDarkMode] = useDarkMode();

   /*  useEffect(() => {
    const themeRefreshed = localStorage.getItem('themeRefreshed')
    if (themeRefreshed !== 'true') {
      localStorage.setItem('theme', 'light')
      localStorage.setItem('themeRefreshed', 'true')
    }

      const storedTheme = localStorage.getItem('theme');
      
      if (storedTheme!==null) {
       setTheme(storedTheme);
      }
      else {
        setTheme('light')
      }

      // Load sidebar collapsed state from localStorage
      const sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
      if (sidebarCollapsed !== null) {
        setCollapsed(sidebarCollapsed === 'true');
      }
    }, []); */


    useEffect(() => {
      setTheme('light');
      setDarkMode(false);
    }, [colorTheme]);
  
    // Save sidebar collapsed state to localStorage when it changes
    useEffect(() => {
      localStorage.setItem('sidebarCollapsed', collapsed.toString());
    }, [collapsed]);
  
    const [customerID, setCustomerID] = useState('')
    const [userArcsCalled, setUserArcsCalled] = useState(false)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlParams.entries());
        setSearchParams(params);
         
    if (sessionStorage.getItem('refreshCredit') === 'true') {
        getCustomerInfo(currentUser)
        sessionStorage.removeItem('refreshCredit')
      }

      }, []);

      


      useEffect (() => {
       
	if (localStorage.getItem("theme") !== null && localStorage.getItem("theme") !== undefined && localStorage.getItem("theme").length === 0) {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			localStorage.setItem("theme", "dark")
      setTheme('dark')
		}
		else {
			localStorage.setItem("theme", "light")
      setTheme('light')
		}
	}
        
      }
      , [])
 
    
  
    const stripePromise = loadStripe(`${STRIPE_PK}`)
  
    useEffect(() => {
      // TODO this delays the loading of the page, but it's necessary to get the user's idToken.
      // Find a way to store idToken in local storage, minding the expiration behavior.
      // Would improve performance throughout.
  setCollapsed(window.innerWidth < 768)
      if (currentUser !== undefined && currentUser !== null) {
        handleMetadata(currentUser.accessToken)
      }
    }, [currentUser])
  
    async function handleMetadata(accessToken) {
      if (userMetadata.length === 0) {
        let metaData = await getUserMetadata(accessToken)
        if (metaData === null) {
          metaData = {}
          setUserMetadata(metaData)
        } else {
          setUserMetadata(metaData)
        }
      }
    }
  
  
    useEffect(() => {
    const resetPassword = searchParams.mode === 'resetPassword'

      if (resetPassword) {
        if (router.pathname.includes('/u/resetpassword') === false) {
          const url = window.location.href
          const [baseUrl, queryString] = url.split('?')
          window.location.href = `${baseUrl}u/resetpassword/?${queryString}`
        }
      }
    })
  
    useEffect(() => {
      if (
        userMetadata !== null &&
        userMetadata.show_welcome_form !== undefined &&
        userMetadata.show_welcome_form !== null &&
        currentUser &&
        welcomeFormCalled === false
      ) {
        const createdAt = currentUser.metadata.createdAt
  
        if (userMetadata.show_welcome_form === 'false') {
          return
        }
  
        if (parseInt(createdAt) - parseInt('1705166047067') < 0) {
          setUserMetadata({ ...userMetadata, show_welcome_form: 'false' })
          addToUserMetadata(currentUser.accessToken, {
            show_welcome_form: 'false',
          })
          setShowWelcomeForm(false)
        } else {
          setUserMetadata({ ...userMetadata, show_welcome_form: 'true' })
          addToUserMetadata(currentUser.accessToken, {
            show_welcome_form: 'true',
          })
  
          setTimeout(() => {
            setShowWelcomeForm(true)
          }, 1000)
        }
        setWelcomeFormCalled(true)
      }
    }, [userMetadata, currentUser])
  
    useEffect(() => {
      if (!called && currentUser) {
        getCustomerInfo(currentUser)
      }
    }, [currentUser, called])
  
    const getSandboxHistory = () => {
      axios
        .get(`${API_URL}/sandbox/`, {
          headers: {
            'id-token': currentUser.accessToken,
          },
        })
        .then(response => {
          setSandboxHistoryCalled(true) 
          setSandboxHistory(response.data)
          
        })
    }
  
    useEffect(() => {
      if (sandboxHistoryCalled === false && currentUser) {
        getSandboxHistory()
      }
    }, [sandboxHistory, currentUser])
  
    useEffect(() => {
        const verification = searchParams.mode === 'verifyEmail'
        const urlParams = new URLSearchParams(window.location.search);

      if (verification) {
        const oobCode = urlParams.get('oobCode')
        auth.handleVerifyEmail(oobCode).then(resp => {
          localStorage.setItem('logged in', 'true')
          setLoggedIn(true)
          router.push('/u/welcome?onboarding_form')
        })
      }
  
     
    }, [currentUser, auth, creditcalled, called,  searchParams])

    useEffect (() => {
      setTimeout(() => {
        const userId = localStorage.getItem('userId')
  
        if (
          userId === null &&
          currentUser !== undefined &&
          currentUser !== null &&
          currentUser.uid !== null &&
          userId !== currentUser.uid
        ) {
          localStorage.setItem('userId', currentUser.uid)
        }
        if (currentUser) {
          localStorage.setItem('logged in', 'true')
          setLoggedIn(true)
        } else {
          localStorage.setItem('logged in', 'false')
          setLoggedIn(false)
        }
  
        if (currentUser !== null && called === false) {
          setIdToken(currentUser.accessToken)
          localStorage.setItem('idToken', currentUser.accessToken)
  
          if (userId === null) {
            localStorage.setItem('userId', currentUser.uid)
          }
  
          if (userArcsCalled === false) {
          
            axios
              .get(`${API_URL}/playlists/`, {
                params: {
                  limit: 40,
                  only_my: true,
                },
                headers: {
                  'id-token': currentUser.accessToken,
                },
              })
              .then(response => {
                
                setUserArcs(response.data)
                setUserArcsCalled(true)
              })
              .catch(e => {
                console.log(e)
              })
          }
        }
      }, 1000)
    }, [currentUser, called, userArcsCalled])
  
    const getCustomerInfo = async currentUser => {
      await axios
        .get(`${API_URL}/payments/status`, {
          headers: {
            'id-token': currentUser.accessToken,
          },
        })
  
        .then(r => {
          /* console.log(r.data) */
  
          if (r.data.current_tier !== null) {
            setTier(r.data.current_tier)
            localStorage.setItem(
              'tier',
              r.data.current_tier ? r.data.current_tier : 'free'
            )
          }
  
          setCustomerID(r.data.customer_id)
          
          setCredit(
            r.data.rem_mins_sub_credits[0] + r.data.rem_mins_sub_credits[1]
          )
          setCalled(true)
        })
        .catch(e => {
          console.log(e)
          setCalled(true)
          setTier('free')
          localStorage.setItem('tier', 'free')
        })
    }
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
 
  

const additionalProps ={
    currentUser : currentUser,
    idToken : idToken,
    tier : tier,
    credit : credit,
    setCreditCalled : setCreditCalled,
    totalMinutes : totalMinutes,
    stripe : stripePromise,
    setTotalMinutes : setTotalMinutes,
    collapsed: collapsed,
    setCollapsed:setCollapsed,
    contentName: contentName,
    setContentName:setContentName,
    userMetadata : userMetadata,
    userArcs : userArcs,
    setUserArcs : setUserArcs,
    dataGlobalArcs : dataGlobalArcs,
    setDataGlobalArcs : setDataGlobalArcs,
    sandboxHistory : sandboxHistory,
    setSandboxHistory : setSandboxHistory,
    getSandboxHistory: getSandboxHistory,
    globalLayout : globalLayout,
    setGlobalLayout : setGlobalLayout,
    userLayout : userLayout,
    setUserLayout : setUserLayout,
    submitLayout : submitLayout,
    setSubmitLayout : setSubmitLayout,
    loggedIn : loggedIn,
    setLoggedIn : setLoggedIn,

}


function adjustLayoutHeight() {
  const viewportHeight = window.innerHeight;
  document.documentElement.style.height = `${viewportHeight}px`;
  // Additionally adjust for other elements if necessary
}

useEffect(() => {
window.addEventListener('load', adjustLayoutHeight);
window.addEventListener('resize', adjustLayoutHeight);
return () => {
  window.removeEventListener('load', adjustLayoutHeight);
  window.removeEventListener('resize', adjustLayoutHeight);
}
}, []);




  return(
    <GoogleOAuthProvider clientId=  "1095799494177-qhg6sot0m532rg51j34kfrf3t0rds5sg.apps.googleusercontent.com">
<Head>

<link rel="icon" href="/favicon.ico" />
<link rel="icon" href="/favicon.png" type= "image/png"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
{/* /*meta description */}
<meta name="description" content="Convert audio to text, learn better with summaries and AI assistants, and use AI to create on top of YouTube, X Spaces, and Podcasts. Try Alphy for free!"/>

    
<style>
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap')
  </style>
   <title>Alphy - AI Transcriber, Summarizer, Assistant for YouTube, X Spaces, and Podcasts </title>
    
</Head>
    <div className="App  bg-white dark:bg-darkMode dark:text-zinc-300 text-zinc-700 ">

           <div
              className={` z-40 text-slate-700 bg-white dark:bg-darkMode  dark:text-zinc-300 dark:text-gray-200 ${
                
              'lg:hidden  top-0 w-full '
              }`}
            >
              <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>
            <ThemeProvider attribute="class" theme={theme}>

     <Component {...pageProps}  {...additionalProps} />
              </ThemeProvider>
    
    </div>
    
</GoogleOAuthProvider>
  )
}

export default MyApp