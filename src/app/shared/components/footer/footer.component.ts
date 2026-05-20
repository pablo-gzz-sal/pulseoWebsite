import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LogoComponent],
  template: `
    <footer class="mt-24 border-t border-slate-200/70 bg-white/40">
      <div class="section py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-4">
          <app-logo />
          <span class="text-[13px] text-ink-soft hidden sm:inline">·</span>
          <span class="text-[13px] text-ink-soft">{{ i18n.t('footer.tagline') }}</span>
        </div>
        <div class="flex items-center gap-6 text-[13px] text-ink-muted">
          <a href="#privacy" class="hover:text-ink transition">{{ i18n.t('footer.privacy') }}</a>
          <a href="#" class="hover:text-ink transition">{{ i18n.t('footer.terms') }}</a>
          <a href="mailto:hola@pulseo.app" class="hover:text-ink transition">{{ i18n.t('footer.contact') }}</a>
        </div>
        <span class="text-[12px] text-ink-soft">© 2026 Pulseo</span>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly i18n = inject(I18nService);
}
