import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

interface Vac {
  name: string;
  date: string;
  status: 'done' | 'upcoming' | 'overdue' | 'suggested';
}

@Component({
  selector: 'app-screen-vaccines',
  standalone: true,
  template: `
    <!-- TODO: replace with real screenshot from Expo app -->
    <div class="h-full w-full flex flex-col gap-3 px-4 py-3 text-ink">
      <div class="mt-1">
        <span class="text-[10px] uppercase tracking-widest text-primary-dark font-semibold">{{ i18n.isES() ? 'Cartilla NOM-MX' : 'NOM-MX schedule' }}</span>
        <h3 class="text-[16px] font-bold tracking-tight leading-tight" style="font-family: var(--font-display);">{{ i18n.isES() ? 'Esquema de vacunación' : 'Vaccination schedule' }}</h3>
      </div>

      <!-- Progress -->
      <div class="rounded-2xl bg-white border border-slate-100 p-3.5">
        <div class="flex items-center justify-between text-[10.5px] mb-2">
          <span class="font-semibold text-ink-muted">{{ i18n.isES() ? 'Sofía · 9 años' : 'Sofía · age 9' }}</span>
          <span class="font-bold text-secondary">8 / 10</span>
        </div>
        <div class="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div class="h-full rounded-full" style="width: 80%; background: linear-gradient(90deg, #10B981, #059669);"></div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="flex flex-col gap-2 relative">
        <span class="absolute left-[15px] top-3 bottom-3 w-px bg-slate-200" aria-hidden="true"></span>
        @for (v of vaccines; track v.name) {
          <div class="relative flex items-center gap-3 rounded-xl bg-white border border-slate-100 px-3 py-2.5">
            <span class="relative z-10 grid place-items-center w-8 h-8 rounded-full shrink-0 text-white text-[11px]"
              [style.background]="dotBg(v.status)">
              @if (v.status === 'done') { ✓ }
              @else if (v.status === 'overdue') { ! }
              @else if (v.status === 'upcoming') { ⏰ }
              @else { ✦ }
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-[12.5px] font-semibold leading-tight">{{ v.name }}</p>
              <p class="text-[10.5px]" [style.color]="textColor(v.status)">{{ v.date }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ScreenVaccinesComponent {
  readonly i18n = inject(I18nService);
  vaccines: Vac[] = [
    { name: 'BCG', date: this.i18n.isES() ? 'Aplicada · Mar 2016' : 'Done · Mar 2016', status: 'done' },
    { name: 'Hexavalente (4ª)', date: this.i18n.isES() ? 'Aplicada · Sep 2017' : 'Done · Sep 2017', status: 'done' },
    { name: 'Triple viral (SRP)', date: this.i18n.isES() ? 'Atrasada · venció hace 12 días' : 'Overdue · 12 days', status: 'overdue' },
    { name: 'Influenza anual', date: this.i18n.isES() ? 'Próxima · en 14 días' : 'Upcoming · in 14 days', status: 'upcoming' },
    { name: 'VPH', date: this.i18n.isES() ? 'Sugerida a los 11 años' : 'Suggested at age 11', status: 'suggested' },
  ];

  dotBg(s: Vac['status']) {
    return { done: '#059669', overdue: '#DC2626', upcoming: '#0891B2', suggested: '#F59E0B' }[s];
  }
  textColor(s: Vac['status']) {
    return { done: '#047857', overdue: '#B91C1C', upcoming: '#0E7490', suggested: '#B45309' }[s];
  }
}
