import { useState, useCallback } from 'react';
import aiService from '../services/aiService';

/**
 * Custom hook for AI-powered features
 * Provides state management and error handling for AI operations
 */
export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeAIOperation = useCallback(async (operation) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await operation();
      setLoading(false);
      return result;
    } catch (err) {
      setError(err?.message || 'AI operation failed');
      setLoading(false);
      throw err;
    }
  }, []);

  const getChatResponse = useCallback(async (message, systemPrompt) => {
    return executeAIOperation(() => aiService?.getChatCompletion(message, systemPrompt));
  }, [executeAIOperation]);

  const generateProfileSuggestions = useCallback(async (userProfile, preferences) => {
    return executeAIOperation(() => aiService?.generateProfileSuggestions(userProfile, preferences));
  }, [executeAIOperation]);

  const generateConversationStarters = useCallback(async (userProfile, matchProfile) => {
    return executeAIOperation(() => aiService?.generateConversationStarters(userProfile, matchProfile));
  }, [executeAIOperation]);

  const analyzeCompatibility = useCallback(async (user1Profile, user2Profile) => {
    return executeAIOperation(() => aiService?.analyzeCompatibility(user1Profile, user2Profile));
  }, [executeAIOperation]);

  const moderateContent = useCallback(async (text) => {
    return executeAIOperation(() => aiService?.moderateContent(text));
  }, [executeAIOperation]);

  const generateMatchmakingInsights = useCallback(async (userProfile, recentMatches) => {
    return executeAIOperation(() => aiService?.generateMatchmakingInsights(userProfile, recentMatches));
  }, [executeAIOperation]);

  return {
    loading,
    error,
    getChatResponse,
    generateProfileSuggestions,
    generateConversationStarters,
    analyzeCompatibility,
    moderateContent,
    generateMatchmakingInsights,
  };
};

export default useAI;