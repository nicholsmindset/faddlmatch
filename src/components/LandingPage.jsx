import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import Icon from './AppIcon';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'Heart',
      title: 'Halal Matchmaking',
      description: 'Find your life partner in a way that aligns with Islamic values and traditions'
    },
    {
      icon: 'Shield',
      title: 'Verified Profiles',
      description: 'All profiles are verified to ensure authenticity and serious intentions'
    },
    {
      icon: 'Users',
      title: 'Family Involvement',
      description: 'Include family members in the process with guardian access and notifications'
    },
    {
      icon: 'MessageCircle',
      title: 'Guided Communication',
      description: 'Structured communication tools that respect Islamic guidelines'
    },
    {
      icon: 'Star',
      title: 'Compatibility Matching',
      description: 'Advanced algorithms consider religious practices, values, and lifestyle preferences'
    },
    {
      icon: 'Lock',
      title: 'Privacy & Security',
      description: 'Your personal information is protected with the highest security standards'
    }
  ];

  const packages = [
    {
      name: 'Intention',
      price: 'Free',
      features: [
        '1 daily match',
        'Basic profile creation',
        'Limited messaging',
        'Standard support'
      ],
      highlight: false
    },
    {
      name: 'Patience',
      price: '$19/month',
      features: [
        '3 daily matches',
        'Advanced filters',
        'Unlimited messaging',
        'Priority support',
        'Profile visibility boost'
      ],
      highlight: true
    },
    {
      name: 'Reliance',
      price: '$39/month',
      features: [
        'Unlimited matches',
        'Premium features',
        'VIP support',
        'Advanced compatibility',
        'Marriage counseling access'
      ],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={32} className="text-primary" />
              <span className="font-heading font-bold text-2xl text-foreground">
                FaddlMatch
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/user-login')}
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate('/user-registration')}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-6">
              Find Your <span className="text-primary">Halal</span> Life Partner
            </h1>
            <p className="text-xl text-muted-foreground mb-8 font-body">
              A trusted Islamic matrimonial platform that respects your values while helping you find meaningful connections. Join thousands of Muslims who have found their soulmates through FaddlMatch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/user-registration')}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={20}
              >
                Start Your Journey
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/contact-page')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Why Choose FaddlMatch?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine modern technology with Islamic values to create a respectful and effective matchmaking experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features?.map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name={feature?.icon} size={24} className="text-primary" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                  {feature?.title}
                </h3>
                <p className="text-muted-foreground font-body">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start with our free plan or upgrade for premium features and better match opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages?.map((pkg, index) => (
              <div
                key={index}
                className={`bg-card border rounded-lg p-8 shadow-elevation-1 relative ${
                  pkg?.highlight 
                    ? 'border-primary shadow-elevation-3 scale-105' 
                    : 'border-border'
                }`}
              >
                {pkg?.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                    {pkg?.name}
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {pkg?.price}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {pkg?.features?.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Icon name="Check" size={16} className="text-primary mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant={pkg?.highlight ? "default" : "outline"}
                  className="w-full"
                  onClick={() => navigate('/user-registration')}
                >
                  {pkg?.name === 'Intention' ? 'Get Started Free' : 'Choose Plan'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <div className="bg-gradient-to-r from-primary to-secondary p-12 rounded-2xl text-white">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Ready to Find Your Match?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of Muslims who have found meaningful connections through our platform. Your journey to marriage starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/user-registration')}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={20}
              >
                Create Free Account
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/contact-page')}
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Heart" size={32} className="text-primary" />
                <span className="font-heading font-bold text-2xl text-foreground">
                  FaddlMatch
                </span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                A trusted Islamic matrimonial platform helping Muslims find their life partners while respecting Islamic values and traditions.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Instagram" size={20} />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/user-registration')}
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                  >
                    Sign Up
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/user-login')}
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                  >
                    Sign In
                  </Button>
                </li>
                <li>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/contact-page')}
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate('/contact-page')}
                    className="p-0 h-auto text-muted-foreground hover:text-foreground"
                  >
                    Help Center
                  </Button>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-muted-foreground text-sm">Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2025 FaddlMatch. All rights reserved. Building halal connections with respect and dignity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;