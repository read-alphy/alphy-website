import { Fragment, useState, useCallback, memo } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'
import Link from 'next/link'

// Extracting FAQ data into separate arrays for better organization
const generalFAQs = [
  {
    id: 1,
    question: "What is Alphy?",
    answer: (
      <>
        Alphy is a set of AI tools designed to help users interact with
        online and offline audiovisual content as easily and effectively
        as possible.
        <br/><br/>
        We use AI to transcribe, summarize, question, and let users
        create new written content on top of videos and
        recordings.
      </>
    )
  },
  {
    id: 2,
    question: "How does Alphy work?",
    answer: (
      <>
        Upon submitting a link or uploading a recording, Alphy creates the
        transcription, summary, key takeaways, and a mini AI assistant for
        the content.
        <br /><br />
        Then you can combine these content to create your AI-assisted
        search engines as effortlessly as building a playlist (we call
        them Arcs) that will answer your questions based on the corpus of
        content you have curated.
      </>
    )
  },
  {
    id: 3,
    question: "What kind of content can I use Alphy with?",
    answer: (
      <>
        You can use Alphy on YouTube
        videos, Twitter / X Spaces, Twitter / X videos, Twitch recordings,
        Apple Podcasts, and your local audio files (.mp3, .m4a, .mpga,
        .mpeg, .wav, or .webm).
      </>
    )
  },
  {
    id: 4,
    question: "Can I upload local audio files for processing?",
    answer: (
      <>
        Yes. When you upload files to Alphy, we handle them the same way
        as we do with your online submissions. The key difference is that
        your uploads are kept private, ensuring they remain accessible
        only to you.
        <br /><br />
        We respect your privacy and do not retain your audio files. After
        real-time processing, they are deleted. If you ever want to remove
        the processed results, reach us at{' '}
        <span className="underline">support@alphy.app</span>.
      </>
    )
  },
  {
    id: 5,
    question: "Can I download the transcripts?",
    answer: (
      <>
        Yes. If you are a Premium user, you can download the transcripts in subtitle (.srt) or text (.txt) format.
      </>
    )
  },
  {
    id: 6,
    question: "What are Arcs?",
    answer: (
      <>
        An Arc represents Alphy's AI-enhanced search engine for
        audiovisual content.
        <br /><br />
        Using Arcs, you can categorize and search through vast amounts of
        audio content, organized by specific subjects, creators, or
        topics. It's like music playlists, but for learning from countless
        hours of material.
        <br /><br />
        <Link href="/arcs" className="underline text-indigo-300">Check out the free Arcs by us.</Link>
      </>
    )
  }
];

const subscriptionFAQs = [
  {
    id: 7,
    question: "What does Premium offer?",
    answer: (
      <>
        More hours, uploads, full access to Alphy's capabilities. See our {' '}
        <a
          className="underline text-indigo-300 quicksand font-bold"
          href="/plans"
        >
          pricing page
        </a>{' '}
        to learn more about it
      </>
    )
  },
  {
    id: 8,
    question: "What happens to my credits if I cancel my subscriptions?",
    answer: (
      <>
        If you want to cancel your subscription, you can do so at any
        time. You will be able to spend your credits until the end of your
        billing period.
      </>
    )
  },
  {
    id: 9,
    question: "Can I get a refund?",
    answer: (
      <>
        Yes. Simply reach us at <span className="underline">support@alphy.app</span> and we'll reimburse you for the remaining credits on your account.
      </>
    )
  }
];

// Memoized accordion item component for better performance
const FAQItem = memo(({ id, question, answer, isOpen, onToggle }) => {
  // Generate unique IDs for accessibility
  const headerId = `faq-header-${id}`;
  const bodyId = `faq-body-${id}`;
  
  return (
    <Accordion 
      className="mt-4 border border-slate-200 dark:border-zinc-700 rounded-xl p-4 transition-all duration-300" 
      open={isOpen}
    >
      <AccordionHeader
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={bodyId}
        className="cursor-pointer quicksand font-bold flex items-center text-left border-none"
        onClick={() => onToggle(id)}
      >
        <span className="quicksand font-bold w-fit flex items-center gap-2">
          <span className="text-indigo-500 text-xl" aria-hidden="true">●</span>
          <span className="quicksand font-bold text-xl">{question}</span>
        </span>
      </AccordionHeader>
      <AccordionBody 
        id={bodyId}
        aria-labelledby={headerId}
        className="text-md dark:text-zinc-300"
      >
        <p className="quicksand font-normal">
          {answer}
        </p>
      </AccordionBody>
    </Accordion>
  );
});

// Give the component a display name for better debugging
FAQItem.displayName = 'FAQItem';

export default function AboutMainPage() {
  // State to track which accordions are open
  const [openItems, setOpenItems] = useState({});

  // Toggle function with proper state management
  const handleToggle = useCallback((id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  return (
    <div
      id="about"
      className="px-4 scroll-smooth container max-w-4xl mx-auto mt-20 pb-20 text-base md:text-lg text-zinc-700 dark:text-zinc-300"
    >
      <h2 className="text-2xl md:text-3xl mb-8 border-b pb-2 quicksand font-bold">
        Frequently Asked Questions
      </h2>
      
      <div className="space-y-6" role="region" aria-label="General FAQ Section">
        {generalFAQs.map((faq) => (
          <FAQItem
            key={faq.id}
            id={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openItems[faq.id] || false}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <div
        id="subscription"
        className="mt-20 mb-8 border-b pb-2"
      >
        <h2 className="text-2xl md:text-3xl quicksand font-bold">
          Subscription & Billing
        </h2>
      </div>
      
      <div className="space-y-6" role="region" aria-label="Subscription FAQ Section">
        {subscriptionFAQs.map((faq) => (
          <FAQItem
            key={faq.id}
            id={faq.id}
            question={faq.question}
            answer={faq.answer}
            isOpen={openItems[faq.id] || false}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  )
}