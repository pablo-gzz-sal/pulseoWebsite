import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';

type Status = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-waitlist-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form
      class="w-full max-w-md flex flex-col sm:flex-row items-stretch gap-2.5"
      (submit)="submit($event)"
      novalidate
    >
      <label class="sr-only" for="waitlist-email">Email</label>
      <input
        id="waitlist-email"
        type="email"
        required
        [(ngModel)]="email"
        name="email"
        autocomplete="email"
        [placeholder]="i18n.t('cta.placeholder')"
        class="flex-1 h-12 rounded-full bg-white border border-slate-200 px-5 text-[15px] outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition placeholder:text-ink-soft"
        [disabled]="status() === 'submitting' || status() === 'success'"
      />
      <button
        class="btn btn-primary h-12 px-6"
        type="submit"
        [attr.aria-busy]="status() === 'submitting' ? 'true' : null"
        [disabled]="status() === 'submitting' || status() === 'success'"
      >
        @if (status() === 'submitting') {
          <svg class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
            <path d="M21 12a9 9 0 1 1-6.2-8.55" />
          </svg>
        } @else if (status() === 'success') {
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12l5 5L20 7" />
          </svg>
        }
        <span>{{ status() === 'success' ? (i18n.isES() ? 'Listo' : 'Done') : i18n.t('cta.button') }}</span>
      </button>
    </form>
    <p class="mt-3 text-[13px] min-h-[20px]"
       [attr.role]="status() === 'error' ? 'alert' : 'status'"
       aria-live="polite"
       [class.text-secondary]="status() === 'success'"
       [class.text-danger]="status() === 'error'"
       [class.text-ink-soft]="status() === 'idle' || status() === 'submitting'">
      @if (status() === 'success') { {{ i18n.t('cta.success') }} }
      @else if (status() === 'error') { {{ i18n.t('cta.error') }} }
      @else { {{ i18n.t('cta.sub') }} }
    </p>
  `,
})
export class WaitlistFormComponent {
  readonly i18n = inject(I18nService);
  email = '';
  readonly status = signal<Status>('idle');

  async submit(e: Event) {
    e.preventDefault();
    if (!this.email || !/.+@.+\..+/.test(this.email)) {
      this.status.set('error');
      return;
    }
    this.status.set('submitting');
    try {
      // TODO: replace with real Formspree endpoint, e.g.:
      // const res = await fetch('https://formspree.io/f/XXXXXX', {
      //   method: 'POST', headers: { 'Accept': 'application/json' },
      //   body: new URLSearchParams({ email: this.email })
      // });
      // if (!res.ok) throw new Error('bad');
      await new Promise((r) => setTimeout(r, 800));
      console.info('[Pulseo waitlist]', this.email);
      this.status.set('success');
    } catch {
      this.status.set('error');
    }
  }
}
