import { Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [LanguageToggleComponent, LogoComponent],
  template: `
    <header
      class="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-[1180px] transition-all duration-300"
      [class.scrolled]="scrolled()"
    >
      <div
        class="glass flex items-center justify-between rounded-full px-3.5 sm:px-5 py-2.5 transition-shadow"
        [style.boxShadow]="scrolled() ? '0 10px 30px -16px rgba(8,145,178,0.35)' : '0 4px 18px -10px rgba(8,145,178,0.18)'"
      >
        <app-logo />

        <nav class="hidden md:flex items-center gap-7 text-[14px] text-ink-muted">
          <a href="#features" class="hover:text-ink transition">{{ i18n.t('nav.features') }}</a>
          <a href="#privacy" class="hover:text-ink transition">{{ i18n.t('nav.privacy') }}</a>
          <a href="#faq" class="hover:text-ink transition">{{ i18n.t('nav.faq') }}</a>
        </nav>

        <div class="flex items-center gap-2.5">
          <app-language-toggle />
          <a href="#waitlist" class="btn btn-primary h-10 px-4 text-[14px] hidden sm:inline-flex">
            {{ i18n.t('nav.cta') }}
          </a>
          <button
            class="md:hidden grid place-items-center w-10 h-10 rounded-full border border-slate-200 bg-white"
            [attr.aria-label]="i18n.t('nav.menu')"
            (click)="open.set(!open())"
          >
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              @if (!open()) {
                <path d="M4 7h16M4 12h16M4 17h16" />
              } @else {
                <path d="M6 6l12 12M6 18L18 6" />
              }
            </svg>
          </button>
        </div>
      </div>

      @if (open()) {
        <div class="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-1 text-[15px]">
          <a href="#features" (click)="open.set(false)" class="py-2.5 px-2 rounded-lg hover:bg-primary/5">{{ i18n.t('nav.features') }}</a>
          <a href="#privacy" (click)="open.set(false)" class="py-2.5 px-2 rounded-lg hover:bg-primary/5">{{ i18n.t('nav.privacy') }}</a>
          <a href="#faq" (click)="open.set(false)" class="py-2.5 px-2 rounded-lg hover:bg-primary/5">{{ i18n.t('nav.faq') }}</a>
          <a href="#waitlist" (click)="open.set(false)" class="btn btn-primary mt-2 w-full">{{ i18n.t('nav.cta') }}</a>
        </div>
      }
    </header>
  `,
})
export class NavComponent {
  readonly i18n = inject(I18nService);
  readonly scrolled = signal(false);
  readonly open = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 12);
  }
}
