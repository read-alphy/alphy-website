import React, { useState, useEffect } from 'react';
import SideFeedReworked from '../../components/ArticleComponents/SideFeedReworked';
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { useLocation } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';

import Loading from '../../components/Loading';

import { Helmet } from "react-helmet";
import HubContent from './HubContent';
import CloseIcon from '@mui/icons-material/Close';




function Hub({ arcs, currentUser, collapsed, setCollapsed, tier, contentName, credit, userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos }) {
	const location = useLocation();

	let source_id


	const [windowSizeChecked, setWindowSizeChecked] = useState(false);



	const [data, setData] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	const [deleteDialog, setDeleteDialog] = useState(false);
	const [subCalled, setSubCalled] = useState(false);

	const [globalLayout, setGlobalLayout] = useState(true);
	const [userLayout, setUserLayout] = useState(false);
	const [submitLayout, setSubmitLayout] = useState(false);
	const [mainShow, setMainShow] = useState(arcs === true ? "arcs" : "default");
	const [showFeedbackTally, setShowFeedbackTally] = useState(false);
	const [showCTAButton, setShowCTAButton] = useState(false);

	useEffect(() => {

		if (location.pathname.includes("arcs")) {

			setMainShow("arcs")
		}
		else if (location.pathname.includes("explore")) {
			setMainShow("sources")
		}
		else {
			setMainShow("default")
		}

		if (!windowSizeChecked) {
			if (window.innerWidth < 768) {
				setCollapsed(true)
			}
			setWindowSizeChecked(true)
		}

	})


	if ((tier !== undefined || tier !== null) && subCalled === false) {
		setSubCalled(true)
		setIsLoading(false)
		setTimeout(() => {
			setShowCTAButton(true)
		},300)
		
	}

	useEffect(() => {


		setTimeout(() => {
			const searchParams = location.search.split('?')[1]; 
			if(searchParams === undefined){return}
			if(searchParams.includes("submit_feedback") === false){return}
			const submitFeedbackValue = searchParams.split("submit_feedback=")[1]; 
			if (submitFeedbackValue !== undefined && submitFeedbackValue === "true" && currentUser ) {
                localStorage.setItem("showFeedbackTally", `${currentUser.uid}_false`)
		

				let url = new URL(window.location);
				let searchParams = new URLSearchParams(url.search);
				searchParams.delete("submit_feedback");
				url.search = searchParams.toString();
				window.history.pushState({}, '', url);
                }
				
            }
				, 300);

			}, [currentUser]) // eslint-disable-line react-hooks/exhaustive-deps

		




	return (
		<div className="scrolling dark:bg-darkMode dark:text-zinc-300 font-averta-semibold">
			<Helmet>
				<title>Alphy - AI Transcriber, Summarizer, Assistant</title>
			</Helmet>
			<div
				className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			></div>

			<div className="flex flex-row bg-white dark:bg-darkMode ">

				{<div className={` hidden sm:block `}>

					<SideFeedReworked

						collapsed={collapsed} setCollapsed={setCollapsed} source_id={source_id}
						globalLayout={globalLayout} setGlobalLayout={setGlobalLayout} userLayout={userLayout} setUserLayout={setUserLayout} submitLayout={submitLayout} setSubmitLayout={setSubmitLayout}
						tier={tier}
					/></div>}

				<div
					className={`fixed top-0 z-50 transition origin-top-right transform overflow-y-scroll sm:hidden w-full shadow-lg bg-zinc-100 ${collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-zinc-50'
						}`}
				>
					<div className="rounded-lg rounded-t-none shadow-lg">
						<div className="">
							<SideFeedReworked
								collapsed={collapsed} setCollapsed={setCollapsed} source_id={source_id}
								globalLayout={globalLayout} setGlobalLayout={setGlobalLayout} userLayout={userLayout} setUserLayout={setUserLayout} submitLayout={submitLayout} setSubmitLayout={setSubmitLayout}
								tier={tier}
							/>

						</div>
					</div>
				</div>

				<div
					className={`${collapsed ? "scrolling" : "scrolling"} w-full max-h-[90vh]   sm:max-h-[100vh] ${collapsed ? 'hidden' : ' overflow-hidden'
						}}`}
				>
					{isLoading ? <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" /> :
						<HubContent
							arcs={arcs} data={data} tier={tier} credit={credit} currentUser={currentUser} userArchipelagos={userArchipelagos}
							dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos}
							globalLayout={globalLayout} setGlobalLayout={setGlobalLayout} userLayout={userLayout} setUserLayout={setUserLayout} submitLayout={submitLayout} setSubmitLayout={setSubmitLayout}
							mainShow={mainShow} setMainShow={setMainShow} collapsed={collapsed} setCollapsed={setCollapsed}
						/>}



				</div>
			</div>



			{deleteDialog &&

				<Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} >

				</Dialog>
			}


			{currentUser && showCTAButton && localStorage.getItem("tier")!=="premium" && window.innerWidth > 768 && localStorage.getItem("showFeedbackTally") !== `${currentUser.uid}_false` &&
			<div className={`group glow-effect bottom-0 fixed right-0 mr-10 w-[400px] overflow-y-auto  bg-white text-black dark:bg-mildDarkMode border dark:border-zinc-600 border-zinc-200 drop-shadow-lg rounded-t-xl
		transition-height duration-300 ease-in-out ${showFeedbackTally ? "h-[800px]" : "hover:h-[200px] h-[70px] "}
			
			px-4 py-3`}>
				{showFeedbackTally === false ?
					<div className="flex flex-col text-center items-center ">
								<p className="text-black dark:text-whiteLike text-xl"><span className="wave mr-2 text-xl">👋</span>Help us build Alphy! </p>
								<p className="hidden group-hover:block mt-4 dark:text-whiteLike"> Fill out this 5-min survey about your experience with Alphy so far and win <span className="underline dark:text-whiteLike font-bold">1 hour</span> in transcription credits! </p>
									<button onClick={() => setShowFeedbackTally(!showFeedbackTally)} className={` text-md hidden group-hover:block mt-4 px-4 py-2 rounded-lg bg-green-200 text-zinc-900 drop-shadow-lg`}>
										Take Survey
									</button>

					</div>
					:

			<div className={` overflow-y-auto `}>
					<div className=" flex fixed right-0 justify-end mr-4 mt-2 cursor-pointer" onClick={() => setShowFeedbackTally(false)}> <CloseIcon className="dark:text-zinc-300" /> </div>
					
					<p className="text-2xl text-zinc-900 dark:text-zinc-300 mt-6 ml-2 font-averta-bold">Tell us what you think!</p>
					<p className="text-md text-zinc-700 dark:text-zinc-400 mt-6 ml-2 font-averta-regular">Complete this survey and win 1 hour in transcription credits!</p>
					{localStorage.getItem("theme")==="light" ? 
					<iframe
						title = "Survey Form"
						className={`${showFeedbackTally ? "":"hidden"} dark:block dark:text-whiteLike mb-20  overflow-auto w-[350px]`} 
						src={`https://tally.so/embed/3No0k0?user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
					></iframe> 
					:
					<iframe
					title = "Survey Form"
					className={`${showFeedbackTally ? "":"hidden"} dark:block dark:text-whiteLike overflow-auto h-160 w-[350px]`} 
					src={`https://tally.so/embed/mDz5vX?user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
				></iframe>}

					
				</div>
				
}
			 </div>
			}


		</div>
	);

}


export default Hub;
