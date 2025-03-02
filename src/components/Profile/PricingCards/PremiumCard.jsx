import React from 'react';
import PricingCard from './PricingCard';

const PremiumCard = ({ 
  currentUser, 
  tier, 
  triggers, 
  openPopover, 
  setOpenPopover, 
  canceledAtPeriodEnd,
  getSubscriptionLink,
  subscriptionLinkLoading,
  isYearly = true
}) => {
  // Define premium plan features
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
      onSelectPlan={getSubscriptionLink}
      loading={subscriptionLinkLoading}
    />
  );
};

export default PremiumCard;