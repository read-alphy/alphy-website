import React from 'react'
import Feed from '../components/WelcomeFeed'
import Welcome from "../components/Welcome"
import About from "../components/About"

function Home() {
    return (
        <div className="container mx-auto w-800">
            <Welcome />
            <Feed  />
            <About />
        </div>
    )
}

export default Home
