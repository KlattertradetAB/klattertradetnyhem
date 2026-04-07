import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../gemenskap/services/supabase';
import { Profile, AuthStatus } from '../gemenskap/types';

interface AuthContextType {
  user: Profile | null;
  status: AuthStatus;
  isLoading: boolean;
  isPremium: boolean;
  isAdmin: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.IDLE);
  const [isLoading, setIsLoading] = useState(true);
  const hasTrackedLogin = React.useRef(false);
  const initializingRef = React.useRef(false);
  const pendingUserRef = React.useRef<string | null>(null);

  const fetchProfile = async (userId: string, authUser: any) => {
    // Prevent overlapping calls for the same user
    if (pendingUserRef.current === userId) return;
    pendingUserRef.current = userId;

    try {
      // 1. Core Profile Fetch
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        // Ignore AbortErrors that happen during unmount/remount
        if (error.message?.includes('AbortError') || error.message?.includes('signal is aborted')) {
          return;
        }
        console.warn('Profile fetch error:', error);
        throw error;
      }
      
      let profileData = data;
      
      // 2. Profile Creation (if missing)
      if (!profileData) {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: authUser.email,
            full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Medlem',
            membership_level: 1,
            membership_active: true,
            role: 'medlem'
          })
          .select()
          .single();
        
        if (insertError) {
          console.error('Failed to create initial profile:', insertError);
        } else {
          profileData = newProfile;
        }
      }

      // 3. Populate User State
      if (profileData) {
        const p = profileData as any;
        let role = p.role || 'medlem';
        const email = authUser.email?.toLowerCase() || '';
        const name = (authUser.user_metadata?.full_name || '').toLowerCase();
        
        // Admin override for Jeanette
        if (
          email === 'jeanettejohansson1989@gmail.com' || 
          email.includes('jeanette') || 
          email.includes('jenatte') || 
          name.includes('jeanette') || 
          name.includes('jenatte')
        ) {
          role = 'admin';
        }

        setUser({
          id: p.id,
          email: p.email,
          full_name: p.full_name,
          membership_level: p.membership_level ?? 1,
          membership_active: p.membership_active ?? true,
          role: role,
          avatar_url: p.avatar_url,
          accepted_terms: p.accepted_terms || [],
          login_count: p.login_count || 0,
          last_login: p.last_login,
          timezone: p.timezone,
          last_localization: p.last_localization,
        });
        setStatus(AuthStatus.AUTHENTICATED);
      }

      // 4. Non-Blocking Metadata Tracking
      if (profileData && !hasTrackedLogin.current) {
        hasTrackedLogin.current = true;
        try {
          const p = profileData as any;
          await Promise.all([
            supabase.from('profiles').update({
              last_login: new Date().toISOString(),
              login_count: (p.login_count || 0) + 1,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              last_localization: navigator.language
            }).eq('id', userId),
            
            supabase.from('login_events').insert({
              user_id: userId,
              metadata: {
                url: window.location.href,
                user_agent: navigator.userAgent,
                localization: navigator.language
              }
            })
          ]);
        } catch (trackErr) {
          console.warn('Metadata tracking omitted (missing table or RLS):', trackErr);
        }
      }
    } catch (err: any) {
      if (!err.message?.includes('AbortError') && !err.message?.includes('signal is aborted')) {
        console.error('Critical Error in fetchProfile:', err);
      }
    } finally {
      pendingUserRef.current = null;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 1. Setup the Auth State Change Listener
    // This listener handles INITIAL_SESSION, SIGNED_IN, SIGNED_OUT, etc.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`[Auth] Event: ${event}`, !!session ? 'Session Active' : 'No Session');
      
      if (session) {
        await fetchProfile(session.user.id, session.user);
      } else {
        setStatus(AuthStatus.UNAUTHENTICATED);
        setUser(null);
        hasTrackedLogin.current = false;
        setIsLoading(false);
      }
    });

    // 2. Check for initial session if onAuthStateChange hasn't fired yet
    // Some older environments might not fire INITIAL_SESSION immediately
    const checkInitial = async () => {
      if (initializingRef.current) return;
      initializingRef.current = true;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && !user) {
          await fetchProfile(session.user.id, session.user);
        } else if (!session) {
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    };

    checkInitial();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setStatus(AuthStatus.UNAUTHENTICATED);
      hasTrackedLogin.current = false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await fetchProfile(session.user.id, session.user);
    }
  };

  const isPremium = user?.membership_level !== undefined && user.membership_level !== null && user.membership_level >= 2;
  const isAdmin = user?.role === 'admin' || (user?.email?.toLowerCase() === 'jeanettejohansson1989@gmail.com');

  return (
    <AuthContext.Provider value={{ 
      user, 
      status, 
      isLoading, 
      isPremium, 
      isAdmin,
      logout,
      refreshProfile
    }}>
      {!isLoading ? children : (
        <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-[9999]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="text-orange-500/50 text-xs font-black uppercase tracking-[0.2em] animate-pulse">Laddar Horizonten...</p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

