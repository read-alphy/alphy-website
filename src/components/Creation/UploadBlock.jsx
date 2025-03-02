import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { PlusCircle } from 'lucide-react';

// Icons
import { 
  ArrowLeft,
  CloudUpload,
  FileText,
  AlertCircle,
  X,
  BadgeCheck,
  Info
} from 'lucide-react';

// Assets
import ConvertPrivatelyIcon from '../../../public/img/convertprivately.png';
import { API_URL } from '../../constants';

export default function UploadBlock({
  currentUser,
  tier,
  credit,
  setUploadDialog,
  hideCredits = false
}) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDuration, setUploadDuration] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [file, setFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  
  const audioRef = useRef(null);
  const router = useRouter();

  const navigateCredit = () => {
    sessionStorage.setItem('creditPurchase', 'true');
    router.push('/account');
  };

  const handleFileUpload = event => {
    setShowError(false);
    const uploadFile = event.target.files[0];
    
    if (!uploadFile) return;

    const allowedExtensions = ['.mp3', '.m4a', '.mpga', '.mpeg', '.wav', '.webm'];
    const fileExtension = uploadFile.name.substring(uploadFile.name.lastIndexOf('.')).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage('Please select a supported audio file format: MP3, M4A, MPGA, MPEG, WAV, or WEBM');
      setShowError(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', uploadFile);
    setFile(formData);
    
    // Get file metadata
    const audio = audioRef.current;
    audio.src = URL.createObjectURL(uploadFile);
    audio.onloadedmetadata = () => {
      setUploadDuration(audio.duration);
      setUploadTitle(uploadFile.name);
    };
  };

  const handleFileUploadByDrop = files => {
    setShowError(false);

    if (!files || files.length === 0) return;
    
    const file = files[0];
    const allowedExtensions = ['.mp3', '.m4a', '.mpga', '.mpeg', '.wav', '.webm'];
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
      setErrorMessage('Please select a supported audio file format: MP3, M4A, MPGA, MPEG, WAV, or WEBM');
      setShowError(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    setFile(formData);
    
    // Get file metadata
    const audio = audioRef.current;
    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      setUploadDuration(audio.duration);
      setUploadTitle(file.name);
    };
  };

  const handlePostUpload = () => {
    if (!file || !currentUser) return;
    
    setFileUploading(true);

    axios
      .post(`${API_URL || 'http://localhost:3001'}/sources/upload`, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'id-token': currentUser.accessToken,
        },
        onUploadProgress: progressEvent => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      })
      .then(response => {
        // Handle successful upload
        sessionStorage.setItem('refreshCredit', 'true');
        router.push('/up/' + response.data.source_id);
      })
      .catch(error => {
        console.error('Upload error:', error);
        setErrorMessage('There was an error uploading your file. Please try again.');
        setShowError(true);
        handleFileUploadClear();
      });
  };

  const handleFileUploadClear = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadDuration('');
    setUploadTitle('');
    setFileUploading(false);
  };

  const onDrop = useCallback(acceptedFiles => {
    handleFileUploadByDrop(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.m4a', '.mpga', '.mpeg', '.wav', '.webm']
    }
  });

  // Format duration as MM:SS
  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // For standalone mode only (not tab)
  if (!hideCredits) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <button
          onClick={() => setUploadDialog(false)}
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </button>
        
        <UploadContent 
          currentUser={currentUser}
          tier={tier}
          credit={credit}
          file={file}
          uploadTitle={uploadTitle}
          uploadDuration={uploadDuration}
          uploadProgress={uploadProgress}
          fileUploading={fileUploading}
          showError={showError}
          errorMessage={errorMessage}
          formatDuration={formatDuration}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          handleFileUpload={handleFileUpload}
          handleFileUploadClear={handleFileUploadClear}
          handlePostUpload={handlePostUpload}
          navigateCredit={navigateCredit}
          audioRef={audioRef}
          showCredits={true}
        />
      </div>
    );
  }

  // For tab mode
  return (
    <div className="p-6">
      <UploadContent 
        currentUser={currentUser}
        tier={tier}
        credit={credit}
        file={file}
        uploadTitle={uploadTitle}
        uploadDuration={uploadDuration}
        uploadProgress={uploadProgress}
        fileUploading={fileUploading}
        showError={showError}
        errorMessage={errorMessage}
        formatDuration={formatDuration}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        isDragActive={isDragActive}
        handleFileUpload={handleFileUpload}
        handleFileUploadClear={handleFileUploadClear}
        handlePostUpload={handlePostUpload}
        navigateCredit={navigateCredit}
        audioRef={audioRef}
        showCredits={false}
      />
    </div>
  );
}

