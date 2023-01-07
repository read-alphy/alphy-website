import React from 'react'
import Coins from '../components/Coins'
import Trending from '../components/Trending'
import Welcome from "../components/Welcome"

function Home(props) {
    return (
        <div>
            <Welcome />
            <Coins coins={props.coins} />
        </div>
    )
}

export default Home