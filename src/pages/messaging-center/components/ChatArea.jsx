import React, { useState, useEffect, useRef } from 'react';
import { Send, MoreVertical, Phone, Video, Heart, Shield, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEmailNotifications } from '../../../hooks/useEmailNotifications';


const ChatArea = ({
  selectedConversation,
  messages = [],
  onSendMessage,
  currentUser, setMessageText, setShowEmojiPicker, userTier
}) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const messagesEndRef = useRef(null);
  const { sendMessageNotification } = useEmailNotifications();

  // Islamic-appropriate emojis
  const islamicEmojis = ['😊', '🤲', '☪️', '🕌', '📿', '🌙', '⭐', '🌟', '💫', '🌸', '🌺', '🌻', '🌹', '🍃', '🌿', '☘️'];

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();

    if (!newMessage?.trim() || !selectedConversation) return;

    try {
      // Send message through existing handler
      await onSendMessage?.(newMessage?.trim());

      // Send email notification to recipient
      if (selectedConversation?.user?.email && selectedConversation?.user?.full_name) {
        try {
          await sendMessageNotification(
            selectedConversation?.user?.email,
            selectedConversation?.user?.full_name,
            currentUser?.full_name || 'A member'
          );
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Don't prevent message sending if email fails
        }
      }

      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessageText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-SG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatMessageDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (messageDate?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (messageDate?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate?.toLocaleDateString('en-SG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    }
  };

  const getMessageLimitWarning = () => {
    if (userTier === 'intention') {
      return 'Free plan: Limited to 10 messages per conversation. Upgrade for unlimited messaging.';
    } else if (userTier === 'patience') {
      return 'Patience plan: 100 messages per conversation.';
    }
    return null;
  };

  const canSendMessage = () => {
    if (userTier === 'intention') {
      const userMessages = messages?.filter((m) => m?.isFromUser)?.length;
      return userMessages < 10;
    }
    return true;
  };

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Select a Conversation
          </h3>
          <p className="text-gray-500 max-w-sm">
            Choose a conversation from the sidebar to start chatting with your matches.
          </p>
        </div>
      </div>);

  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={selectedConversation?.user?.avatar || '/api/placeholder/40/40'}
                alt={selectedConversation?.user?.full_name}
                className="w-10 h-10 rounded-full object-cover" />

              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {selectedConversation?.user?.full_name}
              </h3>
              <p className="text-sm text-gray-500">
                {lastSeen ? `Last seen ${lastSeen}` : 'Online now'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages?.map((message, index) => {
            const isOwn = message?.sender_id === currentUser?.id;
            const showTimestamp = index === 0 ||
            messages?.[index - 1] &&
            new Date(message?.created_at)?.getTime() - new Date(messages[index - 1]?.created_at)?.getTime() > 300000;

            return (
              <motion.div
                key={message?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>

                <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                  {showTimestamp &&
                  <div className="text-center text-xs text-gray-500 mb-2">
                      {new Date(message?.created_at)?.toLocaleString()}
                    </div>
                  }
                  
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                    isOwn ?
                    'bg-blue-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-900 rounded-bl-sm'}`
                    }>

                    <p className="text-sm">{message?.content}</p>
                  </div>
                  
                  <div className={`text-xs text-gray-500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                    {new Date(message?.created_at)?.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                    {isOwn &&
                    <span className="ml-2">
                        {message?.status === 'read' ? '✓✓' : message?.status === 'delivered' ? '✓' : <Clock className="w-3 h-3 inline" />}
                      </span>
                    }
                  </div>
                </div>
              </motion.div>);

          })}
        </AnimatePresence>
        
        {isTyping &&
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex justify-start">

            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        }
        
        <div ref={messagesEndRef} />
      </div>
      {/* Islamic Guidelines Banner */}
      <div className="bg-green-50 border-t border-green-200 px-4 py-2">
        <div className="flex items-center space-x-2 text-sm text-green-700">
          <Shield className="w-4 h-4" />
          <span>Remember to maintain Islamic etiquette and communicate with good intentions</span>
        </div>
      </div>
      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              onKeyPress={(e) => {
                if (e?.key === 'Enter' && !e?.shiftKey) {
                  e?.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder="Type your message... (Press Enter to send)"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
              rows={1} />

          </div>
          
          <button
            type="submit"
            disabled={!newMessage?.trim()}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">

            <Send className="w-5 h-5" />
          </button>
        </form>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          All conversations are monitored to ensure Islamic guidelines are followed
        </p>
      </div>
    </div>);

};

export default ChatArea;