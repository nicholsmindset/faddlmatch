import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { StripeProvider } from "./contexts/StripeContext";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import MatchDiscoverySearch from './pages/match-discovery-search';
import UserRegistration from './pages/user-registration';
import ProfileCreationManagement from './pages/profile-creation-management';
import SubscriptionManagement from './pages/subscription-management';
import ProfileDetailView from './pages/profile-detail-view';
import MessagingCenter from './pages/messaging-center';
import DashboardHome from './pages/dashboard-home';
import EnhancedDashboardHome from './pages/enhanced-dashboard-home';
import StripePaymentIntegration from './pages/stripe-payment-integration';
import ContactPage from './pages/contact-page';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <StripeProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<EnhancedDashboardHome />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/match-discovery-search" element={<MatchDiscoverySearch />} />
            <Route path="/user-registration" element={<UserRegistration />} />
            <Route path="/profile-creation-management" element={<ProfileCreationManagement />} />
            <Route path="/subscription-management" element={<SubscriptionManagement />} />
            <Route path="/stripe-payment-integration" element={<StripePaymentIntegration />} />
            <Route path="/profile-detail-view" element={<ProfileDetailView />} />
            <Route path="/messaging-center" element={<MessagingCenter />} />
            <Route path="/dashboard-home" element={<DashboardHome />} />
            <Route path="/enhanced-dashboard-home" element={<EnhancedDashboardHome />} />
            <Route path="/contact-page" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </StripeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;