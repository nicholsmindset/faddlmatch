import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationShortcuts = ({ userTier, unreadMessages = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const shortcuts = [
    {
      label: 'Messages',
      path: '/messaging-center',
      icon: 'MessageCircle',
      color: 'text-trust-blue',
      bgColor: 'bg-trust-blue/10',
      description: 'Chat with matches',
      badge: unreadMessages > 0 ? unreadMessages : null,
      available: true
    },
    {
      label: 'Search',
      path: '/match-discovery-search',
      icon: 'Search',
      color: 'text-islamic-green',
      bgColor: 'bg-islamic-green/10',
      description: 'Find new matches',
      available: true
    },
    {
      label: 'Profile',
      path: '/profile-creation-management',
      icon: 'User',
      color: 'text-premium-purple',
      bgColor: 'bg-premium-purple/10',
      description: 'Edit your profile',
      available: true
    },
    {
      label: 'Video Call',
      path: '/messaging-center',
      icon: 'Video',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      description: 'Halal video calls',
      available: userTier === 'reliance',
      premium: true
    }
  ];

  const handleShortcutClick = (shortcut) => {
    if (!shortcut?.available) {
      navigate('/subscription-management');
      return;
    }
    navigate(shortcut?.path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Quick Actions
        </h2>
        <Icon name="Zap" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {shortcuts?.map((shortcut, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={() => handleShortcutClick(shortcut)}
            disabled={!shortcut?.available && !shortcut?.premium}
            className={`h-auto p-4 flex flex-col items-center space-y-2 relative transition-smooth ${
              isActive(shortcut?.path)
                ? `${shortcut?.bgColor} ${shortcut?.color}`
                : 'hover:bg-muted/50'
            } ${!shortcut?.available ? 'opacity-60' : ''}`}
          >
            {/* Badge for notifications */}
            {shortcut?.badge && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-medium">
                {shortcut?.badge > 9 ? '9+' : shortcut?.badge}
              </div>
            )}

            {/* Premium lock icon */}
            {!shortcut?.available && shortcut?.premium && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-premium-purple text-premium-purple-foreground rounded-full flex items-center justify-center">
                <Icon name="Lock" size={12} />
              </div>
            )}

            <div className={`w-12 h-12 rounded-full ${shortcut?.bgColor} flex items-center justify-center`}>
              <Icon 
                name={shortcut?.icon} 
                size={24} 
                className={shortcut?.available ? shortcut?.color : 'text-muted-foreground'} 
              />
            </div>
            
            <div className="text-center">
              <p className="font-medium text-sm text-foreground">
                {shortcut?.label}
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                {shortcut?.description}
              </p>
            </div>
          </Button>
        ))}
      </div>
      {/* Upgrade section for free users */}
      {userTier === 'intention' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Unlock premium features
            </p>
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-trust-blue/10 text-trust-blue text-xs font-caption">
                Advanced search
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-premium-purple/10 text-premium-purple text-xs font-caption">
                Video calls
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/subscription-management')}
              className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
              iconName="Crown"
              iconPosition="left"
              iconSize={14}
            >
              View Plans
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationShortcuts;