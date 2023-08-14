import Navbar from './components/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './routes/Home';
import Article from './components/Article';
import Footer from './components/Footer';
import PrivacyPolicy from './routes/PrivacyPolicy';
import NotFound from './routes/NotFound';
import image from './img/robot.png';
import { useAuth } from './hooks/useAuth';
import { initializeApp } from 'firebase/app';
import Pricing from './routes/Pricing';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutPage from './routes/payment/CheckOutPage';
import Success from './routes/payment/SuccessInfo';
import Account from './routes/Account';
import axios from 'axios';
import { Helmet } from "react-helmet";
import Auth from './routes/Auth';
import CrossVideo from './routes/CrossVideo/CrossVideo';
import Hub from './routes/Hub/Hub';
import MyHub from './routes/Hub/MyHub';
import FAQ from "./routes/FAQ"
import SubmitPage from "./routes/Hub/SubmitPage"
import WelcomeForm from './components/WelcomeForm';









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
	const [hasActiveSub, setHasActiveSub] = useState(false)
	const [called, setCalled] = useState(false)
	const [credit, setCredit] = useState(0)
	const[creditcalled, setCreditCalled] = useState(false)
	const urlParams = new URLSearchParams(window.location.search);
	const [showWelcomeForm, setShowWelcomeForm] = useState(false)
	const [contentName, setContentName] = useState("")
	const [collapsed, setCollapsed] = useState(false);
	const [idToken, setIdToken] = useState("")
	const [userArchipelagos, setUserArchipelagos] = useState([])
	const [dataGlobalArchipelagos , setDataGlobalArchipelagos] = useState([])
	const [isLoadingGlobalArchipelagos, setIsLoadingGlobalArchipelagos] = useState(true);
	const [clientSecret, setClientSecret] = useState("");

	if(localStorage.getItem("theme")!== null && localStorage.getItem("theme")!==undefined && localStorage.getItem("theme").length===0){
		if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
			localStorage.setItem("theme", "dark")
		}
		else{
			localStorage.setItem("theme", "light")
		}
	}
	const verification = (urlParams.get('mode')=="verifyEmail");
	


	const stripePromise = loadStripe(
		`${process.env.REACT_APP_STRIPE_PK}`
	);

useEffect(() => {
	getDataGlobalArchipelagos(0, true, true)
}, [])

const resetPassword = (urlParams.get('mode')=="resetPassword");


	useEffect(() => {
		if(resetPassword){

			if( location.pathname.includes("/u/resetpassword") === false){
			const url = window.location.href;
			const [baseUrl, queryString] = url.split('?');
			console.log(baseUrl, queryString)
			window.location.href = (`${baseUrl}u/resetpassword/?${queryString}`);
			
		}
	
		}


	}, []);




useEffect(() => {
	if(verification){
		const url = window.location.href;
		const oobCode = urlParams.get('oobCode');
		auth.handleVerifyEmail(oobCode)
		.then((resp) => {
			setShowWelcomeForm(true)
			localStorage.setItem("logged in","true")
		}
		)	
	} 

	
	setTimeout (() => {
		var userId = localStorage.getItem("userId")
		
		if(userId===null || (currentUser!==undefined && currentUser!==null && currentUser.uid!== null && userId!==currentUser.uid)){
			localStorage.setItem('userId', currentUser.uid)
		}
		
	if (currentUser !== null && called === false) {
		var userId = localStorage.getItem("userId")
		localStorage.setItem("logged in","true")
		setIdToken(currentUser.accessToken)
		
		if(userId===null){
			localStorage.setItem('userId', currentUser.uid)
		}
		if(!called){
		setTimeout (() => {
				getCustomerInfo(currentUser)
		}, 500)
		}
		
		const createdAt = currentUser.metadata.createdAt
		const lastLoginAt = currentUser.metadata.lastLoginAt
		const registerRecently= parseInt(createdAt) - parseInt(lastLoginAt)
		
		
		if(registerRecently>-10000 && localStorage.getItem('welcomeForm')!=="false"){
			setShowWelcomeForm(true)
			localStorage.setItem('welcomeForm', 'false')
		}

		axios.get(`${process.env.REACT_APP_API_URL}/playlists/?user_id=${currentUser.uid}`).then((response) => {
			setUserArchipelagos(response.data)
		})
	}
	

}, 1000)

let i = 0

if (currentUser && creditcalled!==true) {
	if (i===0){
	currentUser.getIdToken().then((idToken) => {
		i=i+1
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
	}
);

}} 
}, [currentUser, auth, creditcalled, called, verification]) 







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
	const limit = 20
	


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
		if(!hasMoreGlobalArchipelagos){
			return;
		}
		setIsLoadingGlobalArchipelagos(true);
		axios.get(`${process.env.REACT_APP_API_URL}/playlists/?user_id=dUfMZPwN8fcxoBtoYeBuR5ENiBD3&limit=${limit}&offset=${offsetGlobalArchipelagos}`)
		.then((response) => {

			if(firstTime){
				shuffleArray(response.data)
				setDataGlobalArchipelagos(response.data);
			}
			else{
				shuffleArray(response.data)
				setDataGlobalArchipelagos([...dataGlobalArchipelagos, ...response.data]);
			}
			setIsLoadingGlobalArchipelagos(false);
			setTimeout(() => {
				const elements = document.querySelectorAll(".styles-module_item-provider__YgMwz")
				if(elements){
					elements.forEach(element => {
						element.classList.add('cursor-default');
					});
			}
				}, 500);

		})
		.catch((error) => {
			setIsLoadingGlobalArchipelagos(false);
		}
		)
	}
	const location = useLocation();
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	


	return (

		
		<div className="App bg-[#fafafa] dark:bg-darkMode dark:text-zinc-300">

	{showWelcomeForm && 
					<div className="fixed inset-0 z-50 flex items-center justify-center ">
								<div className="fixed inset-0 bg-black opacity-80"></div>
								<div className="z-10 bg-white dark:bg-mildDarkMode rounded-md shadow-lg w-full max-w-lg ">
								<div className="flex  flex-col gap-6">
								
								<WelcomeForm currentUser={currentUser} setShowWelcomeForm={setShowWelcomeForm}/>
							</div>	
							</div>
							</div>
							} 
							
		<Helmet>
			<title>{contentName=== undefined || contentName.length===0? "Alphy: Unlock the Information in Audiovisual Content" : contentName} </title>
			<meta name="description" content="Transcribe, question, and summarize audio with the help of AI. Try Alphy for free!" />
			<meta content="Transcribe, question, and summarize audio with the help of AI. Try Alphy for free!"  property="og:description"/>

			<meta property="og:title" content="Alphy: Unlock the information in audiovisual content" />
  			<meta name="twitter:title" content="Alphy: Unlock the Information in Audiovisual Content" />
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

						 <div className={`${location.pathname.split('/')[1]==="arc" && location.pathname.split('/')[2]!=="editArc" && location.pathname.split('/')[2]!=="createArc"
? "md:hidden": "sm:hidden"}`}>
						 <Navbar collapsed={collapsed} setCollapsed={setCollapsed} /> 
						 </div>
						<Routes>
							{/* <Route path="/" element={<Home hasActiveSub={hasActiveSub} currentUser={currentUser} credit = {credit} userArchipelagos={userArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos}/>} /> */}
							
							<Route
								path="/yt/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'yt'} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken} userArchipelagos={userArchipelagos}/>
								}
							/>
							<Route
								path="/sp/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'sp'}  hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken} userArchipelagos={userArchipelagos}/>
								}
							/>
							<Route
								path="/up/:article_ID"
								element={
									<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'up'} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName} currentUser={currentUser} idToken={idToken} userArchipelagos={userArchipelagos}/>
								}
							/>

							<Route path="/archipelago/:archipelago_ID" element={
							<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName} />
							}></Route>
								<Route path="/archipelago/createArchipelago" element={
								
								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} userArchipelagos={userArchipelagos} hasActiveSub={hasActiveSub} setUserArchipelagos={setUserArchipelagos} contentName={contentName} setContentName={setContentName}/>
							
							}> </Route>

							<Route path="/archipelago/editArchipelago/:archipelago_ID" element={
								
								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName}/>
							
							}> </Route>

				<Route path="/arc/:arc_ID" element={
							<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} hasActiveSub={hasActiveSub} setContentName={setContentName} />
							}></Route>
								<Route path="/arc/createArc" element={
								
								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} userArchipelagos={userArchipelagos} hasActiveSub={hasActiveSub} setUserArchipelagos={setUserArchipelagos} contentName={contentName} setContentName={setContentName} credit={credit} setCreditCalled={setCreditCalled}/>
							
							}> </Route>

							<Route path="/arc/editArc/:archipelago_ID" element={
								
								<CrossVideo currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName} credit={credit} setCreditCalled={setCreditCalled}/>
							
							}> </Route>

							<Route path="/"
								element={<Hub arcs={false} credit={credit} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName}/>}>
							</Route>
							
							<Route path="/arcs"
								element={<Hub arcs={true} credit={credit} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName}/>}>
							</Route>
					
							<Route path="/myhub"
								element={<MyHub credit={credit} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName}/>}>
							</Route>
							<Route path="/submit"
								element={<SubmitPage credit={credit} setCreditCalled={setCreditCalled} currentUser={currentUser} collapsed={collapsed} setCollapsed={setCollapsed} dataGlobalArchipelagos={dataGlobalArchipelagos} userArchipelagos={userArchipelagos} setUserArchipelagos={setUserArchipelagos} hasActiveSub={hasActiveSub} contentName={contentName} setContentName={setContentName}/>}>
							</Route>

							<Route path="/FAQ" element= {<FAQ collapsed={collapsed} setCollapsed={setCollapsed} hasActiveSub={hasActiveSub} showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm}/>} />
							<Route path="/privacypolicy" element={<PrivacyPolicy collapsed={collapsed} setCollapsed={setCollapsed} hasActiveSub={hasActiveSub} showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm}/>} />
							<Route path="/u/login" element={<Auth showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm} collapsed={collapsed} setCollapsed={setCollapsed} hasActiveSub={hasActiveSub}/>}></Route>
							<Route path="/u/register" element={<Auth showWelcomeForm={showWelcomeForm} setShowWelcomeForm={setShowWelcomeForm} collapsed={collapsed} setCollapsed={setCollapsed} hasActiveSub={hasActiveSub}/>}></Route>
							<Route path="/u/resetpassword" element={<Auth collapsed={collapsed} setCollapsed={setCollapsed}/>}></Route>
							<Route path="/account" element={<Account currentUser={currentUser} stripe={stripePromise} credit={credit} hasActiveSub={hasActiveSub} idToken={idToken} collapsed={collapsed} setCollapsed={setCollapsed}/>}/> 
							<Route path="/plans" element={<Pricing stripe={stripePromise} hasActiveSub={hasActiveSub} collapsed={collapsed} setCollapsed={setCollapsed}/>}/>
							<Route path="/plans/checkout" element={<CheckOutPage collapsed={collapsed} setCollapsed={setCollapsed}  hasActiveSub={hasActiveSub}/>}></Route>
							<Route path="/plans/checkout/success" element={<Success collapsed={collapsed} setCollapsed={setCollapsed}  hasActiveSub={hasActiveSub}/>}></Route>
							<Route path="*" element={<NotFound to="/404" collapsed={collapsed} setCollapsed={setCollapsed}  hasActiveSub={hasActiveSub}/>}/>
							<Route path="/404" element={<NotFound collapsed={collapsed} setCollapsed={setCollapsed}  hasActiveSub={hasActiveSub}/>}/>

						</Routes>

						{/* {location.pathname === '/' || location.pathname === '/privacypolicy' || location.pathname==="/plans" || location.pathname==="/account" || location.pathname==="/404" ? <Footer /> : null} */}

					</>

				)}
			</Elements>
		</div>

	);
}

export default App;
