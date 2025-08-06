import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PrimaryNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/dashboard-home',
      icon: 'Home',
      description: 'Dashboard and daily matches'
    },
    {
      label: 'Discover',
      path: '/match-discovery-search',
      icon: 'Search',
      description: 'Find and explore matches'
    },
    {
      label: 'Messages',
      path: '/messaging-center',
      icon: 'MessageCircle',
      description: 'Chat with connections'
    },
    {
      label: 'Profile',
      path: '/profile-creation-management',
      icon: 'User',
      description: 'Manage your profile'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation - Horizontal Bar */}
      <nav className="hidden md:block bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-center space-x-8 py-3">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant="ghost"
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                  isActive(item?.path)
                    ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={isActive(item?.path) ? 'text-primary' : 'text-current'} 
                />
                <span className="font-medium text-sm">{item?.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </nav>
      {/* Mobile Navigation - Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border backdrop-blur supports-[backdrop-filter]:bg-card/95">
        <div className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant="ghost"
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 min-w-0 flex-1 transition-smooth ${
                isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={isActive(item?.path) ? 'text-primary' : 'text-current'} 
              />
              <span className={`font-caption text-xs font-medium ${
                isActive(item?.path) ? 'text-primary' : 'text-current'
              }`}>
                {item?.label}
              </span>
              {isActive(item?.path) && (
                <div className="w-1 h-1 bg-primary rounded-full" />
              )}
            </Button>
          ))}
        </div>
      </nav>
      {/* Mobile Navigation Spacer */}
      <div className="md:hidden h-16" />
    </>
  );
};

export default PrimaryNavigation;