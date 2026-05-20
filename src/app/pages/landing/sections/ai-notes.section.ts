import { Component, ElementRef, OnInit, inject, NgZone } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapService } from '../../../core/animation/gsap.service';
import { PhoneMockupComponent } from '../../../shared/components/phone-mockup/phone-mockup.component';
import { ScreenAiNotesComponent } from '../../../shared/components/screens/screen-ai-notes.component';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';

@Component({
  selector: 'app-ai-notes-section',
  standalone: true,
  imports: [PhoneMockupComponent, ScreenAiNotesComponent, SectionHeaderComponent],
  template: `
    <section id="ai" class="section section-y">
      <div class="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
        <div class="flex flex-col gap-8 order-2 lg:order-1">
          <app-section-header
            [eyebrow]="i18n.t('ai.eyebrow')"
            [title]="i18n.t('ai.h2')"
            [lede]="i18n.t('ai.sub')"
          />

          <ol class="flex flex-col gap-5 mt-2">
            @for (s of steps; track s.n; let i = $index) {
              <li class="ai-step flex items-start gap-4">
                <span class="grid place-items-center w-9 h-9 rounded-full bg-primary text-white font-bold text-[14px] shrink-0">{{ s.n }}</span>
                <div class="flex flex-col gap-1">
                  <h3 class="text-[17px] font-semibold tracking-tight" style="font-family: var(--font-display);">{{ i18n.t('ai.step.' + s.n + '.title') }}</h3>
                  <p class="text-[15px] text-ink-muted leading-relaxed">{{ i18n.t('ai.step.' + s.n + '.body') }}</p>
                </div>
              </li>
            }
          </ol>
        </div>

        <div class="order-1 lg:order-2 relative flex justify-center">
          <div class="absolute -inset-8 -z-10 rounded-[40%] opacity-70"
            style="background: radial-gradient(closest-side, rgba(34,211,238,0.25), transparent 70%);"></div>
          <app-phone-mockup width="clamp(260px, 30vw, 320px)">
            <app-screen-ai-notes />
          </app-phone-mockup>
        </div>
      </div>
    </section>
  `,
})
export class AiNotesSection implements OnInit {
  readonly i18n = inject(I18nService);
  steps = [{ n: 1 }, { n: 2 }, { n: 3 }];

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapSvc = inject(GsapService);
  private readonly zone = inject(NgZone);

  async ngOnInit() {
    const { gsap, ScrollTrigger } = await this.gsapSvc.load();
    const reduced = this.gsapSvc.prefersReducedMotion();

    this.zone.runOutsideAngular(() => {
      const root = this.el.nativeElement;
      const steps = root.querySelectorAll('.ai-step');
      if (reduced) {
        gsap.set(steps, { opacity: 1, x: 0 });
        return;
      }
      gsap.from(steps, {
        x: -24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      });
    });
  }
}
