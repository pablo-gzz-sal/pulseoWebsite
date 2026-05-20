import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  template: `
    <article class="card card-hover p-7 flex flex-col gap-4 h-full">
      <span
        class="grid place-items-center w-11 h-11 rounded-xl"
        [style.background]="iconBg"
        [style.color]="iconColor"
      >
        <ng-content select="[icon]" />
      </span>
      <div class="flex flex-col gap-2">
        <h3 class="text-[18px] font-semibold text-ink tracking-tight" style="font-family: var(--font-display);">{{ title }}</h3>
        <p class="text-[15px] leading-relaxed text-ink-muted">{{ body }}</p>
      </div>
    </article>
  `,
})
export class FeatureCardComponent {
  @Input() title = '';
  @Input() body = '';
  @Input() iconBg = 'rgba(8, 145, 178, 0.10)';
  @Input() iconColor = '#0E7490';
}
