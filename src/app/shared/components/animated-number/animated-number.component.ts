import { Component, ElementRef, Input, OnInit, inject, NgZone } from '@angular/core';
import { GsapService } from '../../../core/animation/gsap.service';

@Component({
  selector: 'app-animated-number',
  standalone: true,
  template: `<span class="tabular-nums">{{ display }}{{ suffix }}</span>`,
})
export class AnimatedNumberComponent implements OnInit {
  @Input() target = 100;
  @Input() suffix = '';
  @Input() duration = 1.6;

  display = 0;

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapSvc = inject(GsapService);
  private readonly zone = inject(NgZone);

  async ngOnInit() {
    const { gsap, ScrollTrigger } = await this.gsapSvc.load();
    const reduced = this.gsapSvc.prefersReducedMotion();

    if (reduced) {
      this.display = this.target;
      return;
    }

    this.zone.runOutsideAngular(() => {
      const obj = { n: 0 };
      ScrollTrigger.create({
        trigger: this.el.nativeElement,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            n: this.target,
            duration: this.duration,
            ease: 'power2.out',
            snap: { n: 1 },
            onUpdate: () => {
              this.zone.run(() => (this.display = Math.round(obj.n)));
            },
          });
        },
      });
    });
  }
}
