import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function CuratedCarouselItem(props) {

    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();


    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    
let description=""
if(props.item.description!==undefined && props.item.description.length > 50){
   description = `${props.item.description[29]===" "? props.item.description.slice(0, 49) : props.item.description.slice(0, 50)}...`;
}
else{
    description = props.item.description
}

const handleNavigateToArchipelago = () => {
navigate(`/arc/${props.item.uid}`)
}
    return(
<div onClick={() =>handleNavigateToArchipelago()} className="relative min-w-[150px] max-w-[150px] md:min-w-[220px] md:max-w-[150px] md:w-64  rounded-md overflow-hidden shadow-md cursor-pointer">

    
                <img src={props.item.thumbnail_url}/>
            
            <div className={` ${!isHovered ?"opacity-0" : "opacity-100 transition duration-300 ease-in-out" } rounded-md  absolute inset-0 bg-zinc-700 dark:bg-stone-800 dark:border dark:border-stone-600 bg-opacity-80 transition duration-300 ease-in-out items-center justify-center`} >
                <div className="flex flex-col py-2 px-4 ">
          <p className="text-white bg-opacity-100 text-sm md:text-lg mb-5">{props.item.name}</p>
          <p className=" text-white bg-opacity-100 text-xs md:text-sm">{description}</p>
          </div>
          
        
        </div>
        

<div
        className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></div>
            </div>
    )
}