import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SocialProof from './components/SocialProof';
import SignupPrompt from './components/SignupPrompt';
import SupportLinks from './components/SupportLinks';
import Icon from '../../components/AppIcon';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      navigate('/dashboard-home');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                  <path d="M12 8L12.5 10.5L15 11L12.5 11.5L12 14L11.5 11.5L9 11L11.5 10.5L12 8Z" />
                </svg>
              </div>
              <div>
                <h1 className="font-heading font-bold text-3xl text-foreground">
                  FADDLmatch
                </h1>
                <p className="text-sm text-muted-foreground font-caption">
                  Islamic Matrimonial Platform
                </p>
              </div>
            </div>
            
            <div className="max-w-md mx-auto">
              <h2 className="font-heading font-semibold text-2xl text-foreground mb-3">
                Welcome Back
              </h2>
              <p className="text-muted-foreground font-caption">
                Sign in to continue your journey towards finding your life partner in accordance with Islamic values
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Login Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-card border border-border rounded-xl p-8 elevation-2">
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    Sign In to Your Account
                  </h3>
                  <p className="text-sm text-muted-foreground font-caption">
                    Enter your credentials to access your matrimonial profile
                  </p>
                </div>

                <LoginForm />

                <div className="mt-8">
                  <SignupPrompt />
                </div>

                {/* Mock Credentials Info */}
                <div className="mt-6 p-4 bg-muted/30 border border-border rounded-lg">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Info" size={16} className="text-primary" />
                    <span className="font-medium text-sm text-foreground">Demo Credentials</span>
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Free Tier:</span>
                      <span className="text-foreground">amira.hassan@email.com / SecurePass123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patience Tier:</span>
                      <span className="text-foreground">fatima.ali@email.com / MyPassword456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reliance Tier:</span>
                      <span className="text-foreground">sarah.ahmad@email.com / StrongPass789</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Social Proof & Support */}
            <div className="order-1 lg:order-2 space-y-8">
              <SocialProof />
              <SupportLinks />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border text-center">
            <div className="flex items-center justify-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground font-caption">Shariah Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground font-caption">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-sm text-muted-foreground font-caption">Singapore Focused</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground font-caption">
              © {new Date()?.getFullYear()} FADDLmatch. Connecting hearts with Islamic values in Singapore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;