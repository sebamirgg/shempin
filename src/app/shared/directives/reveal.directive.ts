import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Fade-in al entrar al viewport. Solo actúa en el navegador (seguro con SSR)
 * y no hace nada si el usuario prefiere movimiento reducido.
 *
 * Uso: <div appReveal [appRevealDelay]="120">…</div>
 */
@Directive({ selector: '[appReveal]' })
export class RevealDirective {
  readonly appRevealDelay = input(0);

  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    let observer: IntersectionObserver | undefined;
    inject(DestroyRef).onDestroy(() => observer?.disconnect());

    afterNextRender(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion || typeof IntersectionObserver === 'undefined') return;

      el.style.setProperty('--reveal-delay', `${this.appRevealDelay()}ms`);
      el.classList.add('reveal');

      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            el.classList.add('is-visible');
            observer?.disconnect();
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      );
      observer.observe(el);
    });
  }
}
