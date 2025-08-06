import { emailService } from '../services/emailService';
import { supabase } from '../lib/supabase';

/**
 * Email integration utilities for FaddlMatch application
 * Handles automatic email triggers for various user actions
 */

/**
 * Handle new user registration - send welcome email
 */
export const handleUserRegistration = async (userData) => {
  try {
    if (userData?.email && userData?.full_name) {
      await emailService?.sendWelcomeEmail(userData?.email, userData?.full_name);
      console.log('Welcome email sent to:', userData?.email);
    }
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't throw error to avoid breaking registration flow
  }
};

/**
 * Handle new match creation - notify both users
 */
export const handleNewMatch = async (match) => {
  try {
    // Get user profiles for both matched users
    const { data: users, error } = await supabase?.from('user_profiles')?.select('id, email, full_name')?.in('id', [match?.user_id, match?.matched_user_id]);

    if (error || !users || users?.length !== 2) {
      throw new Error('Failed to fetch user profiles for match notification');
    }

    const [user1, user2] = users;
    
    // Send notification to first user about second user
    if (user1?.email && user2?.full_name) {
      await emailService?.sendMatchNotificationEmail(
        user1?.email,
        user1?.full_name,
        user2?.full_name,
        match?.compatibility_score || 85
      );
    }

    // Send notification to second user about first user (if it's a mutual match)
    if (match?.status === 'matched' && user2?.email && user1?.full_name) {
      await emailService?.sendMatchNotificationEmail(
        user2?.email,
        user2?.full_name,
        user1?.full_name,
        match?.compatibility_score || 85
      );
    }

    console.log('Match notification emails sent');
  } catch (error) {
    console.error('Failed to send match notification emails:', error);
  }
};

/**
 * Handle new message - notify recipient
 */
export const handleNewMessage = async (message) => {
  try {
    // Get sender and receiver profiles
    const { data: users, error } = await supabase?.from('user_profiles')?.select('id, email, full_name')?.in('id', [message?.sender_id, message?.receiver_id]);

    if (error || !users || users?.length !== 2) {
      throw new Error('Failed to fetch user profiles for message notification');
    }

    const sender = users?.find(u => u?.id === message?.sender_id);
    const receiver = users?.find(u => u?.id === message?.receiver_id);

    // Send notification to receiver
    if (receiver?.email && receiver?.full_name && sender?.full_name) {
      await emailService?.sendMessageNotificationEmail(
        receiver?.email,
        receiver?.full_name,
        sender?.full_name
      );
      console.log('Message notification email sent to:', receiver?.email);
    }
  } catch (error) {
    console.error('Failed to send message notification email:', error);
  }
};

/**
 * Handle subscription upgrade - send confirmation
 */
export const handleSubscriptionUpgrade = async (subscription, userId) => {
  try {
    // Get user profile
    const { data: user, error } = await supabase?.from('user_profiles')?.select('email, full_name')?.eq('id', userId)?.single();

    if (error || !user?.email) {
      throw new Error('Failed to fetch user profile for subscription confirmation');
    }

    // Map subscription tier to plan name and features
    const planMapping = {
      intention: {
        name: 'Intention Plan',
        features: [
          'Basic profile creation',
          '5 daily matches',
          'Standard messaging',
          'Basic search filters'
        ]
      },
      patience: {
        name: 'Patience Plan',
        features: [
          'Enhanced profile features',
          '15 daily matches',
          'Priority messaging',
          'Advanced search filters',
          'Read receipts',
          'Profile visitors info'
        ]
      },
      reliance: {
        name: 'Reliance Plan',
        features: [
          'Premium profile features',
          'Unlimited daily matches',
          'VIP messaging priority',
          'All search filters',
          'Advanced analytics',
          'Priority customer support',
          'Profile boost feature'
        ]
      }
    };

    const plan = planMapping?.[subscription?.tier] || planMapping?.intention;

    await emailService?.sendSubscriptionConfirmationEmail(
      user?.email,
      user?.full_name,
      plan?.name,
      plan?.features
    );

    console.log('Subscription confirmation email sent to:', user?.email);
  } catch (error) {
    console.error('Failed to send subscription confirmation email:', error);
  }
};

/**
 * Handle contact form submission - send confirmation
 */
export const handleContactFormSubmission = async (formData) => {
  try {
    const { email, name, subject } = formData;
    
    if (email && name) {
      await emailService?.sendContactFormConfirmationEmail(email, name, subject);
      console.log('Contact form confirmation email sent to:', email);
    }
  } catch (error) {
    console.error('Failed to send contact form confirmation email:', error);
  }
};

/**
 * Batch email utilities for admin operations
 */
export const batchEmailOperations = {
  /**
   * Send daily match summary to all active users
   */
  async sendDailyMatchSummaries() {
    try {
      const { data: activeUsers, error } = await supabase?.from('user_profiles')?.select('id, email, full_name')?.eq('is_active', true)?.not('email', 'is', null);

      if (error) throw error;

      for (const user of activeUsers || []) {
        // Get user's matches from today
        const today = new Date()?.toISOString()?.split('T')?.[0];
        const { data: todaysMatches, error: matchError } = await supabase?.from('matches')?.select('*, matched_user:user_profiles!matches_matched_user_id_fkey(full_name)')?.eq('user_id', user?.id)?.gte('created_at', `${today}T00:00:00`)?.lt('created_at', `${today}T23:59:59`);

        if (!matchError && todaysMatches && todaysMatches?.length > 0) {
          // Send summary email (you can create a new template for this)
          console.log(`Would send daily summary to ${user?.email} for ${todaysMatches?.length} matches`);
        }
      }
    } catch (error) {
      console.error('Failed to send daily match summaries:', error);
    }
  },

  /**
   * Send weekly newsletter to subscribers
   */
  async sendWeeklyNewsletter(newsletterContent) {
    try {
      const { data: subscribers, error } = await supabase?.from('user_profiles')?.select('email, full_name')?.eq('is_active', true)?.not('email', 'is', null);

      if (error) throw error;

      // Send newsletter to all subscribers
      // Implementation would depend on your newsletter content structure
      console.log(`Would send newsletter to ${subscribers?.length || 0} subscribers`);
    } catch (error) {
      console.error('Failed to send weekly newsletter:', error);
    }
  }
};

/**
 * Email verification utilities
 */
export const emailVerificationUtils = {
  /**
   * Check if email is valid format
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex?.test(email);
  },

  /**
   * Check if email domain is allowed
   */
  isAllowedDomain(email) {
    // Add your domain restrictions here if needed
    const blockedDomains = ['tempmail.com', '10minutemail.com'];
    const domain = email?.split('@')?.[1]?.toLowerCase();
    return !blockedDomains?.includes(domain);
  },

  /**
   * Sanitize email for database storage
   */
  sanitizeEmail(email) {
    return email?.trim()?.toLowerCase();
  }
};