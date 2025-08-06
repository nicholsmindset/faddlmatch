import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import SubscriptionCard from './components/SubscriptionCard';
import PaymentHistory from './components/PaymentHistory';
import BillingSettings from './components/BillingSettings';
import FeatureComparison from './components/FeatureComparison';
import { useAuth } from '../../contexts/AuthContext';
import { subscriptionService } from '../../utils/subscriptionService';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const SubscriptionManagement = () => {
  const navigate = useNavigate();
  const { userProfile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('plans');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentTier = userProfile?.subscription_tier || 'intention';

  // Updated subscription plans with new pricing
  const subscriptionPlans = [
    {
      tier: 'intention',
      name: 'Intention',
      price: 0,
      originalPrice: 'Free/basic',
      icon: 'Heart',
      description: 'Basic access — browsing with blurred photos',
      isPopular: false,
      features: [
        { text: '1 daily match', included: true },
        { text: 'Basic profile creation', included: true },
        { text: 'Blurred photo viewing', included: true },
        { text: 'Guardian oversight', included: true },
        { text: 'Basic photo privacy', included: true },
        { text: 'Express interest (limited)', included: false },
        { text: 'See limited matches', included: false },
        { text: 'Full messaging', included: false },
        { text: 'Advanced filters', included: false },
        { text: 'Premium visibility', included: false }
      ],
      usage: [
        { label: 'Daily matches', used: 1, total: 1 },
        { label: 'Profile views', used: 3, total: -1 }
      ]
    },
    {
      tier: 'patience',
      name: 'Patience',
      price: 18,
      originalPrice: 'Mid-tier ($18)',
      icon: 'Shield',
      description: 'Can express interest, see limited matches',
      isPopular: true,
      features: [
        { text: '3 daily matches', included: true },
        { text: 'Advanced profile features', included: true },
        { text: 'Express interest freely', included: true },
        { text: 'See limited matches', included: true },
        { text: 'Guardian oversight', included: true },
        { text: 'Advanced photo privacy', included: true },
        { text: 'Basic messaging', included: true },
        { text: 'Photo sharing in chat', included: true },
        { text: '1 profile boost per month', included: true },
        { text: 'Full messaging', included: false },
        { text: 'Advanced filters', included: false },
        { text: 'Premium visibility', included: false }
      ],
      usage: [
        { label: 'Daily matches', used: 2, total: 3 },
        { label: 'Messages sent', used: 12, total: -1 },
        { label: 'Profile boosts', used: 0, total: 1 }
      ]
    },
    {
      tier: 'reliance',
      name: 'Reliance',
      price: 23,
      originalPrice: 'Premium ($23)',
      icon: 'Crown',
      description: 'Full messaging, filters, and premium visibility',
      isPopular: false,
      features: [
        { text: 'Unlimited daily matches', included: true },
        { text: 'Premium profile features', included: true },
        { text: 'Full messaging access', included: true },
        { text: 'Advanced filters', included: true },
        { text: 'Premium visibility', included: true },
        { text: 'Guardian oversight', included: true },
        { text: 'Full photo privacy control', included: true },
        { text: 'See who likes you', included: true },
        { text: 'Photo & video sharing', included: true },
        { text: '5 profile boosts per month', included: true },
        { text: 'Video calling with Halal compliance', included: true },
        { text: 'Personal advisor chat support', included: true },
        { text: 'Priority customer support', included: true }
      ],
      usage: [
        { label: 'Daily matches', used: 15, total: -1 },
        { label: 'Messages sent', used: 89, total: -1 },
        { label: 'Profile boosts', used: 2, total: 5 },
        { label: 'Video calls', used: 3, total: -1 }
      ]
    }
  ];

  const tabs = [
    { id: 'plans', label: 'Subscription Plans', icon: 'CreditCard' },
    { id: 'comparison', label: 'Feature Comparison', icon: 'BarChart3' },
    { id: 'billing', label: 'Billing Settings', icon: 'Settings' },
    { id: 'history', label: 'Payment History', icon: 'Receipt' }
  ];

  const handleUpgrade = async (plan) => {
    if (plan?.tier === currentTier) return;

    setIsLoading(true);
    setError(null);

    try {
      if (plan?.tier === 'intention') {
        // Downgrade to free tier
        const { error } = await subscriptionService?.updateSubscriptionTier('intention');
        if (error) {
          setError(error?.message);
          return;
        }
      } else {
        // Upgrade to paid tier - redirect to payment flow
        navigate('/subscription-management?upgrade=' + plan?.tier);
      }
    } catch (error) {
      setError('Failed to update subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDowngrade = async (plan) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await subscriptionService?.updateSubscriptionTier('intention');
      if (error) {
        setError(error?.message);
        return;
      }
    } catch (error) {
      setError('Failed to downgrade subscription');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentPlan = () => {
    return subscriptionPlans?.find(plan => plan?.tier === currentTier);
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return 'Free';
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD'
    })?.format(amount);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground font-caption">Loading subscription details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <p className="text-destructive text-sm">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError(null)}
                className="ml-auto"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Icon name="CreditCard" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">
                Subscription Management
              </h1>
              <p className="text-muted-foreground">
                Manage your membership and unlock premium features
              </p>
            </div>
          </div>

          {/* Current Plan Status */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  currentTier === 'intention' ? 'bg-islamic-green/10' :
                  currentTier === 'patience'? 'bg-trust-blue/10' : 'bg-premium-purple/10'
                }`}>
                  <Icon 
                    name={getCurrentPlan()?.icon} 
                    size={20} 
                    className={
                      currentTier === 'intention' ? 'text-islamic-green' :
                      currentTier === 'patience'? 'text-trust-blue' : 'text-premium-purple'
                    } 
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    Current Plan: {getCurrentPlan()?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getCurrentPlan()?.originalPrice}
                  </p>
                </div>
              </div>
              
              {currentTier !== 'reliance' && (
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('plans')}
                  className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
                >
                  <Icon name="ArrowUp" size={16} className="mr-2" />
                  Upgrade Plan
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <Button
                  key={tab?.id}
                  variant="ghost"
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span className="font-medium">{tab?.label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'plans' && (
            <div>
              <div className="mb-6">
                <h2 className="font-heading font-semibold text-2xl text-foreground mb-2">
                  Choose Your Plan
                </h2>
                <p className="text-muted-foreground">
                  Select the perfect plan for your matrimonial journey. All plans include Islamic compliance and family oversight.
                </p>
              </div>

              {/* Subscription Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {subscriptionPlans?.map((plan) => (
                  <SubscriptionCard
                    key={plan?.tier}
                    plan={plan}
                    isCurrentPlan={plan?.tier === currentTier}
                    onUpgrade={handleUpgrade}
                    onDowngrade={handleDowngrade}
                    className={plan?.isPopular ? 'ring-2 ring-trust-blue ring-opacity-50' : ''}
                  />
                ))}
              </div>

              {/* Benefits Section */}
              <div className="bg-gradient-to-r from-islamic-green/5 via-trust-blue/5 to-premium-purple/5 rounded-xl p-6 border border-border">
                <div className="text-center mb-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    Why Upgrade Your Plan?
                  </h3>
                  <p className="text-muted-foreground">
                    Unlock advanced features designed to help you find meaningful connections faster
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-islamic-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Users" size={24} className="text-islamic-green" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">More Matches</h4>
                    <p className="text-sm text-muted-foreground">
                      Get up to unlimited daily matches with advanced compatibility scoring
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-trust-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="MessageCircle" size={24} className="text-trust-blue" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Better Communication</h4>
                    <p className="text-sm text-muted-foreground">
                      Express interest freely and access full messaging capabilities
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-premium-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Shield" size={24} className="text-premium-purple" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Premium Features</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced filters, premium visibility, and priority support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comparison' && <FeatureComparison />}
          {activeTab === 'billing' && <BillingSettings />}
          {activeTab === 'history' && <PaymentHistory />}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card rounded-lg p-6 max-w-sm mx-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CreditCard" size={24} className="text-primary animate-pulse" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Processing...</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we update your subscription
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SubscriptionManagement;