import React, { useState } from 'react'
import Feed from "./Article_components/Feed"
import ArticleCreator from "./Article_components/ArticleCreator"
import { Link } from 'react-router-dom'
import Content from './Article_components/Content'
import ArrowLeft from "../img/arrow-left.svg"
import ArrowRight from "../img/arrow-right.svg"
import FeedBurgerMenu from './FeedBurgerMenu'


export default function Article(props) {
    const data = props.data
    //const sessionContext = useSessionContext()
    // const sessionContext = { userId: "123" }

    // const navigate = useNavigate("/sign-in")
    const [collapsed, setCollapsed] = useState(false);
    let buttonImage;
    
    if (collapsed === true) {
        buttonImage = ArrowRight
    }
    else {
        buttonImage = ArrowLeft
    }


    return (
        <div className="article">
            <div className="article-body">
                <div className="article-block-1">
                    <button className="menuToggler" onClick={() => setCollapsed(!collapsed)} >
                        <img src={buttonImage} alt={'toggle menu'}></img>
                    </button>

                    {collapsed ? (<div className='feed-burger-menu'>
                        <FeedBurgerMenu data={data} />
                    </div>) : (
                        <div className="not-collapsed-article-block-1">
                            <div className='feed-burger-menu'>
                                <FeedBurgerMenu data={data} />
                            </div>

                            <div className="user-feed">
                                <div className="create-article">
                                    <Link to="/article/new-article"><p>New +</p></Link>
                                </div>
                                <Feed data={data} />
                            </div>
                        </div>)}
                </div>
                <div className="article-block-2">
                    <ArticleCreator />
                    <Content />
                </div>
            </div>
        </div>
    )
}





