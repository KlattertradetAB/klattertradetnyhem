import { supabase } from './supabase';

// Helper to get or create a session ID for unique visitor tracking
const getSessionId = () => {
    let sessionId = localStorage.getItem('hz_analytics_session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('hz_analytics_session_id', sessionId);
    }
    return sessionId;
};

// Fire and forget function to track a page view
export const trackPageView = async (path: string) => {
    try {
        // Viktigt: Spåra ingenting om användaren inte klickat "Tillåt Alla" i cookie-bannern (GDPR)
        const consent = localStorage.getItem('cookie-consent-v4');
        if (consent !== 'all') {
            return; // Spåra inte
        }

        const sessionId = getSessionId();

        // 1. Samla in enhetsdata & tillträde
        const referrer = document.referrer || null;
        const screenRes = typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : null;
        const browserLanguage = navigator.language || null;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || null;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const device = isMobile ? 'Mobile' : 'Desktop';

        // 2. Mjuk platsspårning via IP (Alternativ A)
        let country = null;
        let city = null;
        try {
            const response = await fetch('https://ipapi.co/json/');
            if (response.ok) {
                const data = await response.json();
                country = data.country_name || null;
                city = data.city || null;
            }
        } catch (err) {
            // Om de har AdBlocker eller om det misslyckas, ignorera bara.
        }

        await (supabase as any).from('page_views').insert({
            path,
            session_id: sessionId,
            referrer,
            screen_res: screenRes,
            browser_language: browserLanguage,
            time_zone: timeZone,
            device,
            country,
            city
        });
    } catch (e) {
        // Silently fail so it never breaks the user experience
        console.error("Analytics error ignored.");
    }
};
