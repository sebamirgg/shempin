import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IsotipoComponent } from '../isotipo/isotipo.component';

let nextId = 0;

/**
 * Sello circular de Shempin (Ruta C): anillo dorado con texto, disco ají con el isotipo.
 * Decorativo (aria-hidden): úsalo junto a un texto que diga lo mismo.
 */
@Component({
  selector: 'app-seal',
  imports: [IsotipoComponent],
  template: `
    <svg class="seal__ring" viewBox="0 0 200 200" focusable="false">
      <defs>
        <path [attr.id]="pathId" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1-160 0" />
      </defs>
      <circle class="seal__outer" cx="100" cy="100" r="96" />
      <g class="seal__spin" [class.seal__spin--animated]="spin()">
        <text class="seal__text" textLength="498" lengthAdjust="spacing">
          <textPath [attr.href]="'#' + pathId">
            DUMPLINGS • EMPANADAS • CAFÉ • DUMPLINGS • EMPANADAS • CAFÉ •
          </textPath>
        </text>
      </g>
      <circle class="seal__inner" cx="100" cy="100" r="64" />
    </svg>
    <div class="seal__center">
      <app-isotipo class="seal__iso" [animated]="spin()" />
      <span class="seal__word">shempin</span>
      <span class="seal__since">{{ since() }}</span>
    </div>
  `,
  styleUrl: './seal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class SealComponent {
  readonly since = input('Desde 2027');
  /** Gira lentamente el anillo de texto (respeta prefers-reduced-motion). */
  readonly spin = input(false);

  protected readonly pathId = `seal-path-${nextId++}`;
}
