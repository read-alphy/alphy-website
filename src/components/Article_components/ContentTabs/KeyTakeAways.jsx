import { useState } from 'react';

const KeyTakeAways = ({ key_takeaways }) => {
	const [current, setCurrent] = useState(0);
	const [keysCollapsed, setKeysCollapsed] = useState(true);

	const handleClick = () => {
		setKeysCollapsed(!keysCollapsed);
	};

	const ArrowButton = ({ direction }) => {
		return (
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
				onClick={() => {
					{
						direction === 'left'
							? setCurrent((current - 1 + key_takeaways.length) % key_takeaways.length)
							: setCurrent((current + 1) % key_takeaways.length);
					}
				}}
			>
				{direction === 'left' ? '<' : '>'}
			</button>
		);
	};

	return (
		<div className="col-span-2 lg:col-span-1 border-mainText text-mainText flex justify-center items-center mx-5">
			<div
				href="#"
				className={`block w-full pt-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-md ${
					keysCollapsed ? 'sm:h-[300px]' : null
				} flex flex-col justify-start`}
			>
				<div className="flex flex-col justify-between items-center">
					<div
						className={`flex flex-col items-center border-b-2 border-gray-600 pb-1 justify-center px-2 w-full`}
					>
						<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white items-center">
							Key Takeaways {keysCollapsed ? `#${current + 1}/${key_takeaways.length}` : null}
						</h5>
					</div>
					<div
						className={`flex flex-column ${keysCollapsed ? 'justify-between ' : 'justify-center '} w-full`}
					>
						{keysCollapsed ? <ArrowButton direction={'left'} /> : null}
						<button
							onClick={handleClick}
							className={'text-blue-500 hover:text-blue-700 font-light text-sm'}
						>
							{keysCollapsed ? 'Show Them All' : 'Collapse'}
						</button>
						{keysCollapsed ? <ArrowButton direction={'right'} /> : null}
					</div>
				</div>

				<div className="text-xl m-3 px-8">
					{keysCollapsed ? (
						<p>{key_takeaways[current]}</p>
					) : (
						key_takeaways.map((item, index) => (
							<p key={index} className={'border-b-2 border-gray-600 mb-3'}>
								{'• '}
								{item}
							</p>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default KeyTakeAways;
