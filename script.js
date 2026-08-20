/* =========================================
   PORTFOLIO JOHAN HEURTEBISE - JAVASCRIPT
   Version 2.0 - Janvier 2025
   ========================================= */

// ------------------------------------------------
// 0. INTRO ANIMATION
// ------------------------------------------------
(function () {
    const screen = document.getElementById('intro-screen');

    if (!screen) return;

    document.body.classList.add('intro-active');

    // Slide arrive à ~1.05s, wave dure 0.85s → tout fini à ~2.05s
    // On tient 0.5s de plus pour profiter du résultat final
    const DISPLAY_DURATION = 1500;

    setTimeout(() => {
        screen.classList.add('fade-out');
        document.body.classList.remove('intro-active');
        setTimeout(() => screen.classList.add('hidden'), 800);
    }, DISPLAY_DURATION);
})();


AOS.init({ 
    once: true, 
    offset: 120,
    duration: 800
});

// ------------------------------------------------
// 2. VANILLA TILT (Hero Avatar)
// ------------------------------------------------
if (document.querySelector(".hero-visual")) {
    VanillaTilt.init(document.querySelector(".hero-visual"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// ------------------------------------------------
// 3. GESTION DU THÈME (Dark/Light)
// ------------------------------------------------
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn?.querySelector('i');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';

// Appliquer le thème sauvegardé
html.setAttribute('data-theme', savedTheme);
if (icon) updateIcon(savedTheme);

toggleBtn?.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (!icon) return;
    if (theme === 'dark') { 
        icon.classList.remove('fa-moon'); 
        icon.classList.add('fa-sun'); 
    } else { 
        icon.classList.remove('fa-sun'); 
        icon.classList.add('fa-moon'); 
    }
}

// ------------------------------------------------
// 4. MENU MOBILE
// ------------------------------------------------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    const isExpanded = navLinks?.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
});

// Fermer le menu au clic sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

// ------------------------------------------------
// 5. SCROLL PROGRESS BAR
// ------------------------------------------------
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercentage + '%';
    }
});
// ------------------------------------------------
// NAVBAR TRANSPARENTE AU SCROLL
// ------------------------------------------------
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Forcer l'état initial
if (window.scrollY > 50) {
    header.classList.add('scrolled');
}

// ------------------------------------------------
// 6. SCROLL SPY (Menu actif au défilement)
// ------------------------------------------------
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinksAll.forEach(link => link.classList.remove('active-link'));
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active-link');
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ------------------------------------------------
// 7. COMPTEUR DE STATS ANIMÉ
// ------------------------------------------------
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
};

// Déclencher au scroll (une seule fois)
let countersAnimated = false;
const statsSection = document.querySelector('.stats-row');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// ------------------------------------------------
// 8. TYPEWRITER EFFECT (Hero)
// ------------------------------------------------
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Démarrer après un délai
    setTimeout(typeWriter, 500);
}

// ------------------------------------------------
// 9. MODALES & CARROUSEL (Logique)
// ------------------------------------------------

// Configuration : index actuel, nombre total de slides, ID du compteur
const trackStates = {
    'track1': { index: 0, total: 6, counterId: 'counter1' },
    'track2': { index: 0, total: 9, counterId: 'counter2' },
    'track3': { index: 0, total: 7, counterId: 'counter3' },
    'track-salle': { index: 0, total: 11, counterId: 'counter-salle' },
    'track-marque': { index: 0, total: 7, counterId: 'counter-marque' }
};

// Bloquer le scroll tactile iOS derrière la modale (sans position:fixed)
function _preventTouchMove(e) {
    const scrollable = e.target.closest('.carousel-slide, .modal-body-skill, .modal-single-page');

    if (scrollable) {
        const touch = e.touches[0];
        const lastY = scrollable._lastTouchY ?? touch.clientY;
        const deltaY = touch.clientY - lastY;
        scrollable._lastTouchY = touch.clientY;

        const noOverflow = scrollable.scrollHeight <= scrollable.clientHeight;

        // Si le contenu ne dépasse pas, ne rien bloquer
        if (noOverflow) return;

        const atTop    = scrollable.scrollTop <= 0;
        const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;

        // Bloquer si on dépasse les extrémités
        if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
            e.preventDefault();
        }
        // Sinon scroll normal à l'intérieur
        return;
    }

    // Hors zone scrollable → toujours bloquer
    e.preventDefault();
}

