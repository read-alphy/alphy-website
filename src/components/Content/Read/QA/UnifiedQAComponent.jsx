import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  User,
  BotIcon,
  RefreshCw,
  FileText,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Info,
  BotMessageSquare,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Clock,
  X
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



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


// Source component with enhanced UI
function Source({ source, sourceType, sourceId, updateVariable, handleLength, isMobile, forDialog, setSelectedSourceCard, setOpenDialog }) {
  const startTime = formatUtils.convertTimeToSeconds(source.start);
  const endTime = formatUtils.convertTimeToSeconds(source.end);
  const hasTimestamp = source.start !== null && source.start !== undefined && source.end;
  const sourceUrl = hasTimestamp ? formatUtils.getSourceUrl(sourceType, sourceId, startTime) : '#';
  const timeDisplay = hasTimestamp ? formatUtils.formatTimeRange(source.start, source.end) : "00:00:00";
  const isVideoSource = sourceType === 'yt' || sourceType === 'tw';
  
  const handleClick = () => {
    if (!forDialog) {
      setSelectedSourceCard(source);
      setOpenDialog(true);
    }
  };
  
  let imageUrl;
  if (sourceType === 'yt') {
    imageUrl = `https://i.ytimg.com/vi/${sourceId}/hqdefault.jpg`;
  } else if (sourceType === 'sp') {
    // Would need to import Twitter image
    // imageUrl = Twitter;
  }
  
  return (
    <div className="dark:bg-mildDarkMode">
      {!forDialog ? (
        <Card 
          onClick={handleClick}
          className="overflow-hidden shadow-none transition-all duration-300 dark:bg-zinc-800 dark:border-zinc-700 h-full w-[180px] sm:w-[220px] cursor-pointer"
        >
          {sourceType === 'up' && (
            <div className="w-full h-40 bg-blue-100 dark:bg-zinc-700 flex items-center justify-center">
              <FileAudio size={48} className="text-slate-400 dark:text-zinc-500" />
            </div>
          )}
          {imageUrl && (
            <div
              className="w-full h-24 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            />
          )}
          
          <CardHeader className="p-2 pb-0">
            <h3 className="text-xs font-bold text-slate-700 dark:text-zinc-300 quicksand line-clamp-1">
              {source.title || "Source"}
            </h3>
          </CardHeader>
          
          <CardContent className="p-2 pt-1">
            <a
              onClick={(e) => {
                e.stopPropagation();
                // Handle Alphy link click
              }}
              className="underline flex flex-row transform hover:scale-105 transition duration-300"
            >
              <div>
                {/* Would need to import Logo images */}
                {/* <Image
                  src={Logo}
                  className="w-[20px] h-[20px] hidden dark:flex"
                  alt="Alphy Logo"
                />
                <Image
                  src={LogoInverted}
                  className="w-[20px] h-[20px] dark:hidden"
                  alt="Alphy Logo"
                /> */}
              </div>
              <p className="ml-1 text-[10px] text-slate-600 dark:text-zinc-300 quicksand font-normal">
                See on Alphy
              </p>
            </a>
            
            <p className="mt-1 text-[10px] text-slate-600 dark:text-zinc-400 quicksand font-bold">
              {formatUtils.formatTimestamp(startTime)}
            </p>
          </CardContent>
          
          <CardFooter className="p-2 pt-0 flex flex-col items-start">
            <p className="text-[10px] text-slate-600 dark:text-zinc-400 quicksand font-normal line-clamp-3">
              {source.text}
            </p>
            <Badge variant="outline" className="mt-1 text-[8px] py-0 h-4 text-greenColor dark:text-green-200 border-green-300 dark:border-green-700">
              Click for more
            </Badge>
          </CardFooter>
        </Card>
      ) : (
        <div className="w-full">
        {/*   <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700"
            onClick={() => setOpenDialog(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button> */}
          
          <div className="py-6">
            {sourceType === 'yt' && (
              <div className="relative rounded-lg overflow-hidden mb-6">
                <iframe
                  className="w-full aspect-video mx-auto"
                  id="player"
                  title="YouTube Video Source"
                  src={`https://www.youtube.com/embed/${sourceId}?start=${startTime}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-2 sm:px-6">
                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 px-3 py-1">
                  <FileText className="h-3.5 w-3.5 mr-1.5" />
                  <span className="font-medium">Passage</span>
                </Badge>
              </div>
              
             
                <div 
                  className="p-4 text-slate-700 dark:text-zinc-300 quicksand leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: source.text }}
                ></div>
             
              
              <div className="flex justify-end px-2 sm:px-6 pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setOpenDialog(false)}
                  className="text-slate-600 dark:text-zinc-300"
                >
                  <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
                  Back to sources
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
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
          className="max-w-[300px] p-3 bg-white border border-blue-100 rounded-lg  text-slate-800 dark:text-zinc-200 shadow-lg"
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
  question,
  setQuestion,
  answerData,
  data,
  handleClear,
  handleCopyToClipboard,
  formatAnswer,
  updateVariable,
  handleLength,
  inputValue,
  handleShowSingleSource,
  showSource,
  setShowSource,
  openDialog,
  setOpenDialog,
}) {
  const [showSources, setShowSources] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedSourceCard, setSelectedSourceCard] = useState(null);
  const [feedback, setFeedback] = useState(null);
  
  const [isForwardArrowVisible, setIsForwardArrowVisible] = useState(true);
  const [isBackwardArrowVisible, setIsBackwardArrowVisible] = useState(false);
  const [showMobileCarousel, setShowMobileCarousel] = useState(false);
  const carouselRef = useRef(null);
  
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

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const isScrollEnd =
          container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        setIsForwardArrowVisible(!isScrollEnd);
        setIsBackwardArrowVisible(container.scrollLeft > 0);
      }
    };

    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', handleScroll);
      handleScroll();
    }

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [carouselRef, answerData.sources]);

  const scrollForward = () => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 640 ? 260 : 380;
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  const scrollBackward = () => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollLeft -= scrollAmount;
    }
  };


  const toggleSources = () => {
    setShowSources(!showSources);
    setShowMobileCarousel(!showMobileCarousel);
  };

  const copyToClipboard = () => {
    handleCopyToClipboard(answerData.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type) => {
    setFeedback(feedback === type ? null : type);
    // Here you would typically send feedback to your backend
  };

  const hasAnswer = answerData && answerData.answer && answerData.answer.length > 0;
  const hasSources = answerData && answerData.sources && answerData.sources.length > 0;
  
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };
  
  if (!question || !hasAnswer) return null;

  return (
    <Card className="shadow-none h-[90vh] border-0">
      <CardHeader className="pb-3 bg-slate-50 dark:from-zinc-800 dark:to-zinc-900">
        <div className="flex flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-md font-semibold text-slate-800 dark:text-slate-200">
             Conversation
            </CardTitle>
          </div>
          
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8"
                    onClick={handleClear}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    <span className="hidden sm:inline">New Question</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear current answer</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 px-4 sm:px-6">
        {/* User Question */}
        <motion.div 
          className="flex items-start gap-3"
          initial="hidden"
          animate="visible"
          variants={messageVariants}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-zinc-700 flex items-center justify-center">
            <User className="h-4 w-4 text-slate-600 dark:text-zinc-300" />
          </div>
          <div className="flex-1 max-w-[85%]">
            <div className="bg-white dark:bg-zinc-800 p-3 rounded-xl rounded-tl-none shadow-sm border border-slate-200 dark:border-zinc-700">
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                {question}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Bot Response */}
        <motion.div 
          className="flex items-start gap-3 mt-6"
          initial="hidden"
          animate="visible"
          variants={messageVariants}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
            <BotMessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 max-w-[85%]">
            <motion.div 
              className="bg-blue-50 dark:bg-zinc-800/80 p-4 rounded-xl rounded-tl-none shadow-sm border border-blue-100 dark:border-zinc-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className="prose prose-slate dark:prose-invert prose-sm max-w-none text-slate-700 dark:text-slate-300">
                {formatAnswer(answerData.answer, answerData, handleShowSingleSource)}
              </div>
              
              {/* Action buttons for the message */}
              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-blue-100/70 dark:border-zinc-700/70">
                <div className="flex items-center gap-1.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-blue-100 dark:hover:bg-zinc-700"
                          onClick={() => handleFeedback('like')}
                        >
                          <ThumbsUp className={`h-3.5 w-3.5 ${feedback === 'like' ? 'text-green-600 dark:text-green-400 fill-green-600 dark:fill-green-400' : 'text-slate-600 dark:text-slate-400'}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>This was helpful</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-blue-100 dark:hover:bg-zinc-700"
                          onClick={() => handleFeedback('dislike')}
                        >
                          <ThumbsDown className={`h-3.5 w-3.5 ${feedback === 'dislike' ? 'text-red-600 dark:text-red-400 fill-red-600 dark:fill-red-400' : 'text-slate-600 dark:text-slate-400'}`} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>This needs improvement</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <Separator orientation="vertical" className="h-5" />
                
                <div className="flex items-center gap-1.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-blue-100 dark:hover:bg-zinc-700"
                          onClick={copyToClipboard}
                        >
                          {copied ? (
                            <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {copied ? "Copied!" : "Copy to clipboard"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                   {/*  <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-blue-100 dark:hover:bg-zinc-700"
                        >
                          <Bookmark className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Save this response</TooltipContent>
                    </Tooltip> */}
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    {/* <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full hover:bg-blue-100 dark:hover:bg-zinc-700"
                        >
                          <Share2 className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share this response</TooltipContent>
                    </Tooltip> */}
                  </TooltipProvider>
                </div>
                
                {hasSources && (
                  <div className="ml-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full px-2.5 text-xs font-medium border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      onClick={toggleSources}
                    >
                      <FileText className="h-3.5 w-3.5 mr-1.5" />
                      {showSources ? "Hide sources" : `${answerData.sources.length} Sources`}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
           
          </div>
        </motion.div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start pt-2 px-4 sm:px-6 pb-4">
        {hasSources && showSources && (
          <div className="w-full mt-4">
            {/* Mobile Banner */}
           {/*  <div className="lg:hidden mb-4">
              <Button 
                variant="outline" 
                className="w-full border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 flex items-center justify-between"
                onClick={toggleMobileCarousel}
              >
                <span className="text-sm font-medium">View Source Cards</span>
                {showMobileCarousel ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
              </Button>
            </div> */}

            {/* Desktop view always visible, mobile view conditionally visible */}
            <div className={`relative mb-6 ${!showMobileCarousel ? 'hidden md:block' : 'block'}`}>
              <div className="flex flex-col lg:flex-row">
                {/* Left Arrow (desktop) */}
                <button
                  onClick={scrollBackward}
                  type="button"
                  className={`left-arrow hidden md:block justify-center my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
                    isBackwardArrowVisible ? '' : 'opacity-50 cursor-default'
                  }`}
                  disabled={!isBackwardArrowVisible}
                >
                  <div className="rounded-full p-1 mr-1 hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                    <ArrowLeft className={`text-slate-700 dark:text-zinc-400 p-1 h-6 w-6 ${!isBackwardArrowVisible ? 'opacity-50' : ''}`} />
                  </div>
                </button>

                {/* Source Cards Carousel - Added max-w-full to contain within parent */}
                <div
                  className="flex flex-row gap-4 overflow-x-scroll scroll-smooth carousel-area max-w-[350px]"
                  ref={carouselRef}
                >
                  {answerData.sources.map((source, index) => (
                    <Source
                      key={`source-${index}`}
                      forDialog={false}
                      source={source}
                      sourceType={data.source_type}
                      sourceId={data.source_id}
                      updateVariable={updateVariable}
                      handleLength={handleLength}
                      isMobile={isMobile}
                      setSelectedSourceCard={setSelectedSourceCard}
                      setOpenDialog={setOpenDialog}
                    />
                  ))}
                </div>

                {/* Right Arrow (desktop) */}
                <button
                  onClick={scrollForward}
                  type="button"
                  className={`right-arrow hidden md:block my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none ${
                    isForwardArrowVisible ? 'block' : 'hidden'
                  }`}
                >
                  <div className="rounded-full p-1 mr-1 hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                    <ArrowRight className="cursor-pointer text-slate-700 dark:text-zinc-400 p-1 h-6 w-6" />
                  </div>
                </button>
              </div>

              {/* Mobile Navigation Buttons */}
              <div className="flex flex-row justify-center gap-4 mt-4 md:hidden">
                <button
                  onClick={scrollBackward}
                  type="button"
                  className="left-arrow my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none"
                >
                  <div className="rounded-full p-1 mr-1 hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                    <ArrowLeft
                      className={`${
                        isBackwardArrowVisible
                          ? 'cursor-pointer text-slate-600 dark:text-zinc-400'
                          : 'text-zinc-300 dark:text-slate-800 cursor-default'
                      } p-1 h-5 w-5`}
                    />
                  </div>
                </button>
                <button
                  onClick={scrollForward}
                  type="button"
                  className="right-arrow my-auto flex items-center justify-center h-full cursor-pointer group focus:outline-none"
                >
                  <div className="rounded-full p-1 mr-1 hover:opacity-100 hover:transition hover:duration-300 hover:ease-in-out">
                    <ArrowRight
                      className={`${
                        isForwardArrowVisible
                          ? 'cursor-pointer text-slate-600 dark:text-zinc-400'
                          : 'text-zinc-300 dark:text-slate-800 cursor-default'
                      } p-1 h-5 w-5`}
                    />
                  </div>
                </button>
              </div> 
            </div>
          </div>
        )}

        {/* Source Detail Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white dark:bg-zinc-900 max-w-md sm:max-w-xl">
            {answerData.sources !== undefined &&
              answerData.sources.length !== 0 &&
              answerData.sources.map((source, index) => (
                <div key={`dialog-source-${index}`}>
                  {source === selectedSourceCard && (
                    <Source
                      forDialog={true}
                      source={source}
                      sourceType={data.source_type}
                      sourceId={data.source_id}
                      updateVariable={updateVariable}
                      handleLength={handleLength}
                      isMobile={isMobile}
                      setSelectedSourceCard={setSelectedSourceCard}
                      setOpenDialog={setOpenDialog}
                    />
                  )}
                </div>
              ))}
          </DialogContent>
        </Dialog>
        
        {!hasSources && (
          <Alert variant="default" className="w-full mt-4 bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700">
            <AlertDescription>
              No sources available for this answer.
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}