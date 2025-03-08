// create a 404 page
import Link from 'next/link'
import Smiley from '../../../public/img/smiling_robot.png'
import Image from 'next/image'
import { Home, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function NotFoundInfo() {
  return (
    <div className="flex flex-col items-center w-full justify-center text-slate-700 dark:bg-darkMode dark:text-zinc-300 text-center h-[90vh]">
      <Card className="w-full max-w-md bg-transparent border-none shadow-none">
        <CardHeader className="space-y-1">
          <Image 
            src={Smiley} 
            className="opacity-70 saturate-50 mx-auto mb-4" 
            alt="smiling robot" 
            width={400}
            height={400}
          />
          <CardTitle className="text-4xl font-averta-semibold">Oops!</CardTitle>
          <CardDescription className="text-lg text-zinc-700 dark:text-zinc-300">
            Sorry, we couldn't find the page you were looking for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row justify-center gap-4 mt-6">
            <Button variant="outline" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home size={16} />
                Go Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild>
              <a href="https://x.com/alphyapp" className="flex items-center gap-2">
                <MessageCircle size={16} />
                Reach Us
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
