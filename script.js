// ============================================
// script.js — Judah Abraham Portfolio
// Projects data + full page logic in ONE file
// ============================================
(function () {
  'use strict';

  // ============================================
  // PROJECT DATA (embedded — no external dep)
  // ============================================
  var PROJECTS = [
     {
      id: 'campvio',
      name: 'Campio Marketplace',
      technologies: ['Html', 'Css', 'Javascript', 'PhP/MySQL'],
      description: 'Campvio is a marketplace where students can buy and sell products on their campus removing the issues faced for vendors aving a dedicated website or having to find buyers through massive whatsapp adverts.',
      liveUrl: 'https://campvio-waitlist.name.ng',
      images: ['assets/images/campviowaitlit.png', 'assets/images/campvio.jpg', 'assets/images/campvio2.png'],
      color: '#2e0a0a', accent: '#d94a4a'
    },

     {
      id: 'Campvio rh',
      name: 'Campvio Resource Hub',
      technologies: ['Html', 'Css', 'Javascript', 'PhP/MySQL'],
      description: 'Campvio Resource Hub is a respository for school resources like pdfs, notes timetable etc. Here students can gain access to all notes an pdf for thier semester also with their timetable without the hazzle and the stress of scatterd resources on diferent whatsapp group chat.',
      liveUrl: 'https://campviohub.name.ng',
      images: ['assets/images/campviore.png', 'assets/images/campviore1.png', 'assets/images/campviore2.png'],
      color: '#2e2000', accent: '#d9a84a'
    },

  {
    id: "pixvault",
    name: "PixVault",
    technologies: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Cloudinary"],
    description: "PixVault is a full-featured wallpaper platform with user authentication, an admin panel, and category-based browsing. Users can browse and download high-quality wallpapers organised by category. Built on a LAMP-style stack and deployed on InfinityFree with Cloudinary handling image storage and CDN delivery.",
    liveUrl: "https://pixvault.name.ng",
    images: ["assets/images/pixvault-1.jpg", "assets/images/pixvault-2.jpg", "assets/images/pixvault-3.jpg"],
    color: "#0d3b2e",
    accent: "#2fb876"
  },
  {
    id: "kaad",
    name: "Kaad Technical Services",
    technologies: ["WordPress"],
    description: "A professional corporate website for Kaad Technical Services showcasing the company's services, team, and portfolio. Clean, trustworthy design optimised for both desktop and mobile with strong emphasis on performance, accessibility, and lead generation.",
    liveUrl: "#",
    images: ['assets/images/kaad.png', 'assets/images/kaad1.png', 'assets/images/kaad2.png'],
    color: "#0a1f3a",
    accent: "#4a90d9"
  },
  {
    id: "web3edu",
    name: "Web3 Edu",
    technologies: ["WordPress"],
    description: "Web3Edu is a platform aimed at helping anyone understandthe core concept of web3. From decentralization to blockchain to how to create yourown cryptocurrency and memecoin project, We have almost everything you need to know about the web3 space.",
    liveUrl: "https://web3edu.name.ng",
    images: ["assets/images/web3edu.jpg", "assets/images/web3edu1.jpg", "assets/images/web3edu2.jpg"],
    color: "#1e0a3a",
    accent: "#9b4ad9"
  }
  ];

  // ============================================
  // BOOT
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  function boot() {
    initLoading();
    initScrollProgress();
    initNavbar();
    initScrollBg();
    initAnimations();
    initModal();

    if (document.getElementById('projects-list')) {
      renderProjects();
    }
    if (document.getElementById('detail-wrap')) {
      renderDetail();
    }
  }

  // ============================================
  // LOADING SCREEN
  // ============================================
  function initLoading() {
    var screen = document.getElementById('loading-screen');
    if (!screen) return;
    var done = false;
    function hide() {
      if (done) return;
      done = true;
      setTimeout(function () { screen.classList.add('fade-out'); }, 400);
    }
    if (document.readyState === 'complete') hide();
    else { window.addEventListener('load', hide); setTimeout(hide, 3000); }
  }

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    }, { passive: true });
  }

  // ============================================
  // NAVBAR
  // ============================================
  function initNavbar() {
    var items = document.querySelectorAll('.nav-item[data-target]');
    var isDetail = !!document.getElementById('detail-wrap');

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        var t = item.getAttribute('data-target');
        if (t === 'connect') { openModal(); return; }
        if (t === 'home') {
          if (isDetail) window.location.href = 'index.html';
          else window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (isDetail) { window.location.href = 'index.html#' + t; return; }
        var el = document.getElementById(t);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    if (!isDetail) {
      var sections = document.querySelectorAll('[data-section]');
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            items.forEach(function (i) {
              i.classList.toggle('active', i.getAttribute('data-target') === e.target.id);
            });
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      sections.forEach(function (s) { io.observe(s); });
    }
  }

  // ============================================
  // SCROLL BACKGROUND
  // ============================================
  function initScrollBg() {
    var light = false;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 320 && !light) {
        light = true; document.body.classList.add('light-mode');
      } else if (window.scrollY <= 320 && light) {
        light = false; document.body.classList.remove('light-mode');
      }
    }, { passive: true });
  }

  // ============================================
  // SCROLL ANIMATION ENGINE
  // ============================================
  function initAnimations() {
    var animEls = document.querySelectorAll('[data-anim]');
    if (animEls.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            triggerAnim(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      animEls.forEach(function (el) { io.observe(el); });
    }

    var revEls = document.querySelectorAll('.reveal');
    if (revEls.length) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var sibs = Array.from(e.target.parentElement.querySelectorAll('.reveal'));
            e.target.style.transitionDelay = (sibs.indexOf(e.target) * 70) + 'ms';
            e.target.classList.add('visible');
            io2.unobserve(e.target);
          }
        });
      }, { threshold: 0.1 });
      revEls.forEach(function (el) { io2.observe(el); });
    }
  }

  function triggerAnim(el) {
    el.classList.add('anim-in');
    var counter = el.querySelector('[data-count]');
    if (counter) animateCounter(counter);
    animateTags(el);
    if (el.classList.contains('exp-item')) {
      var dot = el.querySelector('.exp-dot-inner');
      if (dot) dot.style.transform = 'scale(1)';
    }
  }

  function animateTags(parent) {
    var tags = parent.querySelectorAll('.tech-tag');
    tags.forEach(function (tag, i) {
      setTimeout(function () { tag.classList.add('tag-in'); }, i * 60);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    var start = null;
    var duration = 1200;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + (p >= 1 ? '+' : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ============================================
  // MODAL
  // ============================================
  function initModal() {
    var overlay = document.getElementById('modal-overlay');
    if (!overlay) return;
    document.querySelectorAll('[data-open-modal]').forEach(function (b) {
      b.addEventListener('click', openModal);
    });
    var closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    var form = document.getElementById('contact-form');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn  = form.querySelector('.btn-submit');
      var ok   = document.getElementById('form-success');
      var errEl = document.getElementById('form-error');

      // ── FORMSPREE ──────────────────────────────────────────
      // 1. Go to https://formspree.io and create a free account
      // 2. Create a new form and copy your endpoint URL
      // 3. Paste it below replacing the placeholder
      var FORMSPREE_URL = 'https://formspree.io/f/mvzdebrv';
      // ────────────────────────────────────────────────────────

      btn.textContent = 'Sending…';
      btn.disabled = true;

      var data = new FormData(form);

      fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        if (res.ok) {
          // Success
          form.style.display = 'none';
          if (ok) ok.style.display = 'block';
          form.reset();
          // Auto-hide success after 4s
          setTimeout(function () {
            form.style.display = '';
            if (ok) ok.style.display = 'none';
            btn.textContent = 'Send Message';
            btn.disabled = false;
          }, 4000);
        } else {
          throw new Error('Server error');
        }
      })
      .catch(function () {
        // Error state
        btn.textContent = 'Send Message';
        btn.disabled = false;
        if (errEl) {
          errEl.style.display = 'block';
          setTimeout(function () { errEl.style.display = 'none'; }, 4000);
        }
      });
    });
  }

  function openModal() {
    var o = document.getElementById('modal-overlay');
    if (!o) return;
    o.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { var f = o.querySelector('input'); if (f) f.focus(); }, 300);
  }

  function closeModal() {
    var o = document.getElementById('modal-overlay');
    if (!o) return;
    o.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ============================================
  // RENDER PROJECTS — index.html
  // ============================================
  function renderProjects() {
    var list = document.getElementById('projects-list');
    if (!list) return;

    PROJECTS.forEach(function (p, i) {
      var card = document.createElement('div');
      card.className = 'pcard';
      card.setAttribute('data-anim', 'up');
      card.setAttribute('data-delay', String(i * 100));

      card.innerHTML =
        '<div class="pcard-num">0' + (i + 1) + '</div>' +
        '<div class="pcard-body">' +
          '<h3 class="pcard-name">' + p.name + '</h3>' +
          '<div class="pcard-tags">' +
            p.technologies.map(function (t) { return '<span class="tech-tag">' + t + '</span>'; }).join('') +
          '</div>' +
          '<p class="pcard-desc">' + p.description + '</p>' +
          '<button class="btn-view-project" data-id="' + p.id + '">' +
            'View Project' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
          '</button>' +
        '</div>';

      list.appendChild(card);
    });

    // Wire up buttons
    list.querySelectorAll('.btn-view-project').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        window.location.href = 'project.html?id=' + id;
      });
    });

    // Observe newly added cards for animation
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          triggerAnim(entry.target);
          // stagger tags
          var tags = entry.target.querySelectorAll('.tech-tag');
          tags.forEach(function (tag, idx) {
            setTimeout(function () { tag.classList.add('tag-in'); }, idx * 55 + 200);
          });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    list.querySelectorAll('.pcard').forEach(function (el) { io.observe(el); });
  }

  // ============================================
  // RENDER DETAIL — project.html
  // ============================================
  function renderDetail() {
    // Read project id from URL: project.html?id=pixvault
    var id = '';
    var search = window.location.search;
    if (search) {
      var match = search.match(/[?&]id=([^&]+)/);
      if (match) id = decodeURIComponent(match[1]);
    }

    if (!id) {
      showError('No project specified. <a href="index.html">Go back home</a>');
      return;
    }

    var project = null;
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].id === id) { project = PROJECTS[i]; break; }
    }

    if (!project) {
      showError('Project "' + id + '" not found. <a href="index.html">Go back home</a>');
      return;
    }

    // Populate page
    document.title = project.name + ' — Judah Abraham';

    var nameEl = document.getElementById('detail-name');
    var descEl = document.getElementById('detail-desc');
    var techEl = document.getElementById('detail-tech');
    var liveBtn = document.getElementById('detail-live');

    if (nameEl) nameEl.textContent = project.name;
    if (descEl) descEl.textContent = project.description;

    if (techEl) {
      techEl.innerHTML = project.technologies
        .map(function (t) { return '<span class="tech-tag">' + t + '</span>'; }).join('');
      setTimeout(function () {
        techEl.querySelectorAll('.tech-tag').forEach(function (tag, i) {
          setTimeout(function () { tag.classList.add('tag-in'); }, i * 60);
        });
      }, 600);
    }

    if (liveBtn) {
      if (project.liveUrl && project.liveUrl !== '#') {
        liveBtn.href = project.liveUrl;
        liveBtn.target = '_blank';
        liveBtn.rel = 'noopener noreferrer';
      } else {
        liveBtn.classList.add('btn-disabled');
        liveBtn.textContent = 'Coming Soon';
      }
    }

    buildCarousel(project);
    initAnimations();
  }

  function showError(msg) {
    var wrap = document.getElementById('detail-wrap');
    if (wrap) wrap.innerHTML = '<div style="padding:60px 24px;text-align:center;color:var(--text-muted);font-family:var(--font-mono)">' + msg + '</div>';
  }

  // ============================================
  // VERTICAL AUTO-SCROLL CAROUSEL
  // ============================================
  function buildCarousel(project) {
    var track = document.getElementById('carousel-track');
    if (!track) return;
    track.innerHTML = '';

    // Duplicate for seamless loop
    var slides = project.images.concat(project.images);
    slides.forEach(function (src, i) {
      var slide = document.createElement('div');
      slide.className = 'vslide';
      // Start with SVG placeholder
      slide.innerHTML = makeSVG(project, (i % project.images.length) + 1);

      // Try loading real image
      var img = new Image();
      img.alt = project.name + ' screenshot ' + ((i % project.images.length) + 1);
      img.onload = function () {
        slide.innerHTML = '';
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
        slide.appendChild(img);
      };
      img.src = src;

      track.appendChild(slide);
    });

    startAutoScroll(track);
  }

  function startAutoScroll(track) {
    var speed = 0.55;
    var pos = 0;
    var paused = false;
    var outer = track.parentElement;

    outer.addEventListener('mouseenter', function () { paused = true; });
    outer.addEventListener('mouseleave', function () { paused = false; });
    outer.addEventListener('touchstart', function () { paused = true; }, { passive: true });
    outer.addEventListener('touchend', function () {
      setTimeout(function () { paused = false; }, 2000);
    }, { passive: true });

    function step() {
      if (!paused) {
        pos += speed;
        var half = track.scrollHeight / 2;
        if (half > 0 && pos >= half) pos = 0;
        track.style.transform = 'translateY(-' + pos + 'px)';
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function makeSVG(project, num) {
    var bg = project.color || '#0d3b2e';
    var ac = project.accent || '#2fb876';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" style="width:100%;height:100%;display:block">' +
      '<rect width="800" height="500" fill="' + bg + '"/>' +
      '<line x1="0" y1="166" x2="800" y2="166" stroke="' + ac + '" stroke-opacity=".07" stroke-width="1"/>' +
      '<line x1="0" y1="333" x2="800" y2="333" stroke="' + ac + '" stroke-opacity=".07" stroke-width="1"/>' +
      '<line x1="200" y1="0" x2="200" y2="500" stroke="' + ac + '" stroke-opacity=".07" stroke-width="1"/>' +
      '<line x1="400" y1="0" x2="400" y2="500" stroke="' + ac + '" stroke-opacity=".07" stroke-width="1"/>' +
      '<line x1="600" y1="0" x2="600" y2="500" stroke="' + ac + '" stroke-opacity=".07" stroke-width="1"/>' +
      '<circle cx="400" cy="250" r="160" fill="' + ac + '" fill-opacity=".05"/>' +
      '<rect x="330" y="180" width="140" height="100" rx="16" fill="' + ac + '" fill-opacity=".1" stroke="' + ac + '" stroke-opacity=".2" stroke-width="1.5"/>' +
      '<rect x="346" y="194" width="108" height="68" rx="5" fill="none" stroke="' + ac + '" stroke-opacity=".45" stroke-width="2"/>' +
      '<line x1="376" y1="262" x2="424" y2="262" stroke="' + ac + '" stroke-opacity=".45" stroke-width="2"/>' +
      '<circle cx="400" cy="270" r="4" fill="' + ac + '" fill-opacity=".45"/>' +
      '<text x="400" y="328" font-family="Georgia,serif" font-size="20" font-weight="700" fill="' + ac + '" fill-opacity=".8" text-anchor="middle">' + project.name + '</text>' +
      '<text x="400" y="352" font-family="monospace" font-size="11" fill="' + ac + '" fill-opacity=".3" text-anchor="middle">Screenshot ' + num + ' — add real images to assets/images/</text>' +
      '</svg>';
  }

})();
