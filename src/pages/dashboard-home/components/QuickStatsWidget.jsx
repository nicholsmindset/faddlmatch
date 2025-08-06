import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStatsWidget = ({ stats, userTier }) => {
  const navigate = useNavigate();

  const statItems = [
    {
      label: 'Profile Views',
      value: stats?.profileViews,
      icon: 'Eye',
      color: 'text-trust-blue',
      bgColor: 'bg-trust-blue/10',
      path: '/profile-creation-management'
    },
    {
      label: 'Interests Received',
      value: stats?.interestsReceived,
      icon: 'Heart',
      color: 'text-islamic-green',
      bgColor: 'bg-islamic-green/10',
      path: '/messaging-center'
    },
    {
      label: 'Messages',
      value: stats?.messages,
      icon: 'MessageCircle',
      color: 'text-premium-purple',
      bgColor: 'bg-premium-purple/10',
      path: '/messaging-center'
    },
    {
      label: 'Matches Today',
      value: stats?.dailyMatches,
      icon: 'Users',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      path: '/match-discovery-search'
    }
  ];

  const handleStatClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Quick Stats
        </h2>
        <Icon name="TrendingUp" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {statItems?.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => handleStatClick(item?.path)}
            className="h-auto p-3 flex flex-col items-center space-y-2 hover:bg-muted/50 transition-smooth"
          >
            <div className={`w-10 h-10 rounded-full ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className="text-center">
              <p className="font-heading font-bold text-lg text-foreground">
                {item?.value}
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                {item?.label}
              </p>
            </div>
          </Button>
        ))}
      </div>
      {/* Tier-specific insights */}
      <div className="mt-4 pt-4 border-t border-border">
        {userTier === 'intention' ? (
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Upgrade to see who viewed your profile
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/subscription-management')}
              className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
            >
              Upgrade Now
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">This week:</span>
            <span className="text-success font-medium">
              +{stats?.weeklyGrowth}% activity
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickStatsWidget;