import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, searchQuery, setSearchQuery }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="bg-card border-b border-border p-4">
      <form onSubmit={handleSearch} className="flex items-center space-x-3">
        {/* Filter Toggle Button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onFilterToggle}
          className="flex-shrink-0 lg:hidden"
        >
          <Icon name="Filter" size={20} />
        </Button>

        {/* Search Input Container */}
        <div className="relative flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search by name, profession, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              >
                <Icon name="X" size={14} />
              </Button>
            )}
          </div>
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          variant="default"
          className="flex-shrink-0"
        >
          <Icon name="Search" size={18} className="mr-2" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>
      {/* Quick Search Suggestions */}
      {isSearchFocused && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Quick search:</span>
          {['Doctor', 'Engineer', 'Teacher', 'Singapore', 'Hanafi']?.map((suggestion) => (
            <Button
              key={suggestion}
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery(suggestion);
                onSearch(suggestion);
              }}
              className="text-xs px-2 py-1 h-auto bg-muted/50 hover:bg-muted"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;