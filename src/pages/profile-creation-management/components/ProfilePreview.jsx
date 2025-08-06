import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfilePreview = ({ profileData = {}, userTier = 'intention' }) => {
  const [viewMode, setViewMode] = useState('self'); // self, free, premium

  const mockProfileData = {
    fullName: profileData?.personalDetails?.fullName || 'Your Name',
    age: profileData?.personalDetails?.age || '28',
    location: profileData?.personalDetails?.location || 'Central Singapore',
    profession: profileData?.personalDetails?.profession || 'Software Engineer',
    education: profileData?.personalDetails?.education || 'Bachelor\'s Degree',
    profilePhoto: profileData?.photos?.profilePhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    aboutMe: profileData?.aboutMe?.aboutMe || 'Write something about yourself...',
    madhab: profileData?.islamicBackground?.madhab || 'Shafi\'i',
    prayerFrequency: profileData?.islamicBackground?.prayerFrequency || 'Always (5 times daily)',
    isVerified: profileData?.verification?.identityVerified || false,
    ...profileData
  };

  const viewModes = [
    { key: 'self', label: 'Your View', description: 'How you see your profile' },
    { key: 'free', label: 'Free User View', description: 'How free users see your profile' },
    { key: 'premium', label: 'Premium View', description: 'How premium users see your profile' }
  ];

  const shouldBlurPhoto = () => {
    if (viewMode === 'self') return false;
    if (viewMode === 'premium') return false;
    if (profileData?.photos?.photoPrivacy === 'blurred' && viewMode === 'free') return true;
    return false;
  };

  const getVisibleContent = () => {
    const baseContent = {
      name: mockProfileData?.fullName,
      age: mockProfileData?.age,
      location: mockProfileData?.location,
      profession: mockProfileData?.profession,
      education: mockProfileData?.education
    };

    if (viewMode === 'self') {
      return { ...baseContent, aboutMe: mockProfileData?.aboutMe, fullDetails: true };
    }

    if (viewMode === 'free') {
      return { 
        ...baseContent, 
        aboutMe: mockProfileData?.aboutMe?.substring(0, 100) + '...', 
        limitedDetails: true 
      };
    }

    return { ...baseContent, aboutMe: mockProfileData?.aboutMe, fullDetails: true };
  };

  const visibleContent = getVisibleContent();

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-lg">Profile Preview</h3>
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={18} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Live Preview</span>
          </div>
        </div>

        {/* View Mode Selector */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {viewModes?.map((mode) => (
            <button
              key={mode?.key}
              onClick={() => setViewMode(mode?.key)}
              className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-smooth ${
                viewMode === mode?.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {mode?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        {/* Profile Card Preview */}
        <div className="bg-background border border-border rounded-lg p-4 space-y-4">
          {/* Header */}
          <div className="flex items-start space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-border">
                <Image
                  src={mockProfileData?.profilePhoto}
                  alt="Profile preview"
                  className={`w-full h-full object-cover ${shouldBlurPhoto() ? 'filter blur-md' : ''}`}
                />
              </div>
              {shouldBlurPhoto() && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                  <Icon name="Lock" size={16} className="text-white" />
                </div>
              )}
              {mockProfileData?.isVerified && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Icon name="CheckCircle" size={12} className="text-white" />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-heading font-semibold text-base">{visibleContent?.name}</h4>
                {mockProfileData?.isVerified && (
                  <Icon name="BadgeCheck" size={16} className="text-success" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {visibleContent?.age} years • {visibleContent?.location}
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{visibleContent?.profession}</span>
                <span>•</span>
                <span>{visibleContent?.education}</span>
              </div>
            </div>

            {viewMode !== 'self' && (
              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm">
                  <Icon name="Heart" size={14} className="mr-1" />
                  Like
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MessageCircle" size={14} className="mr-1" />
                  Message
                </Button>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className="space-y-2">
            <h5 className="font-medium text-sm text-foreground">About</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {visibleContent?.aboutMe}
            </p>
            {visibleContent?.limitedDetails && (
              <div className="bg-premium-purple/5 border border-premium-purple/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-premium-purple" />
                  <p className="text-xs text-premium-purple font-medium">
                    Upgrade to read full profile
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Islamic Background */}
          <div className="space-y-2">
            <h5 className="font-medium text-sm text-foreground">Islamic Background</h5>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">Madhab:</span>
                <span className="ml-1 text-foreground">{mockProfileData?.madhab}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Prayer:</span>
                <span className="ml-1 text-foreground">{mockProfileData?.prayerFrequency}</span>
              </div>
            </div>
          </div>

          {/* Compatibility Score (Premium Feature) */}
          {viewMode === 'premium' && (
            <div className="bg-success/5 border border-success/20 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Heart" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Compatibility Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div className="w-12 h-2 bg-success rounded-full"></div>
                  </div>
                  <span className="text-sm font-mono text-success">85%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Mode Info */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {viewModes?.find(m => m?.key === viewMode)?.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {viewModes?.find(m => m?.key === viewMode)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Upgrade Prompt for Free Users */}
        {userTier === 'intention' && viewMode === 'free' && (
          <div className="mt-4 bg-premium-purple/5 border border-premium-purple/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Crown" size={20} className="text-premium-purple mt-0.5" />
              <div>
                <p className="font-medium text-premium-purple text-sm">Upgrade for Better Visibility</p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  Premium users see your full profile and you appear higher in their search results.
                </p>
                <Button variant="outline" size="sm" className="text-premium-purple border-premium-purple">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;