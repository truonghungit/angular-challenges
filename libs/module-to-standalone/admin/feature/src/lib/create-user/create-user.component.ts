import { Component } from '@angular/core';

@Component({
  selector: 'lib-create-user',
  template: `
    Create User Form

    <button
      routerLink=".."
      class="ml-5 rounded-lg border bg-gray-700 p-2 text-white">
      Back
    </button>
  `,
})
export default class CreateUserComponent {}
