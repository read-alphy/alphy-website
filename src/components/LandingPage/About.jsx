import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Logo from "../../img/ALPHY_BG_REMOVED_LIGHT.png"
import LogoBlack from "../../img/ALPHY_BG_REMOVED_DARK.png"


export default function About() {

	const [open, setOpen] = useState(1);
 
	const handleOpen = (value) => {
	  setOpen(open === value ? 0 : value);
	};
	return (
		<div className="flex flex-col">

			<div className="hidden sm:flex flex-row flex  md:w-800 w-full flex  justify-center dark:bg-darkMode dark:text-zinc-300 ">
							<img src={Logo} width={70} className="hidden dark:block"></img>
							<img src={LogoBlack} width={70} className="dark:hidden opacity-80 "></img>
							<h1 className="ml-2 mt-4 text-4xl font-bold">ALPHY</h1>
				</div>


		
		<div className="mx-auto md:w-800 w-full flex  justify-center text-blueLike dark:bg-darkMode dark:text-zinc-300 bg-zinc-50" id="about">
			

			<div id="about" className="px-4 container w-5/6 max-w-4xl mt-20 pb-20 text-l lg:text-l">	
			<h1 className="text-2xl mb-5 underline font-averta-semibold">About Alphy</h1>
			<Fragment>
      <Accordion className="cursor-default" open={true}>
        <AccordionHeader className="cursor-default font-averta-semibold" onClick={() => handleOpen(1)}>
		What is Alphy?
        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-300">
		<p className="text-l dark:text-zinc-300 font-averta-regular">
					
					Alphy helps you interact with audiovisual content as easily as you do with written content.
					We combine latest speech-to-text technologies and large language models to transcribe, summarize, and let users create contextually aware search engines on top of videos and recordings. 
					<br/><br/>
					Our goal is to make the information in audiovisual content as readily available as written content.
				</p>
        </AccordionBody>
      </Accordion>

	  <Accordion className="mt-6" open={true}>
        <AccordionHeader className="cursor-default font-averta-semibold"  onClick={() => handleOpen(3)}>
		How does Alphy work?
        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-300">
		<p className="font-averta-regular">
					Upon submitting a link or uploading a recording, Alphy creates the transcription, summary, key takeaways, and a mini AI assistant for the content.
					<br/><br/>
					Then you can combine these content as effortlessly as building a playlist and create your AI-assisted search engine (we call it Arc) that will answer your questions based on the corpus of content you have curated.
				</p>
        </AccordionBody>
      </Accordion>

      <Accordion className="mt-6" open={true}>
        <AccordionHeader className="cursor-default font-averta-semibold"  onClick={() => handleOpen(2)}>
			What kind of audiovisual content can I use Alphy with?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-300">
		<p className="font-averta-regular">
		You can use Alphy to transcribe, summarize, and question YouTube videos, Twitter Spaces, and your local audio files (.mp3, .m4a, .mpga, .mpeg, .wav, or .webm).
					</p>
        </AccordionBody>
      </Accordion>
	  
	  <Accordion className="mt-6" open={true}>
        <AccordionHeader className="cursor-default font-averta-semibold"  onClick={() => handleOpen(4)}>
		How does private audio processing work? Is my data safe?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-300">
				<p className="font-averta-regular">
				When you upload files to Alphy, we handle them the same way as we do with your YouTube and Twitter Space submissions. The key difference is that your uploads are kept private, ensuring they remain accessible only to you.

				<br/><br/>

				We respect your privacy and do not retain your audio files. After real-time processing, they are deleted. If you ever want to remove the processed results, simply reach us at <span className="underline">support@alphy.app</span>.
					</p>
					
				
        </AccordionBody>
      </Accordion>
	  <Accordion className="mt-6" open={true}>
        <AccordionHeader className="cursor-default font-averta-semibold"  onClick={() => handleOpen(4)}>
		What are Arcs?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-300">
		<p className="font-averta-regular">
		An Arc represents Alphy's AI-enhanced search engine for audiovisual content. 

			<br/><br/>

		Using Arcs, you can categorize and search through vast amounts of audio content, organized by specific subjects, creators, or topics. It's like music playlists, but for learning from countless hours of material.
				
					</p>
					
				
        </AccordionBody>
      </Accordion>

	  <div id="about" className="container w-5/6 max-w-4xl mt-20  text-l lg:text-l">	
			<h1 className="text-2xl mb-5 underline font-averta-semibold">Subscription & Billing</h1>
			</div>
			<Accordion className="mt-6" open={true}>
        <AccordionHeader className="cursor-default font-averta-semibold"  onClick={() => handleOpen(4)}>
		What does Premium offer?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-300">
				<p className="font-averta-regular">
					See <a className="underline text-green-300 font-averta-semibold" href="/plans">here</a> to learn detailed info about Alphy's plans.

					</p>
					
				
        </AccordionBody>
      </Accordion>


	  <Accordion className="mt-6" open={true}>
        <AccordionHeader className="cursor-default font-averta-semibold"  onClick={() => handleOpen(4)}>
		What happens to my credits if I cancel my subscriptions?
		        </AccordionHeader>
        <AccordionBody className="text-md dark:text-zinc-300">
		<p className="font-averta-regular">
					
		If you want to cancel your subscription, you can do so at any time. You will be able to spend your credits until the end of your billing period.
		
					</p>
					
				
        </AccordionBody>
      </Accordion>
    </Fragment>

	
			</div>
			</div>
			
		</div>
	);
}
