import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

interface Alert {
  text: string;
  tone: 'danger' | 'amber' | 'primary' | 'secondary';
  icon: 'pill' | 'syringe' | 'refill' | 'brain';
  cta: string;
}

@Component({
  selector: 'app-insights-section',
  standalone: true,
  imports: [SectionHeaderComponent, GsapRevealDirective],
  template: `
    <section class="section section-y relative">
      <div aria-hidden="true" class="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <div class="orb orb-teal absolute w-[480px] h-[480px] -top-20 left-1/2 -translate-x-1/2 opacity-35"></div>
      </div>
      <app-section-header
        align="center"
        [eyebrow]="i18n.t('insights.eyebrow')"
        [title]="i18n.t('insights.h2')"
        [lede]="i18n.t('insights.sub')"
      />

      <div class="mt-12 grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto" appReveal="fade-up" revealStagger=".alert-card">
        @for (a of alerts(); track a.text; let i = $index) {
          <div class="alert-card card p-5 flex items-start gap-4 relative overflow-hidden"
            [style.transform]="'rotate(' + (i % 2 === 0 ? '-0.5deg' : '0.5deg') + ')'">
            <span class="grid place-items-center w-11 h-11 rounded-xl shrink-0"
              [style.background]="bgFor(a.tone)" [style.color]="colorFor(a.tone)">
              @switch (a.icon) {
                @case ('pill') {
                  <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="6" rx="3"/><path d="M12 9v6"/></svg>
                }
                @case ('syringe') {
                  <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2l4 4M16 4l4 4M11 9l4 4-7 7H4v-4z"/></svg>
                }
                @case ('refill') {
                  <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>
                }
                @case ('brain') {
                  <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v0a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3 3 3 0 0 0 6 0 3 3 0 0 0 3-3 3 3 0 0 0 2-5 3 3 0 0 0-2-5 3 3 0 0 0-3-3 3 3 0 0 0-3-3z"/><path d="M12 5v14"/></svg>
                }
              }
            </span>
            <div class="flex flex-col gap-1.5 min-w-0">
              <p class="text-[14.5px] font-semibold leading-snug">{{ a.text }}</p>
              <button class="self-start text-[12.5px] font-semibold inline-flex items-center gap-1"
                [style.color]="colorFor(a.tone)">
                {{ a.cta }}
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class InsightsSection {
  readonly i18n = inject(I18nService);

  alerts = () => [
    { text: this.i18n.t('insights.alert.1'), tone: 'danger', icon: 'pill', cta: this.i18n.isES() ? 'Ver dosis' : 'See doses' },
    { text: this.i18n.t('insights.alert.2'), tone: 'amber', icon: 'syringe', cta: this.i18n.isES() ? 'Agendar' : 'Schedule' },
    { text: this.i18n.t('insights.alert.3'), tone: 'primary', icon: 'refill', cta: this.i18n.isES() ? 'Pedir receta' : 'Refill' },
    { text: this.i18n.t('insights.alert.4'), tone: 'secondary', icon: 'brain', cta: this.i18n.isES() ? 'Explicar' : 'Explain' },
  ] as Alert[];

  bgFor(t: Alert['tone']) {
    return { danger: 'rgba(220,38,38,0.10)', amber: 'rgba(245,158,11,0.14)', primary: 'rgba(8,145,178,0.10)', secondary: 'rgba(5,150,105,0.12)' }[t];
  }
  colorFor(t: Alert['tone']) {
    return { danger: '#B91C1C', amber: '#B45309', primary: '#0E7490', secondary: '#047857' }[t];
  }
}
