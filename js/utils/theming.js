/**
 * Global Namespace Initialization
 */
window.App = {
    Store: {},
    Utils: {},
    Views: {},
    Router: {}
};

/**
 * Theming System (Simplified)
 * Handles basic theme application without animations or complex blending
 */

const THEMES = {
    base: {
        name: 'Standard',
        cssClass: 'theme-base',
        colors: {
            '--primary-color': '#2563EB',
            '--primary-hover': '#1D4ED8',
            '--secondary-color': '#7C3AED',
            '--bg-gradient-start': '#EEF2FF',
            '--bg-gradient-end': '#E0E7FF',
            '--text-main': '#111827',
            '--text-secondary': '#4B5563',
            '--card-bg': '#ffffff',
            '--sidebar-bg': '#ffffff',
            '--border-color': '#E5E7EB'
        }
    }
};

/**
 * Apply a theme to the application
 * @param {string} themeName - Name of the theme to apply
 */
function applyTheme(themeName) {
    const activeTheme = THEMES.base; // Always use base theme for now per minimalist requirement
    
    const root = document.documentElement;
    Object.entries(activeTheme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    // Clean up any existing theme classes
    document.body.className = '';
    document.body.classList.add(activeTheme.cssClass);

    console.log(`Applied theme: ${activeTheme.name}`);
}

/**
 * Get current time-based greeting (morning, afternoon, evening)
 * Useful for UI but doesn't affect theme colors
 */
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
}

// Export the theming utility
window.App.Utils.Theming = {
    applyTheme,
    getGreeting
};
