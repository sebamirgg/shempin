import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ProductOption } from '../../../../../core/models/product.model';
import { savingsVsUnits } from '../../../../../core/utils/pricing';

/** Bloque destacado con los formatos compartidos de una categoría (p. ej. empanadas cóctel). */
@Component({
  selector: 'app-portion-highlight',
  imports: [CurrencyPipe],
  template: `
    <div class="highlight">
      <div>
        <h3 class="highlight__title">{{ heading() }}</h3>
        @if (subtitle()) {
          <p class="highlight__subtitle">{{ subtitle() }}</p>
        }
      </div>
      <ul class="highlight__prices">
        @for (row of rows(); track row.label) {
          <li class="highlight__row">
            @if (rows().length > 1) {
              <span class="highlight__label">{{ row.label }}</span>
            } @else {
              <span class="visually-hidden">{{ row.label }}:</span>
            }
            <span class="highlight__price">{{ row.price | currency: 'CLP' : 'symbol-narrow' : '1.0-0' }}</span>
            @if (row.savings; as savings) {
              <span class="highlight__badge">
                Ahorras {{ savings | currency: 'CLP' : 'symbol-narrow' : '1.0-0' }}
                <span class="visually-hidden">frente a {{ row.quantity }} unidades sueltas</span>
              </span>
            }
          </li>
        }
      </ul>
    </div>
  `,
  styleUrl: './portion-highlight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortionHighlightComponent {
  readonly heading = input.required<string>();
  readonly subtitle = input<string>();
  readonly options = input.required<readonly ProductOption[]>();

  /** El ahorro se calcula desde los datos, nunca a mano (solo aparece si existe precio por unidad). */
  protected readonly rows = computed(() =>
    this.options().map((option) => ({
      ...option,
      savings: savingsVsUnits(this.options(), option),
    })),
  );
}
