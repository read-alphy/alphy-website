import Navbar from './components/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Article from './components/Article';
import PrivacyPolicy from './routes/PrivacyPolicy';
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
import CrossVideo from './routes/CrossVideo/CrossVideo';
import Hub from './routes/Hub/Hub';
import MyHub from './routes/Hub/MyHub';
import FAQ from "./routes/FAQ"
import SubmitPage from "./routes/Hub/SubmitPage"
import { API_URL, STRIPE_PK, UNDER_CONSTRUCTION } from "./constants"


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
	const { currentUser } = useAuth();

	const [called, setCalled] = useState(false)
	const [tier, setTier] = useState("free")
	const [credit, setCredit] = useState(0)
	const [creditcalled, setCreditCalled] = useState(false)
	const urlParams = new URLSearchParams(window.location.search);
	const [showWelcomeForm, setShowWelcomeForm] = useState(false)
	const [contentName, setContentName] = useState("")
	const [collapsed, setCollapsed] = useState(window.innerWidth < 768 ? true : false);
	const [idToken, setIdToken] = useState("")
	const [userArchipelagos, setUserArchipelagos] = useState([])
	const [dataGlobalArchipelagos, setDataGlobalArchipelagos] = useState([])

	const [customerID, setCustomerID] = useState("");
	const [userArcsCalled, setUserArcsCalled] = useState(false)

	if (localStorage.getItem("theme") !== null && localStorage.getItem("theme") !== undefined && localStorage.getItem("theme").length === 0) {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			localStorage.setItem("theme", "dark")
		}
		else {
			localStorage.setItem("theme", "light")
		}
	}
	const verification = (urlParams.get('mode') === "verifyEmail");



	const stripePromise = loadStripe(
		`${STRIPE_PK}`
	);

	useEffect(() => {
		// TODO this delays the loading of the page, but it's necessary to get the user's idToken.
		// Find a way to store idToken in local storage, minding the expiration behavior.
		// Would improve performance throughout.
		getDataGlobalArchipelagos(0, true, true, idToken)

	}, [idToken])

	const resetPassword = (urlParams.get('mode') === "resetPassword");


	useEffect(() => {
		if (resetPassword) {

			if (location.pathname.includes("/u/resetpassword") === false) {
				const url = window.location.href;
				const [baseUrl, queryString] = url.split('?');
				window.location.href = (`${baseUrl}u/resetpassword/?${queryString}`);

			}

		}


	}, []);


	useEffect(() => {
		if (verification) {

			const oobCode = urlParams.get('oobCode');
			auth.handleVerifyEmail(oobCode)
				.then((resp) => {
					setShowWelcomeForm(true)
					localStorage.setItem("logged in", "true")
				}
				)
		}



		setTimeout(() => {
			var userId = localStorage.getItem("userId")

			if (userId === null && (currentUser !== undefined && currentUser !== null && currentUser.uid !== null && userId !== currentUser.uid)) {
				localStorage.setItem('userId', currentUser.uid)
			}
			if (currentUser) { localStorage.setItem("logged in", "true") }
			else {
				localStorage.setItem("logged in", "false")
			}

			if (currentUser !== null && called === false) {


				setIdToken(currentUser.accessToken)
				localStorage.setItem("idToken", currentUser.accessToken)

				if (userId === null) {
					localStorage.setItem('userId', currentUser.uid)
				}
				if (!called) {
					setTimeout(() => {
						getCustomerInfo(currentUser)
					}, 500)
				}

				const createdAt = currentUser.metadata.createdAt
				const lastLoginAt = currentUser.metadata.lastLoginAt
				const registerRecently = parseInt(createdAt) - parseInt(lastLoginAt)


				if (registerRecently > -10000 && localStorage.getItem('welcomeForm') !== "false") {
					setShowWelcomeForm(true)
					localStorage.setItem('welcomeForm', 'false')
				}

				if (userArcsCalled === false) {
					axios.get(`${API_URL}/playlists/`, {
						params: {
							// limit: 20,
							// offset: 0,
							only_my: true,
						},
						headers: {
							"id-token": currentUser.accessToken,
						}
					}).then((response) => {
						setUserArchipelagos(response.data)
						setUserArcsCalled(true)
					})
				}
			}


		}, 1000)





	}, [currentUser, auth, creditcalled, called, verification, urlParams])



	const getCustomerInfo = async (currentUser) => {




		await currentUser.getIdToken().then((idToken) => {

			axios.get(`${API_URL}/payments/status`,
				{
					headers: {
						'id-token': idToken,
					},
				},
			)

				.then(r => {
					/* console.log(r.data) */
					if (r.data.current_tier !== null) {
						setTier(r.data.current_tier)
						localStorage.setItem("tier", r.data.current_tier ? r.data.current_tier : "free")
					}

					setCustomerID(r.data.customer_id)
					setCredit(r.data.rem_mins_sub_credits[0] + r.data.rem_mins_sub_credits[1])
					setCalled(true)
				})
				.catch(e => {
					console.log(e)
					setCalled(true)
					setTier("free")
					localStorage.setItem("tier", "free")

				})
		})

	}
	const limit = 40



	/* const { currentUser } = useAuth(); */
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	const getDataGlobalArchipelagos = (offsetGlobalArchipelagos, firstTime, hasMoreGlobalArchipelagos) => {
		if (!hasMoreGlobalArchipelagos) {
			return;
		}


		axios.get(`${API_URL}/playlists/`, {
			params: {
				user_id: 'dUfMZPwN8fcxoBtoYeBuR5ENiBD3',
				limit: limit,
				offset: offsetGlobalArchipelagos
			},
			headers: {
				'accept': 'application/json',
				'id-token': idToken
			}
		})
			.then((response) => {
				if (firstTime) {
					shuffleArray(response.data)

					/* setDataGlobalArchipelagos(response.data); */
					let temporary = []
					response.data.forEach((item) => {
						if (item.user_id === null || item.user_id === "dUfMZPwN8fcxoBtoYeBuR5ENiBD3") {
							temporary.push(item)
						}
					});
					setDataGlobalArchipelagos(temporary);
				}
				else {
					shuffleArray(response.data)
					let temporary = []
					response.data.forEach((item) => {
						if (item.user_id === null || item.user_id === "dUfMZPwN8fcxoBtoYeBuR5ENiBD3") {
							temporary.push(item)
						}
					});
					setDataGlobalArchipelagos(temporary);
				}

				setTimeout(() => {
					const elements = document.querySelectorAll(".styles-module_item-provider__YgMwz")
					if (elements) {
						elements.forEach(element => {
							element.classList.add('cursor-default');
						});
					}
				}, 500);

			})
			.catch((error) => {
				console.log(error)
			}
			)
	}
	const location = useLocation();
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);



	if (sessionStorage.getItem("refreshCredit") === "true") {
		getCustomerInfo(currentUser)
		sessionStorage.removeItem("refreshCredit")
	}


	return (


		<div className="App bg-white dark:bg-darkMode dark:text-zinc-300">

			{/* 	{showWelcomeForm && 
					<div className="fixed inset-0 z-50 flex items-center justify-center ">
								<div className="fixed inset-0 bg-black opacity-80"></div>
								<div className="z-10 bg-white dark:bg-mildDarkMode rounded-md shadow-lg w-full max-w-lg ">
								<div className="flex  flex-col gap-6">
								
								<WelcomeForm currentUser={currentUser} setShowWelcomeForm={setShowWelcomeForm}/>
							</div>	
							</div>
							</div>
							} 
							 */}
			<Helmet>
				<title>{contentName === undefined || contentName.length === 0 ? "Alphy: Unlock the Information in Audiovisual Content" : contentName} </title>
				<meta name="description" content="Transcribe, question, and summarize audio with the help of AI. Try Alphy for free!" />
				<meta content="Transcribe, question, and summarize audio with the help of AI. Try Alphy for free!" property="og:description" />

				<meta property="og:title" content="Alphy: Unlock the information in audiovisual content" />
				<meta name="twitter:title" content="Alphy: Unlock the Information in Audiovisual Content" />
			</Helmet>

			


			<Elements stripe={stripePromise}>
				{UNDER_CONSTRUCTION === 'true' ? (
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

						<div className={`${location.pathname.split('/')[1] === "arc" && location.pathname.split('/')[2] !== "editArc" && location.pathname.split('/')[2] !== "createArc"
							? "md:hidden" : "sm:hidden"}`}>
							<Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
						</div>
						<Routes>


							<Route
								path="/yt/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'yt'} tier={tier} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken} userArchipelagos={userArchipelagos} />
								}
							/>
							<Route
								path="/sp/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'sp'} tier={tier} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken} userArchipelagos={userArchipelagos} />
								}
							/>
							<Route
								path="/x/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'x'} tier={tier} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken} userArchipelagos={userArchipelagos} />
								}
							/>
							<Route
								path="/tw/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'tw'} tier={tier} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken} userArchipelagos={userArchipelagos} />
								}
							/>
							<Route
								path="/ap/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'ap'} tier={tier} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken} userArchipelagos={userArchipelagos} />
								}
							/>
							<Route
								path="/up/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'up'} tier={tier} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken} userArchipelagos={userArchipelagos} />
								}
							/>

							<Route path="/archipelago/:archipelago_ID" element={
								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} contentName={contentName} setContentName={setContentName} />
							}></Route>
							<Route path="/archipelago/createArchipelago" element={

								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} userArchipelagos={userArchipelagos} tier={tier} setUserArchipelagos={setUserArchipelagos} contentName={contentName} setContentName={setContentName} />

							}> </Route>

							<Route path="/archipelago/editArchipelago/:archipelago_ID" element={

								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} tier={tier} contentName={contentName} setContentName={setContentName} />

							}> </Route>

							<Route path="/arc/:arc_ID" element={
								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} setContentName={setContentName} />
							}></Route>
							<Route path="/arc/createArc" element={

								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} userArchipelagos={userArchipelagos} tier={tier} setUserArchipelagos={setUserArchipelagos} contentName={contentName} setContentName={setContentName} credit={credit} setCreditCalled={setCreditCalled} />

							}> </Route>

							<Route path="/arc/editArc/:archipelago_ID" element={

								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} tier={tier} contentName={contentName} setContentName={setContentName} credit={credit} setCreditCalled={setCreditCalled} />

							}> </Route>

							<Route path="/"
								element={<Hub arcs={false} credit={credit} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} tier={tier} contentName={contentName} setContentName={setContentName} />}>
							</Route>
							<Route path="/explore"
								element={<Hub arcs={false} credit={credit} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} tier={tier} contentName={contentName} setContentName={setContentName} />}>
							</Route>

							<Route path="/arcs"
								element={<Hub arcs={true} credit={credit} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} tier={tier} contentName={contentName} setContentName={setContentName} />}>
							</Route>

							<Route path="/myhub"
								element={<MyHub credit={credit} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} tier={tier} contentName={contentName} setContentName={setContentName} />}>
							</Route>
							<Route path="/submit"
								element={<SubmitPage credit={credit} setCreditCalled={setCreditCalled} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} tier={tier} contentName={contentName} setContentName={setContentName} />}>
							</Route>

							{/* <Route path = "/home"
									element={<Home arcs={false} credit={credit} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} tier={tier} contentName={contentName} setContentName={setContentName}/>}>
							</Route> */}

							<Route path="/about" element={<FAQ collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm} />} />
							<Route path="/privacypolicy" element={<PrivacyPolicy collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm} />} />
							<Route path="/u/login" element={<Auth showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm} collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} />}></Route>
							<Route path="/u/register" element={<Auth showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm} collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} />}></Route>
							<Route path="/u/resetpassword" element={<Auth collapsed={collapsed} setCollapsed={setCollapsed} />}></Route>
							<Route path="/account" element={<Account currentUser={currentUser} stripe={stripePromise} credit={credit} tier={tier} idToken={idToken} collapsed={collapsed} setCollapsed={setCollapsed} customerID={customerID} />} />
							<Route path="/plans" element={<Pricing stripe={stripePromise} tier={tier} collapsed={collapsed} setCollapsed={setCollapsed} />} />
							<Route path="/plans/checkout" element={<CheckOutPage collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} />}></Route>
							<Route path="/plans/checkout/success" element={<Success collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} />}></Route>
							<Route path="*" element={<NotFound to="/404" collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} />} />
							<Route path="/404" element={<NotFound collapsed={collapsed} setCollapsed={setCollapsed} tier={tier} />} />

						</Routes>



					</>

				)}
					
			</Elements>

		</div>

	);
}

export default App;
