import UploadFile from "../../../img/upload_file.png"
import DarkUploadFile from "../../../img/dark_upload_file.png"
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {Link} from "react-router-dom"


export default function MyUploadsFeedItem({item, source_id, formattedDate, setCollapsed}){
	let displayText = "";
	if(item!==undefined && item.title!==undefined && item.title!==null){
		
		  if(item.title.length>70){
			displayText =  `${item.title[69]===" "? item.title.slice(0, 69)  : item.title.slice(0, 70)}${item.title.length>40 ? "..." : ""}`;
		}
		else{
			displayText = item.title
		}
		
		  
  
  
  
  }
  

    return(
        <Link to={`/${item.source_type}/${source_id}`} >
					<div className="flex w-full  duration-200 transform ease-in-out">
						<div
						>
								<div className="transform hover:scale-105 transition duration-200 drop-shadow-lg mb-4 grid grid-rows-4 bg-slate-200 px-6 dark:bg-mildDarkMode text-zinc-600 dark:text-zinc-300 min-w-[320px] max-w-[320px]  xs:min-w-[200px] xs:max-w-[200px]  h-[140px] items-center justify-items-center justify-center">
								
								{/* <LibraryMusicIcon fontSize="small" className="text-slate-700 dark:text-zinc-400 row-span-1"/> */}
								
								<div className="text-md  text-slate-700 dark:text-zinc-300 font-sans break-all row-span-2 overflow-hidden">
								{item.summaries !== undefined && item.summaries[0] !== undefined && (item.summaries[0].complete === true || (item.summaries[1] !== undefined || item.summaries[0] !== undefined)) ? null : (
									<div className="font-light text-xs  ">📝 IN PROGRESS</div>
								)}
									{displayText}
									
									 </div>
								<div className="font-light text-zinc-500 dark:text-zinc-300 text-xs row-span-1">Time added: {formattedDate}</div>
								</div>

							<div className="text-xs xs:mx-auto xs:items-center xs:text-center max-w-[150px] ">
						
						

								{/* <div className="side-feed-date">{moment(item.source_ts).format('DD:MM:YYYY')}</div> */}
							</div>
						</div>
					</div>
				</Link>
    )
}