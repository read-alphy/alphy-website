import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react'
import Feed from "./Article_components/Feed"
// import ArticleCreator from "./Article_components/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Content from './Article_components/Content'
import ArrowLeft from "../img/arrow-left.svg"
import ArrowRight from "../img/arrow-right.svg"
import FeedBurgerMenu from './FeedBurgerMenu'
import {animated} from 'react-spring'
import { useTransition } from 'react-spring'
import axios from 'axios'
import Loading from './Loading'
import { useWindowSize } from '../hooks/useWindowSize'
import { useSessionContext } from "supertokens-auth-react/recipe/session";



export default function Article({feedData, arrowDirection, setArrowDirection}) {
    const location = useLocation();
    const navigate = useNavigate();

    const sessionContext = useSessionContext();
    const [collapsed, setCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);   

    const handleClick = useCallback(async (id) => {
        const pathname = window.location.href.split("/")[4];
        if(id !== pathname){
            setIsLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/summaries/${id}`);
                setData(response.data);
                navigate(`/article/${id}`);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setIsLoading(false);
            }
        }
    }, [navigate]);

    useEffect(() => {
        const source_id = location.pathname.split("/")[2]
        const url = `${process.env.REACT_APP_API_URL}/summaries/${source_id}`
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setIsLoading(false);
            }
            };
        if(data.length === 0){
            fetchData();
            console.log('fetching data')
        }
        else{
            // console.log(data)
        }
      }, [location.pathname]);


    // const buttonImage = collapsed ? ArrowRight : ArrowLeft;
    const handleClick2 = () => {
        setArrowDirection(arrowDirection === "right" ? "left" : "right");
        setCollapsed(!collapsed);
      };
    
    
    //Memoize the feed component so it only re-renders if the data prop change
    const memoizedFeed = useMemo(() => <Feed data={feedData} onClick={handleClick}/>, [feedData]);


    return (
        <div className="article">
            <div className=" article-body">
                <div className="flex ml-5 mr-5 ">
                    <div className={`left-feed hidden lg:block ${collapsed ? 'collapsed' : ''}`}>
                        <div className="not-collapsed-article-block-1 ">
                            <div className="user-feed">
{/*                             <Link to="/article/new-article">
                  
                            <p>Submit a video for work</p>
                       
                             </Link> */}
                             
                                {memoizedFeed}
                            </div>
                        </div>
                    </div>
                        {arrowDirection === "left" ? 

                        <div className='fixed inset-x-0 top-0 z-50 h-full transition origin-top-right transform lg:hidden '>
                        <div className='rounded-lg rounded-t-none shadow-lg bg-sideColor'>
                            <div className='h-screen px-4 overflow-y-auto'>

                                <div className='flex items-center justify-end p-4 bg-sideColor'>
                                    <div className="cursor-pointer" onClick={()=>setArrowDirection("right")} >
                                        <i className="text-2xl text-white ri-close-line"></i>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div onClick={()=>setArrowDirection("right")} className="">
{/*                                          <Link to="/article/new-article">
                                              <div className="flex items-center justify-center w-full py-2 mb-4 text-xl font-semibold rounded-md shadow-md bg-mainText text-main">
                                                 <p>New +</p>
                                              </div>
                                         </Link> */}
                                         {memoizedFeed}
                                     </div>
                                </div>
                            </div>
                        </div>

                        </div>
                        :<></>
                        }


                    <button className='hidden top-20 lg:block ' onClick={handleClick2}>
                        <img
                            src={arrowDirection === "right" ? ArrowRight : ArrowLeft}
                            alt={`toggle ${arrowDirection} arrow`}
                            className={`arrow-${arrowDirection}`}
                        />
                    </button>
                    {/* <button className="menu-toggler" onClick={() => setCollapsed(!collapsed)} >
                        <img src={buttonImage} alt={'toggle menu'}></img>
                    </button> */}
                </div>
                <div className="px-4 mx-auto">
                    {isLoading ? <Loading /> : <Content data={data}/>}                    
                </div>
            </div>
        </div>
    )
}


// {collapsed
//     ? (
    
//     <div className='feed-burger-menu'>
//         {/* <FeedBurgerMenu data={memoizedFeed} /> */}
//     </div>
//     )
//     : (<div className="not-collapsed-article-block-1">
//         <div className='feed-burger-menu'>
//             {/* <FeedBurgerMenu data={memoizedFeed} /> */}
//         </div>

//         <div className="user-feed">
//             <div className="create-article">
//                 <Link to="/article/new-article"><p>New +</p></Link>
//             </div>
//             {memoizedFeed}
//         </div>
//     </div>)
// }
