/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'button[app-button]',
  template: `
    <ng-content />
  `,
  host: {
    class:
      'rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
