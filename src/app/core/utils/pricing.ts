import { Combo } from '../models/combo.model';
import { Product, ProductOption } from '../models/product.model';

/**
 * Precio más bajo para comprar exactamente `quantity` unidades combinando los formatos disponibles.
 * Devuelve `null` si no hay combinación posible.
 */
export function cheapestPrice(options: readonly ProductOption[], quantity: number): number | null {
  if (quantity <= 0 || !Number.isInteger(quantity)) return null;

  const best: number[] = new Array(quantity + 1).fill(Infinity);
  best[0] = 0;
  for (let q = 1; q <= quantity; q++) {
    for (const option of options) {
      if (option.quantity <= q && best[q - option.quantity] + option.price < best[q]) {
        best[q] = best[q - option.quantity] + option.price;
      }
    }
  }
  return Number.isFinite(best[quantity]) ? best[quantity] : null;
}

/** Ahorro de un formato frente a comprar la misma cantidad en unidades sueltas. `null` si no aplica o no es positivo. */
export function savingsVsUnits(
  options: readonly ProductOption[],
  option: ProductOption,
): number | null {
  const unit = options.find((o) => o.quantity === 1);
  if (!unit || option.quantity <= 1) return null;
  const savings = unit.price * option.quantity - option.price;
  return savings > 0 ? savings : null;
}

export interface PriceRange {
  min: number;
  max: number;
}

/**
 * Rango de lo que costaría el combo comprando cada ítem por separado
 * (min/max según la variedad que elija el cliente). `null` si algún ítem no se puede comparar.
 */
export function separatePriceRange(
  combo: Combo,
  productsById: ReadonlyMap<string, Product>,
): PriceRange | null {
  let min = 0;
  let max = 0;
  for (const item of combo.items) {
    if (!item.productIds?.length) return null;

    const prices: number[] = [];
    for (const id of item.productIds) {
      const product = productsById.get(id);
      const price = product ? cheapestPrice(product.options, item.quantity) : null;
      if (price === null) return null;
      prices.push(price);
    }
    min += Math.min(...prices);
    max += Math.max(...prices);
  }
  return { min, max };
}

export interface ComboSavings {
  amount: number;
  /** true si el ahorro depende de la variedad elegida ("Ahorras hasta"). */
  upTo: boolean;
}

/** Ahorro del combo frente a comprar por separado. `null` si no es positivo o no se puede calcular. */
export function comboSavings(
  combo: Combo,
  productsById: ReadonlyMap<string, Product>,
): ComboSavings | null {
  const range = separatePriceRange(combo, productsById);
  if (!range) return null;

  const guaranteed = range.min - combo.price;
  if (guaranteed > 0) return { amount: guaranteed, upTo: range.max !== range.min };

  const best = range.max - combo.price;
  return best > 0 ? { amount: best, upTo: true } : null;
}
