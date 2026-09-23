import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-privacy-section',
  standalone: true,
  imports: [GsapRevealDirective],
  template: `
    <section id="privacy" data-nav class="bg-white border-y hairline" aria-labelledby="privacy-title">
      <div class="section section-y grid lg:grid-cols-[180px_1fr_1fr] gap-8 lg:gap-12">
        <div class="flex lg:flex-col gap-4 lg:gap-3 items-center lg:items-start">
          <span class="section-index"><b>04</b> / 05</span>
          <span class="eyebrow">{{ i18n.t('privacy.eyebrow') }}</span>
        </div>

        <div appReveal="fade-up">
          <span class="grid place-items-center w-14 h-14 rounded-2xl bg-ink text-white">
            <svg viewBox="0 0 24 24" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
            </svg>
          </span>
          <h2 id="privacy-title" class="h2 text-ink mt-8 max-w-[14ch]">{{ i18n.t('privacy.h2') }}</h2>
          <p class="lede mt-5 max-w-[42ch]">{{ i18n.t('privacy.sub') }}</p>
        </div>

        <ul class="flex flex-col border-t hairline lg:mt-[88px]" appReveal="fade-up" revealStagger="li">
          @for (k of ['1', '2', '3', '4']; track k) {
            <li class="flex items-start gap-4 py-5 border-b hairline text-[16px] text-ink">
              <span class="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-secondary/10 text-secondary-dark shrink-0">
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>
              </span>
              {{ i18n.t('privacy.point.' + k) }}
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class PrivacySection {
  readonly i18n = inject(I18nService);
}
