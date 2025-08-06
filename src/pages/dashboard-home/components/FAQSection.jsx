import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { faqService } from '../../../utils/faqService';

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const { data, error } = await faqService?.getFAQs();
        if (error) {
          setError(error?.message);
          return;
        }
        setFaqs(data);
      } catch (error) {
        setError('Failed to load FAQs');
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3]?.map(i => (
              <div key={i} className="h-4 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="text-center py-8">
          <Icon name="AlertCircle" size={48} className="text-destructive mx-auto mb-4" />
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-islamic-green/10 rounded-lg flex items-center justify-center">
          <Icon name="HelpCircle" size={20} className="text-islamic-green" />
        </div>
        <div>
          <h2 className="font-heading font-bold text-xl text-foreground">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-muted-foreground font-caption">
            Common questions about Faddl
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {faqs?.map((faq, index) => (
          <div
            key={faq?.id}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <span className="font-medium text-foreground pr-4">
                ❓ {faq?.question}
              </span>
              <Icon
                name={openIndex === index ? "ChevronUp" : "ChevronDown"}
                size={16}
                className="text-muted-foreground flex-shrink-0"
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-3 pt-0">
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {faq?.answer?.split('\n\n')?.map((paragraph, pIndex) => (
                    <p key={pIndex} className={pIndex > 0 ? 'mt-3' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {faqs?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No FAQs available at the moment</p>
        </div>
      )}
    </div>
  );
};

export default FAQSection;