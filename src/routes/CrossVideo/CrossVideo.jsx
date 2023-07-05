import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeed from '../../components/ArticleComponents/SideFeed';
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PlaylistCreation from './PlaylistCreation';
import {Button, Input, Textarea} from "@material-tailwind/react";
import PlaylistChat from './PlaylistChat';




import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';


import { Helmet } from "react-helmet";



function CrossVideo({ source_type, collapsed, setCollapsed, hasActiveSub,setContentName,idToken,userPlaylists}) {
	const location = useLocation();
	const navigate = useNavigate();
	let source_id
	const {currentUser} = useAuth();
    const [windowSizeChecked,setWindowSizeChecked] = useState(false);
	const [playlistTitle, setPlaylistTitle] = useState( `New Knowledge Hub`);
	const [called, setCalled] = useState(false);
	const [sourceIDsPlaylist, setSourceIDsPlaylist] = useState([]);
	const [dataPlaylist, setDataPlaylist] = useState([]);
	const [playlistDescription, setPlaylistDescription] = useState("Set a description for your playlist...");
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

useEffect(() => {
	if(!isCreatePlaylist && !called){
		setIsLoading(true)
		source_id = location.pathname.split('/')[2]
		axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${source_id}`).then((response) => {
			setData(response.data)
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


	axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/`, {	
		"name": playlistTitle,
		"user_id": currentUser.uid,
		"description": playlistDescription,
		"sources": [...dataPlaylist],


}).then((response) => {
	navigate(`/playlist/${response.data.uid}`)
})
}
	


	
	

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	
	
	

	




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

{isCreatePlaylist ? <PlaylistCreation userPlaylists={userPlaylists} playlistDescription={playlistDescription} dataPlaylist={dataPlaylist} setDataPlaylist={setDataPlaylist}  playlistTitle={playlistTitle} setPlaylistDescription={setPlaylistDescription} setPlaylistTitle={setPlaylistTitle} sourceIDsPlaylist = {sourceIDsPlaylist} setSourceIDsPlaylist={setSourceIDsPlaylist}/>

: isLoading ? null :<PlaylistChat data={data} setData={setData} currentUser={currentUser}/>}
							
					

				</div>
			</div>
			{isCreatePlaylist && 
			<div className="z-50 absolute bottom-0 w-full flex h-[40px]">
            <div className="flex justify-end items-center flex-grow mr-40 pb-40">
				
            <Button size="lg" className="bg-green-400 px-5" onClick={handlePlaylist}>Create Playlist</Button>
			
            </div>
        </div>
}
		</div>
	);
}

export default CrossVideo;
