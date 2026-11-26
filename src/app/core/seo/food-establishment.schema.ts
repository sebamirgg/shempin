import { BUSINESS_CONFIG, INSTAGRAM_URL, SITE_CONFIG } from '../config/contact.config';
import { Combo } from '../models/combo.model';
import { MenuCategory, Product, ProductCategory } from '../models/product.model';

interface SchemaInput {
  description: string;
  categories: readonly MenuCategory[];
  productsByCategory: Record<ProductCategory, readonly Product[]>;
  combos: readonly Combo[];
}

const offer = (name: string, price: number) => ({
  '@type': 'Offer',
  name,
  price,
  priceCurrency: 'CLP',
});

/**
 * JSON-LD FoodEstablishment con el menú completo y el horario.
 * Intencionalmente SIN `address`: el carro es móvil.
 */
export function buildFoodEstablishmentSchema(input: SchemaInput): object {
  const sections = input.categories.map((category) => ({
    '@type': 'MenuSection',
    name: category.label,
    description: category.tagline,
    hasMenuItem: input.productsByCategory[category.id].map((product) => ({
      '@type': 'MenuItem',
      name: product.name,
      description: product.description,
      ...(product.vegetarian && { suitableForDiet: 'https://schema.org/VegetarianDiet' }),
      offers: product.options.map((option) => offer(option.label, option.price)),
    })),
  }));

  const combos = {
    '@type': 'MenuSection',
    name: 'Combos',
    hasMenuItem: input.combos.map((combo) => ({
      '@type': 'MenuItem',
      name: combo.name,
      description: `${combo.description} Incluye: ${combo.items.map((i) => i.label).join(', ')}.`,
      offers: offer(combo.name, combo.price),
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: SITE_CONFIG.name,
    description: input.description,
    url: SITE_CONFIG.url,
    servesCuisine: ['Dumplings', 'Empanadas', 'Café de especialidad', 'Postres'],
    currenciesAccepted: 'CLP',
    paymentAccepted: 'Efectivo, tarjetas',
    logo: new URL('icon.svg', SITE_CONFIG.url).toString(),
    sameAs: [INSTAGRAM_URL],
    openingHoursSpecification: BUSINESS_CONFIG.openingHours
      .filter((slot) => slot.opens && slot.closes)
      .map((slot) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: slot.schemaDays,
        opens: slot.opens,
        closes: slot.closes,
      })),
    hasMenu: {
      '@type': 'Menu',
      name: `Menú ${SITE_CONFIG.name}`,
      hasMenuSection: [...sections, combos],
    },
  };
}
