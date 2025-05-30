// Script para funcionalidades interativas da landing page clean
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade do botão de cookies
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptCookies = document.getElementById('acceptCookies');
    
    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            cookieBanner.style.opacity = '0';
            cookieBanner.style.visibility = 'hidden';
            setTimeout(function() {
                cookieBanner.style.display = 'none';
            }, 300);
            // Salvar a preferência em localStorage
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }
    
    // Verificar se os cookies já foram aceitos
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        cookieBanner.style.display = 'none';
    }
    
    // Funcionalidade de voltar ao topo
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        // Mostrar/ocultar botão de voltar ao topo com base na rolagem
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.parentElement.classList.add('show');
            } else {
                backToTop.parentElement.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Funcionalidade de acessibilidade - tamanho da fonte
    const increaseFontBtn = document.querySelector('.accessibility-controls button:nth-child(1)');
    const decreaseFontBtn = document.querySelector('.accessibility-controls button:nth-child(2)');
    const contrastBtn = document.querySelector('.accessibility-controls button:nth-child(3)');
    
    // Recuperar tamanho da fonte salvo
    let fontSize = localStorage.getItem('fontSize') ? parseInt(localStorage.getItem('fontSize')) : 16;
    document.body.style.fontSize = fontSize + 'px';
    
    if (increaseFontBtn) {
        increaseFontBtn.addEventListener('click', function() {
            if (fontSize < 24) { // Limite máximo
                fontSize += 1;
                document.body.style.fontSize = fontSize + 'px';
                localStorage.setItem('fontSize', fontSize);
            }
        });
    }
    
    if (decreaseFontBtn) {
        decreaseFontBtn.addEventListener('click', function() {
            if (fontSize > 12) { // Limite mínimo
                fontSize -= 1;
                document.body.style.fontSize = fontSize + 'px';
                localStorage.setItem('fontSize', fontSize);
            }
        });
    }
    
    // Funcionalidade de contraste
    let highContrast = localStorage.getItem('highContrast') === 'true';
    
    // Aplicar contraste salvo
    if (highContrast) {
        document.body.classList.add('high-contrast');
    }
    
    if (contrastBtn) {
        contrastBtn.addEventListener('click', function() {
            highContrast = !highContrast;
            
            if (highContrast) {
                document.body.classList.add('high-contrast');
                localStorage.setItem('highContrast', 'true');
            } else {
                document.body.classList.remove('high-contrast');
                localStorage.setItem('highContrast', 'false');
            }
        });
    }
    
    // Menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    if (mobileMenuToggle && mainMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            mainMenu.classList.toggle('show');
        });
    }
    
    // Adicionar smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    if (mainMenu && mainMenu.classList.contains('show')) {
                        mainMenu.classList.remove('show');
                        if (mobileMenuToggle) {
                            mobileMenuToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            }
        });
    });
    
    // Formulário de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            const emailInput = this.querySelector('input[type="email"]');
            
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            setTimeout(function() {
                submitButton.textContent = 'Inscrito!';
                
                setTimeout(function() {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                    emailInput.value = '';
                }, 2000);
            }, 1500);
        });
    }
});
