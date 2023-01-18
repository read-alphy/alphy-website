import React from 'react'
import Feed from '../components/WelcomeFeed'
import Welcome from "../components/Welcome"
// import Trending from '../components/Trending'

function Home(props) {
    return (
        <div>
            <Welcome />
            <Feed data={props.data} />
        </div>
    )
}

export default Home