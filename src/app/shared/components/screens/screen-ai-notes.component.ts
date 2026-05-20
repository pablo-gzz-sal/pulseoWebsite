import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-screen-ai-notes',
  standalone: true,
  template: `
    <!-- TODO: replace with real screenshot from Expo app -->
    <div class="h-full w-full flex flex-col gap-3 px-4 py-3 text-ink">
      <div class="flex items-center justify-between mt-1">
        <div class="flex flex-col">
          <span class="text-[10px] uppercase tracking-widest text-primary-dark font-semibold">Pulseo IA</span>
          <span class="text-[16px] font-bold tracking-tight" style="font-family: var(--font-display);">Notas inteligentes</span>
        </div>
        <span class="grid place-items-center w-8 h-8 rounded-full bg-primary/10 text-primary">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>
        </span>
      </div>

      <!-- Mic + waveform -->
      <div class="rounded-2xl bg-white p-3.5 border border-slate-100 shadow-[0_8px_24px_-16px_rgba(8,145,178,0.4)]">
        <div class="flex items-center gap-3">
          <span class="relative grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shrink-0">
            <span class="absolute inset-0 rounded-full bg-primary/50 animate-ping"></span>
            <svg viewBox="0 0 24 24" class="w-4 h-4 relative" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"/></svg>
          </span>
          <div class="flex-1 flex items-end gap-1 h-9">
            @for (h of bars; track $index) {
              <span class="block w-[3px] rounded-full bg-primary/60" [style.height.%]="h"></span>
            }
          </div>
          <span class="text-[10px] font-semibold text-ink-soft tabular-nums">00:14</span>
        </div>
        <p class="mt-3 text-[12px] leading-snug text-ink-muted italic">{{ i18n.t('ai.transcript') }}</p>
      </div>

      <!-- Chips -->
      <div class="flex flex-wrap gap-1.5">
        <span class="text-[10px] font-medium px-2 py-1 rounded-full bg-accent/15 text-amber-700 border border-amber-200">⚠ {{ i18n.t('ai.chip.symptom') }}</span>
        <span class="text-[10px] font-medium px-2 py-1 rounded-full bg-primary/10 text-primary-dark border border-primary/20">💊 {{ i18n.t('ai.chip.med') }}</span>
        <span class="text-[10px] font-medium px-2 py-1 rounded-full bg-secondary/10 text-secondary-dark border border-secondary/20">⏰ {{ i18n.t('ai.chip.time') }}</span>
      </div>

      <!-- Action card -->
      <div class="rounded-2xl border border-secondary/25 bg-secondary/8 p-3.5 flex items-center gap-3">
        <span class="grid place-items-center w-9 h-9 rounded-xl bg-secondary text-white">
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>
        </span>
        <div class="flex-1 min-w-0">
          <p class="text-[11px] text-ink-soft uppercase tracking-wider font-semibold">Acción sugerida</p>
          <p class="text-[13px] font-semibold text-ink leading-tight">{{ i18n.t('ai.action') }}</p>
        </div>
        <span class="text-[11px] font-semibold text-secondary-dark">+</span>
      </div>
    </div>
  `,
})
export class ScreenAiNotesComponent {
  readonly i18n = inject(I18nService);
  bars = [40, 70, 30, 90, 55, 80, 45, 65, 35, 75, 50, 90, 30, 60, 45, 80, 35];
}
