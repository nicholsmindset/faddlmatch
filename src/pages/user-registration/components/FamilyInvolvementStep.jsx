import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FamilyInvolvementStep = ({ formData, setFormData, errors, setErrors }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const relationshipOptions = [
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'relative', label: 'Relative' },
    { value: 'family_friend', label: 'Family Friend' },
    { value: 'imam', label: 'Imam/Religious Leader' }
  ];

  const formatPhoneNumber = (value) => {
    // Singapore phone number formatting
    const cleaned = value?.replace(/\D/g, '');
    if (cleaned?.length <= 8) {
      return cleaned?.replace(/(\d{4})(\d{4})/, '$1 $2');
    }
    return cleaned?.replace(/(\d{4})(\d{4})(\d+)/, '$1 $2 $3');
  };

  const handleGuardianPhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    handleInputChange('guardianPhone', formatted);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Family Involvement
        </h2>
        <p className="text-muted-foreground font-caption">
          Islamic tradition values family guidance in marriage decisions
        </p>
      </div>
      <div className="p-4 bg-trust-blue/5 rounded-lg border border-trust-blue/20 mb-6">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-trust-blue/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-trust-blue rounded-full" />
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-1">Why Family Involvement?</h3>
            <p className="text-sm text-muted-foreground">
              In Islamic tradition, family guidance helps ensure compatibility and provides support throughout the matrimonial process. Your guardian will receive notifications about potential matches and can provide valuable input.
            </p>
          </div>
        </div>
      </div>
      <Input
        label="Guardian/Wali Name"
        type="text"
        placeholder="Enter guardian's full name"
        value={formData?.guardianName}
        onChange={(e) => handleInputChange('guardianName', e?.target?.value)}
        error={errors?.guardianName}
        description="Person who will oversee your matrimonial process"
        required
        className="mb-4"
      />
      <Select
        label="Relationship to Guardian"
        description="How is this person related to you?"
        options={relationshipOptions}
        value={formData?.guardianRelationship}
        onChange={(value) => handleInputChange('guardianRelationship', value)}
        error={errors?.guardianRelationship}
        required
        className="mb-4"
      />
      <Input
        label="Guardian Email"
        type="email"
        placeholder="guardian@example.com"
        value={formData?.guardianEmail}
        onChange={(e) => handleInputChange('guardianEmail', e?.target?.value)}
        error={errors?.guardianEmail}
        description="Guardian will receive match notifications here"
        required
        className="mb-4"
      />
      <div className="relative">
        <Input
          label="Guardian Phone Number"
          type="tel"
          placeholder="9123 4567"
          value={formData?.guardianPhone}
          onChange={handleGuardianPhoneChange}
          error={errors?.guardianPhone}
          description="Singapore mobile number for important updates"
          required
          className="mb-6"
        />
        <div className="absolute left-3 top-9 flex items-center text-muted-foreground">
          <span className="text-sm">+65</span>
        </div>
      </div>
      {/* Family Consent Checkboxes */}
      <div className="space-y-4 p-4 bg-premium-purple/5 rounded-lg border border-premium-purple/20">
        <h3 className="font-heading font-medium text-foreground mb-3">
          Family Consent & Involvement
        </h3>
        
        <Checkbox
          label="I have informed my guardian/wali about my intention to use this matrimonial platform"
          checked={formData?.guardianInformed}
          onChange={(e) => handleInputChange('guardianInformed', e?.target?.checked)}
          error={errors?.guardianInformed}
          required
        />

        <Checkbox
          label="My guardian/wali consents to receive notifications about potential matches"
          checked={formData?.guardianConsent}
          onChange={(e) => handleInputChange('guardianConsent', e?.target?.checked)}
          error={errors?.guardianConsent}
          required
        />

        <Checkbox
          label="I understand that family involvement is encouraged in the Islamic matrimonial process"
          checked={formData?.familyInvolvementAcknowledgment}
          onChange={(e) => handleInputChange('familyInvolvementAcknowledgment', e?.target?.checked)}
          error={errors?.familyInvolvementAcknowledgment}
          required
        />
      </div>
    </div>
  );
};

export default FamilyInvolvementStep;