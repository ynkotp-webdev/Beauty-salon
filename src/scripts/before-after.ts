/**
 * Accessible before/after comparison slider.
 * Supports pointer drag, click-to-position and full keyboard control
 * (Arrow keys, Home/End). Implements the WAI-ARIA slider pattern.
 */
export function initBeforeAfter(): void {
  const containers = document.querySelectorAll<HTMLElement>('[data-before-after]');
  containers.forEach((container) => new BeforeAfterSlider(container));
}

class BeforeAfterSlider {
  private container: HTMLElement;
  private beforeWrapper: HTMLElement;
  private handle: HTMLElement;
  private dragging = false;
  private position = 50;

  constructor(container: HTMLElement) {
    this.container = container;
    this.beforeWrapper = container.querySelector<HTMLElement>('[data-before]')!;
    this.handle = container.querySelector<HTMLElement>('[data-handle]')!;
    if (!this.beforeWrapper || !this.handle) return;
    this.bind();
    this.set(this.position);
  }

  private bind(): void {
    // Pointer events unify mouse + touch + pen.
    this.handle.addEventListener('pointerdown', (e) => {
      this.dragging = true;
      this.handle.setPointerCapture(e.pointerId);
      this.handle.style.cursor = 'grabbing';
    });
    this.handle.addEventListener('pointerup', (e) => {
      this.dragging = false;
      this.handle.releasePointerCapture(e.pointerId);
      this.handle.style.cursor = '';
    });
    this.handle.addEventListener('pointermove', (e) => {
      if (!this.dragging) return;
      this.fromClientX(e.clientX);
    });

    // Click anywhere on the track to jump the divider there.
    this.container.addEventListener('pointerdown', (e) => {
      if (e.target === this.handle || this.handle.contains(e.target as Node)) return;
      this.fromClientX(e.clientX);
    });

    // Keyboard: WAI-ARIA slider semantics.
    this.handle.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 10 : 2;
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          this.set(this.position - step);
          e.preventDefault();
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          this.set(this.position + step);
          e.preventDefault();
          break;
        case 'Home':
          this.set(0);
          e.preventDefault();
          break;
        case 'End':
          this.set(100);
          e.preventDefault();
          break;
      }
    });
  }

  private fromClientX(clientX: number): void {
    const rect = this.container.getBoundingClientRect();
    this.set(((clientX - rect.left) / rect.width) * 100);
  }

  private set(pct: number): void {
    this.position = Math.max(0, Math.min(100, pct));
    // Clip the "before" layer from the right so "after" shows through.
    this.beforeWrapper.style.clipPath = `inset(0 ${100 - this.position}% 0 0)`;
    this.handle.style.left = `${this.position}%`;
    this.handle.setAttribute('aria-valuenow', String(Math.round(this.position)));
  }
}
