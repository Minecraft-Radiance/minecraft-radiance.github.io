function router() {
    let hash = window.location.hash.substring(1) || 'home';
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
