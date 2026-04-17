import { Component } from '@angular/core';

@Component({
  selector: 'lib-dashboard',
  template: `
    Dashboard

    <button
      routerLink="create-user"
      class="ml-10 rounded-lg border bg-gray-700 p-2 text-white">
      Create User
    </button>
  `,
})
export default class DashboardComponent {}
