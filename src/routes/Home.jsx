import React from 'react'
import Feed from '../components/WelcomeFeed'
import Welcome from "../components/Welcome"
import FeedMobile from '../components/WelcomeFeedMobile'
// import Trending from '../components/Trending'
import About from "../components/About"

function Home(props) {
    return (
        <div className="container mx-auto w-800">
            <Welcome />
            <div className='hidden md:block'>
                <Feed  />
            </div>
            <About />
        </div>
    )
}

export default Home
