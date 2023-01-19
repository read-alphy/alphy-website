import React, {useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import SideFeedItem from './SideFeedItem';

function MainFeed(props) {
    const data = props.data
    const [searchText, setSearchText] = useState("")

    return (

        <div className="signed-in-feed">
            <Tabs>
                <Tab title="">
                    <div >
                        <input onChange={(e) => setSearchText(e.target.value)} type="text" placeholder='Search' />
                    </div>
                    <table >
                        <thead>
                        </thead>
                        <tbody>
                            {data
                                .filter((value) => {
                                if (searchText === "") {
                                    return value
                                } else if (value.title.toLowerCase().includes(searchText.toLowerCase())) {
                                    return value
                                }else{
                                    return null
                                }})
                                .map((item,index) => (
                                <SideFeedItem key={index} index={index} item={item} />
                            ))}
                        </tbody>
                    </table>
                </Tab>
            </Tabs>
        </div>
    )
}

export default MainFeed