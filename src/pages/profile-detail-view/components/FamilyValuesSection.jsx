import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FamilyValuesSection = ({ familyInfo, isExpanded, onToggle, showGuardianContact, userTier }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-trust-blue/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} className="text-trust-blue" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Family & Values
            </h3>
            <p className="text-sm text-muted-foreground">
              Family background and cultural values
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
          {/* Cultural Background */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Cultural Background</span>
            <span className="text-sm font-medium text-foreground">{familyInfo?.culturalBackground}</span>
          </div>

          {/* Family Type */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Family Type</span>
            <span className="text-sm font-medium text-foreground">{familyInfo?.familyType}</span>
          </div>

          {/* Family Values */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Family Values</span>
            <div className="flex flex-wrap gap-2">
              {familyInfo?.familyValues?.map((value, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-trust-blue/10 text-trust-blue rounded-full text-sm font-caption"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>

          {/* Languages Spoken */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Languages</span>
            <div className="flex flex-wrap gap-2">
              {familyInfo?.languages?.map((language, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted text-foreground rounded-full text-sm font-caption"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* Guardian Information */}
          {showGuardianContact && (
            <div className="mt-6 p-4 bg-premium-purple/5 rounded-lg border border-premium-purple/20">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Shield" size={16} className="text-premium-purple" />
                <span className="font-medium text-sm text-premium-purple">Guardian Contact</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Name</span>
                  <span className="text-sm font-medium text-foreground">
                    {familyInfo?.guardian?.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Relationship</span>
                  <span className="text-sm font-medium text-foreground">
                    {familyInfo?.guardian?.relationship}
                  </span>
                </div>
                
                {userTier === 'reliance' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Contact</span>
                    <span className="text-sm font-medium text-foreground">
                      {familyInfo?.guardian?.contact}
                    </span>
                  </div>
                )}
              </div>

              {userTier !== 'reliance' && (
                <div className="mt-3 p-2 bg-warning/10 rounded border border-warning/20">
                  <p className="text-xs text-warning">
                    Upgrade to Premium to view guardian contact details
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Family Expectations */}
          {familyInfo?.familyExpectations && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Family Expectations</span>
              <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg">
                {familyInfo?.familyExpectations}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FamilyValuesSection;