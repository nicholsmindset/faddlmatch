import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import SubscriptionIndicator from '../../components/ui/SubscriptionIndicator';
import WelcomeHeader from './components/WelcomeHeader';
import DailyMatchCard from './components/DailyMatchCard';
import QuickStatsWidget from './components/QuickStatsWidget';
import RecentActivityFeed from './components/RecentActivityFeed';
import NavigationShortcuts from './components/NavigationShortcuts';
import FAQSection from './components/FAQSection';
import LandingPage from '../../components/LandingPage';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { matchService } from '../../utils/matchService';
import { subscriptionService } from '../../utils/subscriptionService';

const DashboardHome = () => {
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
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground font-caption">Loading...</p>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground font-caption">Loading your matches...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <p className="text-destructive text-sm">{error}</p>
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

        {/* Welcome Header */}
        <WelcomeHeader
          userName={userProfile?.full_name}
          userTier={userTier}
          completionPercentage={userProfile?.profile_completion_percentage}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Daily Matches */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Matches Section */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-heading font-bold text-xl text-foreground">
                    Today's Matches
                  </h2>
                  <p className="text-muted-foreground font-caption">
                    {matchLimit?.total === 'unlimited' 
                      ? `${matchLimit?.current} matches found`
                      : `${matchLimit?.current} of ${matchLimit?.total} ${matchLimit?.label}`
                    }
                  </p>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => navigate('/match-discovery-search')}
                  iconName="Search"
                  iconPosition="left"
                  iconSize={16}
                >
                  Explore More
                </Button>
              </div>

              {/* Match Cards */}
              {dailyMatches?.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="Heart" size={64} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    No matches today
                  </h3>
                  <p className="text-muted-foreground font-caption mb-4">
                    Check back tomorrow for new matches
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/match-discovery-search')}
                  >
                    Search Manually
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dailyMatches?.map((match) => (
                    <DailyMatchCard
                      key={match?.id}
                      match={match}
                      userTier={userTier}
                      onExpressInterest={handleExpressInterest}
                    />
                  ))}
                </div>
              )}

              {/* Upgrade prompt for free users */}
              {userTier === 'intention' && (
                <div className="mt-6 p-4 bg-premium-purple/5 border border-premium-purple/20 rounded-lg text-center">
                  <Icon name="Crown" size={24} className="text-premium-purple mx-auto mb-2" />
                  <h3 className="font-medium text-premium-purple mb-1">
                    Get More Daily Matches
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Upgrade to see up to 3 matches per day and unlock premium features
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/subscription-management')}
                    className="text-premium-purple border-premium-purple hover:bg-premium-purple hover:text-white"
                  >
                    View Plans
                  </Button>
                </div>
              )}
            </div>

            {/* FAQ Section */}
            <FAQSection />
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            {/* Subscription Indicator */}
            <SubscriptionIndicator
              tier={userTier}
              showUpgrade={userTier !== 'reliance'}
              showUsage={userTier !== 'intention'}
              usageData={userTier !== 'intention' ? [
                { label: 'Daily matches', used: dailyMatches?.length, total: userTier === 'patience' ? 3 : 999 },
                { label: 'Profile views', used: 24, total: userTier === 'patience' ? 50 : 999 }
              ] : null}
            />

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

export default DashboardHome;