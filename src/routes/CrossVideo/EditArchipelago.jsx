import React, { useState } from 'react';
import {Button, Input, Textarea} from "@material-tailwind/react";
import FeedItem from '../../components/ArticleComponents/FeedTabs/FeedItem';
import SkeletonItem from '../../components/ArticleComponents/FeedTabs/SkeletonItem';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

import { useNavigate,useLocation, Link  } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import { set } from 'lodash';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';




export default function EditArchipelago({ archipelagoInfo,setArchipelagoInfo,archipelagoDescription ,tier, archipelagoTitle, setArchipelagoDescription, setArchipelagoTitle,sourceIDsArchipelago, setSourceIDsArchipelago, dataArchipelago, setDataArchipelago,errorMessage,credit, setCreditCalled}){
    const [inputValue, setInputValue] = useState("");

    

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(false);  
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [searched, setSearched] = useState(false);
    const [typing, setTyping] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate= useNavigate();
    const [initialCall, setInitialCall] = useState(true);
    const [editBasicInfo, setEditBasicInfo] = useState(false);
    const {currentUser} = useAuth();
    const location = useLocation();
    const [errorMessageSubmit, setErrorMessageSubmit] = useState("");
    const [submitInputValue, setSubmitInputValue] = useState("");
    const [prevLength, setPrevLength] = useState(0);
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstTime, setFirstTime] = useState(true);



    
    useEffect   (() => {
        
        if(currentUser!==null && archipelagoInfo!==undefined && currentUser.uid !== archipelagoInfo.user_id){
            /* if(location.state?.referrer !=="/"){
            navigate("/404")
            } */
            /* navigate("/404") */
        }

   
    })
    const getData = (offset, firstTime, hasMore) => {
    
        
		if (!hasMore) {
			return;
		}
		setIsLoading(true);
        if (/* inputValue.length>0 */ true) {
		axios
			.get(
				`${process.env.REACT_APP_API_URL || 'http://localhost:3001'
				}/sources/?q=${inputValue}&offset=${offset}&limit=${limit}`
			)
			.then((response) => {
            
				setHasMore(!(response.data.length < limit));
                
				if (firstTime) {
					setData(response.data);
				} else {
					setData([...data, ...response.data]);
				}
				setIsLoading(false);
			})
        }
        else{
            setData([])
            setIsLoading(false);
        }

	};
    const loadMore = () => {
			setOffset(offset + limit);
			getData(offset + limit, false, true);
    }
    const handleSubmit = (event, selectedOption) => {
		
        if(!(
            inputValue.includes('https://www.youtube.com/watch') ||
            inputValue.includes('https://youtu.be') ||
            inputValue.includes('https://m.youtube.com') ||
            inputValue.includes('https://twitter.com/i/spaces') ||
            inputValue.includes('https://www.youtube.com/live')
            )
        )
     {
        setInputValue('');
        setErrorMessageSubmit('Please provide a link to a YouTube video or Twitter Space.')
        setFailed(true)
        return;
    }
    else {
        let videoId
        let video_source
        //check if video already exists
        if (inputValue.includes('https://www.youtube.com')) {
            
            if(inputValue.includes('https://www.youtube.com/watch')){
            videoId = inputValue.split('/').pop().split('?v=')[1].split("&")[0];
            
            }
            else if(inputValue.includes('https://www.youtube.com/live') ){
                videoId = inputValue.split('/').pop().split("?")[0];
                
            }
            video_source = "yt"
            
        
    }

        else if (inputValue.includes('https://youtu.be')) {
            videoId = inputValue.split('/').pop().split("?")[0];
            video_source = "yt"

        }

        else if (inputValue.includes('https://m.youtube.com')) {
            videoId = inputValue.split('/').pop().split('?v=')[1].split("&")[0];
            video_source = "yt"

        }
        else if (inputValue.includes('https://twitter.com/i/spaces')) {
            if (tier==="basic" || tier==="premium"){
				videoId = inputValue.split('/').pop().split("?")[0];
				video_source = "sp"
				}
				else{
                    setFailed(true)
					setErrorMessageSubmit('Upgrade your plan to process Twitter Spaces. See Account page for more detail.');
					return;
				}
        }


        if (currentUser) {
            setLoading(true);
            // get id token
            currentUser.getIdToken().then((idToken) => {
                
            axios
                    .post(
                        `${process.env.REACT_APP_API_URL}/sources/`,
                        {
                            url: inputValue,
                        },
                        {
                            headers: {
                                'id-token': idToken,
                            },
                        },
                    )
                    .then((response) => {
                        setCreditCalled(false)
                        setErrorMessageSubmit("")
                        setLoading(false);
                        setFailed(false)
                        
                        setDataArchipelago([...dataArchipelago,response.data])
						setSourceIDsArchipelago([...sourceIDsArchipelago,response.data.source_id])
                        setInputValue('');
                        getData(0, true, true);
                        
                            /* navigate(`/${video_source}/${videoId}`) */

                    }).
                    catch((error) => {
                        if(errorMessageSubmit.length===0){
                      
                            setErrorMessageSubmit("There was an error submitting the form. Make sure you have enough credits for the submission and try again.")
                      
                }
                        setFailed(true)
                        setSubmitInputValue('');
                        setLoading(false);
                        throw error;
                    });
            });
        } else {
            // sign in
            // navigate('/auth');
            setErrorMessageSubmit('Please sign in to submit content.');
        }
    }
}





useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500); // delay of 500ms

    return () => clearTimeout(timer); // this will clear the timer if the user keeps typing before the 500ms has passed
  }, [inputValue]);


  useEffect(() => {
    if (searchQuery) {
      // Call the search API/function here. Your backend code goes here.
      // fetch(`api/search?query=${searchQuery}`)...
      getData(0, true, true);
    }
  }, [searchQuery]);

const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			getData(0, true, true);
		}
	};

     useEffect(() => {
        if (prevLength > 0 && inputValue.length === 0) {
          getData(0,true,true); // Call the provided function when the input value is empty
        }
        setPrevLength(inputValue.length);
    }, [inputValue, getData, prevLength]); //
 
    useEffect (() => {
        if(firstTime){
            getData(0, true, true);
            setFirstTime(false)
        }
    },[])

    return(
        <div className="px-4 sm:px-20 lg:px-0 lg:grid lg:grid-cols-5 lg:w-[70vw] lg:mt-10 ">
            <div className="col-span-2 flex justify-start  min-w-[300px]">
                <div className=" w-full min-w-[300px] ">
            <div className="flex  flex-col ">
            <div className="mt-10 lg:mt-0 ">
                <a className="text-zinc-700 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-400 duration-200  ease-in transition cursor-pointer"  href={`/arc/${archipelagoInfo.uid}`}>
                <KeyboardArrowLeftIcon fontSize="small" className=""/>
                <span className="text-sm">Go Back</span>
                </a></div>
            <div className=" flex flex-row w-full items-center">

            <div class="relative w-full min-w-[200px] h-12 mt-10 ">
            
                <p className="text-zinc-700 dark:text-zinc-300 mb-2 ml-1">Title</p>
            <input value={archipelagoTitle}
            placeholder="Set a title..."
							onChange={(event) => setArchipelagoTitle(event.target.value)} className="w-full text-l dark:bg-mildDarkMode px-2 h-[50px] bg-white border border-zinc-400 focus:border-greenColor focus:outline-none focus:ring-0 rounded-lg"/>
						 </div>
  
</div>  
<div className="w-full">
<p className="text-zinc-700 dark:text-zinc-300 mb-2 mt-16 ml-1">Description</p>
                <textarea className={`min-h-[120px] rounded-lg bg-white dark:bg-mildDarkMode border-zinc-400  resize-none text-sm w-full text-top focus:border-greenColor focus:outline-none focus:ring-0`} 
                value={archipelagoDescription}
                /* onClick={ () => setEditBasicInfo(true)} */
                placeholder="Set a description for your archipelago..."
                onBlur={() => setEditBasicInfo(false)}
                onChange={(event) => setArchipelagoDescription(event.target.value)}
                 >
                
				</textarea>
                </div>
            
                
                </div>
                <div class=" mt-10 mb-10 border-b border-zinc-300 dark:border-zinc-700 mx-auto items-center flex  dark:opacity-40"></div>
                <p className="mt-4 lg:mt-10 mb-2     text-zinc-700 dark:text-zinc-300 ml-1">Curate your knowledge hub</p>
                <p className="mt-2 mb-6 text-zinc-600 dark:text-zinc-400 ml-1 text-sm">Search by keyword or paste a link.</p>
                <div className="w-full grid grid-cols-5 lg:grid-cols-6 ">
				<div class="col-span-5 lg:col-span-6 relative w-full min-w-[200px] h-12">
                    
							<input 
							value={inputValue}
							onChange={(event) => setInputValue(event.target.value)}
							placeholder=" "
                            onKeyDown= {handleKeyDown}
							className="peer w-full  lg:w-full border-t-blue-gray-500 h-full bg-white dark:bg-mildDarkMode text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 dark:place-holder-shown:border-t-darkMode placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus:border-t-transparent dark:focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-500 dark:border-black dark:focus:border-r-greenColor  dark:focus:border-l-greenColor dark:focus:border-b-greenColor focus:border-greenColor pl-8">


                            </input>
                            <label class={`${inputValue.length===0 ? "pl-6": ""}  peer-focus:pl-0 text-zinc-400 flex w-full h-full select-none pointer-events-none absolute left-0 font-normal peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-greenColor before:border-blue-gray-200 dark:before:border-mildDarkMode dark:after:border-mildDarkMode peer-focus:before:!border-greenColor after:border-blue-gray-200 peer-focus:after:!border-greenColor`}>Search from our database...</label>
                        <div class="grid place-items-center absolute text-blue-gray-500 top-2/4 left-3 -translate-y-2/4 w-5 h-5">
                        <SearchIcon className="text-zinc-400" fontSize="small"/>
                        </div>
                          
							
                           
                        
						 </div>
                       {/*   <Button type="submit"
                         size="sm"
							onClick={(e) => {
								handleSubmit();
							}} className="col-span-1 ml-4 bg-greenColor dark:bg-greenColor dark:text-zinc-300 text-sm w-12 items-center text-center flex justify-center ">
                                <SearchIcon fontSize="small"/></Button> */}
                         </div>
<div className="archipelago-search max-h-[80vh] overflow-y-scroll mt-5">

{
        (inputValue.length>0) &&
        <p className="mt-2 mb-8 text-zinc-600 dark:text-zinc-300 flex flex-col text-sm"> 
                                                Can't find what you are looking for? Paste the link for the content above to process it first.
                                                </p>
}


                         {isLoading
								? data.length > 0
									? data
										.map((item, index) => <FeedItem  key={index} item={item} mainFeedInput={inputValue} fromArchipelago={"search"} dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago} sourceIDsArchipelago = {sourceIDsArchipelago} setSourceIDsArchipelago={setSourceIDsArchipelago}/>)
									: [...Array(10)].map((item, index) => <SkeletonItem key={index} />)
								: data.map((item, index) => <FeedItem key={index + 1000} item={item} fromArchipelago={"search"} dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago} sourceIDsArchipelago = {sourceIDsArchipelago} setSourceIDsArchipelago={setSourceIDsArchipelago} />)
                                }
                                {
                                    data.length==0 && 
                                    <div> 
                           

                                    </div>
                                }
						</div>
						{hasMore && (
							<div className="w-full flex justify-center">
								{
									<button
										className="justify-center flex text-blueLike dark:text-zinc-300 font-semibold underline pb-10"
										onClick={loadMore}
									>
										{'Load more'}
									</button>
								}
							</div>
						)}
                      {
                                  (inputValue.includes('https://www.youtube.com/watch') ||
                                    inputValue.includes('https://youtu.be') ||
                                    inputValue.includes('https://m.youtube.com') ||
                                    inputValue.includes('https://twitter.com/i/spaces') ||
                                    inputValue.includes('https://www.youtube.com/live'))
            
                                        &&

                                    <div>
                                
                                                         
                    <div className="flex-col flex mb-6 text-sm">
                        <div className="flex flex-row ">
                                <a href="/account" className="text-zinc-500 dark:text-zinc-400">
                                    {tier==="free" && "Starter Plan"}
                                    {tier==="basic" && "Basic Plan"}
                                    {tier==="premium" && "Premium Plan"}
                                    
                                    </a>
                                    <p className="ml-1 mr-1 text-zinc-500 dark:text-zinc-400"> - </p>
                                    <p className=" text-zinc-500 dark:text-zinc-400"> Remaining Credits : {Math.floor(credit)} minutes
                                    </p>
                        </div>
                                    {(tier==="basic"||tier==="premium") &&
                                           <div  className="mt-4 flex flex-row">
                                           <p className="text-zinc-500 dark:text-zinc-400 mr-2">Need more credits? </p> <Link 
                                           onClick={
                                               sessionStorage.setItem("creditPurchase", "true")
                                           }
                                           to="/account" className="text-green-300 font-semibold underline"  >Buy here.</Link>
                                           </div>              
                                    }
                        </div>
                                <Button size="sm" type="submit"
                                onClick={(e) => {
                                    handleSubmit();
                                }} className=" bg-green-300 dark:text-zinc-700 px-6 py-3 text-sm lg:text-[15px] normal-case">Submit</Button>
                                
                                {failed && 
                                    <div className="mx-auto mt-5 text-sm text-red-400 ml-2">
                                    {errorMessageSubmit}
                        </div>
                                     }
                                 </div>
            }


                    

                </div>
            </div>
            
            <div className="col-span-3 grid-row-2 flex justify-start  lg:p-10 drop-shadow-sm">


            



                <div className=" lg:border-l w-full lg:px-10 mx-auto lg:min-w-[550px]">
                <div class="lg:hidden border-t border-zinc-300 dark:border-zinc-700 mx-auto items-center flex mb-10 mt-10"></div>
                <p className="mt-10 lg:mt-5 ml-2 text-lg font-bold text-zinc-700 dark:text-zinc-300">{archipelagoTitle.length>0 ? archipelagoTitle:"Archipelago"}</p>
                {archipelagoDescription.length>0 && <p className="mt-2 ml-2 mb-5 text-md text-zinc-800 dark:text-zinc-200 opacity-80">{archipelagoDescription}</p>}
                {<p className="mt-4 ml-2 mb-5 text-md text-zinc-700 dark:text-zinc-300 opacity-80">Add or remove content to change the scope of your chat assistant.</p>}
                {errorMessage && dataArchipelago.length===0 && <p className="mt-4 ml-2 mb-5 text-md text-red-500 dark:text-red-400 opacity-80">An Arc cannot be empty. Please add an item to continue.</p>}

       
                {dataArchipelago.length > 0
									?  dataArchipelago
										.map((item, index) => <FeedItem  key={index} item={item} mainFeedInput={inputValue} fromArchipelago={"archipelago"} dataArchipelago={dataArchipelago} setDataArchipelago={setDataArchipelago} forCreationPool={true} sourceIDsArchipelago={sourceIDsArchipelago} setSourceIDsArchipelago={setSourceIDsArchipelago}/>
                                        )				
                                        :
                                       
                                        null
                }


</div>
                </div>
             
                

      


        </div>
        
    )

}