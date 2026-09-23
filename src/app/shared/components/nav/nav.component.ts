import { Component, HostListener, inject, signal } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { LogoComponent } from '../logo/logo.component';

const LINKS = [
  { id: 'como-funciona', key: 'nav.how' },
  { id: 'features', key: 'nav.features' },
  { id: 'privacy', key: 'nav.privacy' },
  { id: 'faq', key: 'nav.faq' },
];

/** Sections with a dark background; the nav inverts while one sits under it. */
const DARK_SECTIONS = new Set(['app', 'como-funciona']);

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [LanguageToggleComponent, LogoComponent],
  template: `
    <header class="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-24px)] max-w-[1080px]" [class.nav-dark]="dark()">
      <div class="nav-pill flex items-center justify-between rounded-full pl-4 pr-2 h-14 transition-[background,border-color,box-shadow] duration-300"
           [class.shadow-[0_10px_30px_-18px_rgba(11,27,38,0.35)]]="scrolled()">
        <app-logo />

        <nav class="hidden md:flex items-center gap-1 text-[14px]" aria-label="Principal">
          @for (l of links; track l.id) {
            <a [href]="'#' + l.id"
               class="nav-link relative px-3 py-2 rounded-full transition-colors"
               [class.is-active]="active() === l.id"
               [attr.aria-current]="active() === l.id ? 'true' : null">
              {{ i18n.t(l.key) }}
            </a>
          }
        </nav>

        <div class="flex items-center gap-2">
          <app-language-toggle class="hidden md:block" />
          <a href="#waitlist" class="nav-cta btn h-10 px-4 text-[14px] !hidden md:!inline-flex">{{ i18n.t('nav.cta') }}</a>
          <button
            class="md:hidden grid place-items-center w-10 h-10 rounded-full nav-burger transition-colors"
            [attr.aria-label]="i18n.t('nav.menu')"
            [attr.aria-expanded]="open()"
            aria-controls="mobile-menu"
            (click)="open.set(!open())"
          >
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              @if (!open()) {
                <path d="M4 8h16M4 16h16" />
              } @else {
                <path d="M6 6l12 12M6 18L18 6" />
              }
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        id="mobile-menu"
        class="md:hidden glass rounded-3xl overflow-hidden"
        [style.maxHeight]="open() ? '420px' : '0px'"
        [style.opacity]="open() ? '1' : '0'"
        [style.marginTop]="open() ? '8px' : '0px'"
        [style.pointerEvents]="open() ? 'auto' : 'none'"
        style="transition: max-height 320ms var(--ease-swift), opacity 200ms ease, margin-top 320ms var(--ease-swift);"
        [attr.inert]="open() ? null : ''"
      >
        <div class="flex flex-col px-2 pt-2">
          @for (l of links; track l.id; let i = $index) {
            <a [href]="'#' + l.id" (click)="open.set(false)"
               class="flex items-center gap-4 py-3.5 px-3 rounded-2xl text-[17px] font-semibold text-ink hover:bg-ink/5 transition-colors"
               style="font-family: var(--font-display);">
              <span class="text-[11px] text-ink-soft font-normal">0{{ i + 2 }}</span>
              {{ i18n.t(l.key) }}
            </a>
          }
        </div>
        <div class="mx-5 my-2 h-px bg-line"></div>
        <div class="flex flex-col gap-3 px-4 pb-4">
          <div class="flex items-center justify-between">
            <span class="eyebrow">{{ i18n.isES() ? 'Idioma' : 'Language' }}</span>
            <app-language-toggle />
          </div>
          <a href="#waitlist" (click)="open.set(false)" class="btn btn-primary w-full">{{ i18n.t('nav.cta') }}</a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .nav-pill {
      background: color-mix(in oklab, white 80%, transparent);
      backdrop-filter: saturate(180%) blur(16px);
      -webkit-backdrop-filter: saturate(180%) blur(16px);
      border: 1px solid rgba(11, 27, 38, 0.07);
    }
    .nav-link { color: var(--color-ink-muted); }
    .nav-link:hover { color: var(--color-ink); }
    .nav-link.is-active { color: var(--color-ink); background: rgba(11, 27, 38, 0.05); }
    .nav-cta { background: var(--color-ink); color: white; }
    .nav-cta:hover { background: var(--color-primary-dark); }
    .nav-burger { color: var(--color-ink); border: 1px solid rgba(11, 27, 38, 0.1); }

    .nav-dark .nav-pill {
      background: color-mix(in oklab, #0B1418 78%, transparent);
      border-color: rgba(255, 255, 255, 0.1);
    }
    .nav-dark .nav-link { color: rgba(255, 255, 255, 0.6); }
    .nav-dark .nav-link:hover,
    .nav-dark .nav-link.is-active { color: white; }
    .nav-dark .nav-link.is-active { background: rgba(255, 255, 255, 0.08); }
    .nav-dark .nav-cta { background: white; color: var(--color-ink); }
    .nav-dark .nav-cta:hover { background: var(--color-primary-light); }
    .nav-dark .nav-burger { color: white; border-color: rgba(255, 255, 255, 0.15); }
    :host ::ng-deep app-logo span { transition: color 300ms ease; }
    .nav-dark ::ng-deep app-logo span { color: white; }
  `],
})
export class NavComponent {
  readonly i18n = inject(I18nService);
  readonly links = LINKS;
  readonly scrolled = signal(false);
  readonly open = signal(false);
  readonly active = signal<string | null>(null);
  readonly dark = signal(false);

  /**
   * The current section is the last one whose top has passed a line just below
   * where anchor links land (scroll-padding-top: 88px).
   */
  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 12);
    let current: string | null = null;
    for (const el of Array.from(document.querySelectorAll<HTMLElement>('main [data-nav]'))) {
      if (el.getBoundingClientRect().top <= 100) current = el.id;
      else break;
    }
    this.active.set(LINKS.some((l) => l.id === current) ? current : null);
    this.dark.set(current !== null && DARK_SECTIONS.has(current));
  }
}
