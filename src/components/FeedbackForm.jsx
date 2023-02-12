import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function FeedbackForm() {
    const [inputValue, setInputValue] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        toast.dismiss();


    }
    return (
        <div className="mx-auto pt-20 w-800 pb-20 bg-slate-200" id="feedback">
            <div className=" flex justify-center "></div>


            <div className=" flex justify-center ">
                <iframe className="sm:w-5/6 max-w-4xl mb-20 md:ml-30 overflow-auto h-160 " src="https://tally.so/embed/mKp7XX?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"></iframe>

            </div>
        </div >)

}


