document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

    // --- 2. Scroll Progress ---
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0 && scrollProgress) {
            scrollProgress.style.width = `${(window.scrollY / docHeight) * 100}%`;
        }
    });

    // --- 3. Mobile Nav ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // --- 4. Scrollspy ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let activeId = "";
        const threshold = window.innerHeight * 0.35;
        sections.forEach(s => {
            if (s.getBoundingClientRect().top <= threshold) activeId = s.id;
        });
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) activeId = "contact";
        if (window.scrollY < 120) activeId = "about";
        if (activeId) {
            navItems.forEach(item => {
                item.classList.toggle('active', item.getAttribute('href') === `#${activeId}`);
            });
        }
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('resize', updateActiveNav);
    updateActiveNav();

    // --- 5. Typing Effect ---
    const typistOutputs = [
        "secure backend protocols.",
        "automated shell pipelines.",
        "containerized architectures.",
        "algorithmic optimizations."
    ];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const typingSpan = document.getElementById('typing-text');

    function runTypist() {
        if (!typingSpan) return;
        const word = typistOutputs[wordIndex];
        typingSpan.textContent = isDeleting
            ? word.substring(0, charIndex - 1)
            : word.substring(0, charIndex + 1);
        isDeleting ? charIndex-- : charIndex++;
        let speed = isDeleting ? 25 : 60;
        if (!isDeleting && charIndex === word.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % typistOutputs.length; speed = 300; }
        setTimeout(runTypist, speed);
    }
    if (typingSpan) setTimeout(runTypist, 800);

    // --- 6. Projects ---
    const projects = [
        {
            id: "p1",
            title: "DevDock",
            desc: "A personal Docker environment manager — control, monitor, and stream live container logs visually without touching the CLI.",
            tags: ["React", "Node.js", "Docker", "Socket.io"],
            github: "https://github.com/saqlainbasit/DevDock",
            icon: "fa-brands fa-docker"
        },
        {
            id: "p2",
            title: "WarPredictorCppEngine",
            desc: "Terminal-based C++ simulation predicting war outcomes using military power, GDP, and population stats with alliance support.",
            tags: ["C++", "OOP", "CLI"],
            github: "https://github.com/saqlainbasit/WarPredictorCppEngine",
            icon: "fa-solid fa-chess"
        },
        {
            id: "p3",
            title: "TaskFlow CLI",
            desc: "A fast, color-coded command-line task manager in C++17 — add, edit, delete and prioritize tasks straight from the terminal.",
            tags: ["C++17", "CLI", "Makefile"],
            github: "https://github.com/saqlainbasit/Taskflow-CLI",
            icon: "fa-solid fa-list-check"
        },
        {
            id: "p4",
            title: "Virtual Steering",
            desc: "Webcam-based hand tracking that turns your hands into a steering wheel — controls any racing game using real-time gesture detection.",
            tags: ["Python", "MediaPipe", "OpenCV", "pynput"],
            github: "https://github.com/saqlainbasit/virtual-steering",
            icon: "fa-solid fa-gamepad"
        },
        {
            id: "p5",
            title: "SpotifyAdMuter",
            desc: "Automatically mutes Spotify ads and unmutes when your track resumes — runs silently in the system tray with TTS notifications.",
            tags: ["Python", "System Tray", "TTS"],
            github: "https://github.com/saqlainbasit/spotify_muter",
            icon: "fa-brands fa-spotify"
        }
    ];

    const projectsGrid = document.getElementById('projects-grid');

    function renderProjects() {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        projects.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'project-card reveal';
            card.innerHTML = `
                <div class="project-card-header">
                    <i class="${proj.icon} project-icon"></i>
                    <div class="project-card-links">
    <a href="${proj.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <span class="github-hint">→ View on GitHub</span>
        <i class="fa-brands fa-github"></i>
    </a>
</div>
                </div>
                <h3 class="project-card-title">${proj.title}</h3>
                <p class="project-card-desc">${proj.desc}</p>
                <div class="project-card-tags">${proj.tags.map(t => `<span>${t}</span>`).join('')}</div>
            `;
            projectsGrid.appendChild(card);
        });
        triggerReveal();
    }

    renderProjects();

    // --- 7. Scroll Reveal ---
    function triggerReveal() {
        const reveals = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry, i) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => entry.target.classList.add('active'), i * 40);
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });
            reveals.forEach(el => obs.observe(el));
        } else {
            reveals.forEach(el => el.classList.add('active'));
        }
    }

    triggerReveal();
});
