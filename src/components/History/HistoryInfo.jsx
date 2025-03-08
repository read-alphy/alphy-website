  import { inputMessages } from '../Content/Interactive/messageBank'
  import Twitter from '../../../public/img/twitter_space.png'
  import ApplePodcast from '../../../public/img/apple_podcast_banner.png'
  import Twitch from '../../../public/img/twitchSource.png'
  import X from '../../../public/img/X.png'
  import { useState } from 'react'
  import { useRouter } from 'next/router'
  import ReactMarkdown from 'react-markdown'
  import Image from 'next/image'
  import { 
    Clock, 
    Sparkles
  } from 'lucide-react'
  import { 
    Card, 
    CardContent
  } from "@/components/ui/card"
  import HistoryCard from './HistoryCard'

  export default function HistoryDefault({ sandboxHistory, setSandboxHistory }) {
    const router = useRouter()
    
    const seeInSource = item => {
      sessionStorage.setItem('fillPrompt', JSON.stringify(item))
      router.push(`/${item.source_type}/${item.source_id}`)
    }

    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-6 w-6 text-indigo-500" />
          <h1 className="text-xl font-semibold">Creation History</h1>
        </div>
        
        <div className="border-b border-gray-200 dark:border-zinc-800 w-full mb-8"></div>
        
        
          {sandboxHistory && sandboxHistory.length === 0 ? (
            <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
              <CardContent className="pt-6 text-center">
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-indigo-500" />
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  Anything you'll create with Playground will appear here.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  Switch to the Playground mode on any source page to create content with AI.
                </p>
                <div className="flex justify-center">
                  <video
                    className="rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-md max-w-[650px]"
                    autoPlay
                    loop
                    muted
                  >
                    <source src="/img/playground_demo.mp4" type="video/mp4" />
                  </video>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {sandboxHistory.map((item, index) => (
                <HistoryCard 
                  key={index}
                  item={item}
                  index={index}
                  onViewSource={seeInSource}
                />
              ))}
            </div>
          )}
        
      </div>
    )
  }
