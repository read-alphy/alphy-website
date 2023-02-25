import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '../../../hooks/useWindowSize';
import './FeedItem.css';

const FeedItem = ({ item, setCollapsed }) => {
	const source_id = item.source_id;
	const imageUrl = `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`;
	const navigate = useNavigate();
	const windowSize = useWindowSize();
	return (
		<tr className={'grid border-b-0'}>
			<td className="flex w-full">
				<div
					className={
						'flex flex-row items-center justify-start cursor-pointer w-full h-full hover:bg-slate-200  p-2 rounded-md mb-2 transition duration-200 ease-in-out hover:shadow-md  hover:scale-105 transform hover:translate-x-2 hover:translate-y-2 mr-auto ml-auto'
					}
					onClick={() => {
						navigate(`/article/${item.source_id}`);
						if (windowSize.width < 768) { setCollapsed(true) };
					}}
				>
					<div className="w-1/2 min-w-150 max-w-[300px] mr-3">
						<div
							className="flex items-center justify-center h-0 rounded-md bg-gray-600"
							style={{
								backgroundImage: `url(${imageUrl})`,
								paddingBottom: '50%',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
							}}
						></div>
					</div>

					<div className="text-xs w-1/2">
						<div className="text-sm video-text text-bordoLike font-semibold">{item.title}</div>
						<div className="side-feed-creator font-italic text-purpleLike">{item.creator_name}</div>
						{/* <div className="side-feed-date">{moment(item.source_ts).format('DD:MM:YYYY')}</div> */}
					</div>
				</div>
			</td>
		</tr>
	);
};
export default FeedItem;