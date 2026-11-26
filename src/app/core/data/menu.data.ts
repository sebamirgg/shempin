import { MenuCategory, Product, ProductOption } from '../models/product.model';

// Fuente de verdad: src/resources/Menú impreso · carta.png (y la pizarra del carro).
// Todos los precios en CLP, IVA incluido.
// FOTOS REALES: completa `image` en cada producto (p. ej. '/images/menu/pino.webp' dentro de /public).

export const MENU_CATEGORIES: readonly MenuCategory[] = [
  {
    id: 'empanadas',
    label: 'Empanadas',
    kicker: 'Tamaño cóctel · de horno',
    tagline: 'Chiquititas, con masa casera y repulgue hecho a mano. Imposible comerse una sola.',
    sharedPricing: {
      heading: 'Por unidad o en porción de 3',
      subtitle: 'En la porción, elige y combina tus sabores.',
    },
  },
  {
    id: 'dumplings',
    label: 'Dumplings',
    kicker: '6 unidades · al vapor · con salsa',
    tagline: 'Plegados uno a uno y cocidos al vapor. Vienen con nuestra salsa de la casa.',
  },
  {
    id: 'bebestibles',
    label: 'Café',
    kicker: 'De especialidad · recién molido',
    tagline:
      'Grano de especialidad molido al momento, matcha batido a mano y algo helado para el calor.',
  },
  {
    id: 'dulces',
    label: 'Dulces',
    kicker: 'Por trozo · con café, $500 menos',
    tagline: 'Para cerrar con algo dulce. Si lo pides con un café, el trozo te sale $500 más barato.',
  },
];

/** Las empanadas cóctel comparten formatos y precio; en la porción los sabores se combinan libremente. */
const EMPANADA_OPTIONS: readonly ProductOption[] = [
  { label: 'Unidad', quantity: 1, price: 1700 },
  { label: 'Porción de 3', quantity: 3, price: 4500 },
];

const dumplingPortion = (price: number): readonly ProductOption[] => [
  { label: '6 unidades', quantity: 6, price },
];

const cup = (price: number): readonly ProductOption[] => [{ label: 'Taza', quantity: 1, price }];
const glass = (price: number): readonly ProductOption[] => [{ label: 'Vaso', quantity: 1, price }];
const slice = (price: number): readonly ProductOption[] => [{ label: 'Trozo', quantity: 1, price }];

export const MENU_PRODUCTS: readonly Product[] = [
  // Empanadas cóctel
  {
    id: 'empanada-pino',
    name: 'Pino',
    description: 'Carne, cebolla, huevo y aceituna. La de siempre, en tamaño cóctel.',
    category: 'empanadas',
    vegetarian: false,
    options: EMPANADA_OPTIONS,
  },
  {
    id: 'empanada-pollo-choclo',
    name: 'Pollo choclo',
    description: 'Pollo desmenuzado con choclo cremoso. Dorada y calentita.',
    category: 'empanadas',
    vegetarian: false,
    options: EMPANADA_OPTIONS,
  },
  {
    id: 'empanada-caprese',
    name: 'Caprese',
    description: 'Queso, tomate y albahaca. Simple y rica.',
    category: 'empanadas',
    vegetarian: true,
    options: EMPANADA_OPTIONS,
  },
  // Dumplings
  {
    id: 'dumpling-cerdo',
    name: 'Cerdo',
    description: 'Cerdo, cebollín y jengibre. El clásico que no falla.',
    category: 'dumplings',
    vegetarian: false,
    options: dumplingPortion(5500),
  },
  {
    id: 'dumpling-pollo',
    name: 'Pollo',
    description: 'Pollo, repollo y cebollín. Livianitos y llenos de sabor.',
    category: 'dumplings',
    vegetarian: false,
    options: dumplingPortion(5500),
  },
  {
    id: 'dumpling-verduras',
    name: 'Verduras',
    description: 'Repollo, zanahoria y champiñón. Pura huerta, cero carne.',
    category: 'dumplings',
    vegetarian: true,
    options: dumplingPortion(5000),
  },
  // Café
  {
    id: 'espresso-americano',
    name: 'Espresso / americano',
    description: 'Corto e intenso, o alargado para tomarlo con calma.',
    category: 'bebestibles',
    vegetarian: true,
    options: cup(2000),
  },
  {
    id: 'cappuccino-latte',
    name: 'Cappuccino / latte',
    description: 'Espresso con leche vaporizada: con harta espuma o más suavecito.',
    category: 'bebestibles',
    vegetarian: true,
    options: cup(2900),
  },
  {
    id: 'matcha-latte',
    name: 'Matcha latte',
    description: 'Matcha batido a mano con leche. Verde, suave y con energía tranquila.',
    category: 'bebestibles',
    vegetarian: true,
    options: cup(3500),
  },
  {
    id: 'bebida-fria',
    name: 'Bebida fría',
    description: 'Cold brew o limonada de la casa. Bien helada.',
    category: 'bebestibles',
    vegetarian: true,
    options: glass(2800),
  },
  // Dulces
  {
    id: 'cheesecake',
    name: 'Cheesecake',
    description: 'Receta de la casa. Cremoso, con base crocante.',
    category: 'dulces',
    vegetarian: true,
    options: slice(3500),
  },
  {
    id: 'kuchen',
    name: 'Kuchen de temporada',
    description: 'Con la fruta del mes, como en la casa de la abuela.',
    category: 'dulces',
    vegetarian: true,
    options: slice(3000),
  },
];
