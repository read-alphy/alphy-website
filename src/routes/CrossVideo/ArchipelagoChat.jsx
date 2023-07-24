import React from 'react';
import {useState, useEffect, useRef } from 'react';
import {Button, Spinner, button} from "@material-tailwind/react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import TypeIt from 'typeit-react';
import SourceCard from './SourceCard';
import Dialog from '@mui/material/Dialog';
import Chip from '@mui/material/Chip';
import { Carousel } from '@trendyol-js/react-carousel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import FeedItem from '../../components/ArticleComponents/FeedTabs/FeedItem';
import CloseIcon from '@mui/icons-material/Close';
import QuizIcon from '@mui/icons-material/Quiz';

export default function ArchipelagoChat({data,setData,currentUser, dataArchipelago,setDataArchipelago}) {
    const [inputValue, setInputValue] = useState("")
    const [isLoadingInside, setIsLoadingInside] = useState(false)
    const [isCleared, setIsCleared] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)
    const [answerData, setAnswerData] = useState("")
    const [selectedSourceCard, setSelectedSourceCard] = useState("")
    const [openDialog, setOpenDialog] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [showTrackDetails, setShowTrackDetails] = useState(false)
    const [elementCalled, setElementCalled] = useState(false)
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [tracks, setTracks] = useState([])
    const [i, setI] = useState(0)
    const navigate = useNavigate()
    const [expanded, setExpanded] = useState(false);
    const ref = useRef();
    const title = data.name
    const description = data.description
    
    let displayText=""
    if(tracks.length===0 && data.tracks!==undefined && data.tracks.length!==0){
        setTracks(data.tracks)
    }

    
    
    const selectedItems = [];
    while (data!==undefined && data.questions!==undefined&& data.questions.length!==0 && selectedItems.length < 5) {
      const randomIndex = Math.floor(Math.random() * data.questions.length);
      const randomItem = data.questions[randomIndex];
      if (!selectedItems.includes(randomItem)) {
        selectedItems.push(randomItem);
        
      }
    }
    if(selectedItems.length==5 && i ==0){
        setSelectedQuestions(selectedItems);
        setI(1)
    }


      


    const archipelagoUserID = data.user_id
    const archipelagoImageLink = `${data.thumbnail_url ? data.thumbnail_url : ""}`
    const archipelagoID = data.uid
    const buttonRef = useRef(null);

    if(localStorage.getItem("archipelagoEdited")==="true"){
        localStorage.setItem("archipelagoEdited","false")
        window.location.reload()
    }
//remove cursor for trendyol carousel gaps
const elements = document.querySelectorAll(".styles-module_item-container__a8zaY")
if(elements && elementCalled===false){
    elements.forEach(element => {
        element.classList.add('cursor-default');
      });
      setElementCalled(true)
}


const handleSubmit = () => {
    if(currentUser===null){
        setErrorMessage(true)
        return
    }
    else{
    
if(inputValue.length===0){
    return
}
else{
    setAnswerData("")
    setIsLoadingInside(true)
     axios.post
    (`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/playlists/${archipelagoID}/question`,
    inputValue,

    {headers: {
        'accept': 'application/json',
        'Content-Type': 'text/plain'
        },
    }
    ).then((response) => {
    
    setAnswerData(response.data)
    
    setIsLoadingInside(false)
    setErrorMessage(false)

    setTimeout(() => {
    const elements = document.querySelectorAll(".styles-module_item-container__a8zaY")
    if(elements){
        elements.forEach(element => {
            element.classList.add('cursor-default');
        });
}
    }, 500);
    


}).catch((error) => {
    
    setIsLoadingInside(false)
})
}
}

} 



const handleClear = () => {
    setIsCleared(true);
    setIsLoadingInside(false);
    setInputValue('');
    setAnswerData('');
    setErrorMessage(false);
};

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        handleSubmit()
    }
};

const handleEdit = () => {
    navigate(`/arc/editArc/${data.uid}`)
}


const handleAskPremadeQuestion = (event) => {
    setInputValue(event.target.innerText)
    setTimeout(() => {
    buttonRef.current.click()
    }, 200);
} 

