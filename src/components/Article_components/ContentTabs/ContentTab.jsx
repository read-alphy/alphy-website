import React from 'react'
import { Tab, Tabs} from 'react-bootstrap';


function ContentTab(props) {
    const data = props.data
    const transcript = props.transcript
    return (
        <Tabs>
            <Tab eventKey="transcript" title="" >
                <h1 className='text-2xl font-bold mt-8 mb-4'>About {data.title} </h1>
                { transcript? 
                    <p className='text-lg font-normal mb-4'>{data.transcript}</p>
                    :
                    <p className='text-lg font-normal mb-4'>{data.summary}</p>
                }
            </Tab>
        </Tabs>
    )

}


export default ContentTab