import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DailyMatchCard = ({ match, userTier, onExpressInterest }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile-detail-view?id=${match?.id}`);
  };

  const handleExpressInterest = () => {
    onExpressInterest?.(match?.id);
  };

  const getPhotoUrl = () => {
    if (!match?.photo_url) {
      return 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face';
    }
    return match?.photo_url;
  };

  const shouldBlurPhoto = () => {
    // Photos are blurred for free tier users or if specifically marked as blurred
    return userTier === 'intention' || match?.is_blurred;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow">
      {/* Match Photo */}
      <div className="relative mb-4">
        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
          <img
            src={getPhotoUrl()}
            alt={match?.full_name || 'Profile'}
            className={`w-full h-full object-cover transition-all duration-300 ${
              shouldBlurPhoto() ? 'blur-md' : ''
            }`}
          />
          {shouldBlurPhoto() && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                <Icon name="Eye" size={16} className="text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Verification Badge */}
        {match?.is_verified && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-islamic-green rounded-full flex items-center justify-center">
            <Icon name="CheckCircle" size={12} className="text-white" />
          </div>
        )}

        {/* Compatibility Score */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <span className="text-xs font-medium text-foreground">
            {match?.compatibility_score || 85}% match
          </span>
        </div>
      </div>
      {/* Match Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {match?.full_name || 'Anonymous'}
          </h3>
          <p className="text-sm text-muted-foreground">
            {match?.age && `${match?.age} years old`}
            {match?.age && match?.location && ' • '}
            {match?.location}
            {match?.district && `, ${match?.district}`}
          </p>
        </div>

        {match?.profession && (
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{match?.profession}</span>
          </div>
        )}

        {match?.education_level && (
          <div className="flex items-center space-x-2">
            <Icon name="GraduationCap" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground capitalize">
              {match?.education_level?.replace('_', ' ')}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewProfile}
            className="flex-1"
          >
            <Icon name="Eye" size={14} className="mr-2" />
            View Profile
          </Button>
          
          {userTier !== 'intention' ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleExpressInterest}
              className="flex-1 bg-islamic-green hover:bg-islamic-green/90"
            >
              <Icon name="Heart" size={14} className="mr-2" />
              Interest
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={handleExpressInterest}
              className="flex-1 text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
            >
              <Icon name="Crown" size={14} className="mr-2" />
              Upgrade
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyMatchCard;