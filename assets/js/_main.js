/* Vanilla site JS — nav toggle, search overlay wiring */

function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');
  nav.classList.add('closed');

  const toggle = document.createElement('button');
  toggle.id = 'nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<i class="fa fa-bars"></i> Menu';
  nav.parentNode.insertBefore(toggle, nav);

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const opening = nav.classList.contains('closed');
    nav.classList.toggle('opened');
    nav.classList.toggle('closed');
    toggle.setAttribute('aria-expanded', opening ? 'true' : 'false');
  });

  nav.addEventListener('click', (e) => e.stopPropagation());

  document.documentElement.addEventListener('click', () => {
    if (nav.classList.contains('opened')) {
      nav.classList.remove('opened');
      nav.classList.add('closed');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

function initSearch() {
  const searchField = document.querySelector('.search-field');
  if (!searchField || typeof SimpleJekyllSearch === 'undefined') return;

  SimpleJekyllSearch({
    searchInput: searchField,
    resultsContainer: document.querySelector('.search-results'),
    json: '/search.json',
    searchResultTemplate: '<li><article><a href="{url}">{title} <span class="entry-date"><time datetime="{date}">{shortdate}</time></span></a></article></li>',
    noResultsText: '<p>Nothing found.</p>',
    fuzzy: true,
  });

  const wrapper = document.querySelector('.search-wrapper');
  const form    = document.querySelector('.search-form');
  const canvas  = document.querySelector('.js-menu-screen');
  const openBtn = document.querySelector('.dosearch');
  const closeBtn = document.querySelector('.close-btn');

  openBtn?.addEventListener('click', () => {
    if (wrapper) wrapper.style.display = 'block';
    document.body.classList.toggle('no-scroll');
    form?.classList.toggle('active');
    canvas?.classList.toggle('is-visible');
    form?.querySelector('input')?.focus();
  });

  closeBtn?.addEventListener('click', () => {
    wrapper?.removeAttribute('style');
    document.body.classList.toggle('no-scroll');
    form?.classList.toggle('active');
    canvas?.classList.remove('is-visible');
  });
}

function initLightbox() {
  if (typeof GLightbox === 'undefined') return;

  const imageLinks = document.querySelectorAll(
    'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".JPG"], a[href$=".png"], a[href$=".gif"]'
  );
  imageLinks.forEach((link) => link.classList.add('image-popup'));

  GLightbox({
    selector: '.image-popup',
    loop: true,
    touchNavigation: true,
  });
}

function init() {
  initNav();
  initSearch();
  initLightbox();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

