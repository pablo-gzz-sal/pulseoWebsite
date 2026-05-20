import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { AnimatedNumberComponent } from '../../../shared/components/animated-number/animated-number.component';
import { PhoneMockupComponent } from '../../../shared/components/phone-mockup/phone-mockup.component';
import { ScreenMedsComponent } from '../../../shared/components/screens/screen-meds.component';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-medication-section',
  standalone: true,
  imports: [SectionHeaderComponent, AnimatedNumberComponent, PhoneMockupComponent, ScreenMedsComponent, GsapRevealDirective],
  template: `
    <section class="section section-y relative">
      <div aria-hidden="true" class="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <div class="orb orb-green absolute w-[380px] h-[380px] bottom-0 left-0 opacity-35"></div>
      </div>
      <div class="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        <div class="flex flex-col gap-8">
          <app-section-header
            [eyebrow]="i18n.t('meds.eyebrow')"
            [title]="i18n.t('meds.h2')"
            [lede]="i18n.t('meds.sub')"
          />

          <div class="grid grid-cols-2 gap-4" appReveal="fade-up" revealStagger=".stat-card">
            <div class="stat-card card p-5">
              <p class="text-[12px] font-semibold uppercase tracking-wider text-ink-soft">{{ i18n.t('meds.stat.adherence') }}</p>
              <p class="mt-2 text-4xl font-bold tracking-tight" style="font-family: var(--font-display); color: var(--color-secondary-dark);">
                <app-animated-number [target]="94" suffix="%" />
              </p>
              <div class="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div class="h-full rounded-full" style="width: 94%; background: linear-gradient(90deg, #10B981, #059669);"></div>
              </div>
            </div>
            <div class="stat-card card p-5">
              <p class="text-[12px] font-semibold uppercase tracking-wider text-ink-soft">{{ i18n.t('meds.stat.streak') }}</p>
              <p class="mt-2 text-4xl font-bold tracking-tight" style="font-family: var(--font-display); color: var(--color-primary-dark);">
                <app-animated-number [target]="28" />
              </p>
              <div class="mt-3 flex items-center gap-1.5">
                @for (n of [1,2,3,4,5,6,7]; track n) {
                  <span class="block w-3 h-3 rounded-full bg-primary"></span>
                }
                <span class="text-[11px] text-ink-soft ml-1">{{ i18n.isES() ? 'sin fallar' : 'in a row' }}</span>
              </div>
            </div>
          </div>

          <ul class="flex flex-col gap-3 mt-2" appReveal="fade-up" revealStagger=".meds-bullet">
            <li class="meds-bullet flex items-start gap-3 text-[15px]">
              <span class="mt-1 grid place-items-center w-5 h-5 rounded-full bg-secondary/15 text-secondary-dark shrink-0">
                <svg viewBox="0 0 24 24" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
              </span>{{ i18n.t('meds.feature.1') }}</li>
            <li class="meds-bullet flex items-start gap-3 text-[15px]">
              <span class="mt-1 grid place-items-center w-5 h-5 rounded-full bg-secondary/15 text-secondary-dark shrink-0">
                <svg viewBox="0 0 24 24" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
              </span>{{ i18n.t('meds.feature.2') }}</li>
            <li class="meds-bullet flex items-start gap-3 text-[15px]">
              <span class="mt-1 grid place-items-center w-5 h-5 rounded-full bg-secondary/15 text-secondary-dark shrink-0">
                <svg viewBox="0 0 24 24" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
              </span>{{ i18n.t('meds.feature.3') }}</li>
          </ul>
        </div>

        <div class="flex justify-center">
          <app-phone-mockup width="clamp(250px, 28vw, 310px)">
            <app-screen-meds />
          </app-phone-mockup>
        </div>
      </div>
    </section>
  `,
})
export class MedicationSection {
  readonly i18n = inject(I18nService);
}
