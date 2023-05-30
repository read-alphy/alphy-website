import Navbar from './components/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './routes/Home';
import Article from './components/Article';
import Footer from './components/Footer';
import { useWindowSize } from './hooks/useWindowSize';
import PrivacyPolicy from './components/PrivacyPolicy';
import NotFound from './routes/NotFound';
import image from './img/robot.png';
import { useAuth } from './hooks/useAuth';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Pricing from './routes/Pricing';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutPage from './routes/payment/CheckOutPage';
import Success from './routes/payment/Success';
import Account from './routes/Account';
import axios from 'axios';
import { Helmet } from "react-helmet";






const firebaseConfig = {
	apiKey: 'AIzaSyCQlDrSG7cOYqqOaj79hFbipJIFqzlRhwg',
	authDomain: 'auth.alphy.app',
	projectId: 'alphy-74583',
	storageBucket: 'alphy-74583.appspot.com',
	messagingSenderId: '606454102589',
	appId: '1:606454102589:web:1b94cc9a6d7b00a28c4854',
};

function App() {

	const { currentUser } = useAuth();
	const [hasActiveSub, setHasActiveSub] = useState(false)
	const [called, setCalled] = useState(false)
	const [credit, setCredit] = useState(0)
	const[creditcalled, setCreditCalled] = useState(false)


	const stripePromise = loadStripe(
		"pk_live_51MeGOKJmF4J0rk0xzE0Cl6UmLItHqja1URuUZGHsfOpoATmt60o5CDG3rNXyHrvd28CCxUnb5biyLOMewIz0psQz00mEIfPVl6"
	);
	
useEffect(() => {
	setTimeout (() => {
	if (currentUser !== null && called === false) {
		getCustomerInfo(currentUser)
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

	const [collapsed, setCollapsed] = useState(true);



	return (

		<div className="App bg-[#fbfbfa] dark:bg-darkMode dark:text-zinc-300">
		<Helmet>
			<title>Alphy: Unlock the Information in Audiovisual Content </title>
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
							<Route path="/" element={<Home hasActiveSub={hasActiveSub} currentUser={currentUser} credit = {credit}/>} />
							{/* <Route path="/auth/*" element={<Auth />} /> */}
							<Route
								path="/yt/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'yt'} hasActiveSub={hasActiveSub} />
								}
							/>
							<Route
								path="/sp/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'sp'}  hasActiveSub={hasActiveSub} />
								}
							/>
							<Route path="/privacypolicy" element={<PrivacyPolicy />} />


							
							<Route path="/account" element={<Account stripe={stripePromise} credit={credit}/>} /> 
							
							<Route path="/plans" element={<Pricing stripe={stripePromise} />} />

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
