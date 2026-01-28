import { supabase } from './supabase';
import { Profile } from '../types';

export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Fetch profile to get role and membership_level
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile) {
    return {
      ...profile,
      email: user.email, // Ensure email is from auth
    } as Profile;
  }

  return null;
};

// Deprecated mock - kept briefly if needed for transition, but directing to new flows
export const loginMock = async (email: string, password: string): Promise<{ data: Profile | null, error: string | null }> => {
  console.warn("Using deprecated loginMock. Please switch to signIn.");
  return await signIn(email, password)
    .then(async ({ data, error }) => {
      if (error) return { data: null, error: error.message };
      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        return { data: profile as Profile, error: null };
      }
      return { data: null, error: "Unknown error" };
    });
};
