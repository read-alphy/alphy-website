import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeed from '../../components/ArticleComponents/SideFeed';
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





function Hub({currentUser, collapsed, setCollapsed, hasActiveSub,contentName, credit,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos}) {
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



	useEffect(() => {
	

		
		
		if(!windowSizeChecked){
			if(window.innerWidth<768){
			setCollapsed(true)
			}
			setWindowSizeChecked(true)
	}
	
})


useEffect (() => {
	if(hasActiveSub!==true){
				setTimeout (() => {
					setSubCalled(true)
					setIsLoading(false)
				}, 2000);
		}
		else{
			setSubCalled(true)
			setIsLoading(false)
		}
		
	})


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
		<div className="scrolling dark:bg-darkMode dark:text-zinc-300">
			<Helmet>
			
			</Helmet>  
			<div
				className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			></div>
			
			<div className="flex flex-row bg-zinc-50 dark:bg-darkMode ">
				{collapsed==true && 
			<div className="flex w-full  hidden lg:flex lg:h-[92vh] overflow-hidden bg-zinc-100 dark:bg-mildDarkMode min-w-[32px] max-w-[32px]">
			<div className={`hidden md:flex `}>
				<button onClick={handleCollapse }>

		
			<svg className={`${!collapsed && "rotate-180"} opacity-30 dark:opacity-80`}  width={30} aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"></path>
			</svg>

			</button			>
			</div> 

			</div>
			}
			{collapsed=== false && <div className={`flex hidden lg:block mr-5 bg-zinc-100 min-w-[330px] max-w-[330px] `}>
				
				<SideFeed setCollapsed={setCollapsed} source_id={source_id} /></div>}
				
				<div
					className={`fixed top-0 z-50 transition origin-top-right transform lg:hidden w-full shadow-lg bg-zinc-100 ${collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-zinc-50'
						}`}
				>
					<div className="rounded-lg rounded-t-none shadow-lg">
						<div className="h-screen"><SideFeed setCollapsed={setCollapsed} source_id={source_id} /></div>
					</div>
				</div>

				<div
					className={`${collapsed ? "scrolling" : "scrolling"} md:px-0  w-full max-h-[92vh] ${collapsed ? 'hidden' : 'blur-sm sm:blur-none md:max-h-[90vh] max-h-[90vh] overflow-hidden'
						}}`}
				>
					{ isLoading ? <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" /> : <HubContent data={data} hasActiveSub={hasActiveSub} credit={credit} currentUser={currentUser} userArchipelagos={userArchipelagos} dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} getDataGlobalArchipelagos={getDataGlobalArchipelagos} />}
					


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
