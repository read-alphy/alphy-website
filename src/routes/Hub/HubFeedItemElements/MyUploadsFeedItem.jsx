import UploadFile from "../../../img/upload_file.png"
import DarkUploadFile from "../../../img/dark_upload_file.png"
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {Link} from "react-router-dom"


export default function MyUploadsFeedItem({item, source_id, formattedDate, setCollapsed}){



    return(
        <Link to={`/${item.source_type}/${source_id}`} >
					<div className="flex w-full hover:opacity-70 duration-200 transform ease-in-out">
						<div
							className={`flex ${' '} ${'pointer-events-none'} flex-col items-center justify-start cursor-pointer w-full h-full py-4 rounded-md mb-2 transition duration-200 ease-in-out   sm:hover:scale-105 transform sm:hover:translate-x-2 sm:hover:translate-y-2 mr-auto ml-auto`}
							onClick={() => {


								// navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);

								setCollapsed(true)
							}}
							target="_blank"
						>
								<div className="mb-10 bg-slate-200 min-w-[220px] max-w-[220px]  h-[140px] items-center flex justify-items-center justify-center ">
									<LibraryMusicIcon fontSize="large"/>
								</div>

							<div className="text-xs mx-auto items-center text-center max-w-[150px] ">
								{item.summaries !== undefined && item.summaries[0] !== undefined && (item.summaries[0].complete === true || (item.summaries[1] !== undefined || item.summaries[0] !== undefined)) ? null : (
									<div className="font-bold  text-purpleLike dark:text-zinc-300">📝 IN PROGRESS</div>
								)}
								<div className="text-sm  text-black dark:text-zinc-300 font-normal underline break-all">{item.title} </div>
								<div className="font-light text-zinc-500 dark:text-zinc-300 ">Time added: {formattedDate}</div>

								{/* <div className="side-feed-date">{moment(item.source_ts).format('DD:MM:YYYY')}</div> */}
							</div>
						</div>
					</div>
				</Link>
    )
}