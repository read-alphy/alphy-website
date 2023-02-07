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
				className="text-3xl text-blueLike font-semibold py-1 px-3 rounded"
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
		<div className="col-span-2  md:min-w-[400px] lg:col-span-1 border-blueLike text-blueLike flex justify-center items-center mx-5">
			<div
				href="#"
				className={`block w-full pt-6 bg-[#ECF9FF] border-gray-200  rounded-lg shadow-md ${keysCollapsed ? 'sm:h-[300px]' : null
					} flex flex-col justify-start`}
			>
				<div className="flex flex-col justify-between items-center ">
					<div
						className={`flex flex-row items-center border-b border-gray-600 pb-1 justify-center px-2 w-full ${keysCollapsed ? 'justify-between ' : 'justify-center '}`}

					>
						{keysCollapsed ? <ArrowButton direction={'left'} /> : null}
						<h5 class="text-xl pb-5 font-bold tracking-tight text-gray-900 text-blueLike items-center">
							Key Takeaways {keysCollapsed ? `${current + 1}/${key_takeaways.length}` : null}
						</h5>
						{keysCollapsed ? <ArrowButton direction={'right'} /> : null}
					</div>

				</div>

				<div className="text-xl m-3 px-8 object-fit:contain">
					{keysCollapsed ? (
						<p>{key_takeaways[current]}</p>
					) : (
						key_takeaways.map((item, index) => (
							<p key={index} className={'border-b border-slate-200 pb-5 pt-5'}>
								{'• '}
								{item}
							</p>
						))
					)}
				</div>
				<button
					onClick={handleClick}
					className={'text-blue-500 hover:text-blue-700 font-light text-sm mt-5'}
				>
					{keysCollapsed ? 'Show Them All' : 'Collapse'}
				</button>
			</div>

		</div>
	);
};

export default KeyTakeAways;
