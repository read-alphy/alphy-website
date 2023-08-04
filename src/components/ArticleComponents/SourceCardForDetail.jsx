import FeedItem from './FeedTabs/FeedItem';
import Twitter from '../../img/twitter_spaces.png';
import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import {Button} from "@material-tailwind/react";
import { Item } from '@radix-ui/react-accordion';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../../img/logo.png';
import LogoInverted from '../../img/logo-inverted.png';
import {useNavigate} from "react-router-dom"


export default function SourceCardForDetail({source, setSelectedSourceCard,selectedSourceCard, forDialog, index, setOpenDialog}) {
  const setOpenDialogInside = setOpenDialog
  const [fullWidth, setFullWidth] = useState(false);
    const startTime= Math.floor(source.start)
    const [expanded, setExpanded] = useState(false);

    let displayText =""
    let transcript
    
    let sentences
    let groupedText
    
    
    
    if(source.text!==undefined){
        const sentenceRegex = /(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/;
        sentences = source.text.split(sentenceRegex);
        const groups = sentences.reduce((acc, sentence, index) => {
            const groupIndex = Math.floor(index / 3);
            if (!acc[groupIndex]) {
                acc[groupIndex] = [];
            }
            acc[groupIndex].push(sentence);
            return acc;
        }, []);
        const groupedSentences = groups.map(group => group.join(' '));
        groupedText = groupedSentences.join('<br/> <br/>');
        groupedText = `${groupedText[0] === groupedText[0].toUpperCase() ? "" : "..."}${groupedText}${((groupedText[groupedText.length - 1] === "." || groupedText.substring(groupedText.length - 1) === "?") || (groupedText[groupedText.length - 1] === ",") || (groupedText[groupedText.length - 1] === "!") || (groupedText[groupedText.length - 1] === ":") || (groupedText[groupedText.length - 1] === "...")) ? "" : "..."}`


        
        
        if(window.innerWidth>768){
        displayText = expanded ? source.text : `${source.text[299]===" "? source.text.slice(0, 299) : source.text.slice(0, 300)}`;
    }
        else{
        displayText = expanded ? source.text : `${source.text[119]===" "? source.text.slice(0, 119) : source.text.slice(0, 120)}`;
    }
    }
    
   
    const navigate = useNavigate();


    let imageUrl
	if (source.source_type === 'yt') {
		imageUrl = `https://i.ytimg.com/vi/${source.source_id}/hqdefault.jpg`;
	} else if (source.source_type === 'sp') {
		imageUrl = Twitter;
	} 

    const myRef = useRef(null);
    let height
    const element = myRef.current;
    if (element) {
      height = element.getBoundingClientRect().height;
    }
const showDialog = () => {
    setOpenDialogInside(true);
    setSelectedSourceCard(index)
    };

    const handleAlphyClick = (event) => {
        event.stopPropagation();
        setTimeout(() => {
        navigate(`/${source.source_type}/${source.source_id}`);
        }, 100);
      };

      useEffect(() => {
        const handleResize = () => {
            if(setFullWidth){
          if (window.innerWidth < 600) {
            setFullWidth(true);
          } else {
            setFullWidth(false);
          }
        }
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [setFullWidth]);
    


    return(
        <div className="dark:bg-mildDarkMode ">
            {!forDialog ? 
        <div onClick={showDialog} className=" border border-zinc-200 dark:border-mildDarkMode dark:bg-mildDarkMode w-[240px]  sm:w-[360px] h-[420px] py-2 px-4 overflow-y-hidden drop-shadow-sm cursor-pointer">
            <div className=" flex flex-row mt-4">
{/*                     <div className={`min-w-[120px] max-w-[120px] mr-3 min-h-[60px] max-h-[60px] overflow-hidden`}>
                                                <div
                                                    className="flex items-center justify-center h-0 dark:opacity-80  rounded-md bg-gray-600"
                                                    style={{
                                                        backgroundImage: `url(${imageUrl})`,
                                                        paddingBottom: '50%',
                                                        backgroundPosition: 'center',
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundSize: 'cover',

                                                    }}
                                                ></div>


                                                    </div> */}

                    <div classNAme=" text-lg w-full font-bold min-h-[80px] max-h-[80px] overflow-y-hidden">


                    </div>
			</div>
            <div>
                <a onClick={handleAlphyClick} className="underline mt-4 flex flex-row">
                    <div>
                    <img  src={Logo} className="w-[24px] h-[24px] sm:w-[24px] hidden dark:flex"/>
                    <img  src={LogoInverted} className="w-[24px] h-[24px] sm:w-[24px] dark:hidden"/>
                    </div>
                    <p className="ml-2 text-sm sm:text-md">See more details on Alphy </p></a>
                <p className="mt-4">
                <a className=" text-zinc-700 dark:text-zinc-300">


                        {Math.floor(source.start / 3600) < 10 ? `0${Math.floor((source.start / 3600))}` : `${Math.floor((source.start / 3600))}`}
                        {":"}
                        {Math.floor(source.start / 60) < 10 ? `0${(Math.floor(source.start / 60))}` : Math.floor(source.start % 3600) < 600 ? `0${(Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60))}` : Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60)}
                        {":"}
                        {Math.floor(source.start % 60) < 10 ? `0${(Math.floor(source.start % 60))}` : (Math.floor(source.start % 60))}

                        {" - "}

                        {Math.floor(source.end / 3600) < 10 ? `0${Math.floor((source.end / 3600))}` : `${Math.floor((source.end / 3600))}`}
                        {":"}
                        {Math.floor(source.end / 60) < 10 ? `0${(Math.floor(source.end / 60))}` : Math.floor(source.end % 3600) < 600 ? `0${(Math.floor(source.end / 60 - (Math.floor(source.end / 3600)) * 60))}` : Math.floor(source.end / 60 - (Math.floor(source.end / 3600)) * 60)}
                        {":"}
                        {Math.floor(source.end % 60) < 10 ? `0${(Math.floor(source.end % 60))}` : (Math.floor(source.end % 60))}
                        </a>
                </p>
            <p ref={myRef}
        className={` mt-4 text-zinc-700 dark:text-zinc-300 text-md`} 

      >
                {displayText[0] === displayText[0].toUpperCase() ? "" : "..."}{displayText}{((displayText[displayText.length - 1] === "." || displayText.substring(displayText.length - 1) === "?") || (displayText[displayText.length - 1] === ",") || (displayText[displayText.length - 1] === "!") || (displayText[displayText.length - 1] === ":") || (displayText[displayText.length - 1] === "...")) ? "" : "..."}


                </p>

            </div>
            <p className="absolute bottom-0 text-greenColor mb-2">Click to see more</p>
            
        </div>
   :

            <div className="w-full">
            <CloseIcon className="right-0 absolute mr-4 mt-2 cursor-pointer text-zinc-700 dark:text-zinc-300" onClick={() =>setOpenDialog(false)}></CloseIcon>
                <div className="sm:w-[600px] py-10 px-4 sm:px-10 "  onBlur={() => setOpenDialog(false)}>
{source.source_type==="yt"&&
                <iframe
                className="sm:w-[430px] h-[200px] items-center mx-auto mb-10"
                        id="player"
                        title="My YouTube Video "
                        src={`https://www.youtube.com/embed/${source.source_id}?start=${startTime}`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>}
<p className={`text-greenColor mt-4 mb-4 px-2 sm:px-10`} >

<TextSnippetIcon/>  Passage
</p>
<p className="px-2 sm:px-10 text-zinc-700 dark:text-zinc-300" dangerouslySetInnerHTML={{__html:groupedText}}>

</p>

                
                
                </div>
                </div>
                
            }
        </div>
    )
}