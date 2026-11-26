import { ChangeDetectionStrategy, Component, afterNextRender, signal } from '@angular/core';
import { WHATSAPP_URL } from '../../../../core/config/contact.config';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { LogoComponent } from '../../../../shared/components/logo/logo.component';

interface NavLink {
  href: string;
  label: string;
}

@Component({
  selector: 'app-header',
  imports: [ButtonComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'close()',
  },
})
export class HeaderComponent {
  protected readonly whatsappUrl = WHATSAPP_URL;
  protected readonly links: readonly NavLink[] = [
    { href: '#menu', label: 'Carta' },
    { href: '#combos', label: 'Combos' },
    { href: '#historia', label: 'Historia' },
    { href: '#ubicacion', label: 'Horario y dónde' },
    { href: '#proximamente', label: 'Próximamente' },
  ];

  protected readonly menuOpen = signal(false);
  /** true cuando la página bajó del inicio: el header pasa de transparente a papel con sombra. */
  protected readonly scrolled = signal(false);

  constructor() {
    // Si la página se carga ya desplazada (recarga o ancla), refleja el estado de inmediato.
    afterNextRender(() => this.onScroll());
  }

  protected toggle(): void {
    this.menuOpen.update((open) => !open);
  }

  protected close(): void {
    this.menuOpen.set(false);
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
