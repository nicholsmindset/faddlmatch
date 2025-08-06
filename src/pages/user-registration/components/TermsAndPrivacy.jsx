import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TermsAndPrivacy = ({ formData, setFormData, errors, setErrors }) => {
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user makes selection
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Terms & Privacy
        </h2>
        <p className="text-muted-foreground font-caption">
          Please review and accept our terms to complete registration
        </p>
      </div>
      {/* Islamic Certification Badge */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3 p-4 bg-islamic-green/10 rounded-lg border border-islamic-green/20">
          <div className="w-10 h-10 bg-islamic-green/20 rounded-full flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-islamic-green" />
          </div>
          <div>
            <h3 className="font-medium text-islamic-green">Shariah Compliant Platform</h3>
            <p className="text-xs text-muted-foreground">Verified by Islamic scholars</p>
          </div>
        </div>
      </div>
      {/* Terms and Conditions */}
      <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
        <h3 className="font-heading font-medium text-foreground mb-3">
          Legal Agreements
        </h3>
        
        <Checkbox
          label={
            <span>
              I have read and agree to the{' '}
              <button 
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => window.open('/terms-of-service', '_blank')}
              >
                Terms of Service
              </button>
            </span>
          }
          checked={formData?.termsAccepted}
          onChange={(e) => handleInputChange('termsAccepted', e?.target?.checked)}
          error={errors?.termsAccepted}
          required
        />

        <Checkbox
          label={
            <span>
              I have read and agree to the{' '}
              <button 
                type="button"
                className="text-primary hover:underline font-medium"
                onClick={() => window.open('/privacy-policy', '_blank')}
              >
                Privacy Policy
              </button>
            </span>
          }
          checked={formData?.privacyAccepted}
          onChange={(e) => handleInputChange('privacyAccepted', e?.target?.checked)}
          error={errors?.privacyAccepted}
          required
        />

        <Checkbox
          label="I consent to receive important updates and match notifications via email and SMS"
          checked={formData?.communicationConsent}
          onChange={(e) => handleInputChange('communicationConsent', e?.target?.checked)}
          error={errors?.communicationConsent}
          required
        />
      </div>
      {/* Data Protection Notice */}
      <div className="p-4 bg-trust-blue/5 rounded-lg border border-trust-blue/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={18} className="text-trust-blue mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Your Privacy Matters</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your personal information is encrypted and secure</li>
              <li>• Photos are blurred until premium access is granted</li>
              <li>• Family involvement ensures additional safety</li>
              <li>• Singapore data protection laws apply</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Age Verification */}
      <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
        <Checkbox
          label="I confirm that I am at least 21 years old (Singapore legal marriage age)"
          checked={formData?.ageVerification}
          onChange={(e) => handleInputChange('ageVerification', e?.target?.checked)}
          error={errors?.ageVerification}
          required
        />
      </div>
    </div>
  );
};

export default TermsAndPrivacy;