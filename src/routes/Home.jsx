import React from 'react'
import Feed from '../components/WelcomeFeed'
import Welcome from "../components/Welcome"
import FeedMobile from '../components/WelcomeFeedMobile'
// import Trending from '../components/Trending'

function Home(props) {
    return (
        <div>
            <Welcome />
            <div className='hidden lg:block'>
                <Feed data={props.data} />
            </div>

            <div className='block lg:hidden'>
                <FeedMobile data={props.data} />
            </div>
        </div>
    )
}

export default Home