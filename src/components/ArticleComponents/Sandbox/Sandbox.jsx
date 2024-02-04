import React , {useState} from 'react';
import GenerationZone from './Generation/GenerationZone';
import OutputZone from './Output/OutputZone';



export default function Sandbox({data}){

    const [generatedPrompt, setGeneratedPrompt] = useState("");
    const [outputMessage, setOutputMessage] = useState("");

    


    return(
    
        <div className="min-h-[70vh] w-full max-w-[1200px] drop-shadow-sm dark:bg-mildDarkMode  rounded-xl">
            <p className="font-medium  text-lg  text-slate-500 dark:text-zinc-300">

            Create anything from the content.
            </p>
             
            <GenerationZone data={data}  generatedPrompt={generatedPrompt} setGeneratedPrompt={setGeneratedPrompt} outputMessage={outputMessage} setOutputMessage={setOutputMessage}/>
        <OutputZone generatedPrompt={generatedPrompt} outputMessage={outputMessage} setOutputMessage={setOutputMessage}/>

    </div>
    
    
    )
}