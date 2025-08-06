import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ activities, userTier }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'match': return 'Heart';
      case 'message': return 'MessageCircle';
      case 'view': return 'Eye';
      case 'interest': return 'Star';
      case 'guardian': return 'Shield';
      default: return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'match': return 'text-islamic-green bg-islamic-green/10';
      case 'message': return 'text-trust-blue bg-trust-blue/10';
      case 'view': return 'text-warning bg-warning/10';
      case 'interest': return 'text-premium-purple bg-premium-purple/10';
      case 'guardian': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleActivityClick = (activity) => {
    switch (activity?.type) {
      case 'match': case'view': case'interest': navigate('/profile-detail-view', { state: { profileId: activity?.profileId } });
        break;
      case 'message': navigate('/messaging-center');
        break;
      case 'guardian': navigate('/profile-creation-management');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-elevation-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg text-foreground">
          Recent Activity
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard-home')}
          className="text-muted-foreground hover:text-foreground"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-caption">
              No recent activity
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Start exploring matches to see activity here
            </p>
          </div>
        ) : (
          activities?.map((activity, index) => (
            <div
              key={index}
              onClick={() => handleActivityClick(activity)}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-smooth"
            >
              {/* Activity Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={18} />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity?.title}
                  </p>
                  <span className="text-xs text-muted-foreground font-mono">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {activity?.description}
                </p>

                {/* User Avatar for profile-related activities */}
                {activity?.userAvatar && (
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={activity?.userAvatar}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity?.userName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {/* Upgrade prompt for free users */}
      {userTier === 'intention' && activities?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="bg-premium-purple/5 border border-premium-purple/20 rounded-lg p-3 text-center">
            <Icon name="Crown" size={20} className="text-premium-purple mx-auto mb-2" />
            <p className="text-sm text-premium-purple font-medium mb-1">
              Get detailed activity insights
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              See who viewed your profile and track engagement
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/subscription-management')}
              className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
            >
              Upgrade Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;