import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = ({ userName, userTier, completionPercentage }) => {
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getTierInfo = () => {
    switch (userTier) {
      case 'intention':
        return {
          label: 'Intention Plan',
          color: 'text-islamic-green',
          bgColor: 'bg-islamic-green/10',
          icon: 'Heart'
        };
      case 'patience':
        return {
          label: 'Patience Plan',
          color: 'text-trust-blue',
          bgColor: 'bg-trust-blue/10',
          icon: 'Shield'
        };
      case 'reliance':
        return {
          label: 'Reliance Plan',
          color: 'text-premium-purple',
          bgColor: 'bg-premium-purple/10',
          icon: 'Crown'
        };
      default:
        return {
          label: 'Free Plan',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'User'
        };
    }
  };

  const tierInfo = getTierInfo();
  const isProfileIncomplete = completionPercentage < 100;

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-border rounded-lg p-6 mb-6 islamic-pattern">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Welcome Message */}
        <div className="mb-4 md:mb-0">
          <h1 className="font-heading font-bold text-2xl text-foreground mb-2">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-muted-foreground font-caption">
            Welcome back to your matrimonial journey
          </p>
          
          {/* Tier Badge */}
          <div className="flex items-center space-x-2 mt-3">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${tierInfo?.bgColor} ${tierInfo?.color}`}>
              <Icon name={tierInfo?.icon} size={16} />
              <span className="text-sm font-medium">{tierInfo?.label}</span>
            </div>
            
            {userTier !== 'reliance' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/subscription-management')}
                className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
              >
                Upgrade
              </Button>
            )}
          </div>
        </div>

        {/* Profile Completion or Islamic Quote */}
        <div className="flex flex-col items-end space-y-3">
          {isProfileIncomplete ? (
            <div className="bg-card border border-border rounded-lg p-4 max-w-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Profile Completion
                </span>
                <span className="text-sm font-bold text-primary">
                  {completionPercentage}%
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2 mb-3">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/profile-creation-management')}
                className="w-full"
                iconName="Edit"
                iconPosition="left"
                iconSize={14}
              >
                Complete Profile
              </Button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-4 max-w-sm text-center">
              <Icon name="Quote" size={20} className="text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground font-caption italic">
                "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them."
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                - Quran 30:21
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;