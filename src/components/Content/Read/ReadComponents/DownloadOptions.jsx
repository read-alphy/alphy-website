import { Download, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function DownloadOptions({
  handleDownload,
  downloading,
  tier,
  basicDataLoaded,
  themePopover
}) {
  const isPremium = tier !== "free" && tier !== undefined;
  
  return (
    <div className="flex ml-auto justify-end">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            className="gap-2 font-medium bg-transparent text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-none"
            disabled={downloading}
          >
            {downloading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                <Loader2 className="h-4 w-4" />
              </motion.div>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Download</span>
              </>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[220px] p-0">
          {isPremium && basicDataLoaded ? (
            <div className="flex flex-col">
              <button
                onClick={() => handleDownload(1)}
                className="flex items-center px-4 py-2.5 text-sm hover:bg-muted transition-colors"
              >
                Download as Plain Subtitles (.srt)
              </button>
              
              <button
                onClick={() => handleDownload(2)}
                className="flex items-center px-4 py-2.5 text-sm hover:bg-muted transition-colors"
              >
                Download Formatted Transcript (.txt)
              </button>
              
              <button
                onClick={() => handleDownload(3)}
                className="flex items-center px-4 py-2.5 text-sm hover:bg-muted transition-colors"
              >
                Download as Plain Text (.txt)
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="px-4 py-2.5 text-sm text-muted-foreground">
                Upgrade your plan to download the transcript
              </div>
              <button
                className="flex items-center px-4 py-2.5 text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300"
                onClick={() => window.location.href = "/account"}
              >
                Go Premium
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}