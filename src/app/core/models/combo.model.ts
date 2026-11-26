import { ProductCategory } from './product.model';

export interface ComboItem {
  /** Texto que ve el cliente, p. ej. "Porción de 3 empanadas cóctel a elección". */
  label: string;
  quantity: number;
  category: ProductCategory;
  /**
   * Productos de menu.data.ts que pueden ir en este ítem (si hay varios, el cliente elige).
   * Sin `productIds` el ítem no tiene equivalente en el menú y el ahorro no se calcula.
   */
  productIds?: readonly string[];
}

export interface Combo {
  id: string;
  name: string;
  /** Resumen corto, como en la carta ("3 empanadas + latte"). */
  summary: string;
  description: string;
  /** CLP con IVA incluido. */
  price: number;
  items: readonly ComboItem[];
  /** Etiqueta corta opcional, p. ej. "Congelado". */
  note?: string;
  /** Si existe, la tarjeta muestra un botón para pedirlo por WhatsApp con este mensaje. */
  orderMessage?: string;
}
