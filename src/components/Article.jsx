import React, { useEffect, useState } from 'react'
import { UserAuth } from "../context/AuthContext"
import Feed from "./Article_components/Feed"
import ArticleCreator from "./Article_components/ArticleCreator"
import { useParams } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom'
import Content from './Article_components/Content'
import FeedBurgerMenu from './FeedBurgerMenu'
import { useNavigate } from 'react-router-dom'
import SignIn from '../routes/SignIn'
import { useSessionContext } from "supertokens-auth-react/recipe/session";


export default function Article() {
    const sessionContext = useSessionContext()

    const [data, setData] = useState([])
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true"
    const navigate = useNavigate("/sign-in")
    const [collapsed, setCollapsed] = useState(true);
    const coinData = async () => {
        try {
            await axios.get(url)
                .then((response) => {
                    setData(response.data)
                })
            setLoading(true)
        } catch (error) {
            console.error(`ERROR:  ${error}`)
        }
    }
    useEffect(() => {
        coinData()
        setLoading(false)
    }, [url])

    return (
        <div className="article">

            {sessionContext.userId ? (
                <div className="article-body">
                    <div className="article-block-1">

                        <button className="menuToggler" onClick={() => setCollapsed(!collapsed)}>Toggle Menu</button>
                        {collapsed ? (<div className='feed-burger-menu'>
                            <FeedBurgerMenu data={data} />
                        </div>) : (<div className="user-feed">
                            <div className="create-article">

                                <Link to="/article/new-article"><p>New +</p></Link>
                            </div>
                            <Feed coins={data} />
                        </div>)}






                        <div className='feed-burger-menu'>
                            <FeedBurgerMenu data={data} />
                        </div>
                    </div>
                    <div className="article-block-2">
                        <ArticleCreator />
                        <Content />
                    </div>
                </div>

            ) : (
                <div>
                    <p> Sign In to continue!
                    </p>

                    <SignIn />
                </div>)}
        </div>
    )
}





