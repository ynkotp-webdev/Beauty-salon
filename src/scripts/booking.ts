/**
 * Multi-step booking flow (client-only; no backend).
 *
 * Design goals from the research:
 *  - progressive disclosure (one decision per step) to reduce cognitive load;
 *  - inline validation with a text message + icon (never colour-only);
 *  - the submit action is never silently blocked — invalid fields are named;
 *  - a progress indicator communicates "one simple step left".
 */
export function initBooking(): void {
  const form = document.querySelector<HTMLFormElement>('[data-booking]');
  if (!form) return;

  const steps = Array.from(form.querySelectorAll<HTMLElement>('[data-step]'));
  const progressFill = form.querySelector<HTMLElement>('[data-progress-fill]');
  const progressLabel = form.querySelector<HTMLElement>('[data-progress-label]');
  const successPanel = form.querySelector<HTMLElement>('[data-booking-success]');
  const summaryEl = form.querySelector<HTMLElement>('[data-booking-summary]');
  const liveRegion = form.querySelector<HTMLElement>('[data-booking-live]');
  const total = steps.length;
  let current = 0;

  const announce = (msg: string) => {
    if (liveRegion) liveRegion.textContent = msg;
  };

  // Persist in-progress answers across an accidental refresh/tab-close — the
  // brand promises an unhurried, no-rush booking decision, so a visitor who
  // steps away mid-form shouldn't come back to a blank step 1.
  const DRAFT_KEY = 'vervena-booking-draft';
  const saveDraft = () => {
    const values: Record<string, string> = {};
    new FormData(form).forEach((v, k) => { values[k] = String(v); });
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ step: current, values }));
  };
  const restoreDraft = (): number => {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return 0;
    try {
      const { step, values } = JSON.parse(raw) as { step: number; values: Record<string, string> };
      for (const [name, value] of Object.entries(values)) {
        const radio = form.querySelector<HTMLInputElement>(`input[name="${name}"][value="${CSS.escape(value)}"]`);
        if (radio) { radio.checked = true; continue; }
        const field = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`);
        if (field) field.value = value;
      }
      return Number.isInteger(step) && step > 0 && step < total ? step : 0;
    } catch {
      return 0;
    }
  };

  // Step 2 only shows specialists who actually cover the direction chosen in
  // step 1 (plus "any available"), so the choice stays within the ≤4-option
  // cognitive-load guideline instead of listing all 5 masters regardless of
  // relevance.
  const specialistGroup = form.querySelector<HTMLElement>('[data-required-group="specialist"]');
  const filterSpecialistsByDirection = () => {
    if (!specialistGroup) return;
    const direction = form.querySelector<HTMLInputElement>('input[name="direction"]:checked')?.value;
    let checkedWasHidden = false;
    specialistGroup.querySelectorAll<HTMLLabelElement>('label[data-directions]').forEach((label) => {
      const matches = !direction || label.dataset.directions!.split(',').includes(direction);
      label.toggleAttribute('hidden', !matches);
      if (!matches && label.querySelector('input')?.checked) checkedWasHidden = true;
    });
    // The direction changed out from under a previously-picked specialist —
    // fall back to "any available" rather than leaving a hidden radio checked.
    if (checkedWasHidden) {
      const anyInput = specialistGroup.querySelector<HTMLInputElement>('input[value="any"]');
      if (anyInput) anyInput.checked = true;
    }
  };
  form.querySelectorAll<HTMLInputElement>('input[name="direction"]').forEach((radio) => {
    radio.addEventListener('change', filterSpecialistsByDirection);
  });
  form.addEventListener('input', saveDraft);
  form.addEventListener('change', saveDraft);

  const showStep = (index: number, moveFocus = true) => {
    current = index;
    steps.forEach((s, i) => s.toggleAttribute('hidden', i !== index));
    if (progressFill) progressFill.style.transform = `scaleX(${(index + 1) / total})`;
    if (progressLabel) progressLabel.textContent = `Крок ${index + 1} / ${total}`;
    // Move focus to the step heading for screen-reader + keyboard continuity.
    // preventScroll is essential: the steps swap in place, so focusing must
    // never yank the page — and it must NOT run on initial load at all
    // (moveFocus=false), which would scroll the visitor down to the form.
    if (moveFocus) {
      steps[index].querySelector<HTMLElement>('[data-step-focus]')?.focus({ preventScroll: true });
    }
    announce(`${progressLabel?.textContent ?? ''}`);
    saveDraft();
  };

  /** Validate every required control inside a given step. */
  const validateStep = (step: HTMLElement): boolean => {
    let ok = true;
    let firstInvalid: HTMLElement | null = null;

    // Radio groups (direction / specialist).
    step.querySelectorAll<HTMLElement>('[data-required-group]').forEach((group) => {
      const name = group.getAttribute('data-required-group')!;
      const checked = form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
      const err = group.querySelector<HTMLElement>('[data-error]');
      if (!checked) {
        ok = false;
        err?.removeAttribute('hidden');
        group.setAttribute('data-invalid', '');
        firstInvalid ??= group.querySelector<HTMLElement>('input');
      } else {
        err?.setAttribute('hidden', '');
        group.removeAttribute('data-invalid');
      }
    });

    // Individual required inputs (text / tel / date / time).
    step.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-validate]').forEach((field) => {
      const valid = checkField(field);
      if (!valid) {
        ok = false;
        firstInvalid ??= field;
      }
    });

    // Cast breaks TS control-flow narrowing (assignments happen inside the
    // forEach callbacks above, which the analyser doesn't track).
    const invalid = firstInvalid as HTMLElement | null;
    if (invalid) {
      invalid.focus({ preventScroll: true });
      invalid.scrollIntoView({ block: 'center', behavior: 'smooth' });
      announce('Будь ласка, перевірте виділені поля.');
    }
    return ok;
  };

  /** Validate one field; render/clear its inline message. */
  const checkField = (field: HTMLInputElement | HTMLTextAreaElement): boolean => {
    const wrap = field.closest<HTMLElement>('[data-field]');
    const err = wrap?.querySelector<HTMLElement>('[data-error]');
    const value = field.value.trim();
    let message = '';

    if (field.hasAttribute('required') && !value) {
      message = 'Це поле обовʼязкове.';
    } else if (field instanceof HTMLInputElement && field.type === 'tel' && value) {
      // Accept +380XXXXXXXXX or 0XXXXXXXXX and common separators.
      const digits = value.replace(/[\s()+-]/g, '');
      if (!/^(380\d{9}|0\d{9})$/.test(digits)) {
        message = 'Вкажіть номер у форматі +380 XX XXX XX XX.';
      }
    } else if (field instanceof HTMLInputElement && field.type === 'text' && field.name === 'name' && value) {
      if (value.length < 2) message = 'Вкажіть, будь ласка, ваше імʼя.';
    }

    if (message) {
      field.setAttribute('aria-invalid', 'true');
      wrap?.setAttribute('data-invalid', '');
      if (err) {
        err.textContent = message;
        err.removeAttribute('hidden');
      }
      return false;
    }

    field.removeAttribute('aria-invalid');
    wrap?.removeAttribute('data-invalid');
    // Positive confirmation once a previously-touched field becomes valid.
    if (value) wrap?.setAttribute('data-valid', '');
    err?.setAttribute('hidden', '');
    return true;
  };

  // Re-validate on the fly once a field has been interacted with.
  form.querySelectorAll<HTMLInputElement>('[data-validate]').forEach((field) => {
    field.addEventListener('blur', () => checkField(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') checkField(field);
    });
  });

  // Selecting a card clears that group's error immediately.
  form.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const group = radio.closest<HTMLElement>('[data-required-group]');
      group?.removeAttribute('data-invalid');
      group?.querySelector<HTMLElement>('[data-error]')?.setAttribute('hidden', '');
    });
  });

  // Step navigation.
  form.querySelectorAll<HTMLButtonElement>('[data-next]').forEach((btn) =>
    btn.addEventListener('click', () => {
      if (validateStep(steps[current])) showStep(Math.min(current + 1, total - 1));
    }),
  );
  form.querySelectorAll<HTMLButtonElement>('[data-back]').forEach((btn) =>
    btn.addEventListener('click', () => showStep(Math.max(current - 1, 0))),
  );

  // Final submit → build summary, reveal success (enclosed confirmation).
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateStep(steps[current])) return;

    const data = new FormData(form);
    const label = (name: string) => {
      const input = form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
      return input?.getAttribute('data-label') ?? String(data.get(name) ?? '');
    };

    // The <input type="date"> value is always ISO (YYYY-MM-DD) regardless of
    // locale; parse it via local y/m/d components (not `new Date(iso)`, which
    // reads as UTC midnight and can roll back a day in the summary).
    const formatDate = (iso: FormDataEntryValue | null) => {
      const [y, m, d] = String(iso).split('-').map(Number);
      if (!y || !m || !d) return String(iso ?? '');
      return new Intl.DateTimeFormat('uk-UA').format(new Date(y, m - 1, d));
    };

    if (summaryEl) {
      const rows: Array<[string, string]> = [
        ['Напрям', label('direction')],
        ['Майстер', label('specialist')],
        ['Дата й час', `${formatDate(data.get('date'))} · ${data.get('time')}`],
        ['Імʼя', String(data.get('name') ?? '')],
        ['Телефон', String(data.get('phone') ?? '')],
      ];
      summaryEl.innerHTML = rows
        .filter(([, v]) => v && v.trim() && v !== 'undefined')
        .map(
          ([k, v]) =>
            `<div class="flex justify-between gap-6 border-b border-ink/10 py-3 last:border-0"><dt class="text-stone">${k}</dt><dd class="text-right font-medium text-ink">${v}</dd></div>`,
        )
        .join('');
    }

    sessionStorage.removeItem(DRAFT_KEY);
    form.querySelector<HTMLElement>('[data-booking-flow]')?.setAttribute('hidden', '');
    successPanel?.removeAttribute('hidden');
    successPanel?.querySelector<HTMLElement>('[data-step-focus]')?.focus({ preventScroll: true });
    announce('Дякуємо! Заявку прийнято. Ми звʼяжемося для підтвердження.');
  });

  // Constrain the date picker to today onward.
  const dateInput = form.querySelector<HTMLInputElement>('input[type="date"]');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  // Restore an in-progress draft (if the visitor left and came back), then
  // apply the direction filter to whichever direction ended up checked
  // (restored or default) before the visitor ever reaches step 2.
  const restoredStep = restoreDraft();
  filterSpecialistsByDirection();

  // Initialise on the restored (or first) step WITHOUT moving focus —
  // otherwise the page would scroll down to the booking form on load.
  showStep(restoredStep, false);
}
