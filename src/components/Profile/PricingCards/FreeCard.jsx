import React from 'react';
import PricingCard from './PricingCard';

const FreeCard = ({ 
  currentUser, 
  tier, 
  triggers1, 
  openPopover1, 
  setOpenPopover1, 
  canceledAtPeriodEnd,
  isYearly = true
}) => {
  // Define starter plan features
  const starterFeatures = [
    { name: "1 hour of transcription credits", included: true },
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

  const handleStarterSelect = () => {
    console.log("Starter plan selected");
    // Actual implementation would go here
  };

  return (
    <PricingCard
      currentUser={currentUser}
      tier="free"
      title="Starter"
      description="Discover Alphy's capabilities"
      monthlyPrice={0}
      yearlyPrice={0}
      features={starterFeatures}
      subFeatures={starterSubFeatures}
      currentTier={tier}
      isYearly={isYearly}
      onSelectPlan={handleStarterSelect}
    />
  );
};

export default FreeCard;