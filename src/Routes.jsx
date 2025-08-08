import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { StripeProvider } from "./contexts/StripeContext";
import NotFound from "pages/NotFound";
import RequireAuth from './components/RequireAuth';

// Code-split heavier pages
const UserLogin = lazy(() => import('./pages/user-login'));
const MatchDiscoverySearch = lazy(() => import('./pages/match-discovery-search'));
const UserRegistration = lazy(() => import('./pages/user-registration'));
const ProfileCreationManagement = lazy(() => import('./pages/profile-creation-management'));
const SubscriptionManagement = lazy(() => import('./pages/subscription-management'));
const ProfileDetailView = lazy(() => import('./pages/profile-detail-view'));
const MessagingCenter = lazy(() => import('./pages/messaging-center'));
const DashboardHome = lazy(() => import('./pages/dashboard-home'));
const EnhancedDashboardHome = lazy(() => import('./pages/enhanced-dashboard-home'));
const StripePaymentIntegration = lazy(() => import('./pages/stripe-payment-integration'));
const ContactPage = lazy(() => import('./pages/contact-page'));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <StripeProvider>
          <ScrollToTop />
          <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
            <RouterRoutes>
              {/* Define your route here */}
              <Route path="/" element={<EnhancedDashboardHome />} />
              <Route path="/user-login" element={<UserLogin />} />
              <Route path="/match-discovery-search" element={<RequireAuth><MatchDiscoverySearch /></RequireAuth>} />
              <Route path="/user-registration" element={<UserRegistration />} />
              <Route path="/profile-creation-management" element={<RequireAuth><ProfileCreationManagement /></RequireAuth>} />
              <Route path="/subscription-management" element={<RequireAuth><SubscriptionManagement /></RequireAuth>} />
              <Route path="/stripe-payment-integration" element={<RequireAuth><StripePaymentIntegration /></RequireAuth>} />
              <Route path="/profile-detail-view" element={<RequireAuth><ProfileDetailView /></RequireAuth>} />
              <Route path="/messaging-center" element={<RequireAuth><MessagingCenter /></RequireAuth>} />
              <Route path="/dashboard-home" element={<RequireAuth><DashboardHome /></RequireAuth>} />
              <Route path="/enhanced-dashboard-home" element={<EnhancedDashboardHome />} />
              <Route path="/contact-page" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </RouterRoutes>
          </Suspense>
        </StripeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;