
import React, { useState, useEffect } from 'react';
import { Newspaper, Sparkles, Clock, Bell, CheckCircle, ArrowRight, BookOpen, Book, FileText, X, User } from 'lucide-react';
import { Page } from '../types';
import Newsletter from '../components/Newsletter';
import PDFViewer from '../components/PDFViewer';
import SocialIconsWidget from '../components/SocialIconsWidget';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../gemenskap/services/supabase';

interface BlogProps {
  setPage: (page: Page) => void;
}

const Blog: React.FC<BlogProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState({ url: '', title: '' });
  const [supabasePosts, setSupabasePosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  useEffect(() => {
    fetchSupabasePosts();
  }, []);

  const fetchSupabasePosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      if (data) setSupabasePosts(data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  const featuredPosts = [
    {
      title: t.blog_post1_title,
      description: t.blog_post1_desc,
      date: t.blog_status_popular,
      category: t.blog_post1_category,
      author: "Horizonten Team",
      authorRole: t.blog_post1_author_role,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600&h=400"
    },
    {
      title: t.blog_post2_title,
      description: t.blog_post2_desc,
      date: t.blog_status_featured,
      category: t.blog_post2_category,
      author: "Billy Ljungberg",
      authorRole: t.blog_post2_author_role,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600&h=400"
    }
  ];

  const blogPosts = [
    {
      title: t.blog_article1_title,
      description: t.blog_article1_desc,
      pdfUrl: "/Attributionsfel-narcissism.pdf",
      category: t.blog_article1_category,
      date: "2024-01-20"
    },
    {
      title: t.blog_article2_title,
      description: t.blog_article2_desc,
      pdfUrl: "/Polarisering-av-personlighetsstörningar .pdf",
      category: t.blog_article2_category,
      date: "2024-01-15"
    }
  ];

  const handleOpenPdf = (pdfUrl: string, title: string) => {
    setSelectedPdf({ url: pdfUrl, title });
    setIsPdfOpen(true);
  };

  const handleOpenPost = (post: any) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 animate-fade-in space-y-12">
      <PDFViewer
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl={selectedPdf.url}
        title={selectedPdf.title}
      />

      {/* Featured Section (from snippet) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20 glass bg-white/[0.02] border border-white/10 rounded-[4rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

        <div className="mx-auto max-w-2xl lg:mx-0 relative z-10">
          <h2 className="text-4xl font-black tracking-tighter text-white sm:text-5xl">{t.blog_featured_title}</h2>
          <p className="mt-4 text-lg text-white/60 font-light italic">{t.blog_featured_sub}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-white/10 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 relative z-10">
          {featuredPosts.map((post, idx) => (
            <article key={idx} className="flex max-w-xl flex-col items-start justify-between group">
              <div className="flex items-center gap-x-4 text-xs">
                <time className="text-white/40 font-bold tracking-widest uppercase">{post.date}</time>
                <span className="relative z-10 rounded-full bg-orange-500/20 px-3 py-1.5 font-black text-orange-400 uppercase tracking-widest">{post.category}</span>
              </div>
              <div className="group relative grow">
                <h3 className="mt-6 text-2xl font-black text-white group-hover:text-amber-200 transition-colors leading-tight">
                  <a href="#">
                    <span className="absolute inset-0"></span>
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-white/50 font-light italic">{post.description}</p>
              </div>
              <div className="relative mt-10 flex items-center gap-x-4">
                <img src={post.image} alt={post.author} className="size-12 rounded-2xl bg-white/5 object-cover shadow-2xl border border-white/10" />
                <div className="text-sm">
                  <p className="font-black text-white uppercase tracking-wider text-[11px] mb-0.5">
                    <a href="#">
                      <span className="absolute inset-0"></span>
                      {post.author}
                    </a>
                  </p>
                  <p className="text-white/30 text-[10px] font-bold uppercase">{post.authorRole}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="max-w-5xl mx-auto space-y-8">
        <h3 className="text-sm font-black px-4 text-white/30 uppercase tracking-[0.3em] flex items-center gap-3">
          <Sparkles size={16} className="text-orange-500" /> {t.blog_library_label}
        </h3>

        <div className="grid gap-6">
          {/* Supabase Posts */}
          {supabasePosts.map((post) => (
            <div
              key={post.id}
              className="glass bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-6 md:p-10 hover:bg-white/[0.05] hover:border-orange-500/30 transition-all duration-500 group relative overflow-hidden flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="md:w-1/3 w-full h-48 md:h-64 rounded-3xl overflow-hidden relative">
                {post.image_url ? (
                  <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full bg-orange-500/10 flex items-center justify-center text-orange-400">
                    <FileText size={64} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="md:w-2/3 space-y-4 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">
                    NYHET
                  </span>
                  <span className="text-[10px] font-bold text-white/30 flex items-center gap-1">
                    <Clock size={12} /> {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  {post.author_name && (
                    <span className="text-[10px] font-bold text-white/30 flex items-center gap-1">
                      <User size={12} /> {post.author_name}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-amber-200 transition-colors">
                  {post.title}
                </h2>

                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl font-light line-clamp-2">
                  {post.description}
                </p>

                <button
                  onClick={() => handleOpenPost(post)}
                  className="flex items-center gap-2 text-orange-400 font-black text-sm md:text-base hover:gap-4 transition-all mx-auto md:mx-0"
                >
                  {t.blog_read_more} <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}

          {/* Hardcoded PDF Posts */}
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
                  {t.blog_read_more} <ArrowRight size={20} />
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
              {t.blog_notify_title}
            </h2>
            <p className="text-white/60 max-w-lg mx-auto leading-relaxed font-light">
              {t.blog_notify_desc}
            </p>
          </div>

          {!isSubscribed ? (
            <button
              onClick={handleSubscribe}
              className="px-8 py-3.5 bg-orange-500 hover:bg-orange-400 text-slate-950 rounded-xl font-black transition-all hover:scale-105 shadow-xl shadow-orange-500/20 flex items-center gap-2 uppercase tracking-widest text-xs"
            >
              {t.blog_notify_btn}
            </button>
          ) : (
            <div className="flex items-center gap-3 px-8 py-3.5 bg-green-500/20 border border-green-500/40 rounded-xl text-green-400 text-sm font-black animate-fade-in uppercase tracking-widest">
              <CheckCircle size={18} />
              {t.blog_notify_ok}
            </div>
          )}
        </div>
      </div>


      {/* Blog Post Reader Modal */}
      {selectedPost && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${isPostModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setIsPostModalOpen(false)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/10 p-2.5 rounded-2xl text-orange-500">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-black text-white text-xl leading-none">{selectedPost.title}</h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mt-2 font-bold">{new Date(selectedPost.created_at).toLocaleDateString()} • {selectedPost.author_name || 'Admin'}</p>
                </div>
              </div>
              <button onClick={() => setIsPostModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl text-white/50 hover:text-white transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
              {selectedPost.image_url && (
                <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                  <img src={selectedPost.image_url} alt={selectedPost.title} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-amber-200/90 italic font-light leading-relaxed border-l-4 border-orange-500/50 pl-6 mb-10">
                  {selectedPost.description}
                </p>
                <div className="text-white/80 leading-[1.8] text-lg font-light whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-8 py-6 border-t border-white/5 bg-white/[0.02] flex justify-end">
               <button onClick={() => setIsPostModalOpen(false)} className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all text-sm">
                Stäng
              </button>
            </div>
          </div>
        </div>
      )}

      <SocialIconsWidget />

      <Newsletter />

      {/* Categories Placeholder */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-30 grayscale pointer-events-none">
        {[t.blog_tag_trauma, t.blog_tag_gestalt, t.blog_tag_pedagogik, t.blog_tag_reflektion].map(cat => (
          <div key={cat} className="glass bg-white/5 border border-white/10 py-3 rounded-full text-center text-xs uppercase tracking-widest font-bold">
            {cat}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Blog;
