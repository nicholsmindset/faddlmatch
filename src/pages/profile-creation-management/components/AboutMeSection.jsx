import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AboutMeSection = ({ 
  isExpanded = false, 
  onToggle = () => {}, 
  data = {}, 
  onUpdate = () => {},
  isCompleted = false 
}) => {
  const [formData, setFormData] = useState({
    aboutMe: data?.aboutMe || '',
    lifeGoals: data?.lifeGoals || '',
    hobbies: data?.hobbies || '',
    ...data
  });

  const [charCount, setCharCount] = useState(formData?.aboutMe?.length || 0);
  const maxChars = 500;

  const handleTextChange = (field, value) => {
    if (field === 'aboutMe') {
      setCharCount(value?.length);
    }
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  const suggestedPrompts = [
    "What are your core values and how do they guide your daily life?",
    "What role does faith play in your life and future plans?",
    "What are you looking for in a life partner and marriage?",
    "How do you balance traditional values with modern life?",
    "What are your aspirations for family and career?"
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-smooth"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            isCompleted ? 'bg-success text-success-foreground' : 'bg-primary/10 text-primary'
          }`}>
            <Icon name={isCompleted ? "CheckCircle" : "FileText"} size={18} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base">About Me</h3>
            <p className="text-sm text-muted-foreground">Share your story and aspirations</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </div>
      {isExpanded && (
        <div className="p-4 border-t border-border space-y-6">
          {/* Writing Guidelines */}
          <div className="bg-islamic-green/5 border border-islamic-green/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={20} className="text-islamic-green mt-0.5" />
              <div>
                <p className="font-medium text-islamic-green text-sm mb-2">Writing Guidelines</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Be authentic and honest about yourself</li>
                  <li>• Share your values and what matters to you</li>
                  <li>• Mention your goals and aspirations</li>
                  <li>• Keep it respectful and appropriate</li>
                  <li>• Avoid sharing personal contact information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* About Me Text Area */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              About Me <span className="text-error">*</span>
            </label>
            <div className="relative">
              <textarea
                value={formData?.aboutMe}
                onChange={(e) => handleTextChange('aboutMe', e?.target?.value)}
                placeholder="Tell potential matches about yourself, your values, and what you're looking for in a life partner..."
                className="w-full min-h-[120px] p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                maxLength={maxChars}
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {charCount}/{maxChars}
              </div>
            </div>
          </div>

          {/* Life Goals */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Life Goals & Aspirations
            </label>
            <textarea
              value={formData?.lifeGoals}
              onChange={(e) => handleTextChange('lifeGoals', e?.target?.value)}
              placeholder="Share your goals for career, family, personal growth, and how you envision your future..."
              className="w-full min-h-[80px] p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={300}
            />
          </div>

          {/* Hobbies & Interests */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Hobbies & Interests
            </label>
            <textarea
              value={formData?.hobbies}
              onChange={(e) => handleTextChange('hobbies', e?.target?.value)}
              placeholder="What do you enjoy doing in your free time? Sports, reading, cooking, traveling..."
              className="w-full min-h-[80px] p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={200}
            />
          </div>

          {/* Suggested Prompts */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground text-sm">Need inspiration? Try these prompts:</h4>
            <div className="grid grid-cols-1 gap-2">
              {suggestedPrompts?.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const currentText = formData?.aboutMe;
                    const newText = currentText ? `${currentText}\n\n${prompt}` : prompt;
                    if (newText?.length <= maxChars) {
                      handleTextChange('aboutMe', newText);
                    }
                  }}
                  className="text-left p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-smooth"
                >
                  <p className="text-sm text-muted-foreground">{prompt}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Character Count Warning */}
          {charCount > maxChars * 0.9 && (
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <p className="text-sm text-warning">
                  You're approaching the character limit. Consider being more concise.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="px-6">
              Save About Me
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMeSection;