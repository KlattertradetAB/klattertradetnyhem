import { supabase } from './supabase';

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
                emailRedirectTo: `${window.location.origin}/`,
                data: {
                    full_name: fullName,
                    phone: phone,
                    application_reason: reason,
                    membership_level: membershipLevel,
                    role: role,
                    membership_active: membershipActive,
                    // Extended Metadata
                    signup_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    signup_language: navigator.language,
                    signup_user_agent: navigator.userAgent,
                    signup_at: new Date().toISOString()
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
     * Send a password reset email.
     */
    async resetPassword(email: string) {
        console.log(`Attempting password reset for: ${email}`);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/#update-password`,
        });
        if (error) {
            console.error('Password Reset Error:', error);
            throw error;
        }
        console.log('Reset email sent successfully');
    },

    /**
     * Update the current user's password.
     */
    async updatePassword(password: string) {
        console.log('Attempting to update user password');
        const { error } = await supabase.auth.updateUser({ password });
        if (error) {
            console.error('Update Password Error:', error);
            throw error;
        }
        console.log('Password updated successfully');
    },

    /**
     * Resend the verification email for a user.
     */
    async resendVerificationEmail(email: string) {
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email: email,
            options: {
                emailRedirectTo: `${window.location.origin}/`,
            }
        });
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
    },

    /**
     * Get the currently authenticated user session.
     */
    async getCurrentUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    }
};
