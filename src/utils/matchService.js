import { supabase } from '../lib/supabase';

export const matchService = {
  async getDailyMatches(limit = 3) {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { data: [], error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase?.rpc('get_daily_matches', {
          target_user_id: user?.id,
          match_limit: limit
        });

      if (error) {
        return { data: [], error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      return { 
        data: [], 
        error: { message: 'Failed to fetch daily matches' } 
      };
    }
  },

  async getUserMatches() {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { data: [], error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase?.from('matches')?.select(`
          *,
          matched_user:user_profiles!matches_matched_user_id_fkey(
            id,
            full_name,
            age,
            location,
            profession,
            is_verified
          ),
          matched_user_photo:user_photos!user_photos_user_id_fkey(
            photo_url,
            is_blurred
          )
        `)?.eq('user_id', user?.id)?.order('created_at', { ascending: false });

      if (error) {
        return { data: [], error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      return { 
        data: [], 
        error: { message: 'Failed to fetch matches' } 
      };
    }
  },

  async expressInterest(matchedUserId, action = 'liked') {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data, error } = await supabase?.from('matches')?.upsert({
          user_id: user?.id,
          matched_user_id: matchedUserId,
          user_action: action,
          status: action,
          updated_at: new Date()?.toISOString()
        })?.select()?.single();

      if (error) {
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      return { 
        data: null, 
        error: { message: 'Failed to express interest' } 
      };
    }
  },

  async getCompatibilityScore(userId1, userId2) {
    // Simple compatibility calculation based on shared attributes
    try {
      const { data: profiles, error } = await supabase?.from('user_profiles')?.select('id, location, education_level, prayer_frequency, marital_status, age')?.in('id', [userId1, userId2]);

      if (error || !profiles || profiles?.length !== 2) {
        return { score: 0, error };
      }

      const [profile1, profile2] = profiles;
      let score = 50; // Base score

      // Location match
      if (profile1?.location === profile2?.location) score += 15;
      
      // Education level compatibility  
      if (profile1?.education_level === profile2?.education_level) score += 10;
      
      // Prayer frequency match
      if (profile1?.prayer_frequency === profile2?.prayer_frequency) score += 15;
      
      // Marital status understanding
      if (profile1?.marital_status === profile2?.marital_status) score += 5;
      
      // Age compatibility (within 5 years)
      const ageDiff = Math.abs((profile1?.age || 30) - (profile2?.age || 30));
      if (ageDiff <= 5) score += 5;

      return { score: Math.min(score, 100), error: null };
    } catch (error) {
      return { 
        score: 0, 
        error: { message: 'Failed to calculate compatibility' } 
      };
    }
  }
};