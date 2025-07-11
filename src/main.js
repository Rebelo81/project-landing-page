// Elementos do DOM
const header = document.querySelector(".header");
const menuItems = document.querySelectorAll("nav a");
const form = document.querySelector(".contact-form");
const statNumbers = document.querySelectorAll(".stat-number");
const cards = document.querySelectorAll(".card");

// Header com efeito de scroll
if (header) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
            header.style.backdropFilter = "blur(10px)";
        } else {
            header.style.backgroundColor = "var(--background-color)";
            header.style.backdropFilter = "none";
        }
    });
}

// Scroll suave para links do menu
if (menuItems.length > 0) {
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection && header) {
                window.scrollTo({
                    top: targetSection.offsetTop - header.offsetHeight,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Animação de números
function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const getSuffix = () => {
            if (stat.closest(".stat").querySelector(".stat-label").textContent.includes("Alunos")) return "k+";
            if (stat.closest(".stat").querySelector(".stat-label").textContent.includes("Empregabilidade")) return "%";
            return "+";
        };
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + getSuffix();
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + getSuffix();
            }
        };
        
        updateNumber();
    });
}

// Observador de interseção para animação dos números
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            numberObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector(".hero-stats")?.querySelectorAll(".stat").forEach(stat => {
    numberObserver.observe(stat);
});

// Smooth scroll para links de navegação
const anchorLinks = document.querySelectorAll("a[href^=\"#\"]");
if (anchorLinks.length > 0) {
    anchorLinks.forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

// Máscara para o campo de telefone
document.addEventListener("DOMContentLoaded", function() {
    const phoneInput = document.querySelector("input[name=\"telefone\"]");
    if (phoneInput) {
        phoneInput.addEventListener("input", function(e) {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 11) value = value.slice(0, 11);
            if (value.length > 0) {
                // Aplica a máscara progressivamente
                if (value.length <= 2) {
                    value = `(${value}`;
                } else if (value.length <= 7) {
                    value = `(${value.slice(0,2)}) ${value.slice(2)}`;
                } else {
                    value = `(${value.slice(0,2)}) ${value.slice(2,7)}-${value.slice(7)}`;
                }
            }
            e.target.value = value;
        });
        phoneInput.addEventListener("blur", function(e) {
            // Ao perder o foco, só mantém se estiver completo
            const pattern = /^\(\d{2}\) \d{5}-\d{4}$/;
            if (!pattern.test(e.target.value)) {
                e.target.value = "";
            }
        });
    }
    // Validação do formulário
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            if (form.checkValidity()) {
                alert("Formulário enviado com sucesso!");
                form.reset();
            } else {
                const inputs = form.querySelectorAll("input");
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        input.classList.add("invalid");
                    }
                });
            }
        });
        // Remove a classe invalid quando o usuário começa a digitar
        form.querySelectorAll("input").forEach(input => {
            input.addEventListener("input", function() {
                this.classList.remove("invalid");
            });
        });
    }
});

// Animação de scroll para elementos
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
        }
    });
}, {
    threshold: 0.1
});

// Adiciona animação aos elementos
document.querySelectorAll(".feature, .testimonial-card, .about-content").forEach(element => {
    element.classList.add("fade-in");
    scrollObserver.observe(element);
});

// Adiciona classe para menu mobile
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove("scroll-up");
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
        // Scroll Down
        header.classList.remove("scroll-up");
        header.classList.add("scroll-down");
    } else if (currentScroll < lastScroll && header.classList.contains("scroll-down")) {
        // Scroll Up
        header.classList.remove("scroll-down");
        header.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
});

// Efeito de hover nos cards
if (cards.length > 0) {
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

// Carrossel de Depoimentos
class TestimonialsCarousel {
    constructor() {
        this.carousel = document.getElementById("testimonialsCarousel");
        this.slides = document.querySelectorAll(".testimonial-slide");
        this.prevBtn = document.getElementById("prevBtn");
        this.nextBtn = document.getElementById("nextBtn");
        this.indicators = document.querySelectorAll(".indicator");
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 segundos

        this.init();
    }

    init() {
        if (!this.carousel || this.slides.length === 0) return;

        // Event listeners para os botões
        this.prevBtn?.addEventListener("click", () => this.prevSlide());
        this.nextBtn?.addEventListener("click", () => this.nextSlide());

        // Event listeners para os indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => this.goToSlide(index));
        });

        // Touch/swipe support para mobile
        this.addTouchSupport();

        // Autoplay
        this.startAutoplay();

        // Pausar autoplay quando o mouse está sobre o carrossel
        this.carousel.addEventListener("mouseenter", () => this.stopAutoplay());
        this.carousel.addEventListener("mouseleave", () => this.startAutoplay());

        // Atualizar interface inicial
        this.updateSlide();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
        this.resetAutoplay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
        this.resetAutoplay();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
        this.resetAutoplay();
    }

    updateSlide() {
        // Atualizar slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove("active");
            if (index === this.currentSlide) {
                slide.classList.add("active");
            }
        });

        // Atualizar indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.classList.remove("active");
            if (index === this.currentSlide) {
                indicator.classList.add("active");
            }
        });

        // Atualizar posição do carrossel
        const translateX = -this.currentSlide * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;

        // Atualizar estado dos botões
        this.updateButtonsState();
    }

    updateButtonsState() {
        // Para carrossel infinito, os botões nunca ficam desabilitados
        // mas podemos adicionar estados visuais se necessário
        if (this.prevBtn) this.prevBtn.disabled = false;
        if (this.nextBtn) this.nextBtn.disabled = false;
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }

    addTouchSupport() {
        let startX = 0;
        let endX = 0;
        let startY = 0;
        let endY = 0;

        this.carousel.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        this.carousel.addEventListener("touchmove", (e) => {
            e.preventDefault(); // Previne scroll da página
        });

        this.carousel.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;

            const deltaX = startX - endX;
            const deltaY = startY - endY;

            // Verificar se é um swipe horizontal (não vertical)
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.nextSlide(); // Swipe left = próximo
                } else {
                    this.prevSlide(); // Swipe right = anterior
                }
            }
        });
    }
}

// Inicializar carrossel quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    new TestimonialsCarousel();
});

// Menu mobile
const nav = document.querySelector("nav");
if (nav && header) {
    const menuButton = document.createElement("button");
    menuButton.className = "menu-toggle";
    menuButton.innerHTML = "<i class=\"fas fa-bars\"></i>";
    menuButton.setAttribute("aria-label", "Toggle menu");

    header.insertBefore(menuButton, nav);

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuButton.innerHTML = nav.classList.contains("active") 
            ? "<i class=\"fas fa-times\"></i>" 
            : "<i class=\"fas fa-bars\"></i>";
    });
}

// Animação suave ao rolar
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Animação de fade-in para elementos
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".card, .benefit, .about-content, .testimonial-card").forEach(el => {
    observer.observe(el);
}); 