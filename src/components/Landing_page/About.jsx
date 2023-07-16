import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";


export default function About() {

	const [open, setOpen] = useState(1);
 
	const handleOpen = (value) => {
	  setOpen(open === value ? 0 : value);
	};
	return (
		
		<div className="mx-auto md:w-800 w-full flex justify-center text-blueLike dark:bg-darkMode dark:text-zinc-300 bg-zinc-50" id="about">
			<div id="about" className="px-4 container w-5/6 max-w-4xl mt-20 pb-20 text-l lg:text-l">	
			<h1 className="text-2xl mb-5 underline font-semibold">About</h1>
			<Fragment>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>
		What is Alphy?
        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-300">
		<p className="text-l dark:text-zinc-300">
					
					Alphy is an AI tool that helps users meaningfully interact with online audiovisual content with the
					help of artificial intelligence. Upon submitting the link for a YouTube video or Twitter Spaces, Alphy gives you:
					<ol className="dark:text-zinc-300">
						<li className="pt-3 dark:text-zinc-300">
							<strong> • A highly accurate transcript </strong> of the content with timestamps, ready to use on your videos.
						</li>
						<li className="pt-3 dark:text-zinc-300">
							<strong> • An AI-powered chatbot generated on top of the content </strong> so that you can ask questions and get AI-generated answers, unlocking an immense information capture for the viewers.
						</li>
						<li className="pt-3 dark:text-zinc-300">
							<strong> • The summary and TL:DR of the content</strong> for you to cut down on time to get the most relevant information.</li>
					</ol>
				</p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
		What can you do with Alphy?
		        </AccordionHeader>
        <AccordionBody className="text-md">
		<p>
					• <strong className="font-semibold"> Give life to the audiovisual content with AI: </strong>  Alphy's search bot allows you to ask questions a video or recording to get the most relevant answers presented by the
					content.
					</p>
					
					<p className="pt-2">
					• <strong className="font-semibold">Summarize to save time: </strong> Alphy distills the essence of lengthy content into concise summaries, putting the knowledge you need right at your fingertips.
					</p>
					
					<p className="mt-2">
					• <strong className="font-semibold">Transcribe with precision: </strong>Alphy's AI-powered transcription service effortlessly converts any audiovisual content into meticulously accurate text, saving you time and effort. 
					</p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
		How to use the product?
        </AccordionHeader>
        <AccordionBody className="text-md">
		<p className="text-l mt-2">
					<p className="">
					• You make a work request by signing in and submitting a YouTube video or Twitter Spaces link to
					Alphy.
					</p>
					<p className="mt-2">
					• Make sure that the content you are submitting doesn't have any location limits. Otherwise, Alphy might not be able to process it. 
					</p>
					<p className="mt-2">
					• Check out your <a href="/plans" className="underline">plan</a> details to discover Alphy's capablities.
					</p>

					{/*                     <br></br>
                    • There is a limit on the number of submissions you can make a day to decrease the bloat.
                    <br></br> */}

				<p className="mt-2">
					• Transcription process may take some time. We will notify you via email when your work is
					ready.

					</p>
				
					<p className="mt-2">
					• Once the content is processed, it is public. Anyone can read it.
					</p>
					
				</p>
        </AccordionBody>
      </Accordion>
	  <Accordion open={open === 4}>
        <AccordionHeader onClick={() => handleOpen(4)}>
		What are Arcs?
		        </AccordionHeader>
        <AccordionBody className="text-md">
		<p>
					An Arc, short for archipelago, is a collection of content that is connected together with an AI-assisted search engine. You can create multiple Arcs with different scopes and levels of depth, focusing on specific subjects, creators, or topics. An Arc will be your own personal knowledge base that you can use to search for information and share with others.
					</p>
					
				
        </AccordionBody>
      </Accordion>
    </Fragment>

			</div>
		
		{/* <div id="about" className="px-4 container w-5/6 max-w-4xl mt-20 pb-20 text-l lg:text-l">
				<h1 className="text-2xl  font-semibold">About</h1>
				<br></br>

				<h2 className="lg:text-l underline font-semibold mb-2"> What is Alphy?</h2>

				<p className="text-l">
					
					Alphy aims to help users meaningfully interact with online audiovisual content with the
					help of artificial intelligence. Upon submitting the link for a YouTube video or Twitter Spaces, Alphy gives you:
					<ol className="">
						<li className="pt-3">
							<strong> • A highly accurate transcript </strong> of the content with timestamps, ready to use on your videos.
						</li>
						<li className="pt-3">
							<strong> • An AI-powered chatbot generated on top of the content </strong> so that you can ask questions and get AI-generated answers, unlocking an immense information capture for the viewers.
						</li>
						<li className="pt-3">
							<strong> • The summary and TL:DR of the content</strong> for you to cut down on time to get the most relevant information.</li>
					</ol>
				</p>

				<br></br>
				<h2 className="lg:text-l  underline font-semibold"> What can you do with it?</h2>

				<p className="text-l mt-2">
					<p>
					• You can ask questions to a video or recording to get the most relevant answers presented by the
					content.
					</p>
					
					<p className="pt-2">
					• You can get a detailed summary of the content as well as a TL:DR version of that summary
					that lays out the key takeaways of the video.
					</p>
					
					<p className="mt-2">
					• You can access high quality transcripts that are far more accurate than the ones autiomatically generated by YouTube and Twitter.
					</p>
					

				</p>

				<br></br>
				<h1 className="text-l underline font-semibold">How to use the product?</h1>
				
				<p className="text-l mt-2">
					<p className="">
					• You make a work request by signing in and submitting a YouTube video or Twitter Spaces link to
					Alphy.
					</p>
					<p className="mt-2">
					• Make sure to check the <a href="/plans" className="underline">plan details</a> to learn more about your current limits.
					</p>

				

				<p className="mt-2">
					• Transcription process may take some time. We will notify you via email when your work is
					ready.

					</p>
					

					<p className="mt-2">
					• Once the content is processed, it is public. Anyone can read it.
					</p>
					
				</p>
				<br></br>
				<br></br>
			</div> */}
		</div>
	);
}
