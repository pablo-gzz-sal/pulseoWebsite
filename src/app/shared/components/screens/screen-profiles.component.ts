import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

interface Member {
  name: string;
  role: string;
  initials: string;
  gradient: string;
  active?: boolean;
  adherence: number;
}

@Component({
  selector: 'app-screen-profiles',
  standalone: true,
  template: `
    <!-- TODO: replace with real screenshot from Expo app -->
    <div class="h-full w-full flex flex-col gap-3 px-4 py-3 text-ink">
      <div class="mt-1">
        <span class="text-[10px] uppercase tracking-widest text-primary-dark font-semibold">{{ i18n.isES() ? 'Familia' : 'Family' }}</span>
        <h3 class="text-[16px] font-bold tracking-tight leading-tight" style="font-family: var(--font-display);">{{ i18n.isES() ? 'Tu equipo de salud' : 'Your care team' }}</h3>
      </div>

      <!-- Profile chip carousel -->
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-1">
        @for (m of members; track m.name) {
          <div class="shrink-0 flex flex-col items-center gap-1.5 min-w-[58px]">
            <span class="relative grid place-items-center w-12 h-12 rounded-full text-white text-[12px] font-bold ring-offset-1"
              [class.ring-2]="m.active"
              [style.background]="m.gradient"
              [style.ringColor]="m.active ? '#0891B2' : 'transparent'">
              {{ m.initials }}
              @if (m.active) {
                <span class="absolute -bottom-0.5 -right-0.5 grid place-items-center w-4 h-4 rounded-full bg-secondary text-white text-[8px] border-2 border-white">✓</span>
              }
            </span>
            <span class="text-[10px] font-semibold leading-tight text-center">{{ m.name }}</span>
          </div>
        }
        <span class="shrink-0 grid place-items-center w-12 h-12 rounded-full border-2 border-dashed border-primary/40 text-primary text-lg font-bold">+</span>
      </div>

      <!-- Active profile big card -->
      <div class="rounded-2xl p-4 text-white relative overflow-hidden" style="background: linear-gradient(135deg, #0891B2 0%, #0E7490 100%);">
        <div class="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10"></div>
        <p class="text-[10px] uppercase tracking-widest opacity-80 font-semibold">{{ i18n.isES() ? 'Perfil activo' : 'Active profile' }}</p>
        <p class="text-[18px] font-bold tracking-tight" style="font-family: var(--font-display);">María González</p>
        <div class="flex items-center gap-3 mt-2 text-[11px] opacity-90">
          <span>O+</span>
          <span class="opacity-50">·</span>
          <span>62 {{ i18n.isES() ? 'años' : 'yrs' }}</span>
          <span class="opacity-50">·</span>
          <span>{{ i18n.isES() ? 'Mamá' : 'Mom' }}</span>
        </div>
      </div>

      <!-- Member adherence list -->
      <div class="flex flex-col gap-1.5">
        @for (m of members; track m.name) {
          <div class="flex items-center gap-3 rounded-xl bg-white border border-slate-100 px-3 py-2">
            <span class="grid place-items-center w-7 h-7 rounded-full text-white text-[10px] font-bold" [style.background]="m.gradient">{{ m.initials }}</span>
            <div class="flex-1 min-w-0">
              <p class="text-[11.5px] font-semibold leading-tight">{{ m.name }}</p>
              <p class="text-[9.5px] text-ink-soft">{{ m.role }}</p>
            </div>
            <div class="flex flex-col items-end gap-0.5">
              <span class="text-[10.5px] font-bold text-secondary tabular-nums">{{ m.adherence }}%</span>
              <span class="block w-12 h-1 rounded-full bg-slate-100 overflow-hidden">
                <span class="block h-full rounded-full bg-secondary" [style.width.%]="m.adherence"></span>
              </span>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ScreenProfilesComponent {
  readonly i18n = inject(I18nService);
  members: Member[] = [
    { name: 'María', role: 'Mamá · 62', initials: 'MG', gradient: 'linear-gradient(135deg,#0891B2,#0E7490)', active: true, adherence: 96 },
    { name: 'Luis', role: 'Hijo · 14', initials: 'LR', gradient: 'linear-gradient(135deg,#059669,#047857)', adherence: 88 },
    { name: 'Sofía', role: 'Hija · 9', initials: 'SR', gradient: 'linear-gradient(135deg,#F59E0B,#D97706)', adherence: 92 },
    { name: 'Don José', role: 'Papá · 71', initials: 'JG', gradient: 'linear-gradient(135deg,#7C3AED,#5B21B6)', adherence: 84 },
  ];
}
