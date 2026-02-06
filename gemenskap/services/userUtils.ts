
/**
 * Determines the effective avatar URL for a user.
 * Enforces a specific icon for admin emails.
 */
export const getEffectiveAvatar = (email?: string, avatarUrl?: string | null): string | null => {
    const adminEmails = ['billy.ljungberg90@gmail.com', 'billy@klattertradet.se'];

    if (email && adminEmails.includes(email)) {
        return '/icon-512.png';
    }

    return avatarUrl || null;
};

/**
 * Gets the display initials for a user.
 * Useful for fallback when no avatar is present.
 */
export const getUserInitials = (fullName?: string): string => {
    return fullName?.charAt(0) || '?';
};
