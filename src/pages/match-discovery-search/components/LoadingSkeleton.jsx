import React from 'react';

const LoadingSkeleton = ({ viewMode = 'grid' }) => {
  const skeletonCount = viewMode === 'grid' ? 8 : 6;

  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[4/5] bg-muted" />
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Name and Age */}
        <div className="flex items-center justify-between">
          <div className="h-5 bg-muted rounded w-24" />
          <div className="h-4 bg-muted rounded w-8" />
        </div>
        
        {/* Info Lines */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-20" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-16" />
          </div>
        </div>
        
        {/* Islamic Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-12" />
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-16" />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="space-y-2">
          <div className="h-9 bg-muted rounded w-full" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 bg-muted rounded" />
            <div className="h-8 bg-muted rounded" />
          </div>
        </div>
        
        {/* Last Active */}
        <div className="pt-3 border-t border-border">
          <div className="h-3 bg-muted rounded w-20" />
        </div>
      </div>
    </div>
  );

  const SkeletonListItem = () => (
    <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="w-16 h-16 bg-muted rounded-full flex-shrink-0" />
        
        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-5 bg-muted rounded w-32" />
            <div className="h-4 bg-muted rounded w-12" />
          </div>
          <div className="h-4 bg-muted rounded w-48" />
          <div className="h-4 bg-muted rounded w-40" />
        </div>
        
        {/* Actions */}
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-muted rounded" />
          <div className="w-8 h-8 bg-muted rounded" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: skeletonCount })?.map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {Array.from({ length: skeletonCount })?.map((_, index) => (
            <SkeletonListItem key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LoadingSkeleton;