
/**
 * Determines the effective avatar URL for a user.
 * Enforces a specific icon for admin emails.
 */
export const getEffectiveAvatar = (email?: string, avatarUrl?: string | null, role?: string | null): string | null => {
    // Fallback till emails för admins, men rollen bör helst slå in
    const legacyAdminEmails = ['billy.ljungberg90@gmail.com', 'billy@klattertradet.se', 'jeanettejohansson1989@gmail.com'];
    const isAdmin = role === 'admin' || (email && legacyAdminEmails.includes(email.toLowerCase()));

    if (isAdmin) {
        return '/assets/logo2.png';
    }

    // Tvingar vanliga medlemmar att använda initialer genom att inte returnera deras avatar_url
    return null;
};

/**
 * Gets the display initials for a user.
 * Useful for fallback when no avatar is present.
 */
export const getUserInitials = (fullName?: string): string => {
    if (!fullName) return '?';
    const parts = fullName.split(' ');
    if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
};
