import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FamilyInformationSection = ({ 
  isExpanded = false, 
  onToggle = () => {}, 
  data = {}, 
  onUpdate = () => {},
  isCompleted = false 
}) => {
  const [formData, setFormData] = useState({
    guardianName: data?.guardianName || '',
    guardianRelation: data?.guardianRelation || '',
    guardianContact: data?.guardianContact || '',
    familyValues: data?.familyValues || '',
    culturalBackground: data?.culturalBackground || '',
    familySize: data?.familySize || '',
    parentStatus: data?.parentStatus || '',
    guardianInvolvement: data?.guardianInvolvement || '',
    ...data
  });

  const relationOptions = [
    { value: 'father', label: 'Father' },
    { value: 'mother', label: 'Mother' },
    { value: 'brother', label: 'Brother' },
    { value: 'sister', label: 'Sister' },
    { value: 'uncle', label: 'Uncle' },
    { value: 'aunt', label: 'Aunt' },
    { value: 'other', label: 'Other Family Member' }
  ];

  const valuesOptions = [
    { value: 'traditional', label: 'Traditional Islamic values' },
    { value: 'moderate', label: 'Moderate Islamic approach' },
    { value: 'progressive', label: 'Progressive Islamic thinking' },
    { value: 'cultural', label: 'Strong cultural traditions' },
    { value: 'balanced', label: 'Balance of tradition and modernity' }
  ];

  const backgroundOptions = [
    { value: 'malay', label: 'Malay' },
    { value: 'indian', label: 'Indian Muslim' },
    { value: 'arab', label: 'Arab' },
    { value: 'pakistani', label: 'Pakistani' },
    { value: 'bangladeshi', label: 'Bangladeshi' },
    { value: 'indonesian', label: 'Indonesian' },
    { value: 'mixed', label: 'Mixed heritage' },
    { value: 'other', label: 'Other' }
  ];

  const familySizeOptions = [
    { value: 'small', label: 'Small family (2-4 members)' },
    { value: 'medium', label: 'Medium family (5-7 members)' },
    { value: 'large', label: 'Large family (8+ members)' }
  ];

  const parentStatusOptions = [
    { value: 'both-alive', label: 'Both parents alive' },
    { value: 'father-alive', label: 'Father alive' },
    { value: 'mother-alive', label: 'Mother alive' },
    { value: 'both-passed', label: 'Both parents passed away' }
  ];

  const involvementOptions = [
    { value: 'high', label: 'High - Guardian will be actively involved' },
    { value: 'moderate', label: 'Moderate - Guardian will provide guidance' },
    { value: 'supportive', label: 'Supportive - Guardian will support my decision' },
    { value: 'minimal', label: 'Minimal - I make my own decisions' }
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
            <Icon name={isCompleted ? "CheckCircle" : "Users"} size={18} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base">Family Information</h3>
            <p className="text-sm text-muted-foreground">Guardian details and family background</p>
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
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-primary font-medium">Guardian Information</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your guardian will be able to view and approve potential matches as per Islamic tradition.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Guardian Full Name"
              type="text"
              placeholder="Enter guardian's full name"
              value={formData?.guardianName}
              onChange={(e) => handleInputChange('guardianName', e?.target?.value)}
              required
            />
            
            <Select
              label="Relationship to Guardian"
              options={relationOptions}
              value={formData?.guardianRelation}
              onChange={(value) => handleInputChange('guardianRelation', value)}
              placeholder="Select relationship"
              required
            />
            
            <Input
              label="Guardian Contact Number"
              type="tel"
              placeholder="+65 XXXX XXXX"
              value={formData?.guardianContact}
              onChange={(e) => handleInputChange('guardianContact', e?.target?.value)}
              required
            />
            
            <Select
              label="Guardian Involvement Level"
              options={involvementOptions}
              value={formData?.guardianInvolvement}
              onChange={(value) => handleInputChange('guardianInvolvement', value)}
              placeholder="Select involvement level"
              required
            />
            
            <Select
              label="Family Values"
              options={valuesOptions}
              value={formData?.familyValues}
              onChange={(value) => handleInputChange('familyValues', value)}
              placeholder="Select family values"
              required
            />
            
            <Select
              label="Cultural Background"
              options={backgroundOptions}
              value={formData?.culturalBackground}
              onChange={(value) => handleInputChange('culturalBackground', value)}
              placeholder="Select cultural background"
              required
            />
            
            <Select
              label="Family Size"
              options={familySizeOptions}
              value={formData?.familySize}
              onChange={(value) => handleInputChange('familySize', value)}
              placeholder="Select family size"
            />
            
            <Select
              label="Parent Status"
              options={parentStatusOptions}
              value={formData?.parentStatus}
              onChange={(value) => handleInputChange('parentStatus', value)}
              placeholder="Select parent status"
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="px-6">
              Save Family Information
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyInformationSection;