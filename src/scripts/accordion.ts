/**
 * FAQ accordion.
 * Progressive enhancement over native <details>: animates open/close via a
 * grid-rows trick and keeps only one item open at a time within a group.
 * Without JS the native <details> still works (fully accessible).
 */
export function initAccordion(): void {
  const groups = document.querySelectorAll<HTMLElement>('[data-accordion]');
  groups.forEach((group) => {
    const items = Array.from(group.querySelectorAll<HTMLDetailsElement>('details'));
    items.forEach((item) => {
      const summary = item.querySelector('summary');
      summary?.addEventListener('click', () => {
        // Close siblings for a clean single-open accordion.
        if (!item.open) {
          items.filter((i) => i !== item && i.open).forEach((i) => (i.open = false));
        }
      });
    });
  });
}
