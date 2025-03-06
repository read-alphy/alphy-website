import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import Loading from '../../../../Loading';
import { Lightbulb, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Summary = ({
  isLoading,
  summaryArray,
  summary,
  working,
  handleClickTimestamp,
  convertTimeToSeconds,
  keyTakeaways,
  data
}) => {
  if (isLoading) {
    return <Loading />;
  }

  // No summary available yet
  if (summaryArray.length === 0) {
    return (
      <div className="overflow-auto text-l text-slate-500 dark:text-slate-200 quicksand font-bold max-w-screen-md mx-auto text-center flex flex-col">
        {summary === undefined || summary.length === 0
          ? "This content doesn't have a summary. Check out the transcript!"
          : 'Summary is being generated. Meanwhile, check the transcript.'}
        {summary !== undefined && summary.length !== 0 && (
          <Image
            className="opacity-70 dark:opacity-90 mx-auto mt-4"
            src={working}
            width={80}
            height={80}
            alt="Loading summary"
          />
        )}
      </div>
    );
  }

  // Render Key Takeaways at the top
  const KeyTakeawaysSection = ({data}) => {
    if (!keyTakeaways || keyTakeaways.length === 0) return null;
    
    // Always show 5 takeaways or all if less than 5
    const displayedTakeaways = keyTakeaways.slice(0, 5);
    
    return (
      <Card className="mb-6 border border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 shadow-none">
        <CardHeader className="pb-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40">
          <CardTitle className="flex items-center text-lg font-semibold text-indigo-800 dark:text-indigo-300">
            <Lightbulb className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" strokeWidth={2} />
            Key Takeaways
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="flex flex-row ">
          <ul className="space-y-2">
            {displayedTakeaways.map((takeaway, index) => (
              <li 
                key={index}
                className="flex items-start animate-pulse-slow"
              >
                <Badge variant="outline" className="mr-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700 shadow-sm shadow-indigo-200/50 dark:shadow-indigo-900/30">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {index + 1}
                </Badge>
                <span className="quicksand font-medium text-black dark:text-slate-200 text-sm">{takeaway}</span>
              </li>
            ))}
          </ul>

         {/*  {data?.source_type === 'yt' && data?.source_id && (
          <div className="mb-4">
            <img 
              src={`https://i.ytimg.com/vi/${data.source_id}/hqdefault.jpg`} 
              alt={data?.title || "YouTube thumbnail"} 
              className="rounded-lg shadow-md mx-auto justify-center flex"
              width={300}
              
            />
          </div>
        )} */}
        </div>
        </CardContent>
      </Card>
    );
  };

  // String-based summary array (simple format)
  if (typeof summaryArray[0] === 'string') {
    return (
      <div className="space-y-4 overflow-auto h-full">
        <KeyTakeawaysSection data={data} />
        
        {summaryArray.map((item, index) => (
          <div className="text-black dark:text-slate-200" key={index}>
            <div className="summary-text quicksand font-bold">
              <ReactMarkdown>{item}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Object-based summary array (structured format with timestamps)
  return (
    <div className="space-y-6 overflow-auto h-full">
      <KeyTakeawaysSection data={data}/>
      
   
      
      {Object.values(summaryArray).map((item, index) => (
        <div className="text-slate-800 dark:text-slate-200 quicksand rounded-lg  transition-colors" key={index}>
          <div className="py-4">
            <h3
              className="text-xl mb-1 quicksand font-bold underline text-black cursor-pointer dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              onClick={() => handleClickTimestamp(item.at)}
            >
              {item.title}
            </h3>
            <h5 
              onClick={() => handleClickTimestamp(item.at)} 
              className="mb-2 cursor-pointer text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
            >
              {formatTimestamp(item.at, convertTimeToSeconds)}
            </h5>
            <div className="space-y-3 mt-3">
              {item.summary.split('\n').map((paragraph, paraIndex) => (
                <div
                  key={paraIndex}
                  className="quicksand font-normal text-black dark:text-slate-300 text-md"
                >
                  <ReactMarkdown className="react-markdown-edit quicksand">{paragraph}</ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to format timestamps
const formatTimestamp = (time, convertTimeToSeconds) => {
  let seconds;
  
  if (typeof time === 'string' && time.match(/^PT/)) {
    seconds = convertTimeToSeconds(time);
  } else {
    seconds = time;
  }
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${secs < 10 ? `0${secs}` : secs}`;
};

export default Summary;