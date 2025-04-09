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

// Attendre que le DOM soit prêt
// Attendre que le DOM soit prêt
// Fonction pour vérifier si un élément est visible à l'écran
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  
  // Fonction d'animation pour la section et les cartes
  function animateCertifications() {
    const certificationsSection = document.getElementById('certifications');
    if (isElementInViewport(certificationsSection)) {
      certificationsSection.classList.add('visible');
      
      const cards = certificationsSection.querySelectorAll('.card');
      cards.forEach(card => {
        card.classList.add('visible');
      });
    }
  }
  
  // Écouteur d'événements pour détecter le défilement de la page
  window.addEventListener('scroll', animateCertifications);
  
  // Lancer l'animation au chargement de la page au cas où la section serait déjà visible
  window.addEventListener('load', animateCertifications);


// Sélectionner toutes les barres de niveau
const skillBars = document.querySelectorAll('.skill-level-bar');

// Fonction pour animer la barre de niveau
function animateSkillBar(bar) {
    const level = bar.getAttribute('data-level'); // Récupérer le niveau depuis l'attribut data-level
    bar.style.width = level + '%'; // Ajuster la largeur de la barre en fonction du niveau
}

// Appliquer l'animation sur chaque barre au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    skillBars.forEach(bar => {
        animateSkillBar(bar);
    });
});
// Fonction pour animer les éléments au fur et à mesure qu'ils deviennent visibles
document.addEventListener('DOMContentLoaded', () => {
    const timelineElements = document.querySelectorAll('.timeline-container');

    // Fonction de balayage pour animer l'apparition des éléments
    function checkPosition() {
        timelineElements.forEach((element) => {
            const position = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Si l'élément est visible à l'écran
            if (position.top < windowHeight && position.bottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    // Initialiser l'animation au chargement de la page
    checkPosition();

    // Vérifier la position des éléments lors du défilement
    window.addEventListener('scroll', checkPosition);
});
document.querySelectorAll('ul li').forEach(event => {
    event.addEventListener('mouseenter', () => {
        event.style.transform = 'scale(1.1)';
        event.style.transition = 'transform 0.3s ease-in-out';
    });

    event.addEventListener('mouseleave', () => {
        event.style.transform = 'scale(1)';
    });
});
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".proj_details_btn").forEach(button => {
        button.addEventListener("click", function() {
            let modalId = this.getAttribute("data-target");
            document.getElementById(modalId).style.display = "flex";
        });
    });

    document.querySelectorAll(".proj_close_btn").forEach(close => {
        close.addEventListener("click", function() {
            this.closest(".proj_modal_container").style.display = "none";
        });
    });

    window.addEventListener("click", function(event) {
        if (event.target.classList.contains("proj_modal_container")) {
            event.target.style.display = "none";
        }
    });
});


//Projet

function ouvrirFenetre(id) {
    document.getElementById(id).style.display = "block";
    document.body.classList.add("no-scroll");
    
}

function fermerFenetre(id) {
    document.getElementById(id).style.display = "none";
    document.body.classList.remove("no-scroll");
    
}


document.querySelectorAll('.modal-text').forEach(modal => {
    modal.addEventListener('scroll', function () {
        let atTop = modal.scrollTop === 0;
        let atBottom = modal.scrollTop + modal.clientHeight >= modal.scrollHeight;

        if (atTop || atBottom) {
            modal.style.transition = "transform 0.2s ease-out";
            modal.style.transform = atBottom ? "translateY(-5px)" : "translateY(5px)";
            
            setTimeout(() => {
                modal.style.transform = "translateY(0)";
            }, 200);
        }
    });
});




window.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById("progress-bar");

    // Lancer la progression fluide
    setTimeout(() => {
      progressBar.style.width = "100%";
    }, 100);

    // Une fois la barre pleine, afficher le site
    setTimeout(() => {
      document.getElementById("intro").style.display = "none";
      document.getElementById("main-content").style.display = "block";

      // Réinitialiser AOS pour prendre en compte les animations
      AOS.refresh(); 
    }, 3100); // Assurez-vous que le délai est assez long pour la barre de progression
});
