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
      <div id="cta-card" class="relative overflow-hidden rounded-[28px] p-8 sm:p-14 text-center"
        style="background:
          radial-gradient(800px 400px at 20% 10%, rgba(34,211,238,0.30), transparent 60%),
          radial-gradient(800px 400px at 90% 90%, rgba(5,150,105,0.25), transparent 60%),
          linear-gradient(180deg, #ECFEFF 0%, #F0F9FF 100%);
          border: 1px solid rgba(8,145,178,0.15);">
        <span class="eyebrow justify-center inline-flex">{{ i18n.t('cta.eyebrow') }}</span>
        <h2 class="h2 mt-4 mx-auto" style="max-width: 16ch;">{{ i18n.t('cta.h2') }}</h2>

        <div class="mt-8 flex flex-col items-center">
          <app-waitlist-form />
        </div>

        <div class="mt-10 flex items-center justify-center gap-6 text-[12px] text-ink-soft">
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
      gsap.from(root.querySelector('#card'), {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });
    });
  }
}
