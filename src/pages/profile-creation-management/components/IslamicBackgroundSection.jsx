import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const IslamicBackgroundSection = ({ 
  isExpanded = false, 
  onToggle = () => {}, 
  data = {}, 
  onUpdate = () => {},
  isCompleted = false 
}) => {
  const [formData, setFormData] = useState({
    madhab: data?.madhab || '',
    prayerFrequency: data?.prayerFrequency || '',
    quranKnowledge: data?.quranKnowledge || '',
    hijabObservance: data?.hijabObservance || '',
    islamicEducation: data?.islamicEducation || '',
    religiousCommitment: data?.religiousCommitment || '',
    halaalDiet: data?.halaalDiet || false,
    ...data
  });

  const madhabOptions = [
    { value: 'hanafi', label: 'Hanafi' },
    { value: 'maliki', label: 'Maliki' },
    { value: 'shafii', label: 'Shafi\'i' },
    { value: 'hanbali', label: 'Hanbali' },
    { value: 'other', label: 'Other' }
  ];

  const prayerOptions = [
    { value: 'always', label: 'Always (5 times daily)' },
    { value: 'mostly', label: 'Mostly (4-5 times daily)' },
    { value: 'sometimes', label: 'Sometimes (2-3 times daily)' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'learning', label: 'Learning to pray regularly' }
  ];

  const quranOptions = [
    { value: 'fluent', label: 'Fluent reader and understands Arabic' },
    { value: 'reader', label: 'Can read Arabic but limited understanding' },
    { value: 'learning', label: 'Learning to read Arabic' },
    { value: 'beginner', label: 'Beginner level' },
    { value: 'translation', label: 'Reads translation only' }
  ];

  const hijabOptions = [
    { value: 'always', label: 'Always wears hijab' },
    { value: 'mostly', label: 'Wears hijab most of the time' },
    { value: 'sometimes', label: 'Wears hijab sometimes' },
    { value: 'planning', label: 'Planning to start wearing hijab' },
    { value: 'not-applicable', label: 'Not applicable (male)' }
  ];

  const educationOptions = [
    { value: 'madrasah', label: 'Madrasah education' },
    { value: 'islamic-studies', label: 'Islamic studies degree' },
    { value: 'weekend-school', label: 'Weekend Islamic school' },
    { value: 'self-taught', label: 'Self-taught' },
    { value: 'basic', label: 'Basic Islamic knowledge' }
  ];

  const commitmentOptions = [
    { value: 'very-high', label: 'Very High - Islam is central to my life' },
    { value: 'high', label: 'High - Practice most Islamic teachings' },
    { value: 'moderate', label: 'Moderate - Follow basic Islamic principles' },
    { value: 'learning', label: 'Learning - Growing in my faith' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleSave = () => {
    onUpdate(formData);
  };

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
            <Icon name={isCompleted ? "CheckCircle" : "Moon"} size={18} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base">Islamic Background</h3>
            <p className="text-sm text-muted-foreground">Your religious practice and beliefs</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </div>
      {isExpanded && (
        <div className="p-4 border-t border-border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Madhab (School of Thought)"
              options={madhabOptions}
              value={formData?.madhab}
              onChange={(value) => handleInputChange('madhab', value)}
              placeholder="Select your madhab"
              required
            />
            
            <Select
              label="Prayer Frequency"
              options={prayerOptions}
              value={formData?.prayerFrequency}
              onChange={(value) => handleInputChange('prayerFrequency', value)}
              placeholder="Select prayer frequency"
              required
            />
            
            <Select
              label="Quran Knowledge"
              options={quranOptions}
              value={formData?.quranKnowledge}
              onChange={(value) => handleInputChange('quranKnowledge', value)}
              placeholder="Select your Quran knowledge level"
              required
            />
            
            <Select
              label="Hijab Observance"
              options={hijabOptions}
              value={formData?.hijabObservance}
              onChange={(value) => handleInputChange('hijabObservance', value)}
              placeholder="Select hijab observance"
              required
            />
            
            <Select
              label="Islamic Education"
              options={educationOptions}
              value={formData?.islamicEducation}
              onChange={(value) => handleInputChange('islamicEducation', value)}
              placeholder="Select Islamic education background"
            />
            
            <Select
              label="Religious Commitment Level"
              options={commitmentOptions}
              value={formData?.religiousCommitment}
              onChange={(value) => handleInputChange('religiousCommitment', value)}
              placeholder="Select commitment level"
              required
            />
          </div>
          
          <div className="pt-2">
            <Checkbox
              label="I follow a strict Halaal diet"
              description="I ensure all food and drinks are Halaal certified"
              checked={formData?.halaalDiet}
              onChange={(e) => handleInputChange('halaalDiet', e?.target?.checked)}
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="px-6">
              Save Islamic Background
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IslamicBackgroundSection;