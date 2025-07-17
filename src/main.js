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
    const phoneInput = document.getElementById("telefone");
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
            
            // Validação em tempo real após formatação
            if (value.length === 0 || value.length === 15) {
                clearError(phoneInput);
            } else if (value.length > 0) {
                showError(phoneInput, "Por favor, complete o número de telefone no formato (XX) XXXXX-XXXX");
            }
        });
        
        phoneInput.addEventListener("blur", function(e) {
            // Ao perder o foco, valida o formato completo
            const pattern = /^\(\d{2}\) \d{5}-\d{4}$/;
            if (!pattern.test(e.target.value) && e.target.value.length > 0) {
                showError(phoneInput, "Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX");
            } else if (e.target.value.length === 0 && phoneInput.required) {
                showError(phoneInput, "O campo Telefone é obrigatório");
            } else {
                clearError(phoneInput);
                phoneInput.classList.add('valid');
            }
        });
    }
    /**
     * Conjunto de funções para validação dos campos do formulário
     * Cada função retorna um objeto com:
     * - isValid: boolean indicando se o campo é válido
     * - message: string com mensagem de erro (se houver)
     */
    const validationFunctions = {
        /**
         * Valida se um campo obrigatório foi preenchido
         * @param {string} value - Valor do campo
         * @param {string} fieldName - Nome do campo para mensagem de erro
         * @returns {Object} Resultado da validação
         */
        validateRequired: function(value, fieldName) {
            if (!value.trim()) {
                return {
                    isValid: false,
                    message: `O campo ${fieldName} é obrigatório.`
                };
            }
            return { isValid: true };
        },
        
        /**
         * Valida se um e-mail está em formato válido
         * @param {string} email - E-mail a ser validado
         * @returns {Object} Resultado da validação
         */
        validateEmail: function(email) {
            const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            if (!re.test(String(email).toLowerCase())) {
                return {
                    isValid: false,
                    message: "Por favor, insira um e-mail válido."
                };
            }
            return { isValid: true };
        },
        
        /**
         * Valida se um telefone está no formato (XX) XXXXX-XXXX
         * @param {string} phone - Telefone a ser validado
         * @returns {Object} Resultado da validação
         */
        validatePhone: function(phone) {
            const re = /^\(\d{2}\)\s\d{5}-\d{4}$/;
            if (!re.test(phone)) {
                return {
                    isValid: false,
                    message: "Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX."
                };
            }
            return { isValid: true };
        },
        
        /**
         * Valida se um nome contém apenas letras e espaços e tem pelo menos 3 caracteres
         * @param {string} name - Nome a ser validado
         * @returns {Object} Resultado da validação
         */
        validateName: function(name) {
            const re = /^[A-Za-zÀ-ÿ\s]+$/;
            if (!re.test(name)) {
                return {
                    isValid: false,
                    message: "Por favor, insira um nome válido (apenas letras)."
                };
            }
            if (name.trim().length < 3) {
                return {
                    isValid: false,
                    message: "O nome deve ter pelo menos 3 caracteres."
                };
            }
            return { isValid: true };
        }
    };
    
    // Função para mostrar erro
    function showError(input, message) {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        input.classList.add('invalid');
    }
    
    // Função para limpar erro
    function clearError(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        input.classList.remove('invalid');
    }
    
    // Função para validar um campo específico
    function validateField(input) {
        clearError(input);
        
        // Verificar se o campo está vazio (se for obrigatório)
        if (input.required) {
            const requiredValidation = validationFunctions.validateRequired(input.value, input.placeholder);
            if (!requiredValidation.isValid) {
                showError(input, requiredValidation.message);
                return false;
            }
        }
        
        // Validações específicas por tipo de campo
        switch (input.id) {
            case 'nome':
                const nameValidation = validationFunctions.validateName(input.value);
                if (!nameValidation.isValid) {
                    showError(input, nameValidation.message);
                    return false;
                }
                break;
                
            case 'email':
                const emailValidation = validationFunctions.validateEmail(input.value);
                if (!emailValidation.isValid) {
                    showError(input, emailValidation.message);
                    return false;
                }
                break;
                
            case 'telefone':
                const phoneValidation = validationFunctions.validatePhone(input.value);
                if (!phoneValidation.isValid) {
                    showError(input, phoneValidation.message);
                    return false;
                }
                break;
        }
        
        // Se chegou até aqui, o campo é válido
        input.classList.add('valid');
        return true;
    }
    
    // Função de debounce para evitar validações excessivas
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Validação do formulário
    const form = document.getElementById("contactForm");
    if (form) {
        // Adicionar validação em tempo real para cada campo
        const formInputs = form.querySelectorAll('.form-input');
        formInputs.forEach(input => {
            // Validar quando o campo perde o foco
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Limpar erro quando o usuário começa a digitar
            input.addEventListener('input', function() {
                clearError(this);
                
                // Validar após um pequeno delay (debounce)
                if (input.id !== 'telefone') { // Telefone já tem validação específica
                    const debouncedValidate = debounce(function() {
                        if (input.value.length > 0) {
                            validateField(input);
                        }
                    }, 500);
                    debouncedValidate();
                }
            });
        });
        
        // Validar formulário no envio
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            // Validar todos os campos
            let isFormValid = true;
            formInputs.forEach(input => {
                if (input.required && !validateField(input)) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                // Mostrar loading
                const submitBtn = document.getElementById('submit-btn');
                const formStatus = document.getElementById('form-status');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                /**
                 * Função para enviar os dados do formulário para o servidor
                 * Envia os dados via fetch API e trata a resposta
                 * @returns {Promise<boolean>} Resultado do envio (sucesso ou falha)
                 */
                const sendFormData = async () => {
                    try {
                        // Preparar dados do formulário
                        const formData = new FormData(form);
                        
                        // Adicionar data e hora do envio formatada para o Brasil
                        const now = new Date();
                        const dataFormatada = now.toLocaleDateString('pt-BR');
                        const horaFormatada = now.toLocaleTimeString('pt-BR');
                        formData.append('dataEnvio', `${dataFormatada} ${horaFormatada}`);
                        
                        // Enviar para SheetMonkey
                        const response = await fetch(form.action, {
                            method: 'POST',
                            body: formData
                        });
                        
                        if (response.ok) {
                            // Sucesso: mostrar mensagem e redirecionar para a ementa
                            formStatus.innerHTML = '<div class="alert alert-success">Formulário enviado com sucesso! Você será redirecionado para acessar a ementa completa do curso.</div>';
                            
                            // Redirecionar para a ementa do curso
                            setTimeout(() => {
                                window.open("https://assets-global.website-files.com/66143495d3e01ad1a958beed/662bcea675351ac5fb014bf3_%5BEMENTA%20NOVA%20ID%5D%20Desenvolvedor%20Front-End-compressed_1.pdf", "_blank");
                            }, 1500);
                            
                            // Limpar formulário
                            form.reset();
                            formInputs.forEach(input => {
                                input.classList.remove('valid');
                            });
                            
                            return true;
                        } else {
                            throw new Error('Erro no servidor');
                        }
                    } catch (error) {
                        console.error('Erro ao enviar formulário:', error);
                        formStatus.innerHTML = '<div class="alert alert-error">Erro ao enviar formulário. Tente novamente.</div>';
                        return false;
                    }
                };
                
                // Verificar conexão com a internet antes de enviar
                if (navigator.onLine) {
                    try {
                        await sendFormData();
                    } catch (error) {
                        console.error('Erro ao enviar formulário:', error);
                        formStatus.innerHTML = '<div class="alert alert-error">Erro ao enviar formulário. Tente novamente.</div>';
                    } finally {
                        // Restaurar botão
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                } else {
                    // Sem conexão com a internet
                    formStatus.innerHTML = '<div class="alert alert-error">Sem conexão com a internet. Os dados serão enviados quando a conexão for restabelecida.</div>';
                    
                    // Salvar dados no localStorage para tentar enviar depois
                    const formDataObj = {};
                    formInputs.forEach(input => {
                        formDataObj[input.name] = input.value;
                    });
                    formDataObj.dataEnvio = new Date().toISOString();
                    
                    // Salvar no localStorage
                    const pendingForms = JSON.parse(localStorage.getItem('pendingForms') || '[]');
                    pendingForms.push({
                        action: form.action,
                        data: formDataObj
                    });
                    localStorage.setItem('pendingForms', JSON.stringify(pendingForms));
                    
                    // Restaurar botão
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Adicionar evento para tentar enviar quando a conexão for restabelecida
                    window.addEventListener('online', function trySubmitPendingForms() {
                        const pendingForms = JSON.parse(localStorage.getItem('pendingForms') || '[]');
                        if (pendingForms.length > 0) {
                            formStatus.innerHTML = '<div class="alert alert-success">Conexão restabelecida. Enviando dados pendentes...</div>';
                            
                            // Tentar enviar formulários pendentes
                            const submitPendingForms = async () => {
                                const newPendingForms = [];
                                
                                for (const pendingForm of pendingForms) {
                                    const formData = new FormData();
                                    for (const key in pendingForm.data) {
                                        formData.append(key, pendingForm.data[key]);
                                    }
                                    
                                    try {
                                        const response = await fetch(pendingForm.action, {
                                            method: 'POST',
                                            body: formData
                                        });
                                        
                                        if (!response.ok) {
                                            newPendingForms.push(pendingForm);
                                        }
                                    } catch (error) {
                                        newPendingForms.push(pendingForm);
                                    }
                                }
                                
                                // Atualizar localStorage com formulários que ainda não foram enviados
                                if (newPendingForms.length > 0) {
                                    localStorage.setItem('pendingForms', JSON.stringify(newPendingForms));
                                } else {
                                    localStorage.removeItem('pendingForms');
                                    window.removeEventListener('online', trySubmitPendingForms);
                                    formStatus.innerHTML = '<div class="alert alert-success">Todos os dados pendentes foram enviados com sucesso!</div>';
                                }
                            };
                            
                            submitPendingForms();
                        }
                    });
                }
            }
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

document.querySelectorAll(".card, .about-content, .testimonial-card").forEach(el => {
    observer.observe(el);
}); 