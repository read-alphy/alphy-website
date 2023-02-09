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

function App() {
	SuperTokens.init(SuperTokensConfig);
	const windowSize = useWindowSize();
	const location = useLocation();

	const url = `https://backend-production-33df.up.railway.app/summaries?limit=11&offset=0`;

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [collapsed, setCollapsed] = useState(windowSize.width < 768);

	useEffect(() => {
		setIsLoading(true);
		console.log('fetching summaries');
		axios.get(url).then((response) => {
			setData(response.data);
			setIsLoading(false);
		});
	}, [url]);

	return (
		<SuperTokensWrapper>
			<div className="App">
				<Navbar collapsed={collapsed} setCollapsed={setCollapsed} />

				<Routes>
					{/* {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
          <Route path="/auth" element={<SessionAuth>
            <Home2 />
          </SessionAuth>} />  */}
					<Route
						path="/"
						element={
							<Home data={data} isLoading={isLoading} setData={setData} setIsLoading={setIsLoading} />
						}
					/>
					<Route
						path="/article/:article_ID"
						element={
							/* <SessionAuth><Article data={data} /></SessionAuth> */
							<Article
								feedData={data}
								setFeedData={setData}
								collapsed={collapsed}
								setCollapsed={setCollapsed}
								setFeedLoading={setIsLoading}
								feedLoading={isLoading}
							/>
						}
					/>
				</Routes>
				{location.pathname === '/' ? <Footer /> : null}
			</div>

			{/* </div > */}
		</SuperTokensWrapper>
	);
}

export default App;
