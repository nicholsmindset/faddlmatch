import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SupportLinks = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: 'HelpCircle',
      label: 'FAQ',
      description: 'Common questions answered',
      action: () => {
        // In a real app, this would navigate to FAQ section
        alert('FAQ section would be displayed here with common questions about the platform.');
      }
    },
    {
      icon: 'MessageCircle',
      label: 'Customer Support',
      description: 'Get help from our team',
      action: () => {
        // In a real app, this would open support chat
        alert('Customer support chat would be available here. Contact: support@faddlmatch.sg');
      }
    },
    {
      icon: 'Phone',
      label: 'Call Support',
      description: '+65 6123 4567',
      action: () => {
        window.open('tel:+6561234567', '_self');
      }
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-heading font-semibold text-center text-foreground mb-4">
        Need Help?
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {supportOptions?.map((option, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={option?.action}
            className="flex flex-col items-center space-y-2 p-4 h-auto border border-border hover:border-primary/20 hover:bg-primary/5"
          >
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
              <Icon name={option?.icon} size={18} className="text-muted-foreground" />
            </div>
            <div className="text-center">
              <div className="font-medium text-sm text-foreground">
                {option?.label}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                {option?.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
      {/* Additional Support Info */}
      <div className="bg-muted/30 border border-border rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Support Hours</span>
        </div>
        <p className="text-xs text-muted-foreground font-caption">
          Monday - Friday: 9:00 AM - 6:00 PM SGT\n
          Saturday: 10:00 AM - 4:00 PM SGT\n
          Sunday: Closed
        </p>
      </div>
      {/* Emergency Contact */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground font-caption mb-2">
          For urgent matters or safety concerns:
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open('mailto:urgent@faddlmatch.sg', '_self')}
          iconName="Mail"
          iconPosition="left"
          className="text-error border-error hover:bg-error hover:text-error-foreground"
        >
          Emergency Contact
        </Button>
      </div>
    </div>
  );
};

export default SupportLinks;