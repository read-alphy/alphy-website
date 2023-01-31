import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import "../helper/FeedBurgerMenu.css"
import Feed from './WelcomeFeed'

function FeedBurgerMenu(props) {
    const data = props.data
    return (
        <div className="collapsed-feed-menu">
            <Menu id={"sidebar"} left>
                <div className="user-feed-burger">
                    {/*                     <div className="create-article">
                        <button href="/article/new-article"><p>New +</p></button>
                    </div> */}
                    <div className="user-feed-burger-feed">
                        <Feed data={data} />
                    </div>

                </div>
            </Menu>
        </div>
    )
}

export default FeedBurgerMenu