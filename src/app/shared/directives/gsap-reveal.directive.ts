import { Directive, ElementRef, Input, AfterViewInit, inject, NgZone } from '@angular/core';
import { GsapService } from '../../core/animation/gsap.service';

type RevealKind = 'fade-up' | 'fade-in' | 'scale' | 'fade-right' | 'fade-left';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class GsapRevealDirective implements AfterViewInit {
  @Input('appReveal') kind: RevealKind = 'fade-up';
  @Input() revealDelay = 0;
  @Input() revealStagger?: string;
  @Input() revealOnce = true;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapSvc = inject(GsapService);
  private readonly zone = inject(NgZone);

  ngAfterViewInit() {
    // Run after view is fully rendered
    this.zone.runOutsideAngular(() => {
      // Small rAF to let Angular finish rendering child @for blocks
      requestAnimationFrame(() => {
        this.setup();
      });
    });
  }

  private async setup() {
    const host = this.el.nativeElement as HTMLElement;
    const { gsap, ScrollTrigger } = await this.gsapSvc.load();
    const reduced = this.gsapSvc.prefersReducedMotion();

    const targets: Element[] = this.revealStagger
      ? Array.from(host.querySelectorAll(this.revealStagger))
      : [host];

    if (targets.length === 0) return;

    const fromVars = this.fromVars(reduced);

    // Set initial hidden state via GSAP (not CSS)
    gsap.set(targets, fromVars);

    const toVars = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration: reduced ? 0.3 : 0.85,
      ease: 'power3.out',
      delay: this.revealDelay,
      stagger: this.revealStagger && targets.length > 1 ? 0.09 : 0,
    };

    ScrollTrigger.create({
      trigger: host,
      start: 'top 88%',
      once: this.revealOnce,
      onEnter: () => {
        gsap.to(targets, toVars);
      },
    });

    // Refresh so ScrollTrigger knows the correct page layout after Angular renders
    ScrollTrigger.refresh();
  }

  private fromVars(reduced: boolean): object {
    if (reduced) return { opacity: 0 };
    switch (this.kind) {
      case 'fade-up':    return { opacity: 0, y: 28 };
      case 'fade-in':    return { opacity: 0 };
      case 'scale':      return { opacity: 0, scale: 0.94 };
      case 'fade-right': return { opacity: 0, x: -28 };
      case 'fade-left':  return { opacity: 0, x: 28 };
    }
  }
}
