import React, { useState, useEffect } from 'react';
import { AuthStatus, Profile } from './types';
import { Page } from '../types';
import LoginForm from './components/LoginForm';
import PremiumLogin from './components/PremiumLogin';
import UpdatePasswordForm from './components/UpdatePasswordForm';
import { Hero } from '../components/hero';
import { GL } from '../components/gl';
import { supabase } from './services/supabase';
import Dashboard from './components/Dashboard';
import ChatPage from './components/ChatPage';
import AIConsultant from './components/AIConsultant';
import Welcome from './components/Welcome';
import Experts from './components/Experts';
import Footer from './components/Footer';
import AdminDashboard from './components/Admin/AdminDashboard';
import AssociationTab from './components/AssociationTab';
import Resources from './components/Resources';
import { LogOut, LayoutGrid, MessageSquare, ArrowLeft, Menu, X, Users, Bot, MessageCircle, Settings, Home, ChevronLeft, Shield, Package } from 'lucide-react';
import { SettingsModal } from './components/SettingsModal';
import { InstallButton } from './components/InstallButton';
import AssistantFab from './components/Assistant/AssistantFab';
import { getEffectiveAvatar } from './services/userUtils';
import { AssistantProvider } from './contexts/AssistantContext';
import { translations } from './translations';
import { CommunityLayout } from './components/layout/CommunityLayout';


interface GemenskapAppProps {
  onBackToSite: (page?: Page) => void;
  initialTab?: 'welcome' | 'dashboard' | 'resources' | 'chat' | 'experts' | 'admin';
}

