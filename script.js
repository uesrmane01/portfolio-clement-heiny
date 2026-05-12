// Gestion de la navigation smooth scroll et active states
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section-full');

    // Fonction pour mettre à jour l'état actif de la navigation
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Gestion des clics sur les liens de navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mettre à jour la navigation au scroll
    window.addEventListener('scroll', updateActiveNav);

    // Initialiser la navigation au chargement
    updateActiveNav();

    // Animation des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.skill-item, .category-card, .mission-list li, .info-box, .specialization-box');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Système de notifications
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto-suppression après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Animation du header au chargement
    const header = document.querySelector('.header');
    if (header) {
        setTimeout(() => {
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Effet parallaxe subtil sur le header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header && scrolled < 200) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animation des compétences au hover
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animation des cartes d'expérience
    const experienceCard = document.querySelector('.experience-card');
    if (experienceCard) {
        experienceCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        experienceCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '5') {
            const tabIndex = parseInt(e.key) - 1;
            const tabs = ['accueil', 'experience', 'veille', 'competences', 'projet'];
            if (tabs[tabIndex]) {
                switchTab(tabs[tabIndex]);
            }
        }
    });

    // Gestion de l'upload de fichier pour la fiche projet
    const projetFileInput = document.getElementById('projetFile');
    const projetUpload = document.querySelector('.projet-upload');
    const projetDisplay = document.getElementById('projetDisplay');
    const projetContentDisplay = document.getElementById('projetContentDisplay');

    if (projetFileInput && projetUpload) {
        // Gestion du drag & drop
        projetUpload.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--primary-color)';
            this.style.background = 'var(--bg-tertiary)';
        });

        projetUpload.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--border-color)';
            this.style.background = 'var(--bg-secondary)';
        });

        projetUpload.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = 'var(--border-color)';
            this.style.background = 'var(--bg-secondary)';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileUpload(files[0]);
            }
        });

        // Gestion du clic pour sélectionner un fichier
        projetFileInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleFileUpload(e.target.files[0]);
            }
        });
    }

    // Fonction pour gérer l'upload de fichier
    function handleFileUpload(file) {
        // Vérifier le type de fichier
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            showNotification('Format de fichier non supporté. Veuillez utiliser JPEG, PNG ou PDF.', 'error');
            return;
        }

        // Vérifier la taille (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showNotification('Le fichier est trop volumineux. Taille maximale : 10MB.', 'error');
            return;
        }

        // Lire et afficher le fichier
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const fileURL = e.target.result;
            displayFile(file, fileURL);
            showNotification('Fiche de projet ajoutée avec succès !', 'success');
        };

        reader.onerror = function() {
            showNotification('Erreur lors de la lecture du fichier.', 'error');
        };

        reader.readAsDataURL(file);
    }

    // Fonction pour afficher le fichier
    function displayFile(file, fileURL) {
        if (!projetDisplay || !projetContentDisplay) return;

        // Masquer la zone d'upload et afficher la zone de display
        projetUpload.style.display = 'none';
        projetDisplay.style.display = 'block';

        // Vider le contenu précédent
        projetContentDisplay.innerHTML = '';

        if (file.type === 'application/pdf') {
            // Afficher le PDF dans un iframe
            const iframe = document.createElement('iframe');
            iframe.src = fileURL;
            iframe.title = file.name;
            projetContentDisplay.appendChild(iframe);
        } else {
            // Afficher l'image
            const img = document.createElement('img');
            img.src = fileURL;
            img.alt = file.name;
            projetContentDisplay.appendChild(img);
        }
    }

    // Fonction pour supprimer la fiche projet
    window.removeProjet = function() {
        if (projetDisplay && projetUpload) {
            projetDisplay.style.display = 'none';
            projetUpload.style.display = 'block';
            
            // Réinitialiser l'input file
            if (projetFileInput) {
                projetFileInput.value = '';
            }
            
            showNotification('Fiche de projet supprimée', 'info');
        }
    };

    // Mode sombre (optionnel - à décommenter si souhaité)
    /*
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    */

    // Animation de chargement des sections
    const allSections = document.querySelectorAll('.section');
    allSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        setTimeout(() => {
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Validation des formulaires (si ajoutés plus tard)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }

    // Animation des nombres (pour les statistiques si ajoutées)
    function animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Initialisation des tooltips (si ajoutés)
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = this.getAttribute('data-tooltip');
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                setTimeout(() => tooltip.classList.add('show'), 10);
            });
            
            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }

    // Optimisation des performances
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    function updateAnimations() {
        // Mettre à jour les animations ici
        ticking = false;
    }

    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', requestTick);

    console.log('Portfolio chargé avec succès !');
});
