import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileProgress = ({ completionPercentage = 0, completedSections = [], totalSections = 6 }) => {
  const getProgressColor = () => {
    if (completionPercentage >= 80) return 'bg-success';
    if (completionPercentage >= 50) return 'bg-warning';
    return 'bg-primary';
  };

  const getProgressText = () => {
    if (completionPercentage >= 100) return 'Profile Complete';
    if (completionPercentage >= 80) return 'Almost Done';
    if (completionPercentage >= 50) return 'Good Progress';
    return 'Getting Started';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <h2 className="font-heading font-semibold text-lg">Profile Completion</h2>
        </div>
        <span className="text-sm font-mono text-muted-foreground">
          {completedSections?.length}/{totalSections} sections
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{getProgressText()}</span>
          <span className="text-sm font-mono text-muted-foreground">{completionPercentage}%</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3">
          <div
            className={`${getProgressColor()} h-3 rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        
        {completionPercentage < 100 && (
          <p className="text-xs text-muted-foreground mt-2">
            Complete your profile to increase your match visibility and attract more meaningful connections.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileProgress;