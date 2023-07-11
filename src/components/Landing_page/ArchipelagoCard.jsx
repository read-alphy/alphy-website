
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import SmartToyIcon from '@mui/icons-material/SmartToy';
import EditIcon from '@mui/icons-material/Edit';


export default function ArchipelagoCard({item,index,currentUser}){
    
    const [expanded, setExpanded] = useState(false);

    let displayText
    

    if(item.description!==undefined){
      if(item.thumbnail_url!==null){
        displayText = expanded ? item.description : `${item.description[69]===" "? item.description.slice(0, 69)  : item.description.slice(0, 70)}${item.description.length>70 ? "..." : ""}`;
      }
        else{
            displayText = expanded ? item.description : `${item.description[69]===" "? item.description.slice(0, 69)  : item.description.slice(0, 70)}${item.description.length>70 ? "..." : ""}`;
        }



}
    const navigate = useNavigate();
    

    const handleComponentClick = () => {
        navigate(`/archipelago/${item.uid}`)
      };
    
      const handleIconClick = (event) => {
        event.stopPropagation();
        setTimeout(() => {
        navigate(`/archipelago/editArchipelago/${item.uid}`);
        }, 100);
      };
    return(
    <div className="">
        <div className="rounded-lg cursor-pointer border  dark:bg-darkMode bg-white hover:drop-shadow-sm hover:-translate-y-2 my-2 duration-300 transition ease-in-out dark:border-zinc-800 dark:bg-darkMode dark:hover:drop-shadow-md dark:transition dark:duration-300 dark:ease-in-out h-[300px] w-[240px] justify-center items-center  mt-5"
        onClick={handleComponentClick}
       >
      <div>

            <div className="px-4 ml-4 pb-4">
                <div className="">
                    {item.thumbnail_url !== null ?
                    <div className="mt-4">
                    <img width={160} src={item.thumbnail_url}/>
                    </div>
                    :
                    <div className="mt-4">
                        
                        </div>}
            <div className={` ${item.thumbnail_url!==null ? "mt-4" : "mt-4"}`}  >
                <SmartToyIcon className="text-green-400 "/>
                {currentUser!==undefined && item.user_id === currentUser.uid && 
                
                <EditIcon className="cursor-pointer ml-2 dark:text-zinc-400 text-zinc-500" onClick={handleIconClick}/>}
                </div>
                </div>
            <p className="text-zinc-700 dark:text-zinc-200 text-lg mt-4 overflow-hidden ">
                {item.name}
            </p>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-2 overflow-hidden font-light">
                {item.description!=="null" && displayText}</p>
            </div>
        </div> 

        </div>
    

    
    </div>
        
    )
}