import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AnimatedNumberComponent } from '../../../shared/components/animated-number/animated-number.component';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-stats-strip-section',
  standalone: true,
  imports: [AnimatedNumberComponent, GsapRevealDirective],
  template: `
    <section class="border-y border-slate-200/80 bg-white/60 py-10">
      <div class="section">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" appReveal="fade-up" revealStagger=".stat-item">
          <div class="stat-item flex flex-col gap-1">
            <span class="text-4xl font-bold tracking-tight" style="font-family:var(--font-display); color:#0891B2;">
              <app-animated-number [target]="94" suffix="%" />
            </span>
            <span class="text-[13px] text-ink-muted font-medium">{{ i18n.isES() ? 'Adherencia promedio' : 'Avg. adherence' }}</span>
          </div>
          <div class="stat-item flex flex-col gap-1">
            <span class="text-4xl font-bold tracking-tight" style="font-family:var(--font-display); color:#059669;">
              <app-animated-number [target]="10" suffix="+" />
            </span>
            <span class="text-[13px] text-ink-muted font-medium">{{ i18n.isES() ? 'Funciones de salud' : 'Health features' }}</span>
          </div>
          <div class="stat-item flex flex-col gap-1">
            <span class="text-4xl font-bold tracking-tight" style="font-family:var(--font-display); color:#0891B2;">
              <app-animated-number [target]="5" />
            </span>
            <span class="text-[13px] text-ink-muted font-medium">{{ i18n.isES() ? 'Perfiles de familia' : 'Family profiles' }}</span>
          </div>
          <div class="stat-item flex flex-col gap-1">
            <span class="text-4xl font-bold tracking-tight" style="font-family:var(--font-display); color:#059669;">
              100%
            </span>
            <span class="text-[13px] text-ink-muted font-medium">{{ i18n.isES() ? 'Sin venta de datos' : 'No data sold' }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class StatsStripSection {
  readonly i18n = inject(I18nService);
}
