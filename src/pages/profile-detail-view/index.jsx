import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import ProfilePhotoGallery from './components/ProfilePhotoGallery';
import BasicInfoCard from './components/BasicInfoCard';
import VerificationBadges from './components/VerificationBadges';
import IslamicBackgroundSection from './components/IslamicBackgroundSection';
import FamilyValuesSection from './components/FamilyValuesSection';
import EducationCareerSection from './components/EducationCareerSection';
import PartnerExpectationsSection from './components/PartnerExpectationsSection';
import CompatibilityScore from './components/CompatibilityScore';
import ActionButtons from './components/ActionButtons';

const ProfileDetailView = () => {
  const [userTier, setUserTier] = useState('intention'); // intention, patience, reliance
  const [expandedSections, setExpandedSections] = useState({
    islamic: false,
    family: false,
    education: false,
    expectations: false
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Mock profile data
  const profileData = {
    id: 'profile_123',
    name: 'Aisha Rahman',
    age: 32,
    location: 'Singapore, Central Region',
    profession: 'Software Engineer',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    maritalStatus: 'divorced',
    hasChildren: true,
    childrenCount: 2,
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop'
    ],
    verifications: {
      identity: true,
      phone: true,
      email: true,
      guardian: true,
      islamic: true
    },
    islamicInfo: {
      madhab: 'Hanafi',
      prayerFrequency: 'Always',
      quranKnowledge: 'Good',
      religiousCommitment: 'Very Religious',
      hijabStatus: 'Always',
      halalLifestyle: true,
      islamicStudies: 'Completed Islamic Studies at Al-Azhar University with focus on Quranic interpretation and Islamic jurisprudence.'
    },
    familyInfo: {
      culturalBackground: 'Malay-Indonesian',
      familyType: 'Joint Family',
      familyValues: ['Respect for Elders', 'Islamic Values', 'Education', 'Unity'],
      languages: ['English', 'Malay', 'Arabic', 'Indonesian'],
      guardian: {
        name: 'Ahmad Rahman',
        relationship: 'Father',
        contact: '+65 9123 4567'
      },
      familyExpectations: `Our family values Islamic principles and seeks a partner who shares similar values. We believe in mutual respect, family involvement in major decisions, and maintaining strong Islamic traditions while embracing modern life in Singapore.`
    },
    educationInfo: {
      educationLevel: "Master\'s Degree",
      fieldOfStudy: 'Computer Science',
      institution: 'National University of Singapore',
      profession: 'Senior Software Engineer',
      company: 'Tech Solutions Pte Ltd',
      incomeRange: 'SGD 8,000 - 12,000',
      workSchedule: 'Flexible Hours',
      careerGoals: `Aspiring to become a technical lead while maintaining work-life balance. Interested in contributing to Islamic fintech solutions and educational technology that benefits the Muslim community.`,
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Project Management'],
      workLifeBalance: 4
    },
    partnerExpectations: {
      ageRange: { min: 30, max: 40 },
      educationLevel: "Bachelor\'s Degree or higher",
      professions: ['Engineer', 'Doctor', 'Teacher', 'Business Professional'],
      location: 'Singapore or willing to relocate',
      religiousLevel: 'Religious to Very Religious',
      maritalStatus: ['Never Married', 'Divorced', 'Widowed'],
      childrenPreference: 'Open to children',
      lifestyle: ['Halal Lifestyle', 'Family Oriented', 'Career Focused'],
      familyInvolvement: true,
      additionalRequirements: `Looking for a practicing Muslim who values family, education, and personal growth. Someone who can be a good role model for my children and supports my career aspirations while building a strong Islamic household together.`,
      dealBreakers: ['Smoking', 'Non-Halal Lifestyle', 'Disrespectful to Family']
    },
    compatibilityScore: 85,
    sharedInterests: ['Islamic Studies', 'Technology', 'Family Values', 'Education', 'Travel'],
    matchReasons: [
      'Both value Islamic principles and family involvement',
      'Similar educational background and career focus',
      'Shared interest in technology and continuous learning',
      'Both are divorced with children and understand family dynamics',
      'Compatible age range and life stage'
    ]
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleUpgrade = () => {
    navigate('/subscription-management');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const isPhotosBlurred = userTier === 'intention';
  const showGuardianContact = profileData?.familyInfo?.guardian && (userTier === 'patience' || userTier === 'reliance');

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryNavigation />
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Back Button and Actions */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="flex items-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Back to Search</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Icon name="Share" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Bookmark" size={20} />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Photos and Actions */}
          <div className="lg:col-span-1 space-y-6">
            <ProfilePhotoGallery
              photos={profileData?.photos}
              isBlurred={isPhotosBlurred}
              userTier={userTier}
              onUpgrade={handleUpgrade}
            />
            
            <BasicInfoCard profile={profileData} />
            
            <VerificationBadges verifications={profileData?.verifications} />
            
            <ActionButtons
              userTier={userTier}
              profileId={profileData?.id}
              onUpgrade={handleUpgrade}
            />
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            <CompatibilityScore
              score={profileData?.compatibilityScore}
              sharedInterests={profileData?.sharedInterests}
              matchReasons={profileData?.matchReasons}
            />

            <IslamicBackgroundSection
              islamicInfo={profileData?.islamicInfo}
              isExpanded={expandedSections?.islamic}
              onToggle={() => toggleSection('islamic')}
            />

            <FamilyValuesSection
              familyInfo={profileData?.familyInfo}
              isExpanded={expandedSections?.family}
              onToggle={() => toggleSection('family')}
              showGuardianContact={showGuardianContact}
              userTier={userTier}
            />

            <EducationCareerSection
              educationInfo={profileData?.educationInfo}
              isExpanded={expandedSections?.education}
              onToggle={() => toggleSection('education')}
            />

            <PartnerExpectationsSection
              expectations={profileData?.partnerExpectations}
              isExpanded={expandedSections?.expectations}
              onToggle={() => toggleSection('expectations')}
            />

            {/* Safety Information */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Shield" size={20} className="text-trust-blue" />
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  Safety & Privacy
                </h3>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• All profiles are verified for authenticity</p>
                <p>• Personal information is protected and secure</p>
                <p>• Report any suspicious activity immediately</p>
                <p>• Meet in public places for initial meetings</p>
                <p>• Family involvement is encouraged for safety</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailView;