



export default function About() {

    return (
        <div className="mx-auto w-800 flex justify-center text-blueLike bg-slate-100">

            <div id="about" className="px-4 container w-5/6 max-w-4xl pt-20 pb-20 text-l lg:text-l">
                <br></br><br></br>
                <h1 className="text-4xl  font-semibold">About


                </h1>
                <br></br>

                <h2 className="lg:text-xl  font-semibold"> What is Alphy?</h2>
                <br></br>
                <p> Alphy transcribes and summarizes audio-based content and offers semantic research on the transcript, which means you can ask real questions and get real answers. It aims to help users meaningfully interact with the speech-based information on the Internet with the help of artificial intelligence.
                </p>
                <br></br>
                <br></br>
                <h2 className="lg:text-xl  font-semibold"> What can I do with Alphy?</h2>
                <br></br>
                <p>• You can do semantic research on the video transcript, meaning that you can ask questions or search for a specific topic and get real answers.

                    <br></br><br></br>• You can get a detailed summary of the content as well as a TL:DR version of that summary that lays out the key takeaways of the video.

                    <br></br><br></br>• YouTube and Twitter don't provide the best auto-generated transcripts. You can get a decent transcript with Alphy.</p>
                <br></br>
                <br></br>
                <h1 className="text-2xl  font-semibold">Quick info about the product:</h1>
                <br></br>
                <p>• You make a work request by signing in and submitting a YouTube video or Twitter Spaces link to Alphy.
                    <br></br>
                    {/*                     <br></br>
                    • There is a limit on the number of submissions you can make a day to decrease the bloat.
                    <br></br> */}
                    <br></br>
                    • Currently, Alphy only supports English. We are working on supporting other languages.
                    <br></br>
                    <br></br>
                    • Transcription process may take some time. We will notify you via email when your work is ready.

                    <br></br>
                    <br></br>
                    • Once a video is processed, it is public. You can read it all you want without signing in.
                    <br ></br>
                    <br></br>
                    • If you see a video that has a really bad transcription (wrong language, missing punctuations, etc.), please ping us via the socials we shared at the bottom of the nextPage.</p>
                <br></br>
                <br></br>

            </div>
        </div>
    )


}