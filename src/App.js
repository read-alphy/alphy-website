import Navbar from './components/Navbar'
import { useState, useEffect } from 'react'

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Article from './components/Article'
import FeedbackComponent from './components/FeedbackComponent'
import PrivacyPolicy from './routes/PrivacyPolicy'
import NotFound from './routes/NotFound'
import image from './img/robot.png'
import { useAuth } from './hooks/useAuth'
import { initializeApp } from 'firebase/app'
import Pricing from './routes/Pricing'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckOutPage from './routes/payment/CheckOutPage'
import Success from './routes/payment/Success'
import Account from './routes/Account'
import History from './routes/History/History'

import axios from 'axios'
import { Helmet } from 'react-helmet'
import Auth from './routes/Auth'
import CrossVideo from './routes/CrossVideo/CrossVideo'
import Hub from './routes/Hub/Hub'
import MyHub from './routes/Hub/MyHub'
import FAQ from './routes/FAQ'
import WelcomePage from './routes/WelcomePage'
import SubmitPage from './routes/Hub/SubmitPage'
import { API_URL, STRIPE_PK, UNDER_CONSTRUCTION } from './constants'
import getUserMetadata from './utils/getUserMetadata'
import updateUserMetadata from './utils/updateUserMetadata'
import addToUserMetadata from './utils/addToUserMetadata'
import WelcomeForm from './components/WelcomeForm'

const firebaseConfig = {
  apiKey: 'AIzaSyCQlDrSG7cOYqqOaj79hFbipJIFqzlRhwg',
  authDomain: 'auth.alphy.app',
  projectId: 'alphy-74583',
  storageBucket: 'alphy-74583.appspot.com',
  messagingSenderId: '606454102589',
  appId: '1:606454102589:web:1b94cc9a6d7b00a28c4854',
}

