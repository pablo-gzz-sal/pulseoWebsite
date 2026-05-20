import { Component, ElementRef, Input, OnInit, inject, NgZone } from '@angular/core';
import { GsapService } from '../../../core/animation/gsap.service';

@Component({
  selector: 'app-marquee',
  standalone: true,
  template: `
    <div #vp class="overflow-hidden w-full mask-fade py-1" style="-webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);">
      <div #track class="marquee-track">
        @for (it of doubled; track $index) {
          <span class="inline-flex items-center gap-2 text-[13px] font-medium text-ink-muted">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-primary/60"></span>
            {{ it }}
          </span>
        }
      </div>
    </div>
  `,
})
export class MarqueeComponent implements OnInit {
  @Input() items: string[] = [];
  @Input() speed = 30; // seconds per loop

  get doubled() {
    return [...this.items, ...this.items];
  }

  private readonly gsapSvc = inject(GsapService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly zone = inject(NgZone);

  async ngOnInit() {
    const { gsap } = await this.gsapSvc.load();
    if (this.gsapSvc.prefersReducedMotion()) return;

    this.zone.runOutsideAngular(() => {
      const track = this.host.nativeElement.querySelector('.marquee-track') as HTMLElement | null;
      if (!track) return;
      // Wait one frame for layout
      requestAnimationFrame(() => {
        const distance = track.scrollWidth / 2;
        gsap.to(track, {
          x: -distance,
          duration: this.speed,
          ease: 'none',
          repeat: -1,
        });
      });
    });
  }
}