// Extracted component to avoid duplication
function UploadContent({
  currentUser,
  tier,
  credit,
  file,
  uploadTitle,
  uploadDuration,
  uploadProgress,
  fileUploading,
  showError,
  errorMessage,
  formatDuration,
  getRootProps,
  getInputProps,
  isDragActive,
  handleFileUpload,
  handleFileUploadClear,
  handlePostUpload,
  navigateCredit,
  audioRef,
  showCredits
}) {
  return (
    <>
      <div className="bg-white dark:bg-zinc-800 rounded-xl ">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Upload Audio Recording
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
            <BadgeCheck className="h-3 w-3 mr-1" />
            Premium
          </span>
        </div>
        
        {tier === 'premium' ? (
          <>
            {!file ? (
              <div 
                {...getRootProps()}
                className={`border-2 border-dashed ${isDragActive ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-8 text-center mb-6 transition-colors`}
              >
                <input 
                  {...getInputProps()} 
                  accept=".mp3,.m4a,.mpga,.mpeg,.wav,.webm" 
                  onChange={handleFileUpload}
                />
                <audio className="hidden" ref={audioRef} controls />
                
                <div className="flex flex-col items-center justify-center">
                  <CloudUpload className="h-12 w-12 text-indigo-500 mb-4" />
                  
                  {!showError ? (
                    <>
                      <p className="text-base font-medium text-gray-900 dark:text-white mb-1">
                        {isDragActive ? 'Drop your audio file here' : 'Drag and drop or click to upload'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        MP3, M4A, MPGA, MPEG, WAV, or WEBM (max 100MB)
                      </p>
                    </>
                  ) : (
                    <div className="text-center mb-4">
                      <p className="text-base font-medium text-red-600 dark:text-red-400 mb-1 flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 mr-1" />
                        File type not supported
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        We accept MP3, M4A, MPGA, MPEG, WAV, or WEBM
                      </p>
                    </div>
                  )}
                  
                  <span className="inline-flex cursor-pointer items-center px-4 py-2 rounded-md bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 text-sm font-medium">
                    Select File
                  </span>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <div className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-md mr-3">
                        <FileText className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {uploadTitle || 'Audio file'}
                        </p>
                        {uploadDuration && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDuration(uploadDuration)} minutes
                          </p>
                        )}
                      </div>
                    </div>
                    {!fileUploading && (
                      <button
                        onClick={handleFileUploadClear}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  
                  {uploadProgress > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700 dark:text-gray-300">
                          {uploadProgress === 100 ? 'Upload complete!' : 'Uploading...'}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {showError && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-sm text-red-800 dark:text-red-300 flex items-start">
                      <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                      {errorMessage}
                    </p>
                  </div>
                )}
                
                <button
                  onClick={handlePostUpload}
                  disabled={fileUploading}
                  className={`w-full flex justify-center items-center px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition-colors ${fileUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {fileUploading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Process Audio'
                  )}
                </button>
              </div>
            )}
            
            {/* Credits info - only show when not in tab mode */}
            {showCredits && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6 mt-2">
                <div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      Premium Plan
                    </span>
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {Math.floor(credit)} minutes remaining
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={navigateCredit}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                >
                  Need more credits?
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="max-w-[500px] mx-auto">
            <BadgeCheck className="h-12 w-12 mx-auto text-indigo-400 mb-4 " />
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Premium Feature</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm font-normal">
              Audio file processing is available with our Premium plan. Upgrade to process your own recordings.
            </p>
            <Link href="/account" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md  text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Upgrade to Premium
            </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Convert privately card */}
      <div className="mt-6 border-t border-zinc-200 dark:border-zinc-700">
        <div className="bg-white dark:bg-zinc-800  dark:border-zinc-700 rounded-xl p-6">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
            Need to convert your media?
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Use our free converter tool to get your video and audio files ready for transcription.
          </p>
          <a
            href="https://convertprivately.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all "
          >
            <Image 
              src={ConvertPrivatelyIcon} 
              width={24} 
              height={24} 
              className="mr-2" 
              alt="ConvertPrivately" 
            />
            ConvertPrivately
          </a>
        </div>
      </div>
    </>
  );
}