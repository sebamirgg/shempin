import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-section-header',
  imports: [RevealDirective],
  template: `
    <div class="header" [class.header--center]="align() === 'center'" appReveal>
      @if (eyebrow()) {
        <p class="header__eyebrow">{{ eyebrow() }}</p>
      }
      <h2 class="header__title" [id]="headingId()">{{ heading() }}</h2>
      @if (subtitle()) {
        <p class="header__subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styleUrl: './section-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {
  readonly heading = input.required<string>();
  /** Bajada bajo el título. */
  readonly subtitle = input<string>();
  readonly eyebrow = input<string>();
  /** id del h2, para usarlo en aria-labelledby de la sección. */
  readonly headingId = input.required<string>();
  readonly align = input<'start' | 'center'>('start');
}
