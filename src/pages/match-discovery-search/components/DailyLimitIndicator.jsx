import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DailyLimitIndicator = ({ userTier = 'intention', usedMatches, onUpgrade }) => {
  const [timeUntilRefresh, setTimeUntilRefresh] = useState('');

  const tierLimits = {
    intention: { daily: 5, color: 'islamic-green' },
    patience: { daily: 20, color: 'trust-blue' },
    reliance: { daily: 'unlimited', color: 'premium-purple' }
  };

  const currentTier = tierLimits?.[userTier];
  const isUnlimited = currentTier?.daily === 'unlimited';
  const remainingMatches = isUnlimited ? 'unlimited' : Math.max(0, currentTier?.daily - usedMatches);
  const isLimitReached = !isUnlimited && usedMatches >= currentTier?.daily;

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow?.setDate(tomorrow?.getDate() + 1);
      tomorrow?.setHours(0, 0, 0, 0);
      
      const diff = tomorrow - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilRefresh(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getProgressPercentage = () => {
    if (isUnlimited) return 0;
    return (usedMatches / currentTier?.daily) * 100;
  };

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return 'bg-error';
    if (percentage >= 80) return 'bg-warning';
    return `bg-${currentTier?.color}`;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 mb-4`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name={userTier === 'reliance' ? 'Crown' : userTier === 'patience' ? 'Shield' : 'Heart'} 
            size={20} 
            className={`text-${currentTier?.color}`} 
          />
          <h3 className="font-heading font-semibold text-sm">
            Daily Match Limit
          </h3>
        </div>
        
        {!isUnlimited && (
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">
              {remainingMatches} remaining
            </p>
            <p className="text-xs text-muted-foreground font-mono">
              of {currentTier?.daily} daily
            </p>
          </div>
        )}
      </div>
      {/* Progress Bar */}
      {!isUnlimited && (
        <div className="mb-3">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`${getProgressColor()} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}
      {/* Status Message */}
      <div className="flex items-center justify-between">
        <div>
          {isUnlimited ? (
            <p className="text-sm text-success font-medium">
              <Icon name="Infinity" size={16} className="inline mr-1" />
              Unlimited daily matches
            </p>
          ) : isLimitReached ? (
            <p className="text-sm text-error font-medium">
              <Icon name="AlertCircle" size={16} className="inline mr-1" />
              Daily limit reached
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              <Icon name="Clock" size={16} className="inline mr-1" />
              Resets in {timeUntilRefresh}
            </p>
          )}
        </div>

        {/* Upgrade Button */}
        {userTier !== 'reliance' && (
          <Button
            variant="outline"
            size="sm"
            onClick={onUpgrade}
            className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
          >
            <Icon name="ArrowUp" size={14} className="mr-1" />
            Upgrade
          </Button>
        )}
      </div>
      {/* Tier Benefits Preview */}
      {userTier === 'intention' && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">
            Upgrade to get more daily matches:
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-trust-blue/10 text-trust-blue text-xs font-caption">
              Patience: 20/day
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-premium-purple/10 text-premium-purple text-xs font-caption">
              Reliance: Unlimited
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyLimitIndicator;