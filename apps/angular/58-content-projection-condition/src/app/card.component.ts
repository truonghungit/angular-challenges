import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgTemplateOutlet],
  template: `
    <ng-template #titleTemplate>
      <ng-content select="[title]" />
    </ng-template>
    <ng-template #messageTemplate>
      <ng-content select="[message]" />
    </ng-template>

    @if (small()) {
      <ng-container *ngTemplateOutlet="titleTemplate"></ng-container>
      <ng-container *ngTemplateOutlet="messageTemplate"></ng-container>
    } @else {
      <div class="p-4">
        <div class="text-2xl">
          <ng-container *ngTemplateOutlet="titleTemplate"></ng-container>
        </div>
        <ng-container *ngTemplateOutlet="messageTemplate"></ng-container>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {
  small = input<boolean>(false);
}
