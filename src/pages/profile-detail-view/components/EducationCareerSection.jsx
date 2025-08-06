import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EducationCareerSection = ({ educationInfo, isExpanded, onToggle }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="GraduationCap" size={20} className="text-warning" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Education & Career
            </h3>
            <p className="text-sm text-muted-foreground">
              Professional background and qualifications
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
          {/* Education Level */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Education Level</span>
            <span className="text-sm font-medium text-foreground">{educationInfo?.educationLevel}</span>
          </div>

          {/* Field of Study */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Field of Study</span>
            <span className="text-sm font-medium text-foreground">{educationInfo?.fieldOfStudy}</span>
          </div>

          {/* Institution */}
          {educationInfo?.institution && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Institution</span>
              <span className="text-sm font-medium text-foreground">{educationInfo?.institution}</span>
            </div>
          )}

          {/* Current Profession */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Profession</span>
            <span className="text-sm font-medium text-foreground">{educationInfo?.profession}</span>
          </div>

          {/* Company */}
          {educationInfo?.company && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Company</span>
              <span className="text-sm font-medium text-foreground">{educationInfo?.company}</span>
            </div>
          )}

          {/* Income Range */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Income Range</span>
            <span className="text-sm font-medium text-foreground">{educationInfo?.incomeRange}</span>
          </div>

          {/* Work Schedule */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Work Schedule</span>
            <span className="text-sm font-medium text-foreground">{educationInfo?.workSchedule}</span>
          </div>

          {/* Career Goals */}
          {educationInfo?.careerGoals && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Career Goals</span>
              <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg">
                {educationInfo?.careerGoals}
              </p>
            </div>
          )}

          {/* Skills */}
          {educationInfo?.skills && educationInfo?.skills?.length > 0 && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Skills</span>
              <div className="flex flex-wrap gap-2">
                {educationInfo?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-caption"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Work-Life Balance */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Work-Life Balance</span>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={14}
                    className={
                      star <= educationInfo?.workLifeBalance
                        ? "text-warning fill-current" :"text-muted-foreground"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground ml-2">
                ({educationInfo?.workLifeBalance}/5)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationCareerSection;