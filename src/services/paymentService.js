import { supabase } from '../lib/supabase';

class PaymentService {
  async createPaymentIntent(subscriptionTier, priceId) {
    const { data: { session } } = await supabase?.auth?.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(`${import.meta.env?.VITE_SUPABASE_URL}/functions/v1/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`
      },
      body: JSON.stringify({ subscriptionTier, priceId })
    });

    if (!response?.ok) {
      const error = await response?.json();
      throw new Error(error.error || 'Payment setup failed');
    }

    return response?.json();
  }

  async getUserSubscription() {
    const { data, error } = await supabase?.from('subscriptions')?.select('*')?.eq('user_id', (await supabase?.auth?.getUser())?.data?.user?.id)?.single();

    if (error && error?.code !== 'PGRST116') throw error;
    return data;
  }

  async getPaymentHistory() {
    const { data, error } = await supabase?.from('payment_history')?.select('*')?.eq('user_id', (await supabase?.auth?.getUser())?.data?.user?.id)?.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // Subscription pricing configuration
  getSubscriptionPlans() {
    return {
      intention: {
        name: 'Intention',
        price: 'Free',
        priceId: null,
        features: ['Basic matching', 'Limited messages', 'Standard support']
      },
      patience: {
        name: 'Patience', 
        price: 'SGD 18',
        priceId: 'price_1RpOh4DGNasEu2DUS6BDFnLX',
        features: ['Advanced matching', '15 daily matches', 'Priority messaging', 'Read receipts', 'Profile verification']
      },
      reliance: {
        name: 'Reliance',
        price: 'SGD 23', 
        priceId: 'price_1RpOhhDGNasEu2DUqLAT8YI9',
        features: ['Premium matching', 'Unlimited matches', 'VIP messaging', 'All filters', 'Priority support']
      }
    };
  }
}

export const paymentService = new PaymentService();