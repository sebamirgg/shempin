import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, output } from '@angular/core';

/**
 * Emite `true`/`false` cada vez que el elemento entra o sale del viewport.
 * Solo en el navegador (seguro con SSR).
 *
 * Uso: <app-footer appInViewport (inViewportChange)="visible.set($event)" />
 */
@Directive({ selector: '[appInViewport]' })
export class InViewportDirective {
  readonly appInViewportThreshold = input(0);
  readonly inViewportChange = output<boolean>();

  constructor() {
    const el: HTMLElement = inject(ElementRef).nativeElement;
    let observer: IntersectionObserver | undefined;
    inject(DestroyRef).onDestroy(() => observer?.disconnect());

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      observer = new IntersectionObserver(
        ([entry]) => this.inViewportChange.emit(entry.isIntersecting),
        { threshold: this.appInViewportThreshold() },
      );
      observer.observe(el);
    });
  }
}
