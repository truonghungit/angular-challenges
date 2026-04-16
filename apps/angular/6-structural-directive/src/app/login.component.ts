import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from './button.component';
import { InformationComponent } from './information.component';
import { USERS_MAP, UserType } from './user.model';
import { UserStore } from './user.store';

@Component({
  imports: [InformationComponent, RouterLink, ButtonComponent],
  selector: 'app-login',
  template: `
    <header class="flex items-center gap-3">
      Log as :
      <button app-button (click)="loginAs('admin')">Admin</button>
      <button app-button (click)="loginAs('manager')">Manager</button>
      <button app-button (click)="loginAs('reader')">Reader</button>
      <button app-button (click)="loginAs('writer')">Writer</button>
      <button app-button (click)="loginAs('readerAndWriter')">
        Reader and Writer
      </button>
      <button app-button (click)="loginAs('client')">Client</button>
      <button app-button (click)="loginAs('everyone')">Everyone</button>
    </header>

    <app-information />

    <button app-button class="mt-10" routerLink="enter">
      Enter application
    </button>
  `,
})
export class LoginComponent {
  private readonly userStore = inject(UserStore);

  loginAs(userType: UserType) {
    const user = USERS_MAP[userType];
    this.userStore.setUser(user);
  }
}
