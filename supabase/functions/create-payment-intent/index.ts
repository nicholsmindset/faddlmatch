import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0';
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';

// Declare Deno global for TypeScript compatibility
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const allowedOrigin = Deno?.env?.get('ALLOWED_ORIGIN') || '*';

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req?.method === 'OPTIONS') {
    return new Response('ok', {
      headers: corsHeaders
    });
  }

  try {
    // Get the authorization token from the request headers
    const authHeader = req?.headers?.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing Authorization header');
    }

    // Create a Supabase client
    const supabaseUrl = Deno?.env?.get('SUPABASE_URL');
    const supabaseKey = Deno?.env?.get('SUPABASE_ANON_KEY');
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Create a Stripe client
    const stripeKey = Deno?.env?.get('STRIPE_SECRET_KEY');
    const stripe = new Stripe(stripeKey);

    // Get the request body
    const { subscriptionTier, priceId } = await req?.json();

    // Validate input data
    if (!subscriptionTier || !priceId) {
      throw new Error('Subscription tier and price ID are required');
    }

    // Get user information from the JWT token
    const { data: { user }, error: userError } = await supabase?.auth?.getUser();
    if (userError || !user) {
      throw new Error('Authentication required');
    }

    // Get subscription pricing based on tier
    const subscriptionPricing = {
      'patience': { amount: 1800, description: 'Patience Plan - SGD 18/month' }, // Amount in cents
      'reliance': { amount: 2300, description: 'Reliance Plan - SGD 23/month' }
    } as const;

    const pricingInfo = subscriptionPricing?.[subscriptionTier as keyof typeof subscriptionPricing];
    if (!pricingInfo) {
      throw new Error('Invalid subscription tier');
    }

    // Create a Stripe payment intent
    const paymentIntent = await stripe?.paymentIntents?.create({
      amount: pricingInfo?.amount,
      currency: 'sgd',
      automatic_payment_methods: { enabled: true },
      description: pricingInfo?.description,
      statement_descriptor: 'FADDLMATCH SUB',
      metadata: {
        user_id: user?.id,
        subscription_tier: subscriptionTier,
        email: user?.email || ''
      }
    });

    // Create subscription record in the database
    const { data: subscription, error: subscriptionError } = await supabase?.from('subscriptions')?.upsert({
        user_id: user?.id,
        tier: subscriptionTier,
        status: 'pending',
        payment_intent_id: paymentIntent?.id,
        amount: pricingInfo?.amount / 100, // Convert back to dollars for storage
        currency: 'SGD',
        created_at: new Date()?.toISOString(),
        updated_at: new Date()?.toISOString()
      })?.select()?.single();

    if (subscriptionError) {
      console.error('Subscription creation error:', subscriptionError);
      // Don't throw error, payment intent is still valid
    }

    // Return the payment intent client secret
    return new Response(JSON.stringify({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      subscriptionId: subscription?.id || null
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 200
    });

  } catch (error) {
    console.error('Create payment intent error:', (error as Error)?.message);
    return new Response(JSON.stringify({
      error: (error as Error).message
    }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      },
      status: 400
    });
  }
});