// Ouvrir une modale
// Méthode 1 : Passer l'event en paramètre
function openModal(id, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const modal = document.getElementById(id);
    if (!modal) return;
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');

    // iOS Safari : bloquer le touchmove sur le fond sans toucher à la position
    // On retire d'abord pour éviter les doublons si openModal est appelé plusieurs fois
    document.removeEventListener('touchmove', _preventTouchMove);
    document.addEventListener('touchmove', _preventTouchMove, { passive: false });
    
    // Reset du carrousel
    const track = modal.querySelector('.carousel-track');
    if (track) {
        const trackId = track.id;
        if (trackStates[trackId]) {
            trackStates[trackId].index = 0;
            let dotsId;
            if (trackId === 'track-salle') { dotsId = 'dots-salle'; }
            else if (trackId === 'track-marque') { dotsId = 'dots-marque'; }
            else { dotsId = 'dots' + trackId.slice(-1); }
            updateCarouselUI(trackId, dotsId);
        }
    }

    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) closeBtn.focus();
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        // Retirer le blocage tactile iOS
        document.removeEventListener('touchmove', _preventTouchMove);
        // Nettoyer les valeurs de touch mémorisées
        modal.querySelectorAll('.carousel-slide, .modal-body-skill, .modal-single-page')
            .forEach(el => delete el._lastTouchY);
    }, 300);
}

// Fermer au clic extérieur
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) { 
        closeModal(e.target.id); 
    }
});

// Bloquer le scroll du fond pendant qu'une modale est ouverte (desktop + mobile)
// Empêche le "scroll bleed" : quand on atteint le bas/haut d'une zone scrollable,
// le scroll ne se propage pas au body derrière.
document.addEventListener('wheel', (e) => {
    const activeModal = document.querySelector('.modal.show');
    if (!activeModal) return;

    const scrollable = e.target.closest('.carousel-slide, .modal-body-skill, .modal-single-page');

    if (scrollable) {
        const scrollingDown = e.deltaY > 0;
        const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;
        const atTop    = scrollable.scrollTop <= 0;
        const noOverflow = scrollable.scrollHeight <= scrollable.clientHeight;

        // Si le contenu ne dépasse pas (pas de scroll possible), ne rien bloquer
        if (noOverflow) return;

        // Si on est à la limite ET qu'on essaie de dépasser → bloquer
        if ((scrollingDown && atBottom) || (!scrollingDown && atTop)) {
            e.preventDefault();
        }
        // Sinon laisser le scroll se faire normalement dans la zone
    } else {
        // Hors zone scrollable (fond, header, nav) → toujours bloquer
        e.preventDefault();
    }
}, { passive: false });

// Fermer avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => closeModal(modal.id));
        
        // Fermer aussi le terminal
        const termWindow = document.getElementById('term-window');
        if (termWindow && termWindow.style.display === 'flex') {
            toggleTerminal();
        }
    }
});

// Navigation Slide (Précédent/Suivant)
function moveSlide(trackId, direction, dotsContainerId) {
    const state = trackStates[trackId];
    if (!state) return;

    state.index += direction;

    // Boucle infinie
    if (state.index < 0) { 
        state.index = state.total - 1; 
    } else if (state.index >= state.total) { 
        state.index = 0; 
    }

    updateCarouselUI(trackId, dotsContainerId);
}

// Navigation par Points
function goToSlide(trackId, slideIndex, dotsContainerId) {
    if (!trackStates[trackId]) return;
    trackStates[trackId].index = slideIndex;
    updateCarouselUI(trackId, dotsContainerId);
}

