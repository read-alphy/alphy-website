import React from 'react';

const PricingToggle = ({ isYearly, setIsYearly }) => {
  return (
    <div className="flex items-center justify-center space-x-4 my-8">
      <span className={`font-semibold ${!isYearly ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}>Monthly</span>
      
      <button 
        onClick={() => setIsYearly(!isYearly)}
        className="relative inline-flex h-8 w-16 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200"
      >
        <span className="sr-only">Toggle billing period</span>
        <span
          className={`${
            isYearly ? "translate-x-9" : "translate-x-1"
          } inline-block h-6 w-6 transform rounded-full bg-indigo-600 shadow-lg transition-transform duration-200 ease-in-out`}
        />
      </button>
      
      <div className="flex items-center">
        <span className={`font-semibold ${isYearly ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-gray-400"}`}>Yearly</span>
        <span className="ml-2 rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
          Save 40%
        </span>
      </div>
    </div>
  );
};

export default PricingToggle;