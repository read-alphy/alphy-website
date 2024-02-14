

import '../app/globals.css'

import React, { useState, useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import Navbar from '../components/Misc/Navbar'

import { useAuth } from '../hooks/useAuth'
import { initializeApp } from 'firebase/app'

import { loadStripe } from '@stripe/stripe-js'


import axios from 'axios'

import { API_URL, STRIPE_PK } from '../constants'
import getUserMetadata from '../utils/getUserMetadata'
import { useRouter } from 'next/router';
import addToUserMetadata from '../utils/addToUserMetadata'




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
    const [userArchipelagos, setUserArchipelagos] = useState([])
    const [dataGlobalArchipelagos, setDataGlobalArchipelagos] = useState([])
    const [userMetadata, setUserMetadata] = useState('')
    const [showWelcomeForm, setShowWelcomeForm] = useState(false)
    const [welcomeFormCalled, setWelcomeFormCalled] = useState(false)
    const [totalMinutes, setTotalMinutes] = useState(0)
    const [sandboxHistory, setSandboxHistory] = useState([])
    const [globalLayout, setGlobalLayout] = useState(true)
    const [userLayout, setUserLayout] = useState(false)
    const [submitLayout, setSubmitLayout] = useState(false)

  
    const [customerID, setCustomerID] = useState('')
    const [userArcsCalled, setUserArcsCalled] = useState(false)
    useEffect(() => {
        if (
            localStorage.getItem('theme') !== null &&
            localStorage.getItem('theme') !== undefined &&
            localStorage.getItem('theme').length === 0
          ) {
            if (
              window.matchMedia &&
              window.matchMedia('(prefers-color-scheme: dark)').matches
            ) {
              localStorage.setItem('theme', 'dark')
            } else {
              localStorage.setItem('theme', 'light')
            }
          }

        const urlParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlParams.entries());
        setSearchParams(params);
         
    if (sessionStorage.getItem('refreshCredit') === 'true') {
        getCustomerInfo(currentUser)
        sessionStorage.removeItem('refreshCredit')
      }

      }, []);

    
 
    
  
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
      axios.get(`${API_URL}/sandbox/?user_id=local`).then(response => {
        
        setSandboxHistory(response.data)
      })
    }
  
    useEffect(() => {
      if (sandboxHistory.length === 0) {
        getSandboxHistory()
      }
    }, [sandboxHistory])
  
    useEffect(() => {
        const verification = searchParams.mode === 'verifyEmail'
      if (verification) {
        const oobCode = urlParams.get('oobCode')
        auth.handleVerifyEmail(oobCode).then(resp => {
          localStorage.setItem('logged in', 'true')
          router.push('/u/welcome?onboarding_form')
        })
      }
  
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
        } else {
          localStorage.setItem('logged in', 'false')
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
                  // limit: 20,
                  // offset: 0,
                  only_my: true,
                },
                headers: {
                  'id-token': currentUser.accessToken,
                },
              })
              .then(response => {
                
                setUserArchipelagos(response.data)
                setUserArcsCalled(true)
              })
          }
        }
      }, 1000)
    }, [currentUser, auth, creditcalled, called,  searchParams])
  
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
    userArchipelagos : userArchipelagos,
    setUserArchipelagos : setUserArchipelagos,
    dataGlobalArchipelagos : dataGlobalArchipelagos,
    setDataGlobalArchipelagos : setDataGlobalArchipelagos,
    sandboxHistory : sandboxHistory,
    setSandboxHistory : setSandboxHistory,
    globalLayout : globalLayout,
    setGlobalLayout : setGlobalLayout,
    userLayout : userLayout,
    setUserLayout : setUserLayout,
    submitLayout : submitLayout,
    setSubmitLayout : setSubmitLayout,

}



  return(
    <GoogleOAuthProvider clientId="1095799494177-qhg6sot0m532rg51j34kfrf3t0rds5sg.apps.googleusercontent.com">
<AppRouterCacheProvider>
    <div className=" App bg-white dark:bg-darkMode dark:text-zinc-300">
    <div
              className={`${
                router.asPath.split('/')[1] === 'arc' &&
                router.asPath.split('/')[2] !== 'editArc' &&
                router.asPath.split('/')[2] !== 'createArc'
                  ? 'md:hidden'
                  : 'sm:hidden'
              }`}
            >
              <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>
    <Component {...pageProps}  {...additionalProps} />
    </div>
</AppRouterCacheProvider>
</GoogleOAuthProvider>
  )
}

export default MyApp