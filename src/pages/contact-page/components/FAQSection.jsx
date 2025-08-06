import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      category: 'Islamic Compliance',
      questions: [
        {
          id: 'islamic-1',
          question: 'How does FADDLmatch ensure Islamic compliance?',
          answer: 'FADDLmatch operates under Islamic principles with features like guardian involvement, privacy controls, and moderated interactions. All profiles and communications are monitored to maintain halal standards in the matchmaking process.'
        },
        {
          id: 'islamic-2',
          question: 'Can guardians (wali) be involved in the process?',
          answer: 'Yes, absolutely. We encourage guardian involvement and provide features for family members to participate in the matchmaking process while respecting Islamic traditions and cultural values.'
        },
        {
          id: 'islamic-3',
          question: 'What Islamic scholars have endorsed this platform?',
          answer: 'Our platform has been reviewed and approved by recognized Islamic scholars specializing in marriage and family matters. We work closely with religious authorities to ensure our practices align with Islamic teachings.'
        }
      ]
    },
    {
      category: 'Subscription & Features',
      questions: [
        {
          id: 'subscription-1',
          question: 'What\'s the difference between Intention, Patience, and Reliance plans?',
          answer: 'Intention (Free) offers 1 daily match and basic features. Patience ($18/month) provides 3 daily matches, advanced search, and profile insights. Reliance ($23/month) includes unlimited matches, priority support, and all premium features.'
        },
        {
          id: 'subscription-2',
          question: 'Can I upgrade or downgrade my subscription anytime?',
          answer: 'Yes, you can change your subscription plan at any time. Upgrades take effect immediately, while downgrades will apply at the next billing cycle to ensure you get full value from your current plan.'
        },
        {
          id: 'subscription-3',
          question: 'Do you offer refunds if I\'m not satisfied?',
          answer: 'We offer a 30-day money-back guarantee for first-time subscribers. If you\'re not satisfied within the first month, contact our support team for a full refund.'
        }
      ]
    },
    {
      category: 'Safety & Privacy',
      questions: [
        {
          id: 'safety-1',
          question: 'How do you verify user profiles?',
          answer: 'We use a multi-step verification process including phone number verification, photo verification, and optional ID verification for premium features. Our moderation team also reviews all profiles manually.'
        },
        {
          id: 'safety-2',
          question: 'What privacy controls are available?',
          answer: 'You can control who sees your profile, photos, and personal information. Features include private photo albums, selective visibility settings, and the ability to block or report inappropriate users.'
        },
        {
          id: 'safety-3',
          question: 'How do you handle inappropriate behavior?',
          answer: 'We have a zero-tolerance policy for inappropriate behavior. Users can report violations easily, and our moderation team investigates all reports promptly. Serious violations result in immediate account suspension.'
        }
      ]
    }
  ];

  const toggleFAQ = (questionId) => {
    setOpenFAQ(openFAQ === questionId ? null : questionId);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
      <div className="text-center mb-8">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground font-body">
          Find answers to common questions about FADDLmatch
        </p>
      </div>

      <div className="space-y-6">
        {faqData?.map((category) => (
          <div key={category?.category}>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center">
              <div className="w-2 h-2 bg-islamic-green rounded-full mr-3" />
              {category?.category}
            </h3>
            
            <div className="space-y-3">
              {category?.questions?.map((faq) => (
                <div
                  key={faq?.id}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  <Button
                    variant="ghost"
                    onClick={() => toggleFAQ(faq?.id)}
                    className="w-full justify-between p-4 text-left hover:bg-muted/50"
                  >
                    <span className="font-medium text-foreground pr-4">
                      {faq?.question}
                    </span>
                    <Icon
                      name={openFAQ === faq?.id ? "ChevronUp" : "ChevronDown"}
                      size={16}
                      className="text-muted-foreground flex-shrink-0"
                    />
                  </Button>
                  
                  {openFAQ === faq?.id && (
                    <div className="px-4 pb-4 border-t border-border bg-muted/20">
                      <p className="text-muted-foreground font-body text-sm leading-relaxed pt-3">
                        {faq?.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-8 pt-8 border-t border-border text-center">
        <h3 className="font-semibold text-foreground mb-2">
          Still have questions?
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Our support team is here to help you with any other questions
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => window.location.href = 'mailto:support@faddlmatch.com'}
            iconName="Mail"
            iconPosition="left"
            iconSize={16}
          >
            Email Support
          </Button>
          <Button
            variant="outline"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={16}
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;