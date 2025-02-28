import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function LanguagePreview() {
  const prefersReducedMotion = useReducedMotion();
  
  const scrollToLanguages = () => {
    document.getElementById('languages')?.scrollIntoView({ 
      behavior: prefersReducedMotion ? 'auto' : 'smooth' 
    });
  };

  // Featured languages for header display
  const featuredLanguages = [
    { language: 'English', country_code: 'gb' },
    { language: 'Spanish', country_code: 'es' },
    { language: 'French', country_code: 'fr' },
    { language: 'German', country_code: 'de' },
    { language: 'Chinese', country_code: 'cn' },
    { language: 'Arabic', country_code: 'sa' },
    { language: 'Turkish', country_code: 'tr' },
    { language: 'Japanese', country_code: 'jp' },
    { language: 'Portuguese', country_code: 'pt' },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerFlags = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const flagAnimation = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <motion.section 
      className="mt-8 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center text-slate-600 dark:text-zinc-300 text-lg">
        <span className="quicksand font-medium">Transcribe and analyze content in</span>
        <button
          onClick={scrollToLanguages}
          className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 
                     font-medium cursor-pointer mt-1 sm:mt-0 sm:ml-1.5 quicksand focus:outline-none 
                     focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 
                     rounded px-1 transition-colors"
          aria-label="View all 40+ supported languages"
        >
          40+ languages
        </button>
      </div>

      <motion.div 
        className="flex flex-row mt-4 overflow-x-auto pb-2 gap-2 md:gap-3"
        variants={staggerFlags}
      >
        {featuredLanguages.map((language, index) => (
          <motion.div 
            key={index}
            className="relative flex-shrink-0"
            variants={flagAnimation}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img
              className="rounded-full object-cover w-10 h-10 border-2 border-white dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
              src={`https://flagcdn.com/w80/${language.country_code}.png`}
              alt={`${language.language} flag`}
              loading="lazy"
              width="40"
              height="40"
            />
            <span className="sr-only">{language.language}</span>
          </motion.div>
        ))}
        <motion.div 
          variants={flagAnimation}
          className="flex items-center justify-center rounded-full w-10 h-10 aspect-square bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/50 dark:to-indigo-900/50 
                     text-sky-800 dark:text-sky-200 text-xs font-medium border-2 border-white dark:border-zinc-800 shadow-sm"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          +30
        </motion.div>
      </motion.div>
    </motion.section>
  );
}