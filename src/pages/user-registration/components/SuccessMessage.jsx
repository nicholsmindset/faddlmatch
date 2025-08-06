import React, { useEffect } from 'react';
import { CheckCircle, Mail, User, Heart, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEmailNotifications } from '../../../hooks/useEmailNotifications';
import { emailService } from '../../../services/emailService';

const SuccessMessage = ({ userData, onContinue }) => {
  const { sendWelcomeEmail, isLoading: emailLoading, error: emailError } = useEmailNotifications();

  // Send welcome email when component mounts
  useEffect(() => {
    if (userData?.email && userData?.full_name) {
      // Only attempt to send email if service is configured
      if (emailService?.isServiceAvailable()) {
        sendWelcomeEmail(userData?.email, userData?.full_name)?.catch(error => {
          console.error('Failed to send welcome email:', error);
          // Don't show error to user, as registration was successful
        });
      } else {
        console.warn('Email service not configured - welcome email skipped');
      }
    }
  }, [userData?.email, userData?.full_name, sendWelcomeEmail]);

  const handleContinueClick = () => {
    if (onContinue) {
      onContinue();
    }
  };

  // Check if email service is configured
  const isEmailServiceConfigured = emailService?.isServiceAvailable();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center p-8 bg-white rounded-xl shadow-lg"
    >
      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
      </motion.div>
      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Alhamdulillah! Welcome to FaddlMatch
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Your account has been successfully created. May Allah bless your journey to finding your perfect match.
        </p>
      </motion.div>
      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-50 rounded-lg p-4 mb-6"
      >
        <div className="flex items-center justify-center mb-2">
          <User className="w-5 h-5 text-blue-600 mr-2" />
          <span className="font-medium text-gray-900">{userData?.full_name || 'User'}</span>
        </div>
        <div className="flex items-center justify-center">
          <Mail className="w-5 h-5 text-green-600 mr-2" />
          <span className="text-gray-600">{userData?.email || 'user@example.com'}</span>
        </div>
      </motion.div>
      {/* Email Notification Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-6"
      >
        {!isEmailServiceConfigured ? (
          <div className="text-sm text-blue-600 bg-blue-50 rounded-lg p-3">
            <Mail className="w-4 h-4 inline mr-1" />
            Registration complete! Welcome email will be available once email service is configured.
          </div>
        ) : emailLoading ? (
          <div className="flex items-center justify-center text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-sm">Sending welcome email...</span>
          </div>
        ) : emailError ? (
          <div className="text-sm text-amber-600 bg-amber-50 rounded-lg p-3">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            Welcome email will be sent shortly
          </div>
        ) : (
          <div className="text-sm text-green-600 bg-green-50 rounded-lg p-3">
            <Mail className="w-4 h-4 inline mr-1" />
            Welcome email sent to your inbox!
          </div>
        )}
      </motion.div>
      {/* Next Steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mb-8"
      >
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-center">
          <Heart className="w-5 h-5 text-red-500 mr-2" />
          What's Next?
        </h3>
        <ul className="text-left space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Choose your subscription plan (Patience or Reliance)
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Complete your profile with photos and detailed information
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Set your partner preferences and criteria
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Start receiving daily matches based on compatibility
          </li>
        </ul>
      </motion.div>
      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        onClick={handleContinueClick}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        Complete Your Profile
      </motion.button>
      {/* Islamic Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-6 text-xs text-gray-500 italic"
      >
        "And among His signs is this, that He created for you mates from among yourselves, 
        that ye may dwell in tranquility with them..." - Quran 30:21
      </motion.div>
    </motion.div>
  );
};

export default SuccessMessage;