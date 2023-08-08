import {
	Popover,
	PopoverHandler,
	PopoverContent,
    ThemeProvider,
    Button

  } from "@material-tailwind/react";
  import {Link} from "react-router-dom"

export default function PremiumCard({hasActiveSub,openPopover,setOpenPopover, currentUser, triggers, canceledAtPeriodEnd})
{
    const themePopover = {
        popover: {
          styles: {
            base: {
              bg: "bg-zinc-50 dark:bg-mildDarkMode",
              color: "text-zinc-600 dark:text-zinc-200",
              border:"border-2 border-zinc-100 dark:border-zinc-600",
              
            },
          },
        },
        
      };
    return(
        <div className="col-span-2 max-w-xs md:min-w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-slate-800 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">
        <p className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Premium</p>
            {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Seekers</h5> */}
            <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-semibold">$</span>
                <span className="text-5xl font-extrabold tracking-tight">5</span>
                <span className="ml-1 text-xl font-normal text-gray-500 dark:text-zinc-300">/month</span>
            </div>
            <p className="mt-3 text-gray-400">Level up your reach </p>
            <div className={` h-[400px] ${currentUser=== null && "xl:h-[444px]"}`}>
                <ul role="list" className="space-y-5 my-7">
                    <li className="flex space-x-3">

                        {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">___________________________ </span>
                    </li>
                    <li className="flex space-x-3">


                        <span className="text-l font-normal leading-tight text-gray-500 dark:text-zinc-300">Everything on the Basic Plan plus:</span>
                    </li>

                    <li className="flex space-x-3">

                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Extra 10 hours of prioritized transcription credits per month</span>
                    </li>

                    <li className="flex space-x-3">
                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No duration limit for submissions</span>
                    </li>

                    <li className="flex space-x-3">
                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">No popularity limit</span>
                    </li>
                    
                    <li className="flex space-x-3">
                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Process local audio files</span>
                </li>
                    <li className="flex space-x-3">
                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}


                        <Popover open={openPopover} handler={setOpenPopover }>
                        <div className="flex flex-row">
                            
                                
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Multi-language translation </span>
                        
                        <PopoverHandler {...triggers} >
                        <svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                        </PopoverHandler>
<ThemeProvider value={themePopover}>
                        <PopoverContent {...triggers}>
                            <p className="">Generate summaries and ask questions to any content in over 50 languages, regardless of the language of the content.
                            <br></br>
                           </p>
                        </PopoverContent>
                        </ThemeProvider>
                        </div>
                        </Popover>
                    </li>
                    
                    <li className="flex space-x-3">
                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts</span>
                </li>
                                        
                    <li className="flex space-x-3">

            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Free Twitter Spaces transcription</span>
                        </li>   

      {/*               <li className="flex space-x-3">
                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Download transcripts and summaries</span>
                    </li> */}

                </ul>
            </div>
            <Link className={`${hasActiveSub &&!canceledAtPeriodEnd ? "pointer-events-none" : ""}`} to={
                (currentUser && !hasActiveSub) ? `/plans/checkout` : (canceledAtPeriodEnd ? "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE": "")}
>
                {currentUser ? <Button type="button" className={` bg-greenColor  transition duration-200 ease-in ${hasActiveSub && !canceledAtPeriodEnd ? "pointer-events-none text-whiteLike" : ""} rounded-lg text-[16px] font-semibold ]px-5 py-3 inline-flex text-zinc-700 justify-center w-full text-center`} >{hasActiveSub && !canceledAtPeriodEnd ? "Your Current Plan" : (canceledAtPeriodEnd ? "Renew Plan" : "Upgrade Plan")}</Button> : <div className={`h-[44px] ${currentUser?"block":"hidden"}`}></div>}

            </Link>



        </div>

    )
}