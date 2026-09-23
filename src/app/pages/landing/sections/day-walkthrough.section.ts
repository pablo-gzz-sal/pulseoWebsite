import { Component, ElementRef, NgZone, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { GsapService } from '../../../core/animation/gsap.service';
import { PhoneMockupComponent } from '../../../shared/components/phone-mockup/phone-mockup.component';
import { ScreenAiNotesComponent } from '../../../shared/components/screens/screen-ai-notes.component';
import { ScreenMedsComponent } from '../../../shared/components/screens/screen-meds.component';
import { ScreenVaccinesComponent } from '../../../shared/components/screens/screen-vaccines.component';
import { ScreenEmergencyComponent } from '../../../shared/components/screens/screen-emergency.component';

type ScrollTriggerInstance = { start: number; end: number; kill: () => void };

@Component({
  selector: 'app-day-walkthrough-section',
  standalone: true,
  // The anchor lives on the host, outside the pinned element, so "#como-funciona"
  // always lands on step 1 instead of wherever the pin was left.
  host: { id: 'como-funciona', class: 'block', 'data-nav': '' },
  imports: [
    PhoneMockupComponent,
    ScreenAiNotesComponent,
    ScreenMedsComponent,
    ScreenVaccinesComponent,
    ScreenEmergencyComponent,
  ],
  template: `
    <section class="day-root relative bg-night text-white overflow-hidden" aria-labelledby="day-title">
      <!-- Faint grid, Unveil-style, fading toward the edges -->
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-[0.07]"
           style="background-image: linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px);
                  background-size: 72px 72px;
                  mask-image: radial-gradient(70% 60% at 60% 50%, black, transparent);
                  -webkit-mask-image: radial-gradient(70% 60% at 60% 50%, black, transparent);"></div>

      <div class="day-stage section relative min-h-[100dvh] grid lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-center py-24 lg:py-16">
        <!-- ── Left: story ── -->
        <div class="flex flex-col">
          <span class="section-index !text-white/40 [&>b]:!text-primary-light"><b>02</b> / 05</span>
          <h2 id="day-title" class="h2 mt-6">{{ i18n.t('day.h2') }}</h2>
          <p class="mt-4 text-[17px] leading-relaxed text-white/60 max-w-[44ch]">{{ i18n.t('day.sub') }}</p>

          <ol class="mt-10 flex flex-col border-t border-white/10" role="tablist" aria-orientation="vertical">
            @for (k of steps; track k; let i = $index) {
              <li class="border-b border-white/10 relative">
                <!-- progress rail -->
                <span aria-hidden="true" class="absolute left-0 top-0 bottom-0 w-px bg-primary-light origin-top transition-transform duration-500"
                      [style.transform]="active() === i ? 'scaleY(1)' : 'scaleY(0)'"></span>
                <button type="button" role="tab"
                        class="w-full text-left pl-5 pr-2 py-4 flex items-baseline gap-4 group"
                        [id]="'day-tab-' + i"
                        [attr.aria-selected]="active() === i"
                        [attr.aria-controls]="'day-panel-' + i"
                        (click)="go(i)">
                  <span class="text-[12px] tabular-nums transition-colors"
                        [class]="active() === i ? 'text-primary-light' : 'text-white/35'">0{{ i + 1 }}</span>
                  <span class="flex-1">
                    <span class="block text-[18px] sm:text-[20px] font-semibold tracking-tight transition-colors"
                          style="font-family: var(--font-display);"
                          [class]="active() === i ? 'text-white' : 'text-white/45 group-hover:text-white/75'">
                      {{ i18n.t('day.step.' + k + '.title') }}
                    </span>
                    <span class="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                          [style.gridTemplateRows]="active() === i ? '1fr' : '0fr'"
                          [style.opacity]="active() === i ? 1 : 0"
                          [id]="'day-panel-' + i" role="tabpanel" [attr.aria-labelledby]="'day-tab-' + i">
                      <span class="overflow-hidden">
                        <span class="block pt-2 text-[15px] leading-relaxed text-white/60 max-w-[46ch]">
                          {{ i18n.t('day.step.' + k + '.body') }}
                        </span>
                      </span>
                    </span>
                  </span>
                  <span class="eyebrow !text-white/30 hidden sm:inline">{{ i18n.t('day.step.' + k + '.label') }}</span>
                </button>
              </li>
            }
          </ol>
        </div>

        <!-- ── Right: phone + the day's log ── -->
        <div class="relative justify-self-center lg:justify-self-end pb-24 lg:pb-0">
          <div class="relative" style="width: clamp(240px, 22vw, 290px);">
            <app-phone-mockup class="block" width="100%">
              <div class="relative h-full">
                <app-screen-ai-notes    class="day-screen" [class.is-active]="active() === 0" [attr.aria-hidden]="active() !== 0" />
                <app-screen-meds        class="day-screen" [class.is-active]="active() === 1" [attr.aria-hidden]="active() !== 1" />
                <app-screen-vaccines    class="day-screen" [class.is-active]="active() === 2" [attr.aria-hidden]="active() !== 2" />
                <app-screen-emergency   class="day-screen" [class.is-active]="active() === 3" [attr.aria-hidden]="active() !== 3" />
              </div>
            </app-phone-mockup>
          </div>

          <!-- Case log, Firmexa-style -->
          <div class="absolute -bottom-2 lg:bottom-10 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:-left-44 w-[300px] rounded-2xl
                      bg-night-2/95 border border-white/10 backdrop-blur p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <div class="flex items-center justify-between mb-3">
              <span class="eyebrow !text-white/45">{{ i18n.isES() ? 'Registro de hoy' : "Today's log" }}</span>
              <span class="text-[11px] text-primary-light tabular-nums">{{ active() + 1 }}/4</span>
            </div>
            <ul class="flex flex-col gap-2">
              @for (k of steps; track k; let i = $index) {
                <li class="flex items-start gap-3 text-[12px] leading-snug transition-opacity duration-500"
                    [style.opacity]="i <= active() ? 1 : 0.22">
                  <span class="text-white/45 tabular-nums shrink-0">{{ i18n.t('day.step.' + k + '.time') }}</span>
                  <span class="text-white/85">{{ i18n.t('day.step.' + k + '.log') }}</span>
                  @if (i < active()) {
                    <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 ml-auto shrink-0 text-secondary-light" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>
                  }
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .day-screen {
      position: absolute;
      inset: 0;
      display: block;
      opacity: 0;
      transform: translateY(12px) scale(0.985);
      transition: opacity 450ms var(--ease-out-quart), transform 600ms var(--ease-out-quart);
      pointer-events: none;
    }
    .day-screen.is-active {
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }
    @media (prefers-reduced-motion: reduce) {
      .day-screen { transition: none; }
    }
  `],
})
export class DayWalkthroughSection implements OnInit, OnDestroy {
  readonly i18n = inject(I18nService);
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly gsapSvc = inject(GsapService);
  private readonly zone = inject(NgZone);

