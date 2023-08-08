import React, { useCallback, useState, useMemo, useEffect, useRef, memo } from 'react';
import SideFeedReworked from '../../components/ArticleComponents/SideFeedReworked';
// import ArticleCreator from "./ArticleComponents/ArticleCreator"
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Loading from '../../components/Loading';
import axios from 'axios';
import { Helmet } from "react-helmet";
import SuccessInfo from './CheckOutPageInfo';






export default function CheckOutPage({currentUser, collapsed, setCollapsed, hasActiveSub,setShowWelcomeForm, showWelcomeForm, credit,userArchipelagos, dataGlobalArchipelagos, setDataGlobalArchipelagos, getDataGlobalArchipelagos}) {
	const location = useLocation();
	const navigate = useNavigate();
	

	let source_id
	
	
    const [windowSizeChecked,setWindowSizeChecked] = useState(false);
	

	const [isLoading, setIsLoading] = useState(true);

	const [subCalled, setSubCalled] = useState(false);



    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
    })

    return (
        <div>
            {currentUser ?
                <div className="text-2xl lg:text-5xl font-semibold text-zinc-700 container items-center  mx-auto mt-40 max-w-[1200px]">
                    🎉 Thank you! You have now subscribed to Alphy Premium!
                </div>
                : null}
        </div>
	);

}



