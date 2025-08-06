import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PersonalDetailsSection = ({ 
  isExpanded = false, 
  onToggle = () => {}, 
  data = {}, 
  onUpdate = () => {},
  isCompleted = false 
}) => {
  const [formData, setFormData] = useState({
    fullName: data?.fullName || '',
    age: data?.age || '',
    location: data?.location || '',
    profession: data?.profession || '',
    education: data?.education || '',
    height: data?.height || '',
    maritalStatus: data?.maritalStatus || '',
    children: data?.children || '',
    ...data
  });

  const locationOptions = [
    { value: 'central', label: 'Central Singapore' },
    { value: 'north', label: 'North Singapore' },
    { value: 'south', label: 'South Singapore' },
    { value: 'east', label: 'East Singapore' },
    { value: 'west', label: 'West Singapore' }
  ];

  const educationOptions = [
    { value: 'secondary', label: 'Secondary Education' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'other', label: 'Other' }
  ];

  const maritalStatusOptions = [
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
  ];

  const childrenOptions = [
    { value: 'none', label: 'No children' },
    { value: '1', label: '1 child' },
    { value: '2', label: '2 children' },
    { value: '3', label: '3 children' },
    { value: '4+', label: '4+ children' }
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
            <Icon name={isCompleted ? "CheckCircle" : "User"} size={18} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base">Personal Details</h3>
            <p className="text-sm text-muted-foreground">Basic information about yourself</p>
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
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              value={formData?.fullName}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              required
            />
            
            <Input
              label="Age"
              type="number"
              placeholder="Enter your age"
              value={formData?.age}
              onChange={(e) => handleInputChange('age', e?.target?.value)}
              min="18"
              max="80"
              required
            />
            
            <Select
              label="Location in Singapore"
              options={locationOptions}
              value={formData?.location}
              onChange={(value) => handleInputChange('location', value)}
              placeholder="Select your location"
              required
            />
            
            <Input
              label="Profession"
              type="text"
              placeholder="Enter your profession"
              value={formData?.profession}
              onChange={(e) => handleInputChange('profession', e?.target?.value)}
              required
            />
            
            <Select
              label="Education Level"
              options={educationOptions}
              value={formData?.education}
              onChange={(value) => handleInputChange('education', value)}
              placeholder="Select education level"
              required
            />
            
            <Input
              label="Height (cm)"
              type="number"
              placeholder="Enter height in cm"
              value={formData?.height}
              onChange={(e) => handleInputChange('height', e?.target?.value)}
              min="140"
              max="220"
            />
            
            <Select
              label="Marital Status"
              options={maritalStatusOptions}
              value={formData?.maritalStatus}
              onChange={(value) => handleInputChange('maritalStatus', value)}
              placeholder="Select marital status"
              required
            />
            
            <Select
              label="Children"
              options={childrenOptions}
              value={formData?.children}
              onChange={(value) => handleInputChange('children', value)}
              placeholder="Select number of children"
              required
            />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="px-6">
              Save Personal Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetailsSection;