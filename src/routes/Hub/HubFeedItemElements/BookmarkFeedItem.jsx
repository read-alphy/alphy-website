import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ReplayIcon from '@mui/icons-material/Replay';
import axios from 'axios';

export default function BookmarkFeedItem ({item, index, source_id, imageUrl, language_codes, currentUser, setRemoved, removed, sideFeed, setCollapsed})
{

    

	const removeBookmark =  () => {
		
		axios.patch(
			`${process.env.REACT_APP_API_URL}/sources/${item.source_type}/${item.source_id}/bookmark?bookmark=${removed===false?false:true}`,
			{},
	{
						headers: {
							'accept': 'application/json',
							'id-token': currentUser.accessToken	,
						}
						}
			
			).then((response) => {
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
							<a href={`/${item.source_type}/${source_id}`} >
							<div className={` min-w-[100px] min-w-[100px] max-w-[300px] mr-3 cursor-pointer`}>
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
							</a>

					<div className="text-xs h-full mt-2">
						<div className="grid grid-cols-6">
							<div className="col-span-5">
                           
								{item.summaries !== undefined && item.summaries[0] !== undefined && (item.summaries[0].complete === true || (item.summaries[1] !== undefined || item.summaries[0] !== undefined)) ? null : (
									<div className="font-bold text-purpleLike dark:text-zinc-300">📝 IN PROGRESS</div>
								)}

							<a className="cursor-pointer" href={`/${item.source_type}/${source_id}`} >
								<div className="text-sm video-text text-black dark:bg-mildDarkMode dark:text-zinc-300 font-normal">
							
									{item.title}
									</div>
								<div className="font-light_ text-zinc-500 dark:text-zinc-300 ">{item.creator_name}</div>
								<div className="font-light text-zinc-400 dark:text-zinc-300 flex flex-row">
									
									{item.summaries!==undefined &&
							
									item.summaries.map ((summary,index) => (
										
										<div className={index!==0 && "ml-1"}>
											{language_codes[summary.lang]}
											{index!==item.summaries.length-1 && ","}
										</div>
									))
									}
								
									
									</div>
									
								</a>
								</div>
								
									<div className={`flex justify-end  ${sideFeed==true && "mr-0 mb-0"} col-span-1 pr-4`}>

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