import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { FaqItemComponent } from '../../../shared/components/faq-item/faq-item.component';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [FaqItemComponent, GsapRevealDirective],
  template: `
    <section id="faq" data-nav class="section section-y" aria-labelledby="faq-title">
      <div class="grid lg:grid-cols-[180px_0.9fr_1.1fr] gap-8 lg:gap-12">
        <div class="flex lg:flex-col gap-4 lg:gap-3 items-center lg:items-start">
          <span class="section-index"><b>05</b> / 05</span>
          <span class="eyebrow">{{ i18n.t('faq.eyebrow') }}</span>
        </div>

        <div class="lg:sticky lg:top-28 self-start" appReveal="fade-up">
          <h2 id="faq-title" class="h2 text-ink max-w-[12ch]">{{ i18n.t('faq.h2') }}</h2>
          <p class="mt-5 text-[15px] text-ink-muted">
            {{ i18n.t('faq.more') }}
            <a href="mailto:hola@pulseo.app" class="text-ink font-semibold underline decoration-line underline-offset-4 hover:decoration-primary">hola&#64;pulseo.app</a>
          </p>
        </div>

        <div class="border-t hairline" appReveal="fade-up" revealStagger="app-faq-item">
          @for (k of ['1', '2', '3', '4', '5', '6']; track k; let i = $index) {
            <app-faq-item [index]="i + 1" [question]="i18n.t('faq.q.' + k)" [answer]="i18n.t('faq.a.' + k)" />
          }
        </div>
      </div>
    </section>
  `,
})
export class FaqSection {
  readonly i18n = inject(I18nService);
}
