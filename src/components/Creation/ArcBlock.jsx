import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ArcBlock({
  currentUser,
  tier
}) {
  return (
    <div className="p-6 rounded-xl">
      <div className="space-y-10">
        {/* Title with subtle accent */}
        <div className="">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Create or discover Arcs
          </h3>
          <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-blue-500 dark:bg-blue-400"></div>
        </div>

        {/* Arc Card */}
        <div className="mt-20">
          <Link href="/arc/createArc">
            <Card className="h-full flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300 border-dashed border-2 dark:bg-zinc-800/50 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500 group">
              <CardContent className="flex flex-col items-center justify-center h-full pt-6">
                <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/40 transition-colors">
                  <Plus className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-zinc-100 mb-2 quicksand">Create New Arc</h3>
                <p className="text-sm font-normal text-slate-600 dark:text-zinc-400 max-w-[200px]">
                  Connect multiple audio content with AI to create a curated experience.
                </p>
              </CardContent>
              <CardFooter className="w-full pt-0">
                <div className="w-full flex justify-center">
                  <Badge className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300 border-none group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/60 transition-colors">
                    Get Started
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* Description */}
        <div className="pt-20">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Arcs allow you to connect multiple pieces of content together to create a cohesive learning experience. 
            Create your own Arc or explore Arcs created by others.
          </p>
          
          <div className="mt-4">
            <Link 
              href="/explore" 
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
            >
              Explore all Arcs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
