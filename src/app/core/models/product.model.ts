export type ProductCategory = 'empanadas' | 'dumplings' | 'bebestibles' | 'dulces';

/** Formato de venta. Precios en CLP con IVA incluido. */
export interface ProductOption {
  label: string;
  /** Unidades que incluye el formato (1 = unidad suelta). */
  quantity: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  vegetarian: boolean;
  /** Siempre al menos un formato; product-card usa una sola lógica para todos. */
  options: readonly ProductOption[];
  /** Ruta a la foto real del producto (p. ej. `/images/menu/pino.webp`). Sin foto se usa una ilustración SVG. */
  image?: string;
}

export interface MenuCategory {
  id: ProductCategory;
  /** Nombre corto, como en la carta impresa ("Empanadas", "Café"…). */
  label: string;
  /** Línea en mayúsculas espaciadas bajo el nombre, igual que en la carta ("Tamaño cóctel · de horno"). */
  kicker: string;
  tagline: string;
  /**
   * Si está definido, todas las variedades de la categoría comparten precio:
   * se muestra un bloque destacado con los formatos y las tarjetas no repiten el precio.
   */
  sharedPricing?: { heading: string; subtitle?: string };
}
