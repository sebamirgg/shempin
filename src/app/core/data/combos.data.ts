import { Combo } from '../models/combo.model';

// Precios en CLP, IVA incluido. Los `productIds` apuntan a menu.data.ts y se usan para calcular el ahorro.
export const COMBOS: readonly Combo[] = [
  {
    id: 'once-shempin',
    name: 'Once Shempin',
    summary: '3 empanadas + latte',
    description: 'Para la once como corresponde: empanaditas recién hechas y un latte calentito.',
    price: 6900,
    items: [
      {
        label: 'Porción de 3 empanadas cóctel a elección',
        quantity: 3,
        category: 'empanadas',
        productIds: ['empanada-pino', 'empanada-pollo-choclo', 'empanada-caprese'],
      },
      { label: 'Latte', quantity: 1, category: 'bebestibles', productIds: ['cappuccino-latte'] },
    ],
  },
  {
    id: 'cena-shempin',
    name: 'Cena Shempin',
    summary: '6 dumplings + bebida fría',
    description: 'Seis dumplings del sabor que quieras y algo heladito para acompañar.',
    price: 7800,
    items: [
      {
        label: '6 dumplings a elección',
        quantity: 6,
        category: 'dumplings',
        productIds: ['dumpling-cerdo', 'dumpling-pollo', 'dumpling-verduras'],
      },
      { label: 'Bebida fría', quantity: 1, category: 'bebestibles', productIds: ['bebida-fria'] },
    ],
  },
  {
    id: 'pack-congelado',
    name: 'Para la casa',
    summary: '24 dumplings congelados',
    description: 'Del freezer a la olla en minutos. Pídelo por WhatsApp y tenlo siempre a mano.',
    price: 16000,
    note: 'Congelado',
    orderMessage: '¡Hola Shempin! Quiero pedir un pack congelado de 24 dumplings.',
    items: [
      // Congelados: no tienen equivalente en el menú servido, así que no se calcula ahorro.
      { label: '24 dumplings congelados', quantity: 24, category: 'dumplings' },
    ],
  },
];
