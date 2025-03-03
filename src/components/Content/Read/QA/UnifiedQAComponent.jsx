import { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ChevronUp, ChevronDown, RefreshCw, Copy } from 'lucide-react'



// Utility functions moved to separate file for reusability
const formatUtils = {
  convertTimeToSeconds(time) {
    if (typeof time === 'string' && time.match(/^PT/)) {
      const matches = time.match(/PT(\d+H)?(\d+M)?(\d+(?:\.\d+)?S)?/);
      let seconds = 0;
      
      if (matches[1]) seconds += parseInt(matches[1]) * 3600;
      if (matches[2]) seconds += parseInt(matches[2]) * 60;
      if (matches[3]) seconds += parseFloat(matches[3]);
      
      return seconds;
    } else if (typeof time === 'number' || (typeof time === 'string' && time.match(/^\d+(?:\.\d+)?$/))) {
      return parseFloat(time);
    }
    return null;
  },

  formatTimestamp(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = secs < 10 ? `0${secs}` : `${secs}`;
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  },
  
  formatTimeRange(start, end) {
    start = this.convertTimeToSeconds(start);
    end = this.convertTimeToSeconds(end);
    return `${this.formatTimestamp(start)} - ${this.formatTimestamp(end)}`;
  },
  
  formatTwitchTimestamp(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = secs < 10 ? `0${secs}` : `${secs}`;
    
    return `${formattedHours}h${formattedMinutes}m${formattedSeconds}s`;
  },
  
  getSourceUrl(sourceType, sourceId, startTime) {
    if (sourceType === 'yt') {
      return `https://youtu.be/${sourceId}?t=${Math.floor(startTime)}`;
    } else if (sourceType === 'tw') {
      return `https://www.twitch.com/videos/${sourceId}?t=${this.formatTwitchTimestamp(startTime)}`;
    } else if (sourceType === 'ap') {
      return `https://podcasts.apple.com/podcast/id${sourceId.split('-')[0]}?i=${sourceId.split('-')[1]}`;
    } else if (sourceType === 'sp') {
      return `https://twitter.com/i/spaces/${sourceId}`;
    }
    return '#';
  }
};

// Unified Source component for both question types
function Source({ source, sourceType, sourceId, updateVariable, handleLength, isMobile }) {
  const startTime = formatUtils.convertTimeToSeconds(source.start);
  const endTime = formatUtils.convertTimeToSeconds(source.end);
  const hasTimestamp = source.start !== null && source.start !== undefined && source.end;
  const sourceUrl = hasTimestamp ? formatUtils.getSourceUrl(sourceType, sourceId, startTime) : '#';
  
  const timeDisplay = hasTimestamp ? (
    formatUtils.formatTimeRange(source.start, source.end)
  ) : (
    "00:00:00"
  );
  
  const isVideoSource = sourceType === 'yt' || sourceType === 'tw';
  
  return (
    <div className="border border-zinc-300 dark:border-zinc-600 rounded-lg p-5 drop-shadow-sm mb-5">
      {isVideoSource && !isMobile ? (
        <div className="cursor-pointer underline" onClick={updateVariable}>
          {timeDisplay}
        </div>
      ) : (
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">
          {timeDisplay}
        </a>
      )}
      
      <div 
        className="text-slate-500 dark:text-slate-400 font-normal mt-6"
        dangerouslySetInnerHTML={{ __html: handleLength(source.text) }}
      />
    </div>
  );
}



// Question component to display a single question and its answer
function Question({ question, answer, sources, sourceType, sourceId, updateVariable, setQuestion, setAnswerData }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Truncate question if longer than 40 characters
  const displayQuestion = question.length > 60 
    ? `${question.substring(0, 57)}...` 
    : question;
  
  const handleClick = () => {
    setQuestion(question);
    
    // Create answerData object for the clicked question
    const answerData = {
      answer: answer,
      sources: sources,
      question: question
    };
    
    // Update answerData state
    setAnswerData(answerData);
    
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className="border col-span-1 border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200 shadow-sm hover:shadow "
            onMouseEnter={() => setHoveredIndex(question)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Button
              variant="ghost"
              className="w-full h-auto py-2 px-2 justify-start text-left text-slate-700 dark:text-zinc-300 quicksand text-xs sm:text-sm font-normal"
              onClick={handleClick}
            >
              <MessageSquare className="h-3 w-3 mr-1.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
              <span className="line-clamp-3 text-sm">{displayQuestion}</span>
            </Button>
          </Card>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-[300px] p-3 bg-white border border-blue-100 rounded-lg dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 shadow-lg"
        >
          <div className="text-sm">{question}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Main component for base (predefined) questions
export function QuestionsDisplay({
  setQuestion,
  questions,
  data,
  areaRefs,
  handleCopyToClipboard,
  handleLength,
  updateVariable,
  formatAnswer,
  answerData,
  setAnswerData,
  handleShowSingleSource
}) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 999);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);



  return (
    
    <div className="text-slate-700 dark:text-zinc-300 px-4">
      {answerData.answer.length == 0 &&
      <div className="flex flex-col gap-4">

        <div>
          Ask questions and get sourced answers
          </div>
      <div className=" grid grid-cols-2 flex gap-4">
        {Object.keys(questions).map((question, index) => (
          <Question
            key={index}
            question={question}
            answer={questions[question].answer}
            sources={questions[question].sources}
            sourceType={data.source_type}
            sourceId={data.source_id}
            updateVariable={updateVariable}
            handleCopyToClipboard={handleCopyToClipboard}
            formatAnswer={formatAnswer}
            handleLength={handleLength}
            isMobile={isMobile}
            setQuestion={setQuestion}
            setAnswerData={setAnswerData} // Pass the setAnswerData function
          />
        ))}
      </div>
      </div>
      }
    </div>
    
  );
}


// Redesigned DynamicQuestion component
export function DynamicQuestion({
  answerData,
  data,
  handleClear,
  handleCopyToClipboard,
  formatAnswer,
  updateVariable,
  handleLength,
  inputValue,
}) {
  const [showSources, setShowSources] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 999);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  /* if (!answerData?.answer) {
    return (
      <Alert variant="default" className="mt-4 bg-slate-50 dark:bg-zinc-800 border-blue-100 dark:border-blue-900">
        <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        <AlertDescription className="text-center py-6 text-lg font-medium">
          It seems like the content doesn't have an answer for this query. Try another one!
        </AlertDescription>
      </Alert>
    );
  } */

  return (
    <Card className="shadow-none border-none ">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Answer from Alphy
            </CardTitle>
          </div>
          
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={handleClear}
                  >
                    <RefreshCw className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Clear answer
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleCopyToClipboard('')}
                  >
                    <Copy className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Copy answer
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2 pb-4">
        <div className="text-slate-700 dark:text-slate-200 mb-6 whitespace-pre-line font-normal">
          {formatAnswer(answerData.answer, answerData)}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start pt-0 px-6 pb-6">
        <Button
          variant="outline"
          size="sm"
          className="mb-4 font-medium"
          onClick={() => setShowSources(!showSources)}
        >
          {showSources ? 'Hide sources' : 'Show sources'} 
          {showSources ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>
        
        {showSources && answerData.sources.length > 0 && (
          <div className="w-full mt-2 space-y-2">
            {answerData.sources.map((source, index) => (
              <Source
                key={index}
                source={source}
                sourceType={data.source_type}
                sourceId={data.source_id}
                updateVariable={updateVariable}
                handleLength={handleLength}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
        
        {showSources && answerData.sources.length === 0 && (
          <Alert variant="default" className="w-full bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700">
            <AlertDescription>
              No sources available for this answer.
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}