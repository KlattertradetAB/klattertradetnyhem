
import { Profile } from '../types';

/**
 * Mocks the Supabase logic provided in the prompt.
 * In a real app, you would use: 
 * import { createClient } from '@supabase/supabase-js'
 */
export const loginMock = async (email: string, password: string): Promise<{ data: Profile | null, error: string | null }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // For demo purposes, we accept any valid email format
  // Level 2 is required by Horizonten based on the prompt.
  if (email.includes('error')) {
    return { data: null, error: "Inloggning misslyckades. Kontrollera dina uppgifter." };
  }

  if (email.includes('level1')) {
    return { 
      data: null, 
      error: "Du har inte aktivt medlemskap nivå 2. Kontakta supporten." 
    };
  }

  // Success case
  return {
    data: {
      id: 'mock-id-123',
      email: email,
      membership_level: 2,
      membership_active: true,
      full_name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    },
    error: null
  };
};
