import { Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { MarqueeComponent } from '../../../shared/components/marquee/marquee.component';

@Component({
  selector: 'app-trust-strip-section',
  standalone: true,
  imports: [MarqueeComponent],
  template: `
    <section class="border-y border-slate-200/70 bg-white/50 py-5">
      <div class="section">
        <app-marquee [items]="items()" [speed]="32" />
      </div>
    </section>
  `,
})
export class TrustStripSection {
  readonly i18n = inject(I18nService);
  readonly items = computed(() => [
    this.i18n.t('trust.0'),
    this.i18n.t('trust.1'),
    this.i18n.t('trust.2'),
    this.i18n.t('trust.3'),
    this.i18n.t('trust.4'),
    this.i18n.t('trust.5'),
  ]);
}
