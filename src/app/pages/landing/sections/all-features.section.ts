import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

interface Feature {
  key: string;
  /** SVG path data, drawn with a 24×24 stroke icon. */
  icon: string;
}

@Component({
  selector: 'app-all-features-section',
  standalone: true,
  imports: [GsapRevealDirective],
  template: `
    <section id="features" data-nav class="section section-y" aria-labelledby="features-title">
      <div class="grid lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div class="flex lg:flex-col gap-4 lg:gap-3 items-center lg:items-start">
          <span class="section-index"><b>03</b> / 05</span>
          <span class="eyebrow">{{ i18n.t('feat.eyebrow') }}</span>
        </div>
        <h2 id="features-title" class="h2 text-ink max-w-[18ch]" appReveal="fade-up">{{ i18n.t('feat.h2') }}</h2>
      </div>

      <ul class="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border-y hairline"
          appReveal="fade-up">
        @for (f of features; track f.key; let i = $index) {
          <li class="feat-item group bg-bg py-9 sm:p-9">
            <div class="flex items-center justify-between">
              <span class="grid place-items-center w-11 h-11 rounded-full border hairline text-primary-dark bg-white
                           transition-colors duration-300 group-hover:bg-ink group-hover:text-white group-hover:border-ink">
                <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.8"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path [attr.d]="f.icon" />
                </svg>
              </span>
              <span class="text-[12px] text-ink-soft tabular-nums">0{{ i + 1 }}</span>
            </div>
            <h3 class="mt-8 text-[20px] font-semibold tracking-tight text-ink">{{ i18n.t('feat.' + f.key + '.title') }}</h3>
            <p class="mt-2 text-[15px] leading-relaxed text-ink-muted max-w-[34ch]">{{ i18n.t('feat.' + f.key + '.body') }}</p>
          </li>
        }
      </ul>
    </section>
  `,
})
export class AllFeaturesSection {
  readonly i18n = inject(I18nService);

  readonly features: Feature[] = [
    { key: 'family', icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
    { key: 'ocr', icon: 'M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2M7 12h10M7 8h6M7 16h8' },
    { key: 'explain', icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 9h8M8 13h5' },
    { key: 'reminder', icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0' },
    { key: 'nearby', icon: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
    { key: 'timeline', icon: 'M12 8v4l3 2M3.05 11a9 9 0 1 1 .5 4M3 4v7h7' },
  ];
}
