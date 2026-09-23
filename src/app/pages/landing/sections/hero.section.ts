import { Component, ElementRef, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapService } from '../../../core/animation/gsap.service';
import { PhoneMockupComponent } from '../../../shared/components/phone-mockup/phone-mockup.component';
import { ScreenProfilesComponent } from '../../../shared/components/screens/screen-profiles.component';

interface FloatCard {
  key: 'dose' | 'ai' | 'vax' | 'ice';
  /** Position around the phone (Tailwind classes). */
  pos: string;
  /** Resting depth in px; also scales the mouse parallax. */
  depth: number;
  icon: string;
  tint: string;
  color: string;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [PhoneMockupComponent, ScreenProfilesComponent],
  template: `
    <section id="top" data-nav class="relative">
      <!-- ── Intro copy ── -->
      <div class="section flex flex-col items-center text-center pt-40 sm:pt-48 pb-16 sm:pb-20">
        <h1 class="h-display text-ink">
          <span class="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <span class="hero-line block">{{ i18n.t('hero.h1a') }}</span>
          </span>
          <span class="block overflow-hidden pb-[0.1em]">
            <span class="hero-line block accent">{{ i18n.t('hero.h1b') }}</span>
          </span>
        </h1>

        <p class="hero-fade lede mt-8 max-w-[44ch]">{{ i18n.t('hero.sub') }}</p>

        <div class="hero-fade mt-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a href="#waitlist" class="btn btn-primary w-full sm:w-auto">
            {{ i18n.t('hero.cta.primary') }}
            <svg viewBox="0 0 24 24" class="btn-arrow w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.25"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
          <a href="#como-funciona" class="btn btn-ghost w-full sm:w-auto">{{ i18n.t('hero.cta.secondary') }}</a>
        </div>

        <ul class="hero-fade mt-8 flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-[14px] text-ink-soft">
          @for (k of ['1', '2', '3']; track k; let last = $last) {
            <li class="inline-flex items-center gap-2.5">
              {{ i18n.t('hero.proof.' + k) }}
              @if (!last) { <span aria-hidden="true" class="opacity-40">·</span> }
            </li>
          }
        </ul>
      </div>

      <!-- ── Showcase: rounded card that opens to full-bleed while the phone untilts ── -->
      <div id="app" data-nav class="showcase relative lg:h-[100dvh]">
        <div class="showcase-card relative h-full overflow-hidden text-white">
          <!-- Background: brand glow + faint rings -->
          <div aria-hidden="true" class="absolute inset-0"
               style="background:
                 radial-gradient(60% 55% at 50% 42%, rgba(34,211,238,0.55) 0%, rgba(8,145,178,0.35) 30%, transparent 70%),
                 linear-gradient(180deg, #0B4F63 0%, #07242F 100%);"></div>
          <div aria-hidden="true" class="absolute inset-0 opacity-[0.16]"
               style="background: repeating-radial-gradient(circle at 50% 42%, transparent 0 88px, rgba(255,255,255,0.5) 88px 89px);
                      mask-image: radial-gradient(55% 55% at 50% 42%, black 20%, transparent 75%);
                      -webkit-mask-image: radial-gradient(55% 55% at 50% 42%, black 20%, transparent 75%);"></div>

          <span class="show-cue hidden lg:inline-flex absolute top-7 left-1/2 -translate-x-1/2 items-center gap-2 text-[13px] text-white/60 z-10">
            {{ i18n.t('hero.scroll') }}
            <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>
          </span>

          <div class="relative h-full flex flex-col lg:block">
            <!-- Caption -->
            <div class="show-caption relative z-20 px-6 pt-14 sm:px-10 lg:px-0 lg:pt-0 lg:absolute lg:left-12 lg:right-12 lg:bottom-12
                        flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <h2 class="h2 text-white max-w-[13ch]">
                {{ i18n.t('show.title.a') }}
                <span class="block text-primary-light">{{ i18n.t('show.title.b') }}</span>
              </h2>
              <p class="text-[16px] leading-relaxed text-white/70 max-w-[34ch] lg:text-right">{{ i18n.t('show.body') }}</p>
            </div>

            <!-- 3D stage -->
            <div class="show-stage relative flex-1 grid place-items-center py-14 lg:py-0 lg:absolute lg:inset-0 lg:-translate-y-8"
                 style="perspective: 1600px;">
              <div class="show-rig relative" style="transform-style: preserve-3d; width: clamp(210px, 16.5vw, 250px);">
                <div class="show-tilt relative" style="transform-style: preserve-3d;">
                  <app-phone-mockup class="block" width="100%">
                    <app-screen-profiles />
                  </app-phone-mockup>

                  @for (c of cards; track c.key) {
                    <div class="show-float absolute items-center gap-3 pl-2.5 pr-4 py-2.5 rounded-2xl bg-white text-ink whitespace-nowrap {{ c.pos }}"
                         [attr.data-depth]="c.depth"
                         style="box-shadow: 0 24px 48px -18px rgba(3,20,28,0.55), 0 2px 6px rgba(3,20,28,0.08);">
                      <span class="grid place-items-center w-9 h-9 rounded-xl shrink-0" [style.background]="c.tint" [style.color]="c.color">
                        <svg viewBox="0 0 24 24" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" stroke-width="2.2"
                             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="c.icon"/></svg>
                      </span>
                      <span class="flex flex-col">
                        <span class="text-[13px] font-semibold leading-tight tracking-tight">{{ i18n.t('show.card.' + c.key + '.title') }}</span>
                        <span class="text-[12px] text-ink-soft leading-tight mt-0.5">{{ i18n.t('show.card.' + c.key + '.meta') }}</span>
                      </span>
                    </div>
                  }

                  <!-- Stat card -->
                  <div class="show-float absolute hidden md:block top-[44%] -left-[62%] w-[168px] rounded-2xl bg-white text-ink p-4"
                       data-depth="140"
                       style="box-shadow: 0 24px 48px -18px rgba(3,20,28,0.55), 0 2px 6px rgba(3,20,28,0.08);">
                    <span class="block text-[12px] text-ink-soft">{{ i18n.t('show.card.stat.label') }}</span>
                    <span class="block mt-1 text-[34px] font-semibold tracking-[-0.04em] leading-none tabular-nums">94%</span>
                    <span class="mt-3 flex items-end gap-[3px] h-7" aria-hidden="true">
                      @for (h of bars; track $index) {
                        <span class="flex-1 rounded-[2px]" [style.height.%]="h" [style.background]="h > 85 ? '#059669' : '#A7F3D0'"></span>
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .showcase-card {
      clip-path: inset(0 clamp(12px, 3vw, 48px) 0 round 32px);
    }
  `],
})
export class HeroSection implements OnInit, OnDestroy {
  readonly i18n = inject(I18nService);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapSvc = inject(GsapService);
  private readonly zone = inject(NgZone);

  private mm: { revert: () => void } | null = null;

  readonly bars = [62, 80, 74, 92, 88, 96, 90, 98, 94];

  readonly cards: FloatCard[] = [
    {
      key: 'dose', pos: 'flex top-[9%] -left-[20%] md:-left-[70%]', depth: 120,
      icon: 'M5 12l5 5L20 7', tint: 'rgba(5,150,105,0.12)', color: '#047857',
    },
    {
      key: 'ai', pos: 'flex top-[24%] -right-[22%] md:-right-[78%]', depth: 180,
      icon: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7z',
      tint: 'rgba(8,145,178,0.12)', color: '#0E7490',
    },
    {
      key: 'vax', pos: 'hidden md:flex top-[56%] -right-[70%]', depth: 90,
      icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2', tint: 'rgba(245,158,11,0.14)', color: '#B45309',
    },
    {
      key: 'ice', pos: 'hidden md:flex bottom-[7%] -left-[56%]', depth: 160,
      icon: 'M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z',
      tint: 'rgba(220,38,38,0.10)', color: '#B91C1C',
    },
  ];

  async ngOnInit() {
    const { gsap, ScrollTrigger } = await this.gsapSvc.load();

    this.zone.runOutsideAngular(() => {
      const root = this.el.nativeElement as HTMLElement;
      const $ = (sel: string) => root.querySelector(sel) as HTMLElement;
      const showcase = $('.showcase');
      const card = $('.showcase-card');
      const rig = $('.show-rig');
      const tilt = $('.show-tilt');
      const caption = $('.show-caption');
      const cue = $('.show-cue');
      const floats = Array.from(root.querySelectorAll<HTMLElement>('.show-float'));

      this.mm = gsap.matchMedia();
      const mm = this.mm as ReturnType<typeof gsap.matchMedia>;

      // Intro copy: lines rise out of their masks.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.timeline({ defaults: { ease: 'power4.out' } })
          .from(root.querySelectorAll('.hero-line'), { yPercent: 110, duration: 1.1, stagger: 0.12 })
          .from(root.querySelectorAll('.hero-fade'), { y: 16, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.35)
          .from(card, { y: 80, opacity: 0, duration: 1.2 }, 0.45);
      });

      // Desktop: pin the showcase and scrub the reveal.
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: showcase, start: 'top top', end: '+=160%', pin: true, scrub: 0.8 },
        });

        tl.fromTo(card,
            { clipPath: 'inset(0% 6% 12% 6% round 40px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1 }, 0)
          .fromTo(rig,
            { rotationX: 38, rotationY: 14, rotationZ: -10, scale: 0.78, y: 40 },
            { rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1, y: 0, duration: 1.1, ease: 'power1.inOut' }, 0)
          .to(cue, { opacity: 0, duration: 0.2 }, 0);

        floats.forEach((f, i) => {
          const depth = Number(f.dataset['depth'] ?? 100);
          tl.fromTo(f,
            { opacity: 0, z: -260, scale: 0.6 },
            { opacity: 1, z: depth, scale: 1, duration: 0.55, ease: 'power2.out' }, 0.45 + i * 0.1);
        });

        tl.fromTo(caption, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.95)
          .to({}, { duration: 0.35 }); // hold the final frame before releasing the pin

        // Mouse: gentle tilt on the phone, depth parallax on the floating cards.
        const tiltX = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: 'power3' });
        const tiltY = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: 'power3' });
        const moves = floats.map((f) => ({
          depth: Number(f.dataset['depth'] ?? 100),
          x: gsap.quickTo(f, 'x', { duration: 1.1, ease: 'power3' }),
          y: gsap.quickTo(f, 'y', { duration: 1.1, ease: 'power3' }),
        }));
        const onMove = (e: PointerEvent) => {
          const r = showcase.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          tiltY(nx * 12);
          tiltX(ny * -8);
          for (const m of moves) {
            m.x(nx * m.depth * 0.25);
            m.y(ny * m.depth * 0.18);
          }
        };
        showcase.addEventListener('pointermove', onMove);
        return () => showcase.removeEventListener('pointermove', onMove);
      });

      // Smaller screens: no pin, the phone straightens as the card scrolls in.
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(rig,
          { rotationX: 24, rotationZ: -6, scale: 0.9 },
          { rotationX: 0, rotationZ: 0, scale: 1, ease: 'none',
            scrollTrigger: { trigger: showcase, start: 'top 90%', end: 'center 55%', scrub: true } });
        floats.forEach((f, i) => {
          gsap.from(f, {
            opacity: 0, y: 30, scale: 0.9, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: rig, start: 'top 75%', once: true },
          });
        });
      });

      ScrollTrigger.refresh();
    });
  }

  ngOnDestroy() {
    this.mm?.revert();
  }
}
