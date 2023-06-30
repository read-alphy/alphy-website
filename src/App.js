import Navbar from './components/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './routes/Home';
import Article from './components/Article';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import NotFound from './routes/NotFound';
import image from './img/robot.png';
import { useAuth } from './hooks/useAuth';
import { initializeApp } from 'firebase/app';
import Pricing from './routes/Pricing';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutPage from './routes/payment/CheckOutPage';
import Success from './routes/payment/Success';
import Account from './routes/Account';
import axios from 'axios';
import { Helmet } from "react-helmet";
import Auth from './routes/Auth';
import WelcomeForm from './components/WelcomeForm';
import { set } from 'lodash';









const firebaseConfig = {	
	apiKey: 'AIzaSyCQlDrSG7cOYqqOaj79hFbipJIFqzlRhwg',
	authDomain: 'auth.alphy.app',
	projectId: 'alphy-74583',
	storageBucket: 'alphy-74583.appspot.com',
	messagingSenderId: '606454102589',
	appId: '1:606454102589:web:1b94cc9a6d7b00a28c4854',
};

function App() {
	const auth = useAuth()
	const { currentUser, applyActionCode } = useAuth();
	const [hasActiveSub, setHasActiveSub] = useState(false)
	const [called, setCalled] = useState(false)
	const [credit, setCredit] = useState(0)
	const[creditcalled, setCreditCalled] = useState(false)
	const urlParams = new URLSearchParams(window.location.search);
	const [showWelcomeForm, setShowWelcomeForm] = useState(false)
	const [contentName, setContentName] = useState("")
	const [collapsed, setCollapsed] = useState(false);
	const [idToken, setIdToken] = useState("")
	

	const verification = (urlParams.get('mode')=="verifyEmail");
	


	const stripePromise = loadStripe(
		`${process.env.REACT_APP_STRIPE_PK}`
	);



useEffect(() => {

	
	if(verification){
		const url = window.location.href;
		const oobCode = urlParams.get('oobCode');
		auth.handleVerifyEmail(oobCode)
		.then((resp) => {
			setShowWelcomeForm(true)
			//window.location.reload()
		}
		)	
	}
	setTimeout (() => {
		var userId = localStorage.getItem("userId")
		
		if(userId===null || userId!==currentUser.uid){
			localStorage.setItem('userId', currentUser.uid)
		}
		
	if (currentUser !== null && called === false) {
		var userId = localStorage.getItem("userId")
	
		setIdToken(currentUser.accessToken)
		
		if(userId===null){
		localStorage.setItem('userId', currentUser.uid)
		}

		getCustomerInfo(currentUser)
		const createdAt = currentUser.metadata.createdAt
		const lastLoginAt = currentUser.metadata.lastLoginAt
		const registerRecently= parseInt(createdAt) - parseInt(lastLoginAt)
		
		
		if(registerRecently>-10000 && localStorage.getItem('welcomeForm')!=="false"){
			setShowWelcomeForm(true)
			localStorage.setItem('welcomeForm', 'false')
		}
	}

}, 1000)


if (currentUser && creditcalled!==true) {
	currentUser.getIdToken().then((idToken) => {
		axios
			.get(
				`${process.env.REACT_APP_API_URL}/payments/credit`,
				{
					headers: {
						'id-token': idToken,
					},
				},
			)
			.then((response) => {
				const [fixed, monthly] = response.data
				setCredit(fixed + monthly)
				setCreditCalled(true)
				
			})
			.catch((error) => {
				console.error(error)
			});
	});
} 
})

	const getCustomerInfo = async (currentUser) => {
        const idToken = await currentUser.getIdToken().then((idToken) => {

        axios.get(`${process.env.REACT_APP_API_URL}/payments/subscription`,
        {
            headers: {
                'id-token': idToken,
            },
        },
        )
            
            .then(r => {
				
			
                if (r.data.length>0) {
                    setCalled(true)
                    setHasActiveSub(true)
 
                }
                else {
                    setHasActiveSub(false)
                    setCalled(true)

                }
            })
		})

    }


	const location = useLocation();
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	



	return (

		
		<div className="App bg-[#fafafa] dark:bg-darkMode dark:text-zinc-300">

	{/* 		{showWelcomeForm && 
					<div className="fixed inset-0 z-50 flex items-center justify-center ">
								<div className="fixed inset-0 bg-black opacity-80"></div>
								<div className="z-10 bg-white rounded-md shadow-lg w-full max-w-lg ">
								<div className="flex  flex-col gap-6">
								
								<WelcomeForm currentUser={currentUser} setShowWelcomeForm={setShowWelcomeForm}/>
							</div>	
							</div>
							</div>
							} */}
		<Helmet>
			<title>{contentName=== undefined || contentName.length===0? "Alphy: Unlock the Information in Audiovisual Content" : contentName} </title>
			<meta name="description" content="Transcribe, summarize, and question YouTube videos and Twitter Spaces with the help of AI. Try Alphy for free!" />
		</Helmet> 
			<Elements stripe={stripePromise}>
				{process.env.REACT_APP_UNDER_CONSTRUCTION === 'true' ? (
					<>
						<div className="sm:flex sm:flex-row items-center justify-center h-screen bg-[#2D3136]">
							<img src={image} alt="robot" className="sm:w-1/2" />
							<div className="sm:w-1/2">
								<h1 className="text-3xl font-bold text-slate-300 mb-4 p-2">Alphy is under construction!</h1>
								<p className="text-lg  text-slate-200 mb-8 p-1">
									Our little robot is getting a tune-up, reach us back soon!
								</p>
							</div>
						</div>
					</>
				) : (
					<>

						<Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
						<Routes>
							<Route path="/" element={<Home hasActiveSub={hasActiveSub} currentUser={currentUser} credit = {credit} />} />
							{/* <Route path="/auth/*" element={<Auth />} /> */}
							<Route
								path="/yt/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'yt'} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken}/>
								}
							/>
							<Route
								path="/sp/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'sp'}  hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken}/>
								}
							/>
							<Route
								path="/up/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'up'} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken}/>
								}
							/>
							<Route path="/privacypolicy" element={<PrivacyPolicy />} />

							<Route path="/u/login" element={<Auth showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm}/>}></Route>
							<Route path="/u/register" element={<Auth showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm}/>}></Route>
							<Route path="/u/resetpassword" element={<Auth/>}></Route>
							

							
							<Route path="/account" element={<Account stripe={stripePromise} credit={credit} hasActiveSub={hasActiveSub}/>} /> 
							
							<Route path="/plans" element={<Pricing stripe={stripePromise} hasActiveSub={hasActiveSub}/>} />

							<Route path="/plans/checkout" element={<CheckOutPage/>}></Route>
							<Route path="/plans/checkout/success" element={<Success />}></Route>
							{/* <Route path="/prices" element={<Prices />} /> */}
							{/* <Route path="/checkout" element={<CheckOut />} /> */}
							

							<Route path="*" element={<NotFound to="/404"/>} />
							<Route path="/404" element={<NotFound />} />
						</Routes>

						{location.pathname === '/' || location.pathname === '/privacypolicy' || location.pathname==="/plans" || location.pathname==="/account" || location.pathname==="/404" ? <Footer /> : null}

					</>

				)}
			</Elements>
		</div>

	);
}

export default App;
