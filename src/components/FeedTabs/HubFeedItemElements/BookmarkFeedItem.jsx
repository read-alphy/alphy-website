import { BookmarkX, RotateCcw } from 'lucide-react'
import axios from 'axios'
import Link from 'next/link'
import { API_URL } from '../../../constants'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BookmarkFeedItem({
  item,
  index,
  source_id,
  imageUrl,
  language_codes,
  currentUser,
  setRemoved,
  removed,
  sideFeed,
  setCollapsed,
}) {
  const removeBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    axios
      .patch(
        `${API_URL}/sources/${item.source_type}/${item.source_id}/bookmark?bookmark=false`,
        {},
        {
          headers: {
            accept: 'application/json',
            'id-token': currentUser.accessToken,
          },
        }
      )
      .then(response => {
        setRemoved(!removed)
      })
  }

  const isInProgress = item.summaries !== undefined &&
    item.summaries[0] !== undefined &&
    item.summaries[0].complete !== true;

  return (
    <Link href={`/${item.source_type}/${source_id}`}>
      <Card className="overflow-hidden shadow-none transition-all duration-300 hover:shadow-md dark:bg-zinc-800 dark:border-zinc-700 h-full relative">
        <div
          className="w-full h-40 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${typeof imageUrl === "object" ? imageUrl.src : imageUrl})`,
          }}
        />
        
        <div className="absolute top-2 right-2">
          {removed ? (
            <RotateCcw
              onClick={removeBookmark}
              className="cursor-pointer text-white bg-slate-700/70 p-1 rounded-md hover:bg-slate-700/90"
              size={24}
            />
          ) : (
            <BookmarkX
              onClick={removeBookmark}
              className="cursor-pointer text-white bg-slate-700/70 p-1 rounded-md hover:bg-slate-700/90"
              size={24}
            />
          )}
        </div>
        
        <CardHeader className="p-3 pb-0">
          {isInProgress && (
            <Badge variant="outline" className="mb-2 bg-indigo-50 text-indigo-400 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700">
              📝 IN PROGRESS
            </Badge>
          )}
          <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300 quicksand line-clamp-2">
            {item.title}
          </h3>
        </CardHeader>
        
        <CardContent className="p-3 pt-1">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 quicksand font-bold">
            {item.creator_name}
          </p>
        </CardContent>
        
        <CardFooter className="p-3 pt-0 flex flex-col items-start">
          <div className="flex flex-wrap text-xs text-zinc-400 dark:text-zinc-500 quicksand font-bold">
            {item.summaries !== undefined &&
              item.summaries.map((summary, index) => (
                <span key={index} className={index !== 0 ? 'ml-1' : 'text-sm'}>
                  {language_codes[summary.lang]}
                  {index !== item.summaries.length - 1 && ','}
                </span>
              ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
