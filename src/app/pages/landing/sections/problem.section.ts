import { Component, ElementRef, OnInit, computed, inject, NgZone } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapService } from '../../../core/animation/gsap.service';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-problem-section',
  standalone: true,
  imports: [GsapRevealDirective],
  template: `
    <section id="problema" data-nav class="section section-y" aria-labelledby="problem-title">
      <div class="grid lg:grid-cols-[180px_1fr] gap-8 lg:gap-12">
        <div class="flex lg:flex-col gap-4 lg:gap-3 items-center lg:items-start">
          <span class="section-index"><b>01</b> / 05</span>
          <span class="eyebrow">{{ i18n.t('problem.eyebrow') }}</span>
        </div>

        <div>
          <h2 id="problem-title" class="sr-only">{{ i18n.t('problem.eyebrow') }}</h2>
          <ol class="border-t hairline">
            @for (line of lines(); track $index) {
              <li class="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1fr] items-baseline border-b hairline py-8 sm:py-10">
                <span class="text-[15px] font-medium tabular-nums text-primary-dark">0{{ $index + 1 }}</span>
                <p class="font-semibold text-ink tracking-[-0.045em] leading-[1.05]" style="font-size: clamp(1.9rem, 4.6vw, 3.75rem);">
                  @for (w of line; track $index) {
                    <span class="problem-word">{{ w }} </span>
                  }
                </p>
              </li>
            }
          </ol>

          <p class="lede mt-14 sm:mt-20 sm:ml-16 max-w-[36ch] !text-[clamp(20px,2vw,26px)] !leading-snug !text-ink" appReveal="fade-up">
            {{ i18n.t('problem.answer') }}
          </p>
        </div>
      </div>
    </section>
  `,
})
export class ProblemSection implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapSvc = inject(GsapService);
  private readonly zone = inject(NgZone);

  readonly lines = computed(() =>
    ['1', '2', '3'].map((k) => this.i18n.t('problem.line.' + k).split(' ')),
  );

  async ngOnInit() {
    const { gsap } = await this.gsapSvc.load();
    if (this.gsapSvc.prefersReducedMotion()) return;

    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        const root = this.el.nativeElement as HTMLElement;
        const heading = root.querySelector('ol');
        gsap.fromTo(
          root.querySelectorAll('.problem-word'),
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: { trigger: heading, start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        );
      });
    });
  }
}
