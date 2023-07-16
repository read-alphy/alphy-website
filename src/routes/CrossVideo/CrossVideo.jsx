import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeed from '../../components/ArticleComponents/SideFeed';
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArchipelagoCreation from './ArchipelagoCreation';
import {Button, Spinner, Input, Textarea} from "@material-tailwind/react";
import ArchipelagoChat from './ArchipelagoChat';
import EditArchipelago from './EditArchipelago';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../../components/Loading';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { set } from 'lodash';





function CrossVideo({ source_type, collapsed, setCollapsed, hasActiveSub,setContentName,idToken,userArchipelagos,setUserArchipelagos},props) {
	const location = useLocation();
	const navigate = useNavigate();
	let source_id
	
	const {currentUser} = useAuth();
    const [windowSizeChecked,setWindowSizeChecked] = useState(false);
	
	const [called, setCalled] = useState(false);
	const [sourceIDsArchipelago, setSourceIDsArchipelago] = useState([]);
	const [dataArchipelago, setDataArchipelago] = useState([]);
	const [data, setData] = useState([]);
	const [archipelagoInfo, setArchipelagoInfo] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [archipelagoDescription, setArchipelagoDescription] = useState("");
	const [archipelagoTitle, setArchipelagoTitle] = useState("");
	const [deleteDialog, setDeleteDialog] = useState(false);
	const [subCalled, setSubCalled] = useState(false);


	useEffect(() => {
		if(!windowSizeChecked){
			if(window.innerWidth<768){
			setCollapsed(true)
			}
			setWindowSizeChecked(true)
	}
	
})
//console log sourceIDsarchipelago type
const isCreateArchipelago = location.pathname.split('/')[2]==="createArchipelago"
const isEditArchipelago = location.pathname.split('/')[2]==="editArchipelago"
const isArchipelago = location.pathname.split('/')[1]==="archipelago" && location.pathname.split('/')[2]!=="editArchipelago" && location.pathname.split('/')[2]!=="createArchipelago"

useEffect(() => {
	if((isArchipelago || isEditArchipelago) && !called){
		source_id = isArchipelago ? location.pathname.split('/')[2] : location.pathname.split('/')[3]
		
		axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${source_id}`).then((response) => {
			setCollapsed(true)
			
			setData(response.data)
			setArchipelagoInfo(response.data)
						if(response.data.description==="null"){
							setArchipelagoDescription("")
						}
						else{		
						setArchipelagoDescription(response.data.description)
					}
			setArchipelagoTitle(response.data.name)
			setDataArchipelago(response.data.tracks)
			let sources = response.data.tracks.map((item) => item.source_id)
			setSourceIDsArchipelago([...sources])
			setIsLoading(false)
			setCalled(true)


		}
		)
	}

})


useEffect (() => {
	if(hasActiveSub!==true){
	setTimeout (() => {
		setSubCalled(true)
	}, 3000);
		}
		else{
			setSubCalled(true)
		}
		
	})

if(!subCalled){
	if(isCreateArchipelago && (hasActiveSub===undefined || hasActiveSub===false)){
		navigate("/")
	}
	else if(hasActiveSub===true){
		setIsLoading(false)
		setSubCalled(true)
	}
}

const handleArchipelago= () => {


	// disallow creating if dataarchipelago is empty
	// disallow creating if there is a limit on the number of archipelagos
	// disallow creating if there is a limit on the number of videos to include in a archipelago
	// disallow creating if the user is not logged in

	if(isCreateArchipelago){
	axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/`, {	
		"name": archipelagoTitle,
		"user_id": currentUser.uid,
		"description": archipelagoDescription,
		"sources": [...dataArchipelago],


}).then((response) => {
	setUserArchipelagos([...userArchipelagos, response.data])
	setTimeout (() => {
	navigate(`/archipelago/${response.data.uid}`)
	}, 2000);
	
})
}
else if(isEditArchipelago){
	axios.patch( `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${archipelagoInfo.uid}`, {
		"name": archipelagoTitle,
		"user_id": currentUser.uid,
		"description": archipelagoDescription,
		"sources": [...dataArchipelago],
}).then((response) => {
	navigate(`/archipelago/${response.data.uid}`)
	localStorage.setItem("archipelagoEdited", "true")

})
}
}


const handleDeleteArchipelago = () => {
	axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${archipelagoInfo.uid}`).then((response) => {
		const index = userArchipelagos.indexOf(archipelagoInfo)
		userArchipelagos.splice(index,1)
		setUserArchipelagos([...userArchipelagos])

		navigate(`/`)
		

		})
		}

	const handleCollapse = () => {
		setCollapsed(!collapsed)
		
	}

	return (
		<div className="article dark:bg-darkMode dark:text-zinc-300">
			<Helmet>
				<title>{data.title!==undefined ? `${data.title}` : "Alphy"} </title>
				<meta name="twitter:card" content="summary_large_image"></meta>
				<meta property="og:title" content={data.title!==undefined ? `Alphy - ${data.title}` : "Alphy"} />
				<meta name="twitter:title" content={data.title!==undefined ? `Alphy - ${data.title}` : "Alphy"} />

				<meta property="og:description" content={data.title!==undefined ? `Ask questions to ${data.title}` : "Ask questions to the content"}
				/>
				<meta name="description" content={data.title!== undefined? `Read the summary and ask real questions to ${data.title}` : "Transcribe, summarize, and ask real questions to the content"} />
				<meta name="twitter:description" content={data.title!== undefined ? `Read the summary and ask real questions to ${data.title}` : "Transcribe, summarize, and ask real questions to the content"}
				/>
				<meta property="og:url" content={location.href} />
			</Helmet>  
			<div
				className={`w-screen  bg-bordoLike transition origin-top-right transform md:hidden rounded-t-none rounded-3xl ${collapsed ? 'nav-ham-collapsed fixed top-0' : 'nav-ham-not-collapsed'
					}`}
			></div>
			
			<div className="flex flex-row ">
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
			{collapsed=== false && <div className={`flex hidden lg:block mr-5 bg-zinc-100 w-[250px] min-w-[250px] 3xl:w-[330px] 3xl:min-w-[330px] `}>
				
				<SideFeed setCollapsed={setCollapsed} source_id={source_id} /></div>}
				
				<div
					className={`fixed top-0 z-50 transition origin-top-right transform lg:hidden mt-[14vh] w-full shadow-lg bg-zinc-100 ${collapsed ? 'ham-collapsed hidden' : 'ham-not-collapsed bg-zinc-50'
						}`}
				>
					<div className="rounded-lg rounded-t-none shadow-lg">
						<div className="h-screen"><SideFeed setCollapsed={setCollapsed} source_id={source_id} /></div>
					</div>
				</div>

				<div
					className={`${collapsed ? "scrolling" : "scrolling"} md:px-0  mx-auto max-h-[92vh] ${collapsed ? 'hidden' : 'blur-sm sm:blur-none md:max-h-[90vh] max-h-[90vh] overflow-hidden'
						}}`}
				>
					{ isLoading && <Loading className="mt-40 h-20 w-20 text-zinc-300" color="green" />}
				{isCreateArchipelago && hasActiveSub && <ArchipelagoCreation userArchipelagos={userArchipelagos} archipelagoDescription={archipelagoDescription} dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago}  archipelagoTitle={archipelagoTitle} setArchipelagoDescription={setArchipelagoDescription} setArchipelagoTitle={setArchipelagoTitle} sourceIDsArchipelago = {sourceIDsArchipelago} setSourceIDsArchipelago={setSourceIDsArchipelago}/>}

				{(!isCreateArchipelago && !isEditArchipelago) ? isLoading ? null :<ArchipelagoChat data={data} setData={setData} currentUser={currentUser} dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago}/> : null}
				{isEditArchipelago && hasActiveSub && <EditArchipelago archipelagoInfo={archipelagoInfo} setArchipelagoInfo={setArchipelagoInfo} userArchipelagos={userArchipelagos} archipelagoDescription={archipelagoDescription} dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago}  archipelagoTitle={archipelagoTitle} setArchipelagoDescription={setArchipelagoDescription} setArchipelagoTitle={setArchipelagoTitle} sourceIDsArchipelago = {sourceIDsArchipelago} setSourceIDsArchipelago={setSourceIDsArchipelago}/>}
							
					

				</div>
			</div>
			{(isCreateArchipelago || isEditArchipelago) &&  
			<div className={`z-50 absolute bottom-0 w-full flex h-[40px] ${!collapsed &&window.innerWidth<1000 &&"hidden"} lg:bg-transparent dark:lg:bg-transparent`} >
            <div className="flex justify-end items-center flex-grow mr-10 lg:mr-40 pb-10 lg:pb-40 ">
			{isEditArchipelago && hasActiveSub && <Button size={window.innerWidth>1000 ? "lg" :`md`} className="bg-red-500 px-5 mr-5" onClick={() => setDeleteDialog(true)}> <DeleteIcon/> <span className="mt-1">Delete </span></Button>}		
            {hasActiveSub && <Button size={window.innerWidth>1000 ? "lg" :`md`} className="bg-green-400 px-5" onClick={handleArchipelago}><SaveIcon className="mr-2"/>{isCreateArchipelago ? "Create" : "Save"}</Button>}
			
            </div>
		{deleteDialog &&
			<Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} >
				
				<div className="p-10 w-[240px] h-[120px] flex md:w-[360px] md:h-[180px] text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-mildDarkMode rounded-lg items-center text-center justify-center drop-shadow-sm flex-col">
					<p className="mb-10">You are about to delete this arc. Would you like to continue?</p>
					<div className="flex flex-row">
						<p className="text-green-400 cursor-pointer" size="sm" onClick={() => setDeleteDialog(false)}>Cancel</p>
						<div className="border-r h-full mr-4 ml-4"></div>
						<p className="text-red-400 cursor-pointer" size="sm" onClick={handleDeleteArchipelago}>Delete</p>
					</div>
				</div>
			
			</Dialog>
			}
        </div>
}
		</div>
	);
}

export default CrossVideo;
