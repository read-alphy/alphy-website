import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai"
import { Sparklines, SparklinesLine } from 'react-sparklines';
import axios from "axios"
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading"
import { Tab, Tabs, TabPanel } from 'react-bootstrap';
import SummaryTab from './ContentTabs/Summary'
import TranscriptTab from './ContentTabs/Transcript'


export default function Article() {
    const buttonRef = React.useRef();
    const [data, setData] = useState([])
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const url = `https://api.coingecko.com/api/v3/coins/${params.article_ID}?localization=false&sparkline=true`

    const [activeTab, setActiveTab] = useState('tab1');
    const coinData = async () => {
        try {
            await axios.get(url)
                .then((response) => {
                    setData(response.data)
                })
            setLoading(true)
        } catch (error) {
            console.error(`ERROR:  ${error}`)
        }
    }
    useEffect(() => {
        coinData()
        setLoading(false)
    }, [url])


    return location.pathname !== "/article/new-article" ? (
        < div className="content" >

            <h1 className="content-title">Title</h1>
            <div className="content-upperside">
                <div className="key-takeaways">
                    <h1>Key Takeaways</h1>
                    <br></br>
                    <p>thereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in order to program digital value. Examples of decentralized apps (dapps) that are built on Ethereum includes tokens, non-fungible tokens, decentralized finance apps, lending protocol, decentralized exchanges, and much more. On Ethereum, all transactions and smart contract executions require a small fee to be paid. This fee is called Gas. In technical terms, Gas refers to the unit of measure on the amount of computational effort required to execute an operation or a smart contract. The more complex the execution operation is, the more gas is required to fulfill that operation. Gas fees are paid entirely in Ether (ETH), which is the native coin of the blockchain. The price of gas can fluctuate from time to time depending on the network demand.
                        Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in order to program digital value. Examples of decentralized apps (dapps) that are built on Ethereum includes tokens, non-fungible tokens, decentralized finance apps, lending protocol, decentralized exchanges, and much more. On Ethereum, all transactions and smart contract executions require a small fee to be paid. This fee is called Gas. In technical terms, Gas refers to the unit of measure on the amount of computational effort required to execute an operation or a smart contract. The more complex the execution operation is, the more gas is required to fulfill that operation. Gas fees are paid entirely in Ether (ETH), which is the native coin of the blockchain. The price of gas can fluctuate from time to time depending on the network demand.
                        Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in order to program digital value. Examples of decentralized apps (dapps) that are built on Ethereum includes tokens, non-fungible tokens, decentralized finance apps, lending protocol, decentralized exchanges, and much more. On Ethereum, all transactions and smart contract executions require a small fee to be paid. This fee is called Gas. In technical terms, Gas refers to the unit of measure on the amount of computational effort required to execute an operation or a smart contract. The more complex the execution operation is, the more gas is required to fulfill that operation. Gas fees are paid entirely in Ether (ETH), which is the native coin of the blockchain. The price of gas can fluctuate from time to time depending on the network demand.
                        Ethereum is a global, open-source platform for decentralized applications. In other words, the vision is to create a world computer that anyone can build applications in a decentralized manner; while all states and data are distributed and publicly accessible. Ethereum supports smart contracts in which developers can write code in order to program digital value. Examples of decentralized apps (dapps) that are built on Ethereum includes tokens, non-fungible tokens, decentralized finance apps, lending protocol, decentralized exchanges, and much more. On Ethereum, all transactions and smart contract executions require a small fee to be paid. This fee is called Gas. In technical terms, Gas refers to the unit of measure on the amount of computational effort required to execute an operation or a smart contract. The more complex the execution operation is, the more gas is required to fulfill that operation. Gas fees are paid entirely in Ether (ETH), which is the native coin of the blockchain. The price of gas can fluctuate from time to time depending on the network demand.
                        Ethereum is a globa</p>
                </div>
                <iframe
                    title="My YouTube Video"
                    width="560"
                    height="315"

                    src="https://www.youtube.com/embed/ENPk_Jk0AJg"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
            </div>
            <div className="summary-and-transcript">
                <div className="summary-and-transcript-buttons">

                    <button onClick={() => setActiveTab('tab1')}>Summary</button>
                    <button onClick={() => setActiveTab('tab2')}>Transcript</button>
                </div>
                <div className="main-content">

                    {activeTab === 'tab1' && <TranscriptTab data={data} />}
                    {activeTab === 'tab2' && <SummaryTab />}
                </div>
            </div>

        </div >) : null
}