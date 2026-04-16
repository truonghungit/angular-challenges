import { Injectable, signal } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = signal<User | undefined>(undefined);

  getUser() {
    return this._user.asReadonly();
  }

  setUser(user: User): void {
    this._user.set(user);
  }
}
