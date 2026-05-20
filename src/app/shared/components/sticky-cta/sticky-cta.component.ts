import { Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-sticky-cta',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="fixed bottom-3 left-3 right-3 sm:hidden z-40 glass rounded-full px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_18px_40px_-18px_rgba(8,145,178,0.5)]">
        <span class="text-[14px] font-medium text-ink">{{ i18n.t('sticky.text') }}</span>
        <a href="#waitlist" class="btn btn-primary h-10 px-5 text-[13px]">{{ i18n.t('sticky.cta') }}</a>
      </div>
    }
  `,
})
export class StickyCtaComponent {
  readonly i18n = inject(I18nService);
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.visible.set(window.scrollY > window.innerHeight * 0.7);
  }
}