function App() {
  const auth = useAuth()
  const { currentUser } = useAuth()

  const [called, setCalled] = useState(false)
  const [tier, setTier] = useState('free')
  const [credit, setCredit] = useState(0)
  const [creditcalled, setCreditCalled] = useState(false)
  const urlParams = new URLSearchParams(window.location.search)

  const [contentName, setContentName] = useState('')
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768)
  const [idToken, setIdToken] = useState('')
  const [userArchipelagos, setUserArchipelagos] = useState([])
  const [dataGlobalArchipelagos, setDataGlobalArchipelagos] = useState([])
  const [userMetadata, setUserMetadata] = useState('')
  const [showWelcomeForm, setShowWelcomeForm] = useState(false)
  const [welcomeFormCalled, setWelcomeFormCalled] = useState(false)
  const [totalMinutes, setTotalMinutes] = useState(0)
  const [sandboxHistory, setSandboxHistory] = useState([])
  const [sandboxHistoryCalled, setSandboxHistoryCalled] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const [customerID, setCustomerID] = useState('')
  const [userArcsCalled, setUserArcsCalled] = useState(false)

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
  const verification = urlParams.get('mode') === 'verifyEmail'
  const navigate = useNavigate()

  const stripePromise = loadStripe(`${STRIPE_PK}`)

  useEffect(() => {
    // TODO this delays the loading of the page, but it's necessary to get the user's idToken.
    // Find a way to store idToken in local storage, minding the expiration behavior.
    // Would improve performance throughout.

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

  const resetPassword = urlParams.get('mode') === 'resetPassword'

  useEffect(() => {
    if (resetPassword) {
      if (location.pathname.includes('/u/resetpassword') === false) {
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
        console.log(response.data)
      })
  }

  useEffect(() => {
    if (sandboxHistoryCalled === false && currentUser) {
      getSandboxHistory()
    }
  }, [sandboxHistory, currentUser])

  useEffect(() => {
    if (verification) {
      const oobCode = urlParams.get('oobCode')
      auth.handleVerifyEmail(oobCode).then(resp => {
        localStorage.setItem('logged in', 'true')
        setLoggedIn(true)
        navigate('/u/welcome?onboarding_form')
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
        setLoggedIn(true)
      } else {
        localStorage.setItem('logged in', 'false')
        setLoggedIn(false)
        setTier(null)
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
  }, [currentUser, auth, creditcalled, called, verification, urlParams])

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
  const location = useLocation()
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

  if (sessionStorage.getItem('refreshCredit') === 'true') {
    getCustomerInfo(currentUser)
    sessionStorage.removeItem('refreshCredit')
  }


  return (
    <div className="App bg-white dark:bg-darkMode dark:text-zinc-300">
      <Helmet>
        <title>
          {contentName === undefined || contentName.length === 0
            ? 'Alphy: Unlock the Information in Audiovisual Content'
            : contentName}{' '}
        </title>
        <meta
          name="description"
          content="Transcribe, question, and summarize audio with the help of AI. Try Alphy for free!"
        />
        <meta
          content="Transcribe, question, and summarize audio with the help of AI. Try Alphy for free!"
          property="og:description"
        />
	return (


		<div className="App bg-white dark:bg-darkMode dark:text-zinc-300">


			{/* 	{showWelcomeForm && 




					<div className={`fixed inset-0 z-50 flex items-center justify-center`} >
								<div className="fixed inset-0 bg-black opacity-80"></div>
								<div className="z-10 bg-white dark:bg-mildDarkMode rounded-md shadow-lg w-full max-w-lg  ">
								<div className="flex  flex-col gap-6">
								
								<WelcomeForm currentUser={currentUser} userMetadata = {userMetadata} setUserMetadata={setUserMetadata} setShowWelcomeForm={setShowWelcomeForm} />
							</div>	
							</div>
							</div>
							}  */}
							
			<Helmet>
				<title>{contentName === undefined || contentName.length === 0 ? "Alphy: Unlock the Information in Audiovisual Content" : contentName} </title>
				<meta name="description" content="Transcribe, question, and summarize audio with the help of AI. Try Alphy for free!" />
				<meta content="Transcribe, question, and summarize audio with the help of AI. Try Alphy for free!" property="og:description" />

        <meta
          property="og:title"
          content="Alphy: Unlock the information in audiovisual content"
        />
        <meta
          name="twitter:title"
          content="Alphy: Unlock the Information in Audiovisual Content"
        />
      </Helmet>

      <Elements stripe={stripePromise}>
        {UNDER_CONSTRUCTION === 'true' ? (
          <>
            <div className="sm:flex sm:flex-row items-center justify-center h-screen bg-[#2D3136]">
              <img src={image} alt="robot" className="sm:w-1/2" />
              <div className="sm:w-1/2">
                <h1 className="text-3xl font-bold text-slate-300 mb-4 p-2">
                  Alphy is under construction!
                </h1>
                <p className="text-lg  text-slate-200 mb-8 p-1">
                  Our little robot is getting a tune-up, reach us back soon!
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={`${
                location.pathname.split('/')[1] === 'arc' &&
                location.pathname.split('/')[2] !== 'editArc' &&
                location.pathname.split('/')[2] !== 'createArc'
                  ? 'md:hidden'
                  : 'sm:hidden'
              }`}
            >
              <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>
            <Routes>
              <Route
                path="/yt/:article_ID"
                element={
                  <Article
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    source_type={'yt'}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    currentUser={currentUser}
                    idToken={idToken}
                    userArchipelagos={userArchipelagos}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    getSandboxHistory={getSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/sp/:article_ID"
                element={
                  <Article
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    source_type={'sp'}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    currentUser={currentUser}
                    idToken={idToken}
                    userArchipelagos={userArchipelagos}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    getSandboxHistory={getSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/x/:article_ID"
                element={
                  <Article
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    source_type={'x'}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    currentUser={currentUser}
                    idToken={idToken}
                    userArchipelagos={userArchipelagos}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    getSandboxHistory={getSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/tw/:article_ID"
                element={
                  <Article
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    source_type={'tw'}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    currentUser={currentUser}
                    idToken={idToken}
                    userArchipelagos={userArchipelagos}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    getSandboxHistory={getSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/ap/:article_ID"
                element={
                  <Article
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    source_type={'ap'}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    currentUser={currentUser}
                    idToken={idToken}
                    userArchipelagos={userArchipelagos}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    getSandboxHistory={getSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/up/:article_ID"
                element={
                  <Article
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    source_type={'up'}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    currentUser={currentUser}
                    idToken={idToken}
                    userArchipelagos={userArchipelagos}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    getSandboxHistory={getSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              {/* 
              <Route
                path="/archipelago/:archipelago_ID"
                element={
                  <CrossVideo
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                  />
                }
              ></Route>
              <Route
                path="/archipelago/createArchipelago"
                element={
                  <CrossVideo
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    userArchipelagos={userArchipelagos}
                    tier={tier}
                    setUserArchipelagos={setUserArchipelagos}
                    contentName={contentName}
                    setContentName={setContentName}
                  />
                }
              >
                {' '}
              </Route>

              <Route
                path="/archipelago/editArchipelago/:archipelago_ID"
                element={
                  <CrossVideo
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    userArchipelagos={userArchipelagos}
                    setUserArchipelagos={setUserArchipelagos}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                  />
                }
              >
                {' '}
              </Route> */}

              <Route
                path="/arc/:arc_ID"
                element={
                  <CrossVideo
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    setContentName={setContentName}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>
              <Route
                path="/history"
                element={
                  <History
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    source_type={'yt'}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    currentUser={currentUser}
                    idToken={idToken}
                    userArchipelagos={userArchipelagos}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />

              <Route
                path="/arc/createArc"
                element={
                  <CrossVideo
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    userArchipelagos={userArchipelagos}
                    tier={tier}
                    setUserArchipelagos={setUserArchipelagos}
                    contentName={contentName}
                    setContentName={setContentName}
                    credit={credit}
                    setCreditCalled={setCreditCalled}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              >
                {' '}
              </Route>

              <Route
                path="/arc/editArc/:archipelago_ID"
                element={
                  <CrossVideo
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    userArchipelagos={userArchipelagos}
                    setUserArchipelagos={setUserArchipelagos}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    credit={credit}
                    setCreditCalled={setCreditCalled}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              >
                {' '}
              </Route>

              <Route
                path="/"
                element={
                  <Hub
                    arcs={false}
                    credit={credit}
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    dataGlobalArchipelagos={dataGlobalArchipelagos}
                    setDataGlobalArchipelagos={setDataGlobalArchipelagos}
                    userArchipelagos={userArchipelagos}
                    setUserArchipelagos={setUserArchipelagos}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    totalMinutes={totalMinutes}
                    setTotalMinutes={setTotalMinutes}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>
              <Route
                path="/explore"
                element={
                  <Hub
                    arcs={false}
                    credit={credit}
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    dataGlobalArchipelagos={dataGlobalArchipelagos}
                    userArchipelagos={userArchipelagos}
                    setUserArchipelagos={setUserArchipelagos}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>

              <Route
                path="/arcs"
                element={
                  <Hub
                    arcs={true}
                    credit={credit}
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    dataGlobalArchipelagos={dataGlobalArchipelagos}
                    setDataGlobalArchipelagos={setDataGlobalArchipelagos}
                    userArchipelagos={userArchipelagos}
                    setUserArchipelagos={setUserArchipelagos}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>

              <Route
                path="/myhub"
                element={
                  <MyHub
                    credit={credit}
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    dataGlobalArchipelagos={dataGlobalArchipelagos}
                    userArchipelagos={userArchipelagos}
                    setUserArchipelagos={setUserArchipelagos}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>
              <Route
                path="/submit"
                element={
                  <SubmitPage
                    credit={credit}
                    setCreditCalled={setCreditCalled}
                    currentUser={currentUser}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    dataGlobalArchipelagos={dataGlobalArchipelagos}
                    userArchipelagos={userArchipelagos}
                    setUserArchipelagos={setUserArchipelagos}
                    tier={tier}
                    contentName={contentName}
                    setContentName={setContentName}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>

              {/* <Route path = "/home"
									element={<Home arcs={false} credit={credit} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} tier={tier} contentName={contentName} setContentName={setContentName}/>}>
							</Route> */}

              <Route
                path="/about"
                element={
                  <FAQ
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    showWelcomeForm={showWelcomeForm}
                    setShowWelcomeForm={setShowWelcomeForm}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/privacypolicy"
                element={
                  <PrivacyPolicy
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    showWelcomeForm={showWelcomeForm}
                    setShowWelcomeForm={setShowWelcomeForm}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/u/login"
                element={
                  <Auth
                    showWelcomeForm={showWelcomeForm}
                    setShowWelcomeForm={setShowWelcomeForm}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>
              <Route
                path="/u/register"
                element={
                  <Auth
                    showWelcomeForm={showWelcomeForm}
                    setShowWelcomeForm={setShowWelcomeForm}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>

              <Route
                path="/u/welcome"
                element={
                  <WelcomePage
                    showWelcomeForm={showWelcomeForm}
                    setShowWelcomeForm={setShowWelcomeForm}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>

              <Route
                path="/u/resetpassword"
                element={
                  <Auth
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>
              <Route
                path="/account"
                element={
                  <Account
                    currentUser={currentUser}
                    stripe={stripePromise}
                    credit={credit}
                    tier={tier}
                    idToken={idToken}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    customerID={customerID}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/plans"
                element={
                  <Pricing
                    stripe={stripePromise}
                    tier={tier}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/plans/checkout"
                element={
                  <CheckOutPage
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>
              <Route
                path="/plans/checkout/success"
                element={
                  <Success
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              ></Route>
              <Route
                path="*"
                element={
                  <NotFound
                    to="/404"
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
              <Route
                path="/404"
                element={
                  <NotFound
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    tier={tier}
                    currentUser={currentUser}
                    sandboxHistory={sandboxHistory}
                    setSandboxHistory={setSandboxHistory}
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                  />
                }
              />
            </Routes>
          </>
        )}
      </Elements>
      {/* location.pathname.includes('/x/') === false &&
        location.pathname.includes('/yt/') === false &&
        location.pathname.includes('/sp/') === false &&
        location.pathname.includes('/tw/') === false &&
        location.pathname.includes('/tv/') === false &&
        location.pathname.includes('/ap/') === false &&
        location.pathname.includes('/up/') === false &&
        location.pathname.includes('/arc/') === false && (
          <FeedbackComponent
            currentUser={currentUser}
            userMetadata={userMetadata}
            setUserMetadata={setUserMetadata}
          />
        ) */}
    </div>
  )
}

export default App
