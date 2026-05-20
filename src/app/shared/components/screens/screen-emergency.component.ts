import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-screen-emergency',
  standalone: true,
  template: `
    <!-- TODO: replace with real screenshot from Expo app -->
    <div class="h-full w-full flex flex-col gap-3 px-4 py-3 text-ink">
      <div class="mt-1 flex items-center justify-between">
        <span class="text-[10px] uppercase tracking-widest font-bold text-danger inline-flex items-center gap-1.5">
          <span class="block w-1.5 h-1.5 rounded-full bg-danger animate-pulse"></span>
          {{ i18n.isES() ? 'Emergencia' : 'Emergency' }}
        </span>
        <span class="text-[10px] text-ink-soft">{{ i18n.isES() ? 'Offline OK' : 'Offline OK' }}</span>
      </div>

      <!-- Header card -->
      <div class="rounded-2xl p-4 relative overflow-hidden text-white" style="background: linear-gradient(135deg, #DC2626 0%, #991B1B 100%);">
        <div class="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10"></div>
        <p class="text-[10px] uppercase tracking-widest opacity-80 font-semibold">{{ i18n.isES() ? 'Tarjeta ICE' : 'ICE card' }}</p>
        <p class="text-[18px] font-bold tracking-tight" style="font-family: var(--font-display);">Don José González</p>
        <div class="flex items-center gap-3 mt-1.5 text-[11px] opacity-90">
          <span class="px-2 py-0.5 rounded-md bg-white/20 font-bold tracking-wide">O+</span>
          <span>71 {{ i18n.isES() ? 'años' : 'yrs' }}</span>
          <span class="opacity-60">·</span>
          <span>72 kg</span>
        </div>
      </div>

      <!-- Allergies -->
      <div class="rounded-2xl bg-white border border-slate-100 p-3">
        <p class="text-[10px] uppercase tracking-wider font-semibold text-ink-soft mb-1.5">{{ i18n.isES() ? 'Alergias' : 'Allergies' }}</p>
        <div class="flex flex-wrap gap-1.5">
          <span class="text-[10px] font-medium px-2 py-1 rounded-full bg-danger/10 text-danger border border-danger/20">{{ i18n.isES() ? 'Penicilina' : 'Penicillin' }}</span>
          <span class="text-[10px] font-medium px-2 py-1 rounded-full bg-danger/10 text-danger border border-danger/20">{{ i18n.isES() ? 'Mariscos' : 'Shellfish' }}</span>
          <span class="text-[10px] font-medium px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{{ i18n.isES() ? 'Polen' : 'Pollen' }}</span>
        </div>
      </div>

      <!-- Conditions / meds -->
      <div class="rounded-2xl bg-white border border-slate-100 p-3">
        <p class="text-[10px] uppercase tracking-wider font-semibold text-ink-soft mb-1.5">{{ i18n.isES() ? 'Condiciones · Medicación' : 'Conditions · Meds' }}</p>
        <ul class="text-[11.5px] leading-snug space-y-1">
          <li class="flex items-center gap-2"><span class="block w-1.5 h-1.5 rounded-full bg-primary"></span>{{ i18n.isES() ? 'Hipertensión · Losartán 50mg' : 'Hypertension · Losartan 50mg' }}</li>
          <li class="flex items-center gap-2"><span class="block w-1.5 h-1.5 rounded-full bg-primary"></span>{{ i18n.isES() ? 'Diabetes T2 · Metformina 500mg' : 'Type 2 diabetes · Metformin 500mg' }}</li>
        </ul>
      </div>

      <!-- Contacts -->
      <div class="rounded-2xl bg-white border border-slate-100 p-3">
        <p class="text-[10px] uppercase tracking-wider font-semibold text-ink-soft mb-2">{{ i18n.isES() ? 'Contactos' : 'Contacts' }}</p>
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-[11.5px] font-semibold leading-tight">{{ i18n.isES() ? 'María (hija)' : 'María (daughter)' }}</p>
              <p class="text-[10px] text-ink-soft">+52 999 123 4567</p>
            </div>
            <span class="grid place-items-center w-8 h-8 rounded-full bg-secondary text-white">
              <svg viewBox="0 0 24 24" class="w-3.5 h-3.5" fill="currentColor"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.58l2.2-2.21a1 1 0 0 0 .25-1.02C8.7 6.45 8.5 5.25 8.5 4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-1-1z"/></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ScreenEmergencyComponent {
  readonly i18n = inject(I18nService);
}
