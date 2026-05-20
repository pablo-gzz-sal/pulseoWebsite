import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-privacy-section',
  standalone: true,
  imports: [GsapRevealDirective],
  template: `
    <section id="privacy" class="section section-y">
      <div class="rounded-[28px] relative overflow-hidden p-8 sm:p-14"
        style="background: linear-gradient(135deg, #0E7490 0%, #0F172A 100%);">
        <div aria-hidden="true" class="absolute inset-0 -z-0 opacity-30"
          style="background-image: radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px); background-size: 22px 22px;"></div>

        <div class="relative grid md:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div class="flex flex-col gap-6 text-white">
            <span class="eyebrow" style="color: #67E8F9;">
              {{ i18n.t('privacy.eyebrow') }}
            </span>
            <h2 class="h2" style="max-width: 18ch;">{{ i18n.t('privacy.h2') }}</h2>
            <p class="text-[17px] leading-relaxed text-white/80" style="max-width: 50ch;">{{ i18n.t('privacy.sub') }}</p>

            <ul class="flex flex-col gap-3 mt-2" appReveal="fade-up" revealStagger=".privacy-bullet">
              @for (k of ['1','2','3','4']; track k) {
                <li class="privacy-bullet flex items-start gap-3 text-[15px] text-white/90">
                  <span class="mt-1 grid place-items-center w-5 h-5 rounded-full bg-white/15 text-white shrink-0">
                    <svg viewBox="0 0 24 24" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                  </span>{{ i18n.t('privacy.point.' + k) }}
                </li>
              }
            </ul>
          </div>

          <div class="flex justify-center md:justify-end">
            <div class="relative w-[230px] h-[230px] grid place-items-center">
              <div class="absolute inset-0 rounded-full opacity-30" style="background: radial-gradient(closest-side, #22D3EE, transparent 70%);"></div>
              <div class="absolute inset-6 rounded-full border border-white/15"></div>
              <div class="absolute inset-12 rounded-full border border-white/10"></div>
              <svg viewBox="0 0 24 24" class="w-20 h-20 text-cyan-200 relative" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="4" y="11" width="16" height="10" rx="2.5"/>
                <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
                <circle cx="12" cy="16" r="1.2" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class PrivacySection {
  readonly i18n = inject(I18nService);
}
