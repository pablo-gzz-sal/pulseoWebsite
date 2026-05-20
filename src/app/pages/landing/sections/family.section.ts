import { Component, inject } from '@angular/core';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SectionHeaderComponent } from '../../../shared/components/section-header/section-header.component';
import { FeatureCardComponent } from '../../../shared/components/feature-card/feature-card.component';
import { PhoneMockupComponent } from '../../../shared/components/phone-mockup/phone-mockup.component';
import { ScreenProfilesComponent } from '../../../shared/components/screens/screen-profiles.component';
import { GsapRevealDirective } from '../../../shared/directives/gsap-reveal.directive';

@Component({
  selector: 'app-family-section',
  standalone: true,
  imports: [SectionHeaderComponent, FeatureCardComponent, PhoneMockupComponent, ScreenProfilesComponent, GsapRevealDirective],
  template: `
    <section id="features" class="section section-y relative">
      <div aria-hidden="true" class="pointer-events-none absolute -z-10 inset-0 overflow-hidden">
        <div class="orb orb-teal absolute w-[420px] h-[420px] top-0 right-0 opacity-40"></div>
      </div>
      <div class="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
        <div class="flex justify-center order-2 lg:order-1">
          <app-phone-mockup width="clamp(250px, 28vw, 310px)">
            <app-screen-profiles />
          </app-phone-mockup>
        </div>
        <div class="flex flex-col gap-8 order-1 lg:order-2">
          <app-section-header
            [eyebrow]="i18n.t('family.eyebrow')"
            [title]="i18n.t('family.h2')"
            [lede]="i18n.t('family.sub')"
          />

          <div class="grid sm:grid-cols-2 gap-4" appReveal="fade-up" revealStagger=".family-card">
            <app-feature-card
              class="family-card"
              [title]="i18n.t('family.card.1.title')"
              [body]="i18n.t('family.card.1.body')"
            >
              <svg icon viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </app-feature-card>
            <app-feature-card
              class="family-card"
              [title]="i18n.t('family.card.2.title')"
              [body]="i18n.t('family.card.2.body')"
              iconBg="rgba(5,150,105,0.12)"
              iconColor="#047857"
            >
              <svg icon viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            </app-feature-card>
            <app-feature-card
              class="family-card sm:col-span-2"
              [title]="i18n.t('family.card.3.title')"
              [body]="i18n.t('family.card.3.body')"
              iconBg="rgba(245,158,11,0.15)"
              iconColor="#B45309"
            >
              <svg icon viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </app-feature-card>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class FamilySection {
  readonly i18n = inject(I18nService);
}
