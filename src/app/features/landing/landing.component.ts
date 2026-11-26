import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { buildFoodEstablishmentSchema } from '../../core/seo/food-establishment.schema';
import { MenuService } from '../../core/services/menu.service';
import { SeoService } from '../../core/services/seo.service';
import { RepulgueDividerComponent } from '../../shared/components/repulgue-divider/repulgue-divider.component';
import { InViewportDirective } from '../../shared/directives/in-viewport.directive';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { WhatsappFabComponent } from './layout/whatsapp-fab/whatsapp-fab.component';
import { CombosComponent } from './sections/combos/combos.component';
import { ComingSoonComponent } from './sections/coming-soon/coming-soon.component';
import { HeroComponent } from './sections/hero/hero.component';
import { LocationComponent } from './sections/location/location.component';
import { LoyaltyComponent } from './sections/loyalty/loyalty.component';
import { MenuComponent } from './sections/menu/menu.component';
import { StoryComponent } from './sections/story/story.component';

const SEO_TITLE = 'Shempin · Dumplings, empanadas cóctel y café de especialidad';
const SEO_DESCRIPTION =
  'Carro móvil de comida al paso, hecha a mano: dumplings al vapor, empanadas cóctel, café de especialidad y dulces. Combos, packs congelados y tarjeta de sellos. Martes a domingo. Abrimos en marzo de 2027.';

@Component({
  selector: 'app-landing',
  imports: [
    HeaderComponent,
    FooterComponent,
    WhatsappFabComponent,
    HeroComponent,
    MenuComponent,
    CombosComponent,
    LoyaltyComponent,
    StoryComponent,
    LocationComponent,
    ComingSoonComponent,
    RepulgueDividerComponent,
    InViewportDirective,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  /** Oculta el botón flotante de WhatsApp cuando el footer está a la vista. */
  protected readonly footerVisible = signal(false);

  constructor() {
    const seo = inject(SeoService);
    const menu = inject(MenuService);

    seo.update({ title: SEO_TITLE, description: SEO_DESCRIPTION });
    seo.setJsonLd(
      'shempin-jsonld',
      buildFoodEstablishmentSchema({
        description: SEO_DESCRIPTION,
        categories: menu.categories(),
        productsByCategory: menu.productsByCategory(),
        combos: menu.combos(),
      }),
    );
  }
}
