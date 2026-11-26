import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { whatsappUrlFor } from '../../../core/config/contact.config';
import { Combo } from '../../../core/models/combo.model';
import { MenuService } from '../../../core/services/menu.service';
import { comboSavings } from '../../../core/utils/pricing';
import { ButtonComponent } from '../button/button.component';
import {
  FoodIllustrationComponent,
  foodKindFor,
} from '../food-illustration/food-illustration.component';

@Component({
  selector: 'app-combo-card',
  imports: [CurrencyPipe, FoodIllustrationComponent, ButtonComponent],
  templateUrl: './combo-card.component.html',
  styleUrl: './combo-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboCardComponent {
  private readonly menu = inject(MenuService);

  readonly combo = input.required<Combo>();

  /** Ahorro frente a comprar por separado, calculado desde menu.data. `null` → sin badge. */
  protected readonly savings = computed(() => comboSavings(this.combo(), this.menu.productsById()));

  protected readonly illustrations = computed(() =>
    this.combo().items.map((item) => foodKindFor(item.category, item.productIds?.[0])),
  );

  protected readonly orderUrl = computed(() => {
    const message = this.combo().orderMessage;
    return message ? whatsappUrlFor(message) : null;
  });
}
