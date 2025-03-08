import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MessageSquare, 
  Copy, 
  Check, 
  ExternalLink,
  Calendar,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Clock
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from 'react-markdown';

const HistoryCard = ({ item, index, onViewSource }) => {
  
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Format the creation date - simple formatting without external libs
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
      }
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  // Determine source type label
  
  // Get the appropriate image for the source type
  const getSourceImage = (source_type, source_id) => {
    if (source_type === 'yt') {
      return `https://i.ytimg.com/vi/${source_id}/hqdefault.jpg`;
    }
  };

  // Extract command type or prompt for display
  const getPromptDisplay = () => {
    if (typeof item.request.command === 'object' && item.request.command.prompt) {
      return item.request.command.prompt.slice(0, 60) + (item.request.command.prompt.length > 60 ? '...' : '');
    } else if (typeof item.request.command === 'string') {
      const words = item.request.command.replace(/_/g, ' ').split(' ');
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      return capitalizedWords.join(' ');
    }
    return 'Custom prompt';
  };
  // Copy content to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(item.response);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  
  // Get the first few lines of content as a preview
  const getContentPreview = () => {
    const lines = item.response.split('\n').filter(line => line.trim() !== '');
    const firstParagraph = lines.find(line => !line.startsWith('#') && line.length > 30) || lines[0] || '';
    return firstParagraph.slice(0, 120) + (firstParagraph.length > 120 ? '...' : '');
  };

  // Count estimated reading time
  const getReadingTime = () => {
    const wordCount = item.response.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed
    return `${readingTime} min read`;
  };

  return (
    <Card className="overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-none transition-all duration-200">
      <CardHeader className="pb-3 flex flex-row items-start gap-4">
        <div className="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={getSourceImage(item.source_type, item.source_id)}
            fill
            className="object-cover"
            alt={item.title || "Content thumbnail"}
          />
         
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start w-full">
            <CardTitle className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 line-clamp-2">
              {item.title}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 ml-2 flex-shrink-0"
              onClick={() => onViewSource(item)}
            >
              <ExternalLink className="h-4 w-4 text-zinc-500 hover:text-indigo-500" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(item.created_at)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{getReadingTime()}</span>
            </div>
          </div>
          
          <div className="flex items-center mt-2">
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800">
              {item.request.command === 'blog_post' ? 'Blog Post' : getPromptDisplay()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-3">
        {(
          <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 mb-2 line-clamp-2">
            {getContentPreview()}
          </div>
        )}
         <Button
          variant="ghost"
          size="sm"
          className="text-indigo-600 bg-indigo-50 dark:bg-indigo-950 h-7 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          onClick={() => setIsContentVisible(!isContentVisible)}
        >
          {isContentVisible ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              <span>Hide Content</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              <span>Show Content</span>
            </>
          )}
        </Button>
        
        {isContentVisible && (
          <div className="relative mt-3 bg-slate-50 dark:bg-zinc-800/50 rounded-md p-4">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="absolute right-3 top-3 h-8"
            >
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </Button>
            
            <div className="prose dark:prose-invert prose-sm max-w-none pt-2 pr-20">
              <ReactMarkdown>{item.response}</ReactMarkdown>
            </div>
          </div>
        )}
      </CardContent>
      
     
    </Card>
  );
};

export default HistoryCard;