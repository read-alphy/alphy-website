// components/Arc/ArcPreviewActionBar.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Save, Trash2, Loader2, Eye, Edit2 } from "lucide-react";
import FeedItem from '../../FeedTabs/FeedItem';
import ArcPreviewDialog from './ArcPreviewDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

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
  setArcTitle,
  setArcDescription
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [metadataOpen, setMetadataOpen] = useState(false);

  // Only show action buttons if there's no data
/*  if (dataArc.length === 0) {
    return (
      <>
      </>
    );
  }
  */


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
    <div className="mt-8 b-6 rounded-xl shadow-lg bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 border border-indigo-200 dark:border-indigo-800">
      <div className="p-5 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
          <div className="flex-grow">
            <div className="flex flex-col mb-2">
              <div className="flex items-center mb-2">
                <h3 className="text-slate-700 dark:text-zinc-300 quicksand font-semibold mr-2">
                  {arcTitle.length > 0 ? arcTitle : 'My Arc'}
                </h3>
                <Dialog open={metadataOpen} onOpenChange={setMetadataOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-auto"
                    >
                      <Edit2 className="h-4 w-4 text-slate-600 dark:text-zinc-400" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold text-slate-800 dark:text-zinc-200 quicksand">
                        Edit Arc Details
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <div className="mb-3">
                        <p className="text-slate-700 dark:text-zinc-300 quicksand font-semibold mb-1">
                          Title
                        </p>
                        <Input
                          id="arc-title-preview"
                          value={arcTitle}
                          placeholder="Set a title..."
                          onChange={event => setArcTitle(event.target.value)}
                          className="w-full quicksand font-normal text-sm bg-white dark:bg-zinc-900
                                  border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500
                                  focus:ring-1 focus:ring-indigo-500 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <p className="text-slate-700 dark:text-zinc-300 quicksand font-semibold mb-1">
                          Description
                        </p>
                        <Textarea
                          id="arc-description-preview"
                          className="min-h-[100px] quicksand font-normal bg-white 
                                  border-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 resize-none 
                                  text-sm w-full focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          value={arcDescription}
                          placeholder="Set a description for your arc..."
                          onChange={event => setArcDescription(event.target.value)}
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex items-center">
                <span className="mr-3 px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-full quicksand font-medium">
                  {dataArc.length} {dataArc.length === 1 ? 'item' : 'items'} in your Arc
                </span>
                
                <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex shadow-sm items-center text-slate-600 dark:text-zinc-300 hover:text-slate-800 dark:hover:text-zinc-100 mr-2"
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
                    <div className="mt-2">
                      {arcDescription && (
                        <p className="text-slate-600 dark:text-zinc-400 text-sm mb-4">
                          {arcDescription}
                        </p>
                      )}
                      <ArcPreviewDialog 
                        items={dataArc}
                        renderItem={renderItem}
                        emptyMessage="Your playlist is empty. Search for content or add a URL to get started."
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
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
      className={`bg-green-400 text-zinc-100 hover:bg-green-300 transition-colors px-6 quicksand font-semibold ${
        isLoadingSubmit ? 'bg-green-300 pointer-events-none min-w-[120px]' : ''
      }`}
      onClick={onSave}
      disabled={isLoadingSubmit}
    >
      {isLoadingSubmit ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <Loader2 className="h-5 w-5 mx-auto" />
        </motion.div>
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