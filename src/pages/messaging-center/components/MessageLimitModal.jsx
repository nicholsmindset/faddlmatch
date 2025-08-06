import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageLimitModal = ({ 
  isOpen, 
  onClose, 
  userTier = 'intention',
  currentUsage = { sent: 0, limit: 10 }
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    navigate('/subscription-management');
    onClose();
  };

  const getTierInfo = () => {
    switch (userTier) {
      case 'intention':
        return {
          currentPlan: 'Intention (Free)',
          currentLimit: '10 messages per conversation',
          nextTier: 'Patience',
          nextPrice: 'S$18/month',
          nextLimit: '100 messages per conversation',
          color: 'islamic-green'
        };
      case 'patience':
        return {
          currentPlan: 'Patience',
          currentLimit: '100 messages per conversation',
          nextTier: 'Reliance',
          nextPrice: 'S$23/month',
          nextLimit: 'Unlimited messages',
          color: 'trust-blue'
        };
      default:
        return null;
    }
  };

  const tierInfo = getTierInfo();
  if (!tierInfo) return null;

  const usagePercentage = (currentUsage?.sent / currentUsage?.limit) * 100;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        {/* Modal */}
        <div className="bg-card border border-border rounded-lg shadow-elevation-4 w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-${tierInfo?.color}/10 rounded-lg flex items-center justify-center`}>
                <Icon name="MessageCircle" size={20} className={`text-${tierInfo?.color}`} />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-lg text-foreground">
                  Message Limit Reached
                </h2>
                <p className="text-sm text-muted-foreground">
                  {tierInfo?.currentPlan} Plan
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={18} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Usage Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Messages Used
                </span>
                <span className="text-sm font-mono text-muted-foreground">
                  {currentUsage?.sent}/{currentUsage?.limit}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`bg-${tierInfo?.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                You've reached your messaging limit for this conversation
              </p>
            </div>

            {/* Current Plan Info */}
            <div className={`p-4 bg-${tierInfo?.color}/10 border border-${tierInfo?.color}/20 rounded-lg`}>
              <h3 className="font-heading font-semibold text-sm text-foreground mb-2">
                Current Plan: {tierInfo?.currentPlan}
              </h3>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={14} className={`text-${tierInfo?.color}`} />
                  <span className="text-sm text-muted-foreground">
                    {tierInfo?.currentLimit}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} className={`text-${tierInfo?.color}`} />
                  <span className="text-sm text-muted-foreground">
                    {userTier === 'intention' ? '3 conversations per day' : '15 conversations per day'}
                  </span>
                </div>
              </div>
            </div>

            {/* Upgrade Benefits */}
            <div className="p-4 bg-premium-purple/10 border border-premium-purple/20 rounded-lg">
              <h3 className="font-heading font-semibold text-sm text-premium-purple mb-3">
                Upgrade to {tierInfo?.nextTier} - {tierInfo?.nextPrice}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-premium-purple" />
                  <span className="text-sm text-foreground">
                    {tierInfo?.nextLimit}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-premium-purple" />
                  <span className="text-sm text-foreground">
                    Advanced matching filters
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-premium-purple" />
                  <span className="text-sm text-foreground">
                    See who likes you
                  </span>
                </div>
                {tierInfo?.nextTier === 'Reliance' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-premium-purple" />
                      <span className="text-sm text-foreground">
                        Video calling with Halal compliance
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-premium-purple" />
                      <span className="text-sm text-foreground">
                        Priority customer support
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Islamic Compliance Note */}
            <div className="flex items-start space-x-2 p-3 bg-islamic-green/10 border border-islamic-green/20 rounded-lg">
              <Icon name="Shield" size={16} className="text-islamic-green mt-0.5" />
              <div>
                <p className="text-sm text-islamic-green font-medium mb-1">
                  Islamic Compliance
                </p>
                <p className="text-xs text-muted-foreground">
                  All messaging features maintain Islamic values and include guardian oversight options
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Continue with Current Plan
            </Button>
            <Button
              onClick={handleUpgrade}
              className="flex-1 bg-premium-purple hover:bg-premium-purple/90 text-white"
            >
              <Icon name="ArrowUp" size={16} className="mr-2" />
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageLimitModal;