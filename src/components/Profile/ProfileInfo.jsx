import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PlusCircle, 
  MinusCircle, 
  Plus, 
  CreditCard, 
  User, 
  Mail, 
  Lock, 
  Clock, 
  Package,
  ExternalLink
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Loading from '../Loading';
import { API_URL } from '../../constants';

// Import pricing card components
import FreeCard from './PricingCards/FreeCard';
import PremiumCard from './PricingCards/PremiumCard';
import PricingToggle from './PricingCards/PricingToggle';

export default function ProfileInfo({
  isAccountPage,
  credit,
  tier,
  currentUser,
  customerID,
  canceledAtPeriodEnd,
  collapsed
}) {
  const [isYearly, setIsYearly] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [creditPurchaseLoading, setCreditPurchaseLoading] = useState(false);
  const [subscriptionLinkLoading, setSubscriptionLinkLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [creditPurchaseDialog, setCreditPurchaseDialog] = useState(false);
  const [called, setCalled] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [openPopover1, setOpenPopover1] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

  const handleQuantityChange = event => {
    const value = event.target.value;

    // Ensure the value is numeric
    if (!isNaN(value)) {
      setQuantity(parseInt(value, 10));
    }
    if (value === '') {
      setQuantity('');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('creditPurchase') === 'true') {
      setCreditPurchaseDialog(true);
      sessionStorage.removeItem('creditPurchase');
    }
  }, []);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleBlur = () => {
    if (quantity === 0) {
      setQuantity(1);
    } else if (quantity === '') {
      setQuantity(1);
    }
  };

  // Popover triggers
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  const triggers1 = {
    onMouseEnter: () => setOpenPopover1(true),
    onMouseLeave: () => setOpenPopover1(false),
  };

  useEffect(() => {
    if (currentUser !== null && called === false) {
      try {
        //getCustomerInfo(currentUser)
        setTimeout(() => {
          setIsLoaded(true);
        }, 400);
        setCalled(true);
      } catch (e) {
        console.log(e);
        setTimeout(() => {
          setIsLoaded(true);
        }, 400);
        setCalled(true);
      }
    } else {
      setIsLoaded(true);
    }
  }, [currentUser, called]);

  const getSubscriptionLink = async () => {
    setSubscriptionLinkLoading(true);
    await currentUser.getIdToken().then(idToken => {
      axios
        .post(
          `${API_URL}/payments/v2/subscription?subscription_period=${isYearly ? 'yearly' : 'monthly'}`,
          {},
          {
            headers: {
              'id-token': idToken,
            },
          }
        )
        .then(r => {
          setSubscriptionLinkLoading(false);
          window.open(r.data.url, '_blank');
        })
        .catch(error => {
          setSubscriptionLinkLoading(false);
          console.log(error);
        });
    });
  };
  
  const getCreditPurchaseLink = async () => {
    setCreditPurchaseLoading(true);
    let localQuantity = quantity > 0 ? quantity : 1;
    await currentUser.getIdToken().then(idToken => {
      axios
        .post(
          `${API_URL}/payments/v2/credit?quantity=${localQuantity}`,
          {},
          {
            headers: {
              'id-token': idToken,
            },
          }
        )
        .then(r => {
          setCreditPurchaseLoading(false);
          window.open(r.data.url, '_blank');
          setCreditPurchaseDialog(false);
        })
        .catch(error => {
          setCreditPurchaseLoading(false);
          console.log(error);
        });
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading className="h-16 w-16 text-indigo-400" color="green" />
      </div>
    );
  }

  // Get plan display name and badge color
  const getPlanDetails = () => {
    switch (tier) {
      case 'free':
        return { name: 'Starter', color: 'bg-slate-500' };
      case 'basic':
        return { name: 'Basic', color: 'bg-indigo-500' };
      case 'premium':
        return { name: 'Premium', color: 'bg-violet-500' };
      default:
        return { name: 'Unknown', color: 'bg-gray-500' };
    }
  };

  const planDetails = getPlanDetails();

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">


      <div className="mt-8 space-y-12 pb-20">
        {/* Account Information Section - Only show on account page */}
        {isAccountPage && currentUser && (
          <div>
            <div className="mt-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Account Settings
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Manage your account details and subscription preferences.
          </p>
          </div>
          <Card className="shadow-none mt-6">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center">
                <User className="mr-2 h-5 w-5 text-indigo-500" />
                Account Information
              </CardTitle>
              <CardDescription>
                Manage your personal account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-slate-500" />
                    Email Address
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-900 dark:text-slate-100 font-medium">
                      {currentUser.email}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                    <Lock className="mr-2 h-4 w-4 text-slate-500" />
                    Password
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm"
                      onClick={() => window.location.href = "/u/resetpassword"}
                    >
                      Reset password
                    </Button>
                  </div>
                </div>

                {credit !== null && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-slate-500" />
                      Remaining Credits
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-900 dark:text-slate-100 font-medium">
                        {Math.floor(credit)} minutes
                      </span>
                      {(tier === 'basic' || tier === 'premium') && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800"
                          onClick={() => setCreditPurchaseDialog(true)}
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Buy Credits
                        </Button>
                      )}
                    </div>
                    {tier === 'free' && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        Upgrade to a paid plan to get credit topups
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center">
                    <Package className="mr-2 h-4 w-4 text-slate-500" />
                    Current Plan
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={planDetails.color}>{planDetails.name}</Badge>
                    {tier !== 'free' && canceledAtPeriodEnd && (
                      <Badge variant="outline" className="border-yellow-500 text-yellow-600 dark:text-yellow-400">
                        Canceling at period end
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        )}

        {/* Subscription Management Section - Show on all pages */}
        <div>
          <Card className="shadow-none border-none">
            {isAccountPage && currentUser ? (
              <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-indigo-500" />
                  Subscription Management
                </CardTitle>
                {tier !== 'premium' && (
                  <CardDescription>
                    Upgrade to have extra transcription credits, submit from multiple platforms, upload audio files, and access most capable AI models.
                  </CardDescription>
                )}
              </CardHeader>
            ) : (
              <div className="px-6 pt-6">
                <h2 className="text-3xl font-bold text-center items-center tracking-tight text-gray-900 dark:text-white ">
                  Choose the best plan for you
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-center items-center  text-md text-gray-500 dark:text-gray-400">
                  Upgrade to have extra transcription credits, submit from multiple
                  platforms, upload audio files, and access most capable AI models.
                </p>
              </div>
            )}
            
            <CardContent>
              {isAccountPage && tier !== 'free' && (
                <div className="mb-6">
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                    onClick={() => window.open("https://billing.stripe.com/p/login/bIYdTS2Qs9CscfuaEE", "_blank")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {canceledAtPeriodEnd
                      ? 'Renew subscription'
                      : 'Manage billing'}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                  {canceledAtPeriodEnd && (
                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                      Your subscription is canceled but benefits remain active until the end of your billing period.
                    </p>
                  )}
                </div>
              )}
              
              <div className="space-y-6">
                <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
                  <TooltipProvider>
                    <FreeCard
                      currentUser={currentUser}
                      tier={tier}
                      triggers1={triggers1}
                      openPopover1={openPopover1}
                      setOpenPopover1={setOpenPopover1}
                      canceledAtPeriodEnd={canceledAtPeriodEnd}
                    />
                    
                    <PremiumCard
                      currentUser={currentUser}
                      tier={tier}
                      triggers={triggers}
                      openPopover={openPopover}
                      setOpenPopover={setOpenPopover}
                      canceledAtPeriodEnd={canceledAtPeriodEnd}
                      getSubscriptionLink={getSubscriptionLink}
                      subscriptionLinkLoading={subscriptionLinkLoading}
                      isYearly={isYearly}
                    />
                  </TooltipProvider>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Credit Purchase Dialog */}
      <Dialog open={creditPurchaseDialog} onOpenChange={setCreditPurchaseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Purchase Extra Credits</DialogTitle>
            <DialogDescription className="text-center">
              Update quantity to scale your minutes proportionally.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                ${quantity * 5}
              </div>
              <div className="text-sm">
                {quantity * 300} minutes (= {quantity * 5} hours)
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={quantity <= 1}
                onClick={handleDecrement}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
              
              <Input
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="w-16 text-center"
              />
              
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleIncrement}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col items-center">
            <Button 
              className="w-full"
              disabled={quantity < 1 || creditPurchaseLoading}
              onClick={getCreditPurchaseLink}
            >
              {creditPurchaseLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </div>
              ) : (
                "Purchase Credits"
              )}
            </Button>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              You will be charged automatically for this purchase.
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}