export const GemenskapApp: React.FC<GemenskapAppProps> = ({ onBackToSite, initialTab }) => {
  // 1. State Declarations (MUST be at the top)
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.IDLE);
  const [user, setUser] = useState<Profile | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState<'welcome' | 'dashboard' | 'resources' | 'chat' | 'experts' | 'admin' | 'consultant'>(initialTab || 'welcome');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPremiumIntro, setShowPremiumIntro] = useState(false);
  const [isPremiumView, setIsPremiumView] = useState(true);
  const [initialView, setInitialView] = useState<'login' | 'signup' | 'forgot'>('login');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [navHistory, setNavHistory] = useState<{ tab: string; topic: string | null }[]>([]);
  const [isStandalone, setIsStandalone] = useState(false);

  // No association state here anymore

  // 2. Effects
  useEffect(() => {
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(!!isStandaloneMode);
  }, []);

  useEffect(() => {
    const handleHashRouting = () => {
      const hash = window.location.hash;

      if (hash.includes('#premium-login')) {
        // Bypass intro splash and go straight to login
        setShowPremiumIntro(false);
        setShowLogin(true);
        setIsPremiumView(true);
        setInitialView('login');
      } else if (hash.includes('#login')) {
        setShowLogin(true);
        setShowPremiumIntro(false);
        setIsPremiumView(false);
        setInitialView('login');
      } else if (hash.includes('#signup')) {
        setShowLogin(true);
        setShowPremiumIntro(false);
        setIsPremiumView(false);
        setInitialView('signup');
      } else if (hash.includes('#chat')) {
        setShowLogin(false);
        setShowPremiumIntro(false);
        setActiveTab('chat');
        // Extract topic if present (e.g. #chat?topic=self-care)
        const params = new URLSearchParams(hash.split('?')[1]);
        const topic = params.get('topic');
        if (topic) setSelectedTopic(topic);
      } else if (hash.includes('#welcome')) {
        setShowLogin(false);
        setShowPremiumIntro(false);
        setActiveTab('welcome');
      } else if (hash.includes('#experts')) {
        setShowLogin(false);
        setShowPremiumIntro(false);
        setActiveTab('experts');
      } else if (hash.includes('#dashboard')) {
        setShowLogin(false);
        setShowPremiumIntro(false);
        setActiveTab('dashboard');
      } else if (hash.includes('#association')) {
        // Association moved to public community page, redirect back to welcome
        setShowLogin(false);
        setShowPremiumIntro(false);
        setActiveTab('welcome');
      } else if (hash.includes('#admin')) {
        setShowLogin(false);
        setShowPremiumIntro(false);
        setActiveTab('admin');
      } else if (hash.includes('#consultant')) {
        setShowLogin(false);
        setShowPremiumIntro(false);
        setActiveTab('consultant');
        const params = new URLSearchParams(hash.split('?')[1]);
        const topic = params.get('topic');
        if (topic) setSelectedTopic(topic);
      } else if (hash.includes('#update-password')) {
        setShowLogin(true);
        setShowPremiumIntro(false);
        setIsUpdatingPassword(true);
      } else {
        setShowLogin(false);
        setShowPremiumIntro(false);
        setIsUpdatingPassword(false);
      }

      // Sync internal history with hash changes if needed
      const currentTab = hash.split('?')[0].replace('#', '') || 'welcome';
      const params = hash.includes('?') ? new URLSearchParams(hash.split('?')[1]) : null;
      const currentTopic = params ? params.get('topic') : null;

      setNavHistory(prev => {
        const last = prev[prev.length - 1];
        if (last && last.tab === currentTab && last.topic === currentTopic) return prev;
        return [...prev, { tab: currentTab, topic: currentTopic }];
      });
    };

    handleHashRouting();
    window.addEventListener('hashchange', handleHashRouting);
    return () => window.removeEventListener('hashchange', handleHashRouting);
  }, []);

  useEffect(() => {
    // Request notification permission and register service worker
    import('./services/notifications').then(m => {
      m.requestNotificationPermission();
      m.registerServiceWorker();
    });

    // The global chat notifications listener has been removed. 
    // Notifications are now generated cleanly by a Databas Trigger (NOTIS_FIX.sql) 
    // and received in realtime via the notificationStore's public:notifications channel.scribe();

    // History handling
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state;
      if (!state) {
        if (authStatus === AuthStatus.AUTHENTICATED) {
          // stay on welcome if authenticated
          setActiveTab('welcome');
        } else {
          setShowLogin(false);
        }
        return;
      }
      if (state.view === 'login' || state.view === 'premium-login') {
        setShowLogin(true);
      } else if (state.view === 'landing') {
        setShowLogin(false);
      }
      if (state.tab) {
        setActiveTab(state.tab);
      }
      setSelectedTopic(state.topic || null);
    };

    window.addEventListener('popstate', handlePopState);

    // Supabase Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: string, session: any) => {
      if (session) {
        setAuthStatus(AuthStatus.AUTHENTICATED);
        setShowLogin(false);

        // Fetch rich profile from DB with retry logic
        let profileData = null;
        let retries = 0;
        const maxRetries = 5;

        while (!profileData && retries < maxRetries) {
          const { data } = await (supabase as any)
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (data) {
            profileData = data;
          } else {
            console.log(`Profile not found yet, retrying... (${retries + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, 500 * (retries + 1))); // Exponential backoff
            retries++;
          }
        }

        let role = profileData?.role || 'medlem';
        
        // --- Speciallåsning för Jeanette ---
        const email = session.user.email?.toLowerCase() || '';
        const name = (session.user.user_metadata?.full_name || '').toLowerCase();
        
        if (
          email === 'jeanettejohansson1989@gmail.com' || 
          email.includes('jeanette') || 
          email.includes('jenatte') || // Added 'jenatte' case
          name.includes('jeanette') || 
          name.includes('jenatte')
        ) {
            console.log("!!! JEANETTE/JENATTE INLOGGAD - TVINGAR ADMIN-RÄTTIGHETER !!!");
            role = 'admin';
        }
        // ------------------------------------

        const isAdmin = role === 'admin';

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: profileData?.full_name || session.user.user_metadata.full_name || 'Medlem',
          role: role,
          avatar_url: profileData?.avatar_url || session.user.user_metadata.avatar_url,
          membership_level: profileData?.membership_level ?? 2,
          membership_active: profileData?.membership_active ?? true,
          notifications_enabled: profileData?.notifications_enabled ?? true,
        });

        // Update login metadata
        await (supabase as any)
          .from('profiles')
          .update({
            last_login: new Date().toISOString(),
            login_count: (profileData?.login_count || 0) + 1,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            last_localization: navigator.language
          })
          .eq('id', session.user.id);

        // Record Login Event
        await (supabase as any)
          .from('login_events')
          .insert({
            user_id: session.user.id,
            metadata: {
              url: window.location.href,
              user_agent: navigator.userAgent,
              localization: navigator.language,
              role: role
            }
          });

        // 1. Password Reset Routing - Check hash in URL
        const checkHash = () => {
          const hash = window.location.hash;
          console.log('Current Hash:', hash);
          if (hash === '#update-password' || hash.includes('type=recovery')) {
            setIsUpdatingPassword(true);
            // No need to set activeTab to an invalid 'auth' state
            // If the user is unauthenticated, the render logic handles the form
          }
        };
        checkHash();
        window.addEventListener('hashchange', checkHash);

        // Redirect based on role
        if (isAdmin && window.location.hash.includes('#admin')) {
          setActiveTab('admin');
        } else {
          setActiveTab('welcome');
          window.history.pushState({ tab: 'welcome', view: 'welcome' }, '', '#welcome');
        }
      } else {
        setAuthStatus(AuthStatus.IDLE);
        setUser(null);
      }
    });

    // Presence Listener
    let presenceChannel: any = null;
    if (user) {
      presenceChannel = supabase.channel('online-users', {
        config: {
          presence: {
            key: user.id,
          },
        },
      });

      presenceChannel
        .on('presence', { event: 'sync' }, () => {
          const state = presenceChannel.presenceState();
          const onlineInfo: Record<string, any> = {};
          
          Object.keys(state).forEach(key => {
            const presences = state[key] as any[];
            if (presences && presences.length > 0) {
              onlineInfo[key] = presences[0];
            }
          });
          
          setOnlineUsers(onlineInfo as any);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }: any) => {
          console.log('join', key, newPresences);
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }: any) => {
          console.log('leave', key, leftPresences);
        })
        .subscribe(async (status: string) => {
          if (status === 'SUBSCRIBED') {
            console.log('Subscribed to presence channel successfully');
            await presenceChannel.track({
              user_id: user.id,
              full_name: user.full_name,
              avatar_url: user.avatar_url,
              online_at: new Date().toISOString(),
              device: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop'
            });
          } else if (status === 'CLOSED') {
            console.warn('Presence channel closed, attempting to reconnect...');
          }
        });
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      subscription.unsubscribe();
      if (presenceChannel) supabase.removeChannel(presenceChannel);
    };
  }, [authStatus, isPremiumView, user?.id]);


  // 3. Handlers
  const handleLoginClick = () => {
    setShowLogin(true);
    setIsPremiumView(false);
    setInitialView('login');
    window.history.pushState({ view: 'login' }, '', '#login');
  };

  const handlePremiumLoginClick = () => {
    setShowPremiumIntro(true);
    setShowLogin(false);
    setIsPremiumView(true);
    setInitialView('login');
    window.history.pushState({ view: 'premium-login' }, '', '#premium-login');
  };

  const handleBackToLanding = () => {
    onBackToSite();
  };

  const handleLoginSuccess = (profile: Profile) => {
    setUser(profile);
    setAuthStatus(AuthStatus.AUTHENTICATED);

    // Default tab logic for newly logged in users
    const initialTab = 'welcome';
    setActiveTab(initialTab);

    window.history.pushState({ tab: initialTab, view: initialTab }, '', `#${initialTab}`);
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    setUser(null);
    setAuthStatus(AuthStatus.UNAUTHENTICATED);
    setActiveTab('welcome');
    setSelectedTopic(null);
    setShowLogin(isStandalone); // Show login directly if standalone

    if (!isStandalone) {
      // Explicitly go back to the site's official login page for a consistent experience
      onBackToSite(Page.LOGIN);
    } else {
      // In standalone, just show the premium login form
      setShowPremiumIntro(false);
      setShowLogin(true);
      setIsPremiumView(true);
      setInitialView('login');
      window.history.pushState({ view: 'premium-login' }, '', '#premium-login');
    }
  };

  const navigateTo = (tab: 'welcome' | 'dashboard' | 'resources' | 'chat' | 'experts' | 'admin' | 'consultant', topic: string | null = null, noHistory = false) => {
    setActiveTab(tab);
    setSelectedTopic(topic);
    setIsMobileMenuOpen(false);

    // Add to internal history if not explicitly requested otherwise
    if (!noHistory) {
      setNavHistory(prev => {
        const last = prev[prev.length - 1];
        if (last && last.tab === tab && last.topic === topic) return prev;
        return [...prev, { tab, topic }];
      });
    }

    // Use paths for internal navigation too if we want "Pretty URLs" everywhere
    // e.g. /app/chat instead of /app#chat
    const baseUrl = '/app';
    const pathPart = tab === 'welcome' && !topic ? '' : `/${tab}`;
    const queryPart = topic ? `?topic=${encodeURIComponent(topic)}` : '';
    const fullUrl = `${baseUrl}${pathPart}${queryPart}`;

    window.history.pushState({ tab, topic, page: Page.GEMENSKAP_APP }, '', fullUrl);
  };

  const handleBack = () => {
    if (navHistory.length > 1) {
      const historyCopy = [...navHistory];
      historyCopy.pop(); // Remove current state
      const prevState = historyCopy[historyCopy.length - 1];
      setNavHistory(historyCopy);
      navigateTo(prevState.tab as any, prevState.topic, true);
    } else {
      // If no history, default to dashboard
      if (activeTab !== 'dashboard') {
        navigateTo('dashboard');
      }
    }
  };

  const openThread = (topic: string) => {
    if (topic === 'experts') {
      navigateTo('experts');
    } else if (topic === 'consultant') {
      navigateTo('consultant');
    } else if (topic === 'admin') {
      navigateTo('admin');
    } else if (topic === 'general' || topic === 'self-care' || topic === 'trygghet' || topic === 'video') {
      navigateTo('chat', topic);
    } else {
      navigateTo('chat', topic);
    }
  };

  const handleProfileUpdate = (updatedProfile: Profile) => {
    setUser(updatedProfile);
  };

  // 4. Background Component
  const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen relative flex flex-col font-sans text-slate-100 selection:bg-orange-500/30">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black animate-bg-shift z-0"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[150px] animate-pulse duration-[15000ms] z-0 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-amber-600/5 rounded-full blur-[150px] animate-pulse duration-[20000ms] z-0 pointer-events-none"></div>
      <div className="fixed top-[20%] right-[10%] w-[400px] h-[400px] bg-white/2 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/p6.png')] pointer-events-none z-0"></div>
      <div className="relative z-10 flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );

  // 5. Render Logic

  // -- PREMIUM INTRO (Priority) --
  if (showPremiumIntro) {
    return (
      <>
        <Hero
          onLoginClick={() => {
            setShowPremiumIntro(false);
            if (!user) {
              setShowLogin(true);
            }
          }}
        />
      </>
    );
  }

  // -- AUTHENTICATED VIEW --
  if (authStatus === AuthStatus.AUTHENTICATED && user) {
    return (
      <AssistantProvider>
        <CommunityLayout
          activeTab={activeTab}
          onTabChange={navigateTo}
          user={user}
          onLogout={handleLogout}
          onSettingsClick={() => setSettingsOpen(true)}
          onBack={handleBack}
        >
          {activeTab === 'welcome' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Welcome />
              <div className="py-12">
                <Footer
                  onBackToSite={onBackToSite}
                  onSettingsClick={() => setSettingsOpen(true)}
                />
              </div>
            </div>
          ) : activeTab === 'dashboard' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Dashboard user={user} onThreadClick={openThread} onBackToSite={onBackToSite} />
              <div className="py-12">
                <Footer
                  onBackToSite={onBackToSite}
                  onSettingsClick={() => setSettingsOpen(true)}
                />
              </div>
            </div>
          ) : activeTab === 'resources' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Resources />
              <div className="py-12">
                <Footer
                  onBackToSite={onBackToSite}
                  onSettingsClick={() => setSettingsOpen(true)}
                />
              </div>
            </div>
          ) : activeTab === 'chat' ? (
            <div className="h-full w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ChatPage
                user={user}
                onlineUsers={onlineUsers}
                initialThread={selectedTopic}
                onOpenSettings={() => setSettingsOpen(true)}
                onLogout={handleLogout}
                onBackToSite={onBackToSite}
              />
            </div>
          ) : activeTab === 'experts' || activeTab === 'admin' || activeTab === 'consultant' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'experts' ? (
                <Experts />
              ) : activeTab === 'consultant' ? (
                <div className="h-[700px]">
                  <AIConsultant user={user} initialTopic={selectedTopic} />
                </div>
              ) : (
                <AdminDashboard user={user} onBack={() => navigateTo('dashboard')} />
              )}
              <div className="py-12">
                <Footer
                  onBackToSite={onBackToSite}
                  onSettingsClick={() => setSettingsOpen(true)}
                />
              </div>
            </div>
          ) : null}
        </CommunityLayout>

        {settingsOpen && user && (
          <SettingsModal
            user={user}
            onClose={() => setSettingsOpen(false)}
            onUpdate={handleProfileUpdate}
          />
        )}
        <AssistantFab user={user} isChatActive={activeTab === 'chat'} />
        <InstallButton />
      </AssistantProvider>
    );
  }

  // -- UNAUTHENTICATED VIEW (Landing or Login) --
  return (
    <BackgroundWrapper>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative animate-in fade-in zoom-in-95 duration-700 overflow-hidden">
        <div className="fixed inset-0 z-0 opacity-50 bg-black">
          <GL hovering={true} />
        </div>

        {!isStandalone && (
          <button
            onClick={handleBackToLanding}
            className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors z-50 group px-4 py-2 rounded-full hover:bg-white/5"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Tillbaka
          </button>
        )}

        <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="mb-8 flex justify-center">
            {/* Logo removed */}
          </div>
          {isUpdatingPassword ? (
            <UpdatePasswordForm 
              onSuccess={() => {
                setIsUpdatingPassword(false);
                window.location.hash = '#login';
              }}
              onBack={() => {
                setIsUpdatingPassword(false);
                window.location.hash = '#login';
              }}
            />
          ) : isPremiumView ? (
            <PremiumLogin
              onLoginSuccess={handleLoginSuccess}
              isStandalone={isStandalone}
              onRegister={() => onBackToSite(Page.PREMIUM_APPLICATION)}
              onBack={() => {
                setShowPremiumIntro(true);
                setShowLogin(false);
                onBackToSite(Page.LOGIN);
              }}
            />
          ) : (
            <LoginForm
              onLoginSuccess={handleLoginSuccess}
              initialView={initialView}
              onNavigateToPremium={() => onBackToSite(Page.PREMIUM_APPLICATION)}
              onNavigateToTerms={() => onBackToSite(Page.TERMS)}
              onNavigateToPrivacy={() => onBackToSite(Page.PRIVACY)}
              onNavigateToCookies={() => onBackToSite(Page.COOKIE_POLICY)}
              onNavigateToContact={() => onBackToSite(Page.CONTACT)}
            />
          )}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default GemenskapApp;
