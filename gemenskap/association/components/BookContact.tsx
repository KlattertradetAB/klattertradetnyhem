import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const BookContact: React.FC = () => {
  return (
    <section className="bg-brand-btn relative pt-32 pb-20 overflow-hidden">
      {/* Top Left Triangle Shape Divider */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[300px] md:border-t-[450px] border-r-[300px] md:border-r-[450px] border-t-white dark:border-t-[#050505] border-r-transparent transition-colors duration-300"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Info */}
          <div className="lg:w-5/12 text-white pt-10">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">Kontakta oss</h2>
             <p className="text-white/90 text-lg mb-10">
               Har du frågor om boken eller vill boka en föreläsning? Skicka ett meddelande så återkommer jag så snart som möjligt.
             </p>

             <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center text-white shrink-0">
                   <Phone size={18} />
                 </div>
                 <span className="font-semibold text-lg">070-123 45 67</span>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center text-white shrink-0">
                   <Mail size={18} />
                 </div>
                 <span className="font-semibold text-lg">kontakt@ebooklanding.com</span>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center text-white shrink-0">
                   <MapPin size={18} />
                 </div>
                 <span className="font-semibold text-lg">Storgatan 1, Stockholm</span>
               </div>
             </div>
          </div>

          {/* Form */}
          <div className="lg:w-7/12">
             <form className="bg-white dark:bg-gray-800 rounded-medium p-8 md:p-10 shadow-2xl transition-colors duration-300">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-gray-500 dark:text-gray-300 ml-2">Namn</label>
                   <input type="text" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white rounded-large px-6 py-3 focus:outline-none focus:border-brand-primary transition-colors" placeholder="Förnamn Efternamn" />
                 </div>
                 <div className="flex flex-col gap-2">
                   <label className="text-sm font-bold text-gray-500 dark:text-gray-300 ml-2">E-postadress</label>
                   <input type="email" className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white rounded-large px-6 py-3 focus:outline-none focus:border-brand-primary transition-colors" placeholder="namn@exempel.se" />
                 </div>
               </div>
               
               <div className="flex flex-col gap-2 mb-8">
                  <label className="text-sm font-bold text-gray-500 dark:text-gray-300 ml-2">Meddelande</label>
                  <textarea className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 dark:text-white rounded-medium px-6 py-4 focus:outline-none focus:border-brand-primary transition-colors h-32 resize-none" placeholder="Skriv ditt meddelande här..."></textarea>
               </div>

               <button className="w-full bg-brand-btn hover:bg-brand-btn-hover text-white font-bold py-4 rounded-large transition-colors text-lg shadow-lg shadow-brand-btn/30">
                 Skicka meddelande
               </button>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
};