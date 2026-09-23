import { Component } from '@angular/core';
import { HeroSection } from './sections/hero.section';
import { ProblemSection } from './sections/problem.section';
import { DayWalkthroughSection } from './sections/day-walkthrough.section';
import { AllFeaturesSection } from './sections/all-features.section';
import { PrivacySection } from './sections/privacy.section';
import { FaqSection } from './sections/faq.section';
import { CtaWaitlistSection } from './sections/cta-waitlist.section';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroSection,
    ProblemSection,
    DayWalkthroughSection,
    AllFeaturesSection,
    PrivacySection,
    FaqSection,
    CtaWaitlistSection,
  ],
  template: `
    <main id="main" tabindex="-1" class="outline-none">
      <app-hero-section />
      <app-problem-section />
      <app-day-walkthrough-section />
      <app-all-features-section />
      <app-privacy-section />
      <app-faq-section />
      <app-cta-waitlist-section />
    </main>
  `,
})
export class LandingComponent {}
