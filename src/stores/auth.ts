import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  full_name?: string;
  role?: 'admin' | 'customer';
}

interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: any | null) => void;
  checkSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  checkSession: async () => {
    if (!supabase) {
      set({ loading: false });
      return;
    }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ session });
      if (session?.user) {
        // Fetch additional user data from public.users table if needed
        // For now, just use auth user metadata
        set({ 
          user: { 
            id: session.user.id, 
            email: session.user.email!,
            full_name: session.user.user_metadata?.full_name,
            role: session.user.user_metadata?.role || 'customer'
          } 
        });
      }
    } catch (error) {
      console.error('Session check failed', error);
    } finally {
      set({ loading: false });
    }
  },
  signOut: async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    set({ user: null, session: null });
  },
}));
