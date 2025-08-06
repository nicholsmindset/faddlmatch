import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SignupPrompt = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/user-registration');
  };

  const benefits = [
    {
      icon: 'Heart',
      text: 'Find meaningful connections'
    },
    {
      icon: 'Shield',
      text: 'Family-involved process'
    },
    {
      icon: 'Users',
      text: 'Verified Muslim community'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-caption">
            New to our community?
          </span>
        </div>
      </div>
      {/* Benefits */}
      <div className="space-y-3">
        {benefits?.map((benefit, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name={benefit?.icon} size={16} className="text-primary" />
            </div>
            <span className="text-sm text-muted-foreground font-caption">
              {benefit?.text}
            </span>
          </div>
        ))}
      </div>
      {/* Create Account Button */}
      <Button
        variant="outline"
        onClick={handleCreateAccount}
        fullWidth
        iconName="UserPlus"
        iconPosition="left"
        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
      >
        Create Account
      </Button>
      {/* Additional Info */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground font-caption">
          Join thousands of Muslims in Singapore finding their life partners
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center space-x-1">
            <Icon name="Lock" size={12} />
            <span>Secure</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Eye" size={12} />
            <span>Private</span>
          </span>
          <span className="flex items-center space-x-1">
            <Icon name="Heart" size={12} />
            <span>Halal</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPrompt;