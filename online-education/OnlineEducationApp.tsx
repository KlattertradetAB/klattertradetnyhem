import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { courses, resourceFiles } from './constants';
import { SendIcon, MapPinIcon, MailIcon, PhoneIcon, AppleIcon, GooglePlayIcon, DownloadIcon, LogOutIcon } from './components/Icons';
import { CourseSection } from './components/CourseSection';
import { CourseModal } from './components/CourseModal';
import { AuthModal } from './components/AuthModal';
import { CourseAccessModal } from './components/CourseAccessModal';
import { CourseContentView } from './components/CourseContentView';
import { Policies } from './components/Policies';
import { TermsModal } from './components/TermsModal';
import { UserDashboard } from './components/UserDashboard';
import { supabase } from './services/supabase';
import type { Course, User } from './types';
import { useAuth } from '../contexts/AuthContext';

/**
 * A simple fuzzy search algorithm that checks if characters from the query
 * appear in the text in the same order.
 */
function fuzzySearch(query: string, text: string): { isMatch: boolean; indices: number[] } {
  const normalizedQuery = query.toLowerCase();
  const normalizedText = text.toLowerCase();
  
  if (!normalizedQuery) {
    return { isMatch: false, indices: [] };
  }

  const indices: number[] = [];
  let queryIndex = 0;
  let textIndex = 0;

  while (queryIndex < normalizedQuery.length && textIndex < normalizedText.length) {
    if (normalizedQuery[queryIndex] === normalizedText[textIndex]) {
      indices.push(textIndex);
      queryIndex++;
    }
    textIndex++;
  }

  return { isMatch: queryIndex === normalizedQuery.length, indices };
}

/**
 * Renders a text string with specific characters highlighted.
 */
export function renderHighlightedText(text: string, indices: number[]): React.ReactNode {
  if (indices.length === 0) {
    return text;
  }

  const segments: { text: string; highlight: boolean }[] = [];
  let lastEnd = 0;

  indices.forEach((index) => {
    if (index > lastEnd) {
      segments.push({ text: text.substring(lastEnd, index), highlight: false });
    }
    segments.push({ text: text.substring(index, index + 1), highlight: true });
    lastEnd = index + 1;
  });

  if (lastEnd < text.length) {
    segments.push({ text: text.substring(lastEnd), highlight: false });
  }

  const mergedSegments = segments.reduce((acc, segment) => {
    if (acc.length > 0 && acc[acc.length - 1].highlight === segment.highlight) {
      acc[acc.length - 1].text += segment.text;
    } else {
      acc.push(segment);
    }
    return acc;
  }, [] as typeof segments);
  
  return mergedSegments.map((segment, index) => 
    segment.highlight ? (
      <strong key={index} className="font-bold text-orange-600 dark:text-orange-500 bg-orange-500/10 rounded-sm px-0.5">{segment.text}</strong>
    ) : (
      <span key={index}>{segment.text}</span>
    )
  );
}


