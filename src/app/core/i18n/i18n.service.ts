import { Injectable, signal, computed, effect } from '@angular/core';
import type { Locale, Dict } from './i18n.types';
import { es } from './dictionaries/es';
import { en } from './dictionaries/en';

const STORAGE_KEY = 'pulseo.locale';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly dicts: Record<Locale, Dict> = { es, en };

  readonly locale = signal<Locale>(this.resolveInitialLocale());
  readonly isES = computed(() => this.locale() === 'es');

  constructor() {
    effect(() => {
      const l = this.locale();
      if (typeof document !== 'undefined') {
        document.documentElement.lang = l;
      }
    });
  }

  t = (key: string): string => {
    const dict = this.dicts[this.locale()];
    return dict[key] ?? this.dicts.es[key] ?? key;
  };

  setLocale(l: Locale) {
    this.locale.set(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }

  toggle() {
    this.setLocale(this.locale() === 'es' ? 'en' : 'es');
  }

  private resolveInitialLocale(): Locale {
    if (typeof window === 'undefined') return 'es';
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored === 'es' || stored === 'en') return stored;
    } catch {}
    const nav = navigator.language?.toLowerCase() ?? 'es';
    return nav.startsWith('en') ? 'en' : 'es';
  }
}
