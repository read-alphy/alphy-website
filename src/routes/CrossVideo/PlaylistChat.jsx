import React from 'react';
import {useState, useEffect, useRef } from 'react';
import {Button, Spinner} from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import TypeIt from 'typeit-react';
import SourceCard from './SourceCard';
import Dialog from '@mui/material/Dialog';

import { Carousel } from '@trendyol-js/react-carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';

export default function PlaylistChat({data,setData,currentUser}) {
    const [inputValue, setInputValue] = useState("")
    const [isLoadingInside, setIsLoadingInside] = useState(false)
    const [isCleared, setIsCleared] = useState(false)
    const [inputError, setinputError] = useState(false)
    const [answerData, setAnswerData] = useState("")
    const [selectedSourceCard, setSelectedSourceCard] = useState("")
    const [openDialog, setOpenDialog] = useState(false);
    const [tracks, setTracks] = useState([data.tracks!==undefined ? data.tracks : []])
    const [i, setI] = useState(0)
    const navigate = useNavigate()
    const ref = useRef();
    const title = data.name
    const description = data.description
 
    
    const playlistUserID = data.user_id
    
    const playlistID = data.uid



    if(localStorage.getItem("playlistEdited")==="true"){
        localStorage.setItem("playlistEdited","false")
        window.location.reload()
    }
//remove cursor for trendyol carousel gaps
const elements = document.querySelectorAll(".styles-module_item-container__a8zaY")
if(elements){
    elements.forEach(element => {
        element.classList.add('cursor-default');
      });
}




const handleSubmit = () => {
    setAnswerData("")
    setIsLoadingInside(true)
     axios.post
    (`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${playlistID}/question`,
    inputValue,
    
    
    {headers: {
        'accept': 'application/json',
        'Content-Type': 'text/plain'
        },
    }
    ).then((response) => {
    console.log(response.data)
    setAnswerData(response.data)
    setIsLoadingInside(false)
    setinputError(false)

    setTimeout(() => {
    const elements = document.querySelectorAll(".styles-module_item-container__a8zaY")
    if(elements){
        elements.forEach(element => {
            element.classList.add('cursor-default');
        });
}
    }, 500);
    


}).catch((error) => {
    setinputError(true)
    setIsLoadingInside(false)
})


} 

const handleClear = () => {
    setIsCleared(true);
    setIsLoadingInside(false);
    setInputValue('');
    setAnswerData('');
    setinputError(false);
};

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleSubmit()
    }
};

