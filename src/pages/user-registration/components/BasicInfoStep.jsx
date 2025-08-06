import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BasicInfoStep = ({ formData, setFormData, errors, setErrors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Password strength calculation
    if (field === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-error';
    if (passwordStrength < 75) return 'bg-warning';
    return 'bg-success';
  };

  const getStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const formatPhoneNumber = (value) => {
    // Singapore phone number formatting
    const cleaned = value?.replace(/\D/g, '');
    if (cleaned?.length <= 8) {
      return cleaned?.replace(/(\d{4})(\d{4})/, '$1 $2');
    }
    return cleaned?.replace(/(\d{4})(\d{4})(\d+)/, '$1 $2 $3');
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    handleInputChange('phone', formatted);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
          Basic Information
        </h2>
        <p className="text-muted-foreground font-caption">
          Let's start with your basic details
        </p>
      </div>
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData?.fullName}
        onChange={(e) => handleInputChange('fullName', e?.target?.value)}
        error={errors?.fullName}
        required
        className="mb-4"
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="your.email@example.com"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={errors?.email}
        description="We'll use this for account verification"
        required
        className="mb-4"
      />
      <div className="relative">
        <Input
          label="Phone Number"
          type="tel"
          placeholder="9123 4567"
          value={formData?.phone}
          onChange={handlePhoneChange}
          error={errors?.phone}
          description="Singapore mobile number"
          required
          className="mb-4"
        />
        <div className="absolute left-3 top-9 flex items-center text-muted-foreground">
          <span className="text-sm">+65</span>
        </div>
        <div className="pl-10">
          <Input
            type="tel"
            placeholder="9123 4567"
            value={formData?.phone}
            onChange={handlePhoneChange}
            className="pl-0"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a secure password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
            className="mb-2"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>
        
        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Password Strength</span>
              <span className={`font-medium ${passwordStrength >= 75 ? 'text-success' : passwordStrength >= 50 ? 'text-warning' : 'text-error'}`}>
                {getStrengthText()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground space-y-1">
              <p className={formData?.password?.length >= 8 ? 'text-success' : 'text-muted-foreground'}>
                • At least 8 characters
              </p>
              <p className={/[A-Z]/?.test(formData?.password) ? 'text-success' : 'text-muted-foreground'}>
                • One uppercase letter
              </p>
              <p className={/[0-9]/?.test(formData?.password) ? 'text-success' : 'text-muted-foreground'}>
                • One number
              </p>
              <p className={/[^A-Za-z0-9]/?.test(formData?.password) ? 'text-success' : 'text-muted-foreground'}>
                • One special character
              </p>
            </div>
          </div>
        )}
      </div>
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={formData?.confirmPassword}
        onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
        error={errors?.confirmPassword}
        required
        className="mb-4"
      />
    </div>
  );
};

export default BasicInfoStep;