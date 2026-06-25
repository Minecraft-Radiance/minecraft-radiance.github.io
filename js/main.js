// Main entry point
window.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Config-based UI
    if (typeof SITE_CONFIG !== 'undefined') {
        document.querySelectorAll('.js-logo-img').forEach(img => {
            img.src = SITE_CONFIG.logoPath;
        });

        const featureImgMap = {
            'img-feature-rt': SITE_CONFIG.featureImages.rt,
            'img-feature-interact': SITE_CONFIG.featureImages.interact,
            'img-feature-upscale': SITE_CONFIG.featureImages.upscale,
            'img-feature-pbr': SITE_CONFIG.featureImages.pbr,
            'img-feature-pipeline': SITE_CONFIG.featureImages.pipeline
        };

        for (const [id, url] of Object.entries(featureImgMap)) {
            const imgEl = document.getElementById(id);
            if (imgEl && url) {
                imgEl.src = url;
            }
        }
    }

    // 2. Initialize Language
    if (typeof updateLanguage === 'function') {
        updateLanguage(currentLang);
    }

    // 3. Initialize Router
    if (typeof router === 'function') {
        router();
    }
});
