// create a 404 page
import { Link } from "react-router-dom";
import Smiley from "../img/smiling_robot.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function HomeInfo() {

const navigate = useNavigate();


	return (
		<div className="flex flex-col items-center w-full justify-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-center h-[90vh] ">
			{/* <img src={Smiley} className="opacity-70 saturate-50"></img> */}
			<h1 className="welcome-prompt mb-5 text-6xl flex md:flex-row flex-col justify-center  text-[2.25rem] font-bold">
				Welcome to Alphy!
			</h1>
			<h2 className="mb-5 text-zinc-700 dark:text-zinc-300"> 
			Unlock the information in audiovisual content with artificial intelligence
			 <br></br>   </h2>

			 <p>
			 
			 </p>
			<div className="flex flex-row pb-20 mb-20">
				<Link to="/submit" type="button" className="text-bordoLike dark:bg-darkMode dark:text-zinc-300 mr-5 underline">Start Creating</Link>

				<Link to="/" type="button" className="text-bordoLike dark:bg-darkMode dark:text-zinc-300 ml-5 underline">Discover</Link>

				<Link to="/about" type="button" className="text-bordoLike dark:bg-darkMode dark:text-zinc-300 ml-5 underline">Learn more about us</Link>
			</div>

		</div>
	);
}
