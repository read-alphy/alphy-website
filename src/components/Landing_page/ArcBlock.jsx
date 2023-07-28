import React from 'react';
import {useState} from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import CuratedCarousel from './CuratedCarousel';


export default function ArcBlock({dataGlobalArchipelagos, setDataGlobalArchipelagos}){
    

    return(
        <div className="dark:bg-mildDarkMode h-full sm:min-h-[70vh] sm:max-h-[70vh] p-10  sm:p-20 sm:py-16">

<div className="flex mx-auto text-red-300 text-sm font-bold mb-4 ">
                <VerifiedIcon className="mr-1"/>
                    PREMIUM
        </div>

        <p className="dark:text-zinc-300 text-zinc-700 mb-4 text-lg">Combine online or local audiovisual content with your own search engine.
                    </p>
                    <p className="dark:text-zinc-500 text-zinc-500 mb-6 text-md">
                   Arcs are collections of audiovisual content linked together with an AI assistant that allows you to ask questions to hundreds of hours of audiovisual content of your choice.
                     </p>
                   
             <div>
                        <div className="flex flex-col  col-span-2 mx-auto items-center"><p className="text-zinc-500 dark:text-zinc-400 items-center margin-auto text-l  mb-5 w-full  col-span-2">You need to go <a className="text-red-300 underline font-bold" href="/plans">premium</a> to create your own Arcs.</p></div>

                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">Meanwhile, feel free to check out Arcs by Alphy </p>
                        <CuratedCarousel dataGlobalArchipelagos={dataGlobalArchipelagos} setDataGlobalArchipelagos={setDataGlobalArchipelagos} arcDialog={true}/>
            </div>


    </div>)

}