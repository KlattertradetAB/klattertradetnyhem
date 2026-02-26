import { supabase } from './supabase';
import { Database } from '../types/database.types';

export type UserRole = 'user' | 'medlem' | 'admin';

export interface RegisterOptions {
    email: string;
    password: Buffer | string;
    fullName: string;
    phone?: string;
    reason?: string;
    membershipLevel?: number;
    role?: UserRole;
    membershipActive?: boolean;
}

export const authService = {
    /**
     * Register a new user with metadata that will be synced to the profiles table via DB trigger.
     */
    async register({
        email,
        password,
        fullName,
        phone,
        reason,
        membershipLevel = 1,
        role = 'user',
        membershipActive = true
    }: RegisterOptions) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password: password as string,
            options: {
                emailRedirectTo: window.location.origin,
                data: {
                    full_name: fullName,
                    phone: phone,
                    application_reason: reason,
                    membership_level: membershipLevel,
                    role: role,
                    membership_active: membershipActive,
                },
            },
        });

        if (error) throw error;
        return data;
    },

    /**
     * Log in an existing user.
     */
    async login(email: string, password: Buffer | string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password: password as string,
        });

        if (error) throw error;
        return data;
    },

    /**
     * Log out the current user.
     */
    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    /**
     * Get the current user profile.
     */
    async getProfile(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        return data;
    }
};
