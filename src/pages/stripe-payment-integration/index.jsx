import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import GlobalHeader from '../../components/ui/GlobalHeader';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useAuth } from '../../contexts/AuthContext';
import { paymentService } from '../../services/paymentService';

const StripePaymentIntegration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const stripe = useStripe();
  const elements = useElements();
  const { userProfile, loading: authLoading } = useAuth();
  
  const [selectedTier, setSelectedTier] = useState(searchParams?.get('tier') || 'patience');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');

  const subscriptionPlans = paymentService?.getSubscriptionPlans();
  const selectedPlan = subscriptionPlans?.[selectedTier];

  useEffect(() => {
    if (selectedPlan?.priceId && userProfile) {
      createPaymentIntent();
    }
  }, [selectedTier, userProfile]);

  const createPaymentIntent = async () => {
    try {
      setError('');
      const { clientSecret: secret, paymentIntentId: id } = await paymentService?.createPaymentIntent(
        selectedTier,
        selectedPlan?.priceId
      );
      setClientSecret(secret);
      setPaymentIntentId(id);
    } catch (err) {
      setError(err?.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      return;
    }

    if (!clientSecret) {
      setError('Payment setup is incomplete. Please try again.');
      return;
    }

    setIsProcessing(true);
    setError('');

    const cardElement = elements?.getElement(CardElement);

    const { error: confirmError, paymentIntent } = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: userProfile?.full_name,
          email: userProfile?.email,
        },
      },
    });

    setIsProcessing(false);

    if (confirmError) {
      setError(confirmError?.message);
    } else if (paymentIntent?.status === 'succeeded') {
      // Payment successful - redirect to onboarding
      navigate('/profile-creation-management?subscription=success');
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1e293b', // Midnight Navy
        fontFamily: 'Lato, sans-serif',
        '::placeholder': {
          color: '#a8969a', // Muted Bronze
        },
      },
      invalid: {
        color: '#EF4444',
        iconColor: '#EF4444',
      },
    },
    hidePostalCode: false,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-ivory-cream">
        <GlobalHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-emerald-green animate-spin mx-auto mb-4" />
            <p className="text-muted-bronze font-lato">Loading payment setup...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-cream islamic-pattern">
      <GlobalHeader />
      <main className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CreditCard" size={32} className="text-emerald-green" />
          </div>
          <h1 className="font-cinzel font-bold text-4xl text-midnight-navy mb-4">
            Complete Your Subscription
          </h1>
          <p className="text-lg text-muted-bronze font-lato max-w-2xl mx-auto">
            Secure your subscription to FADDL and unlock premium matrimonial features designed for the modern Muslim community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-elevation-3 p-8 border border-bronze/20">
            <div className="mb-6">
              <h2 className="font-cinzel font-semibold text-2xl text-midnight-navy mb-2">
                Payment Details
              </h2>
              <p className="text-muted-bronze font-lato">
                Complete your subscription to {selectedPlan?.name}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-red-500" />
                  <p className="text-red-700 text-sm font-lato">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Plan Selection */}
              <div>
                <label className="block text-sm font-medium text-midnight-navy mb-3 font-lato">
                  Selected Plan
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(subscriptionPlans)?.filter(([key]) => key !== 'intention')?.map(([key, plan]) => (
                    <Button
                      key={key}
                      type="button"
                      variant={selectedTier === key ? "default" : "outline"}
                      onClick={() => setSelectedTier(key)}
                      className={`p-4 h-auto flex flex-col items-center space-y-2 ${
                        selectedTier === key 
                          ? 'bg-emerald-green text-white border-emerald-green' :'border-bronze text-midnight-navy hover:border-emerald-green'
                      }`}
                    >
                      <Icon name={key === 'patience' ? 'Shield' : 'Crown'} size={20} />
                      <div className="text-center">
                        <div className="font-cinzel font-medium">{plan?.name}</div>
                        <div className="text-sm opacity-80">{plan?.price}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Card Element */}
              <div>
                <label className="block text-sm font-medium text-midnight-navy mb-3 font-lato">
                  Card Information
                </label>
                <div className="p-4 border border-bronze/30 rounded-lg focus-within:border-emerald-green focus-within:ring-2 focus-within:ring-emerald-green/10">
                  <CardElement options={cardElementOptions} />
                </div>
              </div>

              {/* Security Badges */}
              <div className="flex items-center justify-center space-x-4 py-4 border-t border-bronze/20">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-emerald-green" />
                  <span className="text-xs text-muted-bronze font-lato">256-bit SSL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-emerald-green" />
                  <span className="text-xs text-muted-bronze font-lato">PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Heart" size={16} className="text-emerald-green" />
                  <span className="text-xs text-muted-bronze font-lato">Halal Certified</span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!stripe || isProcessing || !clientSecret}
                className="w-full bg-emerald-green hover:bg-emerald-green/90 text-white py-4 font-lato font-medium"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <Icon name="Loader2" size={18} className="animate-spin" />
                    <span>Processing Payment...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Icon name="CreditCard" size={18} />
                    <span>Complete Subscription - {selectedPlan?.price}</span>
                  </div>
                )}
              </Button>
            </form>
          </div>

          {/* Subscription Summary */}
          <div className="bg-white rounded-xl shadow-elevation-3 p-8 border border-bronze/20">
            <h3 className="font-cinzel font-semibold text-xl text-midnight-navy mb-6">
              Subscription Summary
            </h3>

            {/* Selected Plan */}
            <div className="mb-6 p-4 border border-emerald-green/20 rounded-lg bg-emerald-green/5">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-emerald-green/10 rounded-full flex items-center justify-center">
                  <Icon name={selectedTier === 'patience' ? 'Shield' : 'Crown'} size={20} className="text-emerald-green" />
                </div>
                <div>
                  <h4 className="font-cinzel font-medium text-midnight-navy">{selectedPlan?.name}</h4>
                  <p className="text-emerald-green font-lato font-medium">{selectedPlan?.price}/month</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-lato font-medium text-midnight-navy mb-3">Included Features:</h4>
              <ul className="space-y-2">
                {selectedPlan?.features?.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-emerald-green" />
                    <span className="text-sm text-muted-bronze font-lato">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing Breakdown */}
            <div className="border-t border-bronze/20 pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-lato text-muted-bronze">Subtotal</span>
                <span className="font-lato text-midnight-navy">{selectedPlan?.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-lato text-muted-bronze">GST (0%)</span>
                <span className="font-lato text-midnight-navy">SGD 0.00</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-bronze/20">
                <span className="font-cinzel font-medium text-midnight-navy">Total</span>
                <span className="font-cinzel font-medium text-emerald-green text-lg">{selectedPlan?.price}</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 pt-4 border-t border-bronze/20">
              <div className="text-center">
                <p className="text-xs text-muted-bronze font-lato mb-3">
                  Your payment is secured by industry-leading encryption
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-xs text-muted-bronze font-lato">Powered by Stripe</div>
                  <div className="w-1 h-1 bg-muted-bronze rounded-full"></div>
                  <div className="text-xs text-muted-bronze font-lato">Singapore Licensed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Flow Indicator */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-bronze font-lato mb-4">
            After successful payment, you'll be redirected to complete your profile setup
          </p>
          <div className="flex items-center justify-center space-x-4 max-w-md mx-auto">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-green rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} className="text-white" />
              </div>
              <span className="text-xs text-muted-bronze font-lato">Payment</span>
            </div>
            <div className="w-8 h-px bg-bronze"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-bronze/20 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-bronze" />
              </div>
              <span className="text-xs text-muted-bronze font-lato">Onboarding</span>
            </div>
            <div className="w-8 h-px bg-bronze/20"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-bronze/20 rounded-full flex items-center justify-center">
                <Icon name="Heart" size={16} className="text-bronze" />
              </div>
              <span className="text-xs text-muted-bronze font-lato">Dashboard</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StripePaymentIntegration;