
//import usestate
import React, { useState } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading';



export default function QuestionAnswering(source_id) {

    let displayLoading = "none"
    const [data, setData] = useState("");


    const [isLoadingInside, setIsLoadingInside] = useState(data.length === 0);
    const [answer, setAnswer] = useState(false)
    const [inputValue, setInputValue] = useState('');



    const dummy = "This text talks about the perception of time and how it is recorded in physics. Albert Einstein was the person who developed the concept that time is associated with one of four dimensions which make up spacetime, rather than being a universal parameter. Herman Minkowski noticed that Maxwell's equations work best if treated in this way, in which time and space can be rotated into each other, so as not to change the equations. Minkowski then proposed combining these two dimensions into a spacetime diagram, where a person's motion at a steady velocity traces a straight line tilted at a 45 degree angle, while no matter what direction one moves in space, they are only able to move forward in time. Ultimately, this reveals that time is simply a label for coordinates, and can be changed depending on how the axes are chosen."
    const fetchData = () => {

        try {

            displayLoading = "block"
            setIsLoadingInside(true);

            axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/summaries/youtube/${source_id.source_id}/question`, inputValue)
                .then(
                    response => {

                        console.log(response.data)
                        console.log(response.data.sources[0].text)
                        setData(response.data)
                        console.log(response.data.sources.map((source) => source.text).join("<br></br>"))
                        setInputValue('');
                    });
        } catch (error) {
            console.log(inputValue)
            displayLoading = "none"
            console.error(`Error fetching data: ${error}`);
        } finally {
            setIsLoadingInside(false);
        }
    };

    return (
        <div className="bg-gray-600 border-whiteLike border mt-20 rounded-2xl p-5 mb-20  mx-auto">

            <h1 className="text-xl pb-3 text-gray-300">Ask questions to the video.</h1>
            <p className="text-gray-400 pb-7">Navigate through the video by asking real questions and getting AI-generated acccurate answers. </p>

            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} type="text" id="search" className=" block w-full p-4 pl-10 text-sm text-whiteLike placeholder:text-zinc-90  placeholder:italic rounded-lg bg-gray-700 focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: How does X work? What are the best practices for taking notes?" autoComplete="off" required />
                <button onClick={fetchData} className="text-white absolute right-2.5 bottom-2.5 bg-slate-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Go</button>

            </div>

            {!isLoadingInside ?

                (<div

                    className="loading mt-10 mb-10"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '20vh',
                    }}
                >
                    <ReactLoading type="spinningBubbles" className="text-whiteLike" />
                </div>) : null
            }

            {data.length ?

                <div className="text-whiteLike pt-10 pb-10">

                    <div >
                        {/* <div className={`${data.length ? "block" : "hidden"}`}> */}
                        <div>

                            <div>
                                <h1 className="mb-1 text-xl">Answer</h1>

                            </div>
                            <button className={`cursor-pointer justify-end mt-10 mx-auto flex`} onClick={() => setAnswer(!answer)}>

                                <svg className={`${answer ? "hidden" : "block"} animate-bounce`} aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30px">
                                    <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" fillRule="evenodd"></path>
                                </svg>

                            </button>

                        </div>

                    </div>
                    {answer ?

                        (<div>
                            <div>


                                {data.sources.map((source) => <div>{source.text}</div>)}
                            </div>
                            <button className={`cursor-pointer  justify-end  mt-10 mx-auto flex`} onClick={() => setAnswer(!answer)}>

                                <svg className="animate-bounce" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30px">
                                    <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" fillRule="evenodd"></path>
                                </svg> </button> </div>

                        )

                        : (null)}

                </div> : null}


        </div>

    )
}