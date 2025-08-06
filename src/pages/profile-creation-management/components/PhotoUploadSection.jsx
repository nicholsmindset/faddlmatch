import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PhotoUploadSection = ({ 
  isExpanded = false, 
  onToggle = () => {}, 
  data = {}, 
  onUpdate = () => {},
  isCompleted = false,
  userTier = 'intention'
}) => {
  const [formData, setFormData] = useState({
    profilePhoto: data?.profilePhoto || '',
    additionalPhotos: data?.additionalPhotos || [],
    photoPrivacy: data?.photoPrivacy || 'blurred',
    allowPhotoDownload: data?.allowPhotoDownload || false,
    ...data
  });

  const [dragActive, setDragActive] = useState(false);

  const privacyOptions = [
    { 
      value: 'blurred', 
      label: 'Blurred for free users', 
      description: 'Only premium users can see clear photos',
      available: true
    },
    { 
      value: 'premium-only', 
      label: 'Premium users only', 
      description: 'Only premium subscribers can view photos',
      available: userTier !== 'intention'
    },
    { 
      value: 'public', 
      label: 'Visible to all', 
      description: 'All users can see clear photos',
      available: userTier === 'reliance'
    }
  ];

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileUpload(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileUpload = (file) => {
    // Mock file upload - in real app, this would upload to server
    const mockUrl = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face`;
    const updatedData = { ...formData, profilePhoto: mockUrl };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileUpload(e?.target?.files?.[0]);
    }
  };

  const handlePrivacyChange = (value) => {
    const updatedData = { ...formData, photoPrivacy: value };
    setFormData(updatedData);
    onUpdate(updatedData);
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  const removePhoto = () => {
    const updatedData = { ...formData, profilePhoto: '' };
    setFormData(updatedData);
    onUpdate(updatedData);
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
            <Icon name={isCompleted ? "CheckCircle" : "Camera"} size={18} />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base">Profile Photos</h3>
            <p className="text-sm text-muted-foreground">Upload your photos with privacy controls</p>
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
          {/* Photo Upload Area */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Profile Photo</h4>
            
            {formData?.profilePhoto ? (
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-border">
                  <Image
                    src={formData?.profilePhoto}
                    alt="Profile photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 w-6 h-6"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-medium mb-2">Upload your profile photo</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop or click to select
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  <Icon name="Camera" size={16} className="mr-2" />
                  Choose Photo
                </Button>
              </div>
            )}
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Photo Privacy Settings</h4>
            
            <div className="space-y-3">
              {privacyOptions?.map((option) => (
                <div
                  key={option?.value}
                  className={`border rounded-lg p-3 cursor-pointer transition-smooth ${
                    formData?.photoPrivacy === option?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
                  } ${!option?.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => option?.available && handlePrivacyChange(option?.value)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                      formData?.photoPrivacy === option?.value
                        ? 'border-primary bg-primary' :'border-muted-foreground'
                    }`}>
                      {formData?.photoPrivacy === option?.value && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-sm text-foreground">{option?.label}</p>
                        {!option?.available && (
                          <span className="text-xs bg-premium-purple text-white px-2 py-1 rounded-full">
                            Premium
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{option?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Settings */}
          <div className="space-y-3">
            <Checkbox
              label="Allow photo download by matches"
              description="Matched users can download your photos for family consultation"
              checked={formData?.allowPhotoDownload}
              onChange={(e) => {
                const updatedData = { ...formData, allowPhotoDownload: e?.target?.checked };
                setFormData(updatedData);
                onUpdate(updatedData);
              }}
            />
          </div>

          {/* Tier Upgrade Prompt */}
          {userTier === 'intention' && (
            <div className="bg-premium-purple/5 border border-premium-purple/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Crown" size={20} className="text-premium-purple mt-0.5" />
                <div>
                  <p className="font-medium text-premium-purple text-sm">Upgrade for Better Privacy Control</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Premium users get advanced photo privacy settings and better match visibility.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 text-premium-purple border-premium-purple">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="px-6">
              Save Photo Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadSection;