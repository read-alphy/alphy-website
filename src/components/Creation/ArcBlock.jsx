import React from 'react';
import Link from 'next/link';
import { Plus, Compass, ArrowRight } from 'lucide-react';

export default function ArcBlock({
  currentUser,
  tier
}) {
  return (
    <div className="p-6 md:p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Create or discover Arcs
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Combine multiple sources into a unified knowledge base
          </p>
        </div>

        {/* Create Arc Card */}
        <Link href="/arc/createArc" className="block group">
          <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-gray-200 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-gradient-to-br from-gray-50 to-white dark:from-zinc-800/50 dark:to-zinc-900 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Create New Arc
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  Connect multiple audio content with AI to create a curated experience
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                  Get Started <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Explore Arcs Card */}
        <div className="pt-4 border-t border-gray-100 dark:border-zinc-700">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <Compass className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-grow">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Arcs allow you to connect multiple pieces of content together to create a cohesive learning experience.
              </p>
              <Link 
                href="/explore" 
                className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              >
                Explore all Arcs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
