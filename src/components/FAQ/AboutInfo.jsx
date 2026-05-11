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
        className="mx-auto md:w-800 w-full flex  justify-center text-slate-700 dark:bg-darkMode dark:text-zinc-300 bg-white"
        id="about"
      >
        <div
          id="about"
          className="px-4 container w-5/6 max-w-4xl mt-20 pb-20 text-l lg:text-l"
        >
          <h2 className="text-2xl mb-5 underline quicksand font-bold">
            About Alphy
          </h2>
          <Fragment>
            <Accordion className="cursor-default" open={true}>
              <AccordionHeader
                className="cursor-default quicksand font-bold"
                onClick={() => handleOpen(1)}
              >
                What is Alphy?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="text-l dark:text-zinc-300 font-averta-regular">
                Alphy is now a read-only archive for previously processed
              audiovisual content.
              <br/>
              <br/>
              Existing summaries and transcripts remain available, but new
              processing and AI interactions have been disabled.
                </p>
              </AccordionBody>
            </Accordion>

            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default quicksand font-bold"
                onClick={() => handleOpen(3)}
              >
                How does Alphy work?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  Alphy previously generated transcripts, summaries, and key
                  takeaways for submitted audiovisual content. The service is
                  now read-only, so existing materials can be browsed without
                  creating new processing jobs.
                </p>
              </AccordionBody>
            </Accordion>

            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default quicksand font-bold"
                onClick={() => handleOpen(2)}
              >
                What kind of content can I use Alphy with?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                Existing public materials from supported platforms remain
              available in the archive.
                </p>
              </AccordionBody>
            </Accordion>

            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default quicksand font-bold"
                onClick={() => handleOpen(4)}
              >
                Can I upload local audio files for processing?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  No. Uploads have been disabled as part of the service
                  wind-down.
                </p>
              </AccordionBody>
            </Accordion>
            
            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default quicksand font-bold"
                onClick={() => handleOpen(4)}
              >
                Are Arcs still available?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  No. Arcs have been removed as part of the wind-down.
                </p>
              </AccordionBody>
            </Accordion>

            <div
              id="about"
              className="container w-5/6 max-w-4xl mt-20  text-l lg:text-l"
            >
              <h2 className="text-2xl mb-5 underline quicksand font-bold">
                Subscription & Billing
              </h2>
            </div>
            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default quicksand font-bold"
                onClick={() => handleOpen(4)}
              >
                Can I subscribe to Alphy?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  No. New subscriptions are no longer available. Alphy is
                  being kept online as a read-only archive for existing public
                  materials.
                </p>
              </AccordionBody>
            </Accordion>

            <Accordion className="mt-6" open={true}>
              <AccordionHeader
                className="cursor-default quicksand font-bold"
                onClick={() => handleOpen(4)}
              >
                Can I buy more credits?
              </AccordionHeader>
              <AccordionBody className="text-md dark:text-zinc-300">
                <p className="font-averta-regular">
                  No. Credit purchases and new processing have been disabled.
                </p>
              </AccordionBody>
            </Accordion>
          </Fragment>
        </div>
      </div>
    </div>
  )
}
