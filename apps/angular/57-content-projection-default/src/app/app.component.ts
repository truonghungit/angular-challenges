import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent, CardTitleComponent } from './card.component';

@Component({
  imports: [CardComponent, CardTitleComponent],
  selector: 'app-root',
  template: `
    <app-card message="Message1">
      <app-card-title>Titre 1</app-card-title>
      <div>Message1</div>
    </app-card>
    <app-card>
      <app-card-title>Titre 2</app-card-title>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
