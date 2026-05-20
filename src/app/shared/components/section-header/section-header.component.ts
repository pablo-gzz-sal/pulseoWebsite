import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
    <div [class]="'flex flex-col gap-4 ' + (align === 'center' ? 'items-center text-center mx-auto max-w-2xl' : 'items-start max-w-3xl')">
      @if (eyebrow) {
        <span class="eyebrow">{{ eyebrow }}</span>
      }
      <h2 class="h2 text-ink" [style.maxWidth]="'18ch'">{{ title }}</h2>
      @if (lede) {
        <p class="text-[17px] leading-relaxed text-ink-muted" [style.maxWidth]="'52ch'">{{ lede }}</p>
      }
    </div>
  `,
})
export class SectionHeaderComponent {
  @Input() eyebrow?: string;
  @Input() title = '';
  @Input() lede?: string;
  @Input() align: 'left' | 'center' = 'left';
}
