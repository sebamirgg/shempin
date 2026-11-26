import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_CONFIG } from '../config/contact.config';

export interface SeoData {
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update({ title, description }: SeoData): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_CONFIG.name });
    this.meta.updateTag({ property: 'og:locale', content: 'es_CL' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: SITE_CONFIG.url });
    // Logo de marca sobre papel. Cuando haya una foto real (1200×630), reemplaza /public/og-image.png.
    const image = new URL('og-image.png', SITE_CONFIG.url).toString();
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Logo de Shempin: dumplings, empanadas y café' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }

  /** Inserta o actualiza un bloque JSON-LD en <head>. Funciona en SSR/prerender. */
  setJsonLd(id: string, data: object): void {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    // Escapa "<" para que el contenido no pueda cerrar el <script>.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }
}
