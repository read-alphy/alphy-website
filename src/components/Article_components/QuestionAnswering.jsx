
//import usestate
import React, { useState } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import toast, { Toaster } from 'react-hot-toast';


export default function QuestionAnswering(source_id) {



    const sessionContext = useSessionContext()

    const [data, setData] = useState("");


    const [isLoadingInside, setIsLoadingInside] = useState(false);
    const [answer, setAnswer] = useState(false)
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    }


    const fetchData = () => {
        if (sessionContext.doesSessionExist) {
            try {
                setIsLoadingInside(true);
                setAnswer(false)
                setData("")


                axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/summaries/youtube/${source_id.source_id}/question`, inputValue)
                    .then(
                        response => {

                            setData(response.data)


                            setIsLoadingInside(false);
                        });
            } catch (error) {

                console.error(`Error fetching data: ${error}`);
                setIsLoadingInside(false);
            }
        }
        else {
            toast.error('Need to sign in to ask questions.');
            setInputValue('');
        }
    };

    return (
        <div className="bg-whiteLike drop-shadow-xl border mt-20  rounded-2xl p-5 pb-20 mb-20  mx-auto">

            <h1 className="text-xl pb-3 text-bordoLike">Ask questions to the video.</h1>
            <p className="text-bordoLike  pb-7">Navigate through the video by asking real questions and getting AI-generated acccurate answers. </p>
            <div className="flex items-center">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleKeyDown} type="text" id="search" className=" block w-full p-4 pl-10 text-sm text-bordoLike placeholder:text-zinc-90  border border-zinc-200 placeholder:italic rounded-lg bg-whiteLike focus:ring-zinc-200 focus:border-zinc-300" placeholder="Ex: How does X work? What are the best practices for taking notes?" autoComplete="off" required />
                </div>
                <button type="submit" onClick={fetchData} class="p-3.5 ml-2 text-sm font-medium text-whiteLike bg-green-300 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-whiteLike ">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span class="sr-only">Search</span>
                </button>
            </div>
            <Toaster />
            {isLoadingInside ?

                (<div

                    className="loading mt-10 mb-10"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '20vh',
                    }}
                >
                    <ReactLoading type="spinningBubbles" className="text-bordoLike" />
                </div>) : (<div> </div>)
            }

            {data.length != 0 ?

                (<div className="text-whiteLike pt-10 pb-10">

                    {data.answer ? (
                        <div>
                            <div>
                                <h1 className="mb-4 text-xl">Answer</h1>
                                <p className="text-whiteLike">{data.answer}</p>
                            </div>


                            <button className={`cursor-pointer justify-end mt-10 mx-auto flex`} onClick={() => setAnswer(!answer)}>

                                <svg className={`${answer ? "hidden" : "block"} animate-bounce`} aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30px">
                                    <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" fillRule="evenodd"></path>
                                </svg>

                            </button>

                            {answer ?

                                (<div>
                                    <div>
                                        <h1 className="mb-4 text-xl"> Sources </h1>

                                        {data.sources.map((source, index) =>

                                            <p key={index}>{source.text} <br /> <br /></p>)}
                                    </div>
                                    <button className={`cursor-pointer  justify-end  mt-10 mx-auto flex`} onClick={() => setAnswer(!answer)}>

                                        <svg className="animate-bounce" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30px">
                                            <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" fillRule="evenodd"></path>
                                        </svg> </button> </div>

                                )

                                : (null)}
                        </div>)


                        :

                        (<div>
                            <p className="text-whiteLike flex mx-auto justify-center  text-xl">It seems like the content doesn't have an answer for this query. Try another one!</p>
                        </div>)

                    }


                </div>)

                : (null)
            }


        </div >

    )
}