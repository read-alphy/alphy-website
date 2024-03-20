import { Fragment, useState } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'
import Logo from '../../../public/img/ALPHY_BG_REMOVED_LIGHT.png'
import LogoBlack from '../../../public/img/ALPHY_BG_REMOVED_DARK.png'
import Image from 'next/image'

export default function AboutInfo() {
  const [open, setOpen] = useState(1)

  const handleOpen = value => {
    setOpen(open === value ? 0 : value)
  }
  return (
    <div className="flex flex-col">
      <div className="hidden sm:flex flex-row flex  md:w-800 w-full flex  justify-center dark:bg-darkMode dark:text-zinc-300 ">
        <Image src={Logo} width={70} className="hidden dark:block"
        alt="Alphy Logo"
        
        
        ></Image>
        <Image
          src={LogoBlack}
          width={70}
          className="dark:hidden opacity-80 "
          alt="Alphy Logo"
        ></Image>
        <h2 className="ml-2 mt-4 text-4xl font-bold">ALPHY</h2>
      </div>

      <div
        className="mx-auto md:w-800 w-full flex  justify-center text-blueLike dark:bg-darkMode dark:text-zinc-300 bg-white"
        id="about"
      >
        <div
          id="about"
          className="px-4 container w-5/6 max-w-4xl mt-20 pb-20 text-l lg:text-l"
        >
          <h2 className="text-2xl mb-5 underline font-averta-semibold">
            About Alphy
          </h2>
          <Fragment>
            <Accordion className="cursor-default" open={true}>
              <AccordionHeader
                className="cursor-default font-averta-semibold"
                onClick={() => handleOpen(1)}
              >
                What is Alphy?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="text-l dark:text-zinc-300 font-averta-regular">
                Alphy is a set of AI tools designed to help users interact with
              online and offline audiovisual content as easily and effectively
              as possible. 
              <br/>
              <br/>
              We use AI to transcribe, summarize, question, and let users
              create new written content on top of videos and
              recordings. 
                </p>
              </AccordionBody>
            </Accordion>

            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default font-averta-semibold"
                onClick={() => handleOpen(3)}
              >
                How does Alphy work?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  Upon submitting a link or uploading a recording, Alphy creates
                  the transcription, summary, key takeaways, and a mini AI
                  assistant for the content.
                  <br />
                  <br />
                  Then you can combine these content to create your AI-assisted
                  search engines as effortlessly as building a playlist (we call
                  them Arcs) that will answer your questions based on the corpus
                  of content you have curated.
                </p>
              </AccordionBody>
            </Accordion>

            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default font-averta-semibold"
                onClick={() => handleOpen(2)}
              >
                What kind of content can I use Alphy with?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                You can use Alphy on YouTube
              videos, Twitter / X Spaces, Twitter / X videos, Twitch recordings,
              Apple Podcasts, and your local audio files (.mp3, .m4a, .mpga,
              .mpeg, .wav, or .webm).
                </p>
              </AccordionBody>
            </Accordion>

            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default font-averta-semibold"
                onClick={() => handleOpen(4)}
              >
                Can I upload local audio files for processing?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  Yes. When you upload files to Alphy, we handle them the same
                  way as we do with your online submissions. The key difference
                  is that your uploads are kept private, ensuring they remain
                  accessible only to you.
                  <br />
                  <br />
                  We respect your privacy and do not retain your audio files.
                  After real-time processing, they are deleted. If you ever want
                  to remove the processed results, simply reach us at{' '}
                  <span className="underline">support@alphy.app</span>.
                </p>
              </AccordionBody>
            </Accordion>
            
            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default font-averta-semibold"
                onClick={() => handleOpen(4)}
              >
                What are Arcs?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  An Arc represents Alphy's AI-enhanced search engine for
                  audiovisual content.
                  <br />
                  <br />
                  Using Arcs, you can categorize and search through vast amounts
                  of audio content, organized by specific subjects, creators, or
                  topics. It's like music playlists, but for learning from
                  countless hours of material.
                </p>
              </AccordionBody>
            </Accordion>

            <div
              id="about"
              className="container w-5/6 max-w-4xl mt-20  text-l lg:text-l"
            >
              <h2 className="text-2xl mb-5 underline font-averta-semibold">
                Subscription & Billing
              </h2>
            </div>
            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default font-averta-semibold"
                onClick={() => handleOpen(4)}
              >
                What does Premium offer?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  See{' '}
                  <a
                    className="underline text-green-300 font-averta-semibold"
                    href="/plans"
                  >
                    here
                  </a>{' '}
                  to learn detailed info about Alphy's plans.
                </p>
              </AccordionBody>
            </Accordion>

            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default font-averta-semibold"
                onClick={() => handleOpen(4)}
              >
                What happens to my credits if I cancel my subscriptions?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  If you want to cancel your subscription, you can do so at any
                  time. You will be able to spend your credits until the end of
                  your billing period.
                </p>
              </AccordionBody>
            </Accordion>
          </Fragment>
        </div>
      </div>
    </div>
  )
}
