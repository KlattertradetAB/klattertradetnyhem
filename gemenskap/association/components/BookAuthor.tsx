import React from 'react';
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Globe } from 'lucide-react';

const SocialLink = ({ icon, url, label, colorClass, onClick }: any) => (
  <button 
    onClick={onClick ? onClick : () => window.open(url, '_blank')}
    title={label}
    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 transform hover:scale-110 ${colorClass || 'bg-white text-brand-dark hover:bg-brand-primary hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-brand-primary'}`}
  >
    {icon}
  </button>
);

export const BookAuthor: React.FC = () => {
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(pageUrl);
  
  const authors = [
    {
        name: "Malin Widerlöv",
        role: "Leg. Psykolog & Författare",
        description: "Malin är legitimerad psykolog och psykoterapeut med mångårig erfarenhet av kliniskt arbete. Hon är en uppskattad föreläsare och har i sitt författarskap fokuserat på att synliggöra hur samhällets strukturer påverkar individens mående, särskilt i mötet med myndigheter.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
        bgImage: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2664&auto=format&fit=crop", // Subtle abstract gradient mesh
        socials: [
            { icon: <Globe size={20} />, url: "#", label: "Hemsida" },
            { icon: <Linkedin size={20} />, url: "#", label: "LinkedIn" }
        ]
    },
    {
        name: "Billy Ljungberg",
        role: "Medförfattare",
        description: "Billy tillför ett unikt perspektiv till boken genom sin erfarenhet och expertis. His contribution is crucial to shedding light on the complex mechanisms that form the basis of authority-induced trauma.",
        image: "https://images.unsplash.com/photo-1539571696357-43355038c966?q=80&w=2000&auto=format&fit=crop", // Updated image for Billy
        bgImage: "https://images.unsplash.com/photo-1488229297570-58520851e868?q=80&w=2669&auto=format&fit=crop", // Distinct geometric pattern
        socials: [
             { icon: <Linkedin size={20} />, url: "#", label: "LinkedIn" },
             { icon: <Twitter size={20} />, url: "#", label: "Twitter" }
        ]
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
    alert('Länken har kopierats till urklipp!');
  };

  return (
    <div className="flex flex-col">
        {/* Authors Loop */}
        {authors.map((author, index) => (
            <div key={author.name} className={`relative py-24 overflow-hidden transition-colors duration-300 ${index % 2 === 0 ? 'bg-brand-bg dark:bg-[#121212]' : 'bg-white dark:bg-[#0a0a0a]'}`}>
                
                {/* Background Image Logic */}
                {author.bgImage && (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <img 
                            src={author.bgImage} 
                            alt="" 
                            className={`w-full h-full object-cover transition-opacity duration-500 ${index === 0 ? 'opacity-25 dark:opacity-15' : 'opacity-20 dark:opacity-10'}`} 
                        />
                        <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${
                            index % 2 === 0 
                                ? 'from-brand-bg/90 via-brand-bg/60 to-brand-bg dark:from-[#121212]/95 dark:via-[#121212]/80 dark:to-[#121212]' 
                                : 'from-white/90 via-white/60 to-white dark:from-[#0a0a0a]/95 dark:via-[#0a0a0a]/80 dark:to-[#0a0a0a]'
                        }`}></div>
                    </div>
                )}
                
                {/* Decorative Elements for Malin (Index 0) */}
                {index === 0 && (
                  <>
                    <div className="absolute top-0 left-0 text-brand-primary/10 dark:text-brand-primary/5 animate-pulse" style={{ animationDuration: '10s' }}>
                        <svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,88.1,-6.6C86.1,7.2,79.4,20.5,70.3,31.2C61.2,41.9,49.7,50,37.9,56.8C26.1,63.6,14,69.1,1.2,67.1C-11.6,65,-24.8,55.4,-36.1,45.8C-47.4,36.2,-56.8,26.6,-63.2,14.8C-69.6,3,-73,-11,-68.6,-23.3C-64.2,-35.6,-52,-46.2,-39.7,-54C-27.4,-61.8,-15.1,-66.8,-1.1,-65C12.9,-63.2,25.8,-54.6,30.5,-83.6L44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 right-0 text-brand-secondary/10 dark:text-brand-secondary/5" style={{ transform: 'rotate(180deg)' }}>
                         <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" d="M41.8,-54.9C53.7,-44.2,62.6,-30.5,66.3,-15.8C70,-1.1,68.5,14.6,60.4,27.3C52.3,40,37.6,49.7,22.3,55.3C7,60.9,-8.9,62.4,-23.2,56.9C-37.5,51.4,-50.2,38.9,-58.6,23.9C-67,8.9,-71.1,-8.6,-64.9,-22.9C-58.7,-37.2,-42.2,-48.3,-27.5,-57.3C-12.8,-66.3,-0,-73.2,12.8,-73.2C25.6,-73.2,30,-54.9,41.8,-54.9Z" transform="translate(100 100)" />
                         </svg>
                    </div>
                  </>
                )}

                {/* Decorative Elements for Billy (Index 1) */}
                {index === 1 && (
                     <>
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
                     </>
                )}

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                        
                        {/* Image Container */}
                        <div className="md:w-5/12 flex justify-center">
                            <div className="relative group cursor-pointer">
                                {/* Abstract shape behind image */}
                                <div className={`absolute inset-0 bg-brand-secondary rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500`}></div>
                                <div className={`absolute -inset-2 border-2 ${index === 0 ? 'border-brand-primary' : 'border-brand-secondary'} rounded-full transform ${index % 2 === 0 ? 'rotate-6' : '-rotate-6'} scale-105 opacity-60 group-hover:rotate-12 transition-transform duration-500`}></div>
                                
                                <img 
                                    src={author.image} 
                                    alt={author.name} 
                                    className="w-64 h-64 md:w-80 md:h-80 object-cover aspect-square rounded-full border-8 border-white dark:border-gray-800 shadow-2xl relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:rotate-3" 
                                />
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="md:w-7/12 text-center md:text-left">
                             <h6 className={`font-bold text-sm tracking-widest uppercase mb-2 ${index === 0 ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                                 Författare
                             </h6>
                             <h2 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark dark:text-white transition-colors">{author.name}</h2>
                             <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-6 flex items-center justify-center md:justify-start gap-2 transition-colors">
                                 {author.role}
                                 <div className="h-px w-8 bg-gray-300 dark:bg-gray-600"></div>
                             </h3>
                             
                             <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8 transition-colors">
                                 {author.description}
                             </p>

                             <div className={`flex gap-4 justify-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                {author.socials.map((s, i) => (
                                    <a 
                                        key={i}
                                        href={s.url}
                                        className="flex items-center gap-2 text-sm font-bold text-brand-dark dark:text-white hover:text-brand-primary dark:hover:text-brand-primary transition-colors group"
                                    >
                                        <span className="bg-white dark:bg-gray-800 w-10 h-10 rounded-full shadow-md flex items-center justify-center border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform">
                                            {s.icon}
                                        </span>
                                        <span>{s.label}</span>
                                    </a>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}

        {/* Common Share Section */}
        <div className="bg-brand-bg dark:bg-[#050505] border-t border-gray-200 dark:border-gray-800 py-16 relative transition-colors duration-300">
             <div className="container mx-auto px-4 text-center relative z-10">
                 <h3 className="text-2xl font-bold mb-8 text-brand-dark dark:text-white transition-colors">Dela boken med ditt nätverk</h3>
                 
                 <div className="flex flex-wrap gap-4 justify-center">
                     <SocialLink 
                        icon={<Facebook size={20} />} 
                        url={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} 
                        colorClass="hover:bg-[#1877F2] hover:text-white text-[#1877F2] dark:bg-[#1877F2]/10 dark:hover:bg-[#1877F2]"
                        label="Facebook"
                     />
                     <SocialLink 
                        icon={<Twitter size={20} />} 
                        url={`https://twitter.com/intent/tweet?url=${encodedUrl}`} 
                        colorClass="hover:bg-[#1DA1F2] hover:text-white text-[#1DA1F2] dark:bg-[#1DA1F2]/10 dark:hover:bg-[#1DA1F2]"
                        label="Twitter"
                     />
                     <SocialLink 
                        icon={<Linkedin size={20} />} 
                        url={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} 
                        colorClass="hover:bg-[#0A66C2] hover:text-white text-[#0A66C2] dark:bg-[#0A66C2]/10 dark:hover:bg-[#0A66C2]"
                        label="LinkedIn"
                     />
                     <SocialLink
                        icon={<LinkIcon size={20} />}
                        onClick={copyToClipboard}
                        colorClass="hover:bg-gray-800 hover:text-white text-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-white dark:hover:text-black"
                        label="Kopiera länk"
                     />
                 </div>
             </div>
        </div>
    </div>
  );
};