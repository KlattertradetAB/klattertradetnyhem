// SettingsModal.tsx - Premium member settings with liquid glass style
import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { Settings, X } from 'lucide-react';
import { Profile } from '../types';

interface SettingsModalProps {
    user: Profile;
    onClose: () => void;
    onUpdate: (profile: Profile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ user, onClose, onUpdate }) => {
    const [displayName, setDisplayName] = useState(user.full_name || '');
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
        user.notifications_enabled ?? true,
    );
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Request notification permission when toggling on
    const handleToggle = async (checked: boolean) => {
        setNotificationsEnabled(checked);
        if (checked && Notification.permission !== 'granted') {
            try {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    setError('Notiser avvisades av användaren.');
                }
            } catch (e) {
                setError('Kunde inte begära notistillstånd.');
            }
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setError(null);
        try {
            // Update auth metadata
            const { error: authError } = await supabase.auth.updateUser({
                data: {
                    full_name: displayName,
                    notifications_enabled: notificationsEnabled,
                },
            });
            if (authError) throw authError;

            // Update profiles table
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name: displayName,
                    notifications_enabled: notificationsEnabled
                })
                .eq('id', user.id);
            if (profileError) throw profileError;

            // Update local profile
            const updatedProfile: Profile = {
                ...user,
                full_name: displayName,
                notifications_enabled: notificationsEnabled,
            };
            onUpdate(updatedProfile);
            onClose();
        } catch (e: any) {
            setError(e.message ?? 'Ett fel inträffade vid sparning.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Glass backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-xl" onClick={onClose} />
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Inställningar</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-300">
                        <X size={20} />
                    </button>
                </div>
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-200 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-200 mb-1">Visningsnamn</label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                </div>
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-gray-200">Notiser på</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={e => handleToggle(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/20 border border-white/30 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500/80 peer-checked:border-orange-500 peer-checked:after:bg-white" />
                    </label>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 rounded disabled:opacity-50"
                >
                    {saving ? 'Sparar...' : 'Spara'}
                </button>
            </div>
        </div>
    );
};
