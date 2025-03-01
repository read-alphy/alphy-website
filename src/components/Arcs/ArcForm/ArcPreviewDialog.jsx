import React from 'react';

/**
 * Grid display component for Arc preview items
 */
const ArcPreviewGrid = ({
  items,
  renderItem,
  emptyMessage = "Your playlist is empty. Add some content to get started."
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="border border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg p-8 text-center">
        <p className="text-slate-600 dark:text-zinc-400 quicksand font-normal">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="w-full"
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArcPreviewGrid;