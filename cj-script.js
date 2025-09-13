// JavaScript para Centro Juvenil Monte Tabor - Versión Estática
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const navbar = document.querySelector('.navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Función para cambiar de pestaña
    function switchTab(targetTab) {
        // Ocultar todas las pestañas
        tabContents.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remover clase active de todos los enlaces
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Mostrar la pestaña seleccionada
        const targetTabContent = document.getElementById(targetTab);
        if (targetTabContent) {
            targetTabContent.classList.add('active');
        }
        
        // Añadir clase active al enlace correspondiente
        const targetLink = document.querySelector(`[data-tab="${targetTab}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
        
        // Cerrar menú móvil si está abierto
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
        
        // Scroll al top al cambiar de pestaña
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Event listeners para los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });

    // Toggle menú móvil
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Cerrar menú móvil al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (navMenu && !navbar.contains(e.target)) {
            navMenu.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });

    // Efecto de scroll en navbar
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // Animaciones de aparición
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar elementos animables
    const animatedElements = document.querySelectorAll(
        '.info-card, .stat-card, .news-item, .sector-card, .stat-item'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Animación de contador para estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-card h4, .stat-item h4');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const target = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (target > 0) {
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        const displayValue = Math.ceil(current);
                        
                        if (text.includes('+')) {
                            counter.textContent = displayValue + '+';
                        } else {
                            counter.textContent = displayValue;
                        }
                        
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = text;
                    }
                };
                
                updateCounter();
            }
        });
    }

    // Observar cuando las estadísticas entran en vista
    const statsElements = document.querySelectorAll('.statistics-section, .about-stats');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsElements.forEach(element => {
        statsObserver.observe(element);
    });

    // Efectos hover para tarjetas
    const cards = document.querySelectorAll('.info-card, .stat-card, .news-item, .sector-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Inicializar con la pestaña de inicio activa
    switchTab('inicio');

    console.log('Centro Juvenil Monte Tabor - Versión estática cargada correctamente');
});
