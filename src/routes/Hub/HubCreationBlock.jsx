import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChatIcon from '@mui/icons-material/Chat';

export default function HubCreationBlock(){


    return(
        <div className="mt-10">
            <p className="px-10 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-green-400 text-xl mb-10 font-bold">
                Welcome to your action hub!
            </p>

            <div className="flex flex-row gap-20 w-full px-10">
                <div className="border border-zinc-300 bg-white dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-sm hover:drop-shadow-lg hover:cursor-pointer w-[250px] transform hover:scale-105 transition duration-500 ease-in-out">
                    <div className="flex flex-col items-center mx-auto px-5 pt-5  ">
                       <p className="text-emerald-300 text-lg font-semibold "> Submit a Link

                       </p>
                       <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-5">
                        Submit a link to a YouTube video or Twitter Spaces to process it with Alphy.
                       </p>
                       <div className="flex-row flex mt-5">
                            <YouTubeIcon fontSize="large" className="text-emerald-200"/>
                            <TwitterIcon fontSize="large" className="text-emerald-200"/>
                       </div>
                       <button className="mt-5 px-5 py-2 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200 rounded-md text-white mb-5">
                        Submit
                       </button>
                    </div>
                </div>
                <div className="border border-zinc-300 bg-white dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-sm hover:drop-shadow-lg hover:cursor-pointer  w-[250px] transform hover:scale-105 transition duration-500 ease-in-out">
                    <div className="flex flex-col items-center mx-auto px-5 pt-5  ">
                         <p className="text-indigo-400 text-lg font-semibold">
                                Upload a Recording
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-5">
                            Import an audio file from your device to transcribe, summarize, and question.
                            </p>
                                <CloudUploadIcon fontSize="large" className="text-indigo-300 mt-5"/>
                                <button className="mt-5 px-5 py-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 mb-5 rounded-md text-white"
                    >
                        Upload
                          </button>
                    </div>

                </div>
                <div className="border border-zinc-300 bg-white dark:bg-mildDarkMode dark:border-zinc-600 rounded-md drop-shadow-sm hover:drop-shadow-lg hover:cursor-pointer  w-[250px] transform hover:scale-105 transition duration-500 ease-in-out">
                    <div className="flex flex-col items-center mx-auto px-5 pt-5  ">
                    <p className="text-red-300 text-lg font-semibold">
                            Create an Arc
                            </p>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-5">
                        Create a customizable search engine on multiple audiovisual content.
                        </p>
                            <ChatIcon fontSize="large" className="text-yellow-300 mt-5"/>
                            <button className="mt-5 px-5 py-2 bg-gradient-to-b from-red-200 via-red-300 to-yellow-200 mb-5 rounded-md text-white"
                >
                    Create
                        </button>
                        </div>
                </div>
            </div>
        </div>
    )

}