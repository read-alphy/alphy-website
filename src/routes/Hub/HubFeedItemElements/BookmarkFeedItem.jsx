import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from 'axios';
import {Link} from "react-router-dom"
import { API_URL } from '../../../constants';

export default function BookmarkFeedItem ({item, index, source_id, imageUrl, language_codes, currentUser, setRemoved, removed, sideFeed, setCollapsed})
{
	const removeBookmark =  () => {
		axios.patch(`${API_URL}/sources/${item.source_type}/${item.source_id}/bookmark`, {
			params: {
				bookmark: !removed,
			},
			headers: {
				'accept': 'application/json',
				'id-token': currentUser.accessToken	,
			}
		}).then((response) => {
				console.log("removed", removed)
				setRemoved(!removed)
			})
	}
    return(
        <div className="flex w-full ">
						<div
							className={`items-center justify-start w-full h-full  p-2 rounded-md mb-2 transition duration-200 ease-in-out    mr-auto ml-auto`}
							onClick={() => {


								// navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);
							}}
							target="_blank"
						>
							<Link to={`/${item.source_type}/${source_id}`} >
							<div className={`min-w-[320px] max-w-[320px]  font-averta-semibold xs:min-w-[100px] xs:max-w-[200px]  mr-3 cursor-pointer`}>
								<div
									className="flex items-center justify-center h-0 dark:opacity-80  rounded-md bg-gray-600 max-w-[300px]"
									style={{
										backgroundImage: `url(${imageUrl})`,
										paddingBottom: '50%',
										backgroundPosition: 'center',
										backgroundRepeat: 'no-repeat',
										backgroundSize: 'cover',

									}}
								></div>
							</div>
							</Link>

					<div className="text-xs h-full mt-2">
						<div className="grid grid-cols-3">
							<div className="col-span-2">
                           
								{item.summaries !== undefined && item.summaries[0] !== undefined && (item.summaries[0].complete === true || (item.summaries[1] !== undefined || item.summaries[0] !== undefined)) ? null : (
									<div className="font-bold text-purpleLike dark:text-zinc-300 font-averta-semibold">📝 IN PROGRESS</div>
								)}

							<Link className="cursor-pointer" to={`/${item.source_type}/${source_id}`} >
								<div className="text-sm font-averta-semibold video-text text-black  dark:text-zinc-300 font-normal">
							
									{item.title}
									</div>
								<div className=" text-zinc-500 dark:text-zinc-300 font-averta-semibold">{item.creator_name}</div>
								<div className="font-averta-semibold text-zinc-400 dark:text-zinc-300 flex flex-row">
									
									{item.summaries!==undefined &&
							
									item.summaries.map ((summary,index) => (
										
										<div className={index!==0 ? "ml-1 font-averta-semibold": "font-averta-semibold"}>
											{language_codes[summary.lang]}
											{index!==item.summaries.length-1 && ","}
										</div>
									))
									}
								
									
									</div>
									
								</Link>
								</div>
								
									<div className={`flex  ${sideFeed==true && "mr-0 mb-0"} col-span-1 `}>

								{removed?
									<ReplayIcon onClick={removeBookmark} className="cursor-pointer text-zinc-600 dark:text-zinc-300"/>
									
								:
									<BookmarkRemoveIcon onClick={removeBookmark} className="cursor-pointer text-zinc-600 dark:text-zinc-300"/>
										}
										</div>
										</div>
								
							</div>
							
						</div>
						
					</div>

    )
}