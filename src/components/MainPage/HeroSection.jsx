import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import LanguagePreview from './LanguagePreview';


export default function HeroSection({ currentUser }) {
  const prefersReducedMotion = useReducedMotion();
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const slideUp = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { y: 30, opacity: 0 },
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
      className="relative pt-8 md:pt-16 lg:pt-24 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 20">
          <defs>
            <pattern id="wavePattern" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 C30,15 70,5 100,10 L100,0 L0,0 Z" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wavePattern)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="max-w-3xl">
          <motion.div 
            className="inline-block px-4 py-1 mb-4 bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-100 text-sm font-medium rounded-full"
            variants={slideUp}
          >
            Powered by state-of-the-art AI
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-zinc-100 quicksand leading-tight"
            variants={slideUp}
          >
            Turn <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold">audio to text</span>, summarize, and generate content with AI
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 dark:text-zinc-300 mt-6 quicksand max-w-2xl"
            variants={slideUp}
          >
            Join the Alphy community to transcribe, summarize, and create content 
            with the highest quality AI models on the market.
          </motion.p>

          {/* Social proof */}
          <motion.div 
            className="flex items-center mt-6 text-sm text-slate-500 dark:text-zinc-400"
            variants={slideUp}
          >
            <span className="font-medium">Trusted by 15,000+ users</span>
            <span className="mx-2">•</span>
            <span>500,000+ hours processed</span>
          </motion.div>

         

          {/* Key benefits */}
          <motion.ul 
            className="mt-6 space-y-2"
            variants={staggerChildren}
          >
            {[
              "Transcribe with 98% accuracy in 100+ languages",
              "Generate summaries, insights, and follow-up content",
              "Collaborate and share with your team or community"
            ].map((benefit, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                variants={slideUp}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-700 dark:text-zinc-300">{benefit}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-8"
            variants={staggerChildren}
          >
            <motion.div variants={slideUp}>
              <Link
                href={`${currentUser ? '/submit' : '/u/register'}`}
                onClick={() => {
                  if (currentUser) {
                    localStorage.setItem('newItem', 'link');
                  }
                }}
                className="rounded-lg text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700
                           px-6 py-3.5 font-medium flex items-center transition 
                           duration-300 ease-in-out hover:-translate-y-1 transform shadow-lg hover:shadow-xl"
                aria-label={currentUser ? 'Submit a link' : 'Start for free'}
              >
                {currentUser ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
                {currentUser ? 'Submit a Link' : 'Start for Free'}
              </Link>
            </motion.div>
            

            <motion.div variants={slideUp}>
              {currentUser ? (
                <Link
                  href="/submit"
                  onClick={() => localStorage.setItem('newItem', 'upload')}
                  className="rounded-lg text-zinc-800 dark:text-zinc-200 border border-slate-300 
                             dark:border-zinc-700 hover:border-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 px-6 py-3.5 font-medium 
                             flex items-center transition duration-300 ease-in-out 
                             hover:translate-x-1 transform"
                  aria-label="Upload from device"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <span className="hidden sm:inline">Upload from Device</span>
                  <span className="sm:hidden">Upload</span>
                </Link>
              ) : (
                <Link
                  href="/explore"
                  className="rounded-lg text-zinc-800 dark:text-zinc-200 border border-slate-300 
                             dark:border-zinc-700 hover:border-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 px-6 py-3.5 font-medium 
                             flex items-center transition duration-300 ease-in-out 
                             hover:translate-x-1 transform"
                  aria-label="See examples"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mr-2 feather feather-compass"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                  See Examples
                </Link>
              )}
            </motion.div>

            {/* Language Preview Component */}
            <LanguagePreview />
            
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div 
          className="hidden lg:flex lg:w-2/5 flex-shrink-0"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-br from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 p-4 rounded-2xl shadow-xl">
            <svg 
              className="w-full h-auto"
              viewBox="0 0 400 300" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Waveform visualization representing audio */}
              <g className="opacity-50">
                {[...Array(20)].map((_, i) => (
                  <rect 
                    key={i} 
                    x={20 * i + 5} 
                    y={150 - (Math.sin(i * 0.5) * 50 + Math.random() * 30)} 
                    width="6" 
                    height={(Math.sin(i * 0.5) * 50 + Math.random() * 30) * 2} 
                    rx="2"
                    className="fill-sky-500 dark:fill-sky-400"
                  />
                ))}
              </g>
              
              {/* Text document representation */}
              <rect x="80" y="50" width="240" height="200" rx="8" className="fill-white dark:fill-zinc-800 shadow-md" />
              
              {/* Document content lines */}
              <rect x="100" y="80" width="200" height="6" rx="3" className="fill-slate-300 dark:fill-zinc-600" />
              <rect x="100" y="100" width="180" height="6" rx="3" className="fill-slate-300 dark:fill-zinc-600" />
              <rect x="100" y="120" width="160" height="6" rx="3" className="fill-slate-300 dark:fill-zinc-600" />
              <rect x="100" y="140" width="200" height="6" rx="3" className="fill-slate-300 dark:fill-zinc-600" />
              <rect x="100" y="160" width="140" height="6" rx="3" className="fill-slate-300 dark:fill-zinc-600" />
              <rect x="100" y="180" width="180" height="6" rx="3" className="fill-slate-300 dark:fill-zinc-600" />
              <rect x="100" y="200" width="160" height="6" rx="3" className="fill-slate-300 dark:fill-zinc-600" />
              
              {/* Play button indicating audio */}
              <circle cx="320" cy="40" r="16" className="fill-indigo-500" />
              <path d="M316 32L328 40L316 48V32Z" className="fill-white" />
            </svg>
            
            {/* Animation elements for added interactivity */}
            <motion.div 
              className="absolute bottom-8 right-8 w-20 h-20 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 opacity-80"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.8, 0.4, 0.8]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />

           
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}