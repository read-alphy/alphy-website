import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from "react-router-dom"
import DiscordIcon from "../../img/discord.svg"
import Dialog from '@mui/material/Dialog';
import { useState } from "react"
import FeedbackForm from "../../components/FeedbackForm.jsx"



export default function FooterMainPage({ currentUser }) {
    const [openFeedbackDialog, setOpenFeedbackDialog] = useState(false);


    return (
        <div className="bottom-0">
            <div>
                <div className="">
                    <div className="flex flex-col">
                        <div className=" pl-3 md:pl-6  mb-6">

                        </div>
                        {/*   {tier===free && 
                                    <div className="mb-6 hidden xl:block">
                                    <p className = "text-zinc-500 dark:text-zinc-200 text-md  w-full w-full pl-10 mb-5 ">Try Premium</p>
                                    <p className = "text-zinc-500 dark:text-zinc-300 text-sm w-full w-full pl-10 ">Extra transcription credits, multi-language access, local audio processing, and unlimited Arc creation</p>
                                    <Link to="/plans" className=" text-xs w-full cursor-pointer w-full pl-10 mt-5 text-green-400 dark:text-greenColor">Learn More > </Link>
                                    </div>
                                    }
 */}

                        {localStorage.getItem("logged in") === "true" ?

                            <Link className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-6 md:pl-10 " to="/account">
                                {/* <PersonIcon className="text-zinc-300 mr-2" fontSize="medium"/> */}
                                <span className="font-averta-semibold">Account</span>
                            </Link> :

                            <Link className="text-zinc-500 dark:text-zinc-300 text-sm w-full cursor-pointer w-full pl-6 md:pl-10 " to="/plans">
                                <span className="font-averta-semibold">Plans</span></Link>

                        }
                    </div>

                    <div className="mt-2 lg:mt-4 pl-6 md:pl-10">
                        <Link className="text-zinc-500 dark:text-zinc-300 text-sm  font-averta-semibold  w-full cursor-pointer w-[120px]" onClick={() => setOpenFeedbackDialog(true)}>Reach Us</Link>
                    </div>
                    {!currentUser &&
                        <div className=" mt-2 lg:mt-4 pl-6 md:pl-10">
                            <Link className="text-zinc-500 dark:text-zinc-300 text-sm font-averta-semibold    w-full cursor-pointer w-[120px]" to="/u/login ">Sign In</Link>
                        </div>
                    }
                </div>

                <div className="pl-6 md:pl-10 mt-2 lg:mt-4 flex flex-row">
                    <Link className="text-zinc-500 dark:text-zinc-300 text-sm   w-full cursor-pointer w-[120px] font-averta-semibold" to="/privacypolicy">Privacy Policy</Link>


                </div>


                <div className="border-b border-gray-200 dark:border-zinc-700 mx-auto items-center flex mb-5 mt-5 dark:opacity-40"></div>

                <div className="grid grid-cols-3 justify-items-center px-2 mb-8">
                    <a href="https://twitter.com/alphyapp" className="cursor-pointer" target="_blank">
                        <TwitterIcon fontSize="small" className="text-[#ced4da]" />
                    </a>
                    <a href="mailto:support@alphy.app" className="cursor-pointer">
                        <EmailIcon fontSize="small" className="text-[#ced4da]" />
                    </a>
                    <div>
                        <a href="https://discord.gg/N4CkQhCVv2" target="_blank" >
                            <img src={DiscordIcon} className="mt-1" />
                        </a>
                    </div>
                </div>
            </div>

            <Dialog maxWidth={"md"} fullWidth={true} open={openFeedbackDialog} onClose={() => setOpenFeedbackDialog(false)}>
                <div className="dark:bg-mildDarkMode">
                    <FeedbackForm />
                </div>
            </Dialog>
        </div>
    )
}