import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { WaitlistFormComponent } from '../../../shared/components/waitlist-form/waitlist-form.component';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-cta-waitlist-section',
  standalone: true,
  imports: [WaitlistFormComponent, GsapRevealDirective],
  template: `
    <section id="waitlist" data-nav class="section pb-24 sm:pb-32" aria-labelledby="cta-title">
      <div class="relative overflow-hidden rounded-[32px] bg-white border hairline px-6 py-20 sm:px-16 sm:py-28 text-center"
           appReveal="fade-up">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0"
             style="background: radial-gradient(50% 60% at 50% 100%, rgba(8,145,178,0.10), transparent 70%);"></div>

        <div class="relative flex flex-col items-center">
          <span class="eyebrow">{{ i18n.t('cta.eyebrow') }}</span>
          <h2 id="cta-title" class="h2 text-ink mt-6 max-w-[20ch]" style="font-size: clamp(2.2rem, 5vw, 4rem);">
            {{ i18n.t('cta.h2a') }}
            <span class="accent block">{{ i18n.t('cta.h2b') }}</span>
          </h2>

          <div class="mt-10 w-full flex flex-col items-center">
            <app-waitlist-form />
          </div>

          <ul class="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[14px] text-ink-soft">
            @for (k of ['1', '2', '3']; track k; let last = $last) {
              <li class="inline-flex items-center gap-3">
                {{ i18n.t('cta.note.' + k) }}
                @if (!last) { <span aria-hidden="true" class="opacity-50">·</span> }
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
})
export class CtaWaitlistSection {
  readonly i18n = inject(I18nService);
}
