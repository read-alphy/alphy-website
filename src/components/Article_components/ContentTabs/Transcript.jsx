import React, { useEffect, useState } from 'react'
import { UserAuth } from "../../../context/AuthContext"
import { useParams } from 'react-router-dom'
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"
import { Sparklines, SparklinesLine } from 'react-sparklines';
import axios from "axios"
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading"
import { Tab, Tabs, TabPanel } from 'react-bootstrap';




function TranscriptTab(data) {

    return (
        <Tabs>
            <Tab eventKey="transcript" title="" >
                <h1 className='text-2xl font-semibold mt-8 mb-4'>About {data.data.name} ({data.data.symbol?.toUpperCase()})</h1>
                <div className='about-text whitespace-pre-wrap tracking-wide' dangerouslySetInnerHTML={{ __html: data.data.description?.en }}></div>
            </Tab>
        </Tabs>
    )

}


export default TranscriptTab