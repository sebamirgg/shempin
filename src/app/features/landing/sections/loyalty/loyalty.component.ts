import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LOYALTY_CONFIG } from '../../../../core/config/contact.config';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

/** Franja corta de fidelización (tarjeta de sellos). */
@Component({
  selector: 'app-loyalty',
  imports: [RevealDirective],
  template: `
    <section class="loyalty section section--tight" aria-label="Tarjeta de sellos">
      <div class="container loyalty__inner" appReveal>
        <div class="loyalty__stamps" aria-hidden="true">
          @for (stamp of stamps; track stamp; let last = $last) {
            <span class="loyalty__stamp" [class.loyalty__stamp--free]="last">
              @if (last) {
                <svg viewBox="0 0 24 24" focusable="false">
                  <path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5Z" />
                  <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16" />
                </svg>
              }
            </span>
          }
        </div>
        <p class="loyalty__text">
          <strong>Tarjeta de sellos:</strong> tu {{ freeCoffee }}.º café va por la casa
        </p>
      </div>
    </section>
  `,
  styleUrl: './loyalty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoyaltyComponent {
  protected readonly freeCoffee = LOYALTY_CONFIG.stampsForFreeCoffee;
  protected readonly stamps = Array.from({ length: this.freeCoffee }, (_, i) => i + 1);
}
