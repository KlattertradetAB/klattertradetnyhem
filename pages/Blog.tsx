
import React, { useState } from 'react';
import { Newspaper, Sparkles, Clock, Bell, CheckCircle, ArrowRight, BookOpen, Book, FileText } from 'lucide-react';
import { Page } from '../types';
import Newsletter from '../components/Newsletter';
import PDFViewer from '../components/PDFViewer';

interface BlogProps {
  setPage: (page: Page) => void;
}

const Blog: React.FC<BlogProps> = ({ setPage }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState({ url: '', title: '' });

  const blogPosts = [
    {
      title: "Ett grundläggande attributionsfel",
      description: "Varför dömer vi andra hårdare än oss själva? En genomgång av hur våra hjärnor snedvrider verkligheten i sociala relationer.",
      pdfUrl: "/Attributionsfel-narcissism.pdf",
      category: "Psykologi",
      date: "2024-01-20"
    },
    {
      title: "Polarisering och personlighetsstörningar",
      description: "En djupanalys av hur dömande och polarisering påverkar våra relationer och vår självbild i ett kliniskt sammanhang.",
      pdfUrl: "/Polarisering-av-personlighetsstörningar .pdf",
      category: "Klinisk analys",
      date: "2024-01-15"
    }
  ];

  const handleOpenPdf = (pdfUrl: string, title: string) => {
    setSelectedPdf({ url: pdfUrl, title });
    setIsPdfOpen(true);
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 animate-fade-in space-y-12">
      <PDFViewer
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl={selectedPdf.url}
        title={selectedPdf.title}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400">
          Blogg & Reflektion
        </h1>
        <p className="text-lg text-white/70 italic font-light">
          Tankar om trauma, återhämtning och mänsklig utveckling.
        </p>
      </div>

      {/* Blog Posts List */}
      <div className="max-w-5xl mx-auto space-y-8">
        <h3 className="text-sm font-black px-4 text-white/30 uppercase tracking-[0.3em] flex items-center gap-3">
          <Sparkles size={16} className="text-orange-500" /> Senaste inläggen
        </h3>

        <div className="grid gap-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="glass bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-6 md:p-10 hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-500 group relative overflow-hidden flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/4 flex justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-500/10 rounded-3xl flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform duration-500">
                  <FileText size={48} />
                </div>
              </div>

              <div className="md:w-3/4 space-y-4 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-bold text-white/30 flex items-center gap-1">
                    <Clock size={12} /> {post.date}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-amber-200 transition-colors">
                  {post.title}
                </h2>

                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl font-light">
                  {post.description}
                </p>

                <button
                  onClick={() => handleOpenPdf(post.pdfUrl, post.title)}
                  className="flex items-center gap-2 text-orange-400 font-black text-sm md:text-base hover:gap-4 transition-all mx-auto md:mx-0"
                >
                  Läs hela inlägget <ArrowRight size={20} />
                </button>
              </div>

              {/* Decorative background logo */}
              <div className="absolute top-1/2 -translate-y-1/2 right-[5%] p-4 opacity-5 group-hover:opacity-10 transition-opacity blur-[1px] pointer-events-none">
                <img src="/assets/logo2.png" alt="Logo" className="w-40 h-40 md:w-56 md:h-56 object-contain rotate-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Call to Action */}
      <div className="max-w-5xl mx-auto">
        <div className="glass bg-gradient-to-br from-orange-600/10 to-transparent border border-white/10 rounded-[3rem] p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-400">
            <Bell size={32} />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Vill du veta när vi publicerar nästa del?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto leading-relaxed font-light">
              Registrera dig för våra månadsbrev så får du både nya artiklar och inbjudningar till våra workshops direkt i korgen.
            </p>
          </div>

          {!isSubscribed ? (
            <button
              onClick={handleSubscribe}
              className="px-8 py-3.5 bg-orange-500 hover:bg-orange-400 text-slate-950 rounded-xl font-black transition-all hover:scale-105 shadow-xl shadow-orange-500/20 flex items-center gap-2 uppercase tracking-widest text-xs"
            >
              Få notis vid nya inlägg
            </button>
          ) : (
            <div className="flex items-center gap-3 px-8 py-3.5 bg-green-500/20 border border-green-500/40 rounded-xl text-green-400 text-sm font-black animate-fade-in uppercase tracking-widest">
              <CheckCircle size={18} />
              Vi hör av oss!
            </div>
          )}
        </div>
      </div>


      <Newsletter />

      {/* Categories Placeholder */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-30 grayscale pointer-events-none">
        {['Trauma', 'Gestaltterapi', 'Pedagogik', 'Reflektion'].map(cat => (
          <div key={cat} className="glass bg-white/5 border border-white/10 py-3 rounded-full text-center text-xs uppercase tracking-widest font-bold">
            {cat}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Blog;
