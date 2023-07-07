import FeedItem from '../../components/ArticleComponents/FeedTabs/FeedItem';
import Twitter from '../../img/twitter_spaces.png';
import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import {Button} from "@material-tailwind/react";
import { Item } from '@radix-ui/react-accordion';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CloseIcon from '@mui/icons-material/Close';


export default function SourceCard({source, tracks, setSelectedSourceCard,selectedSourceCard, forDialog, openDialog,setOpenDialog}) {
  const setOpenDialogInside = setOpenDialog
    const startTime= Math.floor(source.start)
   
    
    
    const title = tracks[0].find((track) => track.source_id === source.source_id).source.title

  

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
    setSelectedSourceCard(source)
    
    };

    return(
        <div className="dark:bg-mildDarkmode">
            {!forDialog ? 
        <div onClick={showDialog} className="rounded-lg border border-zinc-200 dark:border-mildDarkMode dark:bg-mildDarkmode w-[240px] h-[220px] md:w-[320px] md:h-[420px] py-2 px-4 overflow-y-hidden drop-shadow-sm cursor-pointer">
            <div className=" flex flex-row mt-4">
                    <div className={`min-w-[100px] max-w-[100px] mr-3 `}>
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


                                                    </div>

                    <div classNAme="video-text text-lg w-full font-bold">
                        <p>{title}
                        </p>

                    </div>
			</div>
            <div>
                
                <p className="mt-4">
                <a className="underline text-zinc-700 dark:text-zinc-300">


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
                {source.text[0] === source.text[0].toUpperCase() ? "" : "..."}{source.text}{((source.text[source.text.length - 1] === "." || source.text.substring(source.text.length - 1) === "?") || (source.text[source.text.length - 1] === ",") || (source.text[source.text.length - 1] === "!") || (source.text[source.text.length - 1] === ":") || (source.text[source.text.length - 1] === "...")) ? "" : "..."}


                </p>

            </div>
            
        </div>
   :

            <div>
            <CloseIcon className="right-0 absolute mr-4 mt-2 cursor-pointer" onClick={() =>setOpenDialog(false)}></CloseIcon>
                <div className="w-[600px] py-10 px-10 mt-4"  onBlur={() => setOpenDialog(false)}>
{source.source_type==="yt"&&
                <iframe
                className="w-[430px] h-[200px] items-center mx-auto mb-10"
                        id="player"
                        title="My YouTube Video "
                        src={`https://www.youtube.com/embed/${source.source_id}?start=${startTime}`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>}
<p className={`text-green-400 mt-4 mb-4 px-10`} >

<TextSnippetIcon/>  Passage
</p>
<p className="px-10">
{source.text[0] === source.text[0].toUpperCase() ? "" : "..."}{source.text}{((source.text[source.text.length - 1] === "." || source.text.substring(source.text.length - 1) === "?") || (source.text[source.text.length - 1] === ",") || (source.text[source.text.length - 1] === "!") || (source.text[source.text.length - 1] === ":") || (source.text[source.text.length - 1] === "...")) ? "" : "..."}
</p>

                
                
                </div>
                </div>
                
            }
        </div>
    )
}