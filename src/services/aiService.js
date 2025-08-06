import openai from '../lib/openai';
import { secureApiService } from './secureApiService';

/**
 * AI Service for OpenAI API interactions
 * Provides various AI-powered features for the dating platform
 */

/**
 * Generates a chat completion response based on user input.
 * @param {string} userMessage - The user's input message.
 * @param {string} systemPrompt - Optional system prompt for context.
 * @returns {Promise<string>} The assistant's response.
 */
export const getChatCompletion = async (userMessage, systemPrompt = 'You are a helpful assistant for a Muslim dating platform.') => {
  try {
    const response = await openai?.chat?.completions?.create({
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

/**
 * Streams a chat completion response chunk by chunk.
 * @param {string} userMessage - The user's input message.
 * @param {Function} onChunk - Callback to handle each streamed chunk.
 * @param {string} systemPrompt - Optional system prompt for context.
 */
export const getStreamingChatCompletion = async (userMessage, onChunk, systemPrompt = 'You are a helpful assistant for a Muslim dating platform.') => {
  try {
    const stream = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk?.choices?.[0]?.delta?.content || '';
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error('Error in streaming chat completion:', error);
    throw new Error('Failed to stream AI response');
  }
};

/**
 * Generates structured profile suggestions based on user preferences.
 * @param {Object} userProfile - User's profile data.
 * @param {Object} preferences - User's partner preferences.
 * @returns {Promise<Object>} Structured profile suggestions.
 */
export const generateProfileSuggestions = async (userProfile, preferences) => {
  try {
    const prompt = `Based on this user profile: ${JSON.stringify(userProfile)} and preferences: ${JSON.stringify(preferences)}, provide profile improvement suggestions.`;
    
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are an expert relationship advisor for Muslim dating. Provide respectful, culturally appropriate suggestions for profile improvement.' 
        },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'profile_suggestions',
          schema: {
            type: 'object',
            properties: {
              suggestions: { 
                type: 'array', 
                items: { type: 'string' } 
              },
              priority_areas: { 
                type: 'array', 
                items: { type: 'string' } 
              },
              compatibility_score: { type: 'number' },
            },
            required: ['suggestions', 'priority_areas', 'compatibility_score'],
            additionalProperties: false,
          },
        },
      },
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error generating profile suggestions:', error);
    throw new Error('Failed to generate profile suggestions');
  }
};

/**
 * Generates conversation starters between matched users.
 * @param {Object} userProfile - Current user's profile.
 * @param {Object} matchProfile - Matched user's profile.
 * @returns {Promise<Object>} Conversation starter suggestions.
 */
export const generateConversationStarters = async (userProfile, matchProfile) => {
  try {
    const prompt = `Generate appropriate conversation starters between these two Muslim users:
    User 1: ${JSON.stringify(userProfile)}
    User 2: ${JSON.stringify(matchProfile)}
    Focus on shared interests, values, and respectful topics.`;
    
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are a relationship expert helping Muslim users start meaningful conversations. Provide respectful, engaging conversation starters.' 
        },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'conversation_starters',
          schema: {
            type: 'object',
            properties: {
              starters: { 
                type: 'array', 
                items: { type: 'string' } 
              },
              topics: { 
                type: 'array', 
                items: { type: 'string' } 
              },
            },
            required: ['starters', 'topics'],
            additionalProperties: false,
          },
        },
      },
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error generating conversation starters:', error);
    throw new Error('Failed to generate conversation starters');
  }
};

/**
 * Analyzes compatibility between two users.
 * @param {Object} user1Profile - First user's profile.
 * @param {Object} user2Profile - Second user's profile.
 * @returns {Promise<Object>} Compatibility analysis.
 */
export const analyzeCompatibility = async (user1Profile, user2Profile) => {
  try {
    const prompt = `Analyze compatibility between these two Muslim users:
    User 1: ${JSON.stringify(user1Profile)}
    User 2: ${JSON.stringify(user2Profile)}
    Consider religious values, lifestyle, goals, and personality traits.`;
    
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are a relationship compatibility expert specializing in Muslim relationships. Provide detailed compatibility analysis.' 
        },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'compatibility_analysis',
          schema: {
            type: 'object',
            properties: {
              overall_score: { type: 'number' },
              strengths: { 
                type: 'array', 
                items: { type: 'string' } 
              },
              potential_challenges: { 
                type: 'array', 
                items: { type: 'string' } 
              },
              recommendations: { 
                type: 'array', 
                items: { type: 'string' } 
              },
            },
            required: ['overall_score', 'strengths', 'potential_challenges', 'recommendations'],
            additionalProperties: false,
          },
        },
      },
    });

    return JSON.parse(response?.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error analyzing compatibility:', error);
    throw new Error('Failed to analyze compatibility');
  }
};

/**
 * Moderates text content for appropriateness.
 * @param {string} text - The text to moderate.
 * @returns {Promise<Object>} Moderation results.
 */
export const moderateContent = async (text) => {
  try {
    const response = await openai?.moderations?.create({
      model: 'text-moderation-latest',
      input: text,
    });

    return response?.results?.[0];
  } catch (error) {
    console.error('Error moderating content:', error);
    throw new Error('Failed to moderate content');
  }
};

/**
 * Generates personalized matchmaking insights.
 * @param {Object} userProfile - User's profile data.
 * @param {Array} recentMatches - Recent matches data.
 * @returns {Promise<Object>} Matchmaking insights.
 */
export const generateMatchmakingInsights = async (userProfile, recentMatches) => {
  try {
    const prompt = `Based on this user profile: ${JSON.stringify(userProfile)} and recent matches: ${JSON.stringify(recentMatches)}, provide personalized matchmaking insights and recommendations.`;
    
    const response = await openai?.chat?.completions?.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: 'You are a professional matchmaker with expertise in Muslim relationships. Provide insightful analysis and recommendations.' 
        },
        { role: 'user', content: prompt },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'matchmaking_insights',
          schema: {
            type: 'object',
            properties: {
              insights: { 
                type: 'array', 
                items: { type: 'string' } 
              },
              recommendations: { 
                type: 'array', 
                items: { type: 'string' } 
              },
              success_probability: { type: 'number' },
            },
            required: ['insights', 'recommendations', 'success_probability'],
            additionalProperties: false,
          },
        },
      },
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
      
      // Use secure API proxy instead of direct API calls
      const response = await secureApiService?.callOpenAI({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional matchmaking consultant specializing in Islamic marriage compatibility. Provide thoughtful, respectful analysis based on shared values, life goals, and Islamic principles."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      return {
        data: response?.choices?.[0]?.message?.content || "Unable to generate analysis",
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
      
      // Use secure API proxy
      const response = await secureApiService?.callOpenAI({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that suggests respectful conversation starters for Muslim singles. Keep suggestions appropriate, Islamic-focused, and genuine."
          },
          {
            role: "user",
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