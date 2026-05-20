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
          <!-- Language toggle + CTA: desktop only in the pill -->
          <app-language-toggle class="hidden md:block" />
          <a href="#waitlist" class="btn btn-primary h-10 px-4 text-[14px] !hidden md:!inline-flex">
            {{ i18n.t('nav.cta') }}
          </a>
          <!-- Hamburger: mobile only -->
          <button
            class="md:hidden grid place-items-center w-10 h-10 rounded-full border border-slate-200 bg-white/90 transition-colors"
            [attr.aria-label]="i18n.t('nav.menu')"
            [attr.aria-expanded]="open()"
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

      <!-- Mobile overlay — always in DOM, animated via max-height + opacity -->
      <div
        class="md:hidden glass rounded-2xl overflow-hidden"
        [style.maxHeight]="open() ? '400px' : '0px'"
        [style.opacity]="open() ? '1' : '0'"
        [style.marginTop]="open() ? '8px' : '0px'"
        [style.pointerEvents]="open() ? 'auto' : 'none'"
        style="transition: max-height 320ms cubic-bezier(0.32,0.72,0,1),
                           opacity 200ms ease,
                           margin-top 320ms cubic-bezier(0.32,0.72,0,1);"
        [attr.aria-hidden]="!open()"
      >
        <!-- Nav links -->
        <div class="flex flex-col px-2 pt-2">
          <a href="#features" (click)="open.set(false)"
             class="flex items-center justify-between py-3 px-3 rounded-xl text-[15px] font-medium text-ink hover:bg-primary/5 transition-colors">
            {{ i18n.t('nav.features') }}
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-ink-soft" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </a>
          <a href="#privacy" (click)="open.set(false)"
             class="flex items-center justify-between py-3 px-3 rounded-xl text-[15px] font-medium text-ink hover:bg-primary/5 transition-colors">
            {{ i18n.t('nav.privacy') }}
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-ink-soft" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </a>
          <a href="#faq" (click)="open.set(false)"
             class="flex items-center justify-between py-3 px-3 rounded-xl text-[15px] font-medium text-ink hover:bg-primary/5 transition-colors">
            {{ i18n.t('nav.faq') }}
            <svg viewBox="0 0 24 24" class="w-4 h-4 text-ink-soft" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </a>
        </div>
        <!-- Divider -->
        <div class="mx-5 my-2 h-px bg-slate-200/80"></div>
        <!-- Language + CTA -->
        <div class="flex flex-col gap-3 px-4 pb-4">
          <div class="flex items-center justify-between">
            <span class="text-[13px] font-medium text-ink-muted">
              {{ i18n.isES() ? 'Idioma' : 'Language' }}
            </span>
            <app-language-toggle />
          </div>
          <a href="#waitlist" (click)="open.set(false)"
             class="btn btn-primary w-full justify-center">
            {{ i18n.t('nav.cta') }}
          </a>
        </div>
      </div>
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