// Mise à jour de l'interface (Image, Points, Compteur)
function updateCarouselUI(trackId, dotsContainerId) {
    const state = trackStates[trackId];
    const track = document.getElementById(trackId);
    const dotsContainer = document.getElementById(dotsContainerId);
    const counter = document.getElementById(state.counterId);

    // A. Déplacer le track
    if (track) {
        const amountToMove = -100 * state.index;
        track.style.transform = `translateX(${amountToMove}%)`;
    }

    // B. Mettre à jour les points actifs
    if (dotsContainer) {
        const dots = dotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
            dots[i].setAttribute('aria-selected', 'false');
        }
        if (dots[state.index]) {
            dots[state.index].classList.add('active');
            dots[state.index].setAttribute('aria-selected', 'true');
        }
    }

    // C. Mettre à jour le compteur
    if (counter) {
        counter.innerText = `${state.index + 1} / ${state.total}`;
    }
}

// Navigation clavier dans les modales
document.addEventListener('keydown', (e) => {
    const activeModal = document.querySelector('.modal.show');
    if (!activeModal) return;

    const track = activeModal.querySelector('.carousel-track');
    if (!track) return;

    const trackId = track.id;
    let dotsId;
    if (trackId === 'track-salle') { dotsId = 'dots-salle'; }
    else if (trackId === 'track-marque') { dotsId = 'dots-marque'; }
    else { dotsId = 'dots' + trackId.slice(-1); }

    if (e.key === 'ArrowLeft') {
        moveSlide(trackId, -1, dotsId);
    } else if (e.key === 'ArrowRight') {
        moveSlide(trackId, 1, dotsId);
    }
});

// ------------------------------------------------
// SWIPE TACTILE sur les carrousels (mobile)
// ------------------------------------------------
(function initCarouselSwipe() {
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;

    document.addEventListener('touchstart', (e) => {
        const activeModal = document.querySelector('.modal.show');
        if (!activeModal) return;
        const container = activeModal.querySelector('.carousel-container');
        if (!container || !container.contains(e.target)) return;

        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = true;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;

        const activeModal = document.querySelector('.modal.show');
        if (!activeModal) return;
        const container = activeModal.querySelector('.carousel-container');
        if (!container) return;

        const track = activeModal.querySelector('.carousel-track');
        if (!track) return;

        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;

        // Ignorer si le mouvement est principalement vertical (scroll)
        if (Math.abs(deltaY) > Math.abs(deltaX)) return;
        // Seuil minimum de 50px
        if (Math.abs(deltaX) < 50) return;

        const trackId = track.id;
        let dotsId;
        if (trackId === 'track-salle') { dotsId = 'dots-salle'; }
        else if (trackId === 'track-marque') { dotsId = 'dots-marque'; }
        else { dotsId = 'dots' + trackId.slice(-1); }

        if (deltaX < 0) {
            moveSlide(trackId, 1, dotsId);   // swipe gauche → slide suivant
        } else {
            moveSlide(trackId, -1, dotsId);  // swipe droite → slide précédent
        }
    }, { passive: true });
})();

// ------------------------------------------------
// 10. ACCORDÉON (Modales)
// ------------------------------------------------
function toggleAccordion(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('i.fa-chevron-down');
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.remove('active');
        if (icon) icon.style.transform = "rotate(0deg)";
    } else {
        content.classList.add('active');
        content.style.maxHeight = content.scrollHeight + "px";
        if (icon) icon.style.transform = "rotate(180deg)";
    }
}

