import React, { createContext, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const publishableKey = import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

const StripeContext = createContext();

export const useStripeContext = () => useContext(StripeContext);

export const StripeProvider = ({ children }) => {
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#22c55e', // Emerald Green
      colorText: '#1f2937',
      colorBackground: '#ffffff',
      colorDanger: '#ef4444',
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
    rules: {
      '.Input': {
        borderColor: '#887679', // Bronze
        boxShadow: 'none',
      },
      '.Input:focus': {
        borderColor: '#22c55e', // Emerald Green
        boxShadow: '0 0 0 2px rgba(34, 197, 94, 0.1)',
      },
      '.Label': {
        color: '#1e293b', // Midnight Navy
        fontWeight: '500',
      },
    },
  };

  if (!stripePromise) {
    return (
      <StripeContext.Provider value={{}}>
        {children}
      </StripeContext.Provider>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      <StripeContext.Provider value={{}}>
        {children}
      </StripeContext.Provider>
    </Elements>
  );
};

export default StripeContext;