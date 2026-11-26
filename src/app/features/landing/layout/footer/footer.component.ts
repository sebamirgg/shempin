import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BUSINESS_CONFIG,
  CONTACT_CONFIG,
  INSTAGRAM_URL,
  WHATSAPP_URL,
} from '../../../../core/config/contact.config';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';

@Component({
  selector: 'app-footer',
  imports: [LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  protected readonly business = BUSINESS_CONFIG;
  protected readonly instagramHandle = CONTACT_CONFIG.instagramHandle;
  protected readonly instagramUrl = INSTAGRAM_URL;
  protected readonly whatsappUrl = WHATSAPP_URL;
  protected readonly year = new Date().getFullYear();
}
