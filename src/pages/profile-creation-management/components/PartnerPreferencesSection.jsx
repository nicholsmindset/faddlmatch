import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PartnerPreferencesSection = ({ 
  isExpanded = false, 
  onToggle = () => {}, 
  data = {}, 
  onUpdate = () => {},
  isCompleted = false 
}) => {
  const [formData, setFormData] = useState({
    ageRangeMin: data?.ageRangeMin || '',
    ageRangeMax: data?.ageRangeMax || '',
    educationLevel: data?.educationLevel || '',
    religiousCommitment: data?.religiousCommitment || '',
    maritalStatus: data?.maritalStatus || '',
    childrenAcceptance: data?.childrenAcceptance || '',
    locationPreference: data?.locationPreference || '',
    professionPreference: data?.professionPreference || '',
    madhab: data?.madhab || '',
    hijabPreference: data?.hijabPreference || '',
    smokingAcceptance: data?.smokingAcceptance || false,
    ...data
  });

  const educationOptions = [
    { value: 'any', label: 'Any education level' },
    { value: 'secondary', label: 'Secondary education or higher' },
    { value: 'diploma', label: 'Diploma or higher' },
    { value: 'bachelor', label: 'Bachelor\'s degree or higher' },
    { value: 'master', label: 'Master\'s degree or higher' },
    { value: 'phd', label: 'PhD preferred' }
  ];

  const commitmentOptions = [
    { value: 'any', label: 'Any level of commitment' },
    { value: 'learning', label: 'Learning and growing in faith' },
    { value: 'moderate', label: 'Moderate religious practice' },
    { value: 'high', label: 'High religious commitment' },
    { value: 'very-high', label: 'Very high religious commitment' }
  ];

  const maritalStatusOptions = [
    { value: 'any', label: 'Any marital status' },
    { value: 'divorced', label: 'Divorced only' },
    { value: 'widowed', label: 'Widowed only' },
    { value: 'both', label: 'Divorced or widowed' }
  ];

  const childrenOptions = [
    { value: 'any', label: 'Open to any situation' },
    { value: 'none', label: 'No children preferred' },
    { value: 'few', label: 'Few children acceptable (1-2)' },
    { value: 'many', label: 'Many children acceptable (3+)' }
  ];

  const locationOptions = [
    { value: 'any', label: 'Anywhere in Singapore' },
    { value: 'central', label: 'Central Singapore' },
    { value: 'north', label: 'North Singapore' },
    { value: 'south', label: 'South Singapore' },
    { value: 'east', label: 'East Singapore' },
    { value: 'west', label: 'West Singapore' }
  ];

  const professionOptions = [
    { value: 'any', label: 'Any profession' },
    { value: 'professional', label: 'Professional/White collar' },
    { value: 'business', label: 'Business owner' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'government', label: 'Government service' }
  ];

  const madhabOptions = [
    { value: 'any', label: 'Any madhab' },
    { value: 'same', label: 'Same as mine' },
    { value: 'hanafi', label: 'Hanafi' },
    { value: 'maliki', label: 'Maliki' },
    { value: 'shafii', label: 'Shafi\'i' },
    { value: 'hanbali', label: 'Hanbali' }
  ];

  const hijabOptions = [
    { value: 'any', label: 'Any preference' },
    { value: 'always', label: 'Always wears hijab' },
    { value: 'mostly', label: 'Wears hijab most of the time' },
    { value: 'flexible', label: 'Flexible about hijab' },
    { value: 'not-applicable', label: 'Not applicable (seeking male)' }
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
            <Icon name={isCompleted ? "CheckCircle" : "Heart"} size={18} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base">Partner Preferences</h3>
            <p className="text-sm text-muted-foreground">What you're looking for in a life partner</p>
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
          <div className="bg-islamic-green/5 border border-islamic-green/20 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <Icon name="Heart" size={16} className="text-islamic-green mt-0.5" />
              <div>
                <p className="text-sm text-islamic-green font-medium">Partner Preferences</p>
                <p className="text-xs text-muted-foreground mt-1">
                  These preferences help us find compatible matches. You can always adjust them later.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Age Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Minimum Age"
                  type="number"
                  placeholder="Min age"
                  value={formData?.ageRangeMin}
                  onChange={(e) => handleInputChange('ageRangeMin', e?.target?.value)}
                  min="18"
                  max="80"
                />
                <Input
                  label="Maximum Age"
                  type="number"
                  placeholder="Max age"
                  value={formData?.ageRangeMax}
                  onChange={(e) => handleInputChange('ageRangeMax', e?.target?.value)}
                  min="18"
                  max="80"
                />
              </div>
            </div>
            
            <Select
              label="Education Level"
              options={educationOptions}
              value={formData?.educationLevel}
              onChange={(value) => handleInputChange('educationLevel', value)}
              placeholder="Select education preference"
            />
            
            <Select
              label="Religious Commitment"
              options={commitmentOptions}
              value={formData?.religiousCommitment}
              onChange={(value) => handleInputChange('religiousCommitment', value)}
              placeholder="Select commitment level"
            />
            
            <Select
              label="Marital Status"
              options={maritalStatusOptions}
              value={formData?.maritalStatus}
              onChange={(value) => handleInputChange('maritalStatus', value)}
              placeholder="Select marital status"
            />
            
            <Select
              label="Children Acceptance"
              options={childrenOptions}
              value={formData?.childrenAcceptance}
              onChange={(value) => handleInputChange('childrenAcceptance', value)}
              placeholder="Select children preference"
            />
            
            <Select
              label="Location Preference"
              options={locationOptions}
              value={formData?.locationPreference}
              onChange={(value) => handleInputChange('locationPreference', value)}
              placeholder="Select location preference"
            />
            
            <Select
              label="Profession Preference"
              options={professionOptions}
              value={formData?.professionPreference}
              onChange={(value) => handleInputChange('professionPreference', value)}
              placeholder="Select profession preference"
            />
            
            <Select
              label="Madhab Preference"
              options={madhabOptions}
              value={formData?.madhab}
              onChange={(value) => handleInputChange('madhab', value)}
              placeholder="Select madhab preference"
            />
            
            <Select
              label="Hijab Preference"
              options={hijabOptions}
              value={formData?.hijabPreference}
              onChange={(value) => handleInputChange('hijabPreference', value)}
              placeholder="Select hijab preference"
            />
          </div>
          
          <div className="pt-2">
            <Checkbox
              label="Open to partner who smokes occasionally"
              description="I am flexible about smoking habits"
              checked={formData?.smokingAcceptance}
              onChange={(e) => handleInputChange('smokingAcceptance', e?.target?.checked)}
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="px-6">
              Save Partner Preferences
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerPreferencesSection;