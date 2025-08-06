import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const NotificationCenter = ({ isOpen = false, onClose = () => {} }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  // Mock notifications data
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'match',
        title: 'New Match Found',
        message: 'You have a new match with Sarah Ahmed',
        avatar: '/assets/images/user-avatar.jpg',
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
        actionPath: '/profile-detail-view'
      },
      {
        id: 2,
        type: 'message',
        title: 'New Message',
        message: 'Fatima sent you a message',
        avatar: '/assets/images/user-avatar.jpg',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        read: false,
        actionPath: '/messaging-center'
      },
      {
        id: 3,
        type: 'guardian',
        title: 'Guardian Approval',
        message: 'Your mother approved your match with Ahmad Hassan',
        avatar: '/assets/images/user-avatar.jpg',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true,
        actionPath: '/profile-detail-view'
      },
      {
        id: 4,
        type: 'subscription',
        title: 'Subscription Reminder',
        message: 'Your Patience plan expires in 3 days',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        actionPath: '/subscription-management'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'match': return 'Heart';
      case 'message': return 'MessageCircle';
      case 'guardian': return 'Shield';
      case 'subscription': return 'Crown';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'match': return 'text-islamic-green bg-islamic-green/10';
      case 'message': return 'text-trust-blue bg-trust-blue/10';
      case 'guardian': return 'text-premium-purple bg-premium-purple/10';
      case 'subscription': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => 
      prev?.map(n => n?.id === notification?.id ? { ...n, read: true } : n)
    );
    
    // Navigate to relevant screen
    if (notification?.actionPath) {
      navigate(notification?.actionPath);
      onClose();
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev?.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification?.read;
    return notification?.type === activeTab;
  });

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
        onClick={onClose}
      />
      {/* Notification Panel */}
      <div className="fixed top-16 right-4 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-lg shadow-elevation-4 z-50 md:w-96">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-foreground" />
            <h2 className="font-heading font-semibold text-lg">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-error text-error-foreground text-xs px-2 py-1 rounded-full font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={18} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center border-b border-border">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread' },
            { key: 'match', label: 'Matches' },
            { key: 'message', label: 'Messages' }
          ]?.map((tab) => (
            <Button
              key={tab?.key}
              variant="ghost"
              onClick={() => setActiveTab(tab?.key)}
              className={`flex-1 rounded-none border-b-2 ${
                activeTab === tab?.key
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="font-caption text-sm">{tab?.label}</span>
            </Button>
          ))}
        </div>

        {/* Actions */}
        {notifications?.length > 0 && (
          <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="text-xs"
            >
              Mark all read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-xs text-error hover:text-error"
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredNotifications?.length === 0 ? (
            <div className="p-8 text-center">
              <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-caption">
                {activeTab === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredNotifications?.map((notification) => (
                <div
                  key={notification?.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 hover:bg-muted/50 cursor-pointer transition-smooth ${
                    !notification?.read ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon or Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification?.type)}`}>
                      {notification?.avatar && notification?.type !== 'subscription' ? (
                        <Image
                          src={notification?.avatar}
                          alt="User"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <Icon 
                          name={getNotificationIcon(notification?.type)} 
                          size={18} 
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm text-foreground truncate">
                          {notification?.title}
                        </h4>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                        {notification?.message}
                      </p>
                      <span className="text-xs text-muted-foreground font-mono">
                        {formatTimestamp(notification?.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications?.length > 0 && (
          <div className="p-3 border-t border-border bg-muted/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigate('/dashboard-home');
                onClose();
              }}
              className="w-full text-sm font-caption"
            >
              View all in dashboard
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationCenter;