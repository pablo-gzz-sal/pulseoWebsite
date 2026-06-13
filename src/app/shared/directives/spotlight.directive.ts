import { Directive, ElementRef, inject, NgZone, OnInit, OnDestroy } from '@angular/core';

/**
 * Tracks the pointer over the host and exposes it as --mx / --my CSS variables,
 * driving the .spotlight-card border illumination. Listener registered outside
 * Angular so pointermove never triggers change detection.
 */
@Directive({
  selector: '[appSpotlight]',
  standalone: true,
  host: { class: 'spotlight-card' },
})
export class SpotlightDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);
  private onMove = (e: PointerEvent) => {
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.el.nativeElement.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    this.el.nativeElement.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  ngOnInit() {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    this.zone.runOutsideAngular(() => {
      this.el.nativeElement.addEventListener('pointermove', this.onMove, { passive: true });
    });
  }

  ngOnDestroy() {
    this.el.nativeElement.removeEventListener('pointermove', this.onMove);
  }
}
