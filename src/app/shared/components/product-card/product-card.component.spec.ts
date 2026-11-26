import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Product } from '../../../core/models/product.model';
import { ProductCardComponent } from './product-card.component';

registerLocaleData(localeEsCl);

const base: Product = {
  id: 'dumpling-verduras',
  name: 'Verduras',
  description: 'Pura huerta.',
  category: 'dumplings',
  vegetarian: true,
  options: [{ label: 'Porción de 6', quantity: 6, price: 5000 }],
};

function render(product: Product, showPrice = true): HTMLElement {
  const fixture = TestBed.createComponent(ProductCardComponent);
  fixture.componentRef.setInput('product', product);
  fixture.componentRef.setInput('showPrice', showPrice);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

const clean = (text: string | null | undefined) => (text ?? '').replace(/\s/g, '');

describe('ProductCardComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
    });
  });

  it('formats every option in CLP without decimals', () => {
    const el = render({
      ...base,
      options: [
        { label: 'Unidad', quantity: 1, price: 1700 },
        { label: 'Porción de 3', quantity: 3, price: 4500 },
      ],
    });
    const prices = [...el.querySelectorAll('.card__price')].map((p) => clean(p.textContent));
    expect(prices).toEqual(['$1.700', '$4.500']);
  });

  it('hides prices when showPrice is false', () => {
    expect(render(base, false).querySelector('.card__price')).toBeNull();
  });

  it('shows the vegetarian badge only when it applies', () => {
    expect(render(base).querySelector('.card__badge')?.textContent).toContain('Vegetariano');
    expect(render({ ...base, vegetarian: false }).querySelector('.card__badge')).toBeNull();
  });
});
