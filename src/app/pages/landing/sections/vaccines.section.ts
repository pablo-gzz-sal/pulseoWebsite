import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { PhoneMockupComponent } from '../../../shared/components/phone-mockup/phone-mockup.component';
import { ScreenVaccinesComponent } from '../../../shared/components/screens/screen-vaccines.component';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-vaccines-section',
  standalone: true,
  imports: [SectionHeaderComponent, PhoneMockupComponent, ScreenVaccinesComponent, GsapRevealDirective],
  template: `
    <section class="section section-y relative">
      <div aria-hidden="true" class="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <div class="orb orb-amber absolute w-[360px] h-[360px] top-0 right-0 opacity-30"></div>
      </div>
      <div class="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
        <div class="flex justify-center order-2 lg:order-1">
          <app-phone-mockup width="clamp(250px, 28vw, 310px)">
            <app-screen-vaccines />
          </app-phone-mockup>
        </div>
        <div class="flex flex-col gap-8 order-1 lg:order-2">
          <app-section-header
            [eyebrow]="i18n.t('vaccines.eyebrow')"
            [title]="i18n.t('vaccines.h2')"
            [lede]="i18n.t('vaccines.sub')"
          />
          <ul class="flex flex-col gap-3" appReveal="fade-up" revealStagger=".vac-bullet">
            @for (k of ['1','2','3']; track k) {
              <li class="vac-bullet flex items-start gap-3 text-[15px]">
                <span class="mt-1 grid place-items-center w-5 h-5 rounded-full bg-secondary/15 text-secondary-dark shrink-0">
                  <svg viewBox="0 0 24 24" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                </span>{{ i18n.t('vaccines.feature.' + k) }}
              </li>
            }
          </ul>

          <div class="rounded-2xl border border-primary/15 bg-white p-5 flex items-center gap-4">
            <span class="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 text-primary-dark">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 3l18 18M11 4l9 9-3 3-9-9"/><path d="M14 7l3 3M10 11l3 3M6.5 14.5l3 3"/>
              </svg>
            </span>
            <div>
              <p class="text-[14px] font-semibold text-ink">{{ i18n.t('ocr.title') }}</p>
              <p class="text-[13px] text-ink-muted">{{ i18n.t('ocr.body') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class VaccinesSection {
  readonly i18n = inject(I18nService);
}
