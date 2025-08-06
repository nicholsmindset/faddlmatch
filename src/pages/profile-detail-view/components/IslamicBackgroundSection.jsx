import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IslamicBackgroundSection = ({ islamicInfo, isExpanded, onToggle }) => {
  const getPrayerFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'Always': return 'text-success bg-success/10';
      case 'Usually': return 'text-islamic-green bg-islamic-green/10';
      case 'Sometimes': return 'text-warning bg-warning/10';
      case 'Rarely': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCommitmentLevel = (level) => {
    const levels = {
      'Very Religious': { icon: 'Star', color: 'text-success' },
      'Religious': { icon: 'Heart', color: 'text-islamic-green' },
      'Moderately Religious': { icon: 'Circle', color: 'text-trust-blue' },
      'Not Very Religious': { icon: 'Minus', color: 'text-muted-foreground' }
    };
    return levels?.[level] || levels?.['Moderately Religious'];
  };

  const commitment = getCommitmentLevel(islamicInfo?.religiousCommitment);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <Button
        variant="ghost"
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-muted/50"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-islamic-green/10 rounded-lg flex items-center justify-center">
            <Icon name="Star" size={20} className="text-islamic-green" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              Islamic Background
            </h3>
            <p className="text-sm text-muted-foreground">
              Religious practices and beliefs
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
          {/* Madhab */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Madhab</span>
            <span className="text-sm font-medium text-foreground">{islamicInfo?.madhab}</span>
          </div>

          {/* Prayer Frequency */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Prayer Frequency</span>
            <div className={`px-3 py-1 rounded-full ${getPrayerFrequencyColor(islamicInfo?.prayerFrequency)}`}>
              <span className="text-sm font-medium">{islamicInfo?.prayerFrequency}</span>
            </div>
          </div>

          {/* Quran Knowledge */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Quran Knowledge</span>
            <span className="text-sm font-medium text-foreground">{islamicInfo?.quranKnowledge}</span>
          </div>

          {/* Religious Commitment */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Religious Commitment</span>
            <div className="flex items-center space-x-2">
              <Icon name={commitment?.icon} size={16} className={commitment?.color} />
              <span className="text-sm font-medium text-foreground">
                {islamicInfo?.religiousCommitment}
              </span>
            </div>
          </div>

          {/* Hijab Status (for women) */}
          {islamicInfo?.hijabStatus && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Hijab</span>
              <span className="text-sm font-medium text-foreground">{islamicInfo?.hijabStatus}</span>
            </div>
          )}

          {/* Halal Lifestyle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Halal Lifestyle</span>
            <div className="flex items-center space-x-1">
              <Icon 
                name={islamicInfo?.halalLifestyle ? "Check" : "X"} 
                size={16} 
                className={islamicInfo?.halalLifestyle ? "text-success" : "text-error"} 
              />
              <span className="text-sm font-medium text-foreground">
                {islamicInfo?.halalLifestyle ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {/* Islamic Studies */}
          {islamicInfo?.islamicStudies && (
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Islamic Education</span>
              <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg">
                {islamicInfo?.islamicStudies}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IslamicBackgroundSection;