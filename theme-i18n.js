/**
 * MouseTester.io - Theme Manager & Multilingual (i18n) Engine
 * 100% Client-Side Vanilla JS | Zero Dependencies
 */

(function () {
  'use strict';

  // --- 1. Theme Manager (Dark / Light Mode) ---
  const THEME_KEY = 'mousetester_theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'light' ? '☀️ <span class="theme-text">Light</span>' : '🌙 <span class="theme-text">Dark</span>';
      themeBtn.setAttribute('title', theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme');
    }
  }

  function getStoredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.blur();
    }
  }

  // Apply immediately before DOM render to prevent flash
  applyTheme(getStoredTheme());

  // --- 2. Multilingual Locales Dictionary & Dynamic Route Resolver ---
  const LOCALES = [
    { code: 'en', name: 'English', flag: '🇺🇸', folder: '' },
    { code: 'es', name: 'Español', flag: '🇪🇸', folder: 'es' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', folder: 'de' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', folder: 'fr' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹', folder: 'it' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', folder: 'ja' },
    { code: 'zh', name: '中文', flag: '🇨🇳', folder: 'zh' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', folder: 'ko' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', folder: 'hi' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱', folder: 'nl' }
  ];

  function getCurrentContext() {
    const path = window.location.pathname || '';
    const parts = path.split('/').filter(Boolean);
    let currentCode = 'en';

    for (const loc of LOCALES) {
      if (loc.folder && parts.includes(loc.folder)) {
        currentCode = loc.code;
        break;
      }
    }

    // Extract current filename
    let filename = 'index.html';
    if (parts.length > 0) {
      const last = parts[parts.length - 1];
      if (last.endsWith('.html')) {
        filename = last;
      }
    }

    return { currentCode, filename };
  }

  function resolveLanguageUrl(targetLoc, currentCode, filename) {
    if (targetLoc.code === currentCode) return '#';

    const isSubdir = currentCode !== 'en';
    const prefix = isSubdir ? '../' : './';

    if (targetLoc.code === 'en') {
      return `${prefix}${filename}`;
    } else {
      return `${prefix}${targetLoc.folder}/${filename}`;
    }
  }

  function initLocales() {
    const dropdown = document.getElementById('langDropdownList');
    const currentBtn = document.getElementById('currentLangBtn');
    if (!dropdown || !currentBtn) return;

    const { currentCode, filename } = getCurrentContext();
    const currentLocale = LOCALES.find(l => l.code === currentCode) || LOCALES[0];

    currentBtn.innerHTML = `🌐 ${currentLocale.code.toUpperCase()} ▾`;

    dropdown.innerHTML = LOCALES.map(loc => `
      <a href="${resolveLanguageUrl(loc, currentCode, filename)}" 
         data-lang="${loc.code}" 
         class="${loc.code === currentCode ? 'active' : ''}">
        <span>${loc.flag} ${loc.name}</span>
        <span style="font-size:0.75rem; color:var(--text-subtle);">${loc.code.toUpperCase()}</span>
      </a>
    `).join('');

    // Attach click handler to store preference
    dropdown.querySelectorAll('a[data-lang]').forEach(link => {
      link.addEventListener('click', (e) => {
        const lang = link.getAttribute('data-lang');
        if (lang) {
          localStorage.setItem('preferred_locale', lang);
        }
      });
    });
  }

  // --- 3. Interactive Dropdown Controllers (More Tools & Lang) ---
  function initDropdownHandlers() {
    // Nav Dropdown (More Tools)
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    navDropdowns.forEach(dd => {
      const btn = dd.querySelector('.nav-dropdown-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          // Close other dropdowns
          document.querySelectorAll('.lang-dropdown.open').forEach(l => l.classList.remove('open'));
          dd.classList.toggle('open');
          btn.blur();
        });
      }
    });

    // Language Dropdown
    const langDropdowns = document.querySelectorAll('.lang-dropdown');
    langDropdowns.forEach(ld => {
      const btn = ld.querySelector('.lang-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          // Close more tools dropdowns
          document.querySelectorAll('.nav-dropdown.open').forEach(n => n.classList.remove('open'));
          ld.classList.toggle('open');
          btn.blur();
        });
      }
    });

    // Global outside click to close
    document.addEventListener('click', () => {
      document.querySelectorAll('.nav-dropdown.open, .lang-dropdown.open').forEach(el => {
        el.classList.remove('open');
      });
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.nav-dropdown.open, .lang-dropdown.open').forEach(el => {
          el.classList.remove('open');
        });
      }
    });
  }

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getStoredTheme());
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', function (e) {
        toggleTheme();
        this.blur();
      });
      themeBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.blur();
        }
      });
    }
    initLocales();
    initDropdownHandlers();
  });
})();
