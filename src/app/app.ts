import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { StickyCtaComponent } from './shared/components/sticky-cta/sticky-cta.component';
import { GsapService } from './core/animation/gsap.service';
import { I18nService } from './core/i18n/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, StickyCtaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly i18n = inject(I18nService);
  readonly skipLabel = computed(() => this.i18n.t('nav.skip'));

  constructor() {
    // Pre-warm GSAP + ScrollTrigger so they're cached before any section's AfterViewInit
    inject(GsapService).load();
  }
}
