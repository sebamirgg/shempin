import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    service = TestBed.inject(MenuService);
  });

  it('exposes the categories in the same order as the printed menu', () => {
    expect(service.categories().map((c) => c.id)).toEqual([
      'empanadas',
      'dumplings',
      'bebestibles',
      'dulces',
    ]);
  });

  it('matches the printed menu prices', () => {
    const price = (id: string) => service.productsById().get(id)?.options[0].price;
    expect(price('empanada-pino')).toBe(1700);
    expect(price('dumpling-cerdo')).toBe(5500);
    expect(price('dumpling-verduras')).toBe(5000);
    expect(price('espresso-americano')).toBe(2000);
    expect(price('cappuccino-latte')).toBe(2900);
    expect(price('matcha-latte')).toBe(3500);
    expect(price('bebida-fria')).toBe(2800);
    expect(price('cheesecake')).toBe(3500);
    expect(price('kuchen')).toBe(3000);
  });

  it('groups products by category', () => {
    const grouped = service.productsByCategory();
    expect(grouped.dumplings.map((p) => p.name)).toEqual(['Cerdo', 'Pollo', 'Verduras']);
    expect(grouped.empanadas.map((p) => p.name)).toEqual(['Pino', 'Pollo choclo', 'Caprese']);
    expect(grouped.bebestibles.every((p) => p.category === 'bebestibles')).toBe(true);
    expect(grouped.dulces.map((p) => p.name)).toEqual(['Cheesecake', 'Kuchen de temporada']);
  });

  it('every product has at least one sale option', () => {
    for (const product of service.productsById().values()) {
      expect(product.options.length).toBeGreaterThan(0);
    }
  });

  it('exposes shared options only for categories with sharedPricing', () => {
    const shared = service.sharedOptions();
    expect(shared.empanadas.map((o) => o.price)).toEqual([1700, 4500]);
    expect(shared.dumplings).toEqual([]);
  });

  it('empanada flavors really share the same price', () => {
    const prices = service.productsByCategory().empanadas.map((p) => JSON.stringify(p.options));
    expect(new Set(prices).size).toBe(1);
  });

  it('combos reference existing products', () => {
    const ids = service.productsById();
    for (const combo of service.combos()) {
      for (const item of combo.items) {
        for (const id of item.productIds ?? []) expect(ids.has(id)).toBe(true);
      }
    }
  });
});
