import Link from 'next/link'
import { Trophy } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MyWorksFeedItem({
  item,
  index,
  source_id,
  imageUrl,
  language_codes,
}) {
  let model_name = ''
  if (
    item.summaries !== undefined &&
    item.summaries.find(item => item.lang === 'en') !== undefined
  ) {
    model_name = item.summaries.find(item => item.lang === 'en').quality_str
  }

  const isInProgress = item.summaries !== undefined &&
    item.summaries[0] !== undefined &&
    item.summaries[0].complete !== true;

  return (
    <Link href={`/${item.source_type}/${source_id}`}>
      <Card className="overflow-hidden shadow-none transition-all duration-300 hover:shadow-md dark:bg-zinc-800 dark:border-zinc-700 h-full">
        <div
          className="w-full h-40 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${typeof imageUrl === "object" ? imageUrl.src : imageUrl})`,
          }}
        />
        
        <CardHeader className="p-3 pb-0">
          {isInProgress && (
            <Badge variant="outline" className="w-[120px] mb-2 bg-indigo-50 text-indigo-400 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700">
              📝 IN PROGRESS
            </Badge>
          )}
          <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300 quicksand line-clamp-2">
            {item.title || (item.source && item.source.title)}
          </h3>
        </CardHeader>
        
        <CardContent className="p-3 pt-1">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 quicksand font-bold">
            {item.creator_name || (item.source && item.source.creator_name)}
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
