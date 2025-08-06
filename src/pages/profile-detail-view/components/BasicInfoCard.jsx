import React from 'react';
import Icon from '../../../components/AppIcon';

const BasicInfoCard = ({ profile }) => {
  const getLastActiveText = (lastActive) => {
    const now = new Date();
    const diff = now - lastActive;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return 'Active now';
    if (hours < 24) return `Active ${hours}h ago`;
    if (days === 1) return 'Active yesterday';
    return `Active ${days} days ago`;
  };

  const getActiveStatusColor = (lastActive) => {
    const now = new Date();
    const diff = now - lastActive;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return 'text-success';
    if (hours < 24) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="space-y-4">
        {/* Name and Age */}
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground mb-1">
            {profile?.name}
          </h1>
          <p className="text-muted-foreground font-caption">
            {profile?.age} years old
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{profile?.location}</span>
        </div>

        {/* Profession */}
        <div className="flex items-center space-x-2">
          <Icon name="Briefcase" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground">{profile?.profession}</span>
        </div>

        {/* Last Active */}
        <div className="flex items-center space-x-2">
          <Icon 
            name="Clock" 
            size={16} 
            className={getActiveStatusColor(profile?.lastActive)} 
          />
          <span className={`text-sm ${getActiveStatusColor(profile?.lastActive)}`}>
            {getLastActiveText(profile?.lastActive)}
          </span>
        </div>

        {/* Marital Status */}
        <div className="flex items-center space-x-2">
          <Icon name="Heart" size={16} className="text-muted-foreground" />
          <span className="text-sm text-foreground capitalize">
            {profile?.maritalStatus}
          </span>
        </div>

        {/* Children Info */}
        {profile?.hasChildren && (
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {profile?.childrenCount} {profile?.childrenCount === 1 ? 'child' : 'children'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfoCard;