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

particlesJS("particles-js", {
    "particles": {
      "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#6CCDF7" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": true },
      "size": { "value": 3, "random": true },
      "line_linked": { "enable": true, "distance": 150, "color": "#6CCDF7", "opacity": 0.4, "width": 1 },
      "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
    },
  
    // 🛠️ Ajout des interactions ici
    "interactivity": {
      "detect_on": "canvas",  // Détection sur le canvas
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"  // Repousse les particules quand la souris passe dessus
        },
        "onclick": {
          "enable": true,
          "mode": "push"  // Ajoute des particules au clic
        }
      },
      "modes": {
        "grab": { 
          "distance": 200, 
          "line_linked": { "opacity": 1 } 
        },
        "bubble": { 
          "distance": 400, 
          "size": 10, 
          "duration": 2 
        },
        "repulse": { 
          "distance": 200, 
          "duration": 0.4 
        }
      }
    },
  
    "retina_detect": true  // Active le support des écrans Retina
  });
