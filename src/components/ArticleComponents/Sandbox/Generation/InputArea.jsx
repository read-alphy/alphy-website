
import React, { useEffect, useRef } from 'react';
import {Button, Spinner} from "@material-tailwind/react";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import EditNoteIcon from '@mui/icons-material/EditNote';



export default function InputArea({setUserPrompt, createDopeStuff, isLoading}){
    
    const textareaRef = useRef(null);

        const resizeTextarea = () => {

            const textarea = textareaRef.current;
            if (textarea) {
                setUserPrompt(textareaRef.current.value)
                textarea.style.height = 'auto'; // Reset height to recalculate
                textarea.style.height = textarea.scrollHeight + 'px'; // Set to scroll height
            }

            if (textarea.value.trim() !== '') {
                textarea.classList.add('glow-effect-textarea');
            } else {
                textarea.classList.remove('glow-effect-textarea');
            }                       
        };

    useEffect(() => {
         resizeTextarea();
    }, []);


    const prompt_quoteGetter = `Get me quotes from the conversation about the talking points I specify. For instance, if I want you to get me quotes about "generative AI", I want you to get me as many quotes about generative AI as possible from the conversation. Here are the talking points: [talking points]` 
    const prompt_summarizer = `Summarize the conversation by focusing on the following subjects : [subjects]`

    return(
    <div className="flex flex-col ">
        <textarea  ref={textareaRef} className=" shadow-[0_0_13px_#bae6fd] text-zinc-700 text-sm md:text-md dark:text-zinc-200 textarea overflow-y-scroll  focus-glow-effect  dark:bg-mildDarkMode  dark:border-zinc-700 rounded-lg w-[95%] mt-4 mx-2 md:mx-0  
        margin-auto min-h-[8vh] max-h-[300px]  resize-none dark:focus:border-zinc-700 focus:border-zinc-200 border border-zinc-200 placeholder:text-sm"
        onInput={resizeTextarea}
         placeholder = "generate something beautiful for me..."/>
            {/*     <Button onClick={() => createDopeStuff()} ripple={true} className="mr-6 hidden md:flex bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] h-[38px] from-purple-200 to-blue-200 text-zinc-700 font-averta-regular normal-case">
            {isLoading ? <Spinner color="blue" size="sm"/>: "Generate"}
        </Button> */}
        <div className="flex flex-row mt-6 overflow-x-auto gap-4">
        <button

        onClick={() => {

            if(textareaRef.current){
                textareaRef.current.value = prompt_quoteGetter;
              
            }
        }}

        className="rounded-md bg-gray-100 border border-gray-200 px-4 h-[34px] py-1 text-sm text-zinc-500 flex flex-row items-center gap-0.5">
       <FormatQuoteIcon className="text-zinc-500  mt-1 mr-1"
       
       sx={{
        width:"16px",
        height:"16px",
    
        }}/>
            Get me quotes
            </button>
        <button  
        
        onClick={() => {

            if(textareaRef.current){
                textareaRef.current.value = prompt_summarizer;
                
            }
        }}
        
        className="rounded-md bg-slate-100 border  h-[34px] border-slate-200 px-4 py-1 text-sm text-zinc-500 font-averta-regular">
           
           <EditNoteIcon className="text-slate-500 -mt-0.5 mr-1" sx={{
        width:"16px",
        height:"16px",
        }}/>
           Summarize with focus
            </button>
        </div>
        </div>

    )
}