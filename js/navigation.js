/**
 * IELTS with Kee — Shared Navigation Component
 * Updated: May-Aug 2026 season. Speaking hub + DynaSaurus.
 */

(function() {
  'use strict';

  const BRAND = 'IELTS with Kee';
  const NAV_ITEMS = [
    { label: 'Speaking', href: '#', emoji: '🗣️', id: 'speaking', dropdown: [
      { label: 'Part 1', href: 'speaking.html', emoji: '1️⃣' },
      { label: 'Part 2', href: 'speaking-p2/people.html', emoji: '2️⃣' },
      { label: 'Part 3 Bank', href: 'pt3-bank.html', emoji: '3️⃣' },
      { label: 'Research Report', href: 'report/', emoji: '📊' },
    ]},
    { label: 'Phonetics', href: 'phonetics.html', emoji: '🔊', id: 'phonetics' },
    { label: 'DynaSaurus', href: 'https://dynasaurus.rkrk.io', emoji: '🦕', id: 'dynasaurus' },
  ];

  function getCurrentPageId() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === 'index.html' || path === '' || path === '/') return 'home';
    for (const item of NAV_ITEMS) {
      if (item.href === path) return item.id;
      if (item.dropdown) {
        for (const sub of item.dropdown) {
          if (sub.href === path || window.location.pathname.includes(sub.href.replace(/\/$/, ''))) return item.id;
        }
      }
    }
    return '';
  }

  function renderNav() {
    const current = getCurrentPageId();

    const linksHTML = NAV_ITEMS.map(item => {
      const active = item.id === current ? ' class="active"' : '';
      if (item.dropdown) {
        const subHTML = item.dropdown.map(sub => 
          `<a href="${sub.href}"><span>${sub.emoji}</span> ${sub.label}</a>`
        ).join('');
        return `<li class="nav-dropdown"${active}>
          <span class="nav-dropdown-trigger"><span>${item.emoji}</span> ${item.label} ▾</span>
          <div class="nav-dropdown-menu">${subHTML}</div>
        </li>`;
      }
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
          <li class="nav-external-link"><a href="https://rkrk.io" target="_blank" rel="noopener" title="Kee's Language Lab — DynamOS"><span>🔮</span> rkrk.io</a></li>
        </ul>
      </div>
    `;

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

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
      });
    });

    // Dropdown toggle for mobile
    nav.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
      trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          this.parentElement.classList.toggle('open');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNav);
  } else {
    renderNav();
  }
})();
