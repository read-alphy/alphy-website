import React from 'react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <div className="relative mt-24 md:mt-32 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-slate-50/80 dark:bg-zinc-900/40"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400 mb-4">
          Service wind-down
        </p>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 quicksand">
          Alphy is staying online as a read-only archive.
        </h2>

        <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-300 mb-10 max-w-3xl mx-auto">
          New subscriptions, uploads, and AI interactions are no longer available.
          Existing users can continue to read previously processed transcripts,
          summaries, and source pages while the archive remains online.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-medium text-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
          >
            Browse Archive
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>

          <Link
            href="/u/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-slate-700 dark:text-white font-medium text-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
          >
            Existing User Sign In
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1H6v3H3v-3.586l3.257-3.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {[
            "No new subscriptions",
            "No new processing",
            "Existing materials remain readable"
          ].map((item) => (
            <div key={item} className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-slate-600 dark:text-zinc-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
