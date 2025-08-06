import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const GlobalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [userTier, setUserTier] = useState('intention'); // intention, patience, reliance
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();

  // Mock user data - in real app, this would come from userProfile
  const userData = {
    name: userProfile?.full_name || 'Amira Hassan',
    avatar: userProfile?.profile_photo || '/assets/images/user-avatar.jpg',
    tier: userTier,
    tierLabel: userTier === 'intention' ? 'Intention' : userTier === 'patience' ? 'Patience' : 'Reliance'
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'intention': return 'text-islamic-green border-islamic-green';
      case 'patience': return 'text-trust-blue border-trust-blue';
      case 'reliance': return 'text-premium-purple border-premium-purple';
      default: return 'text-islamic-green border-islamic-green';
    }
  };

  const handleNotificationClick = () => {
    // Toggle notification center
    console.log('Opening notification center');
  };

  const handleUpgradeClick = () => {
    navigate('/subscription-management');
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/user-login');
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileSettings = () => {
    navigate('/profile-creation-management');
    setIsProfileDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target?.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
              <path d="M12 8L12.5 10.5L15 11L12.5 11.5L12 14L11.5 11.5L9 11L11.5 10.5L12 8Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-semibold text-lg text-foreground">
              FADDLmatch
            </span>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="ml-auto flex items-center space-x-4">
          {/* Subscription Tier Indicator */}
          <div className={`hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full border ${getTierColor(userData?.tier)} bg-card`}>
            <div className={`w-2 h-2 rounded-full ${userData?.tier === 'intention' ? 'bg-islamic-green' : userData?.tier === 'patience' ? 'bg-trust-blue' : 'bg-premium-purple'}`} />
            <span className="text-sm font-caption font-medium">{userData?.tierLabel}</span>
          </div>

          {/* Upgrade Button for non-premium users */}
          {userData?.tier !== 'reliance' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpgradeClick}
              className="hidden sm:flex text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
            >
              Upgrade
            </Button>
          )}

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNotificationClick}
            className="relative"
          >
            <Icon name="Bell" size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-medium">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </Button>

          {/* User Profile with Dropdown */}
          <div className="relative profile-dropdown">
            <Button
              variant="ghost"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 p-2"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-border">
                <Image
                  src={userData?.avatar}
                  alt={userData?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden lg:block font-medium text-sm">{userData?.name}</span>
              <Icon name="ChevronDown" size={16} className={`transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                      <Image
                        src={userData?.avatar}
                        alt={userData?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground">{userData?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <div className={`flex items-center space-x-1 mt-1 ${getTierColor(userData?.tier)}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${userData?.tier === 'intention' ? 'bg-islamic-green' : userData?.tier === 'patience' ? 'bg-trust-blue' : 'bg-premium-purple'}`} />
                        <span className="text-xs font-medium">{userData?.tierLabel} Plan</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <Button
                    variant="ghost"
                    onClick={handleProfileSettings}
                    className="w-full justify-start text-left"
                  >
                    <Icon name="User" size={16} className="mr-3" />
                    Edit Profile
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate('/subscription-management');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full justify-start text-left"
                  >
                    <Icon name="Crown" size={16} className="mr-3" />
                    Subscription
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate('/contact-page');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full justify-start text-left"
                  >
                    <Icon name="HelpCircle" size={16} className="mr-3" />
                    Support
                  </Button>
                  
                  <div className="border-t border-border my-2" />
                  
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full justify-start text-left text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="px-4 py-2 space-y-1">
            {/* Mobile Tier Display */}
            <div className="px-3 py-2 mb-4 border-b border-border">
              <div className={`flex items-center space-x-2 mb-2 ${getTierColor(userData?.tier)}`}>
                <div className={`w-2 h-2 rounded-full ${userData?.tier === 'intention' ? 'bg-islamic-green' : userData?.tier === 'patience' ? 'bg-trust-blue' : 'bg-premium-purple'}`} />
                <span className="text-sm font-caption font-medium">{userData?.tierLabel} Plan</span>
              </div>
              
              {userData?.tier !== 'reliance' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUpgradeClick}
                  className="w-full text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
                >
                  Upgrade Plan
                </Button>
              )}
            </div>

            {/* Mobile Profile Actions */}
            <Button
              variant="ghost"
              onClick={handleProfileSettings}
              className="w-full justify-start"
            >
              <Icon name="User" size={18} className="mr-3" />
              Edit Profile
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => {
                navigate('/subscription-management');
                setIsMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              <Icon name="Crown" size={18} className="mr-3" />
              Subscription
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => {
                navigate('/contact-page');
                setIsMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              <Icon name="HelpCircle" size={18} className="mr-3" />
              Support
            </Button>
            
            <div className="border-t border-border my-2" />
            
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Icon name="LogOut" size={18} className="mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default GlobalHeader;