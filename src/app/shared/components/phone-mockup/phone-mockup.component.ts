import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-phone-mockup',
  standalone: true,
  template: `
    <!-- TODO: replace screen <ng-content/> with real screenshot from Expo app -->
    <div
      class="relative mx-auto"
      [style.width]="width"
      [style.maxWidth]="'100%'"
    >
      <div
        class="relative rounded-[2.6rem] bg-slate-950 p-2.5"
        [style.boxShadow]="'var(--shadow-phone), inset 0 0 0 1px rgba(255,255,255,0.05)'"
        [style.aspectRatio]="'9 / 19.5'"
      >
        <!-- Side button -->
        <span class="absolute right-[-2px] top-32 h-16 w-[3px] rounded-l bg-slate-800"></span>
        <span class="absolute left-[-2px] top-24 h-8 w-[3px] rounded-r bg-slate-800"></span>
        <span class="absolute left-[-2px] top-40 h-14 w-[3px] rounded-r bg-slate-800"></span>

        <!-- Screen -->
        <div class="relative h-full w-full overflow-hidden rounded-[2rem] bg-bg">
          <!-- Notch / Dynamic Island -->
          <div class="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-[22px] w-[88px] rounded-full bg-slate-950"></div>

          <!-- Status bar -->
          <div class="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 pt-2 text-[10px] font-semibold text-ink">
            <span>9:41</span>
            <span class="opacity-0">·</span>
            <span class="flex items-center gap-1">
              <svg viewBox="0 0 24 24" class="w-3 h-3" fill="currentColor" aria-hidden="true"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm4 4l2 2c2.76-2.76 7.24-2.76 10 0l2-2c-3.87-3.87-10.14-3.87-14 0zm4 4l3 3 3-3c-1.65-1.66-4.34-1.66-6 0z"/></svg>
              <span class="inline-block w-5 h-2 rounded-sm border border-ink/50">
                <span class="block w-3.5 h-full rounded-[1px] bg-ink/80"></span>
              </span>
            </span>
          </div>

          <!-- Slot -->
          <div class="pt-9 h-full">
            <ng-content />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class PhoneMockupComponent {
  @Input() width = 'clamp(240px, 28vw, 320px)';
}
