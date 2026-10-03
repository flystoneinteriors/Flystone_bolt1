import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  detectSessionInUrl: true,
  storageKey: 'flystone-auth',
  storage: window.localStorage,
  flowType: 'implicit',
  debug: false,
  },
});

export const STORAGE_BUCKET = 'portfolio';

export type PortfolioImage = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  image_url: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
};

export type ContactQuery = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service_type: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
