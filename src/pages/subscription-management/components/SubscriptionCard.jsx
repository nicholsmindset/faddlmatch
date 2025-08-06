import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import { Check, Crown, Heart, Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEmailNotifications } from '../../../hooks/useEmailNotifications';

const SubscriptionCard = ({ 
  plan, 
  isCurrentPlan, 
  isPopular, 
  onUpgrade,
  user 
}) => {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const { sendSubscriptionConfirmation } = useEmailNotifications();

  const getCardStyles = () => {
    switch (plan?.tier) {
      case 'intention':
        return {
          borderColor: 'border-islamic-green',
          bgColor: 'bg-islamic-green/5',
          accentColor: 'text-islamic-green',
          buttonColor: 'bg-islamic-green hover:bg-islamic-green/90'
        };
      case 'patience':
        return {
          borderColor: 'border-trust-blue',
          bgColor: 'bg-trust-blue/5',
          accentColor: 'text-trust-blue',
          buttonColor: 'bg-trust-blue hover:bg-trust-blue/90'
        };
      case 'reliance':
        return {
          borderColor: 'border-premium-purple',
          bgColor: 'bg-premium-purple/5',
          accentColor: 'text-premium-purple',
          buttonColor: 'bg-premium-purple hover:bg-premium-purple/90'
        };
      default:
        return {
          borderColor: 'border-border',
          bgColor: 'bg-card',
          accentColor: 'text-foreground',
          buttonColor: 'bg-primary hover:bg-primary/90'
        };
    }
  };

  const handleUpgrade = async () => {
    if (isCurrentPlan || isUpgrading) return;
    
    setIsUpgrading(true);
    
    try {
      // Process subscription upgrade
      await onUpgrade?.(plan);
      
      // Send confirmation email
      if (user?.email && user?.full_name) {
        try {
          const planFeatures = getPlanFeatures(plan?.tier);
          await sendSubscriptionConfirmation(
            user?.email,
            user?.full_name,
            plan?.name,
            planFeatures
          );
        } catch (emailError) {
          console.error('Failed to send subscription confirmation email:', emailError);
          // Don't prevent upgrade if email fails
        }
      }
    } catch (error) {
      console.error('Upgrade failed:', error);
    } finally {
      setIsUpgrading(false);
    }
  };

  const getPlanFeatures = (tier) => {
    const featureMap = {
      intention: [
        'Basic profile creation',
        '5 daily matches',
        'Standard messaging',
        'Basic search filters'
      ],
      patience: [
        'Enhanced profile features', 
        '15 daily matches',
        'Priority messaging',
        'Advanced search filters',
        'Read receipts',
        'Profile visitors info'
      ],
      reliance: [
        'Premium profile features',
        'Unlimited daily matches', 
        'VIP messaging priority',
        'All search filters',
        'Advanced analytics',
        'Priority customer support',
        'Profile boost feature'
      ]
    };
    return featureMap?.[tier] || featureMap?.intention;
  };

  const styles = getCardStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
        isPopular 
          ? 'border-purple-500 transform scale-105' 
          : isCurrentPlan 
            ? 'border-green-500' :'border-gray-200'
      } transition-all duration-300 hover:shadow-xl`}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute -top-4 right-4">
          <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Current Plan
          </span>
        </div>
      )}
      {/* Plan Header */}
      <div className="text-center mb-8">
        <div className="mb-4">
          {plan?.tier === 'intention' && <Heart className="w-12 h-12 text-blue-500 mx-auto" />}
          {plan?.tier === 'patience' && <Crown className="w-12 h-12 text-purple-500 mx-auto" />}
          {plan?.tier === 'reliance' && <Star className="w-12 h-12 text-yellow-500 mx-auto" />}
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan?.name}</h3>
        <p className="text-gray-600 mb-4">{plan?.description}</p>
        
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900">${plan?.price}</span>
          <span className="text-gray-600">/{plan?.period}</span>
        </div>
      </div>
      {/* Features List */}
      <div className="mb-8">
        <ul className="space-y-3">
          {getPlanFeatures(plan?.tier)?.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Action Button */}
      <button
        onClick={handleUpgrade}
        disabled={isCurrentPlan || isUpgrading}
        className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
          isCurrentPlan
            ? 'bg-green-100 text-green-700 cursor-default'
            : isPopular
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 shadow-lg'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
        } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
      >
        {isUpgrading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Processing...
          </div>
        ) : isCurrentPlan ? (
          'Current Plan'
        ) : (
          `Upgrade to ${plan?.name}`
        )}
      </button>
      {/* Money Back Guarantee */}
      {!isCurrentPlan && (
        <p className="text-center text-sm text-gray-500 mt-4">
          30-day money-back guarantee
        </p>
      )}
      {/* Islamic Quote for Premium Plans */}
      {(plan?.tier === 'patience' || plan?.tier === 'reliance') && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic text-center">
            "And whoever relies upon Allah - then He is sufficient for him. 
            Indeed, Allah will accomplish His purpose." - Quran 65:3
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default SubscriptionCard;