import React from 'react';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';

/**
 * URL submit component with credit information for the ArcForm
 */
const ArcFormUrlSubmit = ({
  inputValue,
  isValidUrl,
  handleSubmit,
  loading,
  failed,
  errorMessageSubmit,
  tier,
  credit,
  setCreditCalled
}) => {
  if (!isValidUrl(inputValue)) return null;
  
  return (
    <div className="w-full mb-8">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Button
          size="sm"
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-300 dark:text-slate-700 px-6 py-3 text-sm lg:text-[15px] normal-case quicksand font-semibold"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center text-sm">
          <p className="text-zinc-500 dark:text-zinc-400 quicksand font-semibold">
            {tier === 'free' ? 'Starter Plan' : tier === 'basic' ? 'Basic Plan' : 'Premium Plan'}
            <span className="mx-1">-</span>
            Remaining Credits: {Math.floor(credit)} minutes
          </p>
          
          {(tier === 'basic' || tier === 'premium') && (
            <Link
              onClick={() => sessionStorage.setItem('creditPurchase', 'true')}
              href="/account"
              className="text-indigo-400 quicksand font-semibold underline ml-2"
            >
              Buy more
            </Link>
          )}
        </div>
      </div>
      
      {failed && (
        <div className="mt-4 text-sm text-red-400">
          {errorMessageSubmit}
        </div>
      )}
    </div>
  );
};

export default ArcFormUrlSubmit;