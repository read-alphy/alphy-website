import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileAudio } from 'lucide-react'

export default function MyUploadsFeedItem({
  item,
  source_id,
  formattedDate,
  language_codes,
  setCollapsed,
}) {
  const isInProgress = item.summaries !== undefined &&
    item.summaries[0] !== undefined &&
    item.summaries[0].complete !== true;
    
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Link href={`/${item.source_type}/${source_id}`}>
      <Card className="overflow-hidden shadow-none border border-zinc-200 transition-all duration-300 hover:shadow-md dark:bg-zinc-800 dark:border-zinc-700 h-full relative w-full max-w-xs">
        <div className="w-full h-40 bg-blue-100 dark:bg-zinc-700 flex items-center justify-center">
          <FileAudio size={48} className="text-slate-400 dark:text-zinc-500" />
        </div>
        
        <CardHeader className="p-3 pb-0">
          {isInProgress && (
            <Badge variant="outline" className="mb-2 bg-indigo-50 text-indigo-400 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700">
              📝 IN PROGRESS
            </Badge>
          )}
          <h3 className="text-sm font-bold text-slate-700 dark:text-zinc-300 quicksand line-clamp-2">
            {truncateText(item.title, 25)}
          </h3>
        </CardHeader>
        
       
        
        <CardFooter className="p-3 pt-0 flex flex-col items-start">
          <div className="flex flex-wrap text-xs text-zinc-400 dark:text-zinc-500 quicksand font-bold w-full">
            <span className="w-full text-sm mt-1">Added: {formattedDate}</span>
            {item.summaries !== undefined && (
              <div className="w-full mt-1">
                {item.summaries.map((summary, index) => (
                  <span key={index} className={index !== 0 ? 'ml-1' : 'text-sm'}>
                    {language_codes[summary.lang]}
                    {index !== item.summaries.length - 1 && ','}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
