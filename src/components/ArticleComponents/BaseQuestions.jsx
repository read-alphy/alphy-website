import ReactMarkdown from "react-markdown";
import Markdown from "react-markdown";



export default function BaseQuestions({key_qa,data,  singleSource, areaRefs, handleCopyToClipboard, handleShareLink, handleLength, showSource, updateVariable, baseSources, collapseIndex, handleShowAllSources, handleBaseQAaccordion,formatAnswer ,DataArrayIcon}){


const oct31 = new Date('2023-10-31T00:00:00+00:00');
const added_ts = new Date(data.added_ts);



    return(
        <div>
            <p className="mb-5 underline text-l font-averta-semibold text-zinc-600 dark:text-zinc-300">
								{' '}
								Questions by Alphy
							</p>
							{Object.keys(key_qa).map((item, index) => (
								<div id="accordion-flush" data-active-classes="bg-white dark:bg-mildDarkMode text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
									<h2 id="accordion-flush-heading-1">
										<button onClick={(event) => handleBaseQAaccordion(event, index, item)} type="button" className="flex items-center justify-between w-full py-5 font-averta-semibold text-left text-zinc-700 border-b border-gray-200 dark:border-gray-700 dark:text-zinc-200 text-md sm:text-l	" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
											<span className="font-averta-semibold text-md">{item}</span>
											<svg data-accordion-icon className={`w-6 h-6 ${index === collapseIndex && collapseIndex !== -1 ? "rotate-180" : ""} shrink-0`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
										</button>
									</h2>
									<div className={index === collapseIndex && collapseIndex !== -1 ? "" : "hidden"} aria-labelledby="accordion-flush-heading-1">
										<div className="py-5 border-b border-gray-200 dark:border-gray-700">
											<div className="flex flex-row justify-end text-slate-400">

												<svg onClick={handleShareLink} className="cursor-pointer flex flex-row" width="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<title className="font-bold">Share link to question</title>
													<path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" strokeLinecap="round" strokeLinejoin="round"></path>
												</svg>
												<svg onClick={handleCopyToClipboard} className="cursor-pointer flex flex-row" width="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<title className="font-bold">Copy to clipboard</title>
													<path d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" strokeLinecap="round" strokeLinejoin="round"></path>
												</svg>
											</div>
											<div>
												<div className="answer-area text-zinc-700 dark:text-zinc-300 font-normal text-md sm:text-l">
													
{added_ts > oct31 ? 
														<div className=" font-averta-regular">
															
																{formatAnswer(key_qa[item].answer, key_qa[item])} 
															
														
                                                        </div>


			:

			<div>
				<ReactMarkdown>
				{key_qa[item].answer}
				</ReactMarkdown>
				</div>


														}
													
													
												</div>
											</div>
											<div>

                                               <button
                                                className={`cursor-pointer justify-end mt-10 flex flex-row bg-whiteLike hover:bg-zinc-100  transition duration-300 ease-in-out dark:bg-zinc-700 dark:hover:bg-zinc-600 px-2 py-2 rounded-lg`}
                                                onClick={handleShowAllSources}
                                            >
                                                <span className={` text-zinc-600 dark:text-zinc-200 text-md pr-1 font-averta-semibold`}>

                                              	  {(baseSources  && !singleSource)  ? "Hide sources": "See all sources" } <DataArrayIcon fontSize="sm"/>

                                                </span>
                
                </button>

												{baseSources ? (
													<div className="mt-10">
														<div className="">
															

									<div className=" ">
															{key_qa[item]
																? key_qa[item].sources.map((source, index) => (
																	<p ref={areaRefs.current[index]} className={`${(singleSource===true && showSource!== index+1) && "hidden"} font-bold border border-zinc-300 dark:border-zinc-600 rounded-lg p-5 drop-shadow-sm mb-5`}  key={index}>

																		{source.start !== null && source.start !== undefined && source.end ? (
																			window.innerWidth > 999 && data.source_type === "yt" ?
																				<a onClick={updateVariable} className="underline cursor-pointer">


																					{Math.floor(source.start / 3600) < 10 ? `0${Math.floor((source.start / 3600))}` : `${Math.floor((source.start / 3600))}`}
																					{":"}
																					{Math.floor(source.start / 60) < 10 ? `0${(Math.floor(source.start / 60))}` : Math.floor(source.start % 3600) < 600 ? `0${(Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60))}` : Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60)}
																					{":"}
																					{Math.floor(source.start % 60) < 10 ? `0${(Math.floor(source.start % 60))}` : (Math.floor(source.start % 60))}

																					{" - "}

																					{Math.floor(source.end / 3600) < 10 ? `0${Math.floor((source.end / 3600))}` : `${Math.floor((source.end / 3600))}`}
																					{":"}
																					{Math.floor(source.end / 60) < 10 ? `0${(Math.floor(source.end / 60))}` : Math.floor(source.end % 3600) < 600 ? `0${(Math.floor(source.end / 60 - (Math.floor(source.end / 3600)) * 60))}` : Math.floor(source.end / 60 - (Math.floor(source.end / 3600)) * 60)}
																					{":"}
																					{Math.floor(source.end % 60) < 10 ? `0${(Math.floor(source.end % 60))}` : (Math.floor(source.end % 60))}
																				</a> : <a target="_blank" href={data.source_type === "yt" ? `https://youtu.be/${data.source_id}?t=${Math.floor(source.start)}` : ""} className="underline">

																					{Math.floor(source.start / 3600) < 10 ? `0${Math.floor((source.start / 3600))}:` : `${Math.floor((source.start / 3600))}:`}{Math.floor(source.start / 60) < 10 ? `0${(Math.floor(source.start / 60))}` : (Math.floor(source.start / 60 - (Math.floor(source.start / 3600)) * 60))}:{Math.floor(source.start % 60) < 10 ? `0${(Math.floor(source.start % 60))}` : (Math.floor(source.start % 60))} - {Math.floor(source.end / 3600) < 10 ? `0${Math.floor((source.end / 3600))}:` : `${Math.floor((source.end / 3600))}:`}{Math.floor(source.end / 60) < 10 ? `0${(Math.floor(source.end / 60))}` : (Math.floor(source.end / 60 - Math.floor(source.end / 3600) * 60))}:{Math.floor(source.end % 60) < 10 ? `0${(Math.floor(source.end % 60))}` : (Math.floor(source.end % 60))}
																				</a>
																		) :
																			window.innerWidth > 999 && data.source_type === "yt" ?
																				<a onClick={updateVariable} className="underline cursor-pointer">00:00:00</a>
																				:
																				<a target="_blank" href={data.source_type === "yt" ? `https://youtu.be/${data.source_id}?t=0` : ""} className="underline">00:00:00</a>
																		}



																		<br /> <br /> 
																		
																		{
																		<p className="text-zinc-500 dark:text-zinc-400  font-normal" dangerouslySetInnerHTML={{__html:handleLength(source.text)}}/>

																		
																		}
																		

																	</p>
																))
																: null}
																</div>
														</div>
													
													</div>
												) : null}
											</div>


										</div>
									</div>
								</div>))}

							
						</div>
    )
}