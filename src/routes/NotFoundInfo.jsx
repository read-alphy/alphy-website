// create a 404 page
import { Link } from "react-router-dom";
import Smiley from "../img/smiling_robot.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function NotFound() {

const navigate = useNavigate();
useEffect (() => {
	navigate('/404')
}, [])

	return (
		<div className="flex flex-col items-center w-full justify-center text-blueLike dark:bg-darkMode dark:text-zinc-300 text-center h-[90vh] ">
			<img src={Smiley} className="opacity-70 saturate-50"></img>
			<h1 className="welcome-prompt mb-5 text-6xl flex md:flex-row flex-col justify-center  text-[2.25rem] font-bold">
				Oops!
			</h1>
			<h2 className="mb-5 text-zinc-700 dark:text-zinc-300">Sorry, we coluldn't find the page you were looking for :( <br></br>   </h2>
			<div className="flex flex-row pb-20 mb-20">
				<Link to="/" type="button" className="text-bordoLike dark:bg-darkMode dark:text-zinc-300 mr-5 underline">Go Home</Link>

				<a href="https://twitter.com/alphyapp" type="button" className="text-bordoLike dark:bg-darkMode dark:text-zinc-300 ml-5 underline">Reach us</a>

			</div>

		</div>
	);
}
