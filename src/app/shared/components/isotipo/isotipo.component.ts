import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Nivel de detalle según el tamaño, como indica el sistema de marca (Ruta A · Repulgue):
 * - `full`: vapor + todos los pliegues (64 px o más).
 * - `reduced`: sin vapor ni pliegues laterales (entre 32 y 64 px).
 * - `silhouette`: solo la silueta (menos de 32 px).
 */
export type IsotipoDetail = 'full' | 'reduced' | 'silhouette';

/**
 * Isotipo de Shempin: la masa dorada con repulgue (empanada + dumpling).
 * Decorativo: el nombre accesible lo da siempre el texto que lo acompaña.
 */
@Component({
  selector: 'app-isotipo',
  template: `
    <svg [attr.viewBox]="viewBox()" focusable="false">
      @if (detail() === 'full') {
        <g class="iso__steam" [class.iso__steam--animated]="animated()">
          <path class="iso__wisp iso__wisp--1" d="M37.5-6c-3-4 2-7.5 0-11.5s2-6.5 0-9" />
          <path class="iso__wisp iso__wisp--2" d="M50-9c-3-4 2-8 0-12s2-7 0-10" />
          <path class="iso__wisp iso__wisp--3" d="M62.5-6c-3-4 2-7.5 0-11.5s2-6.5 0-9" />
        </g>
      }
      <path
        class="iso__body"
        d="M4.2 50A9 9 0 0 1 8.3 33.3A9 9 0 0 1 18.8 19.8A9.5 9.5 0 0 1 32.3 8.3A10 10 0 0 1 50 3.1A10 10 0 0 1 67.7 8.3A9.5 9.5 0 0 1 81.2 19.8A9 9 0 0 1 91.7 33.3A9 9 0 0 1 95.8 50Q50 70 4.2 50Z"
      />
      @if (detail() !== 'silhouette') {
        <path
          class="iso__pleat"
          d="M32.3 8.3l5.2 12.5M50 3.1v14.6M67.7 8.3l-5.2 12.5M18.8 19.8l8.2 7.7M81.2 19.8L73 27.5"
        />
        @if (detail() === 'full') {
          <path class="iso__pleat" d="M8.3 33.3l12.1 5.2M91.7 33.3l-12.1 5.2" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      width: 4rem;
      color: var(--iso-stroke, var(--color-carbon));
      line-height: 0;
    }
    svg {
      width: 100%;
      height: auto;
      overflow: visible;
    }
    .iso__body {
      fill: var(--iso-fill, var(--color-dorado));
      stroke: currentColor;
      stroke-width: 3.6;
      stroke-linejoin: round;
    }
    .iso__pleat,
    .iso__wisp {
      fill: none;
      stroke: currentColor;
      stroke-width: 3.4;
      stroke-linecap: round;
    }
    .iso__wisp {
      stroke: var(--iso-steam, currentColor);
    }
    .iso__steam--animated .iso__wisp {
      transform-box: fill-box;
      transform-origin: bottom center;
      animation: iso-rise 3s ease-in-out infinite;
    }
    .iso__steam--animated .iso__wisp--2 {
      animation-delay: 0.6s;
    }
    .iso__steam--animated .iso__wisp--3 {
      animation-delay: 1.2s;
    }
    @keyframes iso-rise {
      0%,
      100% {
        opacity: 1;
        transform: translateY(0);
      }
      50% {
        opacity: 0.45;
        transform: translateY(-3px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .iso__steam--animated .iso__wisp {
        animation: none;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class IsotipoComponent {
  readonly detail = input<IsotipoDetail>('full');
  /** Vapor que sube suave (respeta prefers-reduced-motion). */
  readonly animated = input(false);

  protected readonly viewBox = computed(() =>
    this.detail() === 'full' ? '-4 -36 108 100' : '-4 -2 108 66',
  );
}
