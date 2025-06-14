// Elementos do DOM
const header = document.querySelector('.header');
const menuItems = document.querySelectorAll('nav a');
const form = document.querySelector('.contact-form');
const statNumbers = document.querySelectorAll('.stat-number');
const cards = document.querySelectorAll('.card');

// Header com efeito de scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = 'var(--background-color)';
        header.style.backdropFilter = 'none';
    }
});

// Scroll suave para links do menu
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: 'smooth'
        });
    });
});

// Animação de números
function animateNumbers() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const getSuffix = () => {
            if (stat.closest('.stat').querySelector('.stat-label').textContent.includes('Alunos')) return 'k+';
            if (stat.closest('.stat').querySelector('.stat-label').textContent.includes('Empregabilidade')) return '%';
            return '+';
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
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelector('.hero-stats').querySelectorAll('.stat').forEach(stat => {
    observer.observe(stat);
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Máscara para o campo de telefone
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.querySelector('input[name="telefone"]');
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            if (value.length > 9) {
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
        }
        
        e.target.value = value;
    });

    // Validação do formulário
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (form.checkValidity()) {
            // Aqui você pode adicionar o código para enviar o formulário
            alert('Formulário enviado com sucesso!');
            form.reset();
        } else {
            // Mostra as mensagens de erro
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                if (!input.validity.valid) {
                    input.classList.add('invalid');
                }
            });
        }
    });

    // Remove a classe invalid quando o usuário começa a digitar
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('invalid');
        });
    });
});

// Animação de scroll para elementos
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

// Adiciona animação aos elementos
document.querySelectorAll('.feature, .testimonial-card, .about-content').forEach(element => {
    element.classList.add('fade-in');
    scrollObserver.observe(element);
});

// Adiciona classe para menu mobile
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Efeito de hover nos cards
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Menu mobile
const menuButton = document.createElement('button');
menuButton.className = 'menu-toggle';
menuButton.innerHTML = '<i class="fas fa-bars"></i>';
menuButton.setAttribute('aria-label', 'Toggle menu');

const nav = document.querySelector('nav');
header.insertBefore(menuButton, nav);

menuButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuButton.innerHTML = nav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Animação suave ao rolar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de fade-in para elementos
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .benefit, .about-content, .testimonial-card').forEach(el => {
    observer.observe(el);
}); 