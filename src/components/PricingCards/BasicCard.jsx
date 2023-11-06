import {
	Popover,
	PopoverHandler,
	PopoverContent,
    ThemeProvider,
    Button

  } from "@material-tailwind/react";
  import {Link} from "react-router-dom"

export default function BasicCard({tier,openPopover,setOpenPopover, currentUser, triggers})
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
        <div className="col-span-1 xs:max-w-[400px] xs:min-w-[400px] xl:max-w-[360px] xl:min-w-[270px] p-4 bg-white border border-gray-200 rounded-lg  drop-shadow-sm  sm:p-8 dark:bg-zinc-900 dark:drop-shadow-xl dark:border-gray-700  ">
        <p className="mb-4 text-2xl font-averta-semibold text-gray-500 dark:text-zinc-300">Basic</p>
            {/* <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-zinc-300">For Seekers</h5> */}
            <div className="flex items-baseline text-gray-900 dark:text-white">
                <span className="text-3xl font-averta-semibold">$</span>
                <span className="text-5xl font-averta-semibold tracking-tight">5</span>
                <span className="ml-1 text-xl font-averta-semibold text-gray-500 dark:text-zinc-300 font-averta-semibold">/month</span>
            </div>
            <p className="mt-3 text-gray-400 font-averta-semibold">Level up your reach </p>
            <div className={`h-[460px]`}>
                <ul role="list" className="space-y-5 my-7">


{tier==="free"  ? 
                <Link className={`${tier==="basic" && "pointer-events-none"}`} to={
                currentUser ?  `/plans/checkout?sub=basic`  : ("/u/login")}
                onClick={
                    (currentUser && tier=="free") && sessionStorage.setItem("calledPlan","basic")
                }
>
                <Button type="button" className={`transition duration-200 ease-in ${tier==="basic"  && "pointer-events-none bg-zinc-700 text-white "} ${tier==="free" && "bg-greenColor text-zinc-700 "} ${tier==="premium" && "bg-zinc-700 text-white"} rounded-lg text-[16px] font-averta-semibold px-5 py-3 inline-flex justify-center w-full text-center`} >
                    {tier==="basic" ? "Active" : (tier==="free" ? "Go Basic": "Go Basic")}
                    </Button> 

            </Link>
               :
               <a className={`${tier==="basic" && "pointer-events-none"}`} target="_blank" href="https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE"
>
                <Button type="button" className={`transition duration-200 ease-in ${tier==="basic"  && "pointer-events-none bg-zinc-700 text-white "} ${tier==="free" && "bg-greenColor text-zinc-700 "} ${tier==="premium" && "bg-zinc-700 text-white"} rounded-lg text-[16px] font-averta-semibold px-5 py-3 inline-flex justify-center w-full text-center`} >
                    {tier==="basic" ? "Active" : (tier==="free" ? "Go Basic": "Go Basic")}
                    </Button> 

            </a>
             }
            
                    <li className="flex space-x-3">

                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 mt-1 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300 font-averta-semibold">Extra 5 hours of prioritized transcription credits per month</span>
                    </li>


                    <li className="flex space-x-3">
                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                        <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300 font-averta-semibold">Multi-language translation </span>
                    
                    </li>
                                        
                    <li className="flex space-x-3">
                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                        <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300 font-averta-semibold">Process Twitter Spaces </span>
                    </li>
                    
                    <li className="flex space-x-3">
                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                    <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Download transcripts</span>
                </li>

                <li className="flex space-x-3">
                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                    <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Create 3 Arcs</span>
                </li>

                <li className="flex space-x-3">
                    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {/* <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit top ups</span> */}
                    <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Optional credit topups</span>
                </li>
                                        
{/*                     <li className="flex space-x-3">

            <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Free Twitter Spaces transcription</span>
                        </li>    */}
                      

      {/*               <li className="flex space-x-3">
                        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-greenColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        <span className="text-base font-averta-semibold leading-tight text-gray-500 dark:text-zinc-300">Download transcripts and summaries</span>
                    </li> */}

                </ul>
            </div>

          


        </div>

    )
}