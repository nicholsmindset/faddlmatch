import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import SubscriptionIndicator from '../../components/ui/SubscriptionIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all section components
import ProfileProgress from './components/ProfileProgress';
import PersonalDetailsSection from './components/PersonalDetailsSection';
import IslamicBackgroundSection from './components/IslamicBackgroundSection';
import FamilyInformationSection from './components/FamilyInformationSection';
import PartnerPreferencesSection from './components/PartnerPreferencesSection';
import PhotoUploadSection from './components/PhotoUploadSection';
import AboutMeSection from './components/AboutMeSection';
import VerificationSection from './components/VerificationSection';
import ProfilePreview from './components/ProfilePreview';

const ProfileCreationManagement = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [userTier, setUserTier] = useState('intention'); // intention, patience, reliance
  const [expandedSection, setExpandedSection] = useState('personal');
  const [profileData, setProfileData] = useState({});
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const [showPreview, setShowPreview] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Profile sections configuration
  const sections = [
    { 
      id: 'personal', 
      component: PersonalDetailsSection,
      title: 'Personal Details',
      required: true 
    },
    { 
      id: 'islamic', 
      component: IslamicBackgroundSection,
      title: 'Islamic Background',
      required: true 
    },
    { 
      id: 'family', 
      component: FamilyInformationSection,
      title: 'Family Information',
      required: true 
    },
    { 
      id: 'preferences', 
      component: PartnerPreferencesSection,
      title: 'Partner Preferences',
      required: true 
    },
    { 
      id: 'photos', 
      component: PhotoUploadSection,
      title: 'Profile Photos',
      required: true 
    },
    { 
      id: 'about', 
      component: AboutMeSection,
      title: 'About Me',
      required: true 
    },
    { 
      id: 'verification', 
      component: VerificationSection,
      title: 'Verification',
      required: false 
    }
  ];

  // Calculate completion percentage
  const calculateCompletion = () => {
    const completedSections = sections?.filter(section => {
      const sectionData = profileData?.[section?.id];
      if (!sectionData) return false;
      
      // Check if section has required fields completed
      switch (section?.id) {
        case 'personal':
          return sectionData?.fullName && sectionData?.age && sectionData?.location;
        case 'islamic':
          return sectionData?.madhab && sectionData?.prayerFrequency;
        case 'family':
          return sectionData?.guardianName && sectionData?.guardianRelation;
        case 'preferences':
          return sectionData?.ageRangeMin && sectionData?.ageRangeMax;
        case 'photos':
          return sectionData?.profilePhoto;
        case 'about':
          return sectionData?.aboutMe && sectionData?.aboutMe?.length > 50;
        case 'verification':
          return sectionData?.identityVerified || sectionData?.islamicCompliance;
        default:
          return false;
      }
    });

    return Math.round((completedSections?.length / sections?.length) * 100);
  };

  const completionPercentage = calculateCompletion();
  const completedSections = sections?.filter(section => {
    const sectionData = profileData?.[section?.id];
    return sectionData && Object.keys(sectionData)?.length > 0;
  })?.map(s => s?.id);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (Object.keys(profileData)?.length > 0) {
        setAutoSaveStatus('saving');
        // Simulate API call
        setTimeout(() => {
          setAutoSaveStatus('saved');
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(autoSaveTimer);
  }, [profileData]);

  const handleSectionToggle = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleSectionUpdate = (sectionId, data) => {
    setProfileData(prev => ({
      ...prev,
      [sectionId]: { ...prev?.[sectionId], ...data }
    }));
    setAutoSaveStatus('unsaved');
  };

  const handleSaveProfile = () => {
    setAutoSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setAutoSaveStatus('saved');
      // Show success message or redirect
    }, 1500);
  };

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/user-login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isSectionCompleted = (sectionId) => {
    return completedSections?.includes(sectionId);
  };

  // Usage data for subscription indicator
  const usageData = userTier === 'intention' ? [
    { label: 'Daily Matches', used: 2, total: 3 },
    { label: 'Profile Views', used: 8, total: 10 }
  ] : null;

  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <GlobalHeader />
      <PrimaryNavigation />
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
                Profile Management
              </h1>
              <p className="text-muted-foreground mt-1">
                Create and manage your matrimonial profile with Islamic values
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Auto-save Status */}
              <div className="flex items-center space-x-2 text-sm">
                {autoSaveStatus === 'saving' && (
                  <>
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-muted-foreground">Saving...</span>
                  </>
                )}
                {autoSaveStatus === 'saved' && (
                  <>
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-success">Saved</span>
                  </>
                )}
                {autoSaveStatus === 'unsaved' && (
                  <>
                    <Icon name="AlertCircle" size={16} className="text-warning" />
                    <span className="text-warning">Unsaved changes</span>
                  </>
                )}
              </div>

              {/* Preview Toggle */}
              <Button
                variant="outline"
                onClick={handlePreviewToggle}
                className="hidden lg:flex"
              >
                <Icon name="Eye" size={16} className="mr-2" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>

              {/* Save Button */}
              <Button onClick={handleSaveProfile} className="px-6">
                <Icon name="Save" size={16} className="mr-2" />
                Save Profile
              </Button>

              {/* Logout Button */}
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(true)}
                className="hidden sm:flex text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Mobile Preview Toggle */}
          <div className="lg:hidden mb-4">
            <Button
              variant="outline"
              onClick={handlePreviewToggle}
              className="w-full"
            >
              <Icon name="Eye" size={16} className="mr-2" />
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className={`space-y-6 ${showPreview ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            {/* Progress Indicator */}
            <ProfileProgress
              completionPercentage={completionPercentage}
              completedSections={completedSections}
              totalSections={sections?.length}
            />

            {/* Subscription Indicator */}
            <SubscriptionIndicator
              tier={userTier}
              showUsage={true}
              usageData={usageData}
            />

            {/* Profile Sections */}
            <div className="space-y-4">
              {sections?.map((section) => {
                const SectionComponent = section?.component;
                return (
                  <SectionComponent
                    key={section?.id}
                    isExpanded={expandedSection === section?.id}
                    onToggle={() => handleSectionToggle(section?.id)}
                    data={profileData?.[section?.id] || {}}
                    onUpdate={(data) => handleSectionUpdate(section?.id, data)}
                    isCompleted={isSectionCompleted(section?.id)}
                    userTier={userTier}
                  />
                );
              })}
            </div>

            {/* Profile Completion CTA */}
            {completionPercentage < 100 && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Icon name="Target" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                      Complete Your Profile
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Complete your profile to increase visibility and attract more meaningful matches. 
                      Profiles with {completionPercentage >= 80 ? 'full completion' : 'higher completion'} get 
                      {completionPercentage >= 80 ? ' 3x more' : ' 2x more'} match opportunities.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sections?.filter(s => !isSectionCompleted(s?.id))?.slice(0, 3)?.map(section => (
                        <Button
                          key={section?.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSectionToggle(section?.id)}
                          className="text-primary border-primary"
                        >
                          Complete {section?.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ProfilePreview
                  profileData={profileData}
                  userTier={userTier}
                />
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-card border border-border rounded-lg p-6">
          <h3 className="font-heading font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/match-discovery-search')}
              className="flex items-center justify-center space-x-2 p-4"
            >
              <Icon name="Search" size={20} />
              <span>Find Matches</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/messaging-center')}
              className="flex items-center justify-center space-x-2 p-4"
            >
              <Icon name="MessageCircle" size={20} />
              <span>View Messages</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/subscription-management')}
              className="flex items-center justify-center space-x-2 p-4"
            >
              <Icon name="Crown" size={20} />
              <span>Upgrade Plan</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center justify-center space-x-2 p-4 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground sm:hidden"
            >
              <Icon name="LogOut" size={20} />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="LogOut" size={24} className="text-destructive" />
              <h3 className="font-heading font-semibold text-lg">Sign Out</h3>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Are you sure you want to sign out? Any unsaved changes will be lost.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex-1"
              >
                <Icon name="LogOut" size={16} className="mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCreationManagement;