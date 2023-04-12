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
import Auth from './routes/Auth';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const firebaseConfig = {
	apiKey: 'AIzaSyCQlDrSG7cOYqqOaj79hFbipJIFqzlRhwg',
	authDomain: 'alphy-74583.firebaseapp.com',
	projectId: 'alphy-74583',
	storageBucket: 'alphy-74583.appspot.com',
	messagingSenderId: '606454102589',
	appId: '1:606454102589:web:1b94cc9a6d7b00a28c4854',
};

function App() {
	const windowSize = useWindowSize();
	const location = useLocation();
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	const [collapsed, setCollapsed] = useState(true);

	return (

		<div className="App">

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
						<Route path="/" element={<Home />} />
						{/* <Route path="/auth/*" element={<Auth />} /> */}
						<Route
							path="/yt/:article_ID"
							element={
								<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'yt'} />
							}
						/>
						<Route
							path="/sp/:article_ID"
							element={
								<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'sp'} />
							}
						/>
						<Route path="/privacypolicy" element={<PrivacyPolicy />} />
						<Route path="*" element={<NotFound />} />
					</Routes>

					{location.pathname === '/' || location.pathname === '/privacypolicy' ? <Footer /> : null}
				</>
			)}
		</div>
	);
}

export default App;
