import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PartnerExpectationsSection = ({ expectations, isExpanded, onToggle }) => {
  const getAgeRangeText = (min, max) => {
    return `${min} - ${max} years`;
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-premium-purple/10 rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={20} className="text-premium-purple" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Partner Expectations
            </h3>
            <p className="text-sm text-muted-foreground">
              Preferences and requirements for life partner
            </p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </Button>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-border">
          {/* Age Range */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Preferred Age</span>
            <span className="text-sm font-medium text-foreground">
              {getAgeRangeText(expectations?.ageRange?.min, expectations?.ageRange?.max)}
            </span>
          </div>

          {/* Education Level */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Education</span>
            <span className="text-sm font-medium text-foreground">{expectations?.educationLevel}</span>
          </div>

          {/* Profession */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Preferred Professions</span>
            <div className="flex flex-wrap gap-2">
              {expectations?.professions?.map((profession, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-premium-purple/10 text-premium-purple rounded-full text-sm font-caption"
                >
                  {profession}
                </span>
              ))}
            </div>
          </div>

          {/* Location Preference */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Location</span>
            <span className="text-sm font-medium text-foreground">{expectations?.location}</span>
          </div>

          {/* Religious Level */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Religious Level</span>
            <span className="text-sm font-medium text-foreground">{expectations?.religiousLevel}</span>
          </div>

          {/* Marital Status */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Acceptable Marital Status</span>
            <div className="flex flex-wrap gap-2">
              {expectations?.maritalStatus?.map((status, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-caption"
                >
                  {status}
                </span>
              ))}
            </div>
          </div>

          {/* Children Preference */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Children</span>
            <span className="text-sm font-medium text-foreground">{expectations?.childrenPreference}</span>
          </div>

          {/* Lifestyle Preferences */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Lifestyle Preferences</span>
            <div className="flex flex-wrap gap-2">
              {expectations?.lifestyle?.map((preference, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-islamic-green/10 text-islamic-green rounded-full text-sm font-caption"
                >
                  {preference}
                </span>
              ))}
            </div>
          </div>

          {/* Family Involvement */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Family Involvement</span>
            <div className="flex items-center space-x-1">
              <Icon 
                name={expectations?.familyInvolvement ? "Check" : "X"} 
                size={16} 
                className={expectations?.familyInvolvement ? "text-success" : "text-error"} 
              />
              <span className="text-sm font-medium text-foreground">
                {expectations?.familyInvolvement ? 'Expected' : 'Not Required'}
              </span>
            </div>
          </div>

          {/* Additional Requirements */}
          {expectations?.additionalRequirements && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Additional Requirements</span>
              <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg">
                {expectations?.additionalRequirements}
              </p>
            </div>
          )}

          {/* Deal Breakers */}
          {expectations?.dealBreakers && expectations?.dealBreakers?.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Deal Breakers</span>
              <div className="flex flex-wrap gap-2">
                {expectations?.dealBreakers?.map((dealBreaker, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-error/10 text-error rounded-full text-sm font-caption"
                  >
                    {dealBreaker}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PartnerExpectationsSection;