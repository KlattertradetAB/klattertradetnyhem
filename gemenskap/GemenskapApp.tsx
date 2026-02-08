import React, { useState, useEffect } from 'react';
import { AuthStatus, Profile } from './types';
import { Page } from '../types';
import LoginForm from './components/LoginForm';
import PremiumLogin from './components/PremiumLogin';
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
import { LogOut, LayoutGrid, MessageSquare, ArrowLeft, Menu, X, Users, Bot, MessageCircle, Settings, Home, ChevronLeft, Shield } from 'lucide-react';
import { SettingsModal } from './components/SettingsModal';
import { InstallButton } from './components/InstallButton';
import AssistantFab from './components/Assistant/AssistantFab';
import { getEffectiveAvatar } from './services/userUtils';

interface GemenskapAppProps {
  onBackToSite: (page?: Page) => void;
}

export const GemenskapApp: React.FC<GemenskapAppProps> = ({ onBackToSite }) => {
  // 1. State Declarations (MUST be at the top)
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.IDLE);
  const [user, setUser] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState<'welcome' | 'dashboard' | 'chat' | 'experts' | 'admin'>('welcome');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPremiumIntro, setShowPremiumIntro] = useState(false);
  const [isPremiumView, setIsPremiumView] = useState(true);
  const [initialView, setInitialView] = useState<'login' | 'signup'>('login');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [navHistory, setNavHistory] = useState<{ tab: string; topic: string | null }[]>([]);
  const [isStandalone, setIsStandalone] = useState(false);

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
      } else {
        setShowLogin(false);
        setShowPremiumIntro(false);
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

    // Global Message Listener for Notifications
    const notificationChannel = supabase
      .channel('global_messages_notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async (payload) => {
        const newMsg = payload.new;
        if (user && newMsg.user_id !== user.id && user.notifications_enabled !== false) {
          const { sendNotification } = await import('./services/notifications');
          const { PERSONAS } = await import('./services/personas');

          let senderName = 'Någon';
          let icon = '💬';
          let color = 'bg-blue-500';

          if (newMsg.is_ai) {
            const persona = PERSONAS.find(p => p.id === newMsg.persona_id);
            senderName = persona ? persona.name : 'AI';
            icon = persona ? persona.avatar : '🤖';
            color = persona ? persona.color : 'bg-slate-800';
          } else {
            const { data } = await supabase.from('profiles').select('full_name').eq('id', newMsg.user_id).single();
            if (data) senderName = data.full_name;
          }

          // Truncate content to first 3 words
          const snippet = newMsg.content.split(' ').slice(0, 3).join(' ') + (newMsg.content.split(' ').length > 3 ? '...' : '');

          // Save to notification history (persisted in DB)
          const { addNotification } = await import('./services/notificationStore');
          await addNotification({ title: `Nytt från ${senderName}`, message: snippet });

          // Show browser notification immediately
          sendNotification(`Nytt från ${senderName}`, snippet);
        }
      })
      .subscribe();

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
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setAuthStatus(AuthStatus.AUTHENTICATED);
        setShowLogin(false);

        // Fetch rich profile from DB to get membership_level
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: profileData?.full_name || session.user.user_metadata.full_name || 'Medlem',
          role: profileData?.role || 'medlem',
          avatar_url: profileData?.avatar_url || session.user.user_metadata.avatar_url,
          membership_level: profileData?.membership_level ?? 2, // Default to 2 if not found
          membership_active: profileData?.membership_active ?? true,
          notifications_enabled: profileData?.notifications_enabled ?? true,
        });

        // If logging in via premium flow, go straight to the new deluxe chat template
        if (isPremiumView || window.location.hash === '#premium-login') {
          setActiveTab('chat');
        }
      } else {
        setAuthStatus(AuthStatus.IDLE);
        setUser(null);
      }
    });

    return () => {
      window.removeEventListener('popstate', handlePopState);
      subscription.unsubscribe();
      supabase.removeChannel(notificationChannel);
    };
  }, [authStatus, isPremiumView]);


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
    const initialTab = (isPremiumView || window.location.hash === '#premium-login') ? 'chat' : 'welcome';
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

  const navigateTo = (tab: 'welcome' | 'dashboard' | 'chat' | 'experts' | 'admin', topic: string | null = null, noHistory = false) => {
    setActiveTab(tab);
    setSelectedTopic(topic);
    setIsMobileMenuOpen(false);

    // Add to internal history if not explicitly requested otherwise
    if (!noHistory) {
      setNavHistory(prev => {
        // Avoid duplicates if last entry is identical
        const last = prev[prev.length - 1];
        if (last && last.tab === tab && last.topic === topic) return prev;
        return [...prev, { tab, topic }];
      });
    }

    const url = topic ? `#${tab}?topic=${encodeURIComponent(topic)}` : `#${tab}`;
    window.history.pushState({ tab, topic }, '', url);
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
    navigateTo('chat', topic);
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
      <BackgroundWrapper>
        <header className="md:hidden border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Liquid Glass Back Button (Mobile) */}
              <button
                onClick={handleBack}
                className="group flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 shadow-lg active:scale-95"
                title="Gå bakåt"
                aria-label="Gå bakåt"
              >
                <ChevronLeft size={20} className="text-slate-400 group-hover:text-orange-400 transition-colors" />
              </button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/assets/logo2.png" alt="Klätterträdet Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-lg font-bold tracking-tight text-white">Horizonten</h1>
              </div>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400 hover:text-white transition-colors">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur-xl absolute w-full animate-in slide-in-from-top-2 duration-200 shadow-2xl">
              <div className="px-4 py-4 space-y-3">
                <div className="flex items-center gap-3 px-2 mb-6">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                    {(() => {
                      const avatar = getEffectiveAvatar(user.email, user.avatar_url);
                      return avatar ? (
                        <img src={avatar} alt={user.full_name} className={`w-full h-full ${getEffectiveAvatar(user.email) ? 'object-contain p-1.5 bg-slate-900' : 'object-cover'}`} />
                      ) : (
                        user.full_name.charAt(0)
                      );
                    })()}
                  </div>
                  <span className="font-semibold text-white">{user.full_name}</span>
                </div>
                <button onClick={() => navigateTo('welcome')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'welcome' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
                  <Home size={20} /> <span className="font-medium">Välkommen hem</span>
                </button>
                <button onClick={() => navigateTo('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
                  <LayoutGrid size={20} /> <span className="font-medium">Överblick</span>
                </button>
                <button onClick={() => navigateTo('chat')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'chat' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
                  <MessageCircle size={20} /> <span className="font-medium">Gemenskapen</span>
                </button>
                <button onClick={() => navigateTo('experts')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'experts' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'text-slate-400 hover:bg-white/5'}`}>
                  <Users size={20} /> <span className="font-medium">Kontakt & Bokning</span>
                </button>
                {user.role === 'admin' && (
                  <button onClick={() => navigateTo('admin')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'admin' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'text-slate-400 hover:bg-white/5'}`}>
                    <Shield size={20} /> <span className="font-medium">Admin Panel</span>
                  </button>
                )}
                {!isStandalone && (
                  <div className="border-t border-white/10 my-2 pt-2">
                    <button onClick={() => onBackToSite()} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-orange-400 hover:bg-white/5 rounded-xl transition-colors">
                      <ArrowLeft size={20} /> <span className="font-medium">Klätterträdet.se</span>
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                      <LogOut size={20} /> <span className="font-medium">Logga ut</span>
                    </button>
                  </div>
                )}
                {isStandalone && (
                  <div className="border-t border-white/10 my-2 pt-2">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                      <LogOut size={20} /> <span className="font-medium">Logga ut</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Desktop Sidebar & Main Content */}
        <div className="flex h-[calc(100vh-64px)] md:h-screen overflow-hidden">

          {/* Vertical Sidebar */}
          <aside className="hidden md:flex flex-col w-72 bg-slate-950/50 backdrop-blur-2xl border-r border-white/5 p-6 relative z-50">
            {/* Logo Area */}
            <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer group" onClick={() => navigateTo('dashboard')}>
              <div className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <img src="/assets/logo2.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">Horizonten</h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Gemenskap</p>
              </div>
            </div>

            {/* Back Button */}
            <div className="mb-8 px-2">
              <button
                onClick={handleBack}
                className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm font-bold group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-orange-500/30 group-hover:bg-white/10 transition-all">
                  <ChevronLeft size={16} />
                </div>
                Gå bakåt
              </button>
            </div>

            {/* Navigation Menus */}
            <nav className="flex-1 space-y-2">
              {[
                { id: 'welcome', label: 'Välkommen hem', icon: Home },
                { id: 'dashboard', label: 'Överblick', icon: LayoutGrid },
                { id: 'chat', label: 'Gemenskapen', icon: MessageCircle },
                { id: 'experts', label: 'Kontakt & Bokning', icon: Users },
                ...(user.role === 'admin' ? [{ id: 'admin', label: 'Admin Panel', icon: Shield }] : [])
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id as any)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden
                    ${activeTab === item.id
                      ? 'bg-white/10 text-white shadow-lg shadow-black/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'}
                  `}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <item.icon size={20} className={activeTab === item.id ? 'text-orange-400' : 'group-hover:text-orange-400 transition-colors'} />
                    <span className="font-medium text-[15px]">{item.label}</span>
                  </div>

                  {/* The Fade-in White Line Effect */}
                  <div className={`
                    w-1 h-8 bg-gradient-to-b from-transparent via-white to-transparent rounded-full shadow-[0_0_10px_white]
                    absolute right-4 transition-all duration-500 ease-out transform
                    ${activeTab === item.id ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-50 translate-x-4 group-hover:opacity-60 group-hover:translate-x-0 group-hover:scale-75'}
                  `}></div>
                </button>
              ))}
            </nav>

            {/* User Footer in Sidebar */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <button onClick={() => setSettingsOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white group">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800">
                    {(() => {
                      const avatar = getEffectiveAvatar(user.email, user.avatar_url);
                      return avatar ? (
                        <img src={avatar} alt="" className={`w-full h-full ${getEffectiveAvatar(user.email) ? 'object-contain p-1.5 bg-slate-900' : 'object-cover'}`} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold">{user.full_name?.[0]}</div>
                      );
                    })()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-slate-950"></div>
                </div>
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{user.full_name.split(' ')[0]}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Inställningar</p>
                </div>
                <Settings size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={handleLogout}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-red-900/20 group"
              >
                <LogOut size={16} className="text-red-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-red-200 group-hover:text-white transition-colors">Logga ut</span>
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className={`flex-1 flex flex-col relative z-20 min-h-0 ${activeTab === 'chat' ? 'overflow-hidden' : 'overflow-y-auto custom-scrollbar'}`}>
            {activeTab === 'welcome' ? (
              <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto">
                <Welcome />
                <div className="p-4 md:px-12 md:pb-12">
                  <Footer
                    onBackToSite={onBackToSite}
                    onSettingsClick={() => setSettingsOpen(true)}
                  />
                </div>
              </div>
            ) : activeTab === 'dashboard' ? (
              <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto">
                <Dashboard user={user} onThreadClick={openThread} onBackToSite={onBackToSite} />
                <div className="p-4 md:px-12 md:pb-12">
                  <Footer
                    onBackToSite={onBackToSite}
                    onSettingsClick={() => setSettingsOpen(true)}
                  />
                </div>
              </div>
            ) : activeTab === 'chat' ? (
              <div className="flex-1 h-full w-full animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
                <ChatPage
                  user={user}
                  initialThread={selectedTopic}
                  onOpenSettings={() => setSettingsOpen(true)}
                  onLogout={handleLogout}
                  onBackToSite={onBackToSite}
                />
              </div>
            ) : activeTab === 'experts' ? (
              <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto">
                <Experts />
                <div className="p-4 md:px-12 md:pb-12">
                  <Footer
                    onBackToSite={onBackToSite}
                    onSettingsClick={() => setSettingsOpen(true)}
                  />
                </div>
              </div>
            ) : activeTab === 'admin' && user.role === 'admin' ? (
              <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-y-auto">
                <AdminDashboard user={user} onBack={() => navigateTo('dashboard')} />
                <div className="p-4 md:px-12 md:pb-12">
                  <Footer
                    onBackToSite={onBackToSite}
                    onSettingsClick={() => setSettingsOpen(true)}
                  />
                </div>
              </div>
            ) : null}
          </main>
        </div>
        {
          settingsOpen && user && (
            <SettingsModal
              user={user}
              onClose={() => setSettingsOpen(false)}
              onUpdate={handleProfileUpdate}
            />
          )
        }
        <AssistantFab user={user} />
        <InstallButton />
      </BackgroundWrapper >
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
          {isPremiumView ? (
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
