import { createClient } from '@supabase/supabase-js';

// Use provided credentials or environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wxexynzypbzaiztjzqki.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_26OPGxN2l1bAEqJOL0GEcQ_hnwOUarb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock Data for Preview (Fallback if DB is empty)
export const MOCK_PRODUCTS = [];
