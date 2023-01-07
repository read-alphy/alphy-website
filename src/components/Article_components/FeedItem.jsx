import React, { useState, useEffect } from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Link } from "react-router-dom"
// import { db } from "../firebase"
import { UserAuth } from "../../context/AuthContext"
import { arrayUnion, doc, updateDoc } from "firebase/firestore"


function FeedItem({ coin }) {

    /*     const [savedCoin, setSavedCoin] = useState(false)
        const { user } = UserAuth()
    
        const handleSavedCoin = () => {
            setSavedCoin(prevCoin => !prevCoin)
        }
    
        const coinPath = doc(db, "user", `${user?.email}`)
        const saveCoin = async () => {
            if (user?.email) {
                handleSavedCoin()
                await updateDoc(coinPath, {
                    favorites: arrayUnion({
                        id: coin.id,
                        name: coin.name,
                        image: coin.image,
                        rank: coin.market_cap_rank,
                        symbol: coin.symbol,
                        price: coin.current_price,
                    })
                })
            } else {
                alert("Please sign in.")
            }
        } */

    return (
        <tr className='feed-element'>
            <td>{coin.market_cap_rank}</td>
            <td>
                <div>
                    <div>{coin.name}</div>
                </div>
            </td>
            <td>
                <div><Link to={`/article/${coin.id}`}>{coin.symbol.toUpperCase()}</Link></div>
            </td>
            <td>${coin.current_price.toLocaleString()}</td>
        </tr>
    )
}

export default FeedItem