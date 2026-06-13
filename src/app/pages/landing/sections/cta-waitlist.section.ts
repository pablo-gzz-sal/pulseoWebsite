import { Component, ElementRef, OnInit, inject, NgZone } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapService } from '../../../core/animation/gsap.service';
import { WaitlistFormComponent } from '../../../shared/components/waitlist-form/waitlist-form.component';

@Component({
  selector: 'app-cta-waitlist-section',
  standalone: true,
  imports: [WaitlistFormComponent],
  template: `
    <section id="waitlist" class="section section-y">
      <div id="cta-card" class="relative overflow-hidden rounded-[32px] p-8 py-14 sm:p-16 sm:py-20 text-center"
        style="background:
          radial-gradient(900px 460px at 15% 0%, rgba(34,211,238,0.22), transparent 60%),
          radial-gradient(900px 460px at 95% 100%, rgba(52,211,153,0.16), transparent 60%),
          linear-gradient(165deg, #0A2E3C 0%, #07242F 100%);
          border: 1px solid rgba(34,211,238,0.18);
          box-shadow: 0 40px 90px -40px rgba(7,36,47,0.55), inset 0 1px 0 rgba(255,255,255,0.08);">
        <span class="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300/90">
          <span class="w-[18px] h-px bg-cyan-300/70" aria-hidden="true"></span>
          {{ i18n.t('cta.eyebrow') }}
          <span class="w-[18px] h-px bg-cyan-300/70" aria-hidden="true"></span>
        </span>
        <h2 class="h2 mt-5 mx-auto text-white" style="max-width: 16ch;">{{ i18n.t('cta.h2') }}</h2>

        <div class="mt-9 flex flex-col items-center" style="--color-ink-soft: #9FC2CE; --color-bg: #07242F;">
          <app-waitlist-form />
        </div>

        <div class="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[12px] text-cyan-100/60">
          <span class="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
            {{ i18n.isES() ? 'Sin spam' : 'No spam' }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            {{ i18n.isES() ? 'Aviso al lanzamiento' : 'Launch notice' }}
          </span>
          <span class="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12c0 5-4 9-10 9s-10-4-10-9 4-9 10-9 10 4 10 9z"/><path d="M9 12l2 2 4-4"/></svg>
            {{ i18n.isES() ? 'Cancela cuando quieras' : 'Unsubscribe anytime' }}
          </span>
        </div>
      </div>
    </section>
  `,
})
export class CtaWaitlistSection implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapSvc = inject(GsapService);
  private readonly zone = inject(NgZone);

  async ngOnInit() {
    const { gsap, ScrollTrigger } = await this.gsapSvc.load();
    if (this.gsapSvc.prefersReducedMotion()) return;

    this.zone.runOutsideAngular(() => {
      const root = this.el.nativeElement;
      const card = root.querySelector('#cta-card');
      if (!card) return;
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    });
  }
}
