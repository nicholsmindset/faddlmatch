import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import MatchCard from './components/MatchCard';
import DailyLimitIndicator from './components/DailyLimitIndicator';
import WhoLikesYouSection from './components/WhoLikesYouSection';
import LoadingSkeleton from './components/LoadingSkeleton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MatchDiscoverySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('compatibility');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userTier, setUserTier] = useState('intention'); // intention, patience, reliance
  const [usedMatches, setUsedMatches] = useState(3);
  const [matches, setMatches] = useState([]);
  const [filters, setFilters] = useState({
    ageMin: '',
    ageMax: '',
    location: '',
    education: '',
    profession: '',
    madhab: '',
    practice: '',
    hasChildren: false,
    familyBackground: '',
    specificRequirements: ''
  });

  const navigate = useNavigate();

  // Mock matches data
  useEffect(() => {
    const mockMatches = [
      {
        id: 1,
        name: 'Amira Hassan',
        age: 28,
        location: 'Tampines, Singapore',
        profession: 'Pediatric Nurse',
        education: 'Bachelor\'s in Nursing',
        madhab: 'Shafi\'i',
        practiceLevel: 'Religious',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=500&fit=crop',
        compatibilityScore: 92,
        isOnline: true,
        lastActive: '2 hours ago',
        tier: 'patience',
        isLiked: false,
        hasExpressedInterest: false
      },
      {
        id: 2,
        name: 'Fatima Al-Zahra',
        age: 32,
        location: 'Jurong West, Singapore',
        profession: 'Software Engineer',
        education: 'Master\'s in Computer Science',
        madhab: 'Hanafi',
        practiceLevel: 'Very Religious',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
        compatibilityScore: 88,
        isOnline: false,
        lastActive: '1 day ago',
        tier: 'reliance',
        isLiked: true,
        hasExpressedInterest: true
      },
      {
        id: 3,
        name: 'Khadija Rahman',
        age: 26,
        location: 'Woodlands, Singapore',
        profession: 'Primary School Teacher',
        education: 'Bachelor\'s in Education',
        madhab: 'Maliki',
        practiceLevel: 'Moderate',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
        compatibilityScore: 85,
        isOnline: true,
        lastActive: 'Just now',
        tier: 'intention',
        isLiked: false,
        hasExpressedInterest: false
      },
      {
        id: 4,
        name: 'Zainab Ahmed',
        age: 30,
        location: 'Clementi, Singapore',
        profession: 'Marketing Manager',
        education: 'Master\'s in Business',
        madhab: 'Shafi\'i',
        practiceLevel: 'Religious',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
        compatibilityScore: 79,
        isOnline: false,
        lastActive: '3 hours ago',
        tier: 'patience',
        isLiked: false,
        hasExpressedInterest: false
      },
      {
        id: 5,
        name: 'Mariam Osman',
        age: 29,
        location: 'Bedok, Singapore',
        profession: 'Pharmacist',
        education: 'Bachelor\'s in Pharmacy',
        madhab: 'Hanbali',
        practiceLevel: 'Very Religious',
        photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop',
        compatibilityScore: 76,
        isOnline: true,
        lastActive: '30 minutes ago',
        tier: 'reliance',
        isLiked: false,
        hasExpressedInterest: false
      },
      {
        id: 6,
        name: 'Aisha Malik',
        age: 27,
        location: 'Punggol, Singapore',
        profession: 'Graphic Designer',
        education: 'Diploma in Design',
        madhab: 'Hanafi',
        practiceLevel: 'Moderate',
        photo: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop',
        compatibilityScore: 73,
        isOnline: false,
        lastActive: '5 hours ago',
        tier: 'intention',
        isLiked: false,
        hasExpressedInterest: false
      },
      {
        id: 7,
        name: 'Hafsa Ibrahim',
        age: 31,
        location: 'Toa Payoh, Singapore',
        profession: 'Accountant',
        education: 'Bachelor\'s in Accounting',
        madhab: 'Shafi\'i',
        practiceLevel: 'Religious',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
        compatibilityScore: 71,
        isOnline: true,
        lastActive: '1 hour ago',
        tier: 'patience',
        isLiked: false,
        hasExpressedInterest: false
      },
      {
        id: 8,
        name: 'Ruqayyah Said',
        age: 25,
        location: 'Ang Mo Kio, Singapore',
        profession: 'Social Worker',
        education: 'Master\'s in Social Work',
        madhab: 'Maliki',
        practiceLevel: 'Very Religious',
        photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop',
        compatibilityScore: 68,
        isOnline: false,
        lastActive: '2 days ago',
        tier: 'reliance',
        isLiked: true,
        hasExpressedInterest: false
      }
    ];
    setMatches(mockMatches);
  }, []);

  // Mock who likes you data
  const whoLikesYouData = {
    count: 7,
    previewProfiles: [
      {
        id: 101,
        name: 'Sarah',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop'
      },
      {
        id: 102,
        name: 'Layla',
        photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop'
      },
      {
        id: 103,
        name: 'Nour',
        photo: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&h=100&fit=crop'
      },
      {
        id: 104,
        name: 'Yasmin',
        photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop'
      }
    ]
  };

  const handleSearch = (query) => {
    setIsLoading(true);
    setSearchQuery(query);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleExpressInterest = (matchId, isLiked) => {
    if (userTier === 'intention') return;
    
    setMatches(prev => 
      prev?.map(match => 
        match?.id === matchId 
          ? { ...match, isLiked, hasExpressedInterest: isLiked }
          : match
      )
    );
  };

  const handleSendMessage = (matchId) => {
    if (userTier === 'intention') return;
    navigate('/messaging-center', { state: { matchId } });
  };

  const handleUpgrade = () => {
    navigate('/subscription-management');
  };

  const totalResults = matches?.length;
  const totalPages = Math.ceil(totalResults / 8);

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <div className="flex">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <FilterPanel
            isOpen={true}
            onClose={() => {}}
            filters={filters}
            setFilters={setFilters}
            userTier={userTier}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            onFilterToggle={() => setIsFilterOpen(true)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Mobile Filter Panel - Only show when explicitly opened */}
          {isFilterOpen && (
            <FilterPanel
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              filters={filters}
              setFilters={setFilters}
              userTier={userTier}
            />
          )}

          {/* Content Area */}
          <div className="p-4 lg:p-6">
            {/* Daily Limit Indicator */}
            <DailyLimitIndicator
              userTier={userTier}
              usedMatches={usedMatches}
              onUpgrade={handleUpgrade}
            />

            {/* Who Likes You Section */}
            <WhoLikesYouSection
              userTier={userTier}
              likesCount={whoLikesYouData?.count}
              previewProfiles={whoLikesYouData?.previewProfiles}
            />

            {/* Sort Controls */}
            <SortControls
              sortBy={sortBy}
              setSortBy={setSortBy}
              viewMode={viewMode}
              setViewMode={setViewMode}
              totalResults={totalResults}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            {/* Matches Grid/List */}
            <div className="mt-6">
              {isLoading ? (
                <LoadingSkeleton viewMode={viewMode} />
              ) : matches?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-xl mb-2">No matches found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters to find more matches.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setFilters({
                        ageMin: '',
                        ageMax: '',
                        location: '',
                        education: '',
                        profession: '',
                        madhab: '',
                        practice: '',
                        hasChildren: false,
                        familyBackground: '',
                        specificRequirements: ''
                      });
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className={`
                  ${viewMode === 'grid' ?'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' :'space-y-4'
                  }
                `}>
                  {matches?.map((match) => (
                    <MatchCard
                      key={match?.id}
                      match={match}
                      userTier={userTier}
                      onExpressInterest={handleExpressInterest}
                      onSendMessage={handleSendMessage}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && !isLoading && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8"
                      >
                        {page}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            )}

            {/* Islamic Pattern Background */}
            <div className="islamic-pattern fixed inset-0 -z-10 opacity-30" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDiscoverySearch;