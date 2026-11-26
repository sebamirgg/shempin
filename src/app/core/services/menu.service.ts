import { Injectable, computed, signal } from '@angular/core';
import { COMBOS } from '../data/combos.data';
import { MENU_CATEGORIES, MENU_PRODUCTS } from '../data/menu.data';
import { Combo } from '../models/combo.model';
import { MenuCategory, Product, ProductCategory, ProductOption } from '../models/product.model';

const emptyByCategory = <T>(): Record<ProductCategory, T[]> => ({
  empanadas: [],
  dumplings: [],
  bebestibles: [],
  dulces: [],
});

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly products = signal<readonly Product[]>(MENU_PRODUCTS);

  readonly categories = signal<readonly MenuCategory[]>(MENU_CATEGORIES).asReadonly();
  readonly combos = signal<readonly Combo[]>(COMBOS).asReadonly();

  readonly productsById = computed(
    () => new Map(this.products().map((product) => [product.id, product] as const)),
  );

  /** Productos agrupados por categoría. */
  readonly productsByCategory = computed(() => {
    const grouped = emptyByCategory<Product>();
    for (const product of this.products()) {
      grouped[product.category].push(product);
    }
    return grouped;
  });

  /**
   * Formatos comunes de las categorías con `sharedPricing` (se toman del primer producto;
   * por definición todas las variedades comparten precio). Vacío en las demás.
   */
  readonly sharedOptions = computed(() => {
    const byCategory = this.productsByCategory();
    const shared: Record<ProductCategory, readonly ProductOption[]> = emptyByCategory();
    for (const category of this.categories()) {
      if (category.sharedPricing) {
        shared[category.id] = byCategory[category.id][0]?.options ?? [];
      }
    }
    return shared;
  });
}
