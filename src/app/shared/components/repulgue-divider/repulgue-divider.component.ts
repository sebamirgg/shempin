import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BrandTone = 'papel' | 'papel-tostado' | 'aji' | 'dorado' | 'carbon';

let nextId = 0;

/**
 * Separador con borde ondulado tipo repulgue: las "ondas" tienen el color de la
 * sección de arriba (`top`) y cuelgan sobre el color de la sección de abajo (`bottom`).
 */
@Component({
  selector: 'app-repulgue-divider',
  template: `
    <svg class="divider" width="100%" height="28" aria-hidden="true" focusable="false">
      <defs>
        <pattern [attr.id]="patternId" width="32" height="28" patternUnits="userSpaceOnUse">
          <path class="divider__fold" d="M0 0H32V6A16 15 0 0 1 0 6Z" />
          <path class="divider__pleat" d="M9 9l2 7M16 10v8M23 9l-2 7" />
        </pattern>
      </defs>
      <rect width="100%" height="28" [attr.fill]="'url(#' + patternId + ')'" />
    </svg>
  `,
  styleUrl: './repulgue-divider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'aria-hidden': 'true',
    '[style.--divider-top]': "'var(--color-' + top() + ')'",
    '[style.--divider-bottom]': "'var(--color-' + bottom() + ')'",
  },
})
export class RepulgueDividerComponent {
  readonly top = input<BrandTone>('papel');
  readonly bottom = input<BrandTone>('papel-tostado');

  protected readonly patternId = `repulgue-${nextId++}`;
}
