const LANGUAGE_STORAGE_KEY = 'radiance-language';

function getStoredLanguage() {
    try {
        const lang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return lang === 'zh' || lang === 'en' ? lang : null;
    } catch (_error) {
        return null;
    }
}

function storeLanguage(lang) {
    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (_error) {
        // Storage can be disabled in private browsing or strict privacy modes.
    }
}

let userLang = navigator.language || navigator.userLanguage;
let currentLang = getStoredLanguage() || (userLang.startsWith('zh') ? 'zh' : 'en');

function updateLanguage(lang) {
    currentLang = lang;
    
    if (!window.translations) {
        console.error("Translations not loaded!");
        return;
    }

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (window.translations[lang] && window.translations[lang][key]) {
            element.innerHTML = window.translations[lang][key];
        }
    });

    const vAlphaEn = document.getElementById('video-alpha-en');
    const vAlphaZh = document.getElementById('video-alpha-zh');
    const v1En = document.getElementById('video1-en');
    const v1Zh = document.getElementById('video1-zh');

    if (lang === 'zh') {
        if (vAlphaEn) vAlphaEn.classList.add('hidden');
        if (vAlphaZh) vAlphaZh.classList.remove('hidden');
        if (v1En) v1En.classList.add('hidden');
        if (v1Zh) v1Zh.classList.remove('hidden');
    } else {
        if (vAlphaEn) vAlphaEn.classList.remove('hidden');
        if (vAlphaZh) vAlphaZh.classList.add('hidden');
        if (v1En) v1En.classList.remove('hidden');
        if (v1Zh) v1Zh.classList.add('hidden');
    }

    const shouldUpdateSiteMeta = document.body?.dataset.updateSiteMeta === 'true';
    if (shouldUpdateSiteMeta && window.translations[lang]) {
        if (window.translations[lang]['site.title']) {
            document.title = window.translations[lang]['site.title'];
        }
        if (window.translations[lang]['site.desc']) {
            const title = window.translations[lang]['site.title'];
            const desc = window.translations[lang]['site.desc'];
            const metaUpdates = [
                ['meta[name="description"]', desc],
                ['meta[property="og:title"]', title],
                ['meta[property="og:description"]', desc],
                ['meta[property="twitter:title"]', title],
                ['meta[property="twitter:description"]', desc]
            ];

            metaUpdates.forEach(([selector, value]) => {
                const element = document.querySelector(selector);
                if (element && value) element.setAttribute('content', value);
            });
        }
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'zh' ? 'EN' : 'ZH';
    }

    window.syncLanguageVideoEmbeds?.();
}

document.getElementById('lang-toggle')?.addEventListener('click', () => {
    const nextLang = currentLang === 'zh' ? 'en' : 'zh';
    storeLanguage(nextLang);
    updateLanguage(nextLang);
});
