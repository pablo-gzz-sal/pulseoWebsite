import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './shared/components/nav/nav.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { StickyCtaComponent } from './shared/components/sticky-cta/sticky-cta.component';
import { ThreeBgComponent } from './shared/components/three-bg/three-bg.component';
import { GsapService } from './core/animation/gsap.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent, StickyCtaComponent, ThreeBgComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor() {
    // Pre-warm GSAP + ScrollTrigger so they're cached before any section's AfterViewInit
    inject(GsapService).load();
  }
}
