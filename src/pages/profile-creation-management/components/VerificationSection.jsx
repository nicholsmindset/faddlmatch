import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const VerificationSection = ({ 
  isExpanded = false, 
  onToggle = () => {}, 
  data = {}, 
  onUpdate = () => {},
  isCompleted = false 
}) => {
  const [formData, setFormData] = useState({
    identityVerified: data?.identityVerified || false,
    islamicCompliance: data?.islamicCompliance || false,
    backgroundCheck: data?.backgroundCheck || false,
    documentUploaded: data?.documentUploaded || false,
    ...data
  });

  const [uploadedDocs, setUploadedDocs] = useState([]);

  const verificationSteps = [
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Upload a government-issued ID for identity confirmation',
      icon: 'Shield',
      status: formData?.identityVerified ? 'completed' : 'pending',
      required: true
    },
    {
      id: 'islamic',
      title: 'Islamic Compliance Certification',
      description: 'Confirm your commitment to Islamic values and Shariah compliance',
      icon: 'Moon',
      status: formData?.islamicCompliance ? 'completed' : 'pending',
      required: true
    },
    {
      id: 'background',
      title: 'Background Verification',
      description: 'Optional background check for enhanced trust (Premium feature)',
      icon: 'CheckCircle2',
      status: formData?.backgroundCheck ? 'completed' : 'available',
      required: false,
      premium: true
    }
  ];

  const handleFileUpload = (verificationType) => {
    // Mock file upload
    const mockDoc = {
      id: Date.now(),
      type: verificationType,
      name: `${verificationType}_document.pdf`,
      uploadDate: new Date(),
      status: 'pending'
    };
    
    setUploadedDocs(prev => [...prev, mockDoc]);
    
    const updatedData = { 
      ...formData, 
      documentUploaded: true,
      [`${verificationType}Verified`]: true 
    };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleComplianceCheck = (field, checked) => {
    const updatedData = { ...formData, [field]: checked };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'available': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'available': return 'Circle';
      default: return 'Circle';
    }
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
            <Icon name={isCompleted ? "CheckCircle" : "Shield"} size={18} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base">Genuineness Verification</h3>
            <p className="text-sm text-muted-foreground">Verify your identity and build trust</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </div>
      {isExpanded && (
        <div className="p-4 border-t border-border space-y-6">
          {/* Trust & Safety Info */}
          <div className="bg-trust-blue/5 border border-trust-blue/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-trust-blue mt-0.5" />
              <div>
                <p className="font-medium text-trust-blue text-sm mb-2">Why Verification Matters</p>
                <p className="text-xs text-muted-foreground">
                  Verification helps build trust in our community and ensures all members are genuine. 
                  Verified profiles receive higher visibility and more meaningful matches.
                </p>
              </div>
            </div>
          </div>

          {/* Verification Steps */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Verification Steps</h4>
            
            {verificationSteps?.map((step) => (
              <div key={step?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(step?.status)}`}>
                    <Icon name={step?.icon} size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-foreground">{step?.title}</h5>
                      {step?.required && (
                        <span className="text-xs bg-error text-error-foreground px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                      {step?.premium && (
                        <span className="text-xs bg-premium-purple text-white px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{step?.description}</p>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(step?.status)}`}>
                        <Icon name={getStatusIcon(step?.status)} size={14} />
                        <span className="text-xs font-medium capitalize">{step?.status}</span>
                      </div>
                      
                      {step?.status !== 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFileUpload(step?.id)}
                          disabled={step?.premium && !step?.available}
                        >
                          <Icon name="Upload" size={14} className="mr-1" />
                          {step?.id === 'identity' ? 'Upload ID' : 
                           step?.id === 'islamic' ? 'Confirm' : 'Start Check'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Islamic Compliance Declaration */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Islamic Compliance Declaration</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="I commit to following Islamic principles in my search for marriage"
                description="I understand and agree to maintain Islamic values throughout the matrimonial process"
                checked={formData?.islamicCompliance}
                onChange={(e) => handleComplianceCheck('islamicCompliance', e?.target?.checked)}
              />
              
              <Checkbox
                label="I will involve my family/guardian in the marriage decision process"
                description="I acknowledge the importance of family involvement as per Islamic tradition"
                checked={formData?.familyInvolvement}
                onChange={(e) => handleComplianceCheck('familyInvolvement', e?.target?.checked)}
              />
              
              <Checkbox
                label="I am seeking a serious, long-term marriage commitment"
                description="I am not interested in casual relationships or temporary arrangements"
                checked={formData?.seriousIntent}
                onChange={(e) => handleComplianceCheck('seriousIntent', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Uploaded Documents */}
          {uploadedDocs?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Uploaded Documents</h4>
              <div className="space-y-2">
                {uploadedDocs?.map((doc) => (
                  <div key={doc?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="FileText" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{doc?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded on {doc?.uploadDate?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-warning text-warning-foreground px-2 py-1 rounded-full">
                        Under Review
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Benefits */}
          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Award" size={20} className="text-success mt-0.5" />
              <div>
                <p className="font-medium text-success text-sm mb-2">Verification Benefits</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Higher profile visibility in search results</li>
                  <li>• Verified badge on your profile</li>
                  <li>• Increased trust from potential matches</li>
                  <li>• Access to other verified members</li>
                  <li>• Priority customer support</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="px-6">
              Save Verification Status
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationSection;