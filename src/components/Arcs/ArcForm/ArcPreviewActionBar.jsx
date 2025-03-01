// components/Arc/ArcPreviewActionBar.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Save, Trash2, Loader2, Eye } from "lucide-react";
import FeedItem from '../../FeedTabs/FeedItem';
import ArcPreviewDialog from './ArcPreviewDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/**
 * Combined component that shows playlist preview and action buttons
 * Displayed at the bottom of the form only when there are items to preview
 */
const ArcPreviewActionBar = ({
  // Preview props
  arcTitle,
  arcDescription,
  dataArc,
  setDataArc,
  sourceIDsArc,
  setSourceIDsArc,
  errorMessage,
  
  // Action bar props
  isCreateArc,
  isEditArc,
  isLoadingSubmit,
  onSave,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);

  // Only show action buttons if there's no data
  if (dataArc.length === 0) {
    return (
      <>
      </>
    );
  }

  // Render the FeedItem component with the correct props
  const renderItem = (item, index) => (
    <FeedItem
      key={index}
      item={item}
      fromArc="arc"
      dataArc={dataArc}
      setDataArc={setDataArc}
      sourceIDsArc={sourceIDsArc}
      setSourceIDsArc={setSourceIDsArc}
      forCreationPool={true}
    />
  );

  return (
    <div className="mt-8 mb-6 bg-white dark:bg-darkMode border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-all duration-300">
      <div className="p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex-grow">
            <div className="flex items-center mb-2">
              <span className="mr-3 px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-full quicksand font-medium">
                {dataArc.length} {dataArc.length === 1 ? 'item' : 'items'} in your Arc
              </span>
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex shadow-none items-center text-slate-600 dark:text-zinc-300 hover:text-slate-800 dark:hover:text-zinc-100"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    <span className="quicksand font-medium text-sm">Preview</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-slate-800 dark:text-zinc-200 quicksand">
                      {arcTitle.length > 0 ? arcTitle : 'Arc'} Preview
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <ArcPreviewDialog 
                      items={dataArc}
                      renderItem={renderItem}
                      emptyMessage="Your playlist is empty. Search for content or add a URL to get started."
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {errorMessage && (
              <p className="mb-2 text-md text-red-500 dark:text-red-400 quicksand font-semibold">
                An Arc cannot be empty. Please add an item to continue.
              </p>
            )}
          </div>
          
          <div className="mt-3 md:mt-0 self-end md:self-auto">
            {renderActionButtons(isEditArc, isLoadingSubmit, isCreateArc, onDelete, onSave)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to render action buttons consistently
const renderActionButtons = (isEditArc, isLoadingSubmit, isCreateArc, onDelete, onSave) => (
  <div className="flex items-center">
    {isEditArc && !isLoadingSubmit && (
      <Button
        size="default"
        variant="destructive"
        className="px-5 mr-4 quicksand font-semibold hover:bg-red-600 transition-colors"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4 mr-2" /> Delete
      </Button>
    )}
    
    <Button
      size="default"
      className={`bg-greenColor hover:bg-green-600 transition-colors px-6 quicksand font-semibold ${
        isLoadingSubmit ? 'bg-green-300 pointer-events-none min-w-[120px]' : ''
      }`}
      onClick={onSave}
      disabled={isLoadingSubmit}
    >
      {isLoadingSubmit ? (
        <Loader2 className="h-5 w-5 animate-spin mx-auto" />
      ) : (
        <div className="flex items-center">
          <Save className="mr-2 h-4 w-4" />
          {isCreateArc ? 'Create' : 'Save'}
        </div>
      )}
    </Button>
  </div>
);

export default ArcPreviewActionBar;