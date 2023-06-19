import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './FeedItem.css';
import Twitter from '../../../img/twitter_spaces.png';

const FeedItem = ({ item, setCollapsed, mainInputFeed }) => {
	const source_id = item.source_id;
	let formattedDate = ""
	const inputDate = item.added_ts.substring(0,10)
	if(inputDate!==undefined){
		const parts = inputDate.split("-");
		formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`
	}
	
	let imageUrl;
	if (item.source_type === 'yt') {
		imageUrl = `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`;
	} else if (item.source_type === 'sp') {
		imageUrl = Twitter;
	}

	
	

	return (
		<div className={'grid border-b-0 w-full md:w-full'}>
			{item.source_type!=="up"
			? 
			<a href={`/${item.source_type}/${source_id}`} >
			<div className="flex w-full">
				<div
					className={`grid grid-cols-3 lg:grid-cols-2 flex ${' '} ${'pointer-events-none'} flex-row items-center justify-start cursor-pointer w-full h-full  p-2 rounded-md mb-2 transition duration-200 ease-in-out   sm:hover:scale-105 transform sm:hover:translate-x-2 sm:hover:translate-y-2 mr-auto ml-auto`}
					onClick={() => {
						

						// navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);
						
					setCollapsed(true)
					}}
					target="_blank"
				>
					<div className={`col-span-1 min-w-[100px] ${window.innerWidth<1660 && window.innerWidth>800 ? "min-w-[100px] max-w-[100px]": "min-w-[100px] max-w-[300px]"} mr-3`}>
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

					<div className="col-span-2 lg:col-span-1 text-xs">
						{item.summaries!==undefined && item.summaries[0]!==undefined && (item.summaries[0].complete===true || (item.summaries[1]!==undefined || item.summaries[0]!==undefined)) ? null : (
							<div className="font-bold text-purpleLike dark:text-zinc-300">📝 IN PROGRESS</div>
						)}	
						<div className="text-sm video-text text-black dark:bg-mildDarkMode dark:text-zinc-300 font-normal">{item.title}</div>
						<div className="font-light text-zinc-500 dark:text-zinc-300 ">{item.creator_name}</div>

						{/* <div className="side-feed-date">{moment(item.source_ts).format('DD:MM:YYYY')}</div> */}
					</div>
				</div>
			</div>
			</a>
			
			
			:

			<a href={`/${item.source_type}/${source_id}`} >
			<div className="flex w-full">
				<div
					className={`flex ${' '} ${'pointer-events-none'} flex-row items-center justify-start cursor-pointer w-full h-full py-4 rounded-md mb-2 transition duration-200 ease-in-out   sm:hover:scale-105 transform sm:hover:translate-x-2 sm:hover:translate-y-2 mr-auto ml-auto`}
					onClick={() => {
						

						// navigate(`/${item.source_type === 'sp' ? 'sp' : 'yt'}/${item.source_id}`);
						
					setCollapsed(true)
					}}
					target="_blank"
				>

					<div className="text-xs">
						{item.summaries!==undefined && item.summaries[0]!==undefined && (item.summaries[0].complete===true || (item.summaries[1]!==undefined || item.summaries[0]!==undefined)) ? null : (
							<div className="font-bold text-purpleLike dark:text-zinc-300">📝 IN PROGRESS</div>
						)}	
						<div className="text-sm  text-black dark:bg-mildDarkMode dark:text-zinc-300 font-normal underline">{item.title}</div>
						<div className="font-light text-zinc-500 dark:text-zinc-300 ">Time added: {formattedDate}</div>

						{/* <div className="side-feed-date">{moment(item.source_ts).format('DD:MM:YYYY')}</div> */}
					</div>
				</div>
			</div>
			</a>
			
			
			}
		</div>
	);
};
export default FeedItem;
