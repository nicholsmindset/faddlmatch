import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import ContactForm from './components/ContactForm';
import ContactMethods from './components/ContactMethods';
import OfficeLocation from './components/OfficeLocation';
import FAQSection from './components/FAQSection';
import SocialLinks from './components/SocialLinks';
import Icon from '../../components/AppIcon';


const ContactPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [showMap, setShowMap] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - FADDLmatch | Islamic Marriage Platform Support</title>
        <meta name="description" content="Get in touch with FADDLmatch support team. We're here to help with your Islamic marriage journey." />
        <meta name="keywords" content="FADDLmatch contact, Islamic marriage support, customer service, help center" />
      </Helmet>

      <GlobalHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-islamic-green/5 via-background to-trust-blue/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-islamic-green/10 rounded-full mb-6">
              <Icon name="MessageCircle" size={32} className="text-islamic-green" />
            </div>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
              We're Here to Help
            </h1>
            <p className="text-muted-foreground font-body text-lg lg:text-xl max-w-2xl mx-auto mb-8">
              Our dedicated support team is committed to assisting you on your Islamic marriage journey. 
              Reach out to us for any questions, concerns, or guidance you may need.
            </p>
            
            {/* Quick Response Time */}
            <div className="inline-flex items-center space-x-2 bg-card border border-border rounded-full px-4 py-2">
              <Icon name="Clock" size={16} className="text-islamic-green" />
              <span className="text-sm font-medium text-foreground">
                Average response time: 2-4 hours
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        {/* Contact Methods Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <ContactForm 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div>
            <ContactMethods />
          </div>
        </div>

        {/* Office Location & Map */}
        <div className="mb-16">
          <OfficeLocation 
            showMap={showMap}
            onToggleMap={() => setShowMap(!showMap)}
          />
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <FAQSection />
        </div>

        {/* Social Links & Final CTA */}
        <div className="text-center bg-card border border-border rounded-2xl p-8 lg:p-12">
          <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
            Stay Connected
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
            Follow us on social media for updates, Islamic marriage tips, and community stories.
          </p>
          
          <SocialLinks />
          
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-islamic-green" />
                <span>Secure & Confidential</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Globe" size={16} className="text-trust-blue" />
                <span>Multilingual Support</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Heart" size={16} className="text-premium-purple" />
                <span>Islamic Values Centered</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Emergency Support Banner */}
      <div className="bg-islamic-green text-white py-4">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
              <Icon name="Phone" size={20} />
              <span className="font-medium">Need immediate assistance?</span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+6512345678" 
                className="flex items-center space-x-2 hover:underline"
              >
                <span className="font-semibold">+65 1234 5678</span>
              </a>
              <span className="text-white/70">|</span>
              <span className="text-sm">24/7 Support Line</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;