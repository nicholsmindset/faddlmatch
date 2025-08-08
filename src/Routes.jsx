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
import RequireAuth from './components/RequireAuth';

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
        </StripeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;