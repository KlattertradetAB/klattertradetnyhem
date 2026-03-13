import React from 'react';
import { Page } from '../types';
import { BookOpen, CheckCircle, Smartphone, ArrowRight, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import PricingCard from '../components/ui/PricingCard';
import CheckoutModal from '../components/ui/CheckoutModal';

interface BookPromotionProps {
    setPage: (page: Page) => void;
}

const BookPromotion: React.FC<BookPromotionProps> = ({ setPage }) => {
    const { t } = useLanguage();
    const [checkoutOpen, setCheckoutOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState({ title: '', price: '' });

    const openCheckout = (title: string, price: string) => {
        setSelectedProduct({ title, price });
        setCheckoutOpen(true);
    };

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 animate-fade-in space-y-24">
            {/* Hero Section */}
            <section className="glass bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] p-8 md:p-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-block px-4 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 text-amber-500 text-xs font-black uppercase tracking-widest">
                            {t.book_badge}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold leading-tight text-white">
                            {t.book_title} <br />
                            <span className="text-2xl md:text-4xl font-light text-amber-200/80 block mt-4">
                                {t.book_subtitle}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                            {t.book_intro_p1}
                            <br />
                            {t.book_intro_p2}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <button
                                onClick={() => openCheckout(t.book_title, '200:-')}
                                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-black transition-all hover:scale-105 shadow-2xl shadow-amber-500/20 flex items-center gap-2"
                            >
                                {t.book_order_now} <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:flex justify-end">
                        <div className="relative w-80 h-96">
                            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-[2rem] blur-3xl animate-pulse"></div>
                            <div className="relative glass bg-white/5 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-all duration-500">
                                <img
                                    src="/booklet.jpeg"
                                    alt="Bokomslag"
                                    className="w-full h-full object-contain p-4"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Highlight */}
            <section className="glass bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-[2.5rem] p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shrink-0">
                        <Smartphone size={32} />
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium text-blue-100/90 italic leading-relaxed">
                        {t.book_app_highlight}
                    </blockquote>
                </div>
            </section>

            {/* Book Content */}
            <section className="grid md:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">{t.book_content_title}</h2>
                    <div className="grid gap-6">
                        {[
                            { title: t.book_content_item1_title, text: t.book_content_item1_text },
                            { title: t.book_content_item2_title, text: t.book_content_item2_text },
                            { title: t.book_content_item3_title, text: t.book_content_item3_text },
                            { title: t.book_content_item4_title, text: t.book_content_item4_text },
                            { title: t.book_content_item5_title, text: t.book_content_item5_text }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                <div className="p-1 mt-1">
                                    <CheckCircle className="text-amber-500 w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">{t.book_for_who_title}</h2>
                    <div className="space-y-6 text-zinc-300 leading-relaxed text-lg">
                        <p>
                            {t.book_for_who_p1}
                        </p>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-white/90 font-medium">
                                {t.book_for_who_p2_part1} <span className="text-amber-400">{t.book_for_who_p2_amber}</span> {t.book_for_who_p2_part2}
                            </p>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <div className="flex items-center gap-4 text-zinc-400">
                            <Shield className="text-amber-500/50" />
                            <p className="text-sm italic">{t.book_research_note}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="relative isolate bg-transparent px-6 py-24 sm:py-32 lg:px-8">
                <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                    <div
                        style={{
                            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
                        }}
                        className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-amber-500 to-amber-700 opacity-20"
                    ></div>
                </div>

                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base/7 font-semibold text-amber-500 uppercase tracking-widest">{t.book_pricing_label}</h2>
                    <p className="mt-2 text-balance text-5xl font-bold tracking-tight text-white sm:text-6xl">{t.book_pricing_title}</p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-zinc-400 sm:text-xl/8">
                    {t.book_pricing_subtitle}
                </p>

                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-10 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2 lg:gap-x-8">
                    {/* Online Access */}
                    <PricingCard
                        title={t.book_pricing_digital_title}
                        price={t.book_pricing_digital_price}
                        period={t.book_pricing_digital_sub}
                        description={t.book_pricing_digital_desc}
                        buttonText={t.book_pricing_digital_btn}
                        onButtonClick={() => openCheckout(`${t.book_title} (${t.book_pricing_digital_title})`, t.book_pricing_digital_price)}
                        features={[
                            t.book_pricing_digital_feat1,
                            t.book_pricing_digital_feat2,
                            t.book_pricing_digital_feat3,
                            t.book_pricing_digital_feat4
                        ]}
                    />

                    {/* Full Download */}
                    <PricingCard
                        title={t.book_pricing_full_title}
                        price={t.book_pricing_full_price}
                        period={t.book_pricing_full_sub}
                        description={t.book_pricing_full_desc}
                        buttonText={t.book_pricing_full_btn}
                        onButtonClick={() => openCheckout(`${t.book_title} (${t.book_pricing_full_title})`, t.book_pricing_full_price)}
                        isPopular={true}
                        className="lg:scale-105"
                        features={[
                            t.book_pricing_full_feat1,
                            t.book_pricing_full_feat2,
                            t.book_pricing_full_feat3,
                            t.book_pricing_full_feat4
                        ]}
                    />
                </div>
            </section>

            {/* Call to Order */}
            <section className="text-center py-12">
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="p-8 glass bg-white/5 border border-white/10 rounded-[2.5rem]">
                        <p className="text-xl text-amber-200 font-bold mb-6">{t.book_preorder_note}</p>
                        <button
                            onClick={() => openCheckout(t.book_title, '200:-')}
                            className="inline-block bg-amber-500 hover:bg-amber-400 text-slate-950 px-12 py-5 rounded-2xl text-xl font-black transition-all hover:scale-105 shadow-2xl shadow-amber-500/20"
                        >
                            {t.book_preorder_btn}
                        </button>
                    </div>
                </div>
            </section>

            <CheckoutModal
                isOpen={checkoutOpen}
                onClose={() => setCheckoutOpen(false)}
                title={selectedProduct.title}
                price={selectedProduct.price}
            />
        </div>
    );
};

export default BookPromotion;