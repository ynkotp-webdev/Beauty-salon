/**
 * Client entry point. Kept intentionally tiny and dependency-free.
 * Each feature is a self-contained module initialised after DOM parse.
 */
import { initReveal } from './reveal';
import { initHeader } from './header';
import { initBeforeAfter } from './before-after';
import { initAccordion } from './accordion';
import { initBooking } from './booking';

const boot = (): void => {
  initHeader();
  initReveal();
  initBeforeAfter();
  initAccordion();
  initBooking();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
