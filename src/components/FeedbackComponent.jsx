import React, {useState, useEffect} from "react";
import { useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


export default function FeedbackComponent({currentUser}){
    const location = useLocation();

	const [showFeedbackTally, setShowFeedbackTally] = useState(false);
	const [showCTAButton, setShowCTAButton] = useState(false);

    if(showCTAButton === false){
		setTimeout(() => {
			setShowCTAButton(true)
		},300)
    }
	
	useEffect(() => {
		setTimeout(() => {
			const searchParams = location.search.split('?')[1]; 
			if(searchParams === undefined){return}
			if(searchParams.includes("submit_feedback") === false){return}
			const submitFeedbackValue = searchParams.split("submit_feedback=")[1]; 
			if (submitFeedbackValue !== undefined && submitFeedbackValue === "true" && currentUser ) {
                localStorage.setItem(`${currentUser.uid}_showFeedbackTally`, `false`)
		

				let url = new URL(window.location);
				let searchParams = new URLSearchParams(url.search);
				searchParams.delete("submit_feedback");
				url.search = searchParams.toString();
				window.history.pushState({}, '', url);
                }
				
            }
				, 300);

			}, [currentUser]) // eslint-disable-line react-hooks/exhaustive-deps

            
            


return(
    <div>
    {currentUser && showCTAButton && localStorage.getItem("tier")!=="premium" && window.innerWidth > 768 && localStorage.getItem(`${currentUser.uid}_showFeedbackTally`) !== `false` &&
    <div className={`group glow-effect bottom-0 fixed right-0 mr-10 w-[400px] overflow-y-auto  bg-white text-black dark:bg-mildDarkMode border dark:border-zinc-600 border-zinc-200 drop-shadow-lg rounded-t-xl
transition-height duration-300 ease-in-out ${showFeedbackTally ? "h-[800px]" : "hover:h-[200px] h-[70px] "}
    
    px-4 py-3`}>
        {showFeedbackTally === false ?
            <div className="flex flex-col text-center items-center ">
                        <p className="text-black dark:text-whiteLike text-xl"><span className="wave mr-2 text-xl">👋</span>Help us build Alphy! </p>
                        <p className="hidden group-hover:block mt-4 dark:text-whiteLike"> Fill out this 5-min survey about your experience with Alphy so far and win <span className="underline dark:text-whiteLike font-bold">1 hour</span> in transcription credits! </p>
                        <div className="flex flex-row">
                            <button onClick={() => setShowFeedbackTally(!showFeedbackTally)} className={` text-md hidden group-hover:block mt-4 px-4 py-2 rounded-lg bg-green-200 text-zinc-900 drop-shadow-lg`}>
                                Take Survey
                            </button>
                            <button onClick={() => {
                                localStorage.setItem(`${currentUser.uid}_showFeedbackTally`, `false`)
                                setShowCTAButton(false)
                                setShowFeedbackTally(false)
                                }
                            } className={` text-md ml-4 hidden group-hover:block mt-4 px-4 py-2 rounded-lg bg-none border border-zinc-700 text-zinc-900 dark:border-zinc-300 dark:text-zinc-300 `}>
                                Don't Show Again
                            </button>
                            </div>

            </div>
            :

    <div className={` overflow-y-auto `}>
            <div className=" flex fixed right-0 justify-end mr-4 mt-2 cursor-pointer" onClick={() => setShowFeedbackTally(false)}> <CloseIcon className="dark:text-zinc-300" /> </div>
            
            <p className="text-2xl text-zinc-900 dark:text-zinc-300 mt-6 ml-2 font-averta-bold">Tell us what you think!</p>
            <p className="text-md text-zinc-700 dark:text-zinc-400 mt-6 ml-2 font-averta-regular">Complete this survey and win 1 hour in transcription credits!</p>
            {localStorage.getItem("theme")==="light" ? 
            <iframe
                title = "Survey Form"
                className={`${showFeedbackTally ? "":"hidden"} dark:block dark:text-whiteLike mb-20  overflow-auto w-[350px]`} 
                src={`https://tally.so/embed/3No0k0?user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
            ></iframe> 
            :
            <iframe
            title = "Survey Form"
            className={`${showFeedbackTally ? "":"hidden"} dark:block dark:text-whiteLike overflow-auto h-160 w-[350px]`} 
            src={`https://tally.so/embed/mDz5vX?user_id=${currentUser.uid}&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        ></iframe>}

            
        </div>
        
}
     </div>
    }
    </div>
)

}