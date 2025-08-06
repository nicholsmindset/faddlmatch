import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0';
import Stripe from 'https://esm.sh/stripe@12.0.0?target=deno';

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature')!;
    const body = await req.text();
    
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    switch (event.type) {
      case 'customer.subscription.created': case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update subscription in database
        const { error } = await supabase.from('subscriptions').upsert({
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          status: subscription.status,
          tier: subscription.metadata.subscription_tier,
          current_period_start: new Date(subscription.current_period_start * 1000),
          current_period_end: new Date(subscription.current_period_end * 1000),
          cancel_at_period_end: subscription.cancel_at_period_end
        });

        if (error) {
          console.error('Failed to update subscription:', error);
        }

        // Update user profile subscription tier if active
        if (subscription.status === 'active') {
          const { error: profileError } = await supabase
            .from('user_profiles')
            .update({ 
              subscription_tier: subscription.metadata.subscription_tier 
            })
            .eq('stripe_customer_id', subscription.customer);

          if (profileError) {
            console.error('Failed to update user profile tier:', profileError);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Mark subscription as canceled
        const { error } = await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('Failed to cancel subscription:', error);
        }

        // Downgrade user to free tier
        const { error: profileError } = await supabase
          .from('user_profiles')
          .update({ subscription_tier: 'intention' })
          .eq('stripe_customer_id', subscription.customer);

        if (profileError) {
          console.error('Failed to downgrade user profile:', profileError);
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Log successful payment
        const { error } = await supabase.from('payment_history').insert({
          stripe_payment_intent_id: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: 'succeeded',
          description: paymentIntent.description,
          metadata: paymentIntent.metadata
        });

        if (error) {
          console.error('Failed to log payment:', error);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Log failed payment
        const { error } = await supabase.from('payment_history').insert({
          stripe_payment_intent_id: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          status: 'failed',
          description: paymentIntent.description,
          metadata: paymentIntent.metadata
        });

        if (error) {
          console.error('Failed to log failed payment:', error);
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Webhook error:', error.message);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});