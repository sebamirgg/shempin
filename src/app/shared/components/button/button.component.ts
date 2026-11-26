import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'whatsapp';

/**
 * Botón de marca aplicado como atributo para conservar la semántica nativa:
 *   <a appButton href="#menu">Ver menú</a>
 *   <a appButton="whatsapp" [href]="url">Escríbenos</a>
 *   <button appButton="secondary" type="button">…</button>
 */
@Component({
  selector: 'a[appButton], button[appButton]',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
  },
})
export class ButtonComponent {
  readonly appButton = input<ButtonVariant, ButtonVariant | ''>('primary', {
    transform: (value) => value || 'primary',
  });

  protected readonly hostClass = computed(() => `btn btn--${this.appButton()}`);
}
