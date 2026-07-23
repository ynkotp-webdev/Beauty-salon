/**
 * Hero cinemagraph.
 * The still portrait stays the LCP element: the video carries its sources in
 * [data-src] so nothing downloads until this module opts in, after load and
 * only when motion is welcome and the connection can afford it. The clip
 * fades in once it is genuinely playing, and pauses whenever it leaves the
 * viewport or the tab is hidden.
 */

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

export function initHeroVideo(): void {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  if (!video) return;

  // Motion preference, data saver and slow connections all keep the still.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return;
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return;

  const start = (): void => {
    const sources = video.querySelectorAll<HTMLSourceElement>('source[data-src]');
    if (sources.length === 0) return;

    sources.forEach((source) => {
      source.src = source.dataset.src as string;
      source.removeAttribute('data-src');
    });

    video.load();
    video.addEventListener('playing', () => video.setAttribute('data-ready', ''), { once: true });

    // Autoplay can still be refused (low power mode, browser policy) — the
    // still portrait underneath simply stays visible.
    void video.play().catch(() => {});

    watch(video);
  };

  // Wait for load so the clip never competes with the LCP image.
  if (document.readyState === 'complete') {
    defer(start);
  } else {
    window.addEventListener('load', () => defer(start), { once: true });
  }
}

/** Run on the first idle slot, with a timeout so it never waits forever. */
function defer(fn: () => void): void {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(fn, { timeout: 2000 });
    return;
  }
  window.setTimeout(fn, 200);
}

/** Pause the clip while it is off-screen or the tab is in the background. */
function watch(video: HTMLVideoElement): void {
  let onScreen = true;

  const sync = (): void => {
    if (onScreen && !document.hidden) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  document.addEventListener('visibilitychange', sync);

  if (!('IntersectionObserver' in window)) return;

  new IntersectionObserver(
    (entries) => {
      onScreen = entries[0].isIntersecting;
      sync();
    },
    { threshold: 0.15 },
  ).observe(video);
}
