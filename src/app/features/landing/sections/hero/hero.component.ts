import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BUSINESS_CONFIG, WHATSAPP_URL } from '../../../../core/config/contact.config';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';
import { SealComponent } from '../../../../shared/components/seal/seal.component';

@Component({
  selector: 'app-hero',
  imports: [ButtonComponent, LogoComponent, SealComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  protected readonly whatsappUrl = WHATSAPP_URL;
  protected readonly business = BUSINESS_CONFIG;
}
