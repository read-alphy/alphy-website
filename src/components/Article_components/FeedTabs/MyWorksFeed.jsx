import axios from 'axios'
import React, { useEffect, useState } from 'react'
import FeedItem from '../FeedItem'
import { Tab, Tabs, TabPanel } from 'react-bootstrap';

function MyWorksFeed({ coins }) {


    const [searchText, setSearchText] = useState("")


    return (

        <div className="signed-in-feed">
            <Tabs>
                <Tab title="">
                    <div >
                        <input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder='Search' />
                    </div>
                    <table>
                        <thead >
                        </thead>
                        <tbody>
                            {coins.filter((value) => {
                                if (searchText === "") {
                                    return value
                                } else if (value.name.toLowerCase().includes(searchText.toLowerCase())) {
                                    return value
                                }
                            }).map((coin) => (
                                <FeedItem key={coin.id} coin={coin} />
                            ))}
                        </tbody>
                    </table>
                </Tab>
            </Tabs>
        </div>
    )
}

export default MyWorksFeed