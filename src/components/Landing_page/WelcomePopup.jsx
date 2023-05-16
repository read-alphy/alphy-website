

export default function WelcomePopup(props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="fixed inset-0 bg-black opacity-80"></div>
            <div className="z-10 p-6 bg-white rounded-md shadow-lg w-full max-w-lg  px-5">
                <div className="flex flex-row w-full grid grid-cols-2">
                    <h1 className="text-2xl col-span-1 font-semibold mb-4">Welcome to Alphy! </h1>
                    <svg
                        width="16"
                        onClick={() => props.setShowMessage(false)}

                        className="cursor-pointer col-span-1 text-zinc-400 justify-end justify-self-end mt-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M6 18L18 6M6 6l12 12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </div>
                <p className="mb-2">We're thrilled to have you on board! Here are the benefits available for you:</p>
                <ul className="list-disc pl-5 mb-4">
                    <li className="pb-2">You can use our service on YouTube videos and Twitter Spaces. Just submit a link and we will notify you when the work is done.</li>
                    <li className="pb-2"><strong>Enjoy 2 hours of free transcription credits</strong>: To help you get started, we're giving you 2 hours of transcription credits for free!</li>
                    <li className="pb-2"><strong>Submission limits</strong>: Please note that there are some limits to content submission. To learn more about these limits, click <a href="/plans" className="text-zinc-200">here</a>.</li>
                    <li className="pb-2"><strong>Public workspace</strong>: All the work on Alphy is public, so feel free to browse, read, and ask questions. We're here to help and support your journey with Alphy.</li>
                </ul>
                <p className="mb-4">Once again, welcome to the Alphy community! We can't wait to see how our transcription services will enhance your online experience. Happy transcribing!</p>
                <div className="w-full mx-auto text-center">
                    <button onClick={() => props.setShowMessage(false)} className="bg-blueLike mt-4 hover:bg-slate-700 transition duration-200 ease-in text-white font-semibold py-2 px-4 rounded-full items-center mx-auto text-center">Get Started</button>
                </div>

            </div>
        </div>
    )
}