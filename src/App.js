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

function App() {
	SuperTokens.init(SuperTokensConfig);
	const windowSize = useWindowSize();
	const location = useLocation();

	const [search, setSearch] = useState('');
	const [offset, setOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [collapsed, setCollapsed] = useState(true);
	const [data, setData] = useState([]);

	const url = `http://alphy-cpu-vm.westus.cloudapp.azure.com/summaries?limit=11&offset=0`;

	useEffect(() => {
		setIsLoading(true);

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
					{getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
					<Route path="/auth" element={<SessionAuth>
						<Home2 />
					</SessionAuth>} />
					<Route
						path="/"
						element={
							<Home
								data={data}
								isLoading={isLoading}
								setData={setData}
								setIsLoading={setIsLoading}
								search={search}
								setSearch={setSearch}
								offset={offset}
								setOffset={setOffset}
							/>
						}
					/>
					<Route
						path="/article/:article_ID"
						element={
							/* <SessionAuth><Article data={data} /></SessionAuth> */
							<Article
								feedData={data}
								setFeedData={setData}
								search={search}
								setSearch={setSearch}
								collapsed={collapsed}
								setCollapsed={setCollapsed}
								feedLoading={isLoading}
								setFeedLoading={setIsLoading}
								offset={offset}
								setOffset={setOffset}
							/>
						}
					/>
				</Routes>
				{location.pathname === '/' ? <Footer /> : null}
			</div>


		</SuperTokensWrapper>
	);
}

export default App;
