import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WHATSAPP_URL } from '../../../../core/config/contact.config';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

/**
 * Botón flotante de WhatsApp (solo móvil). Reutiliza el botón `whatsapp` de shared.
 * Se oculta con `visibility: hidden` para que también salga del orden de tabulación.
 */
@Component({
  selector: 'app-whatsapp-fab',
  imports: [ButtonComponent],
  template: `
    <div class="fab" [class.fab--hidden]="!visible()">
      <a appButton="whatsapp" [href]="url" target="_blank" rel="noopener noreferrer">
        <span class="visually-hidden">Escríbenos por WhatsApp (se abre en una pestaña nueva)</span>
      </a>
    </div>
  `,
  styleUrl: './whatsapp-fab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhatsappFabComponent {
  readonly visible = input(true);
  protected readonly url = WHATSAPP_URL;
}
