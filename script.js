/**
 * ==========================================================================
 * KAPIL RAI — PORTFOLIO CLIENT INTERACTIONS & FUNCTIONALITY SCRIPT
 * Features:
 *  - Dual Theme System (Dark Mode & Bright Mode) with Storage Persistence
 *  - Dedicated Theme Switcher in Desktop Navbar & Mobile Drawer
 *  - Fixed Navigation Bar with Active ScrollSpy & Smooth Anchors
 *  - Animated Counters for Numbers & Decimals (7.86 CGPA, 5+ Certs, 2+ Projects)
 *  - One-Click Clipboard Copy with Toast Feedback
 *  - Interactive Project Modals with Full Architectural Breakdowns
 *  - Functional Quick Contact Form with Validation & Mailto Trigger
 *  - Tactile 3D Perspective Card Tilt
 *  - Luxury Custom Cursor with Magnetic Card Expansion
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 0. TOAST NOTIFICATION UTILITY
  // --------------------------------------------------------------------------
  const toast = document.getElementById('copy-toast');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // 1. DUAL THEME CONTROLLER (DARK & BRIGHT)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const themeBtnLabel = document.getElementById('themeBtnLabel');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const mobileThemeIcon = document.getElementById('mobileThemeIcon');
  const mobileThemeText = document.getElementById('mobileThemeText');

  const THEME_STORAGE_KEY = 'kapil_portfolio_theme';

  function applyTheme(theme, notify = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (theme === 'light') {
      if (themeBtnLabel) themeBtnLabel.textContent = 'BRIGHT';
      if (mobileThemeIcon) mobileThemeIcon.textContent = '☀️';
      if (mobileThemeText) mobileThemeText.textContent = 'Switch to Dark Mode';
      if (notify) showToast('Switched to Bright Luxury Theme ✨');
    } else {
      if (themeBtnLabel) themeBtnLabel.textContent = 'DARK';
      if (mobileThemeIcon) mobileThemeIcon.textContent = '🌙';
      if (mobileThemeText) mobileThemeText.textContent = 'Switch to Bright Mode';
      if (notify) showToast('Switched to Dark Editorial Theme 🌙');
    }
  }

  // Initialize theme from storage or system preference
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) {
    applyTheme(savedTheme, false);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light', false);
  } else {
    applyTheme('dark', false);
  }

  // Toggle handlers
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme, true);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  // --------------------------------------------------------------------------
  // 1B. VISUAL ENGINE CONTROLLER (3D WEBGL PLEXUS vs 240-FRAME ANIMATION)
  // --------------------------------------------------------------------------
  const visualModeToggle = document.getElementById('visualModeToggle');
  const engineIcon = document.getElementById('engineIcon');
  const engineLabel = document.getElementById('engineLabel');
  const mobileVisualModeToggle = document.getElementById('mobileVisualModeToggle');
  const mobileEngineIcon = document.getElementById('mobileEngineIcon');
  const mobileEngineText = document.getElementById('mobileEngineText');

  const ENGINE_STORAGE_KEY = 'kapil_portfolio_engine';

  function applyVisualEngine(engine, notify = false) {
    localStorage.setItem(ENGINE_STORAGE_KEY, engine);

    if (window.setVisualEngine) {
      window.setVisualEngine(engine);
    }

    if (engine === 'frames') {
      if (engineIcon) engineIcon.textContent = '🎬';
      if (engineLabel) engineLabel.textContent = '240-FRAME';
      if (mobileEngineIcon) mobileEngineIcon.textContent = '🎬';
      if (mobileEngineText) mobileEngineText.textContent = 'Switch to 3D WebGL Plexus';
      if (notify) showToast('Switched to 240-Frame Cinematic Scroll 🎬');
    } else {
      if (engineIcon) engineIcon.textContent = '🌐';
      if (engineLabel) engineLabel.textContent = '3D WEBGL';
      if (mobileEngineIcon) mobileEngineIcon.textContent = '🌐';
      if (mobileEngineText) mobileEngineText.textContent = 'Switch to 240-Frame Mode';
      if (notify) showToast('Switched to 3D WebGL Interactive Plexus 🌐');
    }
  }

  const savedEngine = localStorage.getItem(ENGINE_STORAGE_KEY) || 'webgl';
  // Small timeout to allow Three.js / WebGL engine to attach
  setTimeout(() => {
    applyVisualEngine(savedEngine, false);
  }, 100);

  function toggleVisualEngine() {
    const currentEngine = localStorage.getItem(ENGINE_STORAGE_KEY) || 'webgl';
    const nextEngine = currentEngine === 'webgl' ? 'frames' : 'webgl';
    applyVisualEngine(nextEngine, true);
  }

  if (visualModeToggle) {
    visualModeToggle.addEventListener('click', toggleVisualEngine);
  }
  if (mobileVisualModeToggle) {
    mobileVisualModeToggle.addEventListener('click', toggleVisualEngine);
  }

  // --------------------------------------------------------------------------
  // 2. FIXED NAVBAR SCROLLSPY & MOBILE MENU
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section, footer');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Mobile drawer toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
    });

    // Close mobile drawer on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // ScrollSpy to highlight active nav link
  function updateScrollSpy() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          }
        });
      }
    });

    // Add shadow when scrolled
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.style.borderBottomColor = 'var(--accent-red)';
        navbar.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.4)';
      } else {
        navbar.style.borderBottomColor = 'var(--border-subtle)';
        navbar.style.boxShadow = 'none';
      }
    }
  }
  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

  // Smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const navHeight = 75;
        const targetPos = targetElem.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. SCROLL REVEAL VIA INTERSECTION OBSERVER
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.scroll-reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute('data-delay') || '0';
        el.style.transitionDelay = `${delay}s`;
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 4. STAT NUMBERS COUNT-UP (INTEGERS & DECIMALS)
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const statsSection = document.querySelector('.stats-row');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach(stat => {
            const targetStr = stat.getAttribute('data-target');
            if (targetStr.includes('.')) {
              // Decimal counter (e.g. 7.86 CGPA)
              animateDecimal(stat, parseFloat(targetStr), 1600);
            } else {
              // Integer counter (e.g. 5+, 2+)
              animateCount(stat, parseInt(targetStr, 10), 1600);
            }
          });
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  }

  function animateCount(element, target, duration) {
    let startTimestamp = null;
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * target);
      element.textContent = `${current}+`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = `${target}+`;
      }
    }
    window.requestAnimationFrame(step);
  }

  function animateDecimal(element, target, duration) {
    let startTimestamp = null;
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = (easeProgress * target).toFixed(2);
      element.textContent = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target.toFixed(2);
      }
    }
    window.requestAnimationFrame(step);
  }

  // --------------------------------------------------------------------------
  // 5. TOAST NOTIFICATION & CLIPBOARD COPY
  // --------------------------------------------------------------------------
  const copyables = document.querySelectorAll('.copyable-item');
  copyables.forEach(item => {
    item.addEventListener('click', () => {
      const textToCopy = item.getAttribute('data-text');
      if (textToCopy) {
        if (textToCopy.endsWith('.pdf')) {
          showToast(`Downloading Kapil Rai's Resume (${textToCopy})...`);
        } else if (navigator.clipboard) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Copied "${textToCopy}" to clipboard!`);
          });
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. PROJECT DETAILS MODALS
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const projectDatabase = {
    'modal-mern': {
      title: 'MERN College Management System',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST APIs', 'CSS3'],
      overview: 'A full-stack enterprise college management platform developed to unify academic, departmental, and student operations under a secure, role-based architecture.',
      modules: [
        'Role-Based Access Control: Specialized dashboards and permission boundaries for Students, Faculty Members, and Administration.',
        'RESTful API Backend: Built with Express.js and Node.js implementing secure JSON Web Token (JWT) session validation.',
        'MongoDB Data Modeling: Relational schemas built with Mongoose for student records, faculty allocations, course registrations, and grading.',
        'Responsive React Interface: Mobile-first responsive UI with dynamic state handling, attendance logs, and report generators.',
        'Testing & Environment: Rigorous Postman API testing, environment variable encapsulation (.env), and local deployment workflows.'
      ],
      github: 'https://github.com/kapilrai018'
    },
    'modal-portfolio': {
      title: 'Personal Portfolio Website',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Dual Themes', 'Canvas 2D', 'Glassmorphism'],
      overview: 'A modern, high-performance portfolio featuring a 240-frame interactive canvas scroll scrub, dark and bright luxury themes, and full responsive accessibility.',
      modules: [
        'Dual Theme System: Dedicated one-click Dark Editorial & Bright Luxury theme switcher with local storage persistence.',
        '240-Frame Canvas Scroll Animation: Real-time sub-pixel scrubbing synchronized with scroll velocity and page progress.',
        'Responsive Navigation: Fixed glass navbar with active ScrollSpy, mobile drawer, and downloadable PDF resume integration.',
        'Achievements Showcase: Verified badges for Oracle Agentic AI, Oracle Generative AI, IBM AI, and Red Hat credentials.',
        'Real Vector QR Codes: Clean SVGs routing directly to Kapil Rai’s LinkedIn and GitHub profiles.'
      ],
      github: 'https://github.com/kapilrai018'
    },
    'modal-dsa': {
      title: 'Data Structures & Algorithms Repository',
      tags: ['C++', 'Java', 'Python', 'Algorithms', 'OOP', 'Problem Solving'],
      overview: 'A comprehensive collection of algorithmic solutions and data structure implementations focused on optimal time and space complexity.',
      modules: [
        'Linear Structures: Custom implementations of dynamic Arrays, Singly/Doubly Linked Lists, Stacks, and Queues.',
        'Non-Linear Structures: Binary Search Trees, AVL Trees, Heaps, and Graph traversal algorithms (BFS, DFS, Dijkstra).',
        'Algorithmic Paradigms: Divide & Conquer, Greedy strategies, Recursion, and Dynamic Programming optimization.',
        'Core Language Rigor: Written in modern C++ with STL and object-oriented Java adhering to clean code standards.'
      ],
      github: 'https://github.com/kapilrai018'
    },
    'modal-academic': {
      title: 'Academic Student Portal',
      tags: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs', 'Git', 'Bootstrap'],
      overview: 'An intuitive academic management portal designed to streamline course registration, grade inspection, and faculty communication.',
      modules: [
        'Student Dashboard: Real-time GPA tracking, semester schedule breakdown, and automated course enrollment.',
        'Modular Components: Clean reusable interface cards with responsive grid systems.',
        'API Integration: Asynchronous fetch requests to backend endpoints for immediate data updates.',
        'Version Control: Managed with Git and GitHub feature branches.'
      ],
      github: 'https://github.com/kapilrai018'
    }
  };

  function openProjectModal(key) {
    const data = projectDatabase[key];
    if (!data || !modalContent || !projectModal) return;

    let tagsHtml = data.tags.map(t => `<span class="tech-pill-sm">${t}</span>`).join('');
    let bulletsHtml = data.modules.map(m => `<li>${m}</li>`).join('');

    modalContent.innerHTML = `
      <h3 class="modal-title">${data.title}</h3>
      <div class="modal-tech-stack">${tagsHtml}</div>
      <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6; margin-bottom:12px;">${data.overview}</p>
      <h5 class="modal-section-h5">KEY ARCHITECTURAL HIGHLIGHTS</h5>
      <ul class="modal-bullet-list">${bulletsHtml}</ul>
      <div class="modal-action-row">
        <a href="${data.github}" target="_blank" rel="noopener" class="modal-btn-gh">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          <span>View on GitHub (kapilrai018)</span>
        </a>
      </div>
    `;

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const modalKey = btn.getAttribute('data-modal');
      openProjectModal(modalKey);
    });
  });

  document.querySelectorAll('.project-interactive').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
      const detailsBtn = card.querySelector('[data-modal]');
      if (detailsBtn) {
        const modalKey = detailsBtn.getAttribute('data-modal');
        openProjectModal(modalKey);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // --------------------------------------------------------------------------
  // 7. QUICK CONTACT MESSAGE FORM
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const msg = document.getElementById('senderMsg').value.trim();

      if (!name || !email || !msg) {
        showToast('Please fill out all fields before submitting.');
        return;
      }

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
      const mailtoUrl = `mailto:kapilper018@gmail.com?subject=${subject}&body=${body}`;

      showToast(`Thank you, ${name}! Launching email client...`);
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      contactForm.reset();
    });
  }

  // --------------------------------------------------------------------------
  // 8. ROTATING STAMP BADGE CLICK SPIN EFFECT
  // --------------------------------------------------------------------------
  const badge = document.getElementById('rotatingBadge');
  if (badge) {
    let extraRotation = 0;
    badge.addEventListener('click', () => {
      extraRotation += 360;
      badge.style.transform = `translateY(-50%) rotate(${extraRotation}deg)`;
      badge.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      showToast('Kapil Rai — Web Developer Portfolio');
    });
  }

  // --------------------------------------------------------------------------
  // 9. TACTILE 3D CARD TILT EFFECT
  // --------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.service-card, .project-card, .cert-card, .edu-card, .about-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // --------------------------------------------------------------------------
  // 10. CUSTOM CURSOR & MAGNETIC EXPANSION
  // --------------------------------------------------------------------------
  const cursorDot = document.querySelector('.custom-cursor-dot');
  const cursorGlow = document.querySelector('.custom-cursor-glow');

  let mousePos = { x: -100, y: -100 };
  let dotPos = { x: -100, y: -100 };
  let glowPos = { x: -100, y: -100 };

  window.addEventListener('mousemove', (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });

  function renderCursor() {
    dotPos.x += (mousePos.x - dotPos.x) * 0.45;
    dotPos.y += (mousePos.y - dotPos.y) * 0.45;
    if (cursorDot) {
      cursorDot.style.left = `${dotPos.x}px`;
      cursorDot.style.top = `${dotPos.y}px`;
    }

    glowPos.x += (mousePos.x - glowPos.x) * 0.18;
    glowPos.y += (mousePos.y - glowPos.y) * 0.18;
    if (cursorGlow) {
      cursorGlow.style.left = `${glowPos.x}px`;
      cursorGlow.style.top = `${glowPos.y}px`;
    }

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  const hoverables = document.querySelectorAll('a, button, .service-card, .project-card, .cert-card, .edu-card, .qr-card, .rotating-badge-container');
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (cursorGlow) {
        cursorGlow.style.width = '52px';
        cursorGlow.style.height = '52px';
        cursorGlow.style.borderColor = 'var(--accent-red)';
        cursorGlow.style.backgroundColor = 'var(--accent-red-subtle)';
      }
    });

    item.addEventListener('mouseleave', () => {
      if (cursorGlow) {
        cursorGlow.style.width = '38px';
        cursorGlow.style.height = '38px';
        cursorGlow.style.borderColor = 'var(--accent-red-glow)';
        cursorGlow.style.backgroundColor = 'transparent';
      }
    });
  });

});
