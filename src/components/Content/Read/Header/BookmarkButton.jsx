import React from 'react';
import { Bookmark, BookmarkX } from 'lucide-react';

export default function BookmarkButton({ isBookmarked, handleBookmark, currentUser, data }) {
  
  // Don't render if user is the content submitter
  if (!currentUser || currentUser.uid === data?.submitter_id) {
    return null;
  }

  return (
    <button
      onClick={handleBookmark}
      className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 text-left"
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <div className="flex items-center justify-center w-6 h-6">
        {isBookmarked ? (
          <BookmarkX 
            className="text-blue-500 dark:text-blue-400" 
            size={18} 
          />
        ) : (
          <Bookmark 
            className="text-slate-700 dark:text-zinc-200" 
            size={18} 
          />
        )}
      </div>
      <span className="text-slate-700 dark:text-zinc-200 text-sm quicksand font-medium">
        {isBookmarked ? 'Remove Bookmark' : 'Add To Bookmarks'}
      </span>
    </button>
  );
}