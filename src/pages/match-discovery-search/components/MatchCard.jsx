import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MatchCard = ({ match, userTier = 'intention', onExpressInterest, onSendMessage }) => {
  const [isLiked, setIsLiked] = useState(match?.isLiked || false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const navigate = useNavigate();

  const canViewClearPhoto = userTier !== 'intention' || match?.hasExpressedInterest;
  const canExpressInterest = userTier !== 'intention';
  const canSendMessage = userTier === 'reliance' || match?.hasExpressedInterest;

  const handleViewProfile = () => {
    navigate('/profile-detail-view', { state: { profileId: match?.id } });
  };

  const handleExpressInterest = () => {
    if (!canExpressInterest) {
      setShowUpgradePrompt(true);
      return;
    }
    setIsLiked(!isLiked);
    onExpressInterest(match?.id, !isLiked);
  };

  const handleSendMessage = () => {
    if (!canSendMessage) {
      setShowUpgradePrompt(true);
      return;
    }
    onSendMessage(match?.id);
  };

  const getCompatibilityColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 75) return 'text-islamic-green bg-islamic-green/10';
    if (score >= 60) return 'text-warning bg-warning/10';
    return 'text-muted-foreground bg-muted';
  };

  const getTierBadgeColor = (tier) => {
    switch (tier) {
      case 'reliance': return 'bg-premium-purple text-white';
      case 'patience': return 'bg-trust-blue text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-smooth">
      {/* Profile Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={match?.photo}
            alt={match?.name}
            className={`w-full h-full object-cover ${!canViewClearPhoto ? 'blur-md' : ''}`}
          />
          
          {/* Blur Overlay for Free Users */}
          {!canViewClearPhoto && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 text-center">
                <Icon name="Lock" size={24} className="text-premium-purple mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">Upgrade to view</p>
              </div>
            </div>
          )}

          {/* Online Status */}
          {match?.isOnline && (
            <div className="absolute top-3 left-3 w-3 h-3 bg-success rounded-full border-2 border-white" />
          )}

          {/* Tier Badge */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getTierBadgeColor(match?.tier)}`}>
            {match?.tier === 'reliance' ? 'Premium' : match?.tier === 'patience' ? 'Plus' : 'Basic'}
          </div>

          {/* Compatibility Score */}
          <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getCompatibilityColor(match?.compatibilityScore)}`}>
            {match?.compatibilityScore}% match
          </div>

          {/* Like Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExpressInterest}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-foreground w-8 h-8"
          >
            <Icon 
              name={isLiked ? "Heart" : "Heart"} 
              size={16} 
              className={isLiked ? "text-error fill-current" : "text-muted-foreground"} 
            />
          </Button>
        </div>
      </div>
      {/* Profile Info */}
      <div className="p-4">
        {/* Name and Age */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-semibold text-lg text-foreground truncate">
            {match?.name}
          </h3>
          <span className="text-sm text-muted-foreground font-mono">
            {match?.age}
          </span>
        </div>

        {/* Basic Info */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="MapPin" size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{match?.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Briefcase" size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{match?.profession}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="GraduationCap" size={14} className="mr-2 flex-shrink-0" />
            <span className="truncate">{match?.education}</span>
          </div>
        </div>

        {/* Islamic Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Moon" size={14} className="mr-2" />
            <span>{match?.madhab}</span>
          </div>
          <div className="flex items-center text-sm text-islamic-green">
            <Icon name="Star" size={14} className="mr-1" />
            <span>{match?.practiceLevel}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            variant="default"
            onClick={handleViewProfile}
            className="w-full"
          >
            <Icon name="Eye" size={16} className="mr-2" />
            View Profile
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              onClick={handleExpressInterest}
              className={`${isLiked ? 'text-error border-error' : ''} ${!canExpressInterest ? 'opacity-50' : ''}`}
            >
              <Icon name="Heart" size={16} className="mr-1" />
              {isLiked ? 'Liked' : 'Like'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleSendMessage}
              className={!canSendMessage ? 'opacity-50' : ''}
            >
              <Icon name="MessageCircle" size={16} className="mr-1" />
              Message
            </Button>
          </div>
        </div>

        {/* Last Active */}
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">
            {match?.isOnline ? 'Online now' : `Active ${match?.lastActive}`}
          </p>
        </div>
      </div>
      {/* Upgrade Prompt Modal */}
      {showUpgradePrompt && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-sm w-full">
            <div className="text-center">
              <Icon name="Crown" size={48} className="text-premium-purple mx-auto mb-4" />
              <h3 className="font-heading font-semibold text-lg mb-2">Upgrade Required</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upgrade to Patience or Reliance plan to express interest and send messages.
              </p>
              <div className="space-y-2">
                <Button
                  variant="default"
                  onClick={() => navigate('/subscription-management')}
                  className="w-full bg-premium-purple hover:bg-premium-purple/90"
                >
                  Upgrade Now
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowUpgradePrompt(false)}
                  className="w-full"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCard;