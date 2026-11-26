import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { COMBOS } from '../../../core/data/combos.data';
import { ComboCardComponent } from './combo-card.component';

registerLocaleData(localeEsCl);

function render(id: string): HTMLElement {
  const fixture = TestBed.createComponent(ComboCardComponent);
  fixture.componentRef.setInput('combo', COMBOS.find((c) => c.id === id)!);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('ComboCardComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComboCardComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'es-CL' }],
    });
  });

  it('lists what the combo includes and its price', () => {
    const el = render('once-shempin');
    expect(el.querySelectorAll('.combo__includes li').length).toBe(2);
    expect(el.querySelector('.combo__price')?.textContent?.replace(/\s/g, '')).toBe('$6.900');
  });

  it('shows the computed savings badge', () => {
    expect(render('once-shempin').querySelector('.combo__savings')?.textContent).toMatch(/Ahorras\s+\$500/);
    expect(render('cena-shempin').querySelector('.combo__savings')?.textContent).toMatch(/Ahorras hasta\s+\$500/);
  });

  it('hides the badge when savings cannot be computed', () => {
    expect(render('pack-congelado').querySelector('.combo__savings')).toBeNull();
  });

  it('shows a WhatsApp order link only for combos with an order message', () => {
    const link = render('pack-congelado').querySelector<HTMLAnchorElement>('.combo__order');
    expect(link?.href).toContain('wa.me');
    expect(render('once-shempin').querySelector('.combo__order')).toBeNull();
  });
});
