
import React, { useState, useMemo } from 'react';
import LandingPageAssociation from '../association/components/LandingPage';
import { LanguageContext, ThemeContext, Language, Theme } from '../association/hooks';
import { translations } from '../translations';

const AssociationTab: React.FC = () => {
    const [lang, setLang] = useState<Language>('sv');
    const [theme, setTheme] = useState<Theme>('dark'); // Set to dark by default for community app

    const languageContextValue = useMemo(() => ({
        lang,
        setLang,
        t: translations[lang]
    }), [lang]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <LanguageContext.Provider value={languageContextValue}>
                <div className="bg-transparent">
                    {/* We use the LandingPage but might need to tweak its internal Header/Hero if they conflict */}
                    <LandingPageAssociation
                        isTab={true}
                        onNavigateToLogin={() => { }} // Internal links should probably stay within the tab or be disabled
                        onNavigateToAgreement={() => { }}
                        onNavigateToCalendar={() => { }}
                        onNavigateToBookRelease={() => { }}
                        onNavigateToMembershipPromo={() => { }}
                        onNavigateToContactBooking={() => { }}
                        onNavigateToServices={() => { }}
                        onNavigateToContact={() => { }}
                        onNavigateToAbout={() => { }}
                        onNavigateHome={() => { }}
                    />
                </div>
            </LanguageContext.Provider>
        </ThemeContext.Provider>
    );
};

export default AssociationTab;
