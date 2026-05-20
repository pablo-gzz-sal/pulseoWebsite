import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

interface FeatureTile {
  key: string;
  icon: string; // svg path(s)
  iconBg: string;
  iconColor: string;
  span?: string; // tailwind col-span class
}

@Component({
  selector: 'app-all-features-section',
  standalone: true,
  imports: [SectionHeaderComponent, GsapRevealDirective],
  template: `
    <section class="section section-y relative">
      <!-- Background orb -->
      <div aria-hidden="true" class="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <div class="orb orb-teal absolute w-[500px] h-[500px] -top-32 -right-40"></div>
        <div class="orb orb-green absolute w-[400px] h-[400px] bottom-0 left-0 opacity-30"></div>
      </div>

      <app-section-header
        align="center"
        [eyebrow]="i18n.t('feat.eyebrow')"
        [title]="i18n.t('feat.h2')"
      />

      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        appReveal="fade-up" revealStagger=".feat-tile">

        <!-- Appointments -->
        <div class="feat-tile card card-hover p-6 flex flex-col gap-4 relative overflow-hidden">
          <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(rgba(8,145,178,1) 1px, transparent 1px); background-size: 18px 18px;"></div>
          <span class="grid place-items-center w-11 h-11 rounded-xl" style="background:rgba(8,145,178,0.12); color:#0E7490;">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
            </svg>
          </span>
          <div>
            <h3 class="text-[17px] font-semibold tracking-tight text-ink" style="font-family:var(--font-display);">{{ i18n.t('feat.apt.title') }}</h3>
            <p class="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{{ i18n.t('feat.apt.body') }}</p>
          </div>
          <div class="mt-auto flex items-center gap-2 text-[12px] text-primary-dark font-semibold">
            <span class="px-2 py-0.5 rounded-full bg-primary/10">{{ i18n.isES() ? 'Nuevo' : 'New' }}</span>
            <span>{{ i18n.isES() ? 'Prepara tus preguntas con IA' : 'AI appointment prep' }}</span>
          </div>
        </div>

        <!-- Prescription OCR -->
        <div class="feat-tile card card-hover p-6 flex flex-col gap-4 relative overflow-hidden">
          <span class="grid place-items-center w-11 h-11 rounded-xl" style="background:rgba(245,158,11,0.12); color:#B45309;">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/><path d="M10 13l1.5 1.5L14 11"/>
            </svg>
          </span>
          <div>
            <h3 class="text-[17px] font-semibold tracking-tight text-ink" style="font-family:var(--font-display);">{{ i18n.t('feat.ocr.title') }}</h3>
            <p class="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{{ i18n.t('feat.ocr.body') }}</p>
          </div>
          <!-- Fake scan preview -->
          <div class="rounded-xl border border-amber-100 bg-amber-50 p-3 flex items-center gap-2.5 mt-auto">
            <span class="grid place-items-center w-8 h-8 rounded-lg bg-accent text-white shrink-0">
              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M4 4h4v4H4zm12 0h4v4h-4zM4 16h4v4H4zm9-1h7v2h-7zm0 3h7v2h-7zM9 9h2v2H9zm4 0h2v2h-2zm2 4h2v2h-2zm-8 0h4v2H7z"/></svg>
            </span>
            <div class="text-[11px] leading-tight">
              <p class="font-semibold text-ink">{{ i18n.isES() ? 'Metformina 500mg · 2 veces/día' : 'Metformin 500mg · twice/day' }}</p>
              <p class="text-ink-soft">{{ i18n.isES() ? '✓ Extraído automáticamente' : '✓ Auto-extracted' }}</p>
            </div>
          </div>
        </div>

        <!-- AI Explanations -->
        <div class="feat-tile card card-hover p-6 flex flex-col gap-4 relative overflow-hidden" style="background: linear-gradient(145deg, #fff 60%, rgba(8,145,178,0.04));">
          <span class="grid place-items-center w-11 h-11 rounded-xl" style="background:rgba(5,150,105,0.12); color:#047857;">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              <path d="M8 10h.01M12 10h.01M16 10h.01"/>
            </svg>
          </span>
          <div>
            <h3 class="text-[17px] font-semibold tracking-tight text-ink" style="font-family:var(--font-display);">{{ i18n.t('feat.explain.title') }}</h3>
            <p class="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{{ i18n.t('feat.explain.body') }}</p>
          </div>
          <div class="mt-auto rounded-xl bg-secondary/8 border border-secondary/15 p-3 text-[12px] text-secondary-dark leading-snug">
            <span class="font-semibold">{{ i18n.isES() ? '"¿Qué es el Losartán?"' : '"What is Losartan?"' }}</span>
            <span class="text-ink-muted"> → {{ i18n.isES() ? 'Explicación en un párrafo simple' : 'Explained in plain language' }}</span>
          </div>
        </div>

        <!-- Nearby places -->
        <div class="feat-tile card card-hover p-6 flex flex-col gap-4">
          <span class="grid place-items-center w-11 h-11 rounded-xl" style="background:rgba(220,38,38,0.10); color:#B91C1C;">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </span>
          <div>
            <h3 class="text-[17px] font-semibold tracking-tight text-ink" style="font-family:var(--font-display);">{{ i18n.t('feat.nearby.title') }}</h3>
            <p class="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{{ i18n.t('feat.nearby.body') }}</p>
          </div>
          <!-- Mini map dots -->
          <div class="mt-auto flex items-center gap-2 flex-wrap">
            <span class="inline-flex items-center gap-1.5 text-[11.5px] font-medium px-2.5 py-1 rounded-full bg-slate-100">
              <span class="block w-2 h-2 rounded-full bg-secondary"></span>Farmacia
            </span>
            <span class="inline-flex items-center gap-1.5 text-[11.5px] font-medium px-2.5 py-1 rounded-full bg-slate-100">
              <span class="block w-2 h-2 rounded-full bg-danger"></span>Hospital
            </span>
            <span class="inline-flex items-center gap-1.5 text-[11.5px] font-medium px-2.5 py-1 rounded-full bg-slate-100">
              <span class="block w-2 h-2 rounded-full bg-primary"></span>Clínica
            </span>
          </div>
        </div>

        <!-- Reminders & Calendar -->
        <div class="feat-tile card card-hover p-6 flex flex-col gap-4">
          <span class="grid place-items-center w-11 h-11 rounded-xl" style="background:rgba(124,58,237,0.12); color:#6D28D9;">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </span>
          <div>
            <h3 class="text-[17px] font-semibold tracking-tight text-ink" style="font-family:var(--font-display);">{{ i18n.t('feat.reminder.title') }}</h3>
            <p class="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{{ i18n.t('feat.reminder.body') }}</p>
          </div>
          <!-- Fake push notification -->
          <div class="mt-auto rounded-xl bg-slate-50 border border-slate-100 p-3 flex items-center gap-2.5">
            <span class="grid place-items-center w-8 h-8 rounded-lg shrink-0" style="background:linear-gradient(135deg,#0891B2,#0E7490);">
              <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M3 12h3l2-5 4 10 2-5h7"/></svg>
            </span>
            <div class="text-[11px] leading-tight">
              <p class="font-semibold text-ink">Pulseo · {{ i18n.isES() ? 'ahora' : 'now' }}</p>
              <p class="text-ink-soft">{{ i18n.isES() ? '💊 Metformina en 15 minutos' : '💊 Metformin in 15 minutes' }}</p>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="feat-tile card card-hover p-6 flex flex-col gap-4 relative overflow-hidden">
          <span class="grid place-items-center w-11 h-11 rounded-xl" style="background:rgba(8,145,178,0.10); color:#0E7490;">
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 4-4"/>
            </svg>
          </span>
          <div>
            <h3 class="text-[17px] font-semibold tracking-tight text-ink" style="font-family:var(--font-display);">{{ i18n.t('feat.timeline.title') }}</h3>
            <p class="mt-1.5 text-[14px] leading-relaxed text-ink-muted">{{ i18n.t('feat.timeline.body') }}</p>
          </div>
          <!-- Mini timeline -->
          <div class="mt-auto flex flex-col gap-1.5 relative">
            <span class="absolute left-[7px] top-2 bottom-2 w-px bg-slate-200" aria-hidden="true"></span>
            @for (e of events; track e.label) {
              <div class="flex items-center gap-2.5">
                <span class="relative z-10 block w-3.5 h-3.5 rounded-full shrink-0" [style.background]="e.color"></span>
                <span class="text-[11px] text-ink-muted">{{ e.label }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AllFeaturesSection {
  readonly i18n = inject(I18nService);
  events = [
    { label: 'Hoy · Paracetamol 500mg tomada', color: '#059669' },
    { label: 'Ayer · Cita con Dr. Martínez', color: '#0891B2' },
    { label: '12 May · Vacuna Influenza', color: '#F59E0B' },
  ];
}
