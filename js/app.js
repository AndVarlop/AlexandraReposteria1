// ====== NAVBAR ======
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
});

navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-xmark');
    }
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelector('i').classList.add('fa-bars');
        navToggle.querySelector('i').classList.remove('fa-xmark');
    });
});

// ====== SCROLL SPY ======
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    sections.forEach(sec => {
        const top = sec.offsetTop;
        const h = sec.offsetHeight;
        const id = sec.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!link) return;
        if (y >= top && y < top + h) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        }
    });
});

// ====== PRODUCT FILTERS ======
const filterBtns = document.querySelectorAll('.filter');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        productCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.classList.toggle('hidden', !match);
        });
    });
});

// ====== LIGHTBOX ======
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryImgs = Array.from(document.querySelectorAll('.img-gallery'));
let currentIdx = 0;

const openLightbox = (idx) => {
    currentIdx = idx;
    lightboxImg.src = galleryImgs[idx].src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
};

const navLightbox = (dir) => {
    currentIdx = (currentIdx + dir + galleryImgs.length) % galleryImgs.length;
    lightboxImg.src = galleryImgs[currentIdx].src;
};

galleryImgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navLightbox(-1));
lightboxNext.addEventListener('click', () => navLightbox(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
});

// ====== SCROLL REVEAL ======
const revealEls = document.querySelectorAll('.service-card, .product-card, .testi, .reveal, .repostera-wrap');
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// ====== CONTACT FORM -> WHATSAPP ======
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const WA_NUMBER = '573022594069'; // placeholder

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')?.trim();
    const phone = data.get('phone')?.trim();
    const type = data.get('type');
    const message = data.get('message')?.trim();

    if (!name || !phone || !type || !message) {
        formStatus.textContent = 'Por favor completa todos los campos.';
        formStatus.style.color = '#e91e63';
        return;
    }

    const text = `Hola Alexandra Repostería! 🍰%0A%0A*Nombre:* ${encodeURIComponent(name)}%0A*Teléfono:* ${encodeURIComponent(phone)}%0A*Pedido:* ${encodeURIComponent(type)}%0A*Mensaje:* ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
    formStatus.textContent = '¡Mensaje abierto en WhatsApp!';
    formStatus.style.color = '#22c55e';
    form.reset();
});

// ====== YEAR ======
document.getElementById('year').textContent = new Date().getFullYear();
