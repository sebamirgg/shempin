import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuService } from '../../../../core/services/menu.service';
import { ComboCardComponent } from '../../../../shared/components/combo-card/combo-card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-combos',
  imports: [ComboCardComponent, SectionHeaderComponent, RevealDirective],
  template: `
    <section class="combos section" aria-labelledby="combos-title">
      <div class="container">
        <app-section-header
          headingId="combos-title"
          eyebrow="Combos"
          heading="Para la once, la cena o el freezer"
          subtitle="Armados para que te salga más a cuenta. Precios con IVA incluido."
        />
        <ul class="combos__grid">
          @for (combo of combos(); track combo.id; let i = $index) {
            <li appReveal [appRevealDelay]="i * 100">
              <app-combo-card [combo]="combo" />
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styleUrl: './combos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CombosComponent {
  protected readonly combos = inject(MenuService).combos;
}
