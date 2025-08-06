import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Routes from './Routes';
import AuthProvider from './contexts/AuthContext';
import { StripeProvider } from './contexts/StripeContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StripeProvider>
          <Routes />
        </StripeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;