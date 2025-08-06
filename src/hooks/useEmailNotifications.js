import { useState } from 'react';
import { emailService } from '../services/emailService';
import { supabase } from '../lib/supabase';

/**
 * Custom hook for handling email notifications in FaddlMatch
 * Provides methods for sending various types of emails with error handling
 */
export function useEmailNotifications() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastEmailSent, setLastEmailSent] = useState(null);

  /**
   * Send welcome email to new user
   */
  const sendWelcomeEmail = async (userEmail, userName) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await emailService?.sendWelcomeEmail(userEmail, userName);
      setLastEmailSent({
        type: 'welcome',
        recipient: userEmail,
        timestamp: new Date()?.toISOString(),
        messageId: result?.id
      });
      return result;
    } catch (err) {
      console.error('Failed to send welcome email:', err);
      setError(err?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send match notification email
   */
  const sendMatchNotification = async (userEmail, userName, matchName, compatibilityScore = 85) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await emailService?.sendMatchNotificationEmail(
        userEmail, 
        userName, 
        matchName, 
        compatibilityScore
      );
      setLastEmailSent({
        type: 'match',
        recipient: userEmail,
        timestamp: new Date()?.toISOString(),
        messageId: result?.id
      });
      return result;
    } catch (err) {
      console.error('Failed to send match notification:', err);
      setError(err?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send message notification email
   */
  const sendMessageNotification = async (userEmail, userName, senderName) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await emailService?.sendMessageNotificationEmail(
        userEmail, 
        userName, 
        senderName
      );
      setLastEmailSent({
        type: 'message',
        recipient: userEmail,
        timestamp: new Date()?.toISOString(),
        messageId: result?.id
      });
      return result;
    } catch (err) {
      console.error('Failed to send message notification:', err);
      setError(err?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send subscription confirmation email
   */
  const sendSubscriptionConfirmation = async (userEmail, userName, planName, features) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await emailService?.sendSubscriptionConfirmationEmail(
        userEmail, 
        userName, 
        planName, 
        features
      );
      setLastEmailSent({
        type: 'subscription',
        recipient: userEmail,
        timestamp: new Date()?.toISOString(),
        messageId: result?.id
      });
      return result;
    } catch (err) {
      console.error('Failed to send subscription confirmation:', err);
      setError(err?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send contact form confirmation email
   */
  const sendContactFormConfirmation = async (userEmail, userName, subject) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await emailService?.sendContactFormConfirmationEmail(
        userEmail, 
        userName, 
        subject
      );
      setLastEmailSent({
        type: 'contact',
        recipient: userEmail,
        timestamp: new Date()?.toISOString(),
        messageId: result?.id
      });
      return result;
    } catch (err) {
      console.error('Failed to send contact confirmation:', err);
      setError(err?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send email via Supabase Edge Function (server-side)
   * More secure for sensitive operations
   */
  const sendEmailViaEdgeFunction = async (emailData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: { session } } = await supabase?.auth?.getSession();
      const token = session?.access_token;
      
      const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;
      
      const response = await fetch(`${supabaseUrl}/functions/v1/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || supabaseAnonKey}`,
        },
        body: JSON.stringify(emailData),
      });

      if (!response?.ok) {
        throw new Error(`Edge function error: ${response.statusText}`);
      }

      const result = await response?.json();
      
      if (!result?.success) {
        throw new Error(result.error || 'Email sending failed');
      }

      setLastEmailSent({
        type: emailData?.emailType || 'custom',
        recipient: emailData?.to,
        timestamp: new Date()?.toISOString(),
        messageId: result?.messageId
      });
      
      return result;
    } catch (err) {
      console.error('Failed to send email via edge function:', err);
      setError(err?.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear error state
   */
  const clearError = () => setError(null);

  return {
    // State
    isLoading,
    error,
    lastEmailSent,
    
    // Methods
    sendWelcomeEmail,
    sendMatchNotification,
    sendMessageNotification,
    sendSubscriptionConfirmation,
    sendContactFormConfirmation,
    sendEmailViaEdgeFunction,
    clearError,
  };
}