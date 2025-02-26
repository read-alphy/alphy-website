import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
  tier, 
  title, 
  description, 
  monthlyPrice,
  yearlyPrice,
  features, 
  subFeatures = [],
  highlighted = false, 
  currentTier = null,
  isYearly,
  onSelectPlan,
  loading = false
}) => {
  return (
    <motion.div
      whileHover={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`rounded-lg p-6 shadow-lg ${
        highlighted 
          ? "border-2 border-indigo-500 bg-white dark:bg-gray-800 ring-4 ring-indigo-100 dark:ring-indigo-900/30" 
          : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
      } flex flex-col h-full w-full max-w-sm`}
    >
      <div className="mb-4 flex-grow">
        <div className="flex items-center">
         {/*  {highlighted && (
            <div className="absolute -top-4 right-4">
              <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                MOST POPULAR
              </span>
            </div>
          )} */}
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
          onClick={onSelectPlan}
          disabled={currentTier === tier || loading}
          className={`w-full rounded-lg px-4 py-3 text-center font-medium transition-all ${
            highlighted
              ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 shadow-md"
              : currentTier === tier
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
          ) : currentTier === tier ? (
            "Current Plan"
          ) : (
            `Get ${title}`
          )}
        </button>
      </div>
    </motion.div>
  );
};

const ImprovedPricing = ({ currentUser, tier = null }) => {
  const [isYearly, setIsYearly] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSelectPlan = (planTier) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log(`Selected plan: ${planTier}`);
      setLoading(false);
    }, 1000);
  };

  // Define plan features
  const starterFeatures = [
    { name: "1 hour transcription credits for YouTube videos", included: true },
    { name: "Unlimited access to Alphy's public database", included: true },
    { name: "Unlimited access to Alphy's arcs", included: true },
    { name: "Create 1 Arc", included: true },
    { name: "Submit YouTube videos", included: false },
    { name: "No transcript export", included: false },
    { name: "No uploads", included: false },
    { name: "No optional credit topups", included: false }
  ];

  const starterSubFeatures = {
    title: "Limited access to Playground:",
    items: [
      { name: "Only works on summaries", included: false },
      { name: "No custom prompts", included: false },
      { name: "Limited access to preset commands", included: false }
    ]
  };

  const premiumFeatures = [
    { name: "20 hours of prioritized transcription credits per month", included: true },
    { name: "Upload local audio files", included: true },
    { name: "Submit YouTube, X Spaces, X Videos, Twitch recordings, and Apple Podcasts", included: true },
    { name: "Download transcripts", included: true },
    { name: "Create Unlimited Arcs", included: true },
    { name: "Optional credit topups", included: true }
  ];

  const premiumSubFeatures = {
    title: "Full access to Playground:",
    items: [
      { name: "Generative AI on Transcripts", included: true },
      { name: "Create anything with your own prompts", included: true },
      { name: "Unlimited access to preset commands", included: true }
    ]
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Choose the best plan for you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
            Upgrade to have extra transcription credits, submit from multiple
            platforms, upload audio files, and access most capable AI models.
          </p>
        </div>

        <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />

        <div className="mt-12 space-y-8 lg:grid lg:grid-cols-2 lg:gap-4 xl:gap-6 lg:space-y-0 lg:max-w-4xl lg:mx-auto">
          <PricingCard
            tier="free"
            title="Starter"
            description="Discover Alphy's capabilities"
            monthlyPrice={0}
            yearlyPrice={0}
            features={starterFeatures}
            subFeatures={starterSubFeatures}
            currentTier={tier}
            isYearly={isYearly}
            onSelectPlan={() => handleSelectPlan('free')}
          />

          <PricingCard
            tier="premium"
            title="Premium"
            description="Experience audiovisual mastery"
            monthlyPrice={19.90}
            yearlyPrice={12}
            features={premiumFeatures}
            subFeatures={premiumSubFeatures}
            highlighted={true}
            currentTier={tier}
            isYearly={isYearly}
            onSelectPlan={() => handleSelectPlan('premium')}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ImprovedPricing;