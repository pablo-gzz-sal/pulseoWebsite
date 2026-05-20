import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

interface Dose {
  name: string;
  time: string;
  status: 'taken' | 'pending' | 'overdue' | 'scheduled';
}

@Component({
  selector: 'app-screen-meds',
  standalone: true,
  template: `
    <!-- TODO: replace with real screenshot from Expo app -->
    <div class="h-full w-full flex flex-col gap-3 px-4 py-3 text-ink">
      <div class="flex items-center justify-between mt-1">
        <div>
          <span class="text-[10px] uppercase tracking-widest text-primary-dark font-semibold">Hoy · {{ i18n.isES() ? 'Mar 14 May' : 'Tue May 14' }}</span>
          <h3 class="text-[16px] font-bold tracking-tight leading-tight" style="font-family: var(--font-display);">{{ i18n.isES() ? 'Dosis de hoy' : "Today's doses" }}</h3>
        </div>
        <span class="text-[11px] font-semibold text-secondary">94%</span>
      </div>

      <!-- Summary pills -->
      <div class="grid grid-cols-3 gap-1.5">
        <div class="rounded-xl bg-secondary/10 px-2 py-2 text-center">
          <div class="text-[14px] font-bold text-secondary-dark tabular-nums">5</div>
          <div class="text-[9px] text-secondary-dark font-semibold uppercase tracking-wider">{{ i18n.isES() ? 'Tomadas' : 'Taken' }}</div>
        </div>
        <div class="rounded-xl bg-accent/15 px-2 py-2 text-center">
          <div class="text-[14px] font-bold text-amber-700 tabular-nums">2</div>
          <div class="text-[9px] text-amber-700 font-semibold uppercase tracking-wider">{{ i18n.isES() ? 'Pendientes' : 'Pending' }}</div>
        </div>
        <div class="rounded-xl bg-danger/10 px-2 py-2 text-center">
          <div class="text-[14px] font-bold text-danger tabular-nums">1</div>
          <div class="text-[9px] text-danger font-semibold uppercase tracking-wider">{{ i18n.isES() ? 'Atrasada' : 'Overdue' }}</div>
        </div>
      </div>

      <!-- Dose list -->
      <div class="flex flex-col gap-2">
        @for (d of doses; track d.name) {
          <div class="flex items-center gap-3 rounded-2xl bg-white border border-slate-100 px-3 py-2.5">
            <span class="grid place-items-center w-9 h-9 rounded-xl shrink-0"
              [style.background]="bgFor(d.status)" [style.color]="colorFor(d.status)">
              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="9" width="18" height="6" rx="3"/><path d="M12 9v6"/>
              </svg>
            </span>
            <div class="flex-1 min-w-0">
              <p class="text-[12.5px] font-semibold leading-tight">{{ d.name }}</p>
              <p class="text-[10.5px] text-ink-soft">{{ d.time }}</p>
            </div>
            <span class="text-[9.5px] font-semibold px-2 py-0.5 rounded-full"
              [style.background]="bgFor(d.status)" [style.color]="colorFor(d.status)">
              {{ labelFor(d.status) }}
            </span>
          </div>
        }
      </div>

      <!-- 30-day heatmap -->
      <div class="rounded-2xl bg-white border border-slate-100 p-3">
        <div class="flex items-center justify-between mb-2">
          <p class="text-[10px] uppercase tracking-wider font-semibold text-ink-soft">{{ i18n.isES() ? 'Últimos 30 días' : 'Last 30 days' }}</p>
          <p class="text-[10px] font-semibold text-secondary">▲ 6%</p>
        </div>
        <div class="grid grid-cols-15 gap-0.5">
          @for (h of heatmap; track $index) {
            <span class="block aspect-square rounded-[3px]"
              [style.background]="h === 0 ? '#E2E8F0' : h === 1 ? '#A7F3D0' : h === 2 ? '#34D399' : '#059669'"></span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .grid-cols-15 { grid-template-columns: repeat(15, minmax(0, 1fr)); }
  `],
})
export class ScreenMedsComponent {
  readonly i18n = inject(I18nService);

  doses: Dose[] = [
    { name: 'Metformina 500mg', time: '08:00', status: 'taken' },
    { name: 'Losartán 50mg', time: '08:00', status: 'taken' },
    { name: 'Paracetamol 500mg', time: '14:00', status: 'pending' },
    { name: 'Vitamina D', time: '13:00', status: 'overdue' },
  ];
  heatmap = [3,3,2,3,3,3,1,3,3,3,3,2,3,3,3,3,3,1,3,3,3,3,3,3,2,3,3,3,3,3];

  bgFor(s: Dose['status']) {
    return { taken: 'rgba(5,150,105,0.12)', pending: 'rgba(245,158,11,0.15)', overdue: 'rgba(220,38,38,0.12)', scheduled: 'rgba(8,145,178,0.12)' }[s];
  }
  colorFor(s: Dose['status']) {
    return { taken: '#047857', pending: '#B45309', overdue: '#B91C1C', scheduled: '#0E7490' }[s];
  }
  labelFor(s: Dose['status']) {
    const map = this.i18n.isES()
      ? { taken: 'Hecho', pending: 'En curso', overdue: 'Atrasada', scheduled: 'Próxima' }
      : { taken: 'Done', pending: 'Pending', overdue: 'Overdue', scheduled: 'Soon' };
    return map[s];
  }
}
