import React, { createContext, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeContext = createContext();

export const useStripeContext = () => {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripeContext must be used within StripeProvider');
  }
  return context;
};

export const StripeProvider = ({ children }) => {
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#22c55e', // Emerald Green
      colorBackground: '#ffffff',
      colorText: '#1e293b', // Midnight Navy
      colorDanger: '#EF4444',
      fontFamily: 'Lato, sans-serif',
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

  return (
    <Elements stripe={stripePromise} options={{ appearance }}>
      <StripeContext.Provider value={{}}>
        {children}
      </StripeContext.Provider>
    </Elements>
  );
};