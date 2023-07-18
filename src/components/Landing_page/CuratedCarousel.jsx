import React, { useEffect, useRef,useState } from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import CuratedCarouselItem from './CuratedCarouselItem';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CarouselItem } from 'react-bootstrap';

export default function CuratedCarousel(props) {
    
    const carouselRef = useRef(null);
    const rightButtonRef = useRef(null);
    const leftButtonRef = useRef(null);
    const [isForwardArrowVisible, setIsForwardArrowVisible] = useState(true);
    const [isBackwardArrowVisible, setIsBackwardArrowVisible] = useState(false);
    const [direction, setDirection] = useState("forward");
    useEffect(() => {
        const handleScroll = () => {
          if (carouselRef.current) {
            const container = carouselRef.current;
            const isScrollEnd = container.scrollLeft + container.clientWidth === container.scrollWidth;
            setIsForwardArrowVisible(!isScrollEnd);
            setIsBackwardArrowVisible(container.scrollLeft > 0);

    
          }
        };
    
        // Attach scroll event listener
        if (carouselRef.current) {
          carouselRef.current.addEventListener('scroll', handleScroll);
        }

        // Clean up the event listener on component unmount
        return () => {
          if (carouselRef.current) {
            carouselRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      }, []);
    
      const scrollForward = () => {
        if (carouselRef.current) {
            const container = carouselRef.current;
          
   
            
            
            const scrollAmount = 240; 

          carouselRef.current.scrollLeft += scrollAmount;
        }
      };
    
      const scrollBackward = () => {
        if (carouselRef.current) {
            const container = carouselRef.current;
            
            const scrollAmount =  240; 
          carouselRef.current.scrollLeft -= scrollAmount;
        }
      };


  
/* 
  useEffect(() => {
    const interval = setInterval(() => {
        
     
      // Programmatically trigger a click event on the right arrow
      if(direction==="forward"){
            if (rightButtonRef.current) {
                
                    rightButtonRef.current.click()
                
            }
    }
    else if(direction==="backward"){
        if (leftButtonRef.current) {
            
                leftButtonRef.current.click()
            
        }
    }
     
      
      
    }, 3000);

    // Clear the interval when the component unmounts or changes
    return () => {clearInterval(interval);}
  }, []); */

  return (
    <div className="w-full h-full container xl:max-w-[1000px] 2xl:max-w-[1280px] mx-auto pb-20">
        <p className="mb-6 text-zinc-700 dark:text-zinc-300 ml-4 sm:ml-10 sm:mb-10 text-xl font-semibold">
            Converse with the best.
        </p>
     {/*  <Carousel
      className="py-5"
        
        show={`${window.innerWidth > 1000 ? 4.2 : window.innerWidth > 600 ? 3.2 : 2.2}`}
        slide={1}
        transition={0.5}
        infinite={true}
        leftArrow={
          <div className="mt-10 md:mt-24 pr-4 w-8">
            <ArrowBackIosNewIcon className="cursor-pointer text-zinc-800 dark:text-zinc-300" />
          </div>
        }
        rightArrow={
          <div  ref={carouselRef} className="mt-10 md:mt-24 pl-2 w-8">
            <ArrowForwardIosIcon className=" right-arrow cursor-pointer text-zinc-800 dark:text-zinc-300" />
          </div>
        }
      >
        {props.dataGlobalArchipelagos.map((item, index) => (
          <CuratedCarouselItem key={index} item={item} />
        ))}
      </Carousel> */}
<div className="relative ">
<button onClick={scrollBackward} ref = {leftButtonRef} type="button" className={`left-arrow absolute top-0 left-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
          isBackwardArrowVisible ? '' : 'hidden'
        }`}>
        <div className="rounded-full bg-zinc-200 bg-opacity-40 p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                    <ArrowBackIosNewIcon className="cursor-pointer text-zinc-600 p-1 " />
                    </div>
        </button>
<div className="flex flex-row gap-4 overflow-x-scroll scroll-smooth carousel-area" ref={carouselRef}>
{props.dataGlobalArchipelagos.map((item, index) => (
          <CuratedCarouselItem key={index} item={item} />
        ))}
     
        </div>
    <button onClick={scrollForward} ref={rightButtonRef} type="button" className={`right-arrow absolute top-0 right-0 z-30 flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
          isForwardArrowVisible ? '' : 'hidden'
        }`}>
        <div className="rounded-full bg-zinc-200 bg-opacity-40 p-1 mr-1  hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                    <ArrowForwardIosIcon className="cursor-pointer text-zinc-600 p-1 " />
                    </div>
        </button>
        </div>
    </div>
  );
}
