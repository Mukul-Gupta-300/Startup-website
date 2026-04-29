/**
 * Dark Mode Toggle
 * Persists user preference via localStorage.
 * Shows moon icon in light mode, sun icon in dark mode.
 */
(function () {
    'use strict';

    // SVG icons for the toggle button
    var moonSVG = '<svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

    var sunSVG = '<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';

    /**
     * Create the floating toggle button and append to body.
     */
    function createToggle() {
        var btn = document.createElement('button');
        btn.className = 'dark-mode-toggle';
        btn.setAttribute('id', 'dark-mode-toggle');
        btn.setAttribute('aria-label', 'Toggle dark mode');
        btn.setAttribute('title', 'Toggle dark mode');
        btn.innerHTML = moonSVG + sunSVG;
        document.body.appendChild(btn);
        return btn;
    }

    /**
     * Apply or remove dark mode class from body.
     */
    function setDarkMode(enabled) {
        if (enabled) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }

    /**
     * Read saved preference from localStorage.
     * Returns true/false or null if not set.
     */
    function getSavedPreference() {
        var val = localStorage.getItem('darkMode');
        if (val === 'true') return true;
        if (val === 'false') return false;
        return null;
    }

    /**
     * Initialise once the DOM is ready.
     */
    function init() {
        var btn = createToggle();
        var saved = getSavedPreference();

        // Apply saved preference, default to light mode
        if (saved === true) {
            setDarkMode(true);
        }

        // Toggle on click
        btn.addEventListener('click', function () {
            var isDark = document.body.classList.contains('dark-mode');
            setDarkMode(!isDark);
            localStorage.setItem('darkMode', (!isDark).toString());

            // Animate button rotation on toggle
            btn.style.transform = 'rotate(360deg) scale(1.12)';
            setTimeout(function () {
                btn.style.transform = '';
            }, 500);
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
