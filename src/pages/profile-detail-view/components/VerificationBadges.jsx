import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationBadges = ({ verifications }) => {
  const badgeConfig = {
    identity: {
      icon: 'Shield',
      label: 'Identity Verified',
      color: 'text-success bg-success/10 border-success/20'
    },
    phone: {
      icon: 'Phone',
      label: 'Phone Verified',
      color: 'text-trust-blue bg-trust-blue/10 border-trust-blue/20'
    },
    email: {
      icon: 'Mail',
      label: 'Email Verified',
      color: 'text-trust-blue bg-trust-blue/10 border-trust-blue/20'
    },
    guardian: {
      icon: 'Users',
      label: 'Guardian Approved',
      color: 'text-premium-purple bg-premium-purple/10 border-premium-purple/20'
    },
    islamic: {
      icon: 'Star',
      label: 'Islamic Verified',
      color: 'text-islamic-green bg-islamic-green/10 border-islamic-green/20'
    }
  };

  const verifiedBadges = Object.entries(verifications)?.filter(([key, value]) => value)?.map(([key]) => key);

  if (verifiedBadges?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg p-4 border border-border">
      <h3 className="font-heading font-semibold text-lg mb-3 text-foreground">
        Verification Status
      </h3>
      <div className="flex flex-wrap gap-2">
        {verifiedBadges?.map((badge) => {
          const config = badgeConfig?.[badge];
          return (
            <div
              key={badge}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full border ${config?.color}`}
            >
              <Icon name={config?.icon} size={14} />
              <span className="text-sm font-caption font-medium">
                {config?.label}
              </span>
            </div>
          );
        })}
      </div>
      {verifiedBadges?.length >= 3 && (
        <div className="mt-3 p-3 bg-success/5 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              Highly Verified Profile
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            This profile has completed multiple verification steps
          </p>
        </div>
      )}
    </div>
  );
};

export default VerificationBadges;