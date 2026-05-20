import { Component, ElementRef, OnInit, inject, NgZone } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapService } from '../../../core/animation/gsap.service';
import { PhoneMockupComponent } from '../../../shared/components/phone-mockup/phone-mockup.component';
import { ScreenAiNotesComponent } from '../../../shared/components/screens/screen-ai-notes.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [PhoneMockupComponent, ScreenAiNotesComponent],
  template: `
    <section id="top" class="relative min-h-[100dvh] flex flex-col overflow-hidden">

      <!-- ── Layered background ── -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
        <!-- Large teal arc — bottom right, gives the hero mass and direction -->
        <div class="absolute -bottom-[280px] -right-[220px] w-[900px] h-[900px] rounded-full"
             style="background: radial-gradient(closest-side, rgba(8,145,178,0.20) 0%, rgba(34,211,238,0.06) 55%, transparent 100%);"></div>
        <!-- Soft green accent — top left, creates visual depth -->
        <div class="absolute -top-[400px] -left-[240px] w-[900px] h-[900px] rounded-full"
             style="background: radial-gradient(closest-side, rgba(52,211,153,0.13) 0%, transparent 62%);"></div>
        <!-- Warm amber hint — bottom left, adds warmth -->
        <div class="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] rounded-full"
             style="background: radial-gradient(closest-side, rgba(245,158,11,0.06) 0%, transparent 70%);"></div>
        <!-- Diagonal structural line, top -->
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <!-- Fade out to next section -->
        <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#F0F9FF] via-[#F0F9FF]/60 to-transparent"></div>
      </div>

      <!-- ── Grid ── -->
      <div class="section flex-1 flex flex-col justify-center pt-28 pb-20 md:pt-32 md:pb-24">
        <div class="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 xl:gap-16 items-center">

          <!-- ── Left: copy ── -->
          <div class="flex flex-col gap-7">

            <!-- Eyebrow badge with live dot -->
            <div class="hero-eyebrow inline-flex items-center gap-2.5 self-start
                        px-4 py-1.5 rounded-full
                        border border-primary/20 bg-white/80
                        backdrop-blur-sm">
              <span class="relative flex h-2 w-2 flex-shrink-0">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-70"></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-secondary"></span>
              </span>
              <span class="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary-dark">
                {{ i18n.t('hero.eyebrow') }}
              </span>
            </div>

            <!-- Headline — editorial scale, max visual impact -->
            <h1 class="hero-headline font-bold leading-[1.0] tracking-[-0.038em] text-ink"
                style="font-family: var(--font-display);
                       font-size: clamp(2.8rem, 6.5vw, 5.2rem);
                       max-width: 14ch;">
              {{ i18n.t('hero.h1') }}
            </h1>

            <!-- Sub — comfortable reading width -->
            <p class="hero-sub text-[17px] sm:text-[18px] leading-[1.72] text-ink-muted"
               style="max-width: 48ch;">
              {{ i18n.t('hero.sub') }}
            </p>

            <!-- CTA row — button-in-button trailing icon pattern -->
            <div class="hero-ctas flex flex-wrap items-center gap-3 pt-1">
              <a href="#waitlist"
                 class="btn btn-primary gap-3 group active:scale-[0.97]"
                 style="transition: transform 180ms cubic-bezier(0.32,0.72,0,1),
                                    box-shadow 180ms cubic-bezier(0.32,0.72,0,1),
                                    background 180ms cubic-bezier(0.32,0.72,0,1);">
                {{ i18n.t('hero.cta.primary') }}
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20
                             group-hover:translate-x-0.5 group-hover:bg-white/30
                             transition-all duration-200">
                  <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none"
                       stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
              <a href="#features"
                 class="btn btn-ghost gap-2.5 group active:scale-[0.97]"
                 style="transition: transform 180ms cubic-bezier(0.32,0.72,0,1),
                                    background 180ms cubic-bezier(0.32,0.72,0,1),
                                    border-color 180ms cubic-bezier(0.32,0.72,0,1);">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10
                             group-hover:bg-primary/18 group-hover:scale-105 transition-all duration-200">
                  <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 text-primary" fill="none"
                       stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>
                  </svg>
                </span>
                {{ i18n.t('hero.cta.secondary') }}
              </a>
            </div>

            <!-- Trust badges -->
            <div class="hero-trust flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-1">
              <div class="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none"
                     stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l10 4v6c0 5.5-4.2 10.7-10 12C6.2 22.7 2 17.5 2 12V6z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <span class="text-[12px] font-medium text-ink-muted">
                  {{ i18n.isES() ? 'Cifrado E2E' : 'E2E encrypted' }}
                </span>
              </div>
              <span class="w-px h-3 bg-slate-300 hidden sm:block" aria-hidden="true"></span>
              <div class="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 text-secondary flex-shrink-0" fill="none"
                     stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span class="text-[12px] font-medium text-ink-muted">
                  {{ i18n.isES() ? 'Sin venta de datos' : 'No data sold' }}
                </span>
              </div>
              <span class="w-px h-3 bg-slate-300 hidden sm:block" aria-hidden="true"></span>
              <div class="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 text-primary flex-shrink-0" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>
                </svg>
                <span class="text-[12px] font-medium text-ink-muted">
                  {{ i18n.isES() ? 'Hecho en México' : 'Made in Mexico' }}
                </span>
              </div>
            </div>
          </div>

          <!-- ── Right: phone constellation ── -->
          <div class="hero-right-col relative flex justify-center lg:justify-end items-center
                      order-2 min-h-[420px] lg:min-h-0">

            <!-- Ambient radial glow sitting behind the phone -->
            <div class="absolute w-[440px] h-[440px] rounded-full -z-10"
                 style="background: radial-gradient(closest-side, rgba(8,145,178,0.18), transparent);
                        left: 50%; top: 50%; transform: translate(-50%,-50%);"></div>

            <!-- Phone — 3D-tilt wrapper (rotation applied here via GSAP on desktop) -->
            <div class="hero-phone-3d relative">
              <app-phone-mockup width="clamp(230px, 28vw, 350px)">
                <app-screen-ai-notes />
              </app-phone-mockup>
            </div>

            <!-- ── Floating notification cards ── -->

            <!-- Card 1: dose confirmed — upper-left of phone -->
            <div class="hero-card-1 hidden md:flex absolute top-[8%] -left-4 lg:-left-16
                        items-center gap-2.5 px-3.5 py-2.5 rounded-2xl
                        bg-white border border-slate-100/90"
                 style="box-shadow: 0 18px 44px -12px rgba(8,145,178,0.26),
                                    0 4px 12px -4px rgba(15,23,42,0.07);">
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl"
                    style="background: rgba(5,150,105,0.10);">
                <svg viewBox="0 0 24 24" class="w-4 h-4 text-secondary" fill="none"
                     stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
              </span>
              <div>
                <p class="text-[11px] font-bold text-ink leading-snug">
                  {{ i18n.isES() ? 'Dosis confirmada' : 'Dose confirmed' }}
                </p>
                <p class="text-[10px] text-ink-soft mt-0.5">Losartán 50mg · 08:00</p>
              </div>
            </div>

            <!-- Card 2: AI note — upper-right of phone -->
            <div class="hero-card-2 hidden md:flex absolute top-[22%] -right-2 lg:-right-14
                        items-center gap-2.5 px-3.5 py-2.5 rounded-2xl
                        bg-white border border-slate-100/90"
                 style="box-shadow: 0 18px 44px -12px rgba(8,145,178,0.26),
                                    0 4px 12px -4px rgba(15,23,42,0.07);">
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl"
                    style="background: rgba(8,145,178,0.10);">
                <!-- Sparkle / AI icon -->
                <svg viewBox="0 0 24 24" class="w-4 h-4 text-primary" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5z"/>
                  <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8z"/>
                </svg>
              </span>
              <div>
                <p class="text-[11px] font-bold text-ink leading-snug">
                  {{ i18n.isES() ? 'IA detectó síntoma' : 'AI found a symptom' }}
                </p>
                <p class="text-[10px] text-ink-soft mt-0.5">
                  {{ i18n.isES() ? 'Mamá · dolor de cabeza' : 'Mom · headache' }}
                </p>
              </div>
            </div>

            <!-- Card 3: vaccine reminder — lower-left of phone -->
            <div class="hero-card-3 hidden md:flex absolute bottom-[26%] -left-2 lg:-left-12
                        items-center gap-2.5 px-3.5 py-2.5 rounded-2xl
                        bg-white border border-slate-100/90"
                 style="box-shadow: 0 18px 44px -12px rgba(8,145,178,0.26),
                                    0 4px 12px -4px rgba(15,23,42,0.07);">
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl"
                    style="background: rgba(245,158,11,0.10);">
                <svg viewBox="0 0 24 24" class="w-4 h-4" style="color:#D97706;" fill="none"
                     stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
                </svg>
              </span>
              <div>
                <p class="text-[11px] font-bold text-ink leading-snug">
                  {{ i18n.isES() ? 'Vacuna en 3 días' : 'Vaccine in 3 days' }}
                </p>
                <p class="text-[10px] text-ink-soft mt-0.5">Influenza · Sofía</p>
              </div>
            </div>

            <!-- Card 4: streak — lower-right (lg+ only) -->
            <div class="hero-card-4 hidden lg:flex absolute bottom-[10%] -right-2 lg:-right-10
                        items-center gap-2.5 px-3.5 py-2.5 rounded-2xl
                        bg-white border border-slate-100/90"
                 style="box-shadow: 0 18px 44px -12px rgba(8,145,178,0.26),
                                    0 4px 12px -4px rgba(15,23,42,0.07);">
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl"
                    style="background: rgba(8,145,178,0.10);">
                <svg viewBox="0 0 24 24" class="w-4 h-4 text-primary" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </span>
              <div>
                <p class="text-[11px] font-bold text-ink leading-snug">
                  30 {{ i18n.isES() ? 'días de racha' : 'day streak' }}
                </p>
                <p class="text-[10px] text-ink-soft mt-0.5">
                  {{ i18n.isES() ? 'Adherencia perfecta' : 'Perfect adherence' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Scroll cue ── -->
      <div class="hero-scroll-cue absolute bottom-7 left-1/2 -translate-x-1/2
                  flex flex-col items-center gap-2" style="opacity:0;">
        <span class="text-[10px] font-semibold tracking-[0.22em] uppercase text-ink-soft">
          {{ i18n.isES() ? 'Explorar' : 'Explore' }}
        </span>
        <div class="relative w-[2px] h-10 rounded-full overflow-hidden bg-slate-200">
          <div class="scroll-line absolute inset-x-0 top-0 h-5 rounded-full bg-primary/70"></div>
        </div>
      </div>
    </section>
  `,
})
export class HeroSection implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapSvc = inject(GsapService);
  private readonly zone = inject(NgZone);

  async ngOnInit() {
    const { gsap, ScrollTrigger } = await this.gsapSvc.load();
    const reduced = this.gsapSvc.prefersReducedMotion();

    this.zone.runOutsideAngular(() => {
      const root = this.el.nativeElement as HTMLElement;
      const q = (sel: string) => root.querySelector(sel);

      const eyebrow   = q('.hero-eyebrow');
      const headline  = q('.hero-headline');
      const sub       = q('.hero-sub');
      const ctas      = q('.hero-ctas');
      const trust     = q('.hero-trust');
      const rightCol  = q('.hero-right-col') as HTMLElement | null;
      const phone3d   = q('.hero-phone-3d') as HTMLElement | null;
      const card1     = q('.hero-card-1');
      const card2     = q('.hero-card-2');
      const card3     = q('.hero-card-3');
      const card4     = q('.hero-card-4');
      const scrollCue = q('.hero-scroll-cue');
      const scrollLine = q('.scroll-line');

      // ── Reduced-motion: set everything to final state immediately ──
      if (reduced) {
        gsap.set(
          [eyebrow, headline, sub, ctas, trust, rightCol, card1, card2, card3, card4, scrollCue],
          { opacity: 1, y: 0, x: 0 }
        );
        return;
      }

      const isDesktop = window.innerWidth >= 1024;

      // ── 3D tilt on phone (desktop only) ──
      if (phone3d && isDesktop) {
        gsap.set(phone3d, {
          transformPerspective: 1100,
          rotationY: -14,
          rotationX: 3,
        });

        // De-tilt as user scrolls — the phone "straightens" toward the viewer
        gsap.to(phone3d, {
          rotationY: 0,
          rotationX: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      }

      // ── Parallax: whole constellation drifts up gently on scroll ──
      if (rightCol) {
        gsap.to(rightCol, {
          yPercent: 9,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // ── Entrance timeline ──
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Left column — cascade down
      tl.from(eyebrow,  { y: 22, opacity: 0, duration: 0.65 })
        .from(headline, { y: 44, opacity: 0, duration: 1.0, ease: 'power4.out' }, '-=0.40')
        .from(sub,      { y: 26, opacity: 0, duration: 0.75 }, '-=0.60')
        .from(ctas,     { y: 20, opacity: 0, duration: 0.60 }, '-=0.55')
        .from(trust,    { y: 16, opacity: 0, duration: 0.50 }, '-=0.48');

      // Right column — rises from below
      tl.from(rightCol, { y: 72, opacity: 0, duration: 1.15, ease: 'power4.out' }, 0.18);

      // Cards pop in from their respective edges with a tiny overshoot
      if (card1) tl.from(card1, { x: -32, opacity: 0, duration: 0.70, ease: 'back.out(1.2)' }, 0.72);
      if (card2) tl.from(card2, { x:  32, opacity: 0, duration: 0.70, ease: 'back.out(1.2)' }, 0.88);
      if (card3) tl.from(card3, { x: -26, opacity: 0, duration: 0.70, ease: 'back.out(1.2)' }, 1.04);
      if (card4) tl.from(card4, { x:  26, opacity: 0, duration: 0.70, ease: 'back.out(1.2)' }, 1.20);

      // Scroll cue fades in last
      tl.to(scrollCue, { opacity: 1, y: 0, duration: 0.55 }, 1.40);

      // ── Continuous floating — each card at a different rhythm ──
      const floatTargets = [card1, card2, card3, card4].filter(Boolean) as Element[];
      floatTargets.forEach((card, i) => {
        gsap.to(card, {
          y: `random(-6, 6)`,
          x: `random(-2, 2)`,
          duration: 2.8 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.7,
        });
      });

      // ── Scroll line drip animation ──
      if (scrollLine) {
        gsap.to(scrollLine, {
          y: 20,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: 1.6,
        });
      }
    });
  }
}
