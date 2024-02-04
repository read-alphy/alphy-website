

import React, {useState, useEffect} from 'react';
import InputArea from './InputArea';    
import Settings from './Settings';
import {Button,
	Spinner
} from "@material-tailwind/react";
import {promptGenerator} from '../Prompts/PromptHandler';
import Toolbox from './Toolbox';


const sourcesMap={
    "yt": "YouTube",
    "sp": "Twitter Spaces",
    "x": "Twitter",
    "tw": "Twitch",
    "ap": "Apple Podcasts"
}





export default function GenerationZone({data,generatedPrompt,setGeneratedPrompt,outputMessage, setOutputMessage}){

const [isLoading, setIsLoading] = useState(false);
const [userPrompt, setUserPrompt] = useState("");
const [advancedSettingsToggled, setAdvancedSettingsToggled] = useState(false);

const theme = localStorage.getItem("theme");

const [contentDetails, setContentDetails] =useState({
    content: "",
    content_type: "",
    source_type: "",
    source_title: "",
    creator_name: ""
})


const [settings, setSettings] = useState({
    verbosity_level: 5,
    detail_level: 5,
    content_to_use : "summary",
    prompt_type: "user_prompt",
    character: "Casual"
})

function generateContentDetails(){
    let content_to_use = "summary"
    let source_title = ""
    let source_type = ""
    let creator_name = ""

    if(settings.content_to_use === "transcript"){ content_to_use = data.transcript}
    else {content_to_use = data.summaries[0][settings.content_to_use]}
    

    if(data.title) {source_title = data.title}
    if(data.source_type) {source_type = sourcesMap[data.source_type]}
    if(data.creator_name) {creator_name = data.creator_name}

    const content_details = {
        content: content_to_use,
        character: settings.character,
        content_type: settings.content_to_use,
        source_type: source_type,
        source_title: source_title,
        creator_name: creator_name

    }
    return content_details
}

useEffect(() => {
    if(data === null || data===undefined) {return}
    if(data.summaries === null || data.summaries === undefined) {return}
    
    const content_details = generateContentDetails()
    setContentDetails(content_details)
},[data, settings]
    
    )

    

function createDopeStuff(){


  const generated_prompt =  promptGenerator(settings,contentDetails)
  setGeneratedPrompt(generated_prompt)
  setOutputMessage(generated_prompt)
  console.log(generated_prompt)

}
const adjustments = <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<path stroke={`${theme==="light" ? "#52525b" : "white"}`}  stroke-linecap="round" stroke-width="1.5" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"/>
</svg>

    return(<div className="max-w-[1000px] h-full px-2">
        <InputArea userPrompt={userPrompt} setUserPrompt={setUserPrompt} createDopeStuff={createDopeStuff} isLoading={isLoading} setIsLoading = {setIsLoading}/>
        



        <div className="flex flex-row justify-end mt-10  md:ml-4 pr-6 ">
        <Button ripple={true} onClick={() =>  setAdvancedSettingsToggled(!advancedSettingsToggled)} className="items-center margin-auto  gap-1 items-center flex text-center justify-center bg-transparent border text-zinc-600 dark:text-zinc-300 border-indigo-300 dark:border-indigo-500 cursor-pointer normal-case mr-4 h-[40px]">
            {adjustments} Advanced Settings
        </Button>       
            
        <Button onClick={() => createDopeStuff()} ripple={true} className=" bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] h-[38px] from-purple-200 to-blue-200 text-zinc-700 font-averta-regular normal-case w-[120px]">
            {isLoading ? <Spinner color="blue" size="sm"/>: "Generate"}
        </Button>
        </div>
        <Settings settings={settings} setSettings={setSettings} advancedSettingsToggled={advancedSettingsToggled} setAdvancedSettingsToggled={setAdvancedSettingsToggled} theme={theme} adjustments={adjustments}/>

        <Toolbox theme={theme} createDopeStuff={createDopeStuff} isLoading={isLoading}/>


    </div>)
}