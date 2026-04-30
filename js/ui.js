// Lucide icons
lucide.createIcons();

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.toggle('translate-x-full');
    if (!mobileMenu.classList.contains('translate-x-full')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

mobileMenuBtn?.addEventListener('click', toggleMobileMenu);
mobileMenuClose?.addEventListener('click', toggleMobileMenu);
mobileNavLinks.forEach(link => link.addEventListener('click', toggleMobileMenu));

// Logo Click Handler
document.getElementById('logo-home')?.addEventListener('click', () => {
    window.location.hash = 'home';
});

// Changelog Rendering
async function renderChangelog(lang) {
    const container = document.querySelector('#view-changelog .space-y-8');
    if (!container) return;

    try {
        const response = await fetch('./data/changelog.json');
        const data = await response.json();
        
        container.innerHTML = ''; // Clear existing
        
        data.forEach(entry => {
            const card = document.createElement('div');
            card.className = 'glass p-8 relative border-l-4 border-orange-500';
            
            const badge = document.createElement('div');
            badge.className = 'absolute top-4 right-4 bg-orange-900/50 text-yellow-400 px-3 py-1 text-[12px] border border-orange-500';
            badge.textContent = entry.badge;
            
            const title = document.createElement('h2');
            title.className = 'text-xl text-white mb-2';
            title.textContent = entry.version;
            
            const date = document.createElement('div');
            date.className = 'text-gray-500 text-[12px] mb-6';
            date.textContent = entry.date;
            
            const list = document.createElement('ul');
            list.className = 'list-disc list-inside space-y-2 text-sm text-gray-300 mb-6';
            
            const items = entry.items[lang] || entry.items['en'] || [];
            items.forEach(itemText => {
                const li = document.createElement('li');
                li.innerHTML = itemText;
                list.appendChild(li);
            });
            
            card.appendChild(badge);
            card.appendChild(title);
            card.appendChild(date);
            card.appendChild(list);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading changelog:', error);
        container.innerHTML = '<p class="text-gray-500 text-center">Failed to load changelog.</p>';
    }
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxRotateBtn = document.getElementById('lightbox-rotate-btn');
let isVideoRotated = false;

function openLightbox(source, type = 'image') {
    if (!lightbox) return;
    lightbox.classList.remove('hidden');
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.classList.remove('opacity-0');
    }, 10);
    document.body.style.overflow = 'hidden';
    resetVideoRotation();

    if (type === 'image') {
        if (lightboxImg) {
            lightboxImg.src = source;
            lightboxImg.classList.remove('hidden');
        }
        if (lightboxVideo) {
            lightboxVideo.classList.add('hidden');
            lightboxVideo.pause();
        }
        lightboxRotateBtn?.classList.add('hidden');
    } else if (type === 'video') {
        if (lightboxVideo) {
            lightboxVideo.src = source;
            lightboxVideo.classList.remove('hidden');
            lightboxVideo.play();
        }
        if (lightboxImg) lightboxImg.classList.add('hidden');
        lightboxRotateBtn?.classList.remove('hidden');
    }
}

function closeLightbox(e) {
    if (e && (e.target === lightboxImg || e.target === lightboxVideo || (lightboxRotateBtn && lightboxRotateBtn.contains(e.target)))) return;

    if (!lightbox) return;
    lightbox.classList.add('opacity-0');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.style.display = 'none';
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = "";
        }
        if (lightboxImg) lightboxImg.src = "";
        resetVideoRotation();
    }, 300);
    document.body.style.overflow = '';
}

function toggleRotate(e) {
    if (e) e.stopPropagation();
    isVideoRotated = !isVideoRotated;
    const video = document.getElementById('lightbox-video');
    if (!video) return;
    
    if (isVideoRotated) {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        video.style.width = `${screenH}px`;
        video.style.height = `${screenW}px`;
        video.style.maxWidth = 'none';
        video.style.maxHeight = 'none';
        video.style.transform = 'rotate(90deg)';
    } else {
        resetVideoRotation();
    }
}

function resetVideoRotation() {
    const video = document.getElementById('lightbox-video');
    if (!video) return;
    video.style.transform = '';
    video.style.width = '';
    video.style.height = '';
    video.style.maxWidth = '100%';
    video.style.maxHeight = '100%';
    isVideoRotated = false;
}

lightbox?.addEventListener('click', closeLightbox);
lightboxRotateBtn?.addEventListener('click', toggleRotate);

// Bindings
document.querySelectorAll('.zoom-container img').forEach(img => {
    img.addEventListener('click', (e) => {
        e.preventDefault();
        if (img.src.includes('placehold.co')) return;
        openLightbox(img.src, 'image');
    });
});

document.querySelectorAll('.zoom-video-container').forEach(container => {
    container.addEventListener('click', (e) => {
        const video = container.querySelector('video');
        const source = video.querySelector('source') ? video.querySelector('source').src : video.src;
        if (source) openLightbox(source, 'video');
    });
});

// Browser Detection
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    document.body.classList.add('is-firefox');
}

// Deferred Video Loading
window.addEventListener('load', function() {
    setTimeout(function() {
        var video = document.getElementById('video-background');
        if(video) {
            var source = document.createElement('source');
            source.src = 'resources/campfire_pressed.mp4';
            source.type = 'video/mp4';
            video.appendChild(source);
            video.load();
            video.play().catch(e => console.log('Autoplay blocked:', e));
        }
    }, 100); 
});
