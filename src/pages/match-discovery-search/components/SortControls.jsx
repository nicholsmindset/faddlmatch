import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SortControls = ({ 
  sortBy, 
  setSortBy, 
  viewMode, 
  setViewMode, 
  totalResults,
  currentPage,
  totalPages 
}) => {
  const sortOptions = [
    { value: 'compatibility', label: 'Best Match' },
    { value: 'recent', label: 'Recently Active' },
    { value: 'newest', label: 'Newest Members' },
    { value: 'distance', label: 'Nearest First' },
    { value: 'age_asc', label: 'Age: Youngest First' },
    { value: 'age_desc', label: 'Age: Oldest First' }
  ];

  const viewModeOptions = [
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' }
  ];

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Results Count */}
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{totalResults}</span> matches found
          </p>
          {totalPages > 1 && (
            <p className="text-sm text-muted-foreground font-mono">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="min-w-[140px]"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-muted rounded-lg p-1">
            {viewModeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(option?.value)}
                className={`px-3 py-1 h-8 ${
                  viewMode === option?.value 
                    ? 'bg-card text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={option?.icon} size={16} />
                <span className="ml-2 hidden md:inline">{option?.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      <div className="mt-3 flex flex-wrap gap-2">
        {/* This would show active filters as chips */}
        <div className="flex items-center text-xs text-muted-foreground">
          <Icon name="Filter" size={14} className="mr-1" />
          <span>Active filters will appear here</span>
        </div>
      </div>
    </div>
  );
};

export default SortControls;