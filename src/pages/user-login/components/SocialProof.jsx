import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProof = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ahmad & Khadijah",
      location: "Tampines, Singapore",
      message: "Found my life partner through FADDLmatch. The platform's respect for Islamic values made all the difference.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: "Fatima Rahman",
      location: "Jurong, Singapore",
      message: "As a widow, I appreciated the sensitivity and family involvement features. Alhamdulillah for this blessed platform.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      verified: true
    }
  ];

  const trustBadges = [
    {
      icon: 'Shield',
      label: 'Shariah Compliant',
      description: 'Verified by Islamic scholars'
    },
    {
      icon: 'CheckCircle',
      label: 'Halal Verified',
      description: 'All interactions monitored'
    },
    {
      icon: 'MapPin',
      label: 'Singapore Focused',
      description: 'Local Muslim community'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Icon name={badge?.icon} size={20} className="text-primary" />
            </div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
              {badge?.label}
            </h4>
            <p className="text-xs text-muted-foreground font-caption">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-lg text-center text-foreground">
          Trusted by Singapore's Muslim Community
        </h3>
        
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-sm text-foreground">
                      {testimonial?.name}
                    </h4>
                    {testimonial?.verified && (
                      <Icon name="BadgeCheck" size={16} className="text-primary" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 font-caption">
                    "{testimonial?.message}"
                  </p>
                  
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-caption">
                      {testimonial?.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-heading font-bold text-2xl text-primary mb-1">500+</div>
            <div className="text-xs text-muted-foreground font-caption">Successful Matches</div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl text-primary mb-1">98%</div>
            <div className="text-xs text-muted-foreground font-caption">Satisfaction Rate</div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl text-primary mb-1">2k+</div>
            <div className="text-xs text-muted-foreground font-caption">Active Members</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;