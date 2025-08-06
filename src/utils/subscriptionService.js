import { supabase } from '../lib/supabase';
import { validateData } from './validationSchemas';
import { z } from 'zod';

// Validation schemas for subscription service
const SubscriptionTierSchema = z?.enum(['intention', 'patience', 'reliance']);

export const subscriptionService = {
  async getCurrentSubscription() {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase?.from('subscriptions')?.select('*')?.eq('user_id', user?.id)?.eq('status', 'active')?.single();

      if (error && error?.code !== 'PGRST116') {
        return { data: null, error };
      }

      return { data: data || null, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: 'Failed to fetch current subscription' } 
      };
    }
  },

  async getUserProfile() {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', user?.id)?.single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: 'Failed to fetch user profile' } 
      };
    }
  },

  async updateSubscriptionTier(tier) {
    try {
      // Validate tier input
      const tierValidation = validateData(SubscriptionTierSchema, tier);
      if (!tierValidation?.success) {
        return { 
          data: null, 
          error: { message: 'Invalid subscription tier provided' } 
        };
      }

      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase?.from('user_profiles')?.update({ 
          subscription_tier: tier,
          updated_at: new Date()?.toISOString()
        })?.eq('id', user?.id)?.select()?.single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: 'Failed to update subscription tier' } 
      };
    }
  },

  async createStripeCustomer() {
    try {
      const { data, error } = await supabase?.functions?.invoke('create-stripe-customer');
      
      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: 'Failed to create Stripe customer' } 
      };
    }
  },

  async createSubscription(tier) {
    try {
      // Validate tier input
      const tierValidation = validateData(SubscriptionTierSchema, tier);
      if (!tierValidation?.success) {
        return { 
          data: null, 
          error: { message: 'Invalid subscription tier provided' } 
        };
      }

      const { data, error } = await supabase?.functions?.invoke('create-subscription', {
        body: { tier }
      });
      
      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: 'Failed to create subscription' } 
      };
    }
  },

  getTierLimits(tier) {
    const tierValidation = validateData(SubscriptionTierSchema, tier);
    const validTier = tierValidation?.success ? tier : 'intention';

    const limits = {
      intention: {
        dailyMatches: 1,
        monthlyMatches: 30,
        messages: 5,
        canSeeWhoLiked: false,
        canUseAdvancedFilters: false,
        canVideoCall: false,
        profileBoosts: 0
      },
      patience: {
        dailyMatches: 3,
        monthlyMatches: 90,
        messages: -1, // unlimited
        canSeeWhoLiked: true,
        canUseAdvancedFilters: true,
        canVideoCall: false,
        profileBoosts: 1
      },
      reliance: {
        dailyMatches: -1, // unlimited
        monthlyMatches: -1, // unlimited
        messages: -1, // unlimited
        canSeeWhoLiked: true,
        canUseAdvancedFilters: true,
        canVideoCall: true,
        profileBoosts: 5
      }
    };

    return limits?.[validTier];
  },

  formatPrice(amount) {
    if (typeof amount !== 'number') return 'Free';
    if (amount === 0) return 'Free';
    
    try {
      return new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency: 'SGD'
      })?.format(amount);
    } catch (error) {
      console.error('Price formatting error:', error);
      return `SGD ${amount?.toFixed(2)}`;
    }
  },

  // New method to check subscription limits
  async checkLimits(action) {
    try {
      const profileResult = await this.getUserProfile();
      if (!profileResult?.data) {
        return { allowed: false, reason: 'User profile not found' };
      }

      const userTier = profileResult?.data?.subscription_tier || 'intention';
      const limits = this.getTierLimits(userTier);

      switch (action) {
        case 'daily_matches':
          // You would implement daily match counting logic here
          return { allowed: true, remaining: limits?.dailyMatches };
        
        case 'send_message':
          // You would implement message counting logic here
          return { allowed: limits?.messages === -1 || limits?.messages > 0, remaining: limits?.messages };
        
        case 'see_who_liked':
          return { allowed: limits?.canSeeWhoLiked };
        
        case 'advanced_filters':
          return { allowed: limits?.canUseAdvancedFilters };
        
        case 'video_call':
          return { allowed: limits?.canVideoCall };
        
        default:
          return { allowed: false, reason: 'Unknown action' };
      }
    } catch (error) {
      return { allowed: false, reason: 'Failed to check limits' };
    }
  }
};