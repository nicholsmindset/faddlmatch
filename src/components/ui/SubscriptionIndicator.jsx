import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const SubscriptionIndicator = ({ 
  tier = 'intention', 
  showUpgrade = true, 
  showUsage = false, 
  usageData = null,
  className = '' 
}) => {
  const navigate = useNavigate();

  const tierConfig = {
    intention: {
      label: 'Intention',
      color: 'islamic-green',
      bgColor: 'bg-islamic-green/10',
      borderColor: 'border-islamic-green/20',
      textColor: 'text-islamic-green',
      icon: 'Heart',
      description: 'Free plan with basic features'
    },
    patience: {
      label: 'Patience',
      color: 'trust-blue',
      bgColor: 'bg-trust-blue/10',
      borderColor: 'border-trust-blue/20',
      textColor: 'text-trust-blue',
      icon: 'Shield',
      description: 'Enhanced matching and messaging'
    },
    reliance: {
      label: 'Reliance',
      color: 'premium-purple',
      bgColor: 'bg-premium-purple/10',
      borderColor: 'border-premium-purple/20',
      textColor: 'text-premium-purple',
      icon: 'Crown',
      description: 'Premium features and priority support'
    }
  };

  const currentTier = tierConfig?.[tier];
  const canUpgrade = tier !== 'reliance';

  const handleUpgrade = () => {
    navigate('/subscription-management');
  };

  const getUsagePercentage = (used, total) => {
    return Math.min((used / total) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 70) return 'bg-warning';
    return `bg-${currentTier?.color}`;
  };

  return (
    <div className={`${currentTier?.bgColor} ${currentTier?.borderColor} border rounded-lg p-4 ${className}`}>
      {/* Tier Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 ${currentTier?.bgColor} rounded-lg flex items-center justify-center`}>
            <Icon 
              name={currentTier?.icon} 
              size={16} 
              className={currentTier?.textColor} 
            />
          </div>
          <div>
            <h3 className={`font-heading font-semibold text-sm ${currentTier?.textColor}`}>
              {currentTier?.label} Plan
            </h3>
            <p className="text-xs text-muted-foreground">
              {currentTier?.description}
            </p>
          </div>
        </div>
        
        {showUpgrade && canUpgrade && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleUpgrade}
            className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
          >
            <Icon name="ArrowUp" size={14} className="mr-1" />
            Upgrade
          </Button>
        )}
      </div>
      {/* Usage Information */}
      {showUsage && usageData && (
        <div className="space-y-3">
          {usageData?.map((usage, index) => {
            const percentage = getUsagePercentage(usage?.used, usage?.total);
            const usageColor = getUsageColor(percentage);
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-caption text-muted-foreground">
                    {usage?.label}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {usage?.used}/{usage?.total}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`${usageColor} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                {percentage >= 90 && (
                  <p className="text-xs text-error font-medium">
                    Limit almost reached
                  </p>
                )}
              </div>
            );
          })}
          
          {canUpgrade && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpgrade}
              className="w-full mt-3 text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
            >
              Upgrade for unlimited access
            </Button>
          )}
        </div>
      )}
      {/* Tier Benefits Preview */}
      {tier === 'intention' && showUpgrade && (
        <div className="mt-3 pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">
            Upgrade to unlock:
          </p>
          <div className="flex flex-wrap gap-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-trust-blue/10 text-trust-blue text-xs font-caption">
              Advanced filters
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full bg-premium-purple/10 text-premium-purple text-xs font-caption">
              Priority matching
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionIndicator;