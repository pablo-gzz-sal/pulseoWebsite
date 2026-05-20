import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { FaqItemComponent } from '../../../shared/components/faq-item/faq-item.component';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [SectionHeaderComponent, FaqItemComponent, GsapRevealDirective],
  template: `
    <section id="faq" class="section section-y">
      <app-section-header
        align="center"
        [eyebrow]="i18n.t('faq.eyebrow')"
        [title]="i18n.t('faq.h2')"
      />

      <div class="mt-12 max-w-2xl mx-auto flex flex-col gap-3" appReveal="fade-up" revealStagger="app-faq-item">
        @for (k of ['1','2','3','4','5','6']; track k) {
          <app-faq-item [question]="i18n.t('faq.q.' + k)" [answer]="i18n.t('faq.a.' + k)" />
        }
      </div>
    </section>
  `,
})
export class FaqSection {
  readonly i18n = inject(I18nService);
}
