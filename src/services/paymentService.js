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
        priceId: 'price_patience_sgd_18', // Replace with actual Stripe price ID
        features: ['Advanced matching', 'Unlimited messages', 'Priority support', 'Profile verification']
      },
      reliance: {
        name: 'Reliance',
        price: 'SGD 23',
        priceId: 'price_reliance_sgd_23', // Replace with actual Stripe price ID
        features: ['Premium matching', 'Unlimited everything', '24/7 support', 'Concierge service']
      }
    };
  }
}

export const paymentService = new PaymentService();