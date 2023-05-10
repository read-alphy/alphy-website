import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function FeedbackForm() {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		toast.dismiss();
	};
	return (
		<div className="dark mx-auto mt-20 md:w-800 w-full pb-20 " id="feedback">
			<div className=" flex justify-center "></div>

			<div className=" flex justify-center ">
				<iframe
					className="dark:text-whiteLike sm:w-5/6 max-w-4xl mb-20 md:ml-30 overflow-auto h-160 "
					src={localStorage.theme==="light" ?`https://tally.so/embed/mKp7XX?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1` : "https://tally.so/embed/mKepZ7?alignLeft=1&hideTitle=1&dynamicHeight=1"}
				></iframe>
			</div>
		</div>
	);
}
