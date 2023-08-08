import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeedReworked from '../../components/ArticleComponents/SideFeedReworked';
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {Button, Spinner, Input, Textarea} from "@material-tailwind/react";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../../components/Loading';
import axios from 'axios';
import { Helmet } from "react-helmet";
import HubContent from './HubContent';	





function Hub({arcs, currentUser, collapsed, setCollapsed, hasActiveSub,contentName, credit,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos}) {
	const location = useLocation();
	const navigate = useNavigate();
	let source_id
	
	
    const [windowSizeChecked,setWindowSizeChecked] = useState(false);
	
	const [called, setCalled] = useState(false);
	
	const [data, setData] = useState([]);
	
	const [isLoading, setIsLoading] = useState(true);

	const [deleteDialog, setDeleteDialog] = useState(false);
	const [subCalled, setSubCalled] = useState(false);
	const [errorMessage, setErrorMessage] = useState(false);
	const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
	const [helmetThumbnail, setHelmetThumbnail] = useState("");
	const [globalLayout, setGlobalLayout] = useState(true);
	const [userLayout, setUserLayout] = useState(false);
	const [submitLayout, setSubmitLayout] = useState(false);
	const [mainShow, setMainShow] = useState(arcs===true ? "arcs" : "default");

	useEffect(() => {

		if(location.pathname.includes("arcs")){
			setMainShow("arcs")
		}
		else{
			setMainShow("default")
		}

		if(!windowSizeChecked){
			if(window.innerWidth<768){
			setCollapsed(true)
			}
			setWindowSizeChecked(true)
	}
	
})


if((hasActiveSub!== undefined || hasActiveSub!==null) && subCalled===false){
	setSubCalled(true)
	setIsLoading(false)
}


/* if(!subCalled){
	if((hasActiveSub===undefined || hasActiveSub===false)){
		
	}
	else if(hasActiveSub===true){
		setIsLoading(false)
		
	}
}
 */
	const handleCollapse = () => {
		setCollapsed(!collapsed)
		
	}

	return (
		<div className="scrolling dark:bg-darkMode dark:text-zinc-300 ">
			<Helmet>
				<title>Alphy - Unlock Audiovisual Content</title>
			</Helmet>  
			<div
				className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			></div>
			
			<div className="flex flex-row bg-zinc-50 dark:bg-darkMode ">
			
			{<div className={` hidden sm:block  `}>
				
				<SideFeedReworked 
				
				collapsed={collapsed} setCollapsed={setCollapsed} source_id={source_id} 
				globalLayout={globalLayout} setGlobalLayout={setGlobalLayout} userLayout={userLayout} setUserLayout={setUserLayout} submitLayout={submitLayout} setSubmitLayout={setSubmitLayout}
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
							/>
							
							</div>
					</div>
				</div>

				<div
					className={`${collapsed ? "scrolling" : "scrolling"} w-full max-h-[90vh] sm:sm:max-h-[100vh] ${collapsed ? 'hidden' : ' overflow-hidden'
						}}`}
				>
					{ isLoading ? <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" /> : 
					<HubContent
					arcs={arcs}	data={data} hasActiveSub={hasActiveSub} credit={credit} currentUser={currentUser} userArchipelagos={userArchipelagos}
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
        </div>
	);

}


export default Hub;
