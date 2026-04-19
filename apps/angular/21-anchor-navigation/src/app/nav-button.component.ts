/* eslint-disable @angular-eslint/component-selector */
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'nav-button',
  imports: [RouterLink],
  template: `
    <a [routerLink]="routerLink()" [fragment]="fragment()">
      <ng-content />
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  href = input('');

  isAnchorLink = computed(() => this.href().startsWith('#'));
  routerLink = computed(() => {
    return this.isAnchorLink() ? [] : this.href();
  });

  fragment = computed(() => {
    return this.isAnchorLink() ? this.href().substring(1) : undefined;
  });
}
