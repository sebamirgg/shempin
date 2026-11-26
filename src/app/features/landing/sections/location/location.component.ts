import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BUSINESS_CONFIG,
  INSTAGRAM_URL,
  WHATSAPP_URL,
} from '../../../../core/config/contact.config';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { SteamComponent } from '../../../../shared/components/steam/steam.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** El carro es móvil: horario fijo, pero sin dirección ni mapa. El punto se avisa por redes. */
@Component({
  selector: 'app-location',
  imports: [ButtonComponent, SectionHeaderComponent, SteamComponent, RevealDirective],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent {
  protected readonly business = BUSINESS_CONFIG;
  protected readonly instagramUrl = INSTAGRAM_URL;
  protected readonly whatsappUrl = WHATSAPP_URL;
}
