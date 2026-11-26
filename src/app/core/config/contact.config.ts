/**
 * Datos de contacto y del negocio, centralizados.
 * Shempin es un carro MÓVIL: no se publica una dirección fija, pero sí un horario estable.
 * TODO: reemplazar los valores marcados como placeholder antes de publicar.
 */
export const CONTACT_CONFIG = {
  /** Placeholder. Formato internacional sin "+" ni espacios. */
  whatsappNumber: '56900000000',
  whatsappMessage: '¡Hola Shempin! ¿Dónde van a estar esta semana?',
  /** Placeholder. Usuario de Instagram sin "@". */
  instagramHandle: 'shempin',
} as const;

/** Día de la semana en formato schema.org. */
export type SchemaDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface OpeningHours {
  /** Texto como en la carta, p. ej. "Mar a vie". */
  days: string;
  /** Texto visible, p. ej. "16:00–21:30" o "Cerrado". */
  hours: string;
  /** Para JSON-LD. Sin `opens`/`closes` = cerrado. */
  schemaDays: readonly SchemaDay[];
  opens?: string;
  closes?: string;
}

export interface BusinessConfig {
  opening: string;
  openingIso: string;
  /** Sin uso: el carro rota de punto. Se deja opcional por si algún día hay un local fijo. */
  address?: string;
  openingHours: readonly OpeningHours[];
  /** Línea legal/práctica que acompaña los precios (carta y pizarra). */
  priceNote: string;
}

export const BUSINESS_CONFIG: BusinessConfig = {
  opening: 'marzo 2027',
  openingIso: '2027-03',
  openingHours: [
    {
      days: 'Mar a vie',
      hours: '16:00–21:30',
      schemaDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '16:00',
      closes: '21:30',
    },
    {
      days: 'Sáb y dom',
      hours: '12:00–21:30',
      schemaDays: ['Saturday', 'Sunday'],
      opens: '12:00',
      closes: '21:30',
    },
    { days: 'Lunes', hours: 'Cerrado', schemaDays: ['Monday'] },
  ],
  priceNote: 'Precios con IVA incluido · Aceptamos tarjetas',
};

export const LOYALTY_CONFIG = {
  /** El café número N va por la casa. */
  stampsForFreeCoffee: 8,
} as const;

export const SITE_CONFIG = {
  name: 'Shempin',
  tagline: 'Dumplings · Empanadas & Café',
  /** Placeholder: dominio definitivo. */
  url: 'https://shempin.cl/',
} as const;

export const WHATSAPP_URL = `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
  CONTACT_CONFIG.whatsappMessage,
)}`;

/** Enlace de WhatsApp con un mensaje específico (p. ej. pedir el pack congelado). */
export const whatsappUrlFor = (message: string): string =>
  `https://wa.me/${CONTACT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const INSTAGRAM_URL = `https://www.instagram.com/${CONTACT_CONFIG.instagramHandle}/`;
