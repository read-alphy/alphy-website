import React from 'react';

export default function CallToAction() {
  return (
    <div className="relative mt-24 md:mt-32 py-16 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200/30 dark:bg-blue-700/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-200/30 dark:bg-purple-700/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-6 quicksand">
          Transform Your Audio Experience Today
        </h2>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-300 mb-10 max-w-3xl mx-auto">
          Join thousands of creators, researchers, and professionals who are already getting more from their audio content with Alphy.
        </p>
        
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <a 
            href="/signup" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-medium text-lg bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
          >
            Start Free Trial
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          
          <a 
            href="/demo" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-slate-700 dark:text-white font-medium text-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 ease-in-out"
          >
            Watch Demo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-slate-600 dark:text-zinc-400">Free 7-day trial</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-slate-600 dark:text-zinc-400">No credit card required</span>
          </div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-slate-600 dark:text-zinc-400">Cancel anytime</span>
          </div>
        </div>
        
        {/* Social proof */}
        <div className="mt-12 pt-10 border-t border-slate-200 dark:border-zinc-700">
          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {/* Company logos - using placeholder names, you can replace with actual logos */}
            <div className="h-8 flex items-center">
              <span className="text-xl font-bold text-slate-400 dark:text-zinc-500">ACME Corp</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-xl font-bold text-slate-400 dark:text-zinc-500">TechGiant</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-xl font-bold text-slate-400 dark:text-zinc-500">Innovate AI</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-xl font-bold text-slate-400 dark:text-zinc-500">EduLearn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 