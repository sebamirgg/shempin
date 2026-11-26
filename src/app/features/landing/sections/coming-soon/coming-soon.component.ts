import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BUSINESS_CONFIG, INSTAGRAM_URL } from '../../../../core/config/contact.config';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {
  FoodIllustrationComponent,
  FoodKind,
} from '../../../../shared/components/food-illustration/food-illustration.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

interface Upcoming {
  title: string;
  text: string;
  when: string;
  whenIso?: string;
  illustration: FoodKind;
}

@Component({
  selector: 'app-coming-soon',
  imports: [ButtonComponent, FoodIllustrationComponent, SectionHeaderComponent, RevealDirective],
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComingSoonComponent {
  protected readonly instagramUrl = INSTAGRAM_URL;
  protected readonly business = BUSINESS_CONFIG;
  protected readonly items: readonly Upcoming[] = [
    {
      title: 'Nos vemos en ferias',
      text: 'Antes de abrir vamos a andar en ferias. Pasa a probar, a conversar y a conocernos.',
      when: 'Febrero 2027',
      whenIso: '2027-02',
      illustration: 'empanada',
    },
    {
      title: 'Un kuchen distinto cada mes',
      text: 'El kuchen de temporada cambia con la fruta del mes. Síguenos para saber cuál toca.',
      when: 'Cada mes',
      illustration: 'kuchen',
    },
  ];
}
