import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureComparison = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Mock feature comparison data
  const featureCategories = [
    {
      id: 'matching',
      name: 'Matching & Discovery',
      icon: 'Heart',
      features: [
        {
          name: 'Daily Match Suggestions',
          intention: '3 matches',
          patience: '10 matches',
          reliance: 'Unlimited'
        },
        {
          name: 'Advanced Filtering',
          intention: false,
          patience: true,
          reliance: true
        },
        {
          name: 'See Who Likes You',
          intention: false,
          patience: true,
          reliance: true
        },
        {
          name: 'Profile Boost',
          intention: false,
          patience: '1 per month',
          reliance: '5 per month'
        }
      ]
    },
    {
      id: 'messaging',
      name: 'Communication',
      icon: 'MessageCircle',
      features: [
        {
          name: 'Basic Messaging',
          intention: '5 messages/day',
          patience: 'Unlimited',
          reliance: 'Unlimited'
        },
        {
          name: 'Photo Sharing',
          intention: false,
          patience: true,
          reliance: true
        },
        {
          name: 'Video Calling',
          intention: false,
          patience: false,
          reliance: true
        },
        {
          name: 'Voice Messages',
          intention: false,
          patience: true,
          reliance: true
        }
      ]
    },
    {
      id: 'privacy',
      name: 'Privacy & Security',
      icon: 'Shield',
      features: [
        {
          name: 'Photo Privacy Control',
          intention: 'Basic blur',
          patience: 'Advanced blur',
          reliance: 'Full control'
        },
        {
          name: 'Guardian Oversight',
          intention: true,
          patience: true,
          reliance: true
        },
        {
          name: 'Profile Verification',
          intention: 'Basic',
          patience: 'Enhanced',
          reliance: 'Premium'
        },
        {
          name: 'Incognito Mode',
          intention: false,
          patience: false,
          reliance: true
        }
      ]
    },
    {
      id: 'support',
      name: 'Support & Guidance',
      icon: 'HelpCircle',
      features: [
        {
          name: 'Customer Support',
          intention: 'Email only',
          patience: 'Priority email',
          reliance: 'Phone & chat'
        },
        {
          name: 'Advisor Chat',
          intention: false,
          patience: false,
          reliance: true
        },
        {
          name: 'Islamic Guidance',
          intention: 'Basic articles',
          patience: 'Extended library',
          reliance: 'Personal advisor'
        },
        {
          name: 'Success Stories',
          intention: true,
          patience: true,
          reliance: true
        }
      ]
    }
  ];

  const renderFeatureValue = (value, tier) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Icon name="Check" size={16} className="text-success" />
      ) : (
        <Icon name="X" size={16} className="text-muted-foreground" />
      );
    }
    
    return (
      <span className={`text-sm font-medium ${
        tier === 'intention' ? 'text-islamic-green' :
        tier === 'patience'? 'text-trust-blue' : 'text-premium-purple'
      }`}>
        {value}
      </span>
    );
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-islamic-green/10 rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-islamic-green" />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground">
            Feature Comparison
          </h2>
          <p className="text-sm text-muted-foreground">
            Compare features across all subscription plans
          </p>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-2 font-medium text-foreground">Features</th>
                <th className="text-center py-4 px-2 font-medium text-islamic-green">
                  Intention (Free)
                </th>
                <th className="text-center py-4 px-2 font-medium text-trust-blue">
                  Patience (SGD $18)
                </th>
                <th className="text-center py-4 px-2 font-medium text-premium-purple">
                  Reliance (SGD $23)
                </th>
              </tr>
            </thead>
            <tbody>
              {featureCategories?.map((category) => (
                <React.Fragment key={category?.id}>
                  <tr className="border-b border-border bg-muted/30">
                    <td colSpan={4} className="py-3 px-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={category?.icon} size={16} className="text-muted-foreground" />
                        <span className="font-medium text-foreground">{category?.name}</span>
                      </div>
                    </td>
                  </tr>
                  {category?.features?.map((feature, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/20">
                      <td className="py-3 px-2 text-sm text-foreground">{feature?.name}</td>
                      <td className="py-3 px-2 text-center">
                        {renderFeatureValue(feature?.intention, 'intention')}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {renderFeatureValue(feature?.patience, 'patience')}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {renderFeatureValue(feature?.reliance, 'reliance')}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Accordion View */}
      <div className="lg:hidden space-y-4">
        {featureCategories?.map((category) => (
          <div key={category?.id} className="border border-border rounded-lg">
            <Button
              variant="ghost"
              onClick={() => toggleCategory(category?.id)}
              className="w-full justify-between p-4 h-auto"
            >
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={20} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{category?.name}</span>
              </div>
              <Icon 
                name={expandedCategory === category?.id ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground" 
              />
            </Button>
            
            {expandedCategory === category?.id && (
              <div className="border-t border-border p-4 space-y-4">
                {category?.features?.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-medium text-sm text-foreground">{feature?.name}</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-islamic-green/5 rounded">
                        <div className="text-islamic-green font-medium mb-1">Intention</div>
                        {renderFeatureValue(feature?.intention, 'intention')}
                      </div>
                      <div className="text-center p-2 bg-trust-blue/5 rounded">
                        <div className="text-trust-blue font-medium mb-1">Patience</div>
                        {renderFeatureValue(feature?.patience, 'patience')}
                      </div>
                      <div className="text-center p-2 bg-premium-purple/5 rounded">
                        <div className="text-premium-purple font-medium mb-1">Reliance</div>
                        {renderFeatureValue(feature?.reliance, 'reliance')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Call to Action */}
      <div className="mt-8 p-6 bg-gradient-to-r from-islamic-green/10 via-trust-blue/10 to-premium-purple/10 rounded-lg border border-border">
        <div className="text-center">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
            Ready to Find Your Perfect Match?
          </h3>
          <p className="text-muted-foreground mb-4">
            Upgrade your plan to unlock advanced features and increase your chances of finding meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white"
            >
              Try Patience Plan
            </Button>
            <Button
              variant="default"
              className="bg-premium-purple hover:bg-premium-purple/90"
            >
              Upgrade to Reliance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureComparison;