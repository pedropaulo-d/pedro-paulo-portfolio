/* ==========================================================================
   Portfólio — Pedro Paulo Lopes Alves
   JavaScript vanilla: tema, menu mobile, nav ativa, animações de entrada,
   header com blur ao rolar.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ----------------------------------------------------------------------
     1) Tema (dark/light) com persistência em localStorage
        — o tema inicial já foi aplicado pelo script anti-FOUC no <head>.
     ---------------------------------------------------------------------- */
  var themeToggle = document.getElementById('theme-toggle');

  function syncTheme() {
    var isLight = root.getAttribute('data-theme') === 'light';
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isLight));
      themeToggle.setAttribute(
        'aria-label',
        isLight ? 'Ativar tema escuro' : 'Ativar tema claro'
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* noop */ }
      syncTheme();
    });
  }
  syncTheme();

  /* ----------------------------------------------------------------------
     2) Menu mobile (hambúrguer)
     ---------------------------------------------------------------------- */
  var menuToggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('primary-nav');
  var backdrop = document.getElementById('nav-backdrop');

  function openMenu() {
    nav.classList.add('open');
    backdrop.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('nav-open');
  }

  function closeMenu() {
    nav.classList.remove('open');
    backdrop.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('nav-open');
  }

  if (menuToggle && nav && backdrop) {
    menuToggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) { closeMenu(); } else { openMenu(); }
    });

    backdrop.addEventListener('click', closeMenu);

    // Fecha ao clicar em qualquer link do menu
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeMenu(); }
    });

    // Fecha com Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Garante estado correto ao voltar para desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && nav.classList.contains('open')) { closeMenu(); }
    });
  }

  /* ----------------------------------------------------------------------
     3) Header com blur/borda ao rolar
     ---------------------------------------------------------------------- */
  var header = document.getElementById('site-header');
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 10);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ----------------------------------------------------------------------
     4) Animações de entrada ao rolar (IntersectionObserver)
     ---------------------------------------------------------------------- */
  var animated = document.querySelectorAll('[data-animate]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // Fallback: mostra tudo imediatamente
    animated.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          // Stagger: atraso conforme a posição entre os irmãos [data-animate] (teto de 5)
          var parent = el.parentElement;
          if (parent) {
            var sibs = Array.prototype.filter.call(parent.children, function (c) {
              return c.hasAttribute('data-animate');
            });
            var idx = Math.min(sibs.indexOf(el), 5);
            if (idx > 0) { el.style.setProperty('--reveal-delay', (idx * 70) + 'ms'); }
          }
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    animated.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------------------
     4b) Parallax sutil dos brilhos do hero (desktop, sem reduced-motion)
     ---------------------------------------------------------------------- */
  var hero = document.getElementById('hero');
  if (hero && !reduceMotion && window.matchMedia('(min-width: 768px)').matches) {
    var ticking = false;
    var updateParallax = function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        hero.style.setProperty('--py', String(Math.round(y * 0.12)));
      }
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(updateParallax); ticking = true; }
    }, { passive: true });
    updateParallax();
  }

  /* ----------------------------------------------------------------------
     5) Link de navegação ativo conforme a seção visível
     ---------------------------------------------------------------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + id;
          if (active) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ----------------------------------------------------------------------
     6) Ano dinâmico no rodapé
     ---------------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* ----------------------------------------------------------------------
     7) Copiar usuário do Discord para a área de transferência
     ---------------------------------------------------------------------- */
  var copyBtn = document.querySelector('.js-copy-discord');
  if (copyBtn) {
    var labelEl = copyBtn.querySelector('.copy-label');
    var defaultLabel = labelEl ? labelEl.textContent : 'Discord';

    var showCopied = function () {
      if (!labelEl) return;
      labelEl.textContent = 'Copiado!';
      copyBtn.classList.add('copied');
      window.setTimeout(function () {
        labelEl.textContent = defaultLabel;
        copyBtn.classList.remove('copied');
      }, 1600);
    };

    copyBtn.addEventListener('click', function () {
      var user = copyBtn.getAttribute('data-username') || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(user).then(showCopied, showCopied);
      } else {
        var tmp = document.createElement('input');
        tmp.value = user;
        document.body.appendChild(tmp);
        tmp.select();
        try { document.execCommand('copy'); } catch (e) { /* noop */ }
        document.body.removeChild(tmp);
        showCopied();
      }
    });
  }
})();
