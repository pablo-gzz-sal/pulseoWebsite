import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  template: `
    <div class="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-[12px] font-semibold tracking-wide">
      <button
        type="button"
        class="rounded-full px-3 py-1.5 transition"
        [class.bg-primary]="i18n.isES()"
        [class.text-white]="i18n.isES()"
        [class.text-slate-500]="!i18n.isES()"
        (click)="i18n.setLocale('es')"
        aria-label="Cambiar a español"
      >ES</button>
      <button
        type="button"
        class="rounded-full px-3 py-1.5 transition"
        [class.bg-primary]="!i18n.isES()"
        [class.text-white]="!i18n.isES()"
        [class.text-slate-500]="i18n.isES()"
        (click)="i18n.setLocale('en')"
        aria-label="Switch to English"
      >EN</button>
    </div>
  `,
})
export class LanguageToggleComponent {
  readonly i18n = inject(I18nService);
}
