import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionRefreshInterval, setSessionRefreshInterval] = useState(null);

  // Define fetchUserProfile before it's used
  const fetchUserProfile = useCallback(async (userId) => {
    if (!userId) return;
    
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single();

      if (error && error?.code !== 'PGRST116') {
        setError(error?.message);
        return;
      }

      setUserProfile(data || null);
    } catch (error) {
      setError('Failed to fetch user profile');
    }
  }, []);

  // Session refresh logic
  const refreshSession = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase?.auth?.refreshSession();
      if (error) {
        console.error('Session refresh failed:', error);
        // If refresh fails, sign out the user
        await signOut();
        return false;
      }
      return true;
    } catch (error) {
      console.error('Session refresh error:', error);
      await signOut();
      return false;
    }
  }, []);

  // Setup session refresh interval
  const setupSessionRefresh = useCallback(() => {
    // Clear existing interval
    if (sessionRefreshInterval) {
      clearInterval(sessionRefreshInterval);
    }

    // Set up new interval for 25 minutes (5 minutes before token expires)
    const interval = setInterval(async () => {
      await refreshSession();
    }, 25 * 60 * 1000);

    setSessionRefreshInterval(interval);
    
    return () => clearInterval(interval);
  }, [refreshSession, sessionRefreshInterval]);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase?.auth?.getSession();
        if (error) {
          if (mounted) setError(error?.message);
          return;
        }
        
        if (mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            await fetchUserProfile(session?.user?.id);
            setupSessionRefresh();
          }
        }
      } catch (error) {
        if (mounted) setError('Failed to get session');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserProfile(session?.user?.id);
          setupSessionRefresh();
        } else {
          setUserProfile(null);
          if (sessionRefreshInterval) {
            clearInterval(sessionRefreshInterval);
            setSessionRefreshInterval(null);
          }
        }
        
        setLoading(false);
        
        // Handle specific auth events
        if (event === 'SIGNED_IN') {
          setError(null);
        } else if (event === 'SIGNED_OUT') {
          setError(null);
          setUserProfile(null);
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Auth token refreshed successfully');
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
      if (sessionRefreshInterval) {
        clearInterval(sessionRefreshInterval);
      }
    };
  }, [fetchUserProfile, setupSessionRefresh, sessionRefreshInterval]);

  const signUp = async (email, password, userData = {}) => {
    try {
      setError(null);
      setLoading(true);
      
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) {
        setError(error?.message);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      const errorMessage = 'Failed to create account';
      setError(errorMessage);
      return { data: null, error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });

      if (error) {
        setError(error?.message);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (error) {
      const errorMessage = 'Failed to sign in';
      setError(errorMessage);
      return { data: null, error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      
      // Clear session refresh interval
      if (sessionRefreshInterval) {
        clearInterval(sessionRefreshInterval);
        setSessionRefreshInterval(null);
      }
      
      const { error } = await supabase?.auth?.signOut();
      if (error) {
        setError(error?.message);
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      const errorMessage = 'Failed to sign out';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const updateProfile = async (updates) => {
    try {
      setError(null);
      if (!user) {
        const errorMessage = 'No user signed in';
        setError(errorMessage);
        return { data: null, error: { message: errorMessage } };
      }

      const { data, error } = await supabase?.from('user_profiles')?.update({ 
          ...updates, 
          updated_at: new Date()?.toISOString() 
        })?.eq('id', user?.id)?.select()?.single();

      if (error) {
        setError(error?.message);
        return { data: null, error };
      }

      setUserProfile(data);
      return { data, error: null };
    } catch (error) {
      const errorMessage = 'Failed to update profile';
      setError(errorMessage);
      return { data: null, error: { message: errorMessage } };
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      const { error } = await supabase?.auth?.resetPasswordForEmail(email, {
        redirectTo: `${window.location?.origin}/reset-password`
      });

      if (error) {
        setError(error?.message);
        return { error };
      }

      return { error: null };
    } catch (error) {
      const errorMessage = 'Failed to send reset email';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      setError(null);
      const { error } = await supabase?.auth?.updateUser({
        password: newPassword
      });

      if (error) {
        setError(error?.message);
        return { error };
      }

      return { error: null };
    } catch (error) {
      const errorMessage = 'Failed to update password';
      setError(errorMessage);
      return { error: { message: errorMessage } };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    updatePassword,
    refreshSession,
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;