import React from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import CuratedCarouselItem from './CuratedCarouselItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


export default function CuratedCarousel(props) {

    return(
        <div className="w-full h-full container xl:max-w-[1280px] mx-auto pb-20">
					<Carousel 
					show={`${
						window.innerWidth>1000 ? (window.innerWidth>1280 ? 4.2 : 3.2) : 
			window.innerWidth>600 ? 2.2: 1.2
					}`} slide={1} transition={0.5}
						infinite={true}
						leftArrow={
							<div className=" mt-24 pr-4 w-8">
							<ArrowBackIosNewIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
							</div>} 
						
						rightArrow={
									<div className="mt-24 pl-2 w-8">
								<ArrowForwardIosIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300"/>
								</div>} 
								
								>
					{props.dataGlobalArchipelagos.map((item, index) => 
					
					<CuratedCarouselItem key={index} item={item}/>
					)}
					</Carousel>
					
        </div>  
    )


}