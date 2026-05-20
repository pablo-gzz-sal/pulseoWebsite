import { Component, ElementRef, OnInit, inject, NgZone } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapService } from '../../../core/animation/gsap.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { PhoneMockupComponent } from '../../../shared/components/phone-mockup/phone-mockup.component';
import { ScreenEmergencyComponent } from '../../../shared/components/screens/screen-emergency.component';

@Component({
  selector: 'app-emergency-section',
  standalone: true,
  imports: [SectionHeaderComponent, PhoneMockupComponent, ScreenEmergencyComponent],
  template: `
    <section class="section section-y">
      <div class="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
        <div class="flex flex-col gap-8">
          <app-section-header
            [eyebrow]="i18n.t('emergency.eyebrow')"
            [title]="i18n.t('emergency.h2')"
            [lede]="i18n.t('emergency.sub')"
          />
          <ul class="flex flex-col gap-3 emr-list">
            @for (k of ['1','2','3']; track k) {
              <li class="emr-bullet flex items-start gap-3 text-[15px]">
                <span class="mt-1 grid place-items-center w-5 h-5 rounded-full bg-danger/12 text-danger shrink-0">
                  <svg viewBox="0 0 24 24" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                </span>{{ i18n.t('emergency.feature.' + k) }}
              </li>
            }
          </ul>
        </div>

        <div #wrap class="flex justify-center" style="perspective: 1200px;">
          <div #card style="transform-origin: center;">
            <app-phone-mockup width="clamp(250px, 28vw, 310px)">
              <app-screen-emergency />
            </app-phone-mockup>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class EmergencySection implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapSvc = inject(GsapService);
  private readonly zone = inject(NgZone);

  async ngOnInit() {
    const { gsap, ScrollTrigger } = await this.gsapSvc.load();
    const reduced = this.gsapSvc.prefersReducedMotion();

    this.zone.runOutsideAngular(() => {
      const root = this.el.nativeElement;
      const card = root.querySelector('#card') ?? root.querySelector('app-phone-mockup');
      if (reduced) return;
      gsap.from(card, {
        rotateY: -22,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      });
    });
  }
}
