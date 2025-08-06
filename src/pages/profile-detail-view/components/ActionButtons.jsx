import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ userTier, profileId, onUpgrade }) => {
  const [isInterestExpressed, setIsInterestExpressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleExpressInterest = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsInterestExpressed(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    navigate('/messaging-center', { state: { profileId } });
  };

  const handleVideoCall = () => {
    // Implement video call functionality
    console.log('Initiating video call with profile:', profileId);
  };

  const handleReport = () => {
    // Implement report functionality
    console.log('Reporting profile:', profileId);
  };

  const handleBlock = () => {
    // Implement block functionality
    console.log('Blocking profile:', profileId);
  };

  // Free tier actions
  if (userTier === 'intention') {
    return (
      <div className="space-y-3">
        <Button
          variant="default"
          onClick={onUpgrade}
          className="w-full bg-premium-purple hover:bg-premium-purple/90 text-white"
        >
          <Icon name="Crown" size={18} className="mr-2" />
          Upgrade to Connect
        </Button>
        
        <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Lock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Premium Feature</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Upgrade to Patience or Reliance plan to express interest and send messages
          </p>
        </div>

        {/* Report/Block Options */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReport}
            className="flex-1 text-error border-error hover:bg-error hover:text-white"
          >
            <Icon name="Flag" size={14} className="mr-1" />
            Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBlock}
            className="flex-1 text-muted-foreground hover:text-foreground"
          >
            <Icon name="Ban" size={14} className="mr-1" />
            Block
          </Button>
        </div>
      </div>
    );
  }

  // Mid-tier (Patience) actions
  if (userTier === 'patience') {
    return (
      <div className="space-y-3">
        {!isInterestExpressed ? (
          <Button
            variant="default"
            onClick={handleExpressInterest}
            loading={isLoading}
            className="w-full bg-islamic-green hover:bg-islamic-green/90 text-white"
          >
            <Icon name="Heart" size={18} className="mr-2" />
            Express Interest
          </Button>
        ) : (
          <div className="p-3 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Interest Expressed</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              You'll be notified if they're interested too
            </p>
          </div>
        )}

        <Button
          variant="outline"
          onClick={handleSendMessage}
          className="w-full"
        >
          <Icon name="MessageCircle" size={18} className="mr-2" />
          Send Message
        </Button>

        {/* Upgrade to Premium */}
        <div className="p-3 bg-premium-purple/10 rounded-lg border border-premium-purple/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-premium-purple">Premium Features</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onUpgrade}
              className="text-premium-purple hover:bg-premium-purple hover:text-white"
            >
              Upgrade
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Video calls, unlimited messages, and priority support
          </p>
        </div>

        {/* Report/Block Options */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReport}
            className="flex-1 text-error border-error hover:bg-error hover:text-white"
          >
            <Icon name="Flag" size={14} className="mr-1" />
            Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBlock}
            className="flex-1 text-muted-foreground hover:text-foreground"
          >
            <Icon name="Ban" size={14} className="mr-1" />
            Block
          </Button>
        </div>
      </div>
    );
  }

  // Premium tier (Reliance) actions
  return (
    <div className="space-y-3">
      {!isInterestExpressed ? (
        <Button
          variant="default"
          onClick={handleExpressInterest}
          loading={isLoading}
          className="w-full bg-islamic-green hover:bg-islamic-green/90 text-white"
        >
          <Icon name="Heart" size={18} className="mr-2" />
          Express Interest
        </Button>
      ) : (
        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Interest Expressed</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            You'll be notified if they're interested too
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={handleSendMessage}
          className="flex-1"
        >
          <Icon name="MessageCircle" size={16} className="mr-1" />
          Message
        </Button>
        <Button
          variant="outline"
          onClick={handleVideoCall}
          className="flex-1 text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
        >
          <Icon name="Video" size={16} className="mr-1" />
          Video Call
        </Button>
      </div>

      {/* Premium Benefits */}
      <div className="p-3 bg-premium-purple/10 rounded-lg border border-premium-purple/20">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Crown" size={16} className="text-premium-purple" />
          <span className="text-sm font-medium text-premium-purple">Premium Member</span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span>✓ Unlimited messages</span>
          <span>✓ Video calls</span>
          <span>✓ Priority support</span>
        </div>
      </div>

      {/* Report/Block Options */}
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReport}
          className="flex-1 text-error border-error hover:bg-error hover:text-white"
        >
          <Icon name="Flag" size={14} className="mr-1" />
          Report
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleBlock}
          className="flex-1 text-muted-foreground hover:text-foreground"
        >
          <Icon name="Ban" size={14} className="mr-1" />
          Block
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;