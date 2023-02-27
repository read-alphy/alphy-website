
//import usestate
import React, { useState } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import toast, { Toaster } from 'react-hot-toast';


export default function QuestionAnswering(source_id, key_qa, data) {

    const sessionContext = useSessionContext()



    // console.log(source_id.source_id, source_id.key_qa)
    const dummy = {
        key_qa: {
            "What key elements does Michael Seibel identify as ensuring a successful startup? ": {
                "answer": "Michael Seibel identifies three key elements to ensure a successful startup: \n1. Hack your motivation - make sure that you are personally motivated to stay with the company even if it is not doing well or the idea is no longer popular. \n2. Be brave enough to walk alone - you need to be willing to do things differently than the people around you in order to succeed. \n3. Garbage in, garbage out - make sure that you are getting your insights from reliable sources and not just from what you read or see on social media. Don't rely on investors to invent the future - focus on building the company for your users and not for investors. Lastly, learn by doing - the best way to learn how to do startups is by actually doing them.",
                "sources": [
                    {
                        "text": "So, to summarize, when picking a problem you want to solve and a team you want to work with, hack your motivation. Make sure that you're actually going to stay motivated personally over the course of years, even if the company is not doing well, even if the idea doesn't look like it's part of a fad anymore. Two: be brave enough to walk alone. You're going to have to do things differently than the people around you to succeed, because the vast majority of the people around you are going to fail. Three: garbage in, garbage out. Where you get your insights. How do you feed your startup brain if you're feeding it with garbage? Your model for how startups work will be garbage and your startup won't work for investors. Don't invent the future. They're not as important as founders. So if you're spending your time just trying to figure out how to make investors happy, stop.",
                        "similarity": 0.8377334100983289
                    },
                    {
                        "text": "You've really got to reconsider how to hack your personal motivation so that you're going to survive the 10-year journey, generally the closer you feel to your users, the more you believe you're having an impact in their lives, and the closer you feel to your co-founders, and the more you don't want to let them down, the better success you're going to find over time. So, number one: how does the idea you choose, or the problem they choose to solve, hack your motivation? Number two: are you brave enough to walk alone in the dark? Excellence in startups is actually very different from excellence in other parts of life. So for most of you, you put yourself amongst the smart kids in middle school and you took good classes in high school. You got into good university.",
                        "similarity": 0.8321182737199322
                    },
                    {
                        "text": "We've put all this information, all of this information, a place called the startup school, and so if you just go to startupschoolorg, you can see tons of content that is good. Information is not garbage in. If you build your mental model of startups based on that content, you'll be doing better generally. And if you're building your mental model based off what you read or what you see tweeted, what you read on tech crunch, sorry, what you see tweeted, okay. My last major point: investors don't invent the future. Something happened in the last 15 years where investors became influencers and founders stopped building companies for their users and started building companies for investors. They started seeing investors as a gatekeeper. They started seeing investors as better able to determine what product they should build than the users who actually have a problem.",
                        "similarity": 0.8317926363965705
                    },
                    {
                        "text": "Once again, you're reaching for strategies that work in careers. Careers and startups are different. If you think about startups, literally, the number one thing that you can compare them to to be accurate would probably be sports like professional sports, because professional sports has the same ridiculously high level of failure, or the like music business trying to be a famous entertainer. So it turns out that in those types of jobs with such a high failure rate, the number one way that you actually learn to do something is by doing it. The number one way you learn how to do startups is by doing them. There aren't great prerequisites. What's funny about this is that you actually learn 10 times faster. When you're doing a startup, you have a gun to your head, your customers yelling at you: there's very little money in the bank.",
                        "similarity": 0.8258502534685439
                    }
                ]
            },
            "What advice does Seibel give for entrepreneurs looking for an investor?": {
                "answer": "Seibel advises entrepreneurs looking for an investor to think of them as service providers, providing cash as a service. He also advises to not try to push ideas that investors saw on Clubhouse or other platforms, and to not try to remove value from the company. He suggests that founders should have a strong vision for the future and that investors can be helpful conversation partners when dealing with big strategic questions or when there is information that the founder does not have. Lastly, he suggests that investors often have good networks and can introduce founders to operators with direct experience that they can learn from. He also advises to not limit oneself to the local pool of investors, but to look for investors in the global community.",
                "sources": [
                    {
                        "text": "Those will not hold your hand and show you how to build a billion dollar company. Nobody really knows how to build a billion dollar company. Everyone knows some information that can be helpful, but no one can guide you and walk you down the path, just like they're giving you directions to the local library. That doesn't exist. Also, you should think of investors like service providers and the service they provide is cash. You would never think that your lawyers are going to tell you what to do or how to make a product that millions people want. So you shouldn't think you're investors. In my experience, founders are the ones to change the world. Investors help a little bit, and so, if you don't have a strong vision for what the future should be, get one: help adopt an investor just because they think they're getting deal flow by marketing themselves online.",
                        "similarity": 0.8499401125985991
                    },
                    {
                        "text": "Not try to push you ideas, because they saw this happen on clubhouse the other day and other kinds of stupidity desperately not try to remove value from the company is probably the first thing that you should look for for an investor. I think the second thing that's helpful is they're a helpful conversation partner. They're a helpful conversation partner when you're dealing with a big strategic question. They're a helpful conversation partner when there's just information that you don't have that is well known within the investor community. They're a helpful conversation partner sometimes when things are looking down and you just want to talk to someone who's seen this game many times before. And then i think the third thing that investors often do is they often have good networks, and so they can often introduce you to operators who have direct experience that you can learn from.",
                        "similarity": 0.843081072847086
                    },
                    {
                        "text": "If you are thinking that the local pool of investors is the only pool of investors you access to, you're probably doing it wrong. More importantly, most of investors in the global community have a ton of money and know where to put it. So what i see time and time again is: if you actually go out and do something, investors will come to you. If you actually go out and launch something on product hunt and start getting customers, or launch something on hacker news and start getting customers, or get your thing out there and start to get customers, investors find you. But that's not the popular path. Everyone wants to be able to brag about the money they made, the money that they raise to their friends, and so they're out there all slinging decks with no products built and no customers. Slinging a deck with no product built and no customers is average. You have to be extraordinary to win.",
                        "similarity": 0.8395507971569628
                    },
                    {
                        "text": "My first thought when i'm talking to them is: i cannot wait for a great software engineering team to pitch me the same idea, because they're the ones who are actually going to figure it out. They're the ones who have the tools to figure it out. Okay, next question: let's see: how do you apply the mentality that investors are service writers in a pitch deck? Trying to court investors is part of the game sometimes you know. What's weird is that trying to court investors is way less part of the game than you probably understand it. One thing that's become painfully obvious during covid is that the investment community is global, and if you're pitching investors in your local community and you're not pitching the global community of investors, you're probably doing it wrong.",
                        "similarity": 0.8378414787845345
                    }
                ]
            }
        }
    }


    const [answerData, setAnswerData] = useState("");


    const [isLoadingInside, setIsLoadingInside] = useState(false);
    const [answer, setAnswer] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [showBaseQA, setShowBaseQA] = useState(false)
    const [baseSources, setBaseSources] = useState(false)
    const [baseQuestion, setBaseQuestion] = useState("")
    const [isCleared, setIsCleared] = useState(true)
    const [showUserQA, setShowUserQA] = useState(false)
    const [optionValue, setOptionValue] = useState("")
    const [signedInError, setSignedInError] = useState(false)



    const handleClear = () => {
        setIsCleared(true)
        setShowBaseQA(false)
        setShowUserQA(false)
        setInputValue("")
    }

    const handleBaseQA = (event) => {
        setIsCleared(false)
        setShowBaseQA(true)
        setInputValue(event.target.textContent)
        setBaseQuestion(event.target.textContent)
    }

    const handleOptionClear = () => {
        setShowBaseQA(false)
        setInputValue("")
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            fetchData();
        }
    }

    const handleClick = () => {
        if (showBaseQA) {
            setInputValue("")
        }

    }

    const fetchData = () => {
        toast.dismiss()
        setShowBaseQA(false)
        setShowUserQA(true)


        if (inputValue.length > 200) {
            toast('Your question is too long, please keep it under 200 characters.', {
                icon: '❗',
                style: {
                    background: "#F9F8F8"
                }

            });
            setInputValue('');
            return
        }
        else if (inputValue.length === 0) {
            toast('Please enter a question.', {
                icon: '❗',
                style: {
                    background: "#F9F8F8"
                }

            });
            setInputValue('');
            return
        }
        else {
            if (sessionContext.doesSessionExist) {
                try {
                    setIsLoadingInside(true);
                    setAnswer(false)
                    setAnswerData("")

                    axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/summaries/youtube/${source_id.source_id}/question`, inputValue)
                        .then(
                            response => {

                                setAnswerData(response.data)


                                setIsLoadingInside(false);
                            });
                } catch (error) {

                    console.error(`Error fetching data: ${error}`);
                    setIsLoadingInside(false);
                }
            }
            else {
                toast('You need to sign in to ask questions.', {
                    icon: '❗',
                    style: {
                        background: "#F9F8F8"
                    }

                });
                setInputValue('');
                setSignedInError(true)
            }
        }
    };

    return (
        <div className="bg-whiteLike drop-shadow-2xl border mt-20  rounded-2xl p-5 pb-20 mb-20  mx-auto">
            <div className='Md:pl-10 md:pr-10 pt-10'>
                <Toaster position="bottom-center" />
                <h1 className="text-xl pb-8 text-zinc-600">Ask real questions and get real answers.</h1>
                {/* <p className="text-zinc-600  pb-7">Navigate the content by asking real questions and getting AI-generated acccurate answers. </p> */}
                <div className="flex items-center">

                    {/*                     <select className=" p-5 rounded-lg w-3/6 mx-auto bg-zinc-100 z-10 inline-flex items-center py-4 px-4 text-md font-medium text-center text-zinc-500 placeholder:text-zinc-90  border border-zinc-200 placeholder:italic rounded-lg focus:outline-none">

                        <option onClick={handleOptionClear}> Questions we already answered</option>

                        {Object.keys(source_id.key_qa).map((item, index) =>
                            <option value={optionValue} key={index} onClick={handleBaseQA} class="font-sans cursor-pointer mt-2  text-md font-base text-gray-800 bg-gray100 border border-gray-200 rounded-lg">
                                {item}</option>
                        )
                        }


                    </select> */}

                    <div class="relative w-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>

                        <input value={inputValue} onClick={() => handleClick(true)} onChange={(event) => setInputValue(event.target.value)} onKeyDown={handleKeyDown} type="text" id="search" className={`block w-full p-4 pl-10 text-sm text-zinc-500 placeholder:text-zinc-90   ${signedInError && inputValue.length === 0 ? "border border-red-400" : "border border-zinc-200"} placeholder:italic rounded-lg bg-whiteLike focus:outline-none`} placeholder="Ask anything to the transcript..." autoComplete="off" required />
                        {inputValue.length > 0 ? <div onClick={handleClear} className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3 ">
                            <svg width="20" onClick={handleClear} className="cursor-pointer" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </div> : null}

                    </div>

                    <button type="submit" onClick={fetchData} class="p-3.5 ml-2 text-sm font-medium text-whiteLike bg-bordoLike rounded-md border border-zinc-600 hover:bg-zinc-700 focus:ring-4 focus:outline-none">

                        <span className="text-whiteLike text-l">Search</span>
                    </button>

                </div>
                {signedInError && inputValue.length === 0 ?
                    <div>
                        <span className="text-sm text-red-400">You need to sign in to ask questions.</span>
                    </div> : null
                }




                <div className="mt-20">

                    {isCleared ?

                        (<div><p className="mb-5 text-xl text-zinc-600"> Or check out the questions from the video that we already answered for you</p>
                            {Object.keys(source_id.key_qa).map((item, index) =>
                                <button key={index} onClick={handleBaseQA} class="font-sans mt-2 cursor-pointer px-5   py-3 text-md font-base text-zinc-600  bg-zinc-100 border border-gray-200 rounded-lg">{item}</button>
                            )
                            }
                        </div>)
                        :

                        (null)



                    }
                </div>
                {isLoadingInside && !showBaseQA ?

                    (<div

                        className="loading mt-10 mb-10"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '20vh',

                        }}
                    >
                        <ReactLoading type="spinningBubbles" color="#52525b" />
                    </div>) : (<div> </div>)
                }

                {answerData.length != 0 && !showBaseQA && showUserQA ?

                    (<div className="text-zinc-600 pb-10">

                        {answerData.answer ? (
                            <div>
                                <div>
                                    <h1 className="mb-4 text-xl">Answer from Alphy</h1>
                                    <p className="text-zinc-600">{answerData.answer}</p>
                                </div>


                                <button className={`cursor-pointer justify-end mt-10 mx-auto flex`} onClick={() => setAnswer(!answer)}>
                                    <span className={`${answer ? "hidden" : "block"} text-zinc-600 text-l pr-1`}>See sources from the video</span>
                                    <svg className={`${answer ? "hidden" : "block"} `} aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30px">
                                        <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" fillRule="evenodd"></path>
                                    </svg>

                                </button>

                                {answer ?

                                    (<div>
                                        <div>
                                            <h1 className="mb-4 text-xl"> Sources from the video</h1>

                                            {answerData.sources.map((source, index) =>

                                                <p key={index}>{source.text} <br /> <br /></p>)}
                                        </div>
                                        <button className={`cursor-pointer  justify-end  mt-10 mx-auto flex`} onClick={() => setAnswer(!answer)}>
                                            <span className={`${answer ? "block" : "hidden"} text-zinc-600 text-l pr-1`}>See less</span>
                                            <svg className="" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30px">
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

                {showBaseQA ?

                    (<div className="text-zinc-600 pb-10">

                        {


                            <div>
                                <div>
                                    <h1 className="mb-4 text-xl">Answer from Alphy</h1>
                                    <p className="text-zinc-600">{source_id.key_qa[baseQuestion].answer}</p>
                                </div>


                                <button className={`cursor-pointer justify-end mt-10 mx-auto flex`} onClick={() => setBaseSources(!baseSources)}>
                                    <span className={`${baseSources ? "hidden" : "block"} text-zinc-600 text-l pr-1`}>See sources from the video </span>
                                    <svg className={`${baseSources ? "hidden" : "block"} `} aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30px">
                                        <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" fillRule="evenodd"></path>
                                    </svg>

                                </button>

                                {baseSources ?

                                    (<div>
                                        <div>
                                            <h1 className="mb-4 text-xl"> Sources from the video</h1>

                                            {

                                                source_id.key_qa[baseQuestion] ? source_id.key_qa[baseQuestion].sources.map((source, index) =>
                                                    <p key={index}>{index + 1}. <br /> <br /> {source.text} <br /> <br /> </p>
                                                ) : null

                                            }
                                        </div>
                                        <button className={`cursor-pointer  justify-end  mt-10 mx-auto flex`} onClick={() => setBaseSources(!baseSources)}>
                                            <span className="text-zinc-600 text-l pr-1">See less</span>
                                            <svg className="" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30px">
                                                <path clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" fillRule="evenodd"></path>
                                            </svg> </button> </div>

                                    )

                                    : (null)}
                            </div>




                        }


                    </div>)

                    : (null)
                }


            </div>
        </div >

    )
}