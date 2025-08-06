import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConversationList = ({ 
  conversations, 
  activeConversation, 
  onConversationSelect, 
  userTier = 'intention',
  onUpgrade = () => {} 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations?.filter(conv =>
    conv?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes < 1 ? 'now' : `${minutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return messageTime?.toLocaleDateString('en-SG', { 
        day: '2-digit', 
        month: '2-digit' 
      });
    }
  };

  const getTierLimitMessage = () => {
    switch (userTier) {
      case 'intention':
        return 'Free plan: 3 conversations per day';
      case 'patience':
        return 'Patience plan: 15 conversations per day';
      default:
        return 'Unlimited conversations';
    }
  };

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Messages
          </h2>
          <div className="flex items-center space-x-2">
            {userTier !== 'reliance' && (
              <Button
                variant="outline"
                size="sm"
                onClick={onUpgrade}
                className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
              >
                <Icon name="ArrowUp" size={14} className="mr-1" />
                Upgrade
              </Button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Tier Limit Info */}
        <div className="mt-3 p-2 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground font-caption">
            {getTierLimitMessage()}
          </p>
        </div>
      </div>
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-caption">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </p>
            {!searchQuery && (
              <p className="text-xs text-muted-foreground mt-2">
                Start connecting with matches to begin conversations
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations?.map((conversation) => (
              <div
                key={conversation?.id}
                onClick={() => onConversationSelect(conversation)}
                className={`p-4 hover:bg-muted/50 cursor-pointer transition-smooth ${
                  activeConversation?.id === conversation?.id ? 'bg-primary/10 border-r-2 border-primary' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar with Online Status */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                      <Image
                        src={conversation?.avatar}
                        alt={conversation?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {conversation?.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full" />
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm text-foreground truncate">
                        {conversation?.name}
                      </h3>
                      <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                        <span className="text-xs text-muted-foreground font-mono">
                          {formatTimestamp(conversation?.lastMessageTime)}
                        </span>
                        {conversation?.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                            {conversation?.unreadCount > 9 ? '9+' : conversation?.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {conversation?.lastMessage?.type === 'text' ? (
                        <p className="text-sm text-muted-foreground line-clamp-1 flex-1">
                          {conversation?.lastMessage?.isFromUser && 'You: '}
                          {conversation?.lastMessage?.content}
                        </p>
                      ) : (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Icon name="Image" size={14} />
                          <span>Photo</span>
                        </div>
                      )}
                      
                      {conversation?.lastMessage?.isFromUser && (
                        <div className="flex-shrink-0">
                          {conversation?.lastMessage?.status === 'sent' && (
                            <Icon name="Check" size={14} className="text-muted-foreground" />
                          )}
                          {conversation?.lastMessage?.status === 'delivered' && (
                            <Icon name="CheckCheck" size={14} className="text-muted-foreground" />
                          )}
                          {conversation?.lastMessage?.status === 'read' && (
                            <Icon name="CheckCheck" size={14} className="text-primary" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Guardian Involvement Indicator */}
                    {conversation?.hasGuardianAccess && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="Shield" size={12} className="text-premium-purple" />
                        <span className="text-xs text-premium-purple font-caption">
                          Guardian involved
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Islamic Compliance Notice */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-islamic-green" />
          <p className="text-xs text-muted-foreground font-caption">
            All conversations are monitored for Islamic compliance
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;