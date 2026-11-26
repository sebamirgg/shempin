import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SITE_CONFIG } from '../../../core/config/contact.config';
import { IsotipoComponent, IsotipoDetail } from '../isotipo/isotipo.component';

/**
 * Logo Shempin (Ruta A · Repulgue).
 * - `stacked`: isotipo arriba, wordmark y bajada centrados (versión principal).
 * - `horizontal`: isotipo a la izquierda, como en la carta y la pizarra.
 * - `compact`: isotipo reducido + wordmark, para el header.
 * `tone="inverse"` es para fondos oscuros (carbón o ají).
 */
@Component({
  selector: 'app-logo',
  imports: [IsotipoComponent],
  template: `
    <span [class]="'logo logo--' + layout() + ' logo--' + tone()">
      <app-isotipo class="logo__mark" [detail]="detail()" [animated]="animated()" />
      <span class="logo__text">
        <span class="logo__word">shempin</span>
        @if (showTagline()) {
          <span class="logo__tagline">{{ tagline }}</span>
        }
      </span>
    </span>
  `,
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  readonly layout = input<'stacked' | 'horizontal' | 'compact'>('horizontal');
  readonly tone = input<'default' | 'inverse'>('default');
  readonly animated = input(false);

  protected readonly tagline = SITE_CONFIG.tagline;
  protected readonly showTagline = computed(() => this.layout() !== 'compact');
  protected readonly detail = computed<IsotipoDetail>(() =>
    this.layout() === 'compact' ? 'reduced' : 'full',
  );
}
