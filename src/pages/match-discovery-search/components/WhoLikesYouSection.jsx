import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WhoLikesYouSection = ({ userTier = 'intention', likesCount = 0, previewProfiles = [] }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();

  const canViewLikes = userTier !== 'intention';

  const handleViewLikes = () => {
    if (!canViewLikes) {
      setShowUpgradeModal(true);
      return;
    }
    // Navigate to likes section or expand view
    console.log('Viewing likes');
  };

  const handleUpgrade = () => {
    navigate('/subscription-management');
    setShowUpgradeModal(false);
  };

  if (likesCount === 0) return null;

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
              <Icon name="Heart" size={20} className="text-error" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg">
                {likesCount} {likesCount === 1 ? 'person likes' : 'people like'} you
              </h3>
              <p className="text-sm text-muted-foreground">
                {canViewLikes ? 'See who expressed interest' : 'Upgrade to see who likes you'}
              </p>
            </div>
          </div>
          
          {!canViewLikes && (
            <div className="flex items-center space-x-1">
              <Icon name="Crown" size={16} className="text-premium-purple" />
              <span className="text-xs font-medium text-premium-purple">Premium</span>
            </div>
          )}
        </div>

        {/* Preview Profiles */}
        <div className="flex items-center space-x-3 mb-4">
          {previewProfiles?.slice(0, 4)?.map((profile, index) => (
            <div key={profile?.id} className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                <Image
                  src={profile?.photo}
                  alt={profile?.name}
                  className={`w-full h-full object-cover ${!canViewLikes ? 'blur-sm' : ''}`}
                />
              </div>
              {!canViewLikes && (
                <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                  <Icon name="Lock" size={12} className="text-white" />
                </div>
              )}
            </div>
          ))}
          
          {likesCount > 4 && (
            <div className="w-12 h-12 rounded-full bg-muted border-2 border-border flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">
                +{likesCount - 4}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant={canViewLikes ? "default" : "outline"}
          onClick={handleViewLikes}
          className={`w-full ${
            !canViewLikes 
              ? 'text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white' :''
          }`}
        >
          {canViewLikes ? (
            <>
              <Icon name="Eye" size={16} className="mr-2" />
              View All Likes
            </>
          ) : (
            <>
              <Icon name="Crown" size={16} className="mr-2" />
              Upgrade to See Likes
            </>
          )}
        </Button>

        {/* Upgrade Benefits */}
        {!canViewLikes && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2">
              With Patience plan, you'll also get:
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-trust-blue/10 text-trust-blue text-xs font-caption">
                Express interest
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-trust-blue/10 text-trust-blue text-xs font-caption">
                Advanced filters
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-trust-blue/10 text-trust-blue text-xs font-caption">
                20 daily matches
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" size={32} className="text-error" />
              </div>
              
              <h3 className="font-heading font-semibold text-xl mb-2">
                {likesCount} {likesCount === 1 ? 'Person Likes' : 'People Like'} You!
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Upgrade to Patience or Reliance plan to see who expressed interest in your profile and start meaningful conversations.
              </p>

              {/* Preview Blurred Profiles */}
              <div className="flex justify-center space-x-2 mb-6">
                {previewProfiles?.slice(0, 3)?.map((profile) => (
                  <div key={profile?.id} className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border">
                      <Image
                        src={profile?.photo}
                        alt="Profile"
                        className="w-full h-full object-cover blur-sm"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                      <Icon name="Lock" size={16} className="text-white" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Button
                  variant="default"
                  onClick={handleUpgrade}
                  className="w-full bg-premium-purple hover:bg-premium-purple/90"
                >
                  <Icon name="Crown" size={16} className="mr-2" />
                  Upgrade Now
                </Button>
                
                <Button
                  variant="ghost"
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhoLikesYouSection;