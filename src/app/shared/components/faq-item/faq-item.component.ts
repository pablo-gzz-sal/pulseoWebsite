import { Component, Input, signal } from '@angular/core';

let faqUid = 0;

@Component({
  selector: 'app-faq-item',
  standalone: true,
  template: `
    <div class="card overflow-hidden">
      <button
        type="button"
        class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="panelId"
        [id]="buttonId"
        (click)="open.set(!open())"
      >
        <span class="text-[16px] font-semibold text-ink leading-snug" style="font-family: var(--font-display);">{{ question }}</span>
        <span
          class="grid place-items-center w-8 h-8 rounded-full bg-primary/[0.08] text-primary shrink-0"
          style="transition: transform 300ms ease;"
          [style.transform]="open() ? 'rotate(45deg)' : 'rotate(0deg)'"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </span>
      </button>
      <div
        class="overflow-hidden"
        [id]="panelId"
        role="region"
        [attr.aria-labelledby]="buttonId"
        [attr.aria-hidden]="!open()"
        style="transition: max-height 320ms cubic-bezier(0.4,0,0.2,1);"
        [style.maxHeight]="open() ? '400px' : '0px'"
      >
        <p class="px-6 pb-6 text-[15px] leading-relaxed text-ink-muted">{{ answer }}</p>
      </div>
    </div>
  `,
})
export class FaqItemComponent {
  @Input() question = '';
  @Input() answer = '';
  readonly open = signal(false);
  private readonly uid = ++faqUid;
  readonly buttonId = `faq-btn-${this.uid}`;
  readonly panelId = `faq-panel-${this.uid}`;
}