// ------------------------------------------------
// 11. SYSTÈME D'ONGLETS (Code Tabs)
// ------------------------------------------------
function openTab(evt, tabId) {
    const parent = evt.currentTarget.closest('.code-tabs');
    const contents = parent.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = parent.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// ------------------------------------------------
// 12. TERMINAL WIDGET
// ------------------------------------------------
const termWindow = document.getElementById('term-window');
const termBtnNav = document.getElementById('term-btn-nav');
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('term-output');

// Toggle Terminal
function toggleTerminal() {
    if (!termWindow) return;
    
    if (termWindow.style.display === 'none' || termWindow.style.display === '') {
        termWindow.style.display = 'flex';
        termInput?.focus();
    } else {
        termWindow.style.display = 'none';
    }
}

termBtnNav?.addEventListener('click', toggleTerminal);

// Commandes Terminal
const commands = {
    help: `Commandes disponibles:
    <span class="cmd-highlight">help</span> - Afficher cette aide
    <span class="cmd-highlight">about</span> - À propos de moi
    <span class="cmd-highlight">skills</span> - Mes compétences
    <span class="cmd-highlight">projects</span> - Liste des projets
    <span class="cmd-highlight">contact</span> - Informations de contact
    <span class="cmd-highlight">clear</span> - Effacer le terminal
    <span class="cmd-highlight">konami</span> - Easter egg 🎮`,
    
    about: `Johan Heurtebise - Étudiant BUT R&T
    🎓 IUT de Blois - Spécialité Cybersécurité
    💼 Alternant chez Orange (Avant-vente)
    📍 Blois / Le Mans, France`,
    
    skills: `Compétences principales:
    🌐 Réseaux (Cisco, OSPF, VLANs)
    🔒 Cybersécurité (ANSSI, SecNum)
    🐍 Python (Automatisation, Scripts)
    💻 HTML/CSS/JS (Sites web)
    📡 Télécoms (Fibre FTTH, Signal)`,
    
    projects: `Projets récents:
    • SAE201 - Architecture Réseau CisCorporation
    • SAE101 - Hygiène Informatique & Sensibilisation
    • Salle Dispo - Application Python Open Source
    • Sites vitrines pour clients locaux`,
    
    contact: `Me contacter:
    📧 Email: heurtebise.johan.pro@gmail.com
    📞 Tél: +33 6 71 29 96 10
    💼 LinkedIn: /in/johan-heurtebise
    🐙 GitHub: /JohanHeurtebisePro`,
    
    clear: 'CLEAR',
    
    konami: `🎮 KONAMI CODE ACTIVÉ! 🎮
    <span style="color: #ff6b6b;">⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️</span>
    Félicitations, tu as trouvé l'easter egg!
    <span class="cmd-highlight">+30 points de Nerd Level</span> 🤓`
};

// Traiter les commandes
termInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cmd = termInput.value.trim().toLowerCase();
        
        if (cmd) {
            addToTerminal(`<span class="prompt">➜  ~</span> ${cmd}`);
            
            if (commands[cmd]) {
                if (cmd === 'clear') {
                    termOutput.innerHTML = '';
                } else {
                    addToTerminal(commands[cmd]);
                }
            } else {
                addToTerminal(`<span class="error-msg">Commande inconnue: "${cmd}". Tapez "help" pour l'aide.</span>`);
            }
        }
        
        termInput.value = '';
        termOutput.scrollTop = termOutput.scrollHeight;
    }
});

function addToTerminal(text) {
    const p = document.createElement('p');
    p.innerHTML = text;
    termOutput.appendChild(p);
}

// ------------------------------------------------
// 13. FORMULAIRE DE CONTACT (Gestion + Validation)
// ------------------------------------------------
const contactForm = document.getElementById('contact-form');
const formNotification = document.getElementById('form-notification');

// Validation en temps réel des champs
function validateField(input) {
    const group = input.closest('.input-group');
    if (!group) return true;

    group.classList.remove('field-error', 'field-ok');

    if (input.required && !input.value.trim()) {
        group.classList.add('field-error');
        return false;
    }
    if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
            group.classList.add('field-error');
            return false;
        }
    }
    if (input.value.trim()) {
        group.classList.add('field-ok');
    }
    return true;
}

// Attacher la validation en temps réel sur les champs required
document.querySelectorAll('#contact-form .form-control[required]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
        const group = input.closest('.input-group');
        if (group && group.classList.contains('field-error')) {
            validateField(input);
        }
    });
});

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Valider tous les champs required avant envoi
    const requiredFields = contactForm.querySelectorAll('.form-control[required]');
    let isValid = true;
    requiredFields.forEach(input => {
        if (!validateField(input)) isValid = false;
    });

    if (!isValid) {
        showNotification('Veuillez remplir correctement tous les champs obligatoires.', 'error');
        return;
    }

    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;

    // Désactiver le bouton pendant l'envoi
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            showNotification('Message envoyé avec succès ! Je vous répondrai rapidement.', 'success');
            contactForm.reset();
            // Retirer les états de validation après reset
            document.querySelectorAll('#contact-form .input-group').forEach(g => {
                g.classList.remove('field-error', 'field-ok');
            });
        } else {
            throw new Error('Erreur serveur');
        }
    } catch (error) {
        showNotification("Erreur lors de l'envoi. Veuillez réessayer ou m'écrire directement.", 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
    }
});

