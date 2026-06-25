function router() {
    const rawHash = window.location.hash.substring(1);
    let hash = rawHash || 'home';
    const legacyPageMap = {
        features: 'features.html',
        gallery: 'gallery.html',
        docs: 'docs.html',
        doc: 'docs.html',
        changelog: 'changelog.html',
        download: 'download.html'
    };

    if (legacyPageMap[hash]) {
        window.location.replace(legacyPageMap[hash]);
        return;
    }

    if (rawHash === 'home') {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    const views = document.querySelectorAll('.page-view');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let viewFound = false;
    views.forEach(view => {
        if (view.id === `view-${hash}`) {
            view.classList.add('active');
            viewFound = true;
        } else {
            view.classList.remove('active');
        }
    });

    if (!viewFound) {
        const homeView = document.getElementById('view-home');
        if (homeView) homeView.classList.add('active');
        hash = 'home';
    }

    navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${hash}`) {
            link.classList.add('text-orange-400');
            link.classList.remove('text-gray-300');
        } else {
            link.classList.remove('text-orange-400');
            link.classList.add('text-gray-300');
        }
    });
    
    window.scrollTo(0, 0);
}

window.addEventListener('hashchange', router);
