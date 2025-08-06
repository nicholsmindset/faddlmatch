import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';



import QuickStatsWidget from '../dashboard-home/components/QuickStatsWidget';
import RecentActivityFeed from '../dashboard-home/components/RecentActivityFeed';
import NavigationShortcuts from '../dashboard-home/components/NavigationShortcuts';
import FAQSection from '../contact-page/components/FAQSection';
import LandingPage from '../../components/LandingPage';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { matchService } from '../../utils/matchService';
import { subscriptionService } from '../../utils/subscriptionService';

const EnhancedDashboardHome = () => {
  const navigate = useNavigate();
  const { user, userProfile, loading: authLoading } = useAuth();
  const [dailyMatches, setDailyMatches] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userTier = userProfile?.subscription_tier || 'intention';

  useEffect(() => {
    if (!authLoading) {
      if (userProfile) {
        loadDashboardData();
      } else {
        setLoading(false);
      }
    }
  }, [authLoading, userProfile]);

  // If auth is still loading, show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-ivory-cream">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-emerald-green animate-spin mx-auto mb-4" />
            <p className="text-muted-bronze font-lato">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show landing page
  if (!user || !userProfile) {
    return <LandingPage />;
  }

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get match limit based on tier
      const tierLimits = subscriptionService?.getTierLimits(userTier);
      const matchLimit = tierLimits?.dailyMatches === -1 ? 10 : tierLimits?.dailyMatches;

      // Load daily matches
      const { data: matchesData, error: matchesError } = await matchService?.getDailyMatches(matchLimit);
      if (matchesError) {
        setError(matchesError?.message);
        return;
      }

      setDailyMatches(matchesData || []);

      // Set user stats
      setUserStats({
        profileViews: userTier === 'intention' ? '?' : 24,
        interestsReceived: 7,
        messages: 12,
        dailyMatches: matchesData?.length || 0,
        weeklyGrowth: 15
      });

      // Mock recent activities (in real app, this would come from the database)
      const mockActivities = [
        {
          type: 'match',
          title: 'New Match Found',
          description: 'You have a new match with high compatibility',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          profileId: 1
        },
        {
          type: 'view',
          title: 'Profile View',
          description: userTier === 'intention' ? 'Someone viewed your profile' : 'A member viewed your profile',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          profileId: 2
        },
        {
          type: 'interest',
          title: 'Interest Received',
          description: 'Someone expressed interest in your profile',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          profileId: 3
        },
        {
          type: 'guardian',
          title: 'Guardian Notification',
          description: 'Your guardian reviewed your recent activity',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      ];
      setRecentActivities(mockActivities);

    } catch (error) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleExpressInterest = async (matchId) => {
    if (userTier === 'intention') {
      navigate('/subscription-management');
      return;
    }
    
    try {
      const { error } = await matchService?.expressInterest(matchId);
      if (error) {
        setError(error?.message);
        return;
      }

      // Refresh matches after expressing interest
      loadDashboardData();
    } catch (error) {
      setError('Failed to express interest');
    }
  };

  const getMatchLimitInfo = () => {
    const limits = subscriptionService?.getTierLimits(userTier);
    return {
      current: dailyMatches?.length || 0,
      total: limits?.dailyMatches === -1 ? 'unlimited' : limits?.dailyMatches,
      label: limits?.dailyMatches === 1 ? 'daily match' : 'daily matches'
    };
  };

  const matchLimit = getMatchLimitInfo();

  const getTierColor = (tier) => {
    switch (tier) {
      case 'intention': return 'emerald-green';
      case 'patience': return 'bronze';
      case 'reliance': return 'purple-600';
      default: return 'emerald-green';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'intention': return 'Heart';
      case 'patience': return 'Shield';
      case 'reliance': return 'Crown';
      default: return 'Heart';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory-cream">
        <GlobalHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-emerald-green animate-spin mx-auto mb-4" />
            <p className="text-muted-bronze font-lato">Loading your matches...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-cream islamic-pattern">
      <GlobalHeader />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-red-500" />
              <p className="text-red-700 text-sm font-lato">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError(null)}
                className="ml-auto"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          </div>
        )}

        {/* Enhanced Welcome Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-elevation-2 p-6 border border-bronze/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-${getTierColor(userTier)}/10 rounded-full flex items-center justify-center`}>
                  <Icon name={getTierIcon(userTier)} size={28} className={`text-${getTierColor(userTier)}`} />
                </div>
                <div>
                  <h1 className="font-cinzel font-bold text-2xl text-midnight-navy">
                    Assalamu Alaikum, {userProfile?.full_name?.split(' ')?.[0]}
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`px-3 py-1 bg-${getTierColor(userTier)}/10 rounded-full`}>
                      <span className={`text-sm font-lato font-medium text-${getTierColor(userTier)}`}>
                        {userTier?.charAt(0)?.toUpperCase() + userTier?.slice(1)} Member
                      </span>
                    </div>
                    {userProfile?.is_verified && (
                      <div className="flex items-center space-x-1">
                        <Icon name="CheckCircle" size={16} className="text-emerald-green" />
                        <span className="text-sm text-emerald-green font-lato">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-muted-bronze font-lato mb-1">Profile Completion</p>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-green h-2 rounded-full transition-all duration-300"
                      style={{ width: `${userProfile?.profile_completion_percentage || 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-lato font-medium text-midnight-navy">
                    {userProfile?.profile_completion_percentage || 0}%
                  </span>
                </div>
              </div>
            </div>
            
            {userProfile?.profile_completion_percentage < 80 && (
              <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-lg p-3 mt-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Info" size={16} className="text-emerald-green" />
                  <p className="text-sm text-midnight-navy font-lato">
                    Complete your profile to get better matches. 
                    <Button 
                      variant="link" 
                      className="text-emerald-green font-lato p-0 ml-1 h-auto"
                      onClick={() => navigate('/profile-creation-management')}
                    >
                      Update now
                    </Button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Daily Matches */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Matches Section */}
            <div className="bg-white border border-bronze/20 rounded-xl p-6 shadow-elevation-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-cinzel font-bold text-xl text-midnight-navy">
                    Today's Matches
                  </h2>
                  <p className="text-muted-bronze font-lato">
                    {matchLimit?.total === 'unlimited' 
                      ? `${matchLimit?.current} matches found`
                      : `${matchLimit?.current} of ${matchLimit?.total} ${matchLimit?.label}`
                    }
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/match-discovery-search')}
                  className="border-emerald-green text-emerald-green hover:bg-emerald-green hover:text-white"
                >
                  <Icon name="Search" size={16} className="mr-2" />
                  Explore More
                </Button>
              </div>

              {/* Match Cards */}
              {dailyMatches?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-emerald-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Heart" size={40} className="text-emerald-green" />
                  </div>
                  <h3 className="font-cinzel font-semibold text-lg text-midnight-navy mb-2">
                    No matches today
                  </h3>
                  <p className="text-muted-bronze font-lato mb-4">
                    Check back tomorrow for new matches based on your preferences
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/match-discovery-search')}
                    className="border-emerald-green text-emerald-green hover:bg-emerald-green hover:text-white"
                  >
                    Search Manually
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dailyMatches?.map((match) => (
                    <div key={match?.id} className="bg-white rounded-lg border border-bronze/20 p-4 shadow-elevation-1 hover:shadow-elevation-2 transition-all">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-emerald-green/10 rounded-full flex items-center justify-center">
                            <Icon name="User" size={20} className="text-emerald-green" />
                          </div>
                          {userTier !== 'intention' && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-green rounded-full flex items-center justify-center">
                              <Icon name="Check" size={10} className="text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-lato font-medium text-midnight-navy">
                            {userTier === 'intention' ? 'Premium Member' : match?.full_name}
                          </h3>
                          <p className="text-sm text-muted-bronze font-lato">
                            {match?.age} years • {match?.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-emerald-green font-lato font-medium">
                            {match?.compatibility}% match
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-muted-bronze font-lato line-clamp-2">
                          {userTier === 'intention' ?'Upgrade to view full profiles and express interest'
                            : match?.about_me
                          }
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant={userTier === 'intention' ? 'outline' : 'default'}
                          onClick={() => userTier === 'intention' ? navigate('/subscription-management') : handleExpressInterest(match?.id)}
                          className={userTier === 'intention' ?'border-emerald-green text-emerald-green hover:bg-emerald-green hover:text-white flex-1' :'bg-emerald-green hover:bg-emerald-green/90 text-white flex-1'
                          }
                        >
                          <Icon name="Heart" size={14} className="mr-1" />
                          {userTier === 'intention' ? 'Upgrade to Like' : 'Express Interest'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/profile-detail-view/${match?.id}`)}
                          className="border-bronze text-bronze hover:bg-bronze hover:text-white"
                        >
                          <Icon name="Eye" size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upgrade prompt for free users */}
              {userTier === 'intention' && (
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-green/5 to-bronze/5 border border-bronze/20 rounded-lg text-center">
                  <Icon name="Crown" size={24} className="text-bronze mx-auto mb-2" />
                  <h3 className="font-cinzel font-medium text-midnight-navy mb-1">
                    Unlock Premium Matrimonial Features
                  </h3>
                  <p className="text-sm text-muted-bronze font-lato mb-3">
                    Upgrade to see up to 3 matches per day, view full profiles, and express interest
                  </p>
                  <Button
                    onClick={() => navigate('/subscription-management')}
                    className="bg-emerald-green hover:bg-emerald-green/90 text-white"
                  >
                    View Subscription Plans
                  </Button>
                </div>
              )}
            </div>

            {/* FAQ Section */}
            <FAQSection />
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            {/* Enhanced Subscription Indicator */}
            <div className="bg-white border border-bronze/20 rounded-xl p-6 shadow-elevation-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-cinzel font-medium text-midnight-navy">Subscription Status</h3>
                <div className={`w-8 h-8 bg-${getTierColor(userTier)}/10 rounded-full flex items-center justify-center`}>
                  <Icon name={getTierIcon(userTier)} size={16} className={`text-${getTierColor(userTier)}`} />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className={`p-3 bg-${getTierColor(userTier)}/5 rounded-lg border border-${getTierColor(userTier)}/20`}>
                  <div className="flex items-center justify-between">
                    <span className="font-lato font-medium text-midnight-navy">
                      {userTier?.charAt(0)?.toUpperCase() + userTier?.slice(1)}
                    </span>
                    <span className={`text-sm font-lato text-${getTierColor(userTier)}`}>
                      {userTier === 'intention' ? 'Free' : 'Active'}
                    </span>
                  </div>
                </div>
                
                {userTier !== 'reliance' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/subscription-management')}
                    className="w-full border-emerald-green text-emerald-green hover:bg-emerald-green hover:text-white"
                  >
                    <Icon name="ArrowUp" size={14} className="mr-1" />
                    Upgrade Plan
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <QuickStatsWidget
              stats={userStats}
              userTier={userTier}
            />

            {/* Navigation Shortcuts */}
            <NavigationShortcuts
              userTier={userTier}
              unreadMessages={userProfile?.unread_messages || 0}
            />

            {/* Recent Activity */}
            <RecentActivityFeed
              activities={recentActivities}
              userTier={userTier}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnhancedDashboardHome;