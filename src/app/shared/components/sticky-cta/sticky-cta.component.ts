import { Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-sticky-cta',
  standalone: true,
  template: `
    <div
      class="fixed bottom-3 left-3 right-3 sm:hidden z-40 glass rounded-full pl-5 pr-1.5 py-1.5 flex items-center justify-between gap-3 shadow-[0_18px_40px_-18px_rgba(11,27,38,0.45)]"
      [style.opacity]="visible() ? '1' : '0'"
      [style.transform]="visible() ? 'translateY(0)' : 'translateY(14px)'"
      [style.pointerEvents]="visible() ? 'auto' : 'none'"
      [attr.inert]="visible() ? null : ''"
      style="transition: opacity 220ms ease, transform 320ms var(--ease-swift);"
    >
      <span class="text-[14px] font-semibold text-ink">{{ i18n.t('sticky.text') }}</span>
      <a href="#waitlist" class="btn btn-primary h-10 px-5 text-[14px]">{{ i18n.t('sticky.cta') }}</a>
    </div>
  `,
})
export class StickyCtaComponent {
  readonly i18n = inject(I18nService);
  readonly visible = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    // Show after the hero, hide once the real waitlist form is on screen.
    const waitlist = document.getElementById('waitlist');
    const formInView = waitlist ? waitlist.getBoundingClientRect().top < window.innerHeight : false;
    this.visible.set(window.scrollY > window.innerHeight * 0.8 && !formInView);
  }
}