const handleEdit = () => {
    navigate(`/playlist/editPlaylist/${data.uid}`)
}






    return(
        <div className=" w-[1000px] max-w-[1000px] grow mx-auto pb-20">
            <div className="grid grid-cols-3 mt-20 w-full ml-10">
                <div className="col-span-1">
            <p className="text-xl text-zinc-700 dark:text-zinc-300">{title}</p>
            <p className="text-md text-zinc-400 dark:text-zinc-500">{description}</p>
          
            </div>
            <div className="col-span-1">
                {currentUser!==null && currentUser.uid === playlistUserID && 
                
                <EditIcon onClick={handleEdit} className="cursor-pointer" title={"Edit playlist"} />
                }
                
    
            </div>

            </div>
            <div className="ml-10">
				<div className="flex items-center pr-1 mt-6 xl:mt-8 max-w-[900px] ">
                <div className="relative w-full min-w-[40vw] ">

                    
                    <input
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onKeyDown={handleKeyDown}
                        type="text"
                        id="questionAnswering"
                        placeholder="Ask anything to your knowledge hub..."
                        className="pr-10 placeholder:italic peer w-full h-full bg-white  dark:bg-mildDarkMode dark:border-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border border border-zinc-200 focus:border text-md px-3 py-2.5 rounded-[7px] focus:border-green-400 dark:focus:border-green-400" />
                
                    {inputValue.length > 0 ? (
                        <div
                            onClick={handleClear}
                            className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 "
                        >
                            <svg
                                width="20"
                                onClick={handleClear}

                                className="cursor-pointer"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 18L18 6M6 6l12 12"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </div>
                    ) : null}
                </div>

                {window.innerWidth > 420

                    &&

                    <Button type="submit"
                        onClick={handleSubmit}
                        id="questionButton"

                        className={`bg-green-400 text-[15px] ml-2 lg:ml-4 ${isLoadingInside ? "opacity-50 pointer-events-none" : ""}`}>

                        {isLoadingInside ? <Spinner className="h-4 w-4" /> :
                            <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        }
                    </Button>}

            </div>
            </div>


            <div >

                
            {isLoadingInside ? (
					<div
						className="loading mt-5 mb-10 ml-10 w-[900px]"
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							height: '20vh',
						}}
					>

						{/* <ReactLoading type="balls" color="#a1a1aa" width={50}/> */}
						<TypeIt className="mb-3 text-zinc-400 dark:text-zinc-500"
							getBeforeInit={(instance) => {
								instance.type("Going through the knowledgebase to answer your question...").pause(1200).delete(100).pause(200).type("Gathering up the relevant sources...").pause(1200).delete(100).pause(500).type("Creating a network of information to find the best paperclips in the world...").pause(800).delete(40).pause(700).type("help you get the answer as quickly as possible!").pause(600);

								// Remember to return it!
								return instance;
							}}

							options={{
								loop: true,
								html: true,
								speed: 10,
								cursorChar: "",
							}}
						/>
					</div>
				) : (
					answerData.answer!==undefined && 
                <div id="answer-area" className="answer-area text-l max-w-[900px] ml-10 mt-10 ">
                    <p className="text-green-400 text-l">
                        
                        <QuestionAnswerIcon className="text-green-400 mr-1"/>
                        Answer</p>
                                            
                                    {<p dangerouslySetInnerHTML={{ __html: answerData.answer.replace(/\n/g, '<br/>')
                                 }}/> } 
                                    

                                  {<div class={`${answerData.length===0 &&"hidden"} mt-10 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40`} ></div>}
                                    </div>
				)}

                            
                                    <p className={`text-green-400 ml-10 mt-4 mb-4 ${answerData.length===0 && "hidden"}`} >

                                          <TextSnippetIcon/>  Passages
                                </p>
                               
                                    <div className="flex flex-row">
                                        
                     
                                   {(answerData.sources!==undefined && isLoadingInside===false) && 
                                   (
                                   window.innerWidth>1000 ?
                                   <Carousel 
                                   infinite={false}
                                   leftArrow={
                                        <div className="mt-40 pr-4 w-8">
                                        <ArrowBackIosNewIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                        </div>} 
                                   
                                   rightArrow={
                                                <div className="mt-40 pl-2 w-8">
                                            <ArrowForwardIosIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                            </div>} 
                                   className="cursor-default" show={2.5} slide={1} transition={0.5}>
                            {answerData.sources.map((source,index) => <SourceCard forDialog={false} source={source} tracks={tracks} setSelectedSourceCard={setSelectedSourceCard} selectedSourceCard={selectedSourceCard} openDialog={openDialog} setOpenDialog={setOpenDialog}/>)}
                                    
                                   </Carousel>
                                   :
                                   <Carousel 
                                   infinite={false}
                                   leftArrow={
                                    <div className="mt-40 pr-4 w-8">
                                        <ArrowBackIosNewIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                        </div>} 
                                         rightArrow={<div className="mt-40 pl-2 w-8">
                                         <ArrowForwardIosIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                         </div>} className="cursor-default" show={1.5} slide={1} transition={0.5}>
                                   {answerData.sources.map((source) => <SourceCard forDialog={false} source={source} tracks={tracks} setSelectedSourceCard={setSelectedSourceCard} selectedSourceCard={selectedSourceCard} openDialog={openDialog} setOpenDialog={setOpenDialog}/>)} 
                                          </Carousel>
                                
                                )
                            }

                           <Dialog  open={openDialog} onClose={() => setOpenDialog(false)} >
                            {answerData.sources!==undefined && answerData.sources.map((source) => 
                          
                              <div ref={ref}>
                                {source===selectedSourceCard &&
                            <SourceCard forDialog={true} source={source} tracks={tracks} setSelectedSourceCard={setSelectedSourceCard} selectedSourceCard={selectedSourceCard} openDialog={openDialog} setOpenDialog={setOpenDialog}/>
                        }
                            </div>
                        
                            )} 
                               
                            </Dialog>  
            </div>
            </div>
            </div>
    )

}