import { Component } from '@angular/core';
import { HeroSection } from './sections/hero.section';
import { TrustStripSection } from './sections/trust-strip.section';
import { AiNotesSection } from './sections/ai-notes.section';
import { StatsStripSection } from './sections/stats-strip.section';
import { FamilySection } from './sections/family.section';
import { MedicationSection } from './sections/medication.section';
import { VaccinesSection } from './sections/vaccines.section';
import { EmergencySection } from './sections/emergency.section';
import { AllFeaturesSection } from './sections/all-features.section';
import { InsightsSection } from './sections/insights.section';
import { PrivacySection } from './sections/privacy.section';
import { FaqSection } from './sections/faq.section';
import { CtaWaitlistSection } from './sections/cta-waitlist.section';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroSection,
    TrustStripSection,
    AiNotesSection,
    StatsStripSection,
    FamilySection,
    MedicationSection,
    VaccinesSection,
    EmergencySection,
    AllFeaturesSection,
    InsightsSection,
    PrivacySection,
    FaqSection,
    CtaWaitlistSection,
  ],
  template: `
    <main>
      <app-hero-section />
      <app-trust-strip-section />
      <app-ai-notes-section />
      <app-stats-strip-section />
      <app-family-section />
      <app-medication-section />
      <app-vaccines-section />
      <app-emergency-section />
      <app-all-features-section />
      <app-insights-section />
      <app-privacy-section />
      <app-faq-section />
      <app-cta-waitlist-section />
    </main>
  `,
})
export class LandingComponent {}
