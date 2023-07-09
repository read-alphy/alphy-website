import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeed from '../../components/ArticleComponents/SideFeed';
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PlaylistCreation from './PlaylistCreation';
import {Button, Input, Textarea} from "@material-tailwind/react";
import PlaylistChat from './PlaylistChat';
import EditPlaylist from './EditPlaylist';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '@mui/material/Dialog';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { Helmet } from "react-helmet";




function CrossVideo({ source_type, collapsed, setCollapsed, hasActiveSub,setContentName,idToken,userPlaylists,setUserPlaylists}) {
	const location = useLocation();
	const navigate = useNavigate();
	let source_id
	const {currentUser} = useAuth();
    const [windowSizeChecked,setWindowSizeChecked] = useState(false);
	
	const [called, setCalled] = useState(false);
	const [sourceIDsPlaylist, setSourceIDsPlaylist] = useState([]);
	const [dataPlaylist, setDataPlaylist] = useState([]);
	const [data, setData] = useState([]);
	const [playlistInfo, setPlaylistInfo] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [playlistDescription, setPlaylistDescription] = useState("");
	const [playlistTitle, setPlaylistTitle] = useState("");
	const [deleteDialog, setDeleteDialog] = useState(false);

	useEffect(() => {
		if(!windowSizeChecked){
			if(window.innerWidth<768){
			setCollapsed(true)
			}
			setWindowSizeChecked(true)
	}
})
//console log sourceIDsplaylist type
const isCreatePlaylist = location.pathname.split('/')[2]==="createPlaylist"
const isEditPlaylist = location.pathname.split('/')[2]==="editPlaylist"
const isPlaylist = location.pathname.split('/')[1]==="playlist" && location.pathname.split('/')[2]!=="editPlaylist" && location.pathname.split('/')[2]!=="createPlaylist"

useEffect(() => {
	if((isPlaylist || isEditPlaylist) && !called){
		setIsLoading(true)
		source_id = isPlaylist ? location.pathname.split('/')[2] : location.pathname.split('/')[3]
		
		axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${source_id}`).then((response) => {
			setCollapsed(true)
			setData(response.data)
			setPlaylistInfo(response.data)
			if(response.data.description==="null"){
				setPlaylistDescription("")
			}
			else{		
			setPlaylistDescription(response.data.description)
		}
			setPlaylistTitle(response.data.name)
			setDataPlaylist(response.data.tracks)
			let sources = response.data.tracks.map((item) => item.source_id)
			setSourceIDsPlaylist([...sources])
			setIsLoading(false)
			setCalled(true)
		}
		)
	}

})



const handlePlaylist= () => {


	// disallow creating if dataplaylist is empty
	// disallow creating if there is a limit on the number of playlists
	// disallow creating if there is a limit on the number of videos to include in a playlist
	// disallow creating if the user is not logged in

	if(isCreatePlaylist){
	axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/`, {	
		"name": playlistTitle,
		"user_id": currentUser.uid,
		"description": playlistDescription,
		"sources": [...dataPlaylist],


}).then((response) => {
	navigate(`/playlist/${response.data.uid}`)
	
})
}
else if(isEditPlaylist){
	axios.patch( `${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${playlistInfo.uid}`, {
		"name": playlistTitle,
		"user_id": currentUser.uid,
		"description": playlistDescription,
		"sources": [...dataPlaylist],
}).then((response) => {
	navigate(`/playlist/${response.data.uid}`)
	localStorage.setItem("playlistEdited", "true")

})
}
}


const handleDeletePlaylist = () => {
	axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${playlistInfo.uid}`).then((response) => {
		const index = userPlaylists.indexOf(playlistInfo)
		userPlaylists.splice(index,1)
		setUserPlaylists([...userPlaylists])

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
					className={`${collapsed ? "scrolling" : "scrolling"} px-3 md:px-0  mx-auto max-h-[92vh] ${collapsed ? 'hidden' : 'blur-sm sm:blur-none md:max-h-[90vh] max-h-[90vh] overflow-hidden'
						}}`}
				>

				{isCreatePlaylist && <PlaylistCreation userPlaylists={userPlaylists} playlistDescription={playlistDescription} dataPlaylist={dataPlaylist} setDataPlaylist={setDataPlaylist}  playlistTitle={playlistTitle} setPlaylistDescription={setPlaylistDescription} setPlaylistTitle={setPlaylistTitle} sourceIDsPlaylist = {sourceIDsPlaylist} setSourceIDsPlaylist={setSourceIDsPlaylist}/>}

				{(!isCreatePlaylist && !isEditPlaylist) ? isLoading ? null :<PlaylistChat data={data} setData={setData} currentUser={currentUser}/> : null}
				{isEditPlaylist && <EditPlaylist playlistInfo={playlistInfo} setPlaylistInfo={setPlaylistInfo} userPlaylists={userPlaylists} playlistDescription={playlistDescription} dataPlaylist={dataPlaylist} setDataPlaylist={setDataPlaylist}  playlistTitle={playlistTitle} setPlaylistDescription={setPlaylistDescription} setPlaylistTitle={setPlaylistTitle} sourceIDsPlaylist = {sourceIDsPlaylist} setSourceIDsPlaylist={setSourceIDsPlaylist}/>}
							
					

				</div>
			</div>
			{(isCreatePlaylist || isEditPlaylist) &&  
			<div className={`z-50 absolute bottom-0 w-full flex h-[40px] ${!collapsed &&window.innerWidth<1000 &&"hidden"} lg:bg-transparent dark:lg:bg-transparent`} >
            <div className="flex justify-end items-center flex-grow mr-10 lg:mr-40 pb-10 lg:pb-40 ">
			{isEditPlaylist && <Button size={window.innerWidth>1000 ? "lg" :`md`} className="bg-red-500 px-5 mr-5" onClick={() => setDeleteDialog(true)}> <DeleteIcon/> <span className="mt-1">Delete </span></Button>}		
            <Button size={window.innerWidth>1000 ? "lg" :`md`} className="bg-green-400 px-5" onClick={handlePlaylist}><SaveIcon className="mr-2"/>{isCreatePlaylist ? "Create" : "Save"}</Button>
			
            </div>
		{deleteDialog &&
			<Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} >
				
				<div className="p-10 w-[240px] h-[120px] flex md:w-[360px] md:h-[180px] text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-mildDarkMode rounded-lg items-center text-center justify-center drop-shadow-sm flex-col">
					<p className="mb-10">You are about to delete this playlist. Would you like to continue?</p>
					<div className="flex flex-row">
						<p className="text-green-400 cursor-pointer" size="sm" onClick={() => setDeleteDialog(false)}>Cancel</p>
						<div className="border-r h-full mr-4 ml-4"></div>
						<p className="text-red-400 cursor-pointer" size="sm" onClick={handleDeletePlaylist}>Delete</p>
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
