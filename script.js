const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const body = document.querySelector('body');

menuToggle.addEventListener('click', (event) => {
    // Empêche la propagation de l'événement de clic au body
    event.stopPropagation();
    nav.classList.toggle('nav-active');
    menuToggle.classList.toggle('toggle');
});

// Ferme le menu si on clique en dehors de celui-ci
body.addEventListener('click', () => {
    if (nav.classList.contains('nav-active')) {
        nav.classList.remove('nav-active');
        menuToggle.classList.remove('toggle');
    }
});

// Exemple d'animation supplémentaire ou interaction
document.querySelectorAll('.skill-box').forEach(skill => {
    skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.1)';
    });

    skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1)';
    });
});
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".project-box").forEach(project => {
        project.addEventListener("click", function() {
            // Ferme les autres projets déjà ouverts
            document.querySelectorAll(".project-box").forEach(box => {
                if (box !== project && box.classList.contains("expanded")) {
                    box.classList.remove("expanded");
                }
            });

            // Alterne l'état de la box cliquée
            project.classList.toggle("expanded");
        });
    });
});
const element = document.getElementById('animated-element');

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    
    element.style.transform = `translate3d(${x - 25}px, ${y - 25}px, 0)`;
});

