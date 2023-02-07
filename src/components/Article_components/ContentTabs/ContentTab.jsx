import React from 'react'
import { Tab, Tabs } from 'react-bootstrap';


function ContentTab(props) {
    const data = props.data
    return (
        <Tabs>
            <Tab eventKey="transcript" title="" >
                <p className='text-lg font-normal mb-4 max-w-screen-md
            '>{data}</p>
            </Tab>
        </Tabs>
    )

}


export default ContentTab