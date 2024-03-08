
import Image from 'next/image'

export default function ValueCards(){



    return(
        <div className="mt-20 max-w-[1000px] 2xl:max-w-[1200px] px-6">
            {/* <h2 className="pb-10 text-4xl  text-center items-center flex justify-center">Features</h2> */}
            <h2 className="pb-10 text-3xl  text-center items-center flex justify-center md:justify-start text-slate-700 dark:text-zinc-300">Features</h2>
<div className="grid grid-row-1 md:grid-cols-2  2xl:grid-cols-3 gap-6 ">
       

            <div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
          <Image src="/educationIcons/Medal.svg" width={120} height={120} className="mx-auto "/> 
          <div className="flex flex-col pb-6">
          <p className="font-averta-semibold text-xl"> Transcribe with High Accuracy</p>
          <p className="font-light text-md mt-2">Turn any audio to text with industry-leading accuracy and the best transcription models on the market</p>
          {/* <Link className='underline mt-2'>See examples</Link> */}
          </div>
          </div>



          <div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
          <Image src="/educationIcons/Books.svg" width={120} height={120} className="mx-auto"/> 
          <div className="flex flex-col pb-6">
          <p className="font-averta-semibold text-xl">Upload Meetings, Lectures, or Any Recording</p>
          <p className="font-light text-md mt-2">Use Alphy to get the most out of your recordings. Transcribe, summarize, and turn them into brand new content</p>
          </div>
          </div>

          <div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
            <Image src="/educationIcons/Video.svg" width={120} height={120} className="mx-auto"/>    

            <div className="flex flex-col pb-6">
            <p className="font-averta-semibold text-xl">Use it on YouTube, Twitter Spaces, and Podcasts</p>
            <p className="font-light text-md mt-2">Turn the greatest online discussions to text and use Alphy to create new engaging material</p>
            </div>
          </div>

          <div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
            <Image src="/educationIcons/Textbook.svg" width={120} height={120} className="mx-auto mt-2"/>    

            <div className="flex flex-col pb-6">
            <p className="font-averta-semibold text-xl">Multiple Export Options (TXT and SRT)</p>
            <p className="font-light text-md mt-2">Download transcripts as plain text or subtitles ready to use in videos</p>
            </div>
          
            </div>

            
          <div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
          <Image src="/educationIcons/Globus.svg" width={120} height={120} className="mx-auto "/> 
          <div className="flex flex-col pb-6">
          <p className="font-averta-semibold text-xl"> Break Down Language Barriers</p>
          <p className="font-light text-md mt-2"> Submit content in over 40 languages and translate the output to any language you want</p>
          {/* <Link className='underline mt-2'>See examples</Link> */}
          </div>
          </div>

          <div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
            <Image src="/educationIcons/Physics.svg" width={120} height={120} className="mx-auto"/>    

            <div className="flex flex-col pb-6">
            <p className="font-averta-semibold text-xl">One Click Submission and Fast Processing</p>
            <p className="font-light text-md mt-2">Simply give a link or upload a file, and your file will be ready in matter of minutes</p>
            </div>
          
            </div>



    

          

        
</div>

<div className="flex flex-col mt-20">
<h2 className="pb-10 text-3xl  text-center items-center flex justify-center md:justify-start text-slate-700 dark:text-zinc-300">For Productivity</h2>
<div className="grid grid-row-1 md:grid-cols-2  2xl:grid-cols-3 gap-6 ">

<div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
          <Image src="/educationIcons/Alarm clock.svg" width={120} height={120} className="mx-auto "/> 
          <div className="flex flex-col pb-6">
          <p className="font-averta-semibold text-xl"> Save 95% Time with Powerful Summaries</p>
          <p className="font-light text-md mt-2">Read the key takeaways or chapterized summaries to distill essential information and get rid of the clutter</p>
          {/* <Link className='underline mt-2'>See examples</Link> */}
          </div>
          </div>


                                        
                <div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
          <Image src="/educationIcons/Communication.svg" width={120} height={120} className="mx-auto "/> 
          <div className="flex flex-col pb-6">
          <p className="font-averta-semibold text-xl"> Get Accurate Answers with Precise Timestamps </p>
          <p className="font-light text-md mt-2">Go through Alphy's curated questions or ask new ones to get AI-generated answers with timestamped sources</p>
          {/* <Link className='underline mt-2'>See examples</Link> */}
          </div>
          </div>




                <div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
          <Image src="/educationIcons/Student card.svg" width={120} height={120} className="mx-auto "/> 
          <div className="flex flex-col pb-6">
          <p className="font-averta-semibold text-xl">Build Custom AI Agents on Audio </p>
          <p className="font-light text-md mt-2"> Combine your uploads and online content and create a powerful AI agent ready to answer all your questions from the audio content you specify. </p>
          {/* <Link className='underline mt-2'>See examples</Link> */}
          </div>
          </div>



</div>
</div>
<div className="flex flex-col mt-20">
<h2 className="pb-10 text-3xl  text-center items-center flex justify-center md:justify-start text-slate-700 dark:text-zinc-300">For Creators</h2>
<div className="grid grid-row-1 md:grid-cols-2  2xl:grid-cols-3 gap-6 ">


<div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
          <Image src="/educationIcons/Pendilum.svg" width={120} height={120} className="mx-auto"/> 
          <div className="flex flex-col pb-6">
          <p className="font-averta-semibold text-xl">Turn Discussions to New Content</p>
          <p className="font-light text-md mt-2"> Use Alphy's Playground to turn conversations to Twitter threads, blog posts, newsletters, or any other easily accessible engaging content</p>
          {/* <Link className='underline mt-2'>See examples</Link> */}
          </div>


          </div>

        
<div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
          <Image src="/educationIcons/Presentation.svg" width={120} height={120} className="mx-auto"/> 
          <div className="flex flex-col pb-6">
          <p className="font-averta-semibold text-xl">Educational Material</p>
          <p className="font-light text-md mt-2"> Use Alphy to create interactive quizzes, actionable insights, and comprehensive learning materials. </p>
          {/* <Link className='underline mt-2'>See examples</Link> */}
          </div>

          
          </div>
          <div className="max-w-[400px] md:max-w-[350px] 3xl:max-w-[400px] rounded-xl border bg-slate-50 dark:bg-mildDarkMode drop-shadow-md dark:drop-shadow-none border-gray-300 dark:border-zinc-700  justify-center items-center mx-auto px-10 dark:hover:bg-zinc-800 hover:bg-slate-100 duration-300 ease-in-out transition-all">
          <Image src="/educationIcons/Rating.svg" width={120} height={120} className="mx-auto"/> 
          <div className="flex flex-col pb-6">
          <p className="font-averta-semibold text-xl">SEO & Copywriting & Research</p>
          <p className="font-light text-md mt-2"> Extract critical keywords from popular YouTube videos, ideate fresh video concepts or clips, and craft compelling narratives </p>
          {/* <Link className='underline mt-2'>See examples</Link> */}
          </div>

         
</div>
</div>
        </div>
        </div>
    )
}