
import React, { Fragment, useState, useRef, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import HubFeedItem from "./HubFeedItemElements/HubFeedItem"
import Loading from '../../components/Loading';
import CuratedCarouselItem from '../../components/LandingPage/CuratedCarouselItem';
import AddIcon from '@mui/icons-material/Add';
import { set } from 'lodash';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ChatIcon from '@mui/icons-material/Chat';
import LinkIcon from '@mui/icons-material/Link';
import { API_URL } from '../../constants';


export default function HubUserPage({currentUser,credit,tier,userArchipelagos,setUserLayout, setGlobalLayout, setSubmitLayout, mainShow, setMainShow, collapsed, setCollapsed}){
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

    
    const carouselRef = useRef(null);
    const rightButtonRef = useRef(null);
    const leftButtonRef = useRef(null);
    const [isForwardArrowVisible, setIsForwardArrowVisible] = useState(true);
    const [isBackwardArrowVisible, setIsBackwardArrowVisible] = useState(false);
    let shuffledData = []
    let limit = 16
    let calledAndEmpty

    
    const searchInputRef = useRef(null);


    const getDataPersonal = (offsetPersonal, firstTimePersonal, hasMorePersonal) => {
		setIsLoadingPersonal(true)
		
		if (currentUser) {
			currentUser.getIdToken().then((idtoken) =>{
                const params = {
                    offset: offsetPersonal,
                    limit,
                    only_my: "submits"
                }
                // if (search !== "") {
                //     params.q = search
                // }
				axios.get(
					`${API_URL}/sources/`, {
                        params,
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
					})}).catch((error) => {
						setIsLoadingPersonal(false);
					});
		};
	};

	const getDataBookmarks = (offsetBookmarks, firstTime, hasMoreBookmarks) => {

		setIsLoadingBookmarks(true);
		if (currentUser) {
			setIsLoadingBookmarks(true)
			currentUser.getIdToken().then((idtoken) => {
                const params = {
                    offset: offsetBookmarks,
                    limit,
                    only_my: "bookmarks"
                }
                // if (search !== "") {
                //     params.q = search
                // }
            axios.get(
                `${API_URL}/sources/`, {
                    params,
                    headers: {
                        'id-token': idtoken,
                    }
                }).then((response) => {
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
					})}).catch((error) => {
						setIsLoadingBookmarks(false);
					});
		};
	};

	const getDataUploads = (offsetUploads, firstTimeUploads, hasMoreUploads) => {
		setIsLoadingUploads(true);

		localStorage.setItem("search", search)

		if (currentUser) {
			setIsLoadingUploads(true)
			currentUser.getIdToken().then((idtoken) =>{
                const params = {
                    offset: offsetUploads,
                    limit,
                    only_my: "uploads"
                }
                // if (search !== "") {
                //     params.q = search
                // }
				axios.get(
                    `${API_URL}/sources/`, {
                        params,
                        headers: {
                            'id-token': idtoken,
                        }
                    }
				).then((response) => {
						setHasMoreUploads(!(response.data.length < limit));
						if (firstTimeUploads) {
							setDataUploads(response.data);
						} else {
							setDataUploads([...dataUploads, ...response.data]);
						}
						setIsLoadingUploads(false);
					})})
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

   

  
    useEffect(() => {
        const handleScroll = () => {
          if (carouselRef.current) {
            const container = carouselRef.current;
            const isScrollEnd = container.scrollLeft + container.clientWidth === container.scrollWidth;
            setIsForwardArrowVisible(!isScrollEnd);
            setIsBackwardArrowVisible(container.scrollLeft > 0);

    
          }
        };
    
        // Attach scroll event listener
        if (carouselRef.current) {
          carouselRef.current.addEventListener('scroll', handleScroll);
        }

        // Clean up the event listener on component unmount
        return () => {
          if (carouselRef.current) {
            carouselRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      }, []);
    
      const scrollForward = () => {
        if (carouselRef.current) {
            const container = carouselRef.current;
          
   
            
            
            const scrollAmount = 300; 

          carouselRef.current.scrollLeft += scrollAmount;
        }
      };
    
      const scrollBackward = () => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            
            const scrollAmount =  300; 
          carouselRef.current.scrollLeft -= scrollAmount;
        }
      };



    
    return(
        <div className="xl:max-w-[1200px] lg:ml-20 pt-20 p-4 md:ml-5 sm:pl-10">

            
                        
              {currentUser &&   <p className="text-2xl text-zinc-600 dark:text-zinc-300 font-sans font-semibold">
                    
                    Welcome to Your Hub!
                </p>
                }

            {currentUser ? 
<div className="mt-10">
        <p className="text-zinc-600 dark:text-zinc-300 text-xl ">Arcs</p>
            <div className="flex flex-row mt-10 ">  

           
            
                    

                                <div className="xl:min-w-[1200px]  xl:max-w-[1200px]">				

											

								
									<div className="w-full">
									

                                                                <div className="w-full h-full container  lg:max-w-[620px] xl:max-w-[840px] 2xl:max-w-[1000px]  ">

                                                                    <div className="relative ">
                                                                    {userArchipelagos.length>0 &&
                                                                    <button onClick={scrollBackward} ref = {leftButtonRef} type="button" className={`left-arrow absolute top-0 left-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
                                                                            isBackwardArrowVisible ? '' : 'hidden'
                                                                            }`}>
                                                                            <div className="rounded-full bg-zinc-200 bg-opacity-40 p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                                                                                        <ArrowBackIosNewIcon className="cursor-pointer text-zinc-600 p-1 " />
                                                                                        </div>
                                                                            </button>
                                                                            }
                                                                    <div className={`grid grid-cols-2 xsSm:grid-cols-3 sm:gap-6 ${collapsed ? "sm:grid-cols-3" : "sm:grid-cols-2"}  lg:flex md:grid-cols-2 lg:flex-row lg:grid-cols-none gap-4 overflow-x-scroll scroll-smooth carousel-area md:min-h-[400px]`} ref={carouselRef}>
                                                                    <Link to="/arc/createArc" className="mt-2 ml-2 drop-shadow-lg min-h-[150px] max-h-[150px] min-w-[150px] max-w-[150px]  md:min-h-[360px] md:max-h-[360px] md:min-w-[240px] md:max-w-[240px] border border-2 bg-white dark:bg-mildDarkMode border dark:border-zinc-700  items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">

                                                                    <div >
                                                                        <AddIcon fontSize = "large" className="text-zinc-600 dark:text-zinc-300 mb-4 "/>
                                                                        <p className="text-zinc-600 dark:text-zinc-300 text-l md:text-xl">Create An Arc</p>
                                                                        <p className="text-zinc-600 dark:text-zinc-500 hidden md:block text-sm px-5">Connect multiple audio content with AI.</p>

                                                                    </div>


                                                                    </Link>
                                                                
                                                                {
                                                                    userArchipelagos.map((item, index) => (
                                                                        <div className="mt-2">
                                                                        <CuratedCarouselItem currentUser={currentUser} key={index} item={item} forFeed={true} expandedLayout={true}/>
                                                                        </div>
                                                                        ))}
                                                                        
                                                                            </div>

                                                                            {userArchipelagos.length>0 &&
                                                                        <button onClick={scrollForward} ref={rightButtonRef} type="button" className={`right-arrow absolute top-0 right-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
                                                                            isForwardArrowVisible ? 'hidden lg:block' : 'hidden'
                                                                            }`}>
                                                                            <div className="rounded-full bg-zinc-200 bg-opacity-40 p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                                                                                        <ArrowForwardIosIcon className="cursor-pointer text-zinc-600 p-1 " />
                                                                                        </div>
                                                                            </button>
                                                                            }
                                                                            </div>
                                                                        </div>

									

										
									</div>



							

								</div>
                       
            </div>


                   
    <div className="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-10 mb-10" ></div>

        <div className="mb-20">
            <div className="flex flex-row mt-20">
              
                <p className="text-zinc-600 dark:text-zinc-300 text-xl mb-10">Submissions</p>
            

                 {/*    <button onClick={()=>setShowTab("myBookmarks")} className="mb-4 ml-2">
                                My Bookmarks
                    </button>
 */}
                </div>

                
                    
                    <div>            
                    <div className={`grid grid-cols-1 xs:grid-cols-2 ${collapsed ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"} xl:grid-cols-4 2xl:grid-cols-5`} >
                    
                    {dataPersonal.length>0 &&
                    <Link to="/submit" onClick={() => {
                        localStorage.setItem("newItem", "link")
                    }}className="md:mt-2 drop-shadow-lg  mb-6 xs:mb-0 ml-2 xs:ml-0 min-w-[320px] max-w-[320px]  xs:min-w-[100px] xs:max-w-[200px]    h-[140px] xs:min-h-none xs:max-h-none border border-2 bg-white dark:bg-mildDarkMode border dark:border-zinc-700 items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">

                        <div >
                            <LinkIcon fontSize = "medium" className="text-zinc-600 dark:text-zinc-300 mb-4 "/>
                            <p className="text-zinc-600 dark:text-zinc-300 text-md md:text-l">Submit A Link</p>
                            

                        </div>


</Link>
                            }
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
                                                        You don't have any submissions. Process your first online conversation <Link to="/submit" className="underline dark:text-greenColor text-green-400 cursor-pointer" onClick={() => {
                                                            localStorage.setItem("newItem", "link")
                                                        }}>here.</Link>
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

            <div className="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-10 mb-10" ></div>

<div className="min-h-[300px]">

        <div className="">
        <p className="text-zinc-600 dark:text-zinc-300 text-xl mb-10">Bookmarks</p>
            <div>
            {dataBookmarks.length>0 ?
                         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                                    {searchKeyword(dataBookmarks).map((item, index) => (
                                            (index<offsetBookmarks+10) &&
                                            <HubFeedItem item={item} index={index} myBookmarks={true} currentUser={currentUser}/>
                                        
                                    ))}
                                        </div>
                            :
                            (
                            called ?
                            <div className="text-zinc-600 dark:text-zinc-300 min-h-[20vh]">

                            You don't have any bookmarks. <Link to="/" className="text-indigo-400 underline cursor-pointer">Discover</Link> the content other users unlocked with Alphy.

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
        

         <div className="border-b border-zinc-300 dark:border-zinc-600 mx-auto items-center flex mt-10 mb-10" ></div>


        <div className="mt-20">
            <p className="mb-4">
            <p className="text-zinc-600 dark:text-zinc-300 text-xl mb-10">Uploads</p>
            </p>
            {
           
}
            {dataUploads.length>0 ?
                             <div className={`grid grid-cols-1  xs:grid-cols-2 ${collapsed ? " md:grid-cols-2 lg:grid-cols-3" : "mg:grid-cols-2 lg:grid-cols-2"}  xl:grid-cols-4 pl-4`} >

                                    <Link to="/submit" onClick={() => {
                                                            localStorage.setItem("newItem", "upload")
                                                        }}className="drop-shadow-lg  mb-4 xs:mb-0  xs:ml-0 min-w-[320px] max-w-[320px]  xs:min-w-[100px] xs:max-w-[200px] h-[140px]  border border-2 bg-white dark:bg-mildDarkMode  border dark:border-zinc-700 items-center justify-center text-center flex cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">

                                    <div >
                                        <CloudUploadIcon fontSize = "medium" className="text-zinc-600 dark:text-zinc-400 mb-4 "/>
                                        <p className="text-zinc-600 dark:text-zinc-300 text-md md:text-l ">Upload A Recording</p>
                                        

                                    </div>


                                    </Link>
                                                    {searchKeyword(dataUploads).map((item, index) => (
                                                        <HubFeedItem item={item} index={index} />
                                                    ))}
                            </div>
                    :

                    (
                        called ?
                        <div className="text-zinc-600 dark:text-zinc-300 min-h-[20vh]">

                       {tier==="free" && called && 
                        
                        <p>You don't have any uploads. Upgrade to <Link to="/account" className="underline dark:text-greenColor text-green-400 cursor-pointer">premium plan</Link> to process local files.
                        </p>}

                        {tier!=="free" && called && 
                        
                        <p>You don't have any uploads. <Link to={"/submit"} onClick={() => {
                            localStorage.setItem("newItem", "upload")
                        }} className="underline dark:text-greenColor text-green-400 cursor-pointer">Process your first file now!</Link>
                        </p>}

                        </div>
                        :
                        <Loading/>

                        )

                    }
      
            </div>
            </div>
            :
            <div>
                  <button onClick={() => handleHubNavigation("global")} className="text-zinc-700 dark:text-zinc-300 text-lg mt-20 cursor-pointer">
							<KeyboardArrowLeftIcon fontSize="small" className=""/>
							<span className="text-sm">Go Back</span>
            </button>
            <div className="text-xl text-zinc-700 dark:text-zinc-300 mx-auto mt-20">
					 <a href="/u/login" className="dark:text-greenColor text-green-400 underline">Sign in</a> or <a href="/u/register" className="dark:text-greenColor text-green-400 underline"> create an account</a> to access this page. 
			</div>
            </div>
}
        </div>
       
    )
}