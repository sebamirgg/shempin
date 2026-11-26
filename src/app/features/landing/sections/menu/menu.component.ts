import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { BUSINESS_CONFIG } from '../../../../core/config/contact.config';
import { ProductCategory } from '../../../../core/models/product.model';
import { MenuService } from '../../../../core/services/menu.service';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { PortionHighlightComponent } from './portion-highlight/portion-highlight.component';

@Component({
  selector: 'app-menu',
  imports: [ProductCardComponent, SectionHeaderComponent, RevealDirective, PortionHighlightComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  private readonly menu = inject(MenuService);
  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  protected readonly categories = this.menu.categories;
  protected readonly productsByCategory = this.menu.productsByCategory;
  protected readonly sharedOptions = this.menu.sharedOptions;
  protected readonly priceNote = BUSINESS_CONFIG.priceNote;
  protected readonly selected = signal<ProductCategory>(this.categories()[0].id);
  protected readonly selectedIndex = computed(() =>
    this.categories().findIndex((category) => category.id === this.selected()),
  );

  protected select(category: ProductCategory): void {
    this.selected.set(category);
  }

  /** Navegación de pestañas con flechas, Inicio y Fin (patrón ARIA tabs). */
  protected onTabKeydown(event: KeyboardEvent): void {
    const total = this.categories().length;
    const current = this.selectedIndex();
    const next: Record<string, number> = {
      ArrowRight: (current + 1) % total,
      ArrowLeft: (current - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    const index = next[event.key];
    if (index === undefined) return;

    event.preventDefault();
    this.select(this.categories()[index].id);
    this.tabs()[index]?.nativeElement.focus();
  }
}
