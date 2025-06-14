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

// Validação do formulário
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = form.querySelector('input[name="nome"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const telefone = form.querySelector('input[name="telefone"]').value.trim();
        let isValid = true;
        let errorMessage = '';
        if (nome.length < 3) {
            isValid = false;
            errorMessage = 'Por favor, insira um nome válido (mínimo 3 caracteres).';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage = 'Por favor, insira um email válido.';
        }
        const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!telefoneRegex.test(telefone)) {
            isValid = false;
            errorMessage = 'Por favor, insira um telefone válido no formato (99) 99999-9999.';
        }
        if (isValid) {
            alert('Formulário enviado com sucesso! Em breve entraremos em contato.');
            form.reset();
        } else {
            alert(errorMessage);
        }
    });
}

// Máscara para o campo de telefone
const telefoneInput = document.querySelector('input[name="telefone"]');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        }
    });
}

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