let userLang = navigator.language || navigator.userLanguage; 
let currentLang = userLang.startsWith('zh') ? 'zh' : 'en';

function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    
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

    const v016En = document.getElementById('video-v016-en');
    const v016Zh = document.getElementById('video-v016-zh');
    const interviewCard = document.getElementById('video-interview-card');
    const vAlphaEn = document.getElementById('video-alpha-en');
    const vAlphaZh = document.getElementById('video-alpha-zh');
    const v1En = document.getElementById('video1-en');
    const v1Zh = document.getElementById('video1-zh');

    if (lang === 'zh') {
        if (v016En) v016En.classList.add('hidden');
        if (v016Zh) v016Zh.classList.remove('hidden');
        if (interviewCard) interviewCard.classList.remove('hidden');
        if (vAlphaEn) vAlphaEn.classList.add('hidden');
        if (vAlphaZh) vAlphaZh.classList.remove('hidden');
        if (v1En) v1En.classList.add('hidden');
        if (v1Zh) v1Zh.classList.remove('hidden');
    } else {
        if (v016En) v016En.classList.remove('hidden');
        if (v016Zh) v016Zh.classList.add('hidden');
        if (interviewCard) interviewCard.classList.add('hidden');
        if (vAlphaEn) vAlphaEn.classList.remove('hidden');
        if (vAlphaZh) vAlphaZh.classList.add('hidden');
        if (v1En) v1En.classList.remove('hidden');
        if (v1Zh) v1Zh.classList.add('hidden');
    }

    if (window.translations[lang]) {
        if (window.translations[lang]['site.title']) {
            document.title = window.translations[lang]['site.title'];
        }
        if (window.translations[lang]['site.desc']) {
            const desc = window.translations[lang]['site.desc'];
            document.querySelector('meta[name="description"]').setAttribute('content', desc);
            document.querySelector('meta[property="og:title"]').setAttribute('content', window.translations[lang]['site.title']);
            document.querySelector('meta[property="og:description"]').setAttribute('content', desc);
            document.querySelector('meta[property="twitter:title"]').setAttribute('content', window.translations[lang]['site.title']);
            document.querySelector('meta[property="twitter:description"]').setAttribute('content', desc);
        }
    }

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'zh' ? 'EN' : 'ZH';
    }
}

document.getElementById('lang-toggle')?.addEventListener('click', () => {
    updateLanguage(currentLang === 'zh' ? 'en' : 'zh');
});
