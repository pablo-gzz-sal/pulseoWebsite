import { Component, Input, signal } from '@angular/core';

let faqUid = 0;

@Component({
  selector: 'app-faq-item',
  standalone: true,
  host: { class: 'block border-b hairline' },
  template: `
    <h3>
      <button
        type="button"
        class="group flex w-full items-baseline gap-5 py-6 text-left"
        [attr.aria-expanded]="open()"
        [attr.aria-controls]="panelId"
        [id]="buttonId"
        (click)="open.set(!open())"
      >
        <span class="text-[12px] tabular-nums transition-colors"
              [class]="open() ? 'text-primary' : 'text-ink-soft'">0{{ index }}</span>
        <span class="flex-1 text-[17px] sm:text-[19px] font-semibold tracking-tight text-ink leading-snug group-hover:text-primary-dark transition-colors">{{ question }}</span>
        <span
          class="relative w-4 h-4 shrink-0 self-center text-ink"
          style="transition: transform 300ms var(--ease-out-quart);"
          [style.transform]="open() ? 'rotate(45deg)' : 'rotate(0deg)'"
          aria-hidden="true"
        >
          <span class="absolute left-0 right-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current rounded"></span>
          <span class="absolute top-0 bottom-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current rounded"></span>
        </span>
      </button>
    </h3>
    <div
      class="grid"
      [id]="panelId"
      role="region"
      [attr.aria-labelledby]="buttonId"
      [attr.aria-hidden]="!open()"
      [attr.inert]="open() ? null : ''"
      style="transition: grid-template-rows 320ms var(--ease-out-quart);"
      [style.gridTemplateRows]="open() ? '1fr' : '0fr'"
    >
      <div class="overflow-hidden">
        <p class="pl-[calc(12px*1.6+20px)] pr-8 pb-6 text-[15.5px] leading-relaxed text-ink-muted max-w-[60ch]">{{ answer }}</p>
      </div>
    </div>
  `,
})
export class FaqItemComponent {
  @Input() index = 1;
  @Input() question = '';
  @Input() answer = '';
  readonly open = signal(false);
  private readonly uid = ++faqUid;
  readonly buttonId = `faq-btn-${this.uid}`;
  readonly panelId = `faq-panel-${this.uid}`;
}
