 AOS.init({ duration: 900, once: true, offset: 80 });

        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 55; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';

            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 12 + 8 + 's';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particlesContainer.appendChild(particle);
        }

        const typingElement = document.getElementById('typing');
        const words = [' Intelligence', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'Smart Automation'];
        let wordIndex = 0; let charIndex = 0; let isDeleting = false; let typingSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) { typingElement.textContent = currentWord.substring(0, charIndex - 1); charIndex--; typingSpeed = 40; }
            else { typingElement.textContent = currentWord.substring(0, charIndex + 1); charIndex++; typingSpeed = 80; }
            if (!isDeleting && charIndex === currentWord.length) { typingSpeed = 1800; isDeleting = true; }
            else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typingSpeed = 400; }
            setTimeout(type, typingSpeed);
        }
        type();

        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 40) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });

        const sections = document.querySelectorAll("section");
        const navLinks = document.querySelectorAll("#nav-spy .nav-link");

        window.addEventListener("scroll", () => {
            let currentSectionId = "";
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 130) {
                    currentSectionId = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {link.classList.remove("active");
                if (link.getAttribute("href").includes(currentSectionId)) {
                    link.classList.add("active");
                }
            });
        });

        // انیمیشن کانتر اعداد مستقل
        const counters = document.querySelectorAll('.counter-value');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0; const step = target / 80;
                    const updateCounter = () => {
                        current += step;
                        if (current < target) { counter.textContent = Math.floor(current); requestAnimationFrame(updateCounter); }
                        else { counter.textContent = target; }
                    };
                    updateCounter(); counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach(counter => counterObserver.observe(counter));

        const filterBtns = document.querySelectorAll('.filter-btn-n');
        const portfolioWrappers = document.querySelectorAll('.portfolio-item-wrapper');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                portfolioWrappers.forEach(wrapper => {
                    const item = wrapper.querySelector('.portfolio-item');
                    if (filter === 'all' || wrapper.getAttribute('data-category') === filter) {
                        wrapper.style.display = 'block';
                    } else {
                        wrapper.style.display = 'none';
                    }
                });
            });
        });

