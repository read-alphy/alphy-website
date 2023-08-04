import {
	Popover,
	PopoverHandler,
	PopoverContent,
    ThemeProvider,
    Button

  } from "@material-tailwind/react";

export default function FreeCard({hasActiveSub,openPopover1,setOpenPopover1, currentUser, triggers1, canceledAtPeriodEnd, themePopover}){

    return(
        <div className="col-span-1 md:min-w-[400px] max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700 ">


        <p className="mb-4 text-2xl font-medium text-gray-500 dark:text-zinc-300">Basic</p>
            
            <div className="flex items-baseline text-gray-900 dark:text-white">
                
                <span className="text-5xl font-extrabold tracking-tight">Free</span>
                
            </div>
            <p className="mt-3 text-gray-400">Discover Alphy's capabilities </p>
            <div className="h-[400px]">
                <ul role="list" className="space-y-5 my-7">
                    <li className="flex space-x-3">

                        {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">___________________________ </span>
                    </li>

                    <li className="flex mt-20 space-x-3">

                        {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Access Alphy's public database</span>
                    </li>
                    <li className="flex space-x-3">

                        {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-gray-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">2 hours of free transcription for YouTube videos</span>
                    </li>
               
                    <li className="flex space-x-3">


            
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Ask questions to Alphy</span>
                    </li>
                
                    <li className="flex space-x-3">

                        {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">Submit content up to 1 hour</span>
                    </li>
                    <li className="flex space-x-1">

                        {/* <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-200 dark:text-zinc-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg> */}
                        {/* <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">10,000 view limit on videos</span> */}
                        <Popover open={openPopover1} handler={setOpenPopover1}>
                        <p className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                            Content popularity limit </p>
                            <PopoverHandler {...triggers1} >
                            <svg className="w-5 h-5 pt-1 opacity-50 text-gray-400 hover:text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                            </PopoverHandler>
                     <ThemeProvider value={themePopover}>
                     <PopoverContent {...triggers1}>
                                <p> You can only submit videos with greater than <strong className="underline">10,000 views</strong></p>
                                </PopoverContent>
                            </ThemeProvider>
                            
                                </Popover>
                    </li>

                    <li className="flex space-x-3 pt-4">


                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-zinc-300">
                        </span>
                    </li>

                </ul>
            </div>

            {currentUser ?
                <a target="_blank" href={hasActiveSub && !canceledAtPeriodEnd && "https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"}>
                    <Button type="button" className={` bg-zinc-600   font-semibold ${hasActiveSub && !canceledAtPeriodEnd ? "bg-zinc-700  dark:bg-darkMode dark:bg-zinc-700" : "pointer-events-none"} rounded-lg text-zinc-700 text-[14px] px-5 py-4 inline-flex justify-center w-full text-center`} >{currentUser ? (hasActiveSub && !canceledAtPeriodEnd  ? "Switch Back To Free" : "Active") : "Sign Up For Free"}</Button>
                </a>
                :
                <a href="/u/login" type="button"> 
                <Button className="text-white bg-greenColor transition duration-200 ease-in focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-semibold rounded-lg  px-5 py-3 inline-flex justify-center w-full text-center text-zinc-700 text-[16px]">{currentUser ? "Active" : "Sign Up For Free"}</Button></a>
            }







        </div>

    )
}