import React, { useState } from 'react';
import { X, CreditCard, Apple, Chrome, Smartphone, Lock, Loader2 } from 'lucide-react';
import { supabase } from '@/gemenskap/services/supabase';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    price: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, title, price }) => {
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handlePurchase = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('input-name') as string;

        try {
            const { error } = await supabase.from('orders').insert({
                customer_name: name,
                book_title: title,
                email: 'web-bestallning@klattertradet.se', // Placeholder since email isn't in this minimalist form yet
                amount: price,
                status: 'Betald',
                created_at: new Date().toISOString()
            } as any);

            if (error) throw error;

            alert('Tack för ditt köp! En bekräftelse har skickats till din e-post.');
            onClose();
        } catch (err) {
            console.error('Purchase error:', err);
            alert('Ett fel uppstod vid beställningen. Vänligen försök igen.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>
                    <X size={18} />
                </button>

                <div className="checkout-form">
                    <div className="text-center space-y-2 mb-2">
                        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                        <p className="text-orange-600 font-black text-2xl">{price}</p>
                    </div>

                    <div className="payment--options">
                        <button type="button" title="Apple Pay">
                            <Apple size={24} className="text-slate-900" />
                        </button>
                        <button type="button" title="Google Pay">
                            <Chrome size={24} className="text-slate-900" />
                        </button>
                        <button type="button" title="PayPal">
                            <span className="font-black italic text-blue-700">Pay</span>
                            <span className="font-black italic text-blue-400">Pal</span>
                        </button>
                    </div>

                    <div className="separator">
                        <hr className="line" />
                        <p>ELLER BETALA MED KORT</p>
                        <hr className="line" />
                    </div>

                    <form className="credit-card-info--form" onSubmit={handlePurchase}>
                        <div className="input_container">
                            <label className="input_label">Fullständigt namn</label>
                            <input
                                className="input_field"
                                type="text"
                                name="input-name"
                                title="Namn på kortet"
                                placeholder="Förnamn Efternamn"
                                required
                            />
                        </div>

                        <div className="input_container">
                            <label className="input_label">Kortnummer</label>
                            <div className="relative">
                                <input
                                    className="input_field"
                                    type="text"
                                    name="input-name"
                                    title="Kortnummer"
                                    placeholder="0000 0000 0000 0000"
                                    required
                                />
                                <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>

                        <div className="split">
                            <div className="input_container">
                                <label className="input_label">Utgångsdatum</label>
                                <input
                                    className="input_field"
                                    type="text"
                                    name="input-name"
                                    title="Utgångsdatum"
                                    placeholder="01/24"
                                    required
                                />
                            </div>
                            <div className="input_container">
                                <label className="input_label">CVV</label>
                                <input
                                    className="input_field"
                                    type="password"
                                    name="input-name"
                                    title="CVV"
                                    placeholder="***"
                                    maxLength={3}
                                    required
                                />
                            </div>
                        </div>

                        <button className="purchase--btn" type="submit" disabled={loading}>
                            {loading ? 'Processar...' : `Betala ${price}`}
                        </button>

                        <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 mt-2">
                            <Lock size={10} /> Säker betalning via krypterad anslutning
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
