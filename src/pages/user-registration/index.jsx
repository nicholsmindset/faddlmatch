import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import BasicInfoStep from './components/BasicInfoStep';
import IslamicProfileStep from './components/IslamicProfileStep';
import FamilyInvolvementStep from './components/FamilyInvolvementStep';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import SuccessMessage from './components/SuccessMessage';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

const UserRegistration = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    // Basic Info
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Islamic Profile
    maritalStatus: '',
    madhab: '',
    prayerFrequency: '',
    hijabObservance: '',
    islamicCompliance: false,
    shariahAcknowledgment: false,
    islamicEtiquette: false,
    
    // Family Involvement
    guardianName: '',
    guardianRelationship: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianInformed: false,
    guardianConsent: false,
    familyInvolvementAcknowledgment: false,
    
    // Terms & Privacy
    termsAccepted: false,
    privacyAccepted: false,
    communicationConsent: false,
    ageVerification: false
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Basic Info
        if (!formData?.fullName?.trim()) newErrors.fullName = 'Full name is required';
        if (!formData?.email?.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/?.test(formData?.email)) newErrors.email = 'Invalid email format';
        if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^\d{4}\s\d{4}$/?.test(formData?.phone)) newErrors.phone = 'Invalid Singapore phone format';
        if (!formData?.password) newErrors.password = 'Password is required';
        else if (formData?.password?.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData?.password !== formData?.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;

      case 2: // Islamic Profile
        if (!formData?.maritalStatus) newErrors.maritalStatus = 'Marital status is required';
        if (!formData?.prayerFrequency) newErrors.prayerFrequency = 'Prayer frequency is required';
        if (!formData?.islamicCompliance) newErrors.islamicCompliance = 'Islamic compliance confirmation is required';
        if (!formData?.shariahAcknowledgment) newErrors.shariahAcknowledgment = 'Shariah acknowledgment is required';
        if (!formData?.islamicEtiquette) newErrors.islamicEtiquette = 'Islamic etiquette commitment is required';
        break;

      case 3: // Family Involvement
        if (!formData?.guardianName?.trim()) newErrors.guardianName = 'Guardian name is required';
        if (!formData?.guardianRelationship) newErrors.guardianRelationship = 'Guardian relationship is required';
        if (!formData?.guardianEmail?.trim()) newErrors.guardianEmail = 'Guardian email is required';
        else if (!/\S+@\S+\.\S+/?.test(formData?.guardianEmail)) newErrors.guardianEmail = 'Invalid email format';
        if (!formData?.guardianPhone?.trim()) newErrors.guardianPhone = 'Guardian phone is required';
        if (!formData?.guardianInformed) newErrors.guardianInformed = 'Guardian must be informed';
        if (!formData?.guardianConsent) newErrors.guardianConsent = 'Guardian consent is required';
        if (!formData?.familyInvolvementAcknowledgment) newErrors.familyInvolvementAcknowledgment = 'Family involvement acknowledgment is required';
        break;

      case 4: // Terms & Privacy
        if (!formData?.termsAccepted) newErrors.termsAccepted = 'You must accept the Terms of Service';
        if (!formData?.privacyAccepted) newErrors.privacyAccepted = 'You must accept the Privacy Policy';
        if (!formData?.communicationConsent) newErrors.communicationConsent = 'Communication consent is required';
        if (!formData?.ageVerification) newErrors.ageVerification = 'Age verification is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final submission - Register with Supabase
      setIsLoading(true);
      
      try {
        // Sign up with Supabase Auth
        const { data: authData, error: authError } = await signUp(
          formData?.email,
          formData?.password,
          {
            full_name: formData?.fullName,
            phone: formData?.phone
          }
        );

        if (authError) {
          throw new Error(authError?.message);
        }

        // Create user profile in Supabase
        const { data: profileData, error: profileError } = await supabase
          ?.from('user_profiles')
          ?.insert({
            id: authData?.user?.id,
            full_name: formData?.fullName,
            email: formData?.email,
            phone: formData?.phone,
            marital_status: formData?.maritalStatus,
            madhab: formData?.madhab,
            prayer_frequency: formData?.prayerFrequency,
            hijab_observance: formData?.hijabObservance,
            guardian_name: formData?.guardianName,
            guardian_relationship: formData?.guardianRelationship,
            guardian_email: formData?.guardianEmail,
            guardian_phone: formData?.guardianPhone,
            terms_accepted: formData?.termsAccepted,
            privacy_accepted: formData?.privacyAccepted,
            communication_consent: formData?.communicationConsent,
            age_verified: formData?.ageVerification,
            profile_completion: 25, // Basic registration complete
            subscription_tier: 'intention', // Default free tier
            created_at: new Date()?.toISOString(),
            updated_at: new Date()?.toISOString()
          })
          ?.select()
          ?.single();

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Don't throw error for profile creation failure, user is still registered
        }

        setRegisteredUser({
          id: authData?.user?.id,
          full_name: formData?.fullName,
          email: formData?.email
        });
        
        setIsSubmitted(true);
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ submit: error?.message || 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCompletionContinue = () => {
    // Redirect to Stripe payment page for subscription selection
    navigate('/stripe-payment-integration?tier=patience');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/user-login');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 2:
        return (
          <IslamicProfileStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 3:
        return (
          <FamilyInvolvementStep
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 4:
        return (
          <TermsAndPrivacy
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background islamic-pattern">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <SuccessMessage 
              userData={registeredUser}
              onContinue={handleCompletionContinue}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
                  <path d="M12 8L12.5 10.5L15 11L12.5 11.5L12 14L11.5 11.5L9 11L11.5 10.5L12 8Z" />
                </svg>
              </div>
              <span className="font-heading font-semibold text-lg text-foreground">
                FADDLmatch
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('/help', '_blank')}
                iconName="HelpCircle"
                iconPosition="left"
              >
                Help
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLoginRedirect}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-lg shadow-elevation-2 p-6 border border-border">
            {/* Progress Indicator */}
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

            {/* Step Content */}
            <form onSubmit={(e) => e?.preventDefault()}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back
                </Button>

                <Button
                  variant="default"
                  onClick={handleNext}
                  loading={isLoading}
                  iconName={currentStep === totalSteps ? "Check" : "ArrowRight"}
                  iconPosition="right"
                >
                  {currentStep === totalSteps ? 'Complete Registration' : 'Continue'}
                </Button>
              </div>

              {/* Error Message */}
              {errors?.submit && (
                <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertCircle" size={16} className="text-error" />
                    <span className="text-sm text-error">{errors?.submit}</span>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground font-caption">
              Already have an account?{' '}
              <button
                onClick={handleLoginRedirect}
                className="text-primary hover:underline font-medium"
              >
                Sign in here
              </button>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-islamic-green" />
              <span className="text-xs text-muted-foreground">Shariah Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={16} className="text-trust-blue" />
              <span className="text-xs text-muted-foreground">Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-premium-purple" />
              <span className="text-xs text-muted-foreground">Singapore Based</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;