import Navbar from './components/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
// import Account from "./routes/Account.jsx.old";
import axios from 'axios';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './routes/Home';
import Article from './components/Article';
import SuperTokens, { SuperTokensWrapper, getSuperTokensRoutesForReactRouterDom } from 'supertokens-auth-react';
import { SessionAuth } from 'supertokens-auth-react/recipe/session';
import { SuperTokensConfig } from './routes/SuperTokenComponents/Config';
import Home2 from './supertokens_home';
import Footer from './components/Footer';
import { useWindowSize } from './hooks/useWindowSize';
import { offset } from '@popperjs/core';
import PrivacyPolicy from './components/PrivacyPolicy';
import NotFound from './routes/NotFound';

function App() {
	SuperTokens.init(SuperTokensConfig);
	const windowSize = useWindowSize();
	const location = useLocation();

	const [collapsed, setCollapsed] = useState(true);
	return (
		<SuperTokensWrapper>
			<div className="App">
				<Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

				<Routes>
					{getSuperTokensRoutesForReactRouterDom(require('react-router-dom'))}
					<Route
						path="/auth"
						element={
							<SessionAuth>
								<Home2 />
							</SessionAuth>
						}
					/>
					<Route path="/" element={<Home />} />
					<Route
						path="/yt/:article_ID"
						element={
							/* <SessionAuth><Article data={data} /></SessionAuth> */
							<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'youtube'} />
						}
					/>
					<Route
						path="/sp/:article_ID"
						element={
							/* <SessionAuth><Article data={data} /></SessionAuth> */
							<Article collapsed={collapsed} setCollapsed={setCollapsed} source_type={'spaces'} />
						}
					/>
					<Route path="/privacypolicy" element={<PrivacyPolicy />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				{location.pathname === '/' || location.pathname === '/privacypolicy' ? <Footer /> : null}
			</div>
		</SuperTokensWrapper>
	);
}

export default App;
