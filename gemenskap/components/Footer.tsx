import { Page } from '../../public/types';

interface FooterProps {
    onBackToSite: (page?: Page) => void;
    onSettingsClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onBackToSite, onSettingsClick }) => {
    return (
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 uppercase tracking-wider font-medium">
                <div>
                    © Horizonten gemenskap
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    <button onClick={onSettingsClick} className="hover:text-orange-400 transition-colors">Kontoinställningar</button>
                    <button onClick={() => onBackToSite(Page.TERMS)} className="hover:text-orange-400 transition-colors">Medlemsvillkor</button>
                    <button onClick={() => onBackToSite(Page.PRIVACY)} className="hover:text-orange-400 transition-colors">Integritets- & Sekretesspolicy</button>
                    <button onClick={() => onBackToSite(Page.COOKIE_POLICY)} className="hover:text-orange-400 transition-colors">Cookie-inställningar</button>
                    <button onClick={() => onBackToSite(Page.CONTACT)} className="hover:text-orange-400 transition-colors">Kontakt</button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
