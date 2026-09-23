import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <a href="#top" (click)="$event.preventDefault(); scrollToTop()" class="inline-flex items-center gap-2.5 group" aria-label="Pulseo">
      <img src="/assets/images/icon.png" alt="" class="w-8 h-8 md:w-9 md:h-9 rounded-lg" />
      <span class="text-[17px] font-bold tracking-tight text-ink font-[var(--font-display)]" [style.letterSpacing]="'-0.02em'">
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
