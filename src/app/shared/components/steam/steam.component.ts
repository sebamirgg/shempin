import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Vapor animado (decorativo). Toma el color de `currentColor`;
 * el tamaño se controla con el ancho del host.
 */
@Component({
  selector: 'app-steam',
  template: `
    <svg viewBox="0 0 60 80" aria-hidden="true" focusable="false">
      <path class="wisp wisp--1" d="M16 76c-8-10 8-18 0-30s8-20 0-32" />
      <path class="wisp wisp--2" d="M30 76c-8-10 8-18 0-30s8-20 0-32" />
      <path class="wisp wisp--3" d="M44 76c-8-10 8-18 0-30s8-20 0-32" />
    </svg>
  `,
  styleUrl: './steam.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class SteamComponent {}
