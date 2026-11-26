import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IsotipoComponent } from '../../../../shared/components/isotipo/isotipo.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-story',
  imports: [IsotipoComponent, SectionHeaderComponent, RevealDirective],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryComponent {}
