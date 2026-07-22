/**
 * Scroll-driven reveal.
 * Toggles [data-revealed] on [data-reveal] elements as they enter the viewport.
 * Uses a single IntersectionObserver; unobserves after reveal (one-shot).
 * Motion itself lives in CSS and is auto-disabled by prefers-reduced-motion.
 */
export function initReveal(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (els.length === 0) return;

  // Arm the reveal styles only now that JS is running and an observer will be
  // attached. Until this class is present, [data-reveal] elements stay fully
  // visible — so if this script never runs, no content is hidden.
  document.documentElement.classList.add('reveal-enabled');

  // No IntersectionObserver support → show everything immediately.
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.setAttribute('data-revealed', ''));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-revealed', '');
          obs.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );

  els.forEach((el) => observer.observe(el));
}