function showNotification(message, type) {
    if (!formNotification) return;

    formNotification.textContent = message;
    formNotification.className = `notification ${type}`;
    // Utiliser classList au lieu de style inline
    formNotification.classList.remove('notification--hidden');

    // Scroll vers la notification pour la rendre visible
    formNotification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Masquer après 6 secondes
    setTimeout(() => {
        formNotification.classList.add('notification--hidden');
    }, 6000);
}

// ------------------------------------------------
// 14. FILTRE & RECHERCHE PORTFOLIO
// ------------------------------------------------
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const portfolioSearch = document.getElementById('portfolioSearch');
const noResultsMsg = document.getElementById('noResultsMsg');
const portfolioCountNum = document.getElementById('portfolioCountNum');

let currentFilter = 'all';
let currentSearch = '';

function applyPortfolioFilters() {
    let visibleCount = 0;

    projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const keywords = (card.getAttribute('data-title') || '') + ' ' + (card.querySelector('.card-title')?.textContent || '');

        const matchesFilter = currentFilter === 'all' || category === currentFilter;
        const matchesSearch = currentSearch === '' || keywords.toLowerCase().includes(currentSearch.toLowerCase());

        if (matchesFilter && matchesSearch) {
            card.classList.remove('hidden-card');
            card.classList.remove('filter-animate');
            void card.offsetWidth; // force reflow pour déclencher l'animation
            card.classList.add('filter-animate');
            visibleCount++;
        } else {
            card.classList.add('hidden-card');
            card.classList.remove('filter-animate');
        }
    });

    if (portfolioCountNum) portfolioCountNum.textContent = visibleCount;
    if (noResultsMsg) noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
}

// Initialisation au chargement (nombre de projets, filtre "Tous")
applyPortfolioFilters();

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        applyPortfolioFilters();
    });
});

let searchTimeout;
portfolioSearch?.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentSearch = portfolioSearch.value.trim();
        applyPortfolioFilters();
    }, 250);
});

// ------------------------------------------------
// 14. SMOOTH SCROLL (au clic sur les liens)
// ------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides ou # seul
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80; // Hauteur du header fixe
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ------------------------------------------------
// 15. LAZY LOADING IMAGES (Performance)
// ------------------------------------------------
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ------------------------------------------------
// 16. EASTER EGG - KONAMI CODE
// ------------------------------------------------
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10); // Garder les 10 dernières touches

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateKonamiEasterEgg();
        konamiCode = [];
    }
});

function activateKonamiEasterEgg() {
    // Effet confetti ou animation
    document.body.style.animation = 'rainbow 2s linear';
    
    // Afficher un message
    const easterEgg = document.createElement('div');
    easterEgg.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white; padding: 40px; border-radius: 20px; z-index: 10001;
                    text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                    animation: slideUp 0.5s ease-out;">
            <h2 style="margin-bottom: 20px;">🎮 KONAMI CODE ACTIVÉ! 🎮</h2>
            <p style="font-size: 2rem; margin: 20px 0;">⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️</p>
            <p>Félicitations, tu as trouvé l'easter egg!</p>
            <p style="margin-top: 20px;"><strong>+30 points de Nerd Level</strong> 🤓</p>
            <button onclick="this.parentElement.remove()" 
                    style="margin-top: 30px; padding: 10px 30px; background: white; color: #667eea;
                           border: none; border-radius: 50px; cursor: pointer; font-weight: 600;">
                Fermer
            </button>
        </div>
    `;
    document.body.appendChild(easterEgg);
    
    setTimeout(() => {
        easterEgg.remove();
        document.body.style.animation = '';
    }, 5000);
}

// Animation rainbow pour le konami
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ------------------------------------------------
// FLIP CARDS — Toggle au tap (mobile)
// ------------------------------------------------
document.addEventListener('click', (e) => {
    const card = e.target.closest('.flip-card');
    if (!card) return;

    // Sur mobile (pas de hover), on toggle la classe flipped
    // Sur desktop avec hover natif, on ne fait rien
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) {
        card.classList.toggle('flipped');
    }
});