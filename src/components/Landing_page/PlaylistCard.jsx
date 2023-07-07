
import {useNavigate} from 'react-router-dom'
import SmartToyIcon from '@mui/icons-material/SmartToy';
import EditIcon from '@mui/icons-material/Edit';


export default function PlaylistCard({item,index,currentUser}){
    

    const navigate = useNavigate();
    

    const handleComponentClick = () => {
        navigate(`/playlist/${item.uid}`)
      };
    
      const handleIconClick = (event) => {
        event.stopPropagation();
        setTimeout(() => {
        navigate(`/playlist/editPlaylist/${item.uid}`);
        }, 100);
      };
    return(
    <div className="">
      
        <div className="rounded-md cursor-pointer border dark:border-zinc-700 dark:bg-darkMode h-[300px] w-[200px] justify-center items-center  mt-5"
        onClick={handleComponentClick}
       >
      <div>

            <div className="px-4 ">
                <div className="">
                    {item.uid === "eNb1f_M" &&
                    <div className="mt-8">
                    <img width={160} src={item.thumbnail_url}/>
                    </div>}
            <div className="mt-4">
                <SmartToyIcon className="text-green-400 "/>
                {currentUser!==undefined && item.user_id === currentUser.uid && 
                
                <EditIcon className="cursor-pointer ml-2 dark:text-zinc-400 text-zinc-500" onClick={handleIconClick}/>}
                </div>
                </div>
            <p className="text-zinc-700 dark:text-zinc-200 text-l  overflow-hidden">
                {item.name}
            </p>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-2 overflow-hidden">
                {item.description!=="null" && item.description}</p>
            </div>
        </div> 

        </div>
    

    
    </div>
        
    )
}