export default function OnlineEducationApp() {
  // 1. Auth Integration
  const { user: profile, logout: authLogout, refreshProfile } = useAuth();
  const user = React.useMemo(() => profile ? ({
    uid: profile.id,
    email: profile.email || '',
    displayName: profile.full_name || 'Medlem',
    photoURL: profile.avatar_url,
  } as User) : null, [profile]);

  // 2. State
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
  const [unlockedCourses, setUnlockedCourses] = useState<Set<string>>(new Set());
  const [activeCourseContent, setActiveCourseContent] = useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState<Set<string>>(new Set());
  const [coursePendingTerms, setCoursePendingTerms] = useState<Course | null>(null);
  const [courseProgress, setCourseProgress] = useState<Record<string, { currentSubModuleId: string }>>({});
  const [initialSignatureName, setInitialSignatureName] = useState<string>('');
  const [activeView, setActiveView] = useState<'home' | 'dashboard' | 'course-content'>('home');
  const flashlightRef = useRef<HTMLDivElement>(null);

  // 3. Sync profile data (terms, progress)
  useEffect(() => {
    if (!profile) return;

    const fetchUserData = async () => {
      try {
        // Fetch profile terms
        if (profile.accepted_terms && Array.isArray(profile.accepted_terms)) {
          setAcceptedTerms(new Set(profile.accepted_terms));
        }

        // Fetch course progress
        const { data: progress } = await supabase
          .from('course_progress')
          .select('course_id, current_sub_module_id')
          .eq('user_id', profile.id);

        if (progress) {
          const remoteProgress: Record<string, { currentSubModuleId: string }> = {};
          progress.forEach(p => {
            remoteProgress[p.course_id] = { currentSubModuleId: p.current_sub_module_id };
          });
          setCourseProgress(remoteProgress);
        }
      } catch (err) {
        console.error("Error syncing from Supabase:", err);
      }
    };

    fetchUserData();
  }, [profile]);

  useEffect(() => {
    // All courses unlocked by default for premium users
    setUnlockedCourses(new Set(['behandlingsassistent', 'gestalt-traumaterapeut', 'myndighetsinducerat-trauma']));
  }, []);

  const handleCourseClick = (courseId: string) => {
    setSelectedCourse(courses[courseId]);
  };

  const handleAuthSuccess = async () => {
    await refreshProfile();
    setToast({ message: 'Inloggning lyckades!', type: 'success' });
    setActiveView('dashboard');
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = async () => {
    await authLogout();
    setToast({ message: 'Du har loggats ut.', type: 'success' });
    setActiveView('home');
    setTimeout(() => setToast(null), 3000);
  };

  const handleStartCourse = (courseId: string) => {
    const course = courses[courseId];
    if (course) {
      if (acceptedTerms.has(`course_${course.id}`)) {
        setActiveCourseContent(course);
        setSelectedCourse(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCoursePendingTerms(course);
        setSelectedCourse(null);
      }
    }
  };

  const updateCourseProgress = async (courseId: string, subModuleId: string) => {
    const newProgress = { ...courseProgress, [courseId]: { currentSubModuleId: subModuleId } };
    setCourseProgress(newProgress);

    if (profile) {
      try {
        await supabase
          .from('course_progress')
          .upsert({ 
            user_id: profile.id, 
            course_id: courseId, 
            current_sub_module_id: subModuleId,
            updated_at: new Date().toISOString()
          });
      } catch (err) {
        console.error("Error saving progress to Supabase:", err);
      }
    }
  };

  const handleAcceptTerms = async (id: string) => {
    const newTerms = new Set(acceptedTerms);
    newTerms.add(id);
    setAcceptedTerms(newTerms);
    
    if (profile) {
      try {
        await supabase
          .from('profiles')
          .update({ accepted_terms: Array.from(newTerms) })
          .eq('id', profile.id);
        
        await refreshProfile();
      } catch (err) {
        console.error("Error saving terms to Supabase:", err);
      }
    }

    if (id === 'platform') {
      setActiveView('dashboard');
      window.location.hash = 'dashboard';
    } else if (coursePendingTerms) {
      setActiveCourseContent(coursePendingTerms);
      setCoursePendingTerms(null);
      setSelectedCourse(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // UI Handlers (Shortened for brevity)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    theme === 'light' ? root.classList.remove('dark') : root.classList.add('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const allCourses = Object.values(courses);
  
  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    return allCourses.map(course => {
        if (!normalizedQuery) return { course, isMatch: true, titleIndices: [], subtitleIndices: [], descriptionIndices: [] };
        const titleMatch = fuzzySearch(normalizedQuery, course.title);
        const subtitleMatch = fuzzySearch(normalizedQuery, course.subtitle);
        const descMatch = fuzzySearch(normalizedQuery, course.description);
        return {
            course,
            isMatch: titleMatch.isMatch || subtitleMatch.isMatch || descMatch.isMatch,
            titleIndices: titleMatch.indices,
            subtitleIndices: subtitleMatch.indices,
            descriptionIndices: descMatch.indices,
        };
    });
  }, [searchQuery, allCourses]);

  const suggestionResults = useMemo(() => {
    if (!searchQuery) return [];
    return searchResults.filter(r => r.isMatch);
  }, [searchQuery, searchResults]);
  
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash === 'dashboard') {
        setActiveView('dashboard');
        setActiveCourseContent(null);
      } else if (!hash) {
        setActiveView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [allCourses]);

  const handleToggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  // -- RENDER --
  return (
    <div className="min-h-screen font-sans text-blue-950 dark:text-slate-200 transition-colors duration-500 relative overflow-x-hidden app-background">
      <div className="liquid-blob blob-1"></div>
      <div className="liquid-blob blob-2"></div>
      <div className="liquid-blob blob-3"></div>
      <div id="flashlight" ref={flashlightRef} className="flashlight-overlay" aria-hidden="true" />

      <Header 
        allCourses={allCourses} 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        suggestionResults={suggestionResults}
        renderHighlightedText={renderHighlightedText}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        user={user}
        onLogout={handleLogout}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onCourseClick={handleCourseClick}
      />

      <main className="container mx-auto px-4 py-8 pt-40 relative z-10">
        {activeCourseContent ? (
          <CourseContentView 
            course={activeCourseContent} 
            user={user}
            initialSubModuleId={courseProgress[activeCourseContent.id]?.currentSubModuleId}
            onSubModuleChange={(subId) => updateCourseProgress(activeCourseContent.id, subId)}
            onBack={() => setActiveCourseContent(null)} 
          />
        ) : activeView === 'dashboard' && user ? (
          <UserDashboard 
            user={user} 
            allCourses={allCourses} 
            courseProgress={courseProgress}
            onCourseClick={(id) => {
              setActiveCourseContent(courses[id]);
            }}
            onBackToHome={() => setActiveView('home')}
          />
        ) : (
          <>
            <HeroSection 
              allCourses={allCourses}
              searchQuery={searchQuery}
              searchResults={searchResults}
              renderHighlightedText={renderHighlightedText}
              onCourseClick={handleCourseClick}
            />
            <div className="border-t-2 border-orange-500/30 dark:border-orange-500/20 my-16 md:my-24"></div>
            {searchResults.filter(r => r.isMatch).map((result, index) => (
              <React.Fragment key={result.course.id}>
                 <CourseSection 
                    course={result.course}
                    titleIndices={result.titleIndices}
                    subtitleIndices={result.subtitleIndices}
                    descriptionIndices={result.descriptionIndices}
                    renderHighlightedText={renderHighlightedText}
                    onCourseClick={handleCourseClick}
                    isLoggedIn={!!user}
                 />
                 {index < searchResults.length - 1 && (
                    <div className="border-t-2 border-orange-500/30 dark:border-orange-500/20 my-16 md:my-24"></div>
                 )}
              </React.Fragment>
            ))}
          </>
        )}
      </main>

      {/* Modals */}
      <CourseModal 
        course={selectedCourse} 
        onClose={() => setSelectedCourse(null)} 
        onStartCourse={handleStartCourse}
        isUnlocked={selectedCourse ? unlockedCourses.has(selectedCourse.id) : false}
      />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={handleAuthSuccess} />
      {coursePendingTerms && (
        <TermsModal 
          onAccept={handleAcceptTerms}
          initialName={user?.displayName || ''}
          courseTitle={coursePendingTerms.title}
          agreementId={`course_${coursePendingTerms.id}`}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-bottom-4">
          <div className={`px-6 py-3 rounded-full shadow-2xl backdrop-blur-md border ${
            toast.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-100' : 'bg-red-500/20 border-red-500/30 text-red-100'
          }`}>
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}
