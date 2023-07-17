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

    


const handleNavigateToArchipelago = () => {
navigate(`/archipelago/${props.item.uid}`)
}
    return(
<div onClick={() =>handleNavigateToArchipelago()} className="relative w-32 md:w-64 rounded-md overflow-hidden shadow-md cursor-pointer">

    
                <img src={props.item.thumbnail_url}/>
            
            <div className={` ${!isHovered ?"hidden" : "flex transition" } w-32 md:w-64 absolute inset-0 bg-gray-700 bg-opacity-90 transition duration-300 ease-in-out items-center justify-center`} >
                <div className="flex flex-col p-10">
          <p className="text-white bg-opacity-100 text-md mb-5">{props.item.name}</p>
          <p className="text-white bg-opacity-100 text-sm">{props.item.description}</p>
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