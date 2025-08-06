import { supabase } from '../lib/supabase';

class SecureApiService {
  constructor() {
    this.baseUrl = import.meta.env?.VITE_SUPABASE_URL;
    this.proxyEnabled = import.meta.env?.VITE_API_PROXY_ENABLED === 'true';
  }

  async makeSecureRequest(service, payload, endpoint) {
    if (!this.proxyEnabled) {
      throw new Error('API proxy is disabled. Enable VITE_API_PROXY_ENABLED in environment variables.');
    }

    try {
      const { data, error } = await supabase?.functions?.invoke('api-proxy', {
        body: { service, payload, endpoint }
      });

      if (error) {
        throw new Error(`API request failed: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error(`Secure API request failed for ${service}:`, error);
      throw error;
    }
  }

  async callOpenAI(payload, endpoint = 'chat/completions') {
    return this.makeSecureRequest('openai', payload, endpoint);
  }

  async callAnthropic(payload, endpoint = 'messages') {
    return this.makeSecureRequest('anthropic', payload, endpoint);
  }

  async callPerplexity(payload, endpoint = 'chat/completions') {
    return this.makeSecureRequest('perplexity', payload, endpoint);
  }
}

export const secureApiService = new SecureApiService();