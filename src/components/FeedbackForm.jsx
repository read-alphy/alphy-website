import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export default function FeedbackForm() {
	const [inputValue, setInputValue] = useState('');
	const [theme, setTheme] = useState('light');

	const handleSubmit = (event) => {
		event.preventDefault();
		toast.dismiss();
	};

	useEffect(() => {
		localStorage.getItem("theme") === "light" ? setTheme("light") : setTheme("dark");

	}, []);


	return (
		<div className="dark mx-auto  md:w-800 w-full mt-10 " id="feedback">
			
			
			<div className=" flex justify-center "></div>

			<div className=" flex justify-center ">
				{theme=="light" ? 
				
				 <iframe
					className={`dark:text-whiteLike sm:w-5/6 max-w-4xl mb-20 md:ml-30 overflow-auto h-160`} 
					src={`https://tally.so/embed/wQedOk?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
				></iframe>
				
				:
				
			 	<iframe
					className={`hidden dark:block dark:text-whiteLike sm:w-5/6 max-w-4xl mb-20 md:ml-30 overflow-auto h-160`} 
					src={"https://tally.so/embed/wbjL6E?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"}
				></iframe> 
				
					}
				
			</div>
		</div>
	);
}
