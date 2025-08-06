import { supabase } from '../lib/supabase';

export const faqService = {
  async getFAQs() {
    try {
      const { data, error } = await supabase?.from('faqs')?.select('*')?.eq('is_active', true)?.order('display_order', { ascending: true });

      if (error) {
        return { data: [], error };
      }

      return { data: data || [], error: null };
    } catch (error) {
      return { 
        data: [], 
        error: { message: 'Failed to fetch FAQs' } 
      };
    }
  }
};