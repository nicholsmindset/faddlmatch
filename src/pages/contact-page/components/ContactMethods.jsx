import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactMethods = () => {
  const contactMethods = [
    {
      title: 'Customer Support',
      description: 'General inquiries and account assistance',
      methods: [
        { type: 'email', value: 'support@faddlmatch.com', icon: 'Mail' },
        { type: 'phone', value: '+65 1234 5678', icon: 'Phone' },
        { type: 'chat', value: 'Live Chat Available', icon: 'MessageCircle', hours: 'Mon-Fri 9AM-6PM SGT' }
      ]
    },
    {
      title: 'Technical Support',
      description: 'App issues and troubleshooting',
      methods: [
        { type: 'email', value: 'tech@faddlmatch.com', icon: 'Settings' },
        { type: 'link', value: 'Help Center', icon: 'HelpCircle', href: '/help' }
      ]
    },
    {
      title: 'Business Inquiries',
      description: 'Partnerships and media requests',
      methods: [
        { type: 'email', value: 'business@faddlmatch.com', icon: 'Briefcase' },
        { type: 'phone', value: '+65 1234 5679', icon: 'Phone' }
      ]
    }
  ];

  const handleContact = (method) => {
    switch (method?.type) {
      case 'email':
        window.location.href = `mailto:${method?.value}`;
        break;
      case 'phone':
        window.location.href = `tel:${method?.value}`;
        break;
      case 'chat':
        // In a real app, this would open a live chat widget
        console.log('Opening live chat...');
        break;
      case 'link':
        if (method?.href) {
          window.location.href = method?.href;
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-xl text-foreground mb-2">
          Contact Methods
        </h2>
        <p className="text-muted-foreground font-body text-sm">
          Choose the best way to reach us
        </p>
      </div>
      <div className="space-y-4">
        {contactMethods?.map((section, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-heading font-semibold text-foreground mb-1">
              {section?.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {section?.description}
            </p>
            
            <div className="space-y-3">
              {section?.methods?.map((method, methodIndex) => (
                <div key={methodIndex} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                      <Icon name={method?.icon} size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {method?.value}
                      </p>
                      {method?.hours && (
                        <p className="text-xs text-muted-foreground">
                          {method?.hours}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleContact(method)}
                    className="text-islamic-green hover:text-islamic-green/80"
                  >
                    <Icon name="ExternalLink" size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Support Hours */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Clock" size={16} className="text-islamic-green" />
          <h3 className="font-heading font-semibold text-foreground">
            Support Hours
          </h3>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monday - Friday</span>
            <span className="font-medium text-foreground">9:00 AM - 6:00 PM SGT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Saturday</span>
            <span className="font-medium text-foreground">10:00 AM - 4:00 PM SGT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sunday</span>
            <span className="font-medium text-foreground">Closed</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
          Emergency support available 24/7 for urgent safety concerns
        </div>
      </div>
      {/* Language Support */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Globe" size={16} className="text-trust-blue" />
          <h3 className="font-heading font-semibold text-foreground">
            Language Support
          </h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['English', 'Malay', 'Arabic']?.map((language) => (
            <span 
              key={language}
              className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-xs font-medium text-foreground"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMethods;