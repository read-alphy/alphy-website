import { useRef } from 'react';
import { useState } from 'react';
import ImageGenerator from '../ImageGenerator';

const KeyTakeAways = ({ key_takeaways }) => {
	const [current, setCurrent] = useState(0);
	const [keysCollapsed, setKeysCollapsed] = useState(true);
	const KTref = useRef(null);
	const handleClick = () => {
		setKeysCollapsed(!keysCollapsed);
		if (!keysCollapsed) {
			KTref.current.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const ArrowButton = ({ direction }) => {
		return (
			<button
				className="text-3xl text-zinc-400  py-1 px-3 rounded"
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

		<div className=" lg:col-span-1 border-blueLike text-zinc-600 flex justify-center items-center mx-5" ref={KTref}>

			<div
				href="#"
				className={` w-full pt-6 drop-shadow-xl bg-zinc-100 border-gray-200 sm:min-h-[300px] lg:min-h-[500px] rounded-lg shadow-md flex justify-between ${keysCollapsed ? 'sm:h-[300px]' : null
					} flex flex-col justify-start`}
			>
				<div>
					<div className="flex flex-col  justify-between items-center ">
						<div
							className={`flex flex-row items-center border-b border-gray-200 pb-1 justify-center px-2 w-full ${keysCollapsed ? 'justify-between ' : 'justify-center '
								}`}
						>
							{keysCollapsed ? <ArrowButton direction={'left'} /> : null}
							<h5 className="text-xl font-bold tracking-tight text-zinc-600 text-blueLike items-center">
								Key Takeaways {keysCollapsed ? `${current + 1}/${key_takeaways.length}` : null}
							</h5>
							{keysCollapsed ? <ArrowButton direction={'right'} /> : null}
						</div>
					</div>

					<div className="text-l mt-10 px-8 object-fit:contain">
						{keysCollapsed ? (
							<p className="pt-10 text-xl">{key_takeaways[current]}</p>
						) : (
							key_takeaways.map((item, index) => (
								<p key={index} className={'border-b border-slate-200 pb-5 pt-5'}>
									{'• '}
									{item}
								</p>
							))
						)}
					</div>
				</div>
				<button
					onClick={handleClick}
					className={'text-gray-500 underline hover:text-blue-700 font-light text-sm mt-5 mb-10'}
				>
					{keysCollapsed ? 'Show Them All' : 'Collapse'}
				</button>
			</div>
		</div>
	);
};

export default KeyTakeAways;
