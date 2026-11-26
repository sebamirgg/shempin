import { COMBOS } from '../data/combos.data';
import { MENU_PRODUCTS } from '../data/menu.data';
import { ProductOption } from '../models/product.model';
import { cheapestPrice, comboSavings, savingsVsUnits } from './pricing';

const empanada: ProductOption[] = [
  { label: 'Unidad', quantity: 1, price: 1700 },
  { label: 'Porción de 3', quantity: 3, price: 4500 },
];
const byId = new Map(MENU_PRODUCTS.map((p) => [p.id, p]));
const combo = (id: string) => COMBOS.find((c) => c.id === id)!;

describe('pricing', () => {
  it('cheapestPrice combines formats', () => {
    expect(cheapestPrice(empanada, 1)).toBe(1700);
    expect(cheapestPrice(empanada, 3)).toBe(4500);
    expect(cheapestPrice(empanada, 4)).toBe(6200);
    expect(cheapestPrice([{ label: '6', quantity: 6, price: 5500 }], 4)).toBeNull();
  });

  it('savingsVsUnits: porción de 3 empanadas ahorra $600', () => {
    expect(savingsVsUnits(empanada, empanada[1])).toBe(600);
    expect(savingsVsUnits(empanada, empanada[0])).toBeNull();
  });

  it('Once Shempin: ahorro fijo de $500 (4.500 + 2.900 − 6.900)', () => {
    expect(comboSavings(combo('once-shempin'), byId)).toEqual({ amount: 500, upTo: false });
  });

  it('Cena Shempin: "hasta $500" porque depende del sabor de dumpling', () => {
    expect(comboSavings(combo('cena-shempin'), byId)).toEqual({ amount: 500, upTo: true });
  });

  it('Pack congelado: sin ahorro calculable', () => {
    expect(comboSavings(combo('pack-congelado'), byId)).toBeNull();
  });

  it('no savings badge when the combo is not cheaper', () => {
    expect(comboSavings({ ...combo('once-shempin'), price: 99999 }, byId)).toBeNull();
  });
});
