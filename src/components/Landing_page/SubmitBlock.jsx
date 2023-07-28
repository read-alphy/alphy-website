import PublishIcon from '@mui/icons-material/Publish';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import {Button} from "@material-tailwind/react";

export default function SubmitBlock({currentUser, hasActiveSub, credit, handleSubmit, inputValue, setInputValue, errorMessage, failed}){


    return(
        <div className="p-10 pt-20 text-zinc-700 h-[50vh] dark:text-zinc-300 bg-white dark:bg-mildDarkMode  items-center  justify-center px-20">                                               
        <p className="dark:text-zinc-300 text-zinc-700 mb-4 text-lg px-1">
               Submit your link below</p>
        <div className=" sm:grid sm:grid-cols-3 lg:grid-cols-4 mx-auto mt-5 ">
        <div class="sm:col-span-2 lg:col-span-3 relative w-full min-w-[200px] h-12">
                    <input 
                    
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder=" "

                    className="peer w-full border-t-blue-gray-500 h-full bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 dark:place-holder-shown:border-t-darkMode placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-500 dark:border-zinc-700 dark:focus:border-r-greenColor  dark:focus:border-l-greenColor dark:focus:border-b-greenColor focus:border-greenColor"/>
                    <label class="text-zinc-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-greenColor before:border-blue-gray-200 dark:before:border-mildDarkMode dark:after:border-mildDarkMode peer-focus:before:!border-greenColor after:border-blue-gray-200 peer-focus:after:!border-greenColor">Insert the link to YouTube video or Twitter Space</label>

                    <div className="sm:hidden">
                    <Button size="sm" className="!absolute right-1 top-1 rounded bg-green-300" onClick={(e) => {
                        handleSubmit();
                    }}> <PublishIcon fontSize="medium"/></Button>
            </div>
                </div>

        <div className={`hidden sm:block sm:col-span-1 mt-5 sm:mt-0 flex ml-5 justify-center md:justify-self-start items-center ${currentUser ? "" : ""}`}>
            
                <div>
               
                
                <Button size="sm" type="submit"
                    onClick={(e) => {
                        handleSubmit();
                    }} className=" bg-green-300 dark:text-zinc-700 px-6 py-3 text-sm lg:text-[15px] normal-case">Submit</Button>
                </div>
           
        </div>
        </div>
        {failed && 
        <div className="mx-auto mt-5 text-sm text-red-400 ml-2">
        {errorMessage}
        </div>
        }
         <div className="flex items-center  mt-4 space-x-4 md:justify-center lg:mt-0  ">

<div className="w-full flex flex-col  px-1">


{currentUser &&
            <span className="text-sm mb-2 mt-4 text-gray-600 dark:text-zinc-300 "> 

            <a href="/account" className="underline">{hasActiveSub ? "Premium Plan" : "Basic Plan"}</a> - Remaining Credits : {Math.floor(credit)} minutes 

            </span> 

}
<div className=" space-y-2 mt-10 ">

{!hasActiveSub ? 

currentUser ?
<div>
<p className="font-semibold text-md text-zinc-700 dark:text-zinc-200">You are on Basic Plan</p>
<p className="text-zinc-700 dark:text-zinc-200 text-sm"> • You can only submit YouTube videos.</p>
<p className="text-zinc-700 dark:text-zinc-200 text-sm"> • You can submit up to <strong>1 hour</strong> of content. </p>{/* <strong className="underline">1 hour</strong> if you are on a free tier, and <strong className="underline">4 hours</strong> if premium. Otherwise, you will get an error. </p> */}
<p className="text-zinc-700 dark:text-zinc-200 text-sm"> • The video you are submitting should have more than <strong >10,000 views</strong>.</p>
<p className="text-zinc-700 dark:text-zinc-200 text-sm mt-2"> Alphy might fail to process content with location limits.</p>

<p className="mt-4 text-sm"> Switch to a <a href="/u/account" className="text-greenColor text-sm underline"> paid plan </a>for limitless submissions and free Twitter Spaces transcription.</p>
</div>
:
<div>
    <a className="text-greenColor" href="/u/login"> Sign in</a> to process content with Alphy.
    </div>
:   
<div>

<p className="font-semibold text-md text-zinc-700 dark:text-zinc-200 mb-2 ml-1">You are on Premium Plan</p>
<p className="text-zinc-700 dark:text-zinc-200 text-sm"> • No duration limit applied.</p>
<p className="text-zinc-700 dark:text-zinc-200 text-sm"> • No view limit applied. </p>
<p className="text-zinc-700 dark:text-zinc-200 text-sm"> • You have access to <span className="text-greenColor">unlimited Twitter Spaces transcription</span>.</p>
<p className="text-zinc-700 dark:text-zinc-200 text-sm mt-2">  Alphy might fail to process content with location limits.</p>
</div>
}





</div>




</div>

</div>

<div class="border-b border-gray-100 mt-10 dark:border-zinc-700 mx-auto items-center flex mb-5 dark:opacity-40 md:w-1/3"></div>

<div className="flex flex-row mt-5 justify-center mx-auto ml-4"> 
<YouTubeIcon fontSize="large" className="text-emerald-200"/>
<TwitterIcon fontSize="large" className="ml-4 text-emerald-200"/> 
</div>
        </div>

    )
}