// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Seletores para o Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    // Seletores para o Dark/Light Mode
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Seletores para o Modal de Simulação (Links de CTA)
    const imobiliarioLink = document.getElementById('imobiliario-link'); 
    const heroCta = document.getElementById('hero-cta'); 
    const servicosCta = document.getElementById('servicos-cta'); 

    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-btn');
    const loginForm = document.getElementById('login-form');

    
    /* -------------------------------------- */
    /* Lógica do Menu Mobile (Hamburguer) */
    /* -------------------------------------- */
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        // Alterna o ícone do botão (hamburguer <-> X)
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    /* -------------------------------------- */
    /* Lógica do Dark/Light Mode */
    /* -------------------------------------- */
    const setTheme = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            themeToggleBtn.querySelector('i').className = 'fas fa-sun'; 
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            themeToggleBtn.querySelector('i').className = 'fas fa-moon'; 
            localStorage.setItem('theme', 'light');
        }
    };

    // Padrão: Dark Mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme === 'dark');

    themeToggleBtn.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        setTheme(!isDarkMode); 
    });


    /* -------------------------------------- */
    /* Lógica de Redirecionamento e Rolagem Suave */
    /* -------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ignora links que devem abrir o modal
            if (this.getAttribute('href') === '#') return; 
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth' 
                });
            }

            // Fecha o menu mobile
            if (navList.classList.contains('active')) {
                menuToggle.click(); 
            }
        });
    });


    /* -------------------------------------- */
    /* Lógica do Modal de Simulação/Lead */
    /* -------------------------------------- */
    
    // Abrir o modal ao clicar nos links de CTA
    [imobiliarioLink, heroCta, servicosCta].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'block';
        });
    });

    // Fechar o modal no botão 'x'
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Fechar o modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Submissão do Formulário (Simulação de Cadastro)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // **AÇÃO:** Aqui você enviaria os dados (nome, email, whatsapp) para um sistema de captação de leads.
        
        alert('Obrigado! Recebemos seus dados. Um consultor CREDLARES entrará em contato via WhatsApp em instantes para iniciar sua simulação!');
        
        loginModal.style.display = 'none'; 
        loginForm.reset(); 
    });
});