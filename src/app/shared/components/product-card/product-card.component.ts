import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import {
  FoodIllustrationComponent,
  foodKindFor,
} from '../food-illustration/food-illustration.component';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, NgOptimizedImage, FoodIllustrationComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  /** false cuando el precio ya se muestra a nivel de categoría (p. ej. empanadas). */
  readonly showPrice = input(true);

  protected readonly isDrink = computed(() => this.product().category === 'bebestibles');
  /** El badge se reserva para la comida, donde sí es un dato útil. */
  protected readonly showVegBadge = computed(() => this.product().vegetarian && !this.isDrink());
  protected readonly illustration = computed(() =>
    foodKindFor(this.product().category, this.product().id),
  );
}
