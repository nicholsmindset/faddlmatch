import { secureApiService } from './secureApiService';

/**
 * AI Service for OpenAI API interactions
 * All calls are routed through the secure API proxy (Supabase Edge Function)
 */

export const getChatCompletion = async (userMessage, systemPrompt = 'You are a helpful assistant for a Muslim dating platform.') => {
  try {
    const response = await secureApiService?.callOpenAI({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return response?.choices?.[0]?.message?.content;
  } catch (error) {
    console.error('Error in chat completion:', error);
    throw new Error('Failed to generate AI response');
  }
};

export const getStreamingChatCompletion = async (userMessage, onChunk, systemPrompt = 'You are a helpful assistant for a Muslim dating platform.') => {
  // Streaming via proxy not implemented; fallback to non-streaming for production safety
  const full = await getChatCompletion(userMessage, systemPrompt);
  if (full) onChunk(full);
};

export const generateProfileSuggestions = async (userProfile, preferences) => {
  try {
    const prompt = `Based on this user profile: ${JSON.stringify(userProfile)} and preferences: ${JSON.stringify(preferences)}, provide profile improvement suggestions.`;

    const response = await secureApiService?.callOpenAI({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert relationship advisor for Muslim dating. Provide respectful, culturally appropriate suggestions for profile improvement.'
        },
        { role: 'user', content: prompt },
      ]
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error generating profile suggestions:', error);
    throw new Error('Failed to generate profile suggestions');
  }
};

export const generateConversationStarters = async (userProfile, matchProfile) => {
  try {
    const prompt = `Generate appropriate conversation starters between these two Muslim users:\n    User 1: ${JSON.stringify(userProfile)}\n    User 2: ${JSON.stringify(matchProfile)}\n    Focus on shared interests, values, and respectful topics.`;

    const response = await secureApiService?.callOpenAI({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a relationship expert helping Muslim users start meaningful conversations. Provide respectful, engaging conversation starters.'
        },
        { role: 'user', content: prompt },
      ]
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error generating conversation starters:', error);
    throw new Error('Failed to generate conversation starters');
  }
};

export const analyzeCompatibility = async (user1Profile, user2Profile) => {
  try {
    const prompt = `Analyze compatibility between these two Muslim users:\n    User 1: ${JSON.stringify(user1Profile)}\n    User 2: ${JSON.stringify(user2Profile)}\n    Consider religious values, lifestyle, goals, and personality traits.`;

    const response = await secureApiService?.callOpenAI({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a relationship compatibility expert specializing in Muslim relationships. Provide detailed compatibility analysis.'
        },
        { role: 'user', content: prompt },
      ]
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error analyzing compatibility:', error);
    throw new Error('Failed to analyze compatibility');
  }
};

export const moderateContent = async (text) => {
  try {
    const response = await secureApiService?.callOpenAI({
      model: 'omni-moderation-latest',
      input: text,
    }, 'moderations');

    return response?.results?.[0];
  } catch (error) {
    console.error('Error moderating content:', error);
    throw new Error('Failed to moderate content');
  }
};

export const generateMatchmakingInsights = async (userProfile, recentMatches) => {
  try {
    const prompt = `Based on this user profile: ${JSON.stringify(userProfile)} and recent matches: ${JSON.stringify(recentMatches)}, provide personalized matchmaking insights and recommendations.`;

    const response = await secureApiService?.callOpenAI({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a professional matchmaker with expertise in Muslim relationships. Provide insightful analysis and recommendations.'
        },
        { role: 'user', content: prompt },
      ]
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error generating matchmaking insights:', error);
    throw new Error('Failed to generate matchmaking insights');
  }
};

export const aiService = {
  getChatCompletion,
  getStreamingChatCompletion,
  generateProfileSuggestions,
  generateConversationStarters,
  analyzeCompatibility,
  moderateContent,
  generateMatchmakingInsights,

  async generateCompatibilityAnalysis(userProfile, targetProfile) {
    try {
      const prompt = this.buildCompatibilityPrompt(userProfile, targetProfile);

      const response = await secureApiService?.callOpenAI({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a professional matchmaking consultant specializing in Islamic marriage compatibility. Provide thoughtful, respectful analysis based on shared values, life goals, and Islamic principles.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      return {
        data: response?.choices?.[0]?.message?.content || 'Unable to generate analysis',
        error: null
      };
    } catch (error) {
      console.error('Compatibility analysis error:', error);
      return {
        data: null,
        error: { message: 'Failed to generate compatibility analysis' }
      };
    }
  },

  async generateConversationStarter(userProfile, targetProfile) {
    try {
      const prompt = this.buildConversationPrompt(userProfile, targetProfile);

      const response = await secureApiService?.callOpenAI({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that suggests respectful conversation starters for Muslim singles. Keep suggestions appropriate, Islamic-focused, and genuine.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.8
      });

      return {
        data: response?.choices?.[0]?.message?.content || "Hello! I'd love to get to know you better.",
        error: null
      };
    } catch (error) {
      console.error('Conversation starter error:', error);
      return {
        data: null,
        error: { message: 'Failed to generate conversation starter' }
      };
    }
  }
};

export default aiService;