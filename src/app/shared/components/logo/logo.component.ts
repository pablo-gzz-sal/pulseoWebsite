import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <a href="#top" (click)="$event.preventDefault(); scrollToTop()" class="inline-flex items-center gap-2.5 group" aria-label="Pulseo">
      <img src="/assets/images/icon.png" alt="Pulseo Logo" class="w-12 h-12 rounded-md group-hover:animate-pulse" />
      <span class="text-[18px] font-bold tracking-tight text-ink font-[var(--font-display)]" [style.letterSpacing]="'-0.02em'">
        Pulseo
      </span>
    </a>
  `,
})
export class LogoComponent {
  @Input() size: 'sm' | 'md' = 'md';

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