if(description!==undefined ){
 displayText = expanded ? description : `${description.slice(0, 50)}...`;
}
const toggleExpand = () => {
    setExpanded(!expanded);
  };

  

    return(
        <div className="lg:w-[1000px] max-w-[1000px] grow mx-auto pb-20">
            <div className="grid grid-cols-5 sm:grid-cols-4 mt-20 w-full sm:ml-10 px-3 " >
            
                <div className="col-span-4 sm:col-span-3 flex flex-row">
                {archipelagoImageLink.length>0 && <img className={`${"hidden" } sm:block w-[200px] sm:mr-4`} src={archipelagoImageLink}/>}
                <div className="ml-2">
            <p className="text-xl text-zinc-700 dark:text-zinc-300 ">{title}</p>
            {<p onClick={toggleExpand} className={`text-md text-zinc-400 dark:text-zinc-500 ${!expanded && "hover:opacity-80"} ${"sm:hidden"} cursor-pointer`} >{displayText}</p>}
            <p className={`text-md text-zinc-400 dark:text-zinc-500 ${"hidden sm:block"} `} >{description}</p>
            <div className="flex">
            <p  className="cursor-pointer underline text-zinc-600 dark:text-zinc-300"onClick={() => setShowTrackDetails(true)}>More Details...</p>
            </div>

            <Dialog fullWidth={"true"} maxWidth={"md"} open={showTrackDetails} onClose={() => setShowTrackDetails(false)}>
                <div className="pt-10 pb-20 bg-white dark:bg-mildDarkMode">
                <CloseIcon className="right-0 absolute mr-4 mt-2 cursor-pointer dark:text-zinc-300" onClick={() =>setShowTrackDetails(false)}></CloseIcon>
                    <div className="mb-10 px-4 sm:px-10">
                    <p className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</p>
                    {<p onClick={toggleExpand} className={`text-md text-zinc-400 dark:text-zinc-500 ${!expanded && "hover:opacity-80"} ${"sm:hidden"} cursor-pointer`} >{displayText}</p>}
                    <p className={`text-md text-zinc-400 dark:text-zinc-500 ${"hidden sm:block"} lg:max-w-[700px]`} >{description}</p>
                    
                    <div className= "flex flex-row mt-5">
                    <p className="text-zinc-500 dark:text-zinc-500 text-md ">{dataArchipelago!==null && dataArchipelago.length} items</p>
                    <div className="ml-5">
                {currentUser!==null && currentUser.uid === archipelagoUserID && 
                
                <div className="flex flex-row" >
                    <p  onClick={handleEdit} className="cursor-pointer text-zinc-600 dark:text-zinc-300 underline" >Edit</p>
                     <EditIcon onClick={handleEdit} fontSize="small"   className="cursor-pointer text-zinc-600 dark:text-zinc-300 pl-1 pt-1"   title={"Edit archipelago"} />
                </div>
                }
                
                
    
            </div>
            </div>

            <div class="border-b border-gray-100 dark:border-zinc-700 mx-auto items-center flex mb-10 mt-10 dark:opacity-40"></div>

                    </div>
                    <div className="w-full px-3 sm:px-8 ">
                    <p className="text-zinc-700 dark:text-zinc-300 text-lg">Item List</p>
                    <div
							className={`
							grid grid-cols-1 mt-10
							${dataArchipelago.length === 1
										? 'lg:grid-cols-1 xl:grid-cols-1 lg:w-1/2'
										: 'lg:grid-cols-2 xl:grid-cols-2'
								}
							gap-4 
							`}
						>
                {dataArchipelago.length > 0
                                        ?  dataArchipelago
                                            .map((item, index) => 
                                            <div className="hover:bg-zinc-100 dark:hover:bg-zinc-700">
                                                <FeedItem  index={index} item={item} mainFeedInput={inputValue} fromArchipelago={"archipelago"} dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago} forDetail={true}/>
                                                </div>
                                            )				
                                            :
                                        
                                            null
                    }
                    </div>
                    </div>
                    </div>
            </Dialog>
            </div>
          
            </div>
        
            </div>
            <div className="sm:ml-10 px-3 ">
                <div>
				<div className="flex items-center pr-1 mt-6 xl:mt-8 max-w-[900px] ">
                <div className="relative w-full min-w-[40vw] ">

                    
                    <input
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        onKeyDown={handleKeyDown}
                        type="text"
                        id="questionAnswering"
                        placeholder={`Start asking...`}
                        className="pr-10 placeholder:italic focus:ring-0 focus:outline-none peer w-full h-full bg-white  dark:bg-mildDarkMode dark:border-zinc-700 text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border border border-green-400 sm:border-zinc-300 focus:border text-md px-3 py-2.5 rounded-[7px] focus:border-green-400 dark:focus:border-green-400" />
                
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

                
                        <div className={`hidden xs:block`}>
                    <Button type="submit"
                        onClick={handleSubmit}
                        id="questionButton"
                        ref={buttonRef}
                        className={`bg-green-400 text-[15px] ml-2 lg:ml-4 ${isLoadingInside ? "opacity-50 pointer-events-none" : ""} ${window.innerWidth < 420 && " hidden"}`}>

                        {isLoadingInside ? <Spinner className="h-4 w-4" /> :
                            <svg className="w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        }
                    </Button>
                    </div>
                    </div>

             </div>
             {errorMessage &&
             <div className="mt-4 text-zinc-500 dark:text-zinc-400">
    <p>Please <a href="/u/login" className="underline text-green-400">sign in</a> to start asking questions.</p> 
</div>
}
            </div>

            <div className="mt-10 animate-bounce-slow px-3 " >
                {((answerData=="" && isLoadingInside===false)) &&

                <div className="sm:px-5 mt-10 ">
                {<div class={`${(answerData.length>0 && selectedQuestions.length<0 )&&"hidden"} mt-20 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40`} ></div>}
<p className="flex flex-row mb-5 sm:ml-6"> 
<QuizIcon className="text-green-400 mr-2"/>
<span className="text-zinc-600 dark:text-zinc-200">Suggested Questions</span>
</p>
                {selectedQuestions.length>0 && selectedQuestions.map((question,index) =>
                (
                    index%2==0 ? 
        
                <button  className="bg-stone-50 border dark:bg-darkMode hover:scale-105 duration-300 transition ease-in-out text-zinc-600 dark:text-zinc-300 rounded-full px-5 py-1 text-md mr-4 mt-4 dark:border-zinc-700 drop-shadow-sm" onClick={handleAskPremadeQuestion}>{question}</button>

                :
                <button  className="bg-white border dark:bg-mildDarkMode text-zinc-600 dark:text-zinc-300 hover:scale-105 duration-300 transition ease-in-out rounded-full px-5 py-1 text-md mr-4 mt-4 dark:border-zinc-700 drop-shadow-sm" onClick={handleAskPremadeQuestion}>{question}</button>
                ))}



            </div>
        }
            
                <div id="answer-area" className="answer-area text-l max-w-[900px] ml-2 sm:ml-10 mt-10 ">
                    
                    {isLoadingInside || answerData.answer!==undefined ?<p className="text-green-400 text-l"> 
                        <QuestionAnswerIcon className="text-green-400 mr-1"/>
                        Answer</p> : null}
            {isLoadingInside &&
            <div className="opacity-60 dark:opacity-100">
                <div className="hidden dark:block opacity-60 w-full pr-3 lg:px-0 lg:w-[900px]">
                        <Box sx={{ width: 900 }}>
                        <Skeleton sx={{bgcolor:"#71717a"}} animation="wave"/>
                        <Skeleton sx={{bgcolor:"#71717a"}} animation="wave"/>
                        <Skeleton sx={{bgcolor:"#71717a"}} animation="wave"/>
                        <Skeleton sx={{bgcolor:"#71717a"}} animation="wave" height={80}/>
                        </Box>
                        </div>
                <div className="dark:hidden w-full pr-3 lg:px-0 lg:w-[900px]">
                 
                 <Box fullWidth>
                <Skeleton sx={{bgcolor:"dark:#fff"}} animation="wave"/>
                <Skeleton  animation="wave"/>
                <Skeleton  animation="wave"/>
                <Skeleton  animation="wave" height={80}/>
                </Box>
                </div>
                </div>
}
                             
                            {answerData.answer!==undefined &&
                             <div>       
                                    <p dangerouslySetInnerHTML={{ __html: answerData.answer.replace(/\n/g, '<br/>')
                                 }}/> 
                                    
                                    <div className="dark:text-zinc-300 text-zinc-600 opacity-60 text-center items-center mt-20">
                        Always check the sources before quoting. AI may not be 100% accurate.
</div>
                    </div>

                                }       
                                
        </div>
                {<div class={`${answerData.length===0 &&"hidden"} mt-10 border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-10 dark:opacity-40`} ></div>}
                            
                                    <p className={`text-green-400 ml-10 mt-4 mb-4 ${answerData.length===0 && "hidden"}`} >

                                          <TextSnippetIcon/>  Passages
                                </p>
                               
                                    <div className="flex flex-row">
                                        
                     
                                   {(answerData.sources!==undefined && isLoadingInside===false) && 
                                (
                                   window.innerWidth>900 ?
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
                                    <div className="mt-40 pr-4 w-6 sm:w-8">
                                        <ArrowBackIosNewIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                        </div>} 
                                         rightArrow={<div className="mt-40 pl-2 w-6 sm:w-8">
                                         <ArrowForwardIosIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
                                         </div>} className="cursor-default" show={window.innerWidth>420 ? 1.6 : 1.2} slide={1} transition={0.5}>
                                   {answerData.sources.map((source) => <SourceCard forDialog={false} source={source} tracks={tracks} setSelectedSourceCard={setSelectedSourceCard} selectedSourceCard={selectedSourceCard} openDialog={openDialog} setOpenDialog={setOpenDialog}/>)} 
                                          </Carousel>
                                
                                )
                            }

                           <Dialog   maxWidth={"sm"} fullWidth={fullWidth} open={openDialog} onClose={() => setOpenDialog(false)} >
                            {answerData.sources!==undefined && answerData.sources.map((source) => 
                          
                              <div ref={ref}>
                                {source===selectedSourceCard &&
                            <SourceCard forDialog={true} setFullWidth={setFullWidth} source={source} tracks={tracks} setSelectedSourceCard={setSelectedSourceCard} selectedSourceCard={selectedSourceCard} openDialog={openDialog} setOpenDialog={setOpenDialog}/>
                        }
                            </div>
                        
                            )} 
                               
                            </Dialog>  
            </div>
            </div>

          
            </div>
    )

}