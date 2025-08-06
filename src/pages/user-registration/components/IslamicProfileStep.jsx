import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const IslamicProfileStep = ({ formData, setFormData, errors, setErrors }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user makes selection
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const maritalStatusOptions = [
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
  ];

  const madhabOptions = [
    { value: 'hanafi', label: 'Hanafi' },
    { value: 'maliki', label: 'Maliki' },
    { value: 'shafii', label: 'Shafi\'i' },
    { value: 'hanbali', label: 'Hanbali' },
    { value: 'no_preference', label: 'No Preference' }
  ];

  const prayerFrequencyOptions = [
    { value: 'five_times', label: 'Five times daily' },
    { value: 'regularly', label: 'Regularly' },
    { value: 'sometimes', label: 'Sometimes' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'prefer_not_say', label: 'Prefer not to say' }
  ];

  const hijabOptions = [
    { value: 'always', label: 'Always' },
    { value: 'usually', label: 'Usually' },
    { value: 'sometimes', label: 'Sometimes' },
    { value: 'no', label: 'No' },
    { value: 'not_applicable', label: 'Not Applicable' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Islamic Profile
        </h2>
        <p className="text-muted-foreground font-caption">
          Help us understand your Islamic background
        </p>
      </div>
      <Select
        label="Marital Status"
        description="Your current marital status"
        options={maritalStatusOptions}
        value={formData?.maritalStatus}
        onChange={(value) => handleInputChange('maritalStatus', value)}
        error={errors?.maritalStatus}
        required
        className="mb-4"
      />
      <Select
        label="Madhab Preference"
        description="Your preferred Islamic school of thought"
        options={madhabOptions}
        value={formData?.madhab}
        onChange={(value) => handleInputChange('madhab', value)}
        error={errors?.madhab}
        className="mb-4"
      />
      <Select
        label="Prayer Frequency"
        description="How often do you pray?"
        options={prayerFrequencyOptions}
        value={formData?.prayerFrequency}
        onChange={(value) => handleInputChange('prayerFrequency', value)}
        error={errors?.prayerFrequency}
        required
        className="mb-4"
      />
      <Select
        label="Hijab Observance"
        description="For sisters: Do you wear hijab?"
        options={hijabOptions}
        value={formData?.hijabObservance}
        onChange={(value) => handleInputChange('hijabObservance', value)}
        error={errors?.hijabObservance}
        className="mb-6"
      />
      {/* Islamic Compliance Checkboxes */}
      <div className="space-y-4 p-4 bg-islamic-green/5 rounded-lg border border-islamic-green/20">
        <h3 className="font-heading font-medium text-foreground mb-3">
          Islamic Compliance Confirmation
        </h3>
        
        <Checkbox
          label="I confirm that I am seeking marriage in accordance with Islamic principles"
          checked={formData?.islamicCompliance}
          onChange={(e) => handleInputChange('islamicCompliance', e?.target?.checked)}
          error={errors?.islamicCompliance}
          required
        />

        <Checkbox
          label="I understand that this platform follows Shariah-compliant guidelines for matrimonial purposes"
          checked={formData?.shariahAcknowledgment}
          onChange={(e) => handleInputChange('shariahAcknowledgment', e?.target?.checked)}
          error={errors?.shariahAcknowledgment}
          required
        />

        <Checkbox
          label="I commit to maintaining Islamic etiquette in all interactions on this platform"
          checked={formData?.islamicEtiquette}
          onChange={(e) => handleInputChange('islamicEtiquette', e?.target?.checked)}
          error={errors?.islamicEtiquette}
          required
        />
      </div>
    </div>
  );
};

export default IslamicProfileStep;