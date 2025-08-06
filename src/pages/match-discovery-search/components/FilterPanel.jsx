import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, setFilters, userTier = 'intention' }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const ageOptions = Array.from({ length: 36 }, (_, i) => ({
    value: (i + 18)?.toString(),
    label: `${i + 18} years`
  }));

  const locationOptions = [
    { value: '5', label: 'Within 5 km' },
    { value: '10', label: 'Within 10 km' },
    { value: '25', label: 'Within 25 km' },
    { value: '50', label: 'Within 50 km' },
    { value: 'anywhere', label: 'Anywhere in Singapore' }
  ];

  const educationOptions = [
    { value: 'secondary', label: 'Secondary Education' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' }
  ];

  const professionOptions = [
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business' },
    { value: 'finance', label: 'Finance' },
    { value: 'technology', label: 'Technology' },
    { value: 'government', label: 'Government' },
    { value: 'other', label: 'Other' }
  ];

  const madhabOptions = [
    { value: 'hanafi', label: 'Hanafi' },
    { value: 'maliki', label: 'Maliki' },
    { value: 'shafii', label: 'Shafi\'i' },
    { value: 'hanbali', label: 'Hanbali' },
    { value: 'any', label: 'Any Madhab' }
  ];

  const practiceOptions = [
    { value: 'very_religious', label: 'Very Religious' },
    { value: 'religious', label: 'Religious' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'liberal', label: 'Liberal' }
  ];

  // Premium filters
  const familyBackgroundOptions = [
    { value: 'traditional', label: 'Traditional' },
    { value: 'modern', label: 'Modern' },
    { value: 'mixed', label: 'Mixed' }
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const resetFilters = () => {
    const resetFilters = {
      ageMin: '',
      ageMax: '',
      location: '',
      education: '',
      profession: '',
      madhab: '',
      practice: '',
      hasChildren: false,
      familyBackground: '',
      specificRequirements: ''
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  const isPremiumFeature = (feature) => {
    if (userTier === 'reliance') return false;
    return ['familyBackground', 'specificRequirements']?.includes(feature);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Filter Panel */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-card border-r border-border
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-semibold text-lg">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Filter Content */}
        <div className="p-4 space-y-6">
          {/* Age Range */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Age Range</h3>
            <div className="grid grid-cols-2 gap-3">
              <Select
                placeholder="Min age"
                options={ageOptions}
                value={localFilters?.ageMin}
                onChange={(value) => handleFilterChange('ageMin', value)}
              />
              <Select
                placeholder="Max age"
                options={ageOptions}
                value={localFilters?.ageMax}
                onChange={(value) => handleFilterChange('ageMax', value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Location</h3>
            <Select
              placeholder="Select distance"
              options={locationOptions}
              value={localFilters?.location}
              onChange={(value) => handleFilterChange('location', value)}
            />
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Education Level</h3>
            <Select
              placeholder="Select education"
              options={educationOptions}
              value={localFilters?.education}
              onChange={(value) => handleFilterChange('education', value)}
            />
          </div>

          {/* Profession */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Profession</h3>
            <Select
              placeholder="Select profession"
              options={professionOptions}
              value={localFilters?.profession}
              onChange={(value) => handleFilterChange('profession', value)}
            />
          </div>

          {/* Madhab */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Madhab Preference</h3>
            <Select
              placeholder="Select madhab"
              options={madhabOptions}
              value={localFilters?.madhab}
              onChange={(value) => handleFilterChange('madhab', value)}
            />
          </div>

          {/* Islamic Practice Level */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Islamic Practice</h3>
            <Select
              placeholder="Select practice level"
              options={practiceOptions}
              value={localFilters?.practice}
              onChange={(value) => handleFilterChange('practice', value)}
            />
          </div>

          {/* Has Children */}
          <div className="space-y-3">
            <Checkbox
              label="Open to partners with children"
              checked={localFilters?.hasChildren}
              onChange={(e) => handleFilterChange('hasChildren', e?.target?.checked)}
            />
          </div>

          {/* Premium Filters */}
          {userTier !== 'intention' && (
            <>
              <div className="border-t border-border pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Crown" size={16} className="text-premium-purple" />
                  <h3 className="font-medium text-sm text-premium-purple">Premium Filters</h3>
                </div>

                {/* Family Background */}
                <div className="space-y-3 mb-4">
                  <h4 className="font-medium text-sm text-foreground">Family Background</h4>
                  <Select
                    placeholder="Select background"
                    options={familyBackgroundOptions}
                    value={localFilters?.familyBackground}
                    onChange={(value) => handleFilterChange('familyBackground', value)}
                    disabled={isPremiumFeature('familyBackground')}
                  />
                </div>

                {/* Specific Requirements */}
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-foreground">Specific Requirements</h4>
                  <Input
                    type="text"
                    placeholder="e.g., Must speak Arabic, Hafiz preferred..."
                    value={localFilters?.specificRequirements}
                    onChange={(e) => handleFilterChange('specificRequirements', e?.target?.value)}
                    disabled={isPremiumFeature('specificRequirements')}
                  />
                </div>
              </div>
            </>
          )}

          {/* Upgrade Prompt for Free Users */}
          {userTier === 'intention' && (
            <div className="bg-premium-purple/10 border border-premium-purple/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Crown" size={16} className="text-premium-purple" />
                <h4 className="font-medium text-sm text-premium-purple">Unlock Advanced Filters</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Get access to family background filters and specific requirements with our premium plans.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
              >
                Upgrade Now
              </Button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4 space-y-2">
          <Button
            variant="default"
            onClick={applyFilters}
            className="w-full"
          >
            Apply Filters
          </Button>
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="w-full"
          >
            Reset All
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;