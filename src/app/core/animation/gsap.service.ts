import { Injectable } from '@angular/core';

let _gsap: typeof import('gsap').gsap | null = null;
let _ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null;
let _loading: Promise<void> | null = null;

@Injectable({ providedIn: 'root' })
export class GsapService {
  async load(): Promise<{
    gsap: typeof import('gsap').gsap;
    ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
  }> {
    if (_gsap && _ScrollTrigger) {
      return { gsap: _gsap, ScrollTrigger: _ScrollTrigger };
    }
    if (!_loading) {
      _loading = (async () => {
        const gsapMod = await import('gsap');
        const stMod = await import('gsap/ScrollTrigger');
        _gsap = gsapMod.gsap;
        _ScrollTrigger = stMod.ScrollTrigger;
        _gsap.registerPlugin(_ScrollTrigger);
      })();
    }
    await _loading;
    return { gsap: _gsap!, ScrollTrigger: _ScrollTrigger! };
  }

  prefersReducedMotion(): boolean {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
