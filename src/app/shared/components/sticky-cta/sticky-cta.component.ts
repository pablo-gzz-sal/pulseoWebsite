import { Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-sticky-cta',
  standalone: true,
  template: `
    <div
      class="fixed bottom-3 left-3 right-3 sm:hidden z-40 glass rounded-full px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_18px_40px_-18px_rgba(8,145,178,0.5)]"
      [style.opacity]="visible() ? '1' : '0'"
      [style.transform]="visible() ? 'translateY(0)' : 'translateY(14px)'"
      [style.pointerEvents]="visible() ? 'auto' : 'none'"
      [attr.aria-hidden]="!visible()"
      style="transition: opacity 220ms ease, transform 320ms cubic-bezier(0.32,0.72,0,1);"
    >
      <span class="text-[14px] font-medium text-ink">{{ i18n.t('sticky.text') }}</span>
      <a href="#waitlist" class="btn btn-primary h-10 px-5 text-[13px]" [attr.tabindex]="visible() ? null : -1">{{ i18n.t('sticky.cta') }}</a>
    </div>
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
