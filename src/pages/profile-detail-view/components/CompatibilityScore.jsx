import React from 'react';
import Icon from '../../../components/AppIcon';

const CompatibilityScore = ({ score, sharedInterests, matchReasons }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success bg-success/10 border-success/20';
    if (score >= 60) return 'text-islamic-green bg-islamic-green/10 border-islamic-green/20';
    if (score >= 40) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return 'Heart';
    if (score >= 60) return 'Star';
    if (score >= 40) return 'Circle';
    return 'AlertCircle';
  };

  const getScoreText = (score) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Low Match';
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="font-heading font-semibold text-lg mb-4 text-foreground">
        Compatibility Analysis
      </h3>
      {/* Compatibility Score */}
      <div className={`p-4 rounded-lg border ${getScoreColor(score)} mb-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon name={getScoreIcon(score)} size={20} />
            <span className="font-heading font-semibold text-lg">
              {getScoreText(score)}
            </span>
          </div>
          <span className="font-heading font-bold text-2xl">
            {score}%
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              score >= 80 ? 'bg-success' :
              score >= 60 ? 'bg-islamic-green' :
              score >= 40 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      {/* Shared Interests */}
      {sharedInterests && sharedInterests?.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-sm text-muted-foreground mb-2">
            Shared Interests ({sharedInterests?.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {sharedInterests?.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-trust-blue/10 text-trust-blue rounded-full text-sm font-caption flex items-center space-x-1"
              >
                <Icon name="Heart" size={12} />
                <span>{interest}</span>
              </span>
            ))}
          </div>
        </div>
      )}
      {/* Match Reasons */}
      {matchReasons && matchReasons?.length > 0 && (
        <div>
          <h4 className="font-medium text-sm text-muted-foreground mb-2">
            Why You Match
          </h4>
          <div className="space-y-2">
            {matchReasons?.map((reason, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Low Score Warning */}
      {score < 40 && (
        <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">
              Consider Your Compatibility
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            This match has significant differences. Review the profile carefully before proceeding.
          </p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityScore;