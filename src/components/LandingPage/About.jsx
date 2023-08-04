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
			<h1 className="text-2xl mb-5 underline font-semibold">About Alphy</h1>
			<Fragment>
      <Accordion open={true}>
        <AccordionHeader onClick={() => handleOpen(1)}>
		What is Alphy?
        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-300">
		<p className="text-l dark:text-zinc-300">
					
					Alphy is your AI assistant for meaningful interaction with audiovisual content. 
					We combine latest speech-to-text technologies and large language models to transcribe, summarize, and let users create contextually aware search engines on top of videos and recordings. 
					<br/><br/>
					Our goal is to make the information in audiovisual content as easily accessible as text-based content.
				</p>
        </AccordionBody>
      </Accordion>

	  <Accordion className="mt-6" open={true}>
        <AccordionHeader onClick={() => handleOpen(3)}>
		How does Alphy work?
        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-400">
		<p className="">
					Upon submitting a link or uploading a recording, Alphy creates the transcription, summary, key takeaways, and a mini AI assistant for the content.
					<br/><br/>
					Then you can combine these content as effortlessly as building a playlist and create your AI-assisted search engine (we call it Arc) that will answer your questions based on the corpus of content you have curated.
				</p>
        </AccordionBody>
      </Accordion>

      <Accordion className="mt-6" open={true}>
        <AccordionHeader onClick={() => handleOpen(2)}>
			What kind of audiovisual content can I use Alphy with?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-400">
		<p>
		You can use Alphy to transcribe, summarize, and question YouTube videos, Twitter Spaces, and your local audio files (.mp3, .m4a, .mpga, .mpeg, .wav, or .webm)
					</p>
        </AccordionBody>
      </Accordion>
	  
	  <Accordion className="mt-6" open={true}>
        <AccordionHeader onClick={() => handleOpen(4)}>
		How does private audio processing work? Is my data safe?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-400">
				<p>
					Alphy processes the files you upload from your device the same way it processes YouTube and Twitter Space links, but keeps the end result private. We don't show it on Discover and no one else other than you can access it.
					<br/><br/>
					We don't keep your audio files. We process your audio files on the fly and delete them after processing. You can request to delete the end result by reaching us at <a className="underline" href="mailto:support@alphy.app">support@alphy.app</a>
					
					</p>
					
				
        </AccordionBody>
      </Accordion>
	  <Accordion className="mt-6" open={true}>
        <AccordionHeader onClick={() => handleOpen(4)}>
		What are Arcs?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-400">
		<p>
					
		An Arc, derived from 'archipelago,' is Alphy's AI-assisted contextually aware search engines on audiovisual content. They serve as a comprehensive collection of interconnected content, enhanced by AI. 
		
		<br/><br/>
		With Arcs, you can create multiple distinct collections, each tailored to specific subjects, creators, or topics. This enables you to cultivate a personalized knowledge base and effortlessly search for information on thousands of hours of content from one place and seamlessly share it with others.
					</p>
					
				
        </AccordionBody>
      </Accordion>

	  <div id="about" className="container w-5/6 max-w-4xl mt-20  text-l lg:text-l">	
			<h1 className="text-2xl mb-5 underline font-semibold">Subscription & Billing</h1>
			</div>
			<Accordion className="mt-6" open={true}>
        <AccordionHeader onClick={() => handleOpen(4)}>
		What does Premium offer?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-400">
				<p>
					See <a className="underline text-green-300" href="/plans">here</a> to learn detailed info about Alphy Premium.

					</p>
					
				
        </AccordionBody>
      </Accordion>

			<Accordion className="mt-6" open={true}>
        <AccordionHeader onClick={() => handleOpen(4)}>
		Do my credits roll over?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-400">
		<p>
					
		If you are using the free version, you have 2 hours of free transcription in total. In premium, you get 10 hours of transcription credits every month (on top of your 2 hours of credit). If you don't use your credits, they will roll over to the next month. You can accumulate up to 30 hours of transcription credits.
		
					</p>
					
				
        </AccordionBody>
      </Accordion>

	  <Accordion className="mt-6" open={true}>
        <AccordionHeader onClick={() => handleOpen(4)}>
		What happens to my credits if I cancel my subscriptions?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-400">
		<p>
					
		If you want to cancel your subscription, you can do so at any time. Your credits will still be yours. However you will only be able to access premium benefits until the end of the billing period.
		
					</p>
					
				
        </AccordionBody>
      </Accordion>
    </Fragment>

	
			</div>

			
		</div>
	);
}
