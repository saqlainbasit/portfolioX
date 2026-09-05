document.addEventListener('DOMContentLoaded', () => {

  // --- YEAR ---
  const yr = new Date().getFullYear();
  document.querySelectorAll('#year, #strip-year').forEach(el => el.textContent = yr);

  // --- SCROLL PROGRESS ---
  const bar = document.getElementById('scroll-bar');
  function updateBar() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar && h > 0) bar.style.width = `${(window.scrollY / h) * 100}%`;
  }
  window.addEventListener('scroll', updateBar, { passive: true });

  // --- HAMBURGER ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // --- FADE-UP REVEAL ---
  const fadeEls = document.querySelectorAll('.fade-up');

  // Hero elements fire immediately
  document.querySelectorAll('.hero .fade-up').forEach(el => {
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
  });

  // Rest fire on scroll
  const nonHeroFades = [...fadeEls].filter(el => !el.closest('.hero'));
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    nonHeroFades.forEach(el => obs.observe(el));
  } else {
    nonHeroFades.forEach(el => el.classList.add('visible'));
  }

  // --- TYPING EFFECT ---
  const words = [
    'backend systems.',
    'CLI tools.',
    'containerized environments.',
    'automated pipelines.',
  ];
  let wi = 0, ci = 0, deleting = false;
  const typingEl = document.getElementById('typing-text');

  function type() {
    if (!typingEl) return;
    const word = words[wi];
    typingEl.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
    deleting ? ci-- : ci++;
    let delay = deleting ? 22 : 55;
    if (!deleting && ci === word.length) { delay = 1800; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 280; }
    setTimeout(type, delay);
  }
  if (typingEl) setTimeout(type, 600);

  // --- PROJECTS ---
  const projects = [
    {
      num: '01',
      title: 'DevDock',
      desc: 'Docker environment manager — control containers, stream live logs, and monitor resources without touching the CLI.',
      tags: ['React', 'Node.js', 'Docker', 'Socket.io'],
      url: 'https://github.com/saqlainbasit/DevDock'
    },
    {
      num: '02',
      title: 'WarPredictorCppEngine',
      desc: 'Terminal C++ simulation predicting war outcomes using military power, GDP, and population data with alliance logic.',
      tags: ['C++', 'OOP', 'CLI'],
      url: 'https://github.com/saqlainbasit/WarPredictorCppEngine'
    },
    {
      num: '03',
      title: 'TaskFlow CLI',
      desc: 'Color-coded C++17 task manager — add, edit, delete, and prioritize tasks entirely from the terminal.',
      tags: ['C++17', 'CLI', 'Makefile'],
      url: 'https://github.com/saqlainbasit/Taskflow-CLI'
    },
    {
      num: '04',
      title: 'Virtual Steering',
      desc: 'Webcam hand tracking that maps gestures to racing game controls in real time using MediaPipe and OpenCV.',
      tags: ['Python', 'MediaPipe', 'OpenCV'],
      url: 'https://github.com/saqlainbasit/virtual-steering'
    },
    {
      num: '05',
      title: 'SpotifyAdMuter',
      desc: 'System-tray tool that auto-mutes Spotify ads and unmutes when your track resumes, with TTS notifications.',
      tags: ['Python', 'TTS', 'System Tray'],
      url: 'https://github.com/saqlainbasit/spotify_muter'
    }
  ];

  const container = document.getElementById('projects-index');
  if (container) {
    // Header row
    const header = document.createElement('div');
    header.className = 'index-header';
    header.innerHTML = `<div aria-hidden="true"></div><div aria-hidden="true"></div><div>Stack</div><div class="right">Repo ↗</div>`;
    container.appendChild(header);

    projects.forEach(p => {
      const row = document.createElement('a');
      row.className = 'index-row fade-up';
      row.href = p.url;
      row.target = '_blank';
      row.rel = 'noopener noreferrer';
      row.innerHTML = `
        <div class="row-num">${p.num}</div>
        <div class="row-main">
          <div class="row-title">${p.title}</div>
          <div class="row-desc">${p.desc}</div>
        </div>
        <div class="row-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="row-link">GitHub ↗</div>
      `;
      container.appendChild(row);
    });

    // Observe newly added rows
    const newFades = container.querySelectorAll('.fade-up');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 50);
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -4% 0px', threshold: 0.04 });
      newFades.forEach(el => obs.observe(el));
    } else {
      newFades.forEach(el => el.classList.add('visible'));
    }
  }

});
