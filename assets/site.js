// Navigation remains available without JavaScript; collapse it only when enhanced.
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('#primary-links');
if (menu && links) {
  menu.closest('nav').classList.add('nav-enhanced');
  const smallScreen = window.matchMedia('(max-width: 900px)');
  function syncMenu() {
    links.hidden = smallScreen.matches;
    menu.setAttribute('aria-expanded', String(!links.hidden));
  }
  syncMenu();
  smallScreen.addEventListener('change', syncMenu);
  menu.addEventListener('click', () => {
    links.hidden = !links.hidden;
    menu.setAttribute('aria-expanded', String(!links.hidden));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && smallScreen.matches && !links.hidden) {
      links.hidden = true;
      menu.setAttribute('aria-expanded', 'false');
      menu.focus();
    }
  });
}
const toggle = document.querySelector('#preview-toggle');
const figure = document.querySelector('#inline-visual');
if (toggle && figure) {
  toggle.hidden = false;
  toggle.addEventListener('click', () => {
    figure.hidden = !figure.hidden;
    toggle.setAttribute('aria-expanded', String(!figure.hidden));
    toggle.textContent = figure.hidden ? 'Show visual ↗' : 'Hide visual';
  });
}
const motionToggle = document.querySelector('#motion-toggle');
const orbit = document.querySelector('.orbit-motion');
if (motionToggle && orbit) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncMotion = () => {
    motionToggle.hidden = reducedMotion.matches;
    orbit.style.animationPlayState = reducedMotion.matches || motionToggle.getAttribute('aria-pressed') === 'true' ? 'paused' : 'running';
  };
  syncMotion();
  reducedMotion.addEventListener('change', syncMotion);
  motionToggle.addEventListener('click', () => {
    const paused = motionToggle.getAttribute('aria-pressed') !== 'true';
    orbit.style.animationPlayState = paused ? 'paused' : 'running';
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.textContent = paused ? 'Resume motion' : 'Pause motion';
  });
}
