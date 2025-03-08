import React from 'react';
import { motion } from 'framer-motion';

const FeatureCheck = ({ included }) => (
  included ? (
    <svg className="h-5 w-5 flex-shrink-0 text-green-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  )
);

const Feature = ({ name, included, subFeature = false }) => (
  <li className={`flex items-center ${subFeature ? "ml-6" : ""}`}>
    <FeatureCheck included={included} />
    <span className={`ml-3 ${included ? "text-gray-700 dark:text-gray-300 font-medium" : "text-gray-500 dark:text-gray-400"}`}>
      {name}
    </span>
  </li>
);

const PriceDisplay = ({ isYearly, monthlyPrice, yearlyPrice }) => {
  const displayPrice = isYearly ? yearlyPrice : monthlyPrice;
  
  return (
    <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
      <span className="text-3xl font-semibold tracking-tight">$</span>
      <span className="text-5xl font-bold tracking-tight">{displayPrice}</span>
      <span className="ml-1 text-xl text-gray-500 dark:text-gray-400">/month</span>
    </div>
  );
};


const PricingCard = ({
  currentUser, 
  tier, 
  title, 
  description, 
  monthlyPrice,
  yearlyPrice,
  features, 
  subFeatures = {},
  highlighted = false, 
  currentTier = null,
  isYearly,
  onSelectPlan,
  loading = false
}) => {

  


  const handlePlanSelection = () => {
    if (!currentUser) {
      window.location.href = "/u/register";
    } else {
      onSelectPlan();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`rounded-lg p-6 shadow-lg ${
        highlighted 
          ? "border-2 border-indigo-500 bg-white dark:bg-gray-800 ring-4 ring-indigo-100 dark:ring-indigo-900/30" 
          : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      } flex flex-col h-full w-full max-w-sm`}
    >
      <div className="flex-grow">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        </div>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{description}</p>
        <PriceDisplay isYearly={isYearly} monthlyPrice={monthlyPrice} yearlyPrice={yearlyPrice} />
      </div>

      <div className="mt-6 space-y-4">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <Feature key={index} name={feature.name} included={feature.included} />
            ))}
            
            {subFeatures && subFeatures.items && subFeatures.items.length > 0 && (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                <Feature name={subFeatures.title} included={true} />
                {subFeatures.items.map((feature, index) => (
                  <Feature key={`sub-${index}`} name={feature.name} included={feature.included} subFeature={true} />
                ))}
              </>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handlePlanSelection}
          disabled={(currentUser && currentTier === tier) || loading}
          className={`w-full rounded-lg px-4 py-3 text-center font-medium transition-all ${
            highlighted
              ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 shadow-md"
              : currentUser && currentTier === tier
              ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 cursor-default"
              : "bg-white text-gray-800 hover:bg-gray-50 border border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 dark:border-gray-600"
          }`}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : currentUser && currentTier === tier ? (
            "Current Plan"
          ) : !currentUser ? (
            "Subscribe"
          ) : (
            `Get ${title}`
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard;