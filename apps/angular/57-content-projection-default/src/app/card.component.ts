import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-title',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTitleComponent {}

@Component({
  selector: 'app-card',
  imports: [],
  template: `
    <div>
      <ng-content select="app-card-title"></ng-content>
    </div>

    <div>
      <ng-content>Aucun message</ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {}
