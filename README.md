# Shempin

Landing de **Shempin**, un carro móvil de dumplings, empanadas cóctel y café de especialidad. Abre en marzo de 2027.

Está hecha con Angular 21: componentes standalone, signals, SSR con prerender e hidratación incremental (`@defer`) para las secciones que quedan bajo el pliegue.

## Requisitos

- Node.js 20 o superior
- npm 11

```bash
npm install
```

## Scripts

| Comando                     | Qué hace                                                      |
| --------------------------- | ------------------------------------------------------------- |
| `npm start`                 | Servidor de desarrollo en `http://localhost:4200/`            |
| `npm run build`             | Build de producción con SSR y prerender en `dist/shempin/`    |
| `npm run watch`             | Build de desarrollo que se recompila al guardar               |
| `npm test`                  | Tests unitarios con [Vitest](https://vitest.dev/)             |
| `npm run serve:ssr:shempin` | Sirve el build SSR con Node (antes hay que correr `build`)    |

## Estructura

```
src/
├── app/
│   ├── core/
│   │   ├── config/      # Contacto, horario, tagline y URL del sitio (contact.config.ts)
│   │   ├── data/        # Carta (menu.data.ts) y combos (combos.data.ts)
│   │   ├── models/      # Tipos de producto y combo
│   │   ├── seo/         # JSON-LD FoodEstablishment
│   │   ├── services/    # MenuService y SeoService
│   │   └── utils/       # Cálculo de precios
│   ├── features/landing/
│   │   ├── layout/      # Header, footer y botón flotante de WhatsApp
│   │   └── sections/    # Hero, carta, combos, fidelización, historia, ubicación, próximamente
│   └── shared/
│       ├── components/  # Logo, isotipo, sello, tarjetas, divisor de repulgue, etc.
│       └── directives/  # reveal e in-viewport
├── resources/           # Referencias del sistema de marca (logo, carta, pizarra)
├── styles/              # Breakpoints y espaciado en SCSS
└── styles.scss          # Variables de color, tipografía y estilos base
public/                  # Favicons, íconos, manifest e imagen Open Graph
```

## Editar el contenido

Casi todo el contenido del sitio está en `src/app/core`, así que no hace falta tocar los componentes:

- **Contacto, horario y fecha de apertura**: `core/config/contact.config.ts`
- **Productos y precios**: `core/data/menu.data.ts`
- **Combos**: `core/data/combos.data.ts`

### Antes de publicar

En `contact.config.ts` hay valores de relleno que deben cambiarse:

- `whatsappNumber`: número real, en formato internacional sin `+` ni espacios (p. ej. `56912345678`)
- `instagramHandle`: usuario de Instagram sin `@`
- `SITE_CONFIG.url`: dominio definitivo

También conviene reemplazar las ilustraciones por fotos reales donde lo indican los comentarios `FOTO REAL` en las plantillas.

## Marca

El logo sigue la **Ruta A · Repulgue** del sistema de marca (ver `src/resources/`). Usa Bricolage Grotesque, que se carga desde Google Fonts. El componente `app-logo` tiene tres variantes:

- `horizontal`: isotipo a la izquierda (hero y footer)
- `stacked`: isotipo arriba, centrado
- `compact`: versión reducida para el header

Para fondos oscuros se usa `tone="inverse"`.
