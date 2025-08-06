import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import ConversationList from './components/ConversationList';
import ChatArea from './components/ChatArea';
import ProfileSummaryPanel from './components/ProfileSummaryPanel';
import MessageLimitModal from './components/MessageLimitModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MessagingCenter = () => {
  const navigate = useNavigate();
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userTier, setUserTier] = useState('intention'); // intention, patience, reliance
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Mock conversations data
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        name: 'Fatima Al-Zahra',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        lastMessage: {
          content: 'Assalamu alaikum! Thank you for your interest. I would love to get to know you better.',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          isFromUser: false,
          type: 'text',
          status: 'read'
        },
        lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
        unreadCount: 2,
        isOnline: true,
        hasGuardianAccess: true,
        lastSeen: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: 2,
        name: 'Aisha Rahman',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        lastMessage: {
          content: 'I appreciate your respectful approach. Family is very important to me as well.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          isFromUser: false,
          type: 'text',
          status: 'delivered'
        },
        lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
        unreadCount: 0,
        isOnline: false,
        hasGuardianAccess: false,
        lastSeen: new Date(Date.now() - 15 * 60 * 1000)
      },
      {
        id: 3,
        name: 'Khadijah Hassan',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        lastMessage: {
          content: 'Thank you for sharing your thoughts about family values.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isFromUser: true,
          type: 'text',
          status: 'read'
        },
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unreadCount: 1,
        isOnline: true,
        hasGuardianAccess: true,
        lastSeen: new Date(Date.now() - 1 * 60 * 1000)
      },
      {
        id: 4,
        name: 'Maryam Abdullah',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        lastMessage: {
          content: 'I would like my family to meet you when the time is right.',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          isFromUser: false,
          type: 'text',
          status: 'sent'
        },
        lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
        unreadCount: 0,
        isOnline: false,
        hasGuardianAccess: true,
        lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000)
      }
    ];
    setConversations(mockConversations);
  }, []);

  // Mock messages for active conversation
  useEffect(() => {
    if (activeConversation) {
      const mockMessages = [
        {
          id: 1,
          content: 'Assalamu alaikum wa rahmatullahi wa barakatuh. I hope you are doing well.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isFromUser: true,
          type: 'text',
          status: 'read'
        },
        {
          id: 2,
          content: 'Wa alaikum assalam wa rahmatullahi wa barakatuh. Alhamdulillah, I am well. Thank you for reaching out.',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          isFromUser: false,
          type: 'text',
          status: 'delivered'
        },
        {
          id: 3,
          content: 'I have read your profile and I am impressed by your commitment to Islamic values. I would like to know more about your family background.',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          isFromUser: true,
          type: 'text',
          status: 'read'
        },
        {
          id: 4,
          content: 'Jazakallahu khair for your kind words. My family has always been practicing Muslims. We value education, respect, and helping our community. What about your family?',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          isFromUser: false,
          type: 'text',
          status: 'delivered'
        },
        {
          id: 5,
          content: 'Alhamdulillah, my family shares similar values. We believe in maintaining strong Islamic principles while embracing modern education and career growth.',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          isFromUser: true,
          type: 'text',
          status: 'read'
        },
        {
          id: 6,
          content: 'That sounds wonderful. I appreciate your balanced approach to life. Would you be comfortable if my mother joins our conversation sometime?',
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          isFromUser: false,
          type: 'text',
          status: 'delivered'
        },
        {
          id: 7,
          content: 'Of course! I would be honored to speak with your mother. Family involvement is very important in this process.',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          isFromUser: true,
          type: 'text',
          status: 'read'
        }
      ];
      setMessages(mockMessages);
    }
  }, [activeConversation]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1024) {
        setShowProfilePanel(true);
      } else {
        setShowProfilePanel(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);
    
    // Mark conversation as read
    setConversations(prev => 
      prev?.map(conv => 
        conv?.id === conversation?.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );

    // On mobile, hide conversation list when chat is selected
    if (isMobile) {
      setShowProfilePanel(false);
    }
  };

  const handleSendMessage = (messageData) => {
    // Check message limits for free users
    if (userTier === 'intention') {
      const userMessages = messages?.filter(m => m?.isFromUser)?.length;
      if (userMessages >= 10) {
        setShowLimitModal(true);
        return;
      }
    }

    const newMessage = {
      id: messages?.length + 1,
      ...messageData,
      isFromUser: true,
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);

    // Update conversation last message
    setConversations(prev =>
      prev?.map(conv =>
        conv?.id === activeConversation?.id
          ? {
              ...conv,
              lastMessage: {
                content: messageData?.content,
                timestamp: messageData?.timestamp,
                isFromUser: true,
                type: messageData?.type,
                status: 'sent'
              },
              lastMessageTime: messageData?.timestamp
            }
          : conv
      )
    );

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev =>
        prev?.map(msg =>
          msg?.id === newMessage?.id
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev =>
        prev?.map(msg =>
          msg?.id === newMessage?.id
            ? { ...msg, status: 'read' }
            : msg
        )
      );
    }, 3000);
  };

  const handleUpgrade = () => {
    navigate('/subscription-management');
  };

  const handleVideoCall = () => {
    if (userTier === 'reliance') {
      // Implement video call functionality
      console.log('Starting video call with', activeConversation?.name);
    } else {
      handleUpgrade();
    }
  };

  const handleReportUser = (userId) => {
    console.log('Reporting user:', userId);
    // Implement report functionality
  };

  const handleBlockUser = (userId) => {
    console.log('Blocking user:', userId);
    // Implement block functionality
    setConversations(prev => prev?.filter(conv => conv?.id !== userId));
    if (activeConversation?.id === userId) {
      setActiveConversation(null);
    }
  };

  const handleBackToList = () => {
    setActiveConversation(null);
  };

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <GlobalHeader />
      <PrimaryNavigation />
      <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-7rem)]">
        {/* Mobile: Show conversation list or chat area */}
        {isMobile ? (
          <>
            {!activeConversation ? (
              <ConversationList
                conversations={conversations}
                activeConversation={activeConversation}
                onConversationSelect={handleConversationSelect}
                userTier={userTier}
                onUpgrade={handleUpgrade}
              />
            ) : (
              <div className="flex-1 flex flex-col">
                {/* Mobile Chat Header with Back Button */}
                <div className="flex items-center p-4 border-b border-border bg-card">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleBackToList}
                    className="mr-3"
                  >
                    <Icon name="ArrowLeft" size={20} />
                  </Button>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-border">
                      <img
                        src={activeConversation?.avatar}
                        alt={activeConversation?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {activeConversation?.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {activeConversation?.isOnline ? 'Online' : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <ChatArea
                  conversation={activeConversation}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  userTier={userTier}
                  onUpgrade={handleUpgrade}
                  onVideoCall={handleVideoCall}
                  onReportUser={handleReportUser}
                  onBlockUser={handleBlockUser}
                />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Desktop: Three-column layout */}
            <div className="w-80 flex-shrink-0">
              <ConversationList
                conversations={conversations}
                activeConversation={activeConversation}
                onConversationSelect={handleConversationSelect}
                userTier={userTier}
                onUpgrade={handleUpgrade}
              />
            </div>

            <ChatArea
              conversation={activeConversation}
              messages={messages}
              onSendMessage={handleSendMessage}
              userTier={userTier}
              onUpgrade={handleUpgrade}
              onVideoCall={handleVideoCall}
              onReportUser={handleReportUser}
              onBlockUser={handleBlockUser}
            />

            {/* Desktop Profile Panel */}
            {showProfilePanel && activeConversation && (
              <ProfileSummaryPanel
                conversation={activeConversation}
                userTier={userTier}
                onUpgrade={handleUpgrade}
              />
            )}
          </>
        )}
      </div>
      {/* Message Limit Modal */}
      <MessageLimitModal
        isOpen={showLimitModal}
        onClose={() => setShowLimitModal(false)}
        userTier={userTier}
        currentUsage={{ sent: messages?.filter(m => m?.isFromUser)?.length, limit: 10 }}
      />
      {/* Islamic Geometric Pattern Overlay */}
      <div className="fixed bottom-4 right-4 opacity-5 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-primary">
          <pattern id="islamic-star" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M25 5 L30 15 L40 15 L32 22 L35 32 L25 27 L15 32 L18 22 L10 15 L20 15 Z"
              fill="currentColor"
              opacity="0.1"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#islamic-star)" />
        </svg>
      </div>
    </div>
  );
};

export default MessagingCenter;