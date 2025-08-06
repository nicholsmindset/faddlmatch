import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';

// Supabase client - define a local replacement or import from your Supabase setup
const supabase = {
  from: (table) => ({
    select: (columns) => ({
      eq: (column, value) => ({
        limit: (limitValue) => ({
          order: (orderColumn, options) => ({
            // Mock implementation - replace with actual Supabase client
            then: () => Promise.resolve({ data: [], error: null })
          })
        }),
        single: () => ({
          // Mock implementation - replace with actual Supabase client
          then: () => Promise.resolve({ data: {}, error: null })
        })
      })
    }),
    update: (updates) => ({
      eq: (column, value) => ({
        select: () => ({
          single: () => ({
            // Mock implementation - replace with actual Supabase client
            then: () => Promise.resolve({ data: {}, error: null })
          })
        })
      })
    })
  })
};

// Custom hook for authenticated queries
export const useAuthenticatedQuery = (key, queryFn, options = {}) => {
  const { user, loading: authLoading } = useAuth();

  return useQuery({
    queryKey: Array.isArray(key) ? ['auth', user?.id, ...key] : ['auth', user?.id, key],
    queryFn: queryFn,
    enabled: !!user && !authLoading && (options?.enabled !== false),
    ...options,
  });
};

// Custom hook for authenticated mutations
export const useAuthenticatedMutation = (mutationFn, options = {}) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutationFn,
    onSuccess: (data, variables, context) => {
      // Invalidate user-specific queries on successful mutations
      queryClient?.invalidateQueries({ queryKey: ['auth', user?.id] });
      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};

// Custom hook for matches data with caching
export const useMatches = (limit = 10) => {
  const { user } = useAuth();
  
  return useAuthenticatedQuery(
    ['matches', limit],
    async () => {
      const { data, error } = await supabase?.from('matches')?.select('*')?.eq('user_id', user?.id)?.limit(limit)?.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    {
      staleTime: 2 * 60 * 1000, // 2 minutes for matches
      cacheTime: 5 * 60 * 1000, // 5 minutes cache
    }
  );
};

// Custom hook for user profile with optimistic updates
export const useUserProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const query = useAuthenticatedQuery(
    'profile',
    async () => {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', user?.id)?.single();
      
      if (error) throw error;
      return data;
    }
  );

  const updateProfile = useAuthenticatedMutation(
    async (updates) => {
      const { data, error } = await supabase?.from('user_profiles')?.update({ ...updates, updated_at: new Date()?.toISOString() })?.eq('id', user?.id)?.select()?.single();
      
      if (error) throw error;
      return data;
    },
    {
      onMutate: async (newProfileData) => {
        // Cancel outgoing refetches
        await queryClient?.cancelQueries({ queryKey: ['auth', user?.id, 'profile'] });
        
        // Snapshot previous value
        const previousProfile = queryClient?.getQueryData(['auth', user?.id, 'profile']);
        
        // Optimistically update
        queryClient?.setQueryData(['auth', user?.id, 'profile'], (old) => ({
          ...old,
          ...newProfileData
        }));
        
        return { previousProfile };
      },
      onError: (err, newProfile, context) => {
        // Rollback on error
        queryClient?.setQueryData(['auth', user?.id, 'profile'], context?.previousProfile);
      },
      onSettled: () => {
        // Refetch after error or success
        queryClient?.invalidateQueries({ queryKey: ['auth', user?.id, 'profile'] });
      },
    }
  );

  return {
    ...query,
    updateProfile,
  };
};