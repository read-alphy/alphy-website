
import React, { Fragment, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import HubFeedItem from "./HubFeedItemElements/HubFeedItem"
import Loading from '../../components/Loading';
import CuratedCarouselItem from '../../components/LandingPage/CuratedCarouselItem';
import AddIcon from '@mui/icons-material/Add';
import { set } from 'lodash';

export default function HubUserPage({currentUser,credit,hasActiveSub,userArchipelagos,setUserLayout, setGlobalLayout, setSubmitLayout, mainShow, setMainShow}){

    const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(false);
    const [inputValue, setInputValue] = useState('');
	const [hasMorePersonal, setHasMorePersonal] = useState(false);
	const [isLoadingPersonal, setIsLoadingPersonal] = useState(localStorage.getItem("logged in") ==="true" ? false : true);
	const [dataPersonal, setDataPersonal] = useState([]);
    const [offsetPersonal, setOffsetPersonal] = useState(0);
	const [called, setCalled] 	= useState(false);
	const [ready, setReady] = useState(false)
	const [hasMoreUploads, setHasMoreUploads] = useState(false);
	const [dataUploads, setDataUploads] = useState([]);
	const [isLoadingUploads, setIsLoadingUploads] = useState(true);
    const [offsetUploads, setOffsetUploads] = useState(0);
    const [showTab, setShowTab] = useState("myWorks")


	const [file, setFile] = useState(null)
	const [fileUploading, setFileUploading] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)
	const [myBookmarks, setMyBookmarks] = useState(false)
	const [offsetBookmarks, setOffsetBookmarks] = useState(0);
	const [hasMoreBookmarks, setHasMoreBookmarks] = useState(false);
	const [dataBookmarks, setDataBookmarks] = useState([]);
	const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(true);
	const [myWorks, setMyWorks] = useState(localStorage.getItem("logged in") ==="true" ? true : false);
	const [archipelagos, setArchipelagos] = useState(false)
	const [searchQuery, setSearchQuery] = useState("");
	const [searchMemory, setSearchMemory] = useState("")
    const [submitted, setSubmitted] = useState(false);

    


    const limit=1000
    let calledAndEmpty

    
    const searchInputRef = useRef(null);


    const getDataPersonal = (offsetPersonal, firstTimePersonal, hasMorePersonal) => {
		setIsLoadingPersonal(true)
		
		if (currentUser) {
			currentUser.getIdToken().then((idtoken) =>
				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/?q=${search}&offset=${offsetPersonal}&limit=${limit}&only_my=submits`, {
					headers: {
						'id-token': idtoken,
					}
				})
					.then((response) => {
						
						setHasMorePersonal(!(response.data.length < limit));

						if (response.data.length > 0) {
							calledAndEmpty = false
						}
						

						if (firstTimePersonal) {
							setDataPersonal(response.data);
                            
							
							
							


						} else {
							setDataPersonal([...dataPersonal, ...response.data]);
						}
						setIsLoadingPersonal(false);
					})).catch((error) => {
						setIsLoadingPersonal(false);


					});
		};
	};


	const getDataBookmarks = (offsetBookmarks, firstTime, hasMoreBookmarks) => {

		setIsLoadingBookmarks(true);
		if (currentUser) {
			setIsLoadingBookmarks(true)
			currentUser.getIdToken().then((idtoken) =>
				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/?q=${search}&offset=${offsetBookmarks}&limit=${limit}&only_my=bookmarks`, {
					headers: {
						'id-token': idtoken,
					}
				})
					.then((response) => {
						setHasMoreBookmarks(!(response.data.length < limit));

						if (response.data.length > 0) {
							calledAndEmpty = false
						}


						if (firstTime) {
							setDataBookmarks(response.data);


						} else {
							setDataBookmarks([...dataBookmarks, ...response.data]);
						}
						setIsLoadingBookmarks(false);
					})).catch((error) => {
						setIsLoadingBookmarks(false);


					});
		};
	};


	const getDataUploads = (offsetUploads, firstTimeUploads, hasMoreUploads) => {
	


		setIsLoadingUploads(true);

		localStorage.setItem("search", search)

		if (currentUser) {
			setIsLoadingUploads(true)
			currentUser.getIdToken().then((idtoken) =>

				axios.get(
					`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
					}/sources/${search.length > 0 ? `?q=${search}&` : "?"}limit=${limit}&offset=${offsetUploads}&only_my=uploads`, {
					headers: {
						'id-token': idtoken,
					}
				})
					.then((response) => {


						setHasMoreUploads(!(response.data.length < limit));


						if (firstTimeUploads) {
							setDataUploads(response.data);


						} else {
							setDataUploads([...dataUploads, ...response.data]);
						}
						setIsLoadingUploads(false);
					}))
		};
	};


    
    if(currentUser!==null && called===false){
        console.log("calling")

        getDataPersonal(0, true, hasMorePersonal);
        
        getDataBookmarks(0, true, hasMoreBookmarks);
        
        getDataUploads(0, true, hasMoreUploads);
        
        setCalled(true)
    }

    const loadMore = () => {	
			setOffsetPersonal(offsetPersonal + 10);
            if(offsetPersonal === limit){
			getDataPersonal(offsetPersonal + limit, false, true);
        }
	

	};

    function searchKeyword(array) {
		return array.filter(item =>
			item.title.toLowerCase().includes(search.toLowerCase())
            ||
            item.creator_name.toLowerCase().includes(search.toLowerCase())
		);
	}

    function handleHubNavigation(type) {
        if(type=="submit"){
        setUserLayout(false)
        setGlobalLayout(false)
        setSubmitLayout(true)
    }
    else if(type=="global"){
        setUserLayout(false)
        setGlobalLayout(true)
        setSubmitLayout(false)
    }
    }
    
    return(
        <div className="xl:max-w-[1200px] lg:ml-20">

        <p className="text-zinc-600 dark:text-zinc-300 text-xl xl:text-2xl">My Arcs</p>
            <div className="flex flex-row mt-10 ">  

            <a href="/arc/createArc" className="min-h-[360px] max-h-[360px] min-w-[240px] max-w-[240px] border border-2 bg-white dark:bg-mildDarkMode border-dashed dark:border-zinc-700   items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">

												<div >
													<AddIcon fontSize = "large" className="text-zinc-600 dark:text-zinc-300 mb-4 "/>
													<p className="text-zinc-600 dark:text-zinc-300 text-xl">Create An Arc</p>

												</div>


		    </a>        
                    {
                            userArchipelagos.length>0 &&
                            userArchipelagos.map((item,index)=> 
                            <div className="ml-5">
                                    <CuratedCarouselItem currentUser={currentUser} key={index} item={item} forFeed={true} expandedLayout={true}/>
                                    </div>
                                )
                        }
            </div>


                      {/*    
                        {currentUser ? 
                                                        <div>
                                                            
                                                                    <h1 className="text-md dark:text-zinc-300 text-zinc-600 mb-10 ">Account Details</h1>

                                                    <div className="grid grid-cols-3 mb-5">
                                                                    <div className="col-span-1 text-zinc-500 dark:text-zinc-400 text-sm">
                                                                        <p className="mb-2">Your Email</p>
                                                                        <p className="mb-2">Password</p>
                                                                        {credit!==null ?
                                                                        <p className="mt-2">Remaining Credits</p> :null
                                                                                }
                                                                                <p className="mt-2">Plan</p>
                                                                    </div> 
                                                        <div class="border-r border-gray-300 h-[10vh] col-span-1  mx-auto items-center flex"></div>
                                                                    <div className="col-span-1 text-black dark:text-zinc-200 text-sm">
                                                                        <p className="mb-2">{currentUser.email}</p>
                                                                        <a href="/u/resetpassword" className="mb-2 underline">Reset password</a>
                                                                        {credit!==null ?
                                                                        <p className="mt-2" >{Math.floor(credit)} minutes</p> :null
                                                                                }
                                                                                <p className="mt-2">{hasActiveSub ? "Premium" : "Basic"}</p>
                                                                    </div>
                                                    
                                                    </div>
                                                
                                        


                                                
                                                    </div>
                                                    :null} 
                                                    
                        */}



            
			{/* <form
						className="flex items-center pt-4 mb-10"
						
						onSubmit={(e) => {
							e.preventDefault();

						}}
					>
						<label htmlFor="voice-search" className="sr-only">
							Search
						</label>
						<div className="relative  ">


							<div class="relative h-11 ">
								<input
																	
									onChange={(e) => {
										setSearch(e.target.value);
									}}
									placeholder="Start searching..."
									className=" pl-10 peer md:min-w-[300px] xl:min-w-[500px] h-full border-zinc-500 bg-white dark:bg-darkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-400 placeholder-shown:border-t-blue-gray-400 border focus:border-2 text-sm px-3 py-2.5 rounded-[7px] dark:border-darkMode focus:border-blue-000 dark:focus:border-blue-000" />
								<div
						
						className="cursor-pointer absolute inset-y-0 left-0 flex items-center pl-3 "
					>

						<svg
							width="20"
							
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24 "
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap={'round'}
								strokeLinejoin={'round'}
								strokeWidth={'2'}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>

							</div>


						</div>

					
			</form> */}
				


        <div className="mb-20">
            <div className="flex flex-row mt-20">
              
                <p className="text-zinc-600 dark:text-zinc-300 text-xl mb-10">My Works</p>
            

                 {/*    <button onClick={()=>setShowTab("myBookmarks")} className="mb-4 ml-2">
                                My Bookmarks
                    </button>
 */}
                </div>

                
                    
                    <div>            
                    <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">

                            
                                            {dataPersonal.length>0 ?
                                                            searchKeyword(dataPersonal).map((item, index) => (
                                                                (index<offsetPersonal+10) &&
                                                                <HubFeedItem item={item} index={index} />
                                                            ))
                                            :

                                            (called ?


                                                <div className="text-zinc-600 dark:text-zinc-300 min-h-[20vh]">
                    
                                               
                                                      {/*   <div href="/arc/createArc" className="min-h-[240px] max-h-[240px] min-w-[180px] max-w-[180px] border border-2 bg-white dark:bg-mildDarkMode border-dashed dark:border-zinc-700  ml-5 items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">

                                                        <div >
                                                            <AddIcon fontSize = "large" className="text-zinc-600 dark:text-zinc-300 mb-4 "/>
                                                            <p className="text-zinc-600 dark:text-zinc-300 text-xl">Submit a link</p>

                                                        </div>


                                                        </div> */}

                                                        <div>
                                                        You don't have any submissions. Process your first online conversation <button className="underline dark:text-greenColor text-green-400 cursor-pointer" onClick={() => handleHubNavigation("submit")}>here.</button>
                                                        </div>
                                                        
                                                </div>
                                                :
                                                <Loading/>
                    
                                                )
                                            }
                                
                              
                                </div>
                        <div>
                                {offsetPersonal<dataPersonal.length && dataPersonal.length>10 && searchKeyword(dataPersonal).length>0 && (
                                                            <div className="w-full flex justify-center">
                                                                {
                                                                    <button
                                                                        className="justify-center flex text-blueLike dark:text-zinc-300 font-semibold  mt-10 underline"
                                                                        onClick={loadMore}
                                                                    >
                                                                        {'Load more'}
                                                                    </button>
                                                                }
                                                            </div>
                                                )}
                                </div>
           
                    </div>

                    
                
                
                </div>

      

<div className="min-h-[300px]">

        <div className="">
        <p className="text-zinc-600 dark:text-zinc-300 text-xl mb-10">My Bookmarks</p>
            <div>
            {dataBookmarks.length>0 ?
                        <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                                    {searchKeyword(dataBookmarks).map((item, index) => (
                                            (index<offsetBookmarks+10) &&
                                            <HubFeedItem item={item} index={index} />
                                        
                                    ))}
                                        </div>
                            :
                            (
                            called ?
                            <div className="text-zinc-600 dark:text-zinc-300 min-h-[20vh]">

                            You don't have any bookmarks. <a onClick={() => handleHubNavigation("global")} className="text-indigo-400 underline">Discover</a> the content other users unlocked with Alphy.

                            </div>
                            :
                            <Loading/>

                            )
                            }
                        


                    {/* 
                                            {offsetBookmarks < dataBookmarks.length && dataBookmarks.length>0 && searchKeyword(dataBookmarks).length>0 && hasMoreBookmarks && (
                                                    <div className="w-full flex justify-center">
                                                        {
                                                            <button
                                                                className="justify-center flex text-blueLike dark:text-zinc-300 font-semibold  mt-10 underline"
                                                                onClick={loadMore}
                                                            >
                                                                {'Load more'}
                                                            </button>
                                                        }
                                                    </div>
                                                )} */}


                            </div>
                        
         </div>
         </div>
        



        <div className="mt-20">
            <p className="mb-4">
            <p className="text-zinc-600 dark:text-zinc-300 text-xl mb-10">My Uploads</p>
            </p>
            {dataUploads.length>0 ?
                            <div className="grid grid-cols-4 xl:grid-cols-5">

                                
                                                    {searchKeyword(dataUploads).map((item, index) => (
                                                        <HubFeedItem item={item} index={index} />
                                                    ))}
                            </div>
                    :

                    (
                        called ?
                        <div className="text-zinc-600 dark:text-zinc-300 min-h-[20vh]">

                       {!hasActiveSub && called && 
                        
                        <p>You don't have any uploads. Upgrade to <a className="underline dark:text-greenColor text-green-400 cursor-pointer">premium plan</a> to process local files.
                        </p>}

                        {hasActiveSub && called && 
                        
                        <p>You don't have any uploads. <button onClick={() => handleHubNavigation("submit")} className="underline dark:text-greenColor text-green-400 cursor-pointer">Process your first file now!</button>
                        </p>}

                        </div>
                        :
                        <Loading/>

                        )

                    }
      
            </div>
            
        </div>
    )
}