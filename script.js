document.addEventListener('DOMContentLoaded', () => {

    // 1. Controle de Efeito da Navbar ao rolar a página
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Menu Mobile (Hambúrguer) funcional
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
        
        // Pequena animação no botão hambúrguer
        const bars = mobileMenu.querySelectorAll('.bar');
        if(mobileMenu.classList.contains('is-active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Fechar o menu ao clicar em qualquer link móvel
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('is-active');
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => bar.style.transform = 'none');
            bars[1].style.opacity = '1';
        });
    });

    // 3. Animação Progressiva de Números (Métricas)
    const counters = document.querySelectorAll('.counter');
    const speed = 60; // Velocidade da contagem

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = count + inc > target ? target : count + inc;
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Usando IntersectionObserver para disparar os números só quando visíveis na tela
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target); // Roda apenas uma vez
            }
        });
    }, observerOptions);

    const metricsSection = document.querySelector('.metrics-dashboard');
    if(metricsSection) {
        observer.observe(metricsSection);
    }
});