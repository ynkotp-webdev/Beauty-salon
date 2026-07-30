/**
 * Header behaviour:
 *  - adds [data-scrolled] once the page leaves the hero (condenses the bar);
 *  - controls the mobile menu (focus-trap-lite, Esc to close, scroll lock);
 *  - reveals the mobile sticky CTA only after the user scrolls past the hero.
 */
export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
  const stickyCta = document.querySelector<HTMLElement>('[data-sticky-cta]');
  const sentinel = document.querySelector<HTMLElement>('[data-hero-sentinel]');

  // Sticky CTA appears once the hero has fully scrolled past.
  if (sentinel && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      ([entry]) => stickyCta?.toggleAttribute('data-visible', !entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px' },
    );
    io.observe(sentinel);
  }

  // Header condenses as soon as the page scrolls at all — independent of hero
  // height. Tying this to the hero-bottom sentinel meant any viewport shorter
  // than the hero (roughly ≤1074px tall, e.g. common 1440×900/1366×768
  // windows) started pre-condensed on load, skipping the transparent-over-hero
  // entrance entirely.
  const updateHeaderScrolled = () => header?.toggleAttribute('data-scrolled', window.scrollY > 24);
  updateHeaderScrolled();
  window.addEventListener('scroll', updateHeaderScrolled, { passive: true });

  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.toggleAttribute('data-open', open);
    // Strip the scrolled bar's tint/blur so it doesn't band across the overlay.
    header?.toggleAttribute('data-menu-open', open);
    document.documentElement.classList.toggle('overflow-hidden', open);
    if (open) {
      menu.querySelector<HTMLElement>('a, button')?.focus();
    } else {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close when a nav link is chosen.
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => setOpen(false)),
  );

  // Close on Escape.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
    }
  });
}
