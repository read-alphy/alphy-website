import { Fragment, useState, useCallback, memo } from 'react'
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react'

// Extracting FAQ data into separate arrays for better organization
const generalFAQs = [
  {
    id: 1,
    question: "What is Alphy?",
    answer: (
      <>
        Alphy is now a read-only archive for previously processed
        audiovisual content.
        <br/><br/>
        Existing summaries and transcripts remain available, but new
        processing and AI interactions have been disabled.
      </>
    )
  },
  {
    id: 2,
    question: "How does Alphy work?",
    answer: (
      <>
        Alphy previously generated transcripts, summaries, and takeaways
        for submitted audiovisual content. The service is now read-only,
        so those existing materials can be browsed without creating new
        processing jobs.
      </>
    )
  },
  {
    id: 3,
    question: "What kind of content can I use Alphy with?",
    answer: (
      <>
        Existing public materials from supported platforms remain
        available in the archive.
      </>
    )
  },
  {
    id: 4,
    question: "Can I upload local audio files for processing?",
    answer: (
      <>
        No. Uploads have been disabled as part of the service wind-down.
      </>
    )
  },
  {
    id: 5,
    question: "Can I download the transcripts?",
    answer: (
      <>
        Existing transcript downloads remain available where the original
        content page supports them.
      </>
    )
  },
  {
    id: 6,
    question: "Are Arcs still available?",
    answer: (
      <>
        No. Arcs have been removed as part of the wind-down.
      </>
    )
  }
];

const subscriptionFAQs = [
  {
    id: 7,
    question: "Can I subscribe to Alphy?",
    answer: (
      <>
        No. New subscriptions are no longer available. Alphy is being kept
        online as a read-only archive for existing public materials.
      </>
    )
  },
  {
    id: 8,
    question: "Can I buy more credits?",
    answer: (
      <>
        No. Credit purchases and new processing have been disabled.
      </>
    )
  },
  {
    id: 9,
    question: "Can I get a refund?",
    answer: (
      <>
        Reach us at <span className="underline">support@alphy.app</span> for account or billing questions.
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
          <span className="text-indigo-500 text-lg" aria-hidden="true">●</span>
          <span className="quicksand font-bold text-lg">{question}</span>
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
      className="px-4 scroll-smooth container max-w-4xl mt-20 pb-20 text-sm md:text-base text-zinc-700 dark:text-zinc-300"
    >
      <h2 className="text-xl mb-8 border-b pb-2 quicksand font-bold">
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
        <h2 className="text-xl  quicksand font-bold">
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
