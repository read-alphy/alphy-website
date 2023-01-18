import React from 'react'
import Feed from '../components/WelcomeFeed'
import Trending from '../components/Trending'
import Welcome from "../components/Welcome"

function Home(props) {
    return (
        <div>
            <Welcome />
            <Feed data={props.data} />
        </div>
    )
}

export default Home