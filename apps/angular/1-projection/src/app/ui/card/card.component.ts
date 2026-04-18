import { Component, Directive, input } from '@angular/core';

@Directive({
  selector: 'img[app-card-image]',
})
export class CardImage {}

@Directive({
  selector: 'app-card-content',
})
export class CardContent {}

@Directive({
  selector: 'app-card-actions',
})
export class CardActions {}

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass()">
      <ng-content select="[app-card-image]"></ng-content>

      <section>
        <ng-content select="app-card-content"></ng-content>
      </section>

      <ng-content select="app-card-actions"></ng-content>
    </div>
  `,
})
export class CardComponent {
  readonly customClass = input('');
}
