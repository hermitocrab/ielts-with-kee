/**
 * IELTS with Kee — Shared Navigation Component
 * Master Kee 🦄 Universal Nav
 */

(function() {
  'use strict';

  const BRAND = 'IELTS with Kee';
  const NAV_ITEMS = [
    { label: 'Whiteboard', href: 'whiteboard.html', emoji: '📝', id: 'whiteboard' },
    { label: 'Phonetics', href: 'phonetics.html', emoji: '🔊', id: 'phonetics' },
    { label: 'Speaking', href: 'speaking.html', emoji: '🗣️', id: 'speaking' },
    { label: 'Grammar', href: 'grammar.html', emoji: '📚', id: 'grammar' },
    { label: 'Mindmap', href: 'mindmap.html', emoji: '🧠', id: 'mindmap' },
    { label: 'Resources', href: 'resources.html', emoji: '📥', id: 'resources' },
  ];

  function getCurrentPageId() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === 'index.html' || path === '' || path === '/') return 'home';
    const match = NAV_ITEMS.find(item => item.href === path);
    return match ? match.id : '';
  }

  function renderNav() {
    const current = getCurrentPageId();

    const linksHTML = NAV_ITEMS.map(item => {
      const active = item.id === current ? ' class="active"' : '';
      return `<li><a href="${item.href}"${active}><span>${item.emoji}</span> ${item.label}</a></li>`;
    }).join('');

    const isHome = current === 'home';

    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="nav-brand">
          <span class="nav-emoji">🦄</span>
          <span>${BRAND}</span>
        </a>
        <button class="nav-toggle" aria-label="Toggle navigation menu">☰</button>
        <ul class="nav-links">
          ${isHome ? '' : '<li class="mobile-home-link"><a href="index.html"><span>🏠</span> Home</a></li>'}
          ${linksHTML}
        </ul>
      </div>
    `;

    // Insert at top of body
    const firstChild = document.body.firstChild;
    if (firstChild) {
      document.body.insertBefore(nav, firstChild);
    } else {
      document.body.appendChild(nav);
    }

    // Mobile toggle
    const toggle = nav.querySelector('.nav-toggle');
    const links = nav.querySelector('.nav-links');
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });

    // Close nav on link click (mobile)
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });
  }

  // Render immediately on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNav);
  } else {
    renderNav();
  }
})();
