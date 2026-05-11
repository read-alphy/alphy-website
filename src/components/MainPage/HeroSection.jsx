import React from 'react';
import Link from 'next/link';
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
      className="relative  overflow-hidden"
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
            Read-only archive
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-zinc-100 quicksand leading-tight"
            variants={slideUp}
          >
            Existing <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent text-3xl md:text-4xl lg:text-5xl font-bold">audio knowledge</span>, kept online
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-slate-600 dark:text-zinc-300 mt-6 quicksand max-w-2xl"
            variants={slideUp}
          >
            Alphy is no longer accepting new subscriptions or processing new content.
            We are keeping existing transcripts, summaries, and source pages online for
            users who already rely on them.
          </motion.p>

          {/* Social proof */}
          <motion.div 
            className="flex items-center mt-6 text-sm text-slate-500 dark:text-zinc-400"
            variants={slideUp}
          >
            <span className="font-medium">Archive access maintained for existing users</span>
            <span className="mx-2">•</span>
            <span><strong>500,000+</strong> minutes previously processed</span>
          </motion.div>

         

          {/* Key benefits */}
          <motion.ul 
            className="mt-6 hidden md:block space-y-2"
            variants={staggerChildren}
          >
            {[
              "Browse existing public transcripts and summaries",
              "Sign in to access previously processed materials",
              "New subscriptions, uploads, and AI interactions are closed"
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
                href="/explore"
                className="rounded-lg text-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 
                           px-5 py-2 font-medium flex items-center transition-all
                           duration-300 ease-in-out shadow-lg"
                aria-label="Browse archive"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                </svg>
                Browse Archive
              </Link>
            </motion.div>
            

            <motion.div variants={slideUp}>
              <Link
                href={currentUser ? "/account" : "/u/login"}
                className="rounded-lg text-md text-zinc-800 dark:text-zinc-200 border border-slate-300 
                           dark:border-zinc-700 hover:border-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800 px-6 py-1.5 font-medium 
                           flex items-center transition duration-300 ease-in-out 
                           hover:translate-x-1 transform"
                aria-label={currentUser ? "Open account" : "Sign in"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mr-2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 21a8 8 0 0 0-16 0"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {currentUser ? "Account" : "Sign In"}
              </Link>
            </motion.div>

            {/* Language Preview Component */}
            <LanguagePreview />
            
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div 
          className="hidden xl:flex lg:w-2/5 flex-shrink-0"
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
                  <motion.rect 
                    key={i} 
                    x={20 * i + 5} 
                    y={150 - (Math.sin(i * 0.5) * 50 + Math.random() * 30)} 
                    width="6" 
                    height={(Math.sin(i * 0.5) * 50 + Math.random() * 30) * 2} 
                    rx="2"
                    className="fill-sky-500 dark:fill-sky-400"
                    animate={{ 
                      height: [(Math.sin(i * 0.5) * 50 + Math.random() * 30) * 2, (Math.sin(i * 0.5) * 30 + Math.random() * 50) * 2, (Math.sin(i * 0.5) * 50 + Math.random() * 30) * 2],
                      y: [150 - (Math.sin(i * 0.5) * 50 + Math.random() * 30), 150 - (Math.sin(i * 0.5) * 30 + Math.random() * 50), 150 - (Math.sin(i * 0.5) * 50 + Math.random() * 30)]
                    }}
                    transition={{
                      duration: 2 + i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </g>
              
              {/* Text document representation */}
              <rect x="80" y="50" width="240" height="200" rx="8" className="fill-white dark:fill-zinc-800 shadow-md" />
              
              {/* Document content lines */}
              <motion.rect 
                x="100" y="80" width="200" height="6" rx="3" 
                className="fill-slate-300 dark:fill-zinc-600"
                animate={{ width: [200, 180, 200] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.rect 
                x="100" y="100" width="180" height="6" rx="3" 
                className="fill-slate-300 dark:fill-zinc-600"
                animate={{ width: [180, 200, 180] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.rect 
                x="100" y="120" width="160" height="6" rx="3" 
                className="fill-slate-300 dark:fill-zinc-600"
                animate={{ width: [160, 190, 160] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.rect 
                x="100" y="140" width="200" height="6" rx="3" 
                className="fill-slate-300 dark:fill-zinc-600"
                animate={{ width: [200, 170, 200] }}
                transition={{ duration: 4.5, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.rect 
                x="100" y="160" width="140" height="6" rx="3" 
                className="fill-slate-300 dark:fill-zinc-600"
                animate={{ width: [140, 180, 140] }}
                transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.rect 
                x="100" y="180" width="180" height="6" rx="3" 
                className="fill-slate-300 dark:fill-zinc-600"
                animate={{ width: [180, 150, 180] }}
                transition={{ duration: 3.8, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.rect 
                x="100" y="200" width="160" height="6" rx="3" 
                className="fill-slate-300 dark:fill-zinc-600"
                animate={{ width: [160, 190, 160] }}
                transition={{ duration: 4.2, repeat: Infinity, repeatType: "reverse" }}
              />
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
