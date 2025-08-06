import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileSummaryPanel = ({ 
  conversation, 
  userTier = 'intention',
  onUpgrade = () => {} 
}) => {
  const navigate = useNavigate();

  if (!conversation) {
    return null;
  }

  // Mock profile data
  const profileData = {
    age: 28,
    location: 'Singapore',
    education: 'Bachelor\'s in Computer Science',
    profession: 'Software Engineer',
    religiosity: 'Practicing Muslim',
    maritalStatus: 'Divorced',
    children: 'None',
    interests: ['Reading Quran', 'Cooking', 'Traveling', 'Volunteering'],
    aboutMe: `Assalamu alaikum! I'm a practicing Muslim looking for a life partner who shares similar values and faith. I believe in building a relationship based on mutual respect, understanding, and Islamic principles.\n\nI enjoy spending time in nature, learning about Islamic history, and volunteering at the local mosque. Family is very important to me, and I'm looking for someone who values family bonds and traditions.`,
    familyInfo: {
      fatherOccupation: 'Business Owner',
      motherOccupation: 'Teacher',
      siblings: '2 sisters, 1 brother',
      familyValues: 'Traditional Islamic values'
    }
  };

  const handleViewFullProfile = () => {
    navigate('/profile-detail-view', { 
      state: { profileId: conversation?.id } 
    });
  };

  const getVisibilityInfo = () => {
    switch (userTier) {
      case 'intention':
        return {
          canViewFull: false,
          message: 'Upgrade to view full profile details'
        };
      case 'patience':
        return {
          canViewFull: true,
          message: 'Full profile access available'
        };
      case 'reliance':
        return {
          canViewFull: true,
          message: 'Premium profile access with priority features'
        };
      default:
        return {
          canViewFull: false,
          message: 'Limited profile access'
        };
    }
  };

  const visibilityInfo = getVisibilityInfo();

  return (
    <div className="w-80 bg-card border-l border-border overflow-y-auto">
      {/* Profile Header */}
      <div className="p-6 border-b border-border">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-border mb-4">
            <Image
              src={conversation?.avatar}
              alt={conversation?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-heading font-semibold text-xl text-foreground mb-1">
            {conversation?.name}
          </h2>
          <p className="text-muted-foreground font-caption">
            {profileData?.age} years • {profileData?.location}
          </p>
          
          {/* Online Status */}
          <div className="flex items-center justify-center space-x-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${
              conversation?.isOnline ? 'bg-success' : 'bg-muted-foreground'
            }`} />
            <span className="text-sm text-muted-foreground font-caption">
              {conversation?.isOnline ? 'Online now' : 'Last seen recently'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={handleViewFullProfile}
            className="flex-1"
            variant="outline"
          >
            <Icon name="User" size={16} className="mr-2" />
            View Profile
          </Button>
          {userTier === 'reliance' && (
            <Button
              variant="outline"
              size="icon"
              className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
            >
              <Icon name="Video" size={16} />
            </Button>
          )}
        </div>
      </div>
      {/* Quick Info */}
      <div className="p-4 space-y-4">
        <div>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
            Quick Information
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Education</span>
              <span className="text-sm text-foreground font-medium">
                {visibilityInfo?.canViewFull ? profileData?.education : 'Bachelor\'s Degree'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Profession</span>
              <span className="text-sm text-foreground font-medium">
                {visibilityInfo?.canViewFull ? profileData?.profession : 'Professional'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Religiosity</span>
              <span className="text-sm text-foreground font-medium">
                {profileData?.religiosity}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className="text-sm text-foreground font-medium">
                {profileData?.maritalStatus}
              </span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
            About
          </h3>
          {visibilityInfo?.canViewFull ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {profileData?.aboutMe?.split('\n')?.[0]}...
            </p>
          ) : (
            <div className="relative">
              <p className="text-sm text-muted-foreground leading-relaxed blur-sm">
                {profileData?.aboutMe?.split('\n')?.[0]?.substring(0, 100)}...
              </p>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onUpgrade}
                  className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
                >
                  <Icon name="Lock" size={14} className="mr-1" />
                  Upgrade to view
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Interests */}
        <div>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
            Interests
          </h3>
          {visibilityInfo?.canViewFull ? (
            <div className="flex flex-wrap gap-2">
              {profileData?.interests?.slice(0, 4)?.map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-caption"
                >
                  {interest}
                </span>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {['Interest 1', 'Interest 2', 'Interest 3']?.map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-caption blur-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Family Information - Premium Feature */}
        {userTier === 'reliance' && (
          <div>
            <h3 className="font-heading font-semibold text-sm text-foreground mb-3">
              Family Information
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Father</span>
                <span className="text-sm text-foreground font-medium">
                  {profileData?.familyInfo?.fatherOccupation}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Mother</span>
                <span className="text-sm text-foreground font-medium">
                  {profileData?.familyInfo?.motherOccupation}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Siblings</span>
                <span className="text-sm text-foreground font-medium">
                  {profileData?.familyInfo?.siblings}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Guardian Access Indicator */}
        {conversation?.hasGuardianAccess && (
          <div className="p-3 bg-premium-purple/10 border border-premium-purple/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={16} className="text-premium-purple" />
              <span className="text-sm font-medium text-premium-purple">
                Guardian Oversight
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              This conversation includes family guardian oversight for Islamic compliance
            </p>
          </div>
        )}

        {/* Upgrade Prompt for Free Users */}
        {!visibilityInfo?.canViewFull && (
          <div className="p-4 bg-premium-purple/10 border border-premium-purple/20 rounded-lg">
            <div className="text-center">
              <Icon name="Lock" size={24} className="text-premium-purple mx-auto mb-2" />
              <h4 className="font-heading font-semibold text-sm text-premium-purple mb-1">
                Unlock Full Profile
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                {visibilityInfo?.message}
              </p>
              <Button
                onClick={onUpgrade}
                size="sm"
                className="w-full bg-premium-purple hover:bg-premium-purple/90 text-white"
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Islamic Compliance Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={14} className="text-islamic-green" />
          <p className="text-xs text-muted-foreground font-caption">
            Profile verified for Islamic compliance
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummaryPanel;