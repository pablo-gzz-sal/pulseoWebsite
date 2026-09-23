import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent],
  template: `
    <footer class="border-t hairline">
      <div class="section py-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div class="flex flex-col gap-3">
          <app-logo />
          <p class="text-[14px] text-ink-muted">{{ i18n.t('footer.tagline') }}</p>
        </div>
        <div class="flex flex-col gap-4 md:items-end">
          <nav class="flex items-center gap-6 text-[14px] text-ink-muted" [attr.aria-label]="i18n.isES() ? 'Pie de página' : 'Footer'">
            <a href="#privacy" class="hover:text-ink transition-colors">{{ i18n.t('footer.privacy') }}</a>
            <a href="#" class="hover:text-ink transition-colors">{{ i18n.t('footer.terms') }}</a>
            <a href="mailto:hola@pulseo.app" class="hover:text-ink transition-colors">{{ i18n.t('footer.contact') }}</a>
          </nav>
          <span class="eyebrow">© 2026 Pulseo</span>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly i18n = inject(I18nService);
}
