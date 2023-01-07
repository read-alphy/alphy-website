import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom"
import Switcher from './Switcher'
import "../helper/FeedBurgerMenu.css"
import Feed from './Article_components/Feed'

function FeedBurgerMenu({ data }) {
    return (

        <div className="collapsed-feed-menu">
            <Menu id={"sidebar"} left>
                <div className="user-feed-burger">
                    <div className="create-article">
                        <button href="/article/new-article"><p>New +</p></button>
                    </div>
                    <div className="user-feed-burger-feed">
                        <Feed className="heyyo" coins={data} />
                    </div>

                </div>
            </Menu>
        </div>
    )
}

export default FeedBurgerMenu