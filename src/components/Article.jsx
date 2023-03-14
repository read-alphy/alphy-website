import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeed from './Article_components/SideFeed';
// import ArticleCreator from "./Article_components/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Content from './Article_components/ContentTabs/Content';

import { signOut } from 'supertokens-auth-react/recipe/passwordless';

import axios from 'axios';
import Loading from './Loading';
import { useWindowSize } from '../hooks/useWindowSize';

function Article({ source_type, collapsed, setCollapsed }) {
	const location = useLocation();
	const navigate = useNavigate();
	const source_id = location.pathname.split('/')[2];

	const handleScroll = (target) => {
		setCollapsed(true);
		navigate('/');
		setTimeout(() => {
			const feedback = document.getElementById(target);
			feedback.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}, 100);
	};

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchData = async (url) => {
		try {
			setIsLoading(true);
			const response = await axios.get(url);
			setData(response.data);
		} catch (error) {
			if (error.response?.status === 404) {
				setIsLoading(false);
				navigate('/404');
			}
			console.error(`Error fetching data: ${error}`);
		} finally {
			setIsLoading(false);
		}
	};
	const handleSignOut = async () => {
		try {
			await signOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	// if windows size is less than 768px then collapse the navbar
	const { width } = useWindowSize();
	useEffect(() => {
		if (width < 768) {
			setCollapsed(true);
		}
	}, [width]);

	useEffect(() => {
		const url = `${process.env.REACT_APP_API_URL}/summaries/${source_type}/${source_id}`;
		fetchData(url);
	}, [location.pathname, navigate]);

	const sideFeed = <SideFeed setCollapsed={setCollapsed} source_id={source_id} />;

	return (
		<div className="article ">
			<div
				className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${
					collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
				}`}
			></div>
			<div className="flex flex-row article-body ">
				<div className={`user-feed flex hidden lg:block mr-5 bg-zinc-100 w-[400px]`}>{sideFeed}</div>
				<div
					className={`fixed top-0 z-50 transition origin-top-right transform md:hidden mt-[20vh] w-full shadow-lg bg-zinc-100 ${
						collapsed ? 'ham-collapsed' : 'ham-not-collapsed'
					}`}
				>
					<div className="rounded-lg rounded-t-none shadow-lg">
						<div className="h-screen px-4 overflow-y-auto">{sideFeed}</div>
					</div>
				</div>

				<div className={`scrolling px-4 mx-auto max-h-[90vh] ${collapsed ? ' ' : ' blur-sm sm:blur-none '}}`}>
					{isLoading || data.length ? <Loading /> : <Content data={data} />}
				</div>
			</div>
		</div>
	);
}

export default Article;
