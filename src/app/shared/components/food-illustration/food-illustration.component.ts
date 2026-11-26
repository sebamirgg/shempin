import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductCategory } from '../../../core/models/product.model';

export type FoodKind =
  | 'dumpling'
  | 'empanada'
  | 'cafe'
  | 'matcha'
  | 'frio'
  | 'cheesecake'
  | 'kuchen';

/** Elige la ilustración adecuada para una categoría (y, en café y dulces, el producto). */
export function foodKindFor(category: ProductCategory, productId?: string): FoodKind {
  switch (category) {
    case 'dumplings':
      return 'dumpling';
    case 'empanadas':
      return 'empanada';
    case 'bebestibles':
      if (productId === 'matcha-latte') return 'matcha';
      if (productId === 'bebida-fria') return 'frio';
      return 'cafe';
    case 'dulces':
      return productId === 'kuchen' ? 'kuchen' : 'cheesecake';
  }
}

/**
 * Ilustraciones SVG simples y decorativas (aria-hidden).
 * Se usan mientras no haya fotos reales.
 */
@Component({
  selector: 'app-food-illustration',
  templateUrl: './food-illustration.component.html',
  styleUrl: './food-illustration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class FoodIllustrationComponent {
  readonly kind = input.required<FoodKind>();
}