  readonly steps = ['1', '2', '3', '4'];
  readonly active = signal(0);

  private trigger: ScrollTriggerInstance | null = null;
  private mm: { revert: () => void } | null = null;

  async ngOnInit() {
    const { gsap, ScrollTrigger } = await this.gsapSvc.load();

    this.zone.runOutsideAngular(() => {
      const root = this.el.nativeElement as HTMLElement;
      const section = root.querySelector('.day-root') as HTMLElement;
      const last = this.steps.length - 1;

      this.mm = gsap.matchMedia();
      (this.mm as ReturnType<typeof gsap.matchMedia>).add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          // Pin the dark act and let scroll drive the active step.
          this.trigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => '+=' + window.innerHeight * last,
            pin: true,
            snap: { snapTo: 1 / last, duration: { min: 0.2, max: 0.5 }, ease: 'power2.inOut' },
            onUpdate: (self) => {
              const i = Math.round(self.progress * last);
              if (i !== this.active()) this.zone.run(() => this.active.set(i));
            },
          });
          return () => {
            this.trigger = null;
          };
        },
      );
    });
  }

  /** Step buttons: scroll to that step when pinned, otherwise switch directly. */
  go(i: number) {
    const st = this.trigger;
    if (!st) {
      this.active.set(i);
      return;
    }
    const y = st.start + ((st.end - st.start) * i) / (this.steps.length - 1);
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  ngOnDestroy() {
    this.mm?.revert();
  }
}
