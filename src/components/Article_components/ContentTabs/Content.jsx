import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ContentTab from './ContentTab';
import KeyTakeAways from './KeyTakeAways';
import QuestionAnswering from '../QuestionAnswering';
import srtParser2 from "srt-parser-2"




export default function Content(props) {
	const data = props.data;
	const location = useLocation();
	const [activeTab, setActiveTab] = useState('tab1');



	let summary
	let transcript


	async function transcriptParser() {
		let summaryArray = data.summary.split("\n")
		summary = summaryArray.map(item => item).join("<br></br>")
		var parser = new srtParser2();
		let srt_array = parser.fromSrt(data.transcript);

		let nothing = ""
		let count = 0

		nothing = nothing + "00:00:00 " + "<br></br>"
		for (let i = 0; i < srt_array.length; i++) {

			count = count + 1
			nothing = nothing + srt_array[i].text + " "
			if (count > 6 && srt_array[i].text.substring(srt_array[i].text.length - 1, srt_array[i].text.length) === ".") {
				nothing = nothing + "<br></br>" + srt_array[i].endTime.substring(0, srt_array[i].endTime.length - 4) + "<br></br>"
				count = 0
			}
		}

		transcript = nothing

	}

	transcriptParser()








	return (
		<div className={`container  mx-auto md:px-10 lg:px-20 overflow-x-hidden`}>
			<div className="grid grid-cols-3">
				<h1 className="col-span-2 mt-10 text-xl text-left lg:col-span-3 lg:mt-20 lg:text-3xl text-blueLike font-bold">
					{data.title}
				</h1>

				<div className="flex flex-col items-center mt-5 cursor-pointer lg:hidden">
					<img src="/youtubeicon.png" width={80} />
					<p className="-mt-3 font-semibold">Click to Watch</p>
				</div>
			</div>
			<div className="grid lg:grid-cols-2 gap-8 mt-16 mb-10">
				<div className="md:w-full  lg:w-full">
					{data ? data.key_takeaways ? <KeyTakeAways key_takeaways={data.key_takeaways} /> : null : null}
				</div>
				<div className="hidden lg:block w-2/3 ">
					<iframe
						title="My YouTube Video "
						className="max-w-80 lg:w-120 h-80 w-auto"
						src={`https://www.youtube.com/embed/${data.source_id}`}
						frameBorder="0"
						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					></iframe>
				</div>
			</div>
			{/* <QuestionAnswering data={data} /> */}
			<div className="lg:ml-10 mt-14 lg:mt-0 w-full">
				<div className="summary-and-transcript-buttons text-xl w-5/6 ">
					<button
						className={activeTab === 'tab1' ? 'content-active-button border-r-1 w-1/2' : 'border-r-1 w-1/2'}
						onClick={() => setActiveTab('tab1')}
					>
						Summary
					</button>
					<button
						className={activeTab === 'tab2' ? 'content-active-button w-1/2' : 'w-1/2'}
						onClick={() => setActiveTab('tab2')}
					>
						Transcript
					</button>
				</div>
				<div className="main-content lg:ml-10">
					{activeTab === 'tab1' && <ContentTab data={summary ? summary : data.summary} />}
					{activeTab === 'tab2' && <ContentTab data={transcript ? transcript : data.transcript} />}
				</div>
			</div>
		</div>
	);
}
