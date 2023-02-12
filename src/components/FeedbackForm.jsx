import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function FeedbackForm() {
    const [inputValue, setInputValue] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        toast.dismiss();


    }
    return (
        <div className="mx-auto mb-20" id="feedback">
            <div className=" flex justify-center "></div>


            <div className=" flex justify-center ">
                <iframe className="w-2/3 mb-20 md:ml-30 overflow-x-auto h-144" src="https://tally.so/embed/mKp7XX?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"></iframe>
            </div>
        </div >)